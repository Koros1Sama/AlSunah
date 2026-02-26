// ============================================
// AlSunah — Profile & Stats Screen
// ============================================

import { getState, getXPProgress } from '../engine/state.js';
import { getStreakDisplay } from '../engine/streak.js';
import { renderNavbar } from '../components/navbar.js';
import { getTotalLessons } from '../data/sunnahs.js';

export function profileScreen() {
  const state = getState();
  const xpProgress = getXPProgress();
  const streak = getStreakDisplay();
  const accuracy = state.stats.totalQuestions > 0
    ? Math.round((state.stats.totalCorrect / state.stats.totalQuestions) * 100) : 0;
  const totalSunnahs = getTotalLessons();
  const learned = Object.keys(state.completedLessons).length;

  const html = `
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <span class="screen-header-title">حسابي</span>
        <a href="#settings" class="btn-icon btn-ghost">⚙️</a>
      </div>

      <!-- Profile Card -->
      <div class="card card-gold mb-lg animate-fade-in" style="text-align: center; padding: var(--space-2xl)">
        <div class="profile-avatar">${state.profile.icon}</div>
        <div style="font-size: var(--fs-xl); font-weight: 800; margin-top: var(--space-md)">${state.profile.name}</div>
        <div class="badge badge-level mt-sm">${state.profile.title} — المستوى ${state.level}</div>
        
        <!-- XP Bar -->
        <div class="mt-lg">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-muted" style="font-size: var(--fs-xs)">المستوى ${state.level}</span>
            <span class="text-gold" style="font-size: var(--fs-xs)">${state.xp} XP</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${xpProgress.percentage}%"></div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid mb-lg">
        <div class="stat-card stagger-item">
          <div class="stat-value">${streak.days}</div>
          <div class="stat-label">${streak.milestone.icon} سلسلة يومية</div>
        </div>
        <div class="stat-card stagger-item">
          <div class="stat-value">${state.hasanat}</div>
          <div class="stat-label">💰 نقطة</div>
        </div>
        <div class="stat-card stagger-item">
          <div class="stat-value">${learned}</div>
          <div class="stat-label">📚 سنة تعلّمتها</div>
        </div>
        <div class="stat-card stagger-item">
          <div class="stat-value">${accuracy}%</div>
          <div class="stat-label">🎯 دقة الإجابات</div>
        </div>
      </div>

      <!-- Detailed Stats -->
      <h3 class="section-title">📊 الإحصائيات التفصيلية</h3>
      <div class="card mb-lg">
        <div class="detail-stat">
          <span class="text-muted">إجمالي الدروس</span>
          <span class="text-gold" style="font-weight: 700">${state.stats.totalLessons}</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">الدروس المثالية</span>
          <span style="font-weight: 700; color: var(--success)">${state.stats.perfectLessons} 🏆</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">إجمالي الأسئلة</span>
          <span style="font-weight: 700">${state.stats.totalQuestions}</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">الإجابات الصحيحة</span>
          <span style="font-weight: 700; color: var(--success)">${state.stats.totalCorrect}</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">أطول سلسلة</span>
          <span style="font-weight: 700; color: var(--streak-fire)">${streak.longest} 🔥</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">دروع السلسلة</span>
          <span style="font-weight: 700">${streak.shields} 🛡️</span>
        </div>
        <div class="divider"></div>
        <div class="detail-stat">
          <span class="text-muted">بداية الرحلة</span>
          <span class="text-muted">${state.stats.startDate ? new Date(state.stats.startDate).toLocaleDateString('ar-SA') : '—'}</span>
        </div>
      </div>

      <!-- Sunnah Progress Overview -->
      <h3 class="section-title">🌳 تقدم السنن</h3>
      <div class="card mb-xl">
        <div class="progress-bar progress-bar-lg mb-sm">
          <div class="progress-bar-fill" style="width: ${totalSunnahs > 0 ? (learned / totalSunnahs) * 100 : 0}%"></div>
        </div>
        <div class="text-center text-muted" style="font-size: var(--fs-sm)">
          ${learned} / ${totalSunnahs} سنة
        </div>
      </div>
    </div>
    ${renderNavbar()}
  `;

  return { html, mount() {} };
}
