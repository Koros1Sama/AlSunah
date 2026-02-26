// ============================================
// AlSunah — Main Entry Point
// ============================================

// Styles
import './styles/index.css';
import './styles/animations.css';
import './styles/screens.css';

// Router
import { registerRoute, initRouter } from './utils/router.js';

// Screens
import { homeScreen } from './screens/home.js';
import { categoryScreen } from './screens/category.js';
import { lessonScreen } from './screens/lesson.js';
import { profileScreen } from './screens/profile.js';
import { evidenceScreen } from './screens/evidence.js';
import { achievementsScreen } from './screens/achievements.js';
import { habitsScreen } from './screens/habits.js';
import { settingsScreen } from './screens/settings.js';

// Engine
import { getState } from './engine/state.js';
import { checkStreak } from './engine/streak.js';

// ---------- Register Routes ----------
registerRoute('home', homeScreen);
registerRoute('category', categoryScreen);
registerRoute('lesson', lessonScreen);
registerRoute('profile', profileScreen);
registerRoute('evidence', evidenceScreen);
registerRoute('achievements', achievementsScreen);
registerRoute('habits', habitsScreen);
registerRoute('settings', settingsScreen);

// ---------- Theme Helper ----------
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme || 'classic');
}

// ---------- Initialize ----------
function init() {
  // Check streak on app open
  checkStreak();

  // Apply saved settings
  const state = getState();

  // Apply theme (classic = default)
  applyTheme(state.settings.theme);

  // Apply font size
  if (state.settings.fontSize) {
    const map = { small: '14px', medium: '16px', large: '18px', xlarge: '20px' };
    document.documentElement.style.fontSize = map[state.settings.fontSize] || '16px';
  }

  // Mark first visit
  if (!state.stats.startDate) {
    import('./engine/state.js').then(m => {
      m.setState(s => ({
        ...s,
        stats: { ...s.stats, startDate: new Date().toISOString() },
      }));
    });
  }

  // Start router
  initRouter();
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
