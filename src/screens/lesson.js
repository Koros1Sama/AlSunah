// ============================================
// AlSunah — Lesson Screen (Quiz-First Flow)
// Exercise -> Feedback -> ... -> Results + Learn
// ============================================

import { sunnahs, units, categories } from '../data/sunnahs.js';
import { getState, completeLesson, addHasanat } from '../engine/state.js';
import { recordDailyActivity } from '../engine/streak.js';
import { navigate } from '../utils/router.js';

let lessonState = {
  sunnahId: null,
  phase: 'exercise', // 'exercise', 'feedback', 'results'
  exerciseIndex: 0,
  score: 0,
  total: 0,
  answers: [],
  startTime: null,
};

export function lessonScreen(params) {
  const sunnahId = params.id;
  const sunnah = sunnahs[sunnahId];
  if (!sunnah) return { html: '<div class="screen"><p>\u0627\u0644\u0633\u0646\u0629 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f\u0629</p></div>', mount() {} };

  const unit = units[sunnah.unitId];
  const cat = categories.find(c => c.id === unit?.categoryId);

  // Initialize lesson state — start directly with exercises
  lessonState = {
    sunnahId,
    phase: 'exercise',
    exerciseIndex: 0,
    score: 0,
    total: sunnah.exercises.length,
    answers: [],
    startTime: Date.now(),
  };

  const html = `
    <div class="screen lesson-screen" id="lessonScreen">
      <!-- Lesson Header -->
      <div class="lesson-header">
        <button class="btn-icon btn-ghost" id="lessonClose" onclick="location.hash='#category?id=${cat?.id || 'food'}'">✕</button>
        <div class="lesson-progress-container">
          <div style="text-align: center; flex-shrink: 0">
            <div style="font-weight: 700; font-size: var(--fs-sm)">${cat?.name || ''}</div>
            <div class="text-muted" style="font-size: var(--fs-xs)" id="lessonProgressText">\u0627\u0644\u0633\u0624\u0627\u0644 1 \u0645\u0646 ${sunnah.exercises.length}</div>
          </div>
          <div class="progress-bar" style="flex: 1">
            <div class="progress-bar-fill" id="lessonProgressFill" style="width: 0%"></div>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0">
            <span id="lessonScoreText" style="font-weight: 700; color: var(--gold)">0</span>
            <span style="font-size: 16px">⭐</span>
          </div>
        </div>
      </div>

      <!-- Dynamic Content Area -->
      <div class="lesson-content" id="lessonContent"></div>

      <!-- Bottom Action Area -->
      <div class="lesson-action" id="lessonAction">
        <button class="btn btn-primary btn-block btn-lg" id="lessonActionBtn" disabled>
          \u062a\u062d\u0642\u0642 ✓
        </button>
      </div>
    </div>
  `;

  return {
    html,
    mount() {
      const content = document.getElementById('lessonContent');
      const action = document.getElementById('lessonAction');

      // Helper: always get the live action button from the DOM
      function getActionBtn() {
        return document.getElementById('lessonActionBtn');
      }

      // Helper: safely replace the action button with a fresh clone (removes all old listeners)
      function replaceActionBtn(newClickHandler) {
        const current = getActionBtn();
        if (!current) return null;
        const fresh = current.cloneNode(true);
        fresh.id = 'lessonActionBtn';
        current.parentNode.replaceChild(fresh, current);
        if (newClickHandler) fresh.addEventListener('click', newClickHandler);
        return fresh;
      }

      // Start directly with exercises
      renderCurrentExercise();

      function handleAction() {
        if (lessonState.phase === 'feedback') {
          // Move to next exercise or results
          lessonState.exerciseIndex++;
          if (lessonState.exerciseIndex >= lessonState.total) {
            showResults();
          } else {
            lessonState.phase = 'exercise';
            renderCurrentExercise();
          }
        } else if (lessonState.phase === 'results') {
          // Go back to category
          const unit = units[sunnah.unitId];
          navigate('category', { id: unit?.categoryId || 'food' });
        }
      }

      function renderCurrentExercise() {
        const exercise = sunnah.exercises[lessonState.exerciseIndex];
        content.innerHTML = renderExercise(exercise, lessonState.exerciseIndex);
        updateProgress();

        // Reset the action button to a clean state
        const btn = replaceActionBtn(null); // strip old listeners
        btn.textContent = 'تحقق ✓';
        btn.disabled = true;
        btn.classList.remove('btn-success', 'btn-error');
        btn.classList.add('btn-primary');

        // Bind exercise interaction
        bindExerciseEvents(exercise);
      }

      function bindExerciseEvents(exercise) {
        if (exercise.type === 'mcq' || exercise.type === 'evidence' || exercise.type === 'fill') {
          document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
              btn.classList.add('selected');

              // Replace button with a fresh clone bound to this specific answer
              const fresh = replaceActionBtn(() => {
                const selectedIdx = parseInt(btn.dataset.index);
                checkAnswer(exercise, selectedIdx);
              });
              fresh.disabled = false;
            });
          });
        } else if (exercise.type === 'truefalse') {
          document.querySelectorAll('.tf-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('selected'));
              btn.classList.add('selected');

              const fresh = replaceActionBtn(() => {
                const answer = btn.dataset.value === 'true';
                checkTrueFalse(exercise, answer);
              });
              fresh.disabled = false;
            });
          });
        } else if (exercise.type === 'order') {
          setupDragAndDrop(exercise);
        }
      }

      function checkAnswer(exercise, selectedIdx) {
        const correctIdx = exercise.correct ?? 0; // fill exercises: correct is always 0
        const isCorrect = selectedIdx === correctIdx;
        lessonState.answers.push({ exerciseIndex: lessonState.exerciseIndex, isCorrect, selected: selectedIdx });
        if (isCorrect) lessonState.score++;

        showFeedback(isCorrect, exercise, selectedIdx);
      }

      function checkTrueFalse(exercise, answer) {
        const isCorrect = answer === exercise.correct;
        lessonState.answers.push({ exerciseIndex: lessonState.exerciseIndex, isCorrect, selected: answer });
        if (isCorrect) lessonState.score++;

        showFeedbackTF(isCorrect, exercise);
      }

      function showFeedback(isCorrect, exercise, selectedIdx) {
        lessonState.phase = 'feedback';

        // Highlight correct/wrong options
        const correctIdx = exercise.correct ?? 0;
        document.querySelectorAll('.option-btn').forEach((btn, i) => {
          if (i === correctIdx) btn.classList.add('correct');
          if (i === selectedIdx && !isCorrect) btn.classList.add('wrong');
          btn.style.pointerEvents = 'none';
        });

        // Show evidence in feedback
        const evidenceHtml = sunnah.evidence ? `
          <div class="feedback-evidence">
            <div class="evidence-card" style="margin-top: var(--space-md)">
              <div class="evidence-text" style="font-size: var(--fs-sm); line-height: 1.8">${sunnah.evidence.text}</div>
              <div class="evidence-source">
                <span class="evidence-grade grade-${sunnah.evidence.grade}">${getGradeLabel(sunnah.evidence.grade)}</span>
                <span>${sunnah.evidence.source}</span>
              </div>
            </div>
          </div>
        ` : '';

        // Show XP popup
        if (isCorrect) {
          showXPPopup('+15 XP');
        }

        // Add feedback section
        const feedbackEl = document.createElement('div');
        feedbackEl.className = `lesson-feedback animate-slide-up ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
        feedbackEl.innerHTML = `
          <div class="feedback-title">${isCorrect ? '✅ أحسنت!' : '❌ إجابة خاطئة'}</div>
          ${!isCorrect ? `<div class="feedback-text">الإجابة الصحيحة: ${getCorrectAnswerText(exercise)}</div>` : ''}
          ${evidenceHtml}
        `;
        content.appendChild(feedbackEl);
        feedbackEl.scrollIntoView({ behavior: 'smooth' });

        // Update action button with fresh clone bound to handleAction
        const fresh = replaceActionBtn(handleAction);
        fresh.textContent = lessonState.exerciseIndex < lessonState.total - 1 ? 'التالي ←' : 'النتائج 🎉';
        fresh.disabled = false;
        fresh.classList.remove('btn-primary');
        fresh.classList.add(isCorrect ? 'btn-success' : 'btn-error');
      }

      function showFeedbackTF(isCorrect, exercise) {
        lessonState.phase = 'feedback';

        document.querySelectorAll('.tf-btn').forEach(btn => {
          const val = btn.dataset.value === 'true';
          if (val === exercise.correct) btn.classList.add('correct');
          if (val !== exercise.correct && btn.classList.contains('selected')) btn.classList.add('wrong');
          btn.style.pointerEvents = 'none';
        });

        const evidenceHtml = sunnah.evidence ? `
          <div class="evidence-card" style="margin-top: var(--space-md)">
            <div class="evidence-text" style="font-size: var(--fs-sm); line-height: 1.8">${sunnah.evidence.text}</div>
            <div class="evidence-source">
              <span class="evidence-grade grade-${sunnah.evidence.grade}">${getGradeLabel(sunnah.evidence.grade)}</span>
              <span>${sunnah.evidence.source}</span>
            </div>
          </div>
        ` : '';

        if (isCorrect) showXPPopup('+15 XP');

        const feedbackEl = document.createElement('div');
        feedbackEl.className = `lesson-feedback animate-slide-up ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
        feedbackEl.innerHTML = `
          <div class="feedback-title">${isCorrect ? '✅ أحسنت!' : '❌ إجابة خاطئة'}</div>
          ${exercise.explanation ? `<div class="feedback-text">${exercise.explanation}</div>` : ''}
          ${evidenceHtml}
        `;
        content.appendChild(feedbackEl);
        feedbackEl.scrollIntoView({ behavior: 'smooth' });

        const fresh = replaceActionBtn(handleAction);
        fresh.textContent = lessonState.exerciseIndex < lessonState.total - 1 ? 'التالي ←' : 'النتائج 🎉';
        fresh.disabled = false;
        fresh.classList.remove('btn-primary');
        fresh.classList.add(isCorrect ? 'btn-success' : 'btn-error');
      }

      function setupDragAndDrop(exercise) {
        // For ordering exercises — simplified click-to-order for touch
        const items = document.querySelectorAll('.order-item');
        let orderSelected = [];

        items.forEach(item => {
          item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.index);
            if (orderSelected.includes(idx)) {
              orderSelected = orderSelected.filter(i => i !== idx);
              item.classList.remove('selected');
              item.querySelector('.order-number').textContent = '';
            } else {
              orderSelected.push(idx);
              item.classList.add('selected');
              item.querySelector('.order-number').textContent = orderSelected.length;
            }

            if (orderSelected.length === exercise.items.length) {
              const fresh = replaceActionBtn(() => {
                const isCorrect = JSON.stringify(orderSelected) === JSON.stringify(exercise.correctOrder);
                lessonState.answers.push({ exerciseIndex: lessonState.exerciseIndex, isCorrect, selected: orderSelected });
                if (isCorrect) lessonState.score++;
                showOrderFeedback(isCorrect, exercise);
              });
              fresh.disabled = false;
            }
          });
        });
      }

      function showOrderFeedback(isCorrect, exercise) {
        lessonState.phase = 'feedback';

        if (isCorrect) showXPPopup('+15 XP');

        const feedbackEl = document.createElement('div');
        feedbackEl.className = `lesson-feedback animate-slide-up ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
        feedbackEl.innerHTML = `
          <div class="feedback-title">${isCorrect ? '✅ ترتيب صحيح!' : '❌ ترتيب خاطئ'}</div>
          ${!isCorrect ? `<div class="feedback-text">الترتيب الصحيح: ${exercise.correctOrder.map(i => exercise.items[i]).join(' ← ')}</div>` : ''}
        `;
        content.appendChild(feedbackEl);
        feedbackEl.scrollIntoView({ behavior: 'smooth' });

        const fresh = replaceActionBtn(handleAction);
        fresh.textContent = lessonState.exerciseIndex < lessonState.total - 1 ? 'التالي ←' : 'النتائج 🎉';
        fresh.disabled = false;
        fresh.classList.remove('btn-primary');
        fresh.classList.add(isCorrect ? 'btn-success' : 'btn-error');
      }

      function showResults() {
        lessonState.phase = 'results';
        const perfect = lessonState.score === lessonState.total;
        const percentage = Math.round((lessonState.score / lessonState.total) * 100);

        // Record completion
        const result = completeLesson(sunnahId, lessonState.score, lessonState.total, perfect);
        recordDailyActivity();

        // Track time-based achievements
        const hour = new Date().getHours();
        if (hour < 5) {
          import('../engine/state.js').then(m => {
            m.setState(s => ({ ...s, stats: { ...s.stats, earlyMorning: (s.stats.earlyMorning || 0) + 1 } }));
          });
        }
        if (hour >= 21) {
          import('../engine/state.js').then(m => {
            m.setState(s => ({ ...s, stats: { ...s.stats, lateNight: (s.stats.lateNight || 0) + 1 } }));
          });
        }
        if (new Date().getDay() === 5) {
          import('../engine/state.js').then(m => {
            m.setState(s => ({ ...s, stats: { ...s.stats, fridayLessons: (s.stats.fridayLessons || 0) + 1 } }));
          });
        }

        const resultsEmoji = perfect ? '🎉' : (percentage >= 70 ? '👏' : '💪');
        const resultsTitle = perfect ? 'درس مثالي!' : (percentage >= 70 ? 'أحسنت!' : 'حاول مرة ثانية!');
        const resultsSubtitle = perfect ? 'ما شاء الله، أجبت على كل الأسئلة بشكل صحيح' : 'راجع السنن وحاول مرة ثانية';

        content.innerHTML = `
          <div class="results-screen animate-scale-in">
            <div class="results-emoji">${resultsEmoji}</div>
            <div class="results-title">${resultsTitle}</div>
            <div class="results-subtitle text-muted">${resultsSubtitle}</div>

            <!-- Score Card -->
            <div class="card" style="text-align: center; margin-top: var(--space-lg)">
              <div style="font-size: var(--fs-4xl); font-weight: 800; color: var(--gold)">${percentage}%</div>
              <div class="text-muted" style="margin-bottom: var(--space-md)">${lessonState.score} إجابة صحيحة من ${lessonState.total}</div>
              <div class="progress-bar progress-bar-lg">
                <div class="progress-bar-fill" style="width: ${percentage}%; background: ${percentage >= 70 ? 'var(--success)' : 'var(--error)'}"></div>
              </div>
              <div class="results-stats" style="margin-top: var(--space-md)">
                <div class="results-stat">
                  <div class="results-stat-value" style="color: var(--error)">${lessonState.total - lessonState.score}</div>
                  <div class="results-stat-label">خطأ</div>
                </div>
                <div style="width: 1px; background: rgba(255,255,255,0.1); align-self: stretch"></div>
                <div class="results-stat">
                  <div class="results-stat-value" style="color: var(--success)">${lessonState.score}</div>
                  <div class="results-stat-label">صحيح</div>
                </div>
              </div>
            </div>

            <div class="results-rewards">
              <div class="reward-item animate-slide-up" style="animation-delay: 200ms">
                <span>⭐</span>
                <span>+${result._xpEarned || 0} XP</span>
              </div>
              <div class="reward-item animate-slide-up" style="animation-delay: 400ms">
                <span>💰</span>
                <span>+${result._hasanatEarned || 0} نقطة</span>
              </div>
              ${perfect ? '<div class="reward-item animate-bounce-in" style="animation-delay: 600ms"><span>🏆</span><span>درس مثالي!</span></div>' : ''}
            </div>

            <!-- Full Lesson Summary (shown AFTER quiz) -->
            <div style="margin-top: var(--space-xl)">
              <div style="font-size: var(--fs-lg); font-weight: 700; margin-bottom: var(--space-md); text-align: center">📖 ما تعلمناه</div>
              <div class="card" style="margin-bottom: var(--space-md)">
                <h3 style="color: var(--gold); margin-bottom: var(--space-sm)">${sunnah.name}</h3>
                <p style="color: var(--text-secondary); line-height: 1.8">${sunnah.explanation}</p>
                <div class="learn-meta" style="margin-top: var(--space-md)">
                  <div class="learn-meta-item">
                    <span class="learn-meta-icon">⏰</span>
                    <span>${sunnah.whenToApply}</span>
                  </div>
                  <div class="learn-meta-item">
                    <span class="learn-meta-icon">💡</span>
                    <span>${sunnah.benefit}</span>
                  </div>
                </div>
                ${sunnah.spiritualBenefit ? `
                  <div class="spiritual-note">
                    <span>🤲</span>
                    <span>${sunnah.spiritualBenefit}</span>
                  </div>
                ` : ''}
              </div>

              <!-- Evidence -->
              <div class="evidence-card">
                <div style="font-size: var(--fs-sm); color: var(--gold); margin-bottom: var(--space-sm); font-weight: 700">📜 الدليل</div>
                <div class="evidence-text" style="font-size: var(--fs-sm)">${sunnah.evidence.text}</div>
                <div class="evidence-source mt-sm">
                  <span class="evidence-grade grade-${sunnah.evidence.grade}">${getGradeLabel(sunnah.evidence.grade)}</span>
                  <span>${sunnah.evidence.source} — ${sunnah.evidence.narrator}</span>
                </div>
                <div class="text-muted mt-sm" style="font-size: var(--fs-xs)">${sunnah.evidence.book}</div>
              </div>

              <!-- Practice Survey (New Feature) -->
              <div class="practice-survey card" style="margin-top: var(--space-lg); border: 1px solid var(--border)">
                <div style="text-align: center; margin-bottom: var(--space-md)">
                  <div style="font-size: var(--fs-lg); font-weight: 700; color: var(--gold)">هل تطبق هذه السنة؟</div>
                  <div class="text-muted" style="font-size: var(--fs-sm); margin-top: 4px">تقييمك الذاتي يساعدك في التذكر وتحسين تطبيقك</div>
                </div>
                
                <div class="practice-options" id="practiceSurveyOptions">
                  <button class="practice-option" data-level="always">
                    <span class="po-icon">✅</span>
                    <span class="po-text">دائماً</span>
                  </button>
                  <button class="practice-option" data-level="often">
                    <span class="po-icon">🟢</span>
                    <span class="po-text">غالباً</span>
                  </button>
                  <button class="practice-option" data-level="sometimes">
                    <span class="po-icon">🟡</span>
                    <span class="po-text">أحياناً</span>
                  </button>
                  <button class="practice-option" data-level="rarely">
                    <span class="po-icon">🟠</span>
                    <span class="po-text">نادراً</span>
                  </button>
                  <button class="practice-option" data-level="never">
                    <span class="po-icon">❌</span>
                    <span class="po-text">لا أطبقها</span>
                  </button>
                </div>
                <div id="practiceSurveyThanks" style="display: none; text-align: center; color: var(--success); font-weight: bold; margin-top: var(--space-md); animation: fadeIn 0.3s">
                  تم حفظ إجابتك! سنذكرك بها في سجل العمل
                </div>
              </div>

            </div>
          </div>
        `;

        // Two buttons: retry + continue
        const actionArea = document.getElementById('lessonAction');
        if (actionArea) {
          actionArea.innerHTML = `
            <button class="btn ${percentage >= 70 ? 'btn-primary' : 'btn-primary'} btn-block btn-lg" id="lessonActionBtn">
              ${percentage >= 70 ? 'متابعة ←' : '🔄 أعد المحاولة'}
            </button>
            ${percentage < 70 ? `<button class="btn btn-secondary btn-block" id="lessonSkipBtn" style="margin-top: var(--space-sm)">رجوع للقائمة</button>` : ''}
          `;
        }

        // Setup practice survey logic
        import('../engine/state.js').then(({ getState, setSunnahPractice }) => {
          const state = getState();
          const currentLevel = state.sunnahPractice?.[sunnahId];
          const options = document.querySelectorAll('.practice-option');
          
          if (currentLevel) {
            options.forEach(opt => {
              if (opt.dataset.level === currentLevel) opt.classList.add('selected');
            });
          }

          options.forEach(opt => {
            opt.addEventListener('click', () => {
              options.forEach(o => o.classList.remove('selected'));
              opt.classList.add('selected');
              setSunnahPractice(sunnahId, opt.dataset.level);
              
              const thanks = document.getElementById('practiceSurveyThanks');
              if (thanks) {
                thanks.style.display = 'block';
                setTimeout(() => thanks.style.display = 'none', 3000);
              }
            });
          });
        });

        const newBtn = document.getElementById('lessonActionBtn');
        newBtn.addEventListener('click', () => {
          if (percentage >= 70) {
            navigate('category', { id: cat?.id || 'food' });
          } else {
            // Retry
            location.hash = `#lesson?id=${sunnahId}`;
          }
        });

        const skipBtn = document.getElementById('lessonSkipBtn');
        if (skipBtn) {
          skipBtn.addEventListener('click', () => {
            navigate('category', { id: cat?.id || 'food' });
          });
        }

        // Show confetti for perfect
        if (perfect) {
          showConfetti();
        }

        updateProgress();
      }

      function updateProgress() {
        const progressFill = document.getElementById('lessonProgressFill');
        const progressText = document.getElementById('lessonProgressText');
        const scoreText = document.getElementById('lessonScoreText');
        const idx = lessonState.exerciseIndex + (lessonState.phase === 'results' ? 1 : 0);

        if (progressFill) {
          const pct = (idx / lessonState.total) * 100;
          progressFill.style.width = `${pct}%`;
        }
        if (progressText) {
          progressText.textContent = `السؤال ${Math.min(idx + 1, lessonState.total)} من ${lessonState.total}`;
        }
        if (scoreText) {
          scoreText.textContent = lessonState.score;
        }
      }
    },
  };
}

function renderLearnPhase(sunnah) {
  return `
    <div class="learn-phase animate-fade-in">
      <div class="learn-icon">${units[sunnah.unitId]?.icon || '📖'}</div>
      <h2 class="learn-title">${sunnah.name}</h2>
      <p class="learn-explanation">${sunnah.explanation}</p>

      <div class="learn-meta">
        <div class="learn-meta-item">
          <span class="learn-meta-icon">⏰</span>
          <span>${sunnah.whenToApply}</span>
        </div>
        <div class="learn-meta-item">
          <span class="learn-meta-icon">💡</span>
          <span>${sunnah.benefit}</span>
        </div>
      </div>

      <div class="evidence-card mt-lg">
        <div style="font-size: var(--fs-sm); color: var(--gold); margin-bottom: var(--space-sm); font-weight: 700">📜 الدليل</div>
        <div class="evidence-text">${sunnah.evidence.text}</div>
        <div class="evidence-source mt-sm">
          <span class="evidence-grade grade-${sunnah.evidence.grade}">${getGradeLabel(sunnah.evidence.grade)}</span>
          <span>${sunnah.evidence.source} — ${sunnah.evidence.narrator}</span>
        </div>
        <div class="text-muted mt-sm" style="font-size: var(--fs-xs)">${sunnah.evidence.book}</div>
      </div>
    </div>
  `;
}

function renderExercise(exercise, index) {
  switch (exercise.type) {
    case 'mcq':
    case 'evidence':
    case 'fill':
      return `
        <div class="exercise animate-slide-up">
          <div class="exercise-icon-wrapper">❓</div>
          <div class="exercise-type-badge badge badge-gold">
            ${exercise.type === 'mcq' ? 'اختيار من متعدد' : exercise.type === 'evidence' ? 'اختر الدليل' : 'أكمل الفراغ'}
          </div>
          <h3 class="exercise-question">${exercise.question}</h3>
          <div class="options-list">
            ${(exercise.options).map((opt, i) => `
              <button class="option-btn" data-index="${i}">
                <span class="option-letter">${i + 1}</span>
                <span class="option-text">${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;

    case 'truefalse':
      return `
        <div class="exercise animate-slide-up">
          <div class="exercise-type-badge badge badge-gold">صح أو خطأ</div>
          <h3 class="exercise-question">${exercise.question}</h3>
          <div class="tf-options">
            <button class="tf-btn tf-true" data-value="true">
              <span class="tf-icon">✓</span>
              <span>صح</span>
            </button>
            <button class="tf-btn tf-false" data-value="false">
              <span class="tf-icon">✕</span>
              <span>خطأ</span>
            </button>
          </div>
        </div>
      `;

    case 'order':
      // Shuffle items for display
      const shuffled = exercise.items.map((item, i) => ({ item, origIdx: i }));
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return `
        <div class="exercise animate-slide-up">
          <div class="exercise-type-badge badge badge-gold">رتّب الخطوات</div>
          <h3 class="exercise-question">${exercise.question}</h3>
          <div class="order-list">
            ${shuffled.map(({ item, origIdx }) => `
              <button class="order-item" data-index="${origIdx}">
                <span class="order-number"></span>
                <span class="order-text">${item}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;

    default:
      return `<div class="exercise"><p>نوع تمرين غير مدعوم</p></div>`;
  }
}

function getGradeLabel(grade) {
  switch (grade) {
    case 'muttafaq': return '🟢 متفق عليه';
    case 'sahih': return '🔵 صحيح';
    case 'hasan': return '🟡 حسن';
    case 'quran': return '📖 آية قرآنية';
    default: return grade;
  }
}

function showXPPopup(text) {
  const popup = document.createElement('div');
  popup.className = 'xp-popup';
  popup.textContent = text;
  popup.style.top = '40%';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

function showConfetti() {
  const colors = ['#D4AF37', '#F5D061', '#FFD700', '#FF6B35', '#00C853', '#448AFF'];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 500}ms`;
    piece.style.animationDuration = `${1.5 + Math.random() * 1}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}

function getCorrectAnswerText(exercise) {
  if (exercise.type === 'fill') {
    return exercise.answer || exercise.options[0];
  }
  if (exercise.type === 'truefalse') {
    return exercise.correct ? 'صحيح' : 'خطأ';
  }
  // mcq, evidence
  return exercise.options?.[exercise.correct] || '';
}

export { getGradeLabel };
