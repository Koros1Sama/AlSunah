// ============================================
// AlSunah — Evidence Library Screen
// ============================================

import { categories, getAllEvidence, getEvidenceByCategory } from '../data/sunnahs.js';
import { getState, toggleFavoriteEvidence } from '../engine/state.js';
import { renderNavbar } from '../components/navbar.js';
import { getGradeLabel } from '../screens/lesson.js';

export function evidenceScreen() {
  const state = getState();
  const allEvidence = getAllEvidence();

  const html = `
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <span class="screen-header-title">📖 مكتبة الأدلة</span>
        <span class="badge badge-gold">${allEvidence.length} دليل</span>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs mb-lg" id="filterTabs">
        <button class="filter-tab active" data-filter="all">الكل</button>
        ${categories.map(c => `
          <button class="filter-tab" data-filter="${c.id}">${c.icon} ${c.name.split(' ').pop()}</button>
        `).join('')}
        <button class="filter-tab" data-filter="favorites">⭐ المفضلة</button>
      </div>

      <!-- Search -->
      <div class="search-box mb-lg">
        <span class="search-icon">🔍</span>
        <input type="text" id="evidenceSearch" class="search-input" placeholder="ابحث في الأحاديث والآيات..." />
      </div>

      <!-- Evidence List -->
      <div class="evidence-list" id="evidenceList">
        ${renderEvidenceList(allEvidence, state)}
      </div>
    </div>
    ${renderNavbar()}
  `;

  return {
    html,
    mount() {
      const list = document.getElementById('evidenceList');
      const search = document.getElementById('evidenceSearch');
      const tabs = document.getElementById('filterTabs');
      let currentFilter = 'all';

      // Filter tabs
      tabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;
        tabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        updateList();
      });

      // Search
      search.addEventListener('input', () => updateList());

      // Favorite toggle
      list.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.evidence-fav-btn');
        if (!favBtn) return;
        const evId = favBtn.dataset.id;
        toggleFavoriteEvidence(evId);
        updateList();
      });

      function updateList() {
        const query = search.value.trim().toLowerCase();
        const state = getState();
        let filtered = allEvidence;

        if (currentFilter === 'favorites') {
          filtered = filtered.filter(e => state.favoriteEvidence.includes(e.id));
        } else if (currentFilter !== 'all') {
          filtered = filtered.filter(e => e.categoryId === currentFilter);
        }

        if (query) {
          filtered = filtered.filter(e =>
            e.text.includes(query) ||
            e.narrator?.includes(query) ||
            e.source?.includes(query) ||
            e.sunnahName?.includes(query)
          );
        }

        list.innerHTML = filtered.length > 0
          ? renderEvidenceList(filtered, state)
          : '<div class="empty-state"><div class="empty-state-icon">📖</div><div class="empty-state-title">لا توجد نتائج</div></div>';
      }
    },
  };
}

function renderEvidenceList(evidence, state) {
  return evidence.map((ev, i) => {
    const isFav = state.favoriteEvidence.includes(ev.id);
    return `
      <div class="evidence-card mb-md stagger-item" style="animation-delay: ${i * 60}ms">
        <div class="flex justify-between items-center mb-sm">
          <span class="badge badge-gold">${ev.sunnahName}</span>
          <button class="evidence-fav-btn" data-id="${ev.id}" style="font-size: 20px; background: none; border: none; cursor: pointer">
            ${isFav ? '⭐' : '☆'}
          </button>
        </div>
        <div class="evidence-text">${ev.text}</div>
        <div class="evidence-source mt-sm">
          <span class="evidence-grade grade-${ev.grade}">${getGradeLabel(ev.grade)}</span>
          <span>${ev.source}</span>
        </div>
        <div class="text-muted mt-sm" style="font-size: var(--fs-xs)">
          الراوي: ${ev.narrator} — ${ev.book || ''}
        </div>
      </div>
    `;
  }).join('');
}
