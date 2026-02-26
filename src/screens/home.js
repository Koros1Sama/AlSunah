// ============================================
// AlSunah — Home Screen (Learning Path)
// ============================================

import { categories, units } from '../data/sunnahs.js';
import { getState, getXPProgress } from '../engine/state.js';
import { getStreakDisplay } from '../engine/streak.js';
import { renderNavbar } from '../components/navbar.js';

export function homeScreen() {
  const state = getState();
  const xpProgress = getXPProgress();
  const streak = getStreakDisplay();

  const html = `
    <div class="screen screen-padded">
      <!-- Header -->
      <div class="home-header">
        <div class="home-header-top">
          <div class="home-logo">
            <span class="home-logo-icon">☪️</span>
            <span class="home-logo-text">السُّنَّة</span>
          </div>
          <div class="home-header-stats">
            <div class="streak-display" id="streakDisplay">
              <span class="streak-fire">${streak.milestone.icon}</span>
              <span style="color: var(--streak-fire)">${streak.days}</span>
            </div>
            <div class="xp-display">
              <span class="level-badge">${state.level}</span>
            </div>
          </div>
        </div>
        
        <!-- XP Progress -->
        <div class="home-xp-section">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-muted" style="font-size: var(--fs-xs)">المستوى ${state.level} — ${state.profile.title}</span>
            <span class="text-gold" style="font-size: var(--fs-xs)">${Math.floor(xpProgress.progress)} / ${xpProgress.needed} XP</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${xpProgress.percentage}%"></div>
          </div>
        </div>

        <!-- Hasanat -->
        <div class="home-hasanat">
          <span>💰</span>
          <span style="color: var(--gold); font-weight: 700">${state.hasanat}</span>
          <span class="text-muted" style="font-size: var(--fs-xs)">نقطة</span>
        </div>
      </div>

      <!-- Sunnah Tree Banner -->
      <a href="#profile" class="tree-banner" id="treeBanner" style="text-decoration: none; color: inherit; -webkit-tap-highlight-color: transparent">
        <div class="tree-visual" id="treeVisual">
          ${renderTree(state)}
        </div>
        <div class="tree-info">
          <div style="font-size: var(--fs-lg); font-weight: 700">🌳 شجرة السنن</div>
          <div class="text-muted" style="font-size: var(--fs-sm)">
            تعلّمت ${getLearnedCount(state)} من ${getTotalSunnahCount()} سنة
          </div>
          <div class="progress-bar progress-bar-sm mt-sm">
            <div class="progress-bar-fill" style="width: ${getOverallProgress(state)}%"></div>
          </div>
          <div class="text-muted" style="font-size: var(--fs-xs); margin-top: 4px">اضغط لعرض التقدم الكامل ←</div>
        </div>
      </a>

      <!-- Categories -->
      <h2 class="section-title">مسار التعلّم</h2>
      <div class="categories-list">
        ${categories.map((cat, i) => renderCategoryCard(cat, state, i)).join('')}
      </div>

      <!-- Quick Review -->
      ${getReviewNeeded(state) ? `
        <div class="review-banner mt-xl stagger-item" style="animation-delay: ${categories.length * 80}ms">
          <div class="review-banner-icon">🔄</div>
          <div class="review-banner-text">
            <div style="font-weight: 700">مراجعة مطلوبة!</div>
            <div class="text-muted" style="font-size: var(--fs-sm)">بعض الوحدات تحتاج مراجعة</div>
          </div>
          <a href="#review" class="btn btn-sm btn-secondary">مراجعة</a>
        </div>
      ` : ''}
    </div>
    ${renderNavbar()}
  `;

  return {
    html,
    mount() {
      // Tree banner: bounce on tap + track clicks for hidden achievement
      const banner = document.getElementById('treeBanner');
      if (banner) {
        banner.addEventListener('click', () => {
          // Bounce animation on tap
          const treeEmoji = banner.querySelector('.tree-emoji');
          if (treeEmoji) {
            treeEmoji.style.animation = 'none';
            requestAnimationFrame(() => {
              treeEmoji.style.animation = 'bounceIn 0.5s ease';
            });
          }
          // Track clicks for hidden achievement
          import('../engine/state.js').then(m => {
            m.setState(s => ({ ...s, stats: { ...s.stats, treeClicks: (s.stats.treeClicks || 0) + 1 } }));
          });
        });
      }
    },
  };
}

function renderCategoryCard(cat, state, index) {
  const catUnits = cat.units.map(id => units[id]).filter(Boolean);
  const totalLessons = catUnits.reduce((sum, u) => sum + u.lessons.length, 0);
  const completedLessons = catUnits.reduce((sum, u) =>
    sum + u.lessons.filter(lid => state.completedLessons[lid]).length, 0);
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const isComplete = progress === 100;

  return `
    <a href="#category?id=${cat.id}" class="category-card stagger-item" style="animation-delay: ${index * 80}ms">
      <div class="category-icon" style="background: ${cat.color}15; color: ${cat.color}">
        ${cat.icon}
      </div>
      <div class="category-info">
        <div class="category-name">${cat.name} ${isComplete ? '✅' : ''}</div>
        <div class="category-desc">${cat.description}</div>
        <div class="progress-bar progress-bar-sm">
          <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>
        <div class="text-muted" style="font-size: var(--fs-xs); margin-top: 4px">
          ${completedLessons}/${totalLessons} درس
        </div>
      </div>
      <div style="font-size: 20px; color: var(--text-muted)">‹</div>
    </a>
  `;
}

function renderTree(state) {
  const progress = getOverallProgress(state);
  let treeEmoji, label;
  if (progress === 0) { treeEmoji = '🌱'; label = 'بذرة'; }
  else if (progress < 25) { treeEmoji = '🌿'; label = 'برعم'; }
  else if (progress < 50) { treeEmoji = '🌲'; label = 'شجيرة'; }
  else if (progress < 75) { treeEmoji = '🌳'; label = 'شجرة'; }
  else if (progress < 100) { treeEmoji = '🌸'; label = 'مزهرة'; }
  else { treeEmoji = '✨🌳✨'; label = 'ذهبية'; }

  return `<div class="tree-emoji animate-float">${treeEmoji}</div>`;
}

function getLearnedCount(state) {
  return Object.keys(state.completedLessons).length;
}

function getTotalSunnahCount() {
  return Object.values(units).reduce((sum, u) => sum + u.lessons.length, 0);
}

function getOverallProgress(state) {
  const total = getTotalSunnahCount();
  if (total === 0) return 0;
  return (getLearnedCount(state) / total) * 100;
}

function getReviewNeeded(state) {
  // Simple check: if any completed lesson is older than 7 days
  const now = Date.now();
  return Object.values(state.completedLessons).some(l => {
    const diff = now - new Date(l.completedAt).getTime();
    return diff > 7 * 24 * 60 * 60 * 1000;
  });
}
