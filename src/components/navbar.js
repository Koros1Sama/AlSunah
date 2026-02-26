// ============================================
// AlSunah — Bottom Navigation Component
// ============================================

import { getCurrentRoute } from '../utils/router.js';

const navItems = [
  { route: 'home', icon: '🏠', label: 'الرئيسية' },
  { route: 'evidence', icon: '📖', label: 'الأدلة' },
  { route: 'habits', icon: '📅', label: 'سجل العمل' },
  { route: 'achievements', icon: '🏅', label: 'الإنجازات' },
  { route: 'profile', icon: '👤', label: 'حسابي' },
];

export function renderNavbar() {
  const current = getCurrentRoute();
  return `
    <nav class="bottom-nav" id="bottomNav">
      ${navItems.map(item => `
        <a href="#${item.route}" class="nav-item ${current === item.route ? 'active' : ''}" data-route="${item.route}">
          <span class="nav-item-icon">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      `).join('')}
    </nav>
  `;
}
