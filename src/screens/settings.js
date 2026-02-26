// ============================================
// AlSunah — Settings Screen
// ============================================

import { getState, setState } from '../engine/state.js';
import { exportState, importState, resetState } from '../utils/storage.js';
import { renderNavbar } from '../components/navbar.js';
import { applyTheme } from '../main.js';

export function settingsScreen() {
  const state = getState();
  const s = state.settings;
  const currentTheme = s.theme || 'classic';

  const html = `
    <div class="screen screen-padded">
      <div class="screen-header" style="padding: 0; margin-bottom: var(--space-lg)">
        <a href="#profile" class="screen-header-back">›</a>
        <span class="screen-header-title">⚙️ الإعدادات</span>
        <div></div>
      </div>

      <!-- Theme Picker -->
      <div class="settings-group">
        <div class="settings-group-title">🎨 المظهر</div>
        <div style="padding: var(--space-sm) 0">
          <div class="theme-picker">
            <button class="theme-option ${currentTheme === 'classic' ? 'active' : ''}" data-theme="classic">
              <div class="theme-option-preview" style="background: linear-gradient(135deg, #111 50%, #FFB800 50%);"></div>
              <div class="theme-option-label">كلاسيكي</div>
              <div class="text-muted" style="font-size: var(--fs-xs)">عنبري + خط عربي</div>
            </button>
            <button class="theme-option ${currentTheme === 'golden' ? 'active' : ''}" data-theme="golden">
              <div class="theme-option-preview" style="background: linear-gradient(135deg, #0D0D0D 50%, #D4AF37 50%);"></div>
              <div class="theme-option-label">ذهبي</div>
              <div class="text-muted" style="font-size: var(--fs-xs)">أزرق داكن + ذهبي</div>
            </button>
          </div>
        </div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">🔤</span>
            <span>حجم الخط</span>
          </div>
          <select class="settings-select" id="fontSizeSelect">
            <option value="small" ${s.fontSize === 'small' ? 'selected' : ''}>صغير</option>
            <option value="medium" ${s.fontSize === 'medium' ? 'selected' : ''}>متوسط</option>
            <option value="large" ${s.fontSize === 'large' ? 'selected' : ''}>كبير</option>
            <option value="xlarge" ${s.fontSize === 'xlarge' ? 'selected' : ''}>كبير جداً</option>
          </select>
        </div>
      </div>

      <!-- Content -->
      <div class="settings-group">
        <div class="settings-group-title">📚 المحتوى</div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">📝</span>
            <span>عرض التشكيل على الأحاديث</span>
          </div>
          <label class="toggle">
            <input type="checkbox" id="tashkeelToggle" ${s.showTashkeel ? 'checked' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <!-- Goals -->
      <div class="settings-group">
        <div class="settings-group-title">🎯 الأهداف</div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">📖</span>
            <span>الهدف اليومي (دقائق)</span>
          </div>
          <select class="settings-select" id="dailyGoalSelect">
            <option value="5" ${s.dailyGoal === 5 ? 'selected' : ''}>٥ دقائق</option>
            <option value="10" ${s.dailyGoal === 10 ? 'selected' : ''}>١٠ دقائق</option>
            <option value="15" ${s.dailyGoal === 15 ? 'selected' : ''}>١٥ دقيقة</option>
            <option value="20" ${s.dailyGoal === 20 ? 'selected' : ''}>٢٠ دقيقة</option>
          </select>
        </div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">🕌</span>
            <span>إعفاء يوم الجمعة من الستريك</span>
          </div>
          <label class="toggle">
            <input type="checkbox" id="fridayToggle" ${s.streakFridayExemption ? 'checked' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <!-- Data -->
      <div class="settings-group">
        <div class="settings-group-title">💾 البيانات</div>
        <div class="settings-item" style="cursor: pointer" id="exportBtn">
          <div class="settings-label">
            <span class="settings-label-icon">📤</span>
            <span>تصدير التقدم</span>
          </div>
          <span style="color: var(--text-muted)">›</span>
        </div>
        <div class="settings-item" style="cursor: pointer; position: relative" id="importBtn">
          <div class="settings-label">
            <span class="settings-label-icon">📥</span>
            <span>استيراد التقدم</span>
          </div>
          <input type="file" id="importFile" accept=".json" style="position: absolute; inset: 0; opacity: 0; cursor: pointer" />
          <span style="color: var(--text-muted)">›</span>
        </div>
        <div class="settings-item" style="cursor: pointer" id="resetBtn">
          <div class="settings-label">
            <span class="settings-label-icon">🗑️</span>
            <span style="color: var(--error)">إعادة ضبط كل التقدم</span>
          </div>
          <span style="color: var(--text-muted)">›</span>
        </div>
      </div>

      <!-- About -->
      <div class="settings-group">
        <div class="settings-group-title">ℹ️ حول التطبيق</div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">📱</span>
            <span>الإصدار</span>
          </div>
          <span class="text-muted">1.0.0 MVP</span>
        </div>
        <div class="settings-item">
          <div class="settings-label">
            <span class="settings-label-icon">📜</span>
            <span>المصادر</span>
          </div>
          <span class="text-muted">البخاري، مسلم، الترمذي، أبو داوود</span>
        </div>
      </div>

      <div class="text-center mt-xl mb-xl" style="font-size: var(--fs-xs); color: var(--text-muted)">
        السُّنَّة — أحيِ سننًا تُحيي أمة 🌙
      </div>
    </div>
    ${renderNavbar()}
  `;

  return {
    html,
    mount() {
      // Theme picker
      document.querySelectorAll('.theme-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const theme = btn.dataset.theme;
          setState(s => ({ ...s, settings: { ...s.settings, theme } }));
          applyTheme(theme);
          // Update active state
          document.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });

      // Font size
      document.getElementById('fontSizeSelect')?.addEventListener('change', (e) => {
        setState(s => ({ ...s, settings: { ...s.settings, fontSize: e.target.value } }));
        applyFontSize(e.target.value);
      });

      // Tashkeel
      document.getElementById('tashkeelToggle')?.addEventListener('change', (e) => {
        setState(s => ({ ...s, settings: { ...s.settings, showTashkeel: e.target.checked } }));
      });

      // Daily goal
      document.getElementById('dailyGoalSelect')?.addEventListener('change', (e) => {
        setState(s => ({ ...s, settings: { ...s.settings, dailyGoal: parseInt(e.target.value) } }));
      });

      // Friday exemption
      document.getElementById('fridayToggle')?.addEventListener('change', (e) => {
        setState(s => ({
          ...s,
          settings: { ...s.settings, streakFridayExemption: e.target.checked },
          streak: { ...s.streak, fridayExemption: e.target.checked },
        }));
      });

      // Export
      document.getElementById('exportBtn')?.addEventListener('click', exportState);

      // Import
      document.getElementById('importFile')?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            await importState(file);
            location.reload();
          } catch (err) {
            alert('فشل استيراد البيانات');
          }
        }
      });

      // Reset
      document.getElementById('resetBtn')?.addEventListener('click', () => {
        if (confirm('هل أنت متأكد؟ سيتم حذف جميع بياناتك.')) {
          resetState();
          location.reload();
        }
      });
    },
  };
}

function applyFontSize(size) {
  const map = { small: '14px', medium: '16px', large: '18px', xlarge: '20px' };
  document.documentElement.style.fontSize = map[size] || '16px';
}
