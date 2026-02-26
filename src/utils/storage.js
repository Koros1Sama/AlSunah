// ============================================
// AlSunah Storage — localStorage wrapper
// ============================================

const STORAGE_KEY = 'alsunah_data';

const defaultState = {
  // User profile
  profile: {
    name: 'مستخدم',
    icon: '🌙',
    frame: 'default',
    title: 'مبتدئ',
  },

  // Progress
  xp: 0,
  level: 1,
  hasanat: 0,

  // Streak
  streak: {
    current: 0,
    longest: 0,
    lastActiveDate: null,
    shields: 0,
    fridayExemption: true,
  },

  // Completed lessons: { [lessonId]: { completedAt, score, perfect } }
  completedLessons: {},

  // Unit mastery: { [unitId]: { level: 0-5, lastReviewDate } }
  unitMastery: {},

  // Category progress: { [categoryId]: { started, lessonsCompleted, totalLessons } }
  categoryProgress: {},

  // Achievement unlocks: { [achievementId]: { unlockedAt } }
  achievements: {},

  // Habit tracker: { [date]: [sunnahId, ...] }
  habitLog: {},

  // Favorite evidence (hadith/ayah IDs)
  favoriteEvidence: [],

  // Stats
  stats: {
    totalLessons: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    totalTimeMs: 0,
    perfectLessons: 0,
    startDate: null,
  },

  // Daily quest progress
  dailyQuests: {
    date: null,
    quests: [],
  },

  // Settings
  settings: {
    theme: 'classic',
    fontSize: 'medium',
    showTashkeel: true,
    dailyGoal: 10,
    notifications: true,
    streakFridayExemption: true,
  },

  // Sunnah practice self-assessment
  sunnahPractice: {}, // { [sunnahId]: 'always'|'often'|'sometimes'|'rarely'|'never' }

  // First launch
  hasOnboarded: false,
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState, stats: { ...defaultState.stats, startDate: new Date().toISOString() } };

    const saved = JSON.parse(raw);
    // Deep merge with defaults to handle new fields
    return deepMerge(defaultState, saved);
  } catch (e) {
    console.error('Failed to load state:', e);
    return { ...defaultState };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultState, stats: { ...defaultState.stats, startDate: new Date().toISOString() } };
}

export function exportState() {
  const state = loadState();
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `alsunah-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importState(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        const merged = deepMerge(defaultState, imported);
        saveState(merged);
        resolve(merged);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
