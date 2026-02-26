// ============================================
// AlSunah — Achievement Definitions
// ============================================

export const achievements = [
  // --- Progress ---
  { id: 'first-step', name: 'الخطوة الأولى', desc: 'أكمل أول درس', icon: '👣', category: 'progress', condition: s => s.stats.totalLessons >= 1 },
  { id: 'curious', name: 'الفضولي', desc: 'أكمل ١٠ دروس', icon: '🔍', category: 'progress', condition: s => s.stats.totalLessons >= 10 },
  { id: 'scholar', name: 'الباحث', desc: 'أكمل ٥٠ درس', icon: '📚', category: 'progress', condition: s => s.stats.totalLessons >= 50 },
  { id: 'category-master', name: 'العالم', desc: 'أكمل كل دروس فئة واحدة', icon: '🎓', category: 'progress', condition: (s, helpers) => helpers.hasCompletedAnyCategory(s) },
  { id: 'encyclopedic', name: 'الموسوعي', desc: 'أكمل كل الفئات', icon: '🏛️', category: 'progress', condition: (s, helpers) => helpers.hasCompletedAllCategories(s) },

  // --- Mastery ---
  { id: 'precise', name: 'الدقيق', desc: '١٠ دروس Perfect متتالية', icon: '🎯', category: 'mastery', condition: s => s.stats.perfectLessons >= 10 },
  { id: 'flawless', name: 'بلا خطأ', desc: 'أكمل اختبار وحدة بدون أخطاء', icon: '✨', category: 'mastery', condition: s => s.stats.perfectLessons >= 1 },
  { id: 'evidence-keeper', name: 'حافظ الأدلة', desc: 'أجب على ٥٠ سؤال أدلة صحيحاً', icon: '📜', category: 'mastery', condition: s => (s.stats.evidenceCorrect || 0) >= 50 },
  { id: 'accuracy-90', name: 'المتقن', desc: 'حقق دقة ٩٠٪ أو أعلى إجمالياً', icon: '🏅', category: 'mastery', condition: s => s.stats.totalQuestions > 0 && (s.stats.totalCorrect / s.stats.totalQuestions) >= 0.9 },

  // --- Commitment ---
  { id: 'streak-7', name: 'المواظب', desc: 'ستريك ٧ أيام', icon: '🔥', category: 'commitment', condition: s => s.streak.longest >= 7 },
  { id: 'streak-30', name: 'الثابت', desc: 'ستريك ٣٠ يوم', icon: '💪', category: 'commitment', condition: s => s.streak.longest >= 30 },
  { id: 'streak-90', name: 'الصامد', desc: 'ستريك ٩٠ يوم', icon: '🏔️', category: 'commitment', condition: s => s.streak.longest >= 90 },
  { id: 'streak-365', name: 'المحيي', desc: 'ستريك ٣٦٥ يوم', icon: '👑', category: 'commitment', condition: s => s.streak.longest >= 365 },
  { id: 'early-bird', name: 'البكّير', desc: 'تعلّم قبل الفجر ٧ مرات', icon: '🌅', category: 'commitment', condition: s => (s.stats.earlyMorning || 0) >= 7 },
  { id: 'night-owl', name: 'الليلي', desc: 'تعلّم بعد العشاء ٧ مرات', icon: '🌙', category: 'commitment', condition: s => (s.stats.lateNight || 0) >= 7 },

  // --- Hidden ---
  { id: 'secret-friday', name: 'المُجمِّع', desc: '???', icon: '🕌', category: 'hidden', hidden: true, condition: s => (s.stats.fridayLessons || 0) >= 10, revealedDesc: 'أكمل درساً يوم الجمعة ١٠ مرات' },
  { id: 'secret-review', name: 'المراجع الحكيم', desc: '???', icon: '🔄', category: 'hidden', hidden: true, condition: s => (s.stats.reviewsAfter30Days || 0) >= 1, revealedDesc: 'راجع سنة بعد ٣٠ يوم من تعلمها' },
  { id: 'secret-tree', name: 'البستاني', desc: '???', icon: '🐣', category: 'hidden', hidden: true, condition: s => (s.stats.treeClicks || 0) >= 10, revealedDesc: 'اضغط على الشجرة ١٠ مرات' },
  { id: 'secret-collector', name: 'جامع النقاط', desc: '???', icon: '💎', category: 'hidden', hidden: true, condition: s => s.hasanat >= 1000, revealedDesc: 'اجمع ١٠٠٠ نقطة' },

  // --- Habit ---
  { id: 'habit-first', name: 'أول تطبيق', desc: 'سجّل أول سنة في سجل العمل', icon: '✅', category: 'habit', condition: s => Object.keys(s.habitLog).length >= 1 },
  { id: 'habit-week', name: 'أسبوع عمل', desc: 'سجّل سنن ٧ أيام في سجل العمل', icon: '📅', category: 'habit', condition: s => Object.keys(s.habitLog).length >= 7 },
  { id: 'habit-diverse', name: 'المتنوع', desc: 'طبّق ١٠ سنن مختلفة', icon: '🌈', category: 'habit', condition: s => { const all = new Set(); Object.values(s.habitLog).forEach(arr => arr.forEach(id => all.add(id))); return all.size >= 10; } },
];

export function checkAchievements(state, helpers = {}) {
  const newUnlocks = [];
  const defaultHelpers = {
    hasCompletedAnyCategory: (s) => {
      const { categories, units, sunnahs } = require('../data/sunnahs.js');
      return categories.some(cat => {
        const catLessons = [];
        cat.units.forEach(uid => {
          const u = units[uid];
          if (u) catLessons.push(...u.lessons);
        });
        return catLessons.length > 0 && catLessons.every(lid => s.completedLessons[lid]);
      });
    },
    hasCompletedAllCategories: (s) => {
      const { categories, units } = require('../data/sunnahs.js');
      return categories.every(cat => {
        const catLessons = [];
        cat.units.forEach(uid => {
          const u = units[uid];
          if (u) catLessons.push(...u.lessons);
        });
        return catLessons.length > 0 && catLessons.every(lid => s.completedLessons[lid]);
      });
    },
    ...helpers,
  };

  for (const ach of achievements) {
    if (state.achievements[ach.id]) continue;
    try {
      if (ach.condition(state, defaultHelpers)) {
        newUnlocks.push(ach);
      }
    } catch (e) {
      // Skip broken conditions
    }
  }

  return newUnlocks;
}

export function getAchievementById(id) {
  return achievements.find(a => a.id === id);
}
