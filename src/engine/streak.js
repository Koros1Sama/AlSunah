// ============================================
// AlSunah Streak Engine
// ============================================

import { getState, setState } from './state.js';

export function checkStreak() {
  const s = getState();
  const today = getTodayStr();
  const yesterday = getYesterdayStr();
  const lastActive = s.streak.lastActiveDate;

  // Already active today
  if (lastActive === today) return s.streak;

  // Active yesterday — streak continues
  if (lastActive === yesterday) return s.streak;

  // Check Friday exemption
  if (s.streak.fridayExemption && isFriday(lastActive ? new Date(lastActive) : null)) {
    const dayBeforeYesterday = getDayBeforeYesterdayStr();
    if (lastActive === dayBeforeYesterday) return s.streak;
  }

  // Missed — check shields
  if (lastActive && lastActive !== today && lastActive !== yesterday) {
    if (s.streak.shields > 0) {
      setState(prev => ({
        ...prev,
        streak: { ...prev.streak, shields: prev.streak.shields - 1 },
      }));
      return getState().streak;
    }
    // Streak broken
    if (s.streak.current > 0) {
      setState(prev => ({
        ...prev,
        streak: { ...prev.streak, current: 0 },
      }));
    }
  }

  return getState().streak;
}

export function recordDailyActivity() {
  const today = getTodayStr();
  const s = getState();

  if (s.streak.lastActiveDate === today) return s.streak;

  const yesterday = getYesterdayStr();
  const isConsecutive = !s.streak.lastActiveDate || s.streak.lastActiveDate === yesterday;

  const newCurrent = isConsecutive ? s.streak.current + 1 : 1;
  const newLongest = Math.max(newCurrent, s.streak.longest);

  // Award shield every 7 days (max 3)
  const newShields = newCurrent > 0 && newCurrent % 7 === 0
    ? Math.min(3, s.streak.shields + 1)
    : s.streak.shields;

  setState(prev => ({
    ...prev,
    streak: {
      ...prev.streak,
      current: newCurrent,
      longest: newLongest,
      lastActiveDate: today,
      shields: newShields,
    },
  }));

  return getState().streak;
}

export function getStreakMilestone(days) {
  if (days >= 365) return { name: 'سنة كاملة', icon: '👑', tier: 'legendary' };
  if (days >= 180) return { name: 'إحياء', icon: '⭐', tier: 'epic' };
  if (days >= 90) return { name: 'استقامة', icon: '🌙', tier: 'rare' };
  if (days >= 40) return { name: 'هداية', icon: '🌟', tier: 'rare' };
  if (days >= 21) return { name: 'نور', icon: '☀️', tier: 'uncommon' };
  if (days >= 14) return { name: 'لهب', icon: '🔥', tier: 'uncommon' };
  if (days >= 7) return { name: 'جمرة', icon: '🔥', tier: 'common' };
  return { name: 'شرارة', icon: '🔥', tier: 'common' };
}

export function getStreakDisplay() {
  const s = getState();
  const milestone = getStreakMilestone(s.streak.current);
  return {
    days: s.streak.current,
    longest: s.streak.longest,
    shields: s.streak.shields,
    milestone,
    isActive: s.streak.lastActiveDate === getTodayStr(),
  };
}

// Date helpers
function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getDayBeforeYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return d.toISOString().slice(0, 10);
}

function isFriday(date) {
  return date && date.getDay() === 5;
}
