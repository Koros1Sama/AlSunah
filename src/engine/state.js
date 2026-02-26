// ============================================
// AlSunah State Engine — Central state manager
// ============================================

import { loadState, saveState } from '../utils/storage.js';

let state = null;
const listeners = new Set();

export function getState() {
  if (!state) state = loadState();
  return state;
}

export function setState(updater) {
  const prev = getState();
  if (typeof updater === 'function') {
    state = updater(prev);
  } else {
    state = { ...prev, ...updater };
  }
  saveState(state);
  notifyListeners();
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notifyListeners() {
  listeners.forEach(fn => fn(state));
}

// Convenience helpers
export function addXP(amount) {
  return setState(s => {
    const newXP = s.xp + amount;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > s.level;
    return {
      ...s,
      xp: newXP,
      level: newLevel,
      profile: {
        ...s.profile,
        title: getLevelTitle(newLevel),
      },
      _leveledUp: leveledUp,
      _prevLevel: s.level,
    };
  });
}

export function addHasanat(amount) {
  return setState(s => ({ ...s, hasanat: s.hasanat + amount }));
}

export function spendHasanat(amount) {
  const s = getState();
  if (s.hasanat < amount) return false;
  setState({ hasanat: s.hasanat - amount });
  return true;
}

export function completeLesson(lessonId, score, total, perfect) {
  return setState(s => {
    const xpEarned = calculateLessonXP(score, total, perfect);
    const hasanatEarned = perfect ? 10 : 5;

    const newXP = s.xp + xpEarned;
    const newLevel = calculateLevel(newXP);

    return {
      ...s,
      xp: newXP,
      level: newLevel,
      hasanat: s.hasanat + hasanatEarned,
      profile: {
        ...s.profile,
        title: getLevelTitle(newLevel),
      },
      completedLessons: {
        ...s.completedLessons,
        [lessonId]: {
          completedAt: new Date().toISOString(),
          score,
          total,
          perfect,
        },
      },
      stats: {
        ...s.stats,
        totalLessons: s.stats.totalLessons + 1,
        totalCorrect: s.stats.totalCorrect + score,
        totalQuestions: s.stats.totalQuestions + total,
        perfectLessons: s.stats.perfectLessons + (perfect ? 1 : 0),
      },
      _xpEarned: xpEarned,
      _hasanatEarned: hasanatEarned,
      _leveledUp: newLevel > s.level,
    };
  });
}

export function toggleFavoriteEvidence(evidenceId) {
  return setState(s => {
    const favs = s.favoriteEvidence || [];
    const idx = favs.indexOf(evidenceId);
    return {
      ...s,
      favoriteEvidence: idx >= 0
        ? favs.filter(id => id !== evidenceId)
        : [...favs, evidenceId],
    };
  });
}

export function logHabit(sunnahId) {
  const today = new Date().toISOString().slice(0, 10);
  return setState(s => {
    const log = { ...s.habitLog };
    if (!log[today]) log[today] = [];
    if (!log[today].includes(sunnahId)) {
      log[today] = [...log[today], sunnahId];
    }
    return { ...s, habitLog: log };
  });
}

export function setSunnahPractice(sunnahId, level) {
  // level: 'always' | 'often' | 'sometimes' | 'rarely' | 'never'
  return setState(s => ({
    ...s,
    sunnahPractice: {
      ...s.sunnahPractice,
      [sunnahId]: level,
    },
  }));
}

// ---------- XP Calculation ----------

function calculateLessonXP(score, total, perfect) {
  const baseXP = score * 10;
  const bonus = perfect ? total * 5 : 0; // Perfect bonus
  const completionBonus = 50;
  return baseXP + bonus + completionBonus;
}

const LEVEL_THRESHOLDS = [
  0, 100, 250, 450, 700,       // 1-5 مبتدئ
  1000, 1400, 1900, 2500, 3200, // 6-10 طالب
  4000, 5000, 6200, 7600, 9200, // 11-15 متعلم
  11000, 13000, 15500, 18500, 22000, // 16-20 ممارس
  26000, 30500, 35500, 41000, 47000, // 21-25 حافظ
  54000, 62000, 71000, 81000, 92000, // 26-30 مُحيي
  104000, 118000, 134000, 152000, 172000, // 31-35 قدوة
  195000, 220000, 250000, 285000, 325000, // 36-40 عالم بالسنة
  370000, 420000, 480000, 550000, 630000, // 41-45 إمام السنن
  720000, 820000, 940000, 1080000, 1250000, // 46-50
];

function calculateLevel(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function getXPForNextLevel(level) {
  if (level >= LEVEL_THRESHOLDS.length) return Infinity;
  return LEVEL_THRESHOLDS[level]; // level is 1-indexed, threshold[level] = next level
}

export function getXPProgress() {
  const s = getState();
  const currentThreshold = LEVEL_THRESHOLDS[s.level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[s.level] || currentThreshold + 1000;
  const progress = s.xp - currentThreshold;
  const needed = nextThreshold - currentThreshold;
  return { progress, needed, percentage: Math.min(100, (progress / needed) * 100) };
}

function getLevelTitle(level) {
  if (level <= 5) return 'مبتدئ';
  if (level <= 10) return 'طالب';
  if (level <= 15) return 'متعلم';
  if (level <= 20) return 'ممارس';
  if (level <= 25) return 'حافظ';
  if (level <= 30) return 'مُحيي';
  if (level <= 35) return 'قدوة';
  if (level <= 40) return 'عالم بالسنة';
  return 'إمام السنن';
}

export { calculateLevel, getLevelTitle };
