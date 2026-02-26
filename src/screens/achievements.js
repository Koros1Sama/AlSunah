// ============================================
// AlSunah — Achievements Screen
// ============================================

import { achievements } from '../data/achievements.js';
import { getState } from '../engine/state.js';
import { renderNavbar } from '../components/navbar.js';

export function achievementsScreen() {
  const state = getState();
  const unlocked = Object.keys(state.achievements).length;
  const total = achievements.length;
  const visible = achievements.filter(a => !a.hidden || state.achievements[a.id]);

  const grouped = {
    progress: visible.filter(a => a.category === 'progress'),
    mastery: visible.filter(a => a.category === 'mastery'),
    commitment: visible.filter(a => a.category === 'commitment'),
    habit: visible.filter(a => a.category === 'habit'),
    hidden: visible.filter(a => a.category === 'hidden'),
  };

  const categoryLabels = {
    progress: '📈 التقدم',
    mastery: '🎯 الإتقان',
    commitment: '🔥 الالتزام',
    habit: '✅ العادات',
    hidden: '🔮 المخفية',
  };

  const html = `
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <span class="screen-header-title">🏅 الإنجازات</span>
        <span class="badge badge-gold">${unlocked}/${total}</span>
      </div>

      <!-- Overview -->
      <div class="card card-gold mb-lg animate-fade-in" style="text-align: center">
        <div style="font-size: 48px; margin-bottom: var(--space-sm)">🏆</div>
        <div style="font-size: var(--fs-lg); font-weight: 700">${unlocked} إنجاز محقق</div>
        <div class="progress-bar mt-md">
          <div class="progress-bar-fill" style="width: ${total > 0 ? (unlocked / total) * 100 : 0}%"></div>
        </div>
        <div class="text-muted mt-sm" style="font-size: var(--fs-xs)">${unlocked} من ${total}</div>
      </div>

      <!-- Grouped Achievements -->
      ${Object.entries(grouped).filter(([, achs]) => achs.length > 0).map(([cat, achs]) => `
        <h3 class="section-title">${categoryLabels[cat]}</h3>
        <div class="achievements-list mb-lg">
          ${achs.map((ach, i) => {
            const isUnlocked = !!state.achievements[ach.id];
            const desc = ach.hidden && !isUnlocked ? '???' : (isUnlocked && ach.revealedDesc ? ach.revealedDesc : ach.desc);
            return `
              <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'} stagger-item" style="animation-delay: ${i * 60}ms">
                <div class="achievement-icon">${isUnlocked ? ach.icon : '🔒'}</div>
                <div class="achievement-info">
                  <div class="achievement-name">${isUnlocked || !ach.hidden ? ach.name : '???'}</div>
                  <div class="achievement-desc">${desc}</div>
                </div>
                ${isUnlocked ? '<div style="color: var(--gold); font-size: 20px">✓</div>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      `).join('')}

      <!-- Hidden hint -->
      <div class="text-center text-muted mb-xl" style="font-size: var(--fs-xs)">
        🔮 هناك إنجازات مخفية تنتظر اكتشافك...
      </div>
    </div>
    ${renderNavbar()}
  `;

  return { html, mount() {} };
}
