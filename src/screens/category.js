// ============================================
// AlSunah — Category Screen (Units View)
// ============================================

import { categories, units, sunnahs } from '../data/sunnahs.js';
import { getState } from '../engine/state.js';
import { renderNavbar } from '../components/navbar.js';

export function categoryScreen(params) {
  const catId = params.id;
  const cat = categories.find(c => c.id === catId);
  if (!cat) return { html: '<div class="screen"><p>الفئة غير موجودة</p></div>', mount() {} };

  const state = getState();
  const catUnits = cat.units.map(id => units[id]).filter(Boolean).sort((a, b) => a.order - b.order);

  const html = `
    <div class="screen">
      <div class="screen-header">
        <a href="#home" class="screen-header-back">›</a>
        <span class="screen-header-title">${cat.icon} ${cat.name}</span>
        <div></div>
      </div>

      <div class="screen-padded">
        <!-- Category Progress -->
        <div class="card card-gold mb-lg animate-fade-in">
          <div class="flex items-center gap-md mb-md">
            <div class="category-icon" style="background: ${cat.color}20; color: ${cat.color}; font-size: 48px; width: 64px; height: 64px">
              ${cat.icon}
            </div>
            <div>
              <div style="font-size: var(--fs-lg); font-weight: 700">${cat.name}</div>
              <div class="text-muted" style="font-size: var(--fs-sm)">${cat.description}</div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${getCategoryProgress(cat, state)}%"></div>
          </div>
          <div class="text-muted mt-sm" style="font-size: var(--fs-xs); text-align: center">
            ${getCategoryCompletedCount(cat, state)} / ${getCategoryTotalCount(cat)} درس مكتمل
          </div>
        </div>

        <!-- Learning Path (Units) -->
        <div class="learning-path">
          ${catUnits.map((unit, i) => renderUnitNode(unit, state, i, catUnits)).join('')}
        </div>
      </div>
    </div>
    ${renderNavbar()}
  `;

  return { html, mount() {} };
}

function renderUnitNode(unit, state, index, allUnits) {
  const lessons = unit.lessons;
  const completedCount = lessons.filter(lid => state.completedLessons[lid]).length;
  const totalCount = lessons.length;
  const isComplete = completedCount === totalCount;

  // Determine if unlocked: first unit always open, rest need previous complete
  const prevUnit = index > 0 ? allUnits[index - 1] : null;
  const prevComplete = !prevUnit || prevUnit.lessons.every(lid => state.completedLessons[lid]);
  const isLocked = index > 0 && !prevComplete;
  const isCurrent = !isLocked && !isComplete;

  const statusClass = isComplete ? 'completed' : (isCurrent ? 'current' : 'locked');

  // Find first incomplete lesson
  const nextLesson = lessons.find(lid => !state.completedLessons[lid]) || lessons[0];

  const connector = index < allUnits.length - 1 ? `
    <div class="path-connector ${isComplete ? 'path-connector-done' : ''}"></div>
  ` : '';

  return `
    <div class="unit-path-item stagger-item" style="animation-delay: ${index * 100}ms">
      <div class="unit-node ${statusClass}" ${!isLocked ? `onclick="location.hash='#lesson?id=${nextLesson}'"` : ''}>
        <div class="unit-circle">
          ${isComplete ? '✅' : (isLocked ? '🔒' : unit.icon)}
        </div>
        <div class="unit-label">${unit.name}</div>
        ${!isLocked && !isComplete ? `
          <div class="unit-progress-ring">
            <span class="text-muted" style="font-size: var(--fs-xs)">${completedCount}/${totalCount}</span>
          </div>
        ` : ''}
      </div>
      ${connector}
    </div>
  `;
}

function getCategoryProgress(cat, state) {
  const total = getCategoryTotalCount(cat);
  if (total === 0) return 0;
  return (getCategoryCompletedCount(cat, state) / total) * 100;
}

function getCategoryCompletedCount(cat, state) {
  return cat.units.reduce((sum, uid) => {
    const unit = units[uid];
    return sum + (unit ? unit.lessons.filter(lid => state.completedLessons[lid]).length : 0);
  }, 0);
}

function getCategoryTotalCount(cat) {
  return cat.units.reduce((sum, uid) => {
    const unit = units[uid];
    return sum + (unit ? unit.lessons.length : 0);
  }, 0);
}
