// ============================================
// AlSunah — Habit Tracker Screen (Redesigned)
// GitHub-style heatmap + Browsable Sunnahs
// ============================================

import { getState, setSunnahPractice } from '../engine/state.js';
import { sunnahs, categories, units } from '../data/sunnahs.js';
import { renderNavbar } from '../components/navbar.js';

const LEVEL_LABELS = {
  always:    { text: 'دائماً',     icon: '✅', color: 'var(--success)' },
  often:     { text: 'غالباً',     icon: '🟢', color: '#8BC34A' },
  sometimes: { text: 'أحياناً',    icon: '🟡', color: '#FFCA28' },
  rarely:    { text: 'نادراً',     icon: '🟠', color: '#FF9800' },
  never:     { text: 'لا أطبقها',  icon: '❌', color: 'var(--error)' },
};

export function habitsScreen() {
  const state = getState();
  const learnedSunnahs = Object.keys(state.completedLessons).map(id => sunnahs[id]).filter(Boolean);

  // Practice stats
  const practiceCounts = { always: 0, often: 0, sometimes: 0, rarely: 0, never: 0 };
  let hasPracticeData = false;
  learnedSunnahs.forEach(s => {
    const level = state.sunnahPractice?.[s.id];
    if (level && practiceCounts[level] !== undefined) {
      practiceCounts[level]++;
      hasPracticeData = true;
    }
  });

  // Recent lessons (last 10)
  const recentLessons = Object.entries(state.completedLessons)
    .map(([id, data]) => ({ id, ...data, sunnah: sunnahs[id] }))
    .filter(l => l.sunnah)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 10);

  // Group learned sunnahs by category
  const sunnahsByCategory = {};
  categories.forEach(cat => {
    const catSunnahs = learnedSunnahs.filter(s => {
      const unit = Object.values(units).find(u => u.lessons.includes(s.id));
      return unit && unit.categoryId === cat.id;
    });
    if (catSunnahs.length > 0) {
      sunnahsByCategory[cat.id] = { category: cat, sunnahs: catSunnahs };
    }
  });

  const html = `
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <span class="screen-header-title">📊 سجل العمل</span>
        <span class="badge badge-gold">${learnedSunnahs.length} سنة</span>
      </div>

      <!-- Practice Overview Stats -->
      ${hasPracticeData ? `
        <div class="practice-overview-grid mb-lg">
          ${Object.entries(practiceCounts).map(([level, count]) => count > 0 ? `
            <div class="practice-overview-item">
              <span style="font-size: 18px">${LEVEL_LABELS[level].icon}</span>
              <span style="font-size: var(--fs-lg); font-weight: bold; color: ${LEVEL_LABELS[level].color}">${count}</span>
              <span style="font-size: var(--fs-xs); color: var(--text-muted)">${LEVEL_LABELS[level].text}</span>
            </div>
          ` : '').join('')}
        </div>
      ` : ''}

      <!-- GitHub-style Heatmap -->
      <h3 class="section-title">🗓️ نشاطك</h3>
      <div class="card mb-lg" style="overflow-x: auto; padding: var(--space-md)">
        ${renderHeatmap(state)}
      </div>

      <!-- Day Detail (hidden by default, shown on heatmap click) -->
      <div id="dayDetail" class="card mb-lg" style="display: none">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm)">
          <span id="dayDetailTitle" style="font-weight: 700; color: var(--gold)"></span>
          <button id="dayDetailClose" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 18px">✕</button>
        </div>
        <div id="dayDetailContent"></div>
      </div>

      <!-- Browse All Sunnahs -->
      <h3 class="section-title">📋 تصفح السنن</h3>
      ${Object.keys(sunnahsByCategory).length > 0 ? `
        <div id="sunnahBrowse">
          ${Object.values(sunnahsByCategory).map(({ category, sunnahs: catSunnahs }) => `
            <div class="card mb-md" style="padding: var(--space-md)">
              <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-md)">
                <span style="font-size: 20px">${category.icon}</span>
                <span style="font-weight: 700; color: var(--gold)">${category.name}</span>
                <span class="badge" style="background: rgba(255,255,255,0.1); font-size: var(--fs-xs)">${catSunnahs.length}</span>
              </div>
              ${catSunnahs.map(s => {
                const pLevel = state.sunnahPractice?.[s.id];
                return `
                  <div class="browse-sunnah-item" data-sunnah-id="${s.id}">
                    <div class="browse-sunnah-info">
                      <div style="font-weight: 600; font-size: var(--fs-sm)">${s.name}</div>
                      <div class="text-muted" style="font-size: var(--fs-xs)">${s.whenToApply}</div>
                    </div>
                    <div class="browse-sunnah-badge" data-current="${pLevel || ''}">
                      ${pLevel ? `<span style="font-size: 10px; padding: 2px 8px; border-radius: 6px; background: rgba(255,255,255,0.08); color: ${LEVEL_LABELS[pLevel].color}; white-space: nowrap">${LEVEL_LABELS[pLevel].icon} ${LEVEL_LABELS[pLevel].text}</span>` : '<span style="font-size: var(--fs-xs); color: var(--text-muted)">حدد ▾</span>'}
                    </div>
                  </div>
                  <!-- Expandable practice options -->
                  <div class="browse-practice-options" id="practice-${s.id}" style="display: none">
                    ${Object.entries(LEVEL_LABELS).map(([lvl, info]) => `
                      <button class="browse-practice-btn ${pLevel === lvl ? 'active' : ''}" data-sunnah="${s.id}" data-level="${lvl}" style="--btn-color: ${info.color}">
                        <span>${info.icon}</span>
                        <span>${info.text}</span>
                      </button>
                    `).join('')}
                  </div>
                `;
              }).join('')}
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <div class="empty-state-title">ابدأ بالتعلم أولاً</div>
          <div class="empty-state-text">أكمل بعض الدروس ثم عُد هنا لتتبع تطبيقك للسنن</div>
          <a href="#home" class="btn btn-primary mt-lg">ابدأ التعلم</a>
        </div>
      `}

      <!-- Recent Lessons Timeline -->
      ${recentLessons.length > 0 ? `
        <h3 class="section-title" style="margin-top: var(--space-xl)">📜 آخر الدروس</h3>
        <div class="recent-lessons-list mb-xl">
          ${recentLessons.map((l, i) => {
            const date = new Date(l.completedAt);
            const dateStr = date.toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' });
            const pct = l.total > 0 ? Math.round((l.score / l.total) * 100) : 0;
            const catObj = categories.find(c => {
              const unit = Object.values(units).find(u => u.lessons.includes(l.id));
              return unit && unit.categoryId === c.id;
            });
            return `
              <div class="recent-lesson-item stagger-item" style="animation-delay: ${i * 50}ms">
                <div class="recent-lesson-icon" style="background: ${catObj?.color || 'var(--gold)'}20; color: ${catObj?.color || 'var(--gold)'}">${catObj?.icon || '📖'}</div>
                <div class="recent-lesson-info">
                  <div style="font-weight: 600; font-size: var(--fs-sm)">${l.sunnah.name}</div>
                  <div class="text-muted" style="font-size: var(--fs-xs)">${dateStr}</div>
                </div>
                <div style="text-align: left">
                  <span style="font-weight: 700; color: ${pct >= 70 ? 'var(--success)' : 'var(--error)'}; font-size: var(--fs-sm)">${pct}%</span>
                  ${l.perfect ? '<span style="font-size: 12px; margin-right: 4px">🏆</span>' : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}
    </div>
    ${renderNavbar()}
  `;

  return {
    html,
    mount() {
      // Heatmap day click
      document.querySelectorAll('.heatmap-cell[data-date]').forEach(cell => {
        cell.addEventListener('click', () => {
          const date = cell.dataset.date;
          const count = parseInt(cell.dataset.count || '0');
          if (count === 0) return;
          
          const detail = document.getElementById('dayDetail');
          const title = document.getElementById('dayDetailTitle');
          const content = document.getElementById('dayDetailContent');
          
          const dayLessons = Object.entries(state.completedLessons)
            .filter(([, d]) => d.completedAt && d.completedAt.startsWith(date))
            .map(([id, d]) => ({ id, ...d, sunnah: sunnahs[id] }))
            .filter(l => l.sunnah);

          title.textContent = `📅 ${new Date(date).toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long' })}`;
          content.innerHTML = dayLessons.length > 0 ? dayLessons.map(l => {
            const pct = l.total > 0 ? Math.round((l.score / l.total) * 100) : 0;
            return `<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05)">
              <span style="font-size: var(--fs-sm)">${l.sunnah.name}</span>
              <span style="font-weight: 700; color: ${pct >= 70 ? 'var(--success)' : 'var(--error)'}; font-size: var(--fs-sm)">${pct}% ${l.perfect ? '🏆' : ''}</span>
            </div>`;
          }).join('') : '<div class="text-muted" style="font-size: var(--fs-sm)">تم تسجيل نشاط في هذا اليوم</div>';
          
          detail.style.display = 'block';
          detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      });

      // Close day detail
      document.getElementById('dayDetailClose')?.addEventListener('click', () => {
        document.getElementById('dayDetail').style.display = 'none';
      });

      // Browse sunnah toggle
      document.querySelectorAll('.browse-sunnah-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.dataset.sunnahId;
          const optionsEl = document.getElementById(`practice-${id}`);
          if (!optionsEl) return;
          
          const isVisible = optionsEl.style.display !== 'none';
          // Close all others
          document.querySelectorAll('.browse-practice-options').forEach(el => el.style.display = 'none');
          optionsEl.style.display = isVisible ? 'none' : 'flex';
        });
      });

      // Practice level buttons
      document.querySelectorAll('.browse-practice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const sunnahId = btn.dataset.sunnah;
          const level = btn.dataset.level;
          
          setSunnahPractice(sunnahId, level);
          
          // Refresh screen
          const app = document.getElementById('app');
          const result = habitsScreen();
          app.innerHTML = result.html;
          result.mount();
        });
      });
    },
  };
}


// ============================================
// GitHub-Style Contribution Heatmap
// ============================================

function renderHeatmap(state) {
  const today = new Date();
  const WEEKS = 16;
  const dayNames = ['أحد', '', 'ثلا', '', 'خمي', '', 'سبت'];
  
  // Build date → activity count map from completedLessons
  const activityMap = {};
  Object.values(state.completedLessons).forEach(lesson => {
    if (lesson.completedAt) {
      const date = lesson.completedAt.slice(0, 10);
      activityMap[date] = (activityMap[date] || 0) + 1;
    }
  });
  // Also include habitLog
  Object.entries(state.habitLog || {}).forEach(([date, arr]) => {
    if (arr.length > 0) {
      activityMap[date] = (activityMap[date] || 0) + arr.length;
    }
  });

  // Find max for color scale
  const maxCount = Math.max(1, ...Object.values(activityMap));

  // Calculate start: go back WEEKS weeks from end of this week
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // end of week (Saturday)
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (WEEKS * 7) + 1);

  // Build grid (7 rows x WEEKS columns)
  const weeks = [];
  const monthLabels = [];
  let currentDate = new Date(startDate);
  let lastMonth = -1;

  for (let w = 0; w < WEEKS; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = currentDate.toISOString().slice(0, 10);
      const count = activityMap[dateStr] || 0;
      const isFuture = currentDate > today;
      const isToday = dateStr === today.toISOString().slice(0, 10);
      
      week.push({ date: dateStr, count, isFuture, isToday });
      
      // Track month changes for labels
      if (d === 0 && currentDate.getMonth() !== lastMonth) {
        const monthName = currentDate.toLocaleDateString('ar-SA', { month: 'short' });
        monthLabels.push({ week: w, label: monthName });
        lastMonth = currentDate.getMonth();
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  // Get color level (0-4)
  function getLevel(count) {
    if (count === 0) return 0;
    if (count <= maxCount * 0.25) return 1;
    if (count <= maxCount * 0.5) return 2;
    if (count <= maxCount * 0.75) return 3;
    return 4;
  }

  let html = '<div class="heatmap-container">';
  
  // Month labels row
  html += '<div class="heatmap-months">';
  html += '<div class="heatmap-day-label"></div>'; // spacer for day labels
  for (let w = 0; w < WEEKS; w++) {
    const monthLabel = monthLabels.find(m => m.week === w);
    html += `<div class="heatmap-month-label">${monthLabel ? monthLabel.label : ''}</div>`;
  }
  html += '</div>';

  // Grid rows (one per day of week)
  for (let d = 0; d < 7; d++) {
    html += '<div class="heatmap-row">';
    html += `<div class="heatmap-day-label">${dayNames[d]}</div>`;
    for (let w = 0; w < WEEKS; w++) {
      const cell = weeks[w][d];
      const level = cell.isFuture ? -1 : getLevel(cell.count);
      html += `<div class="heatmap-cell level-${level} ${cell.isToday ? 'today' : ''}" 
                    data-date="${cell.date}" 
                    data-count="${cell.count}"
                    title="${cell.date}: ${cell.count} نشاط"></div>`;
    }
    html += '</div>';
  }

  // Legend
  html += `
    <div class="heatmap-legend">
      <span class="text-muted" style="font-size: var(--fs-xs)">أقل</span>
      <div class="heatmap-cell level-0" style="cursor: default"></div>
      <div class="heatmap-cell level-1" style="cursor: default"></div>
      <div class="heatmap-cell level-2" style="cursor: default"></div>
      <div class="heatmap-cell level-3" style="cursor: default"></div>
      <div class="heatmap-cell level-4" style="cursor: default"></div>
      <span class="text-muted" style="font-size: var(--fs-xs)">أكثر</span>
    </div>
  `;

  html += '</div>';
  return html;
}
