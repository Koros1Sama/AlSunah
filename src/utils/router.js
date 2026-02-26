// ============================================
// AlSunah Router — Simple hash-based SPA router
// ============================================

const routes = {};
let currentScreen = null;
let currentCleanup = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path, params = {}) {
  const hash = params && Object.keys(params).length
    ? `#${path}?${new URLSearchParams(params).toString()}`
    : `#${path}`;
  window.location.hash = hash;
}

export function getParams() {
  const hash = window.location.hash.slice(1);
  const [, queryString] = hash.split('?');
  if (!queryString) return {};
  return Object.fromEntries(new URLSearchParams(queryString));
}

export function getCurrentRoute() {
  const hash = window.location.hash.slice(1);
  return hash.split('?')[0] || 'home';
}

async function handleRoute() {
  const app = document.getElementById('app');
  const route = getCurrentRoute();
  const params = getParams();
  const handler = routes[route] || routes['home'];

  if (!handler) return;

  // Cleanup previous screen
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // Transition out
  const screenEl = app.querySelector('.screen');
  if (screenEl) {
    screenEl.classList.add('screen-exit');
    await new Promise(r => setTimeout(r, 150));
  }

  // Render new screen
  const result = handler(params);
  app.innerHTML = result.html;

  // Transition in
  const newScreen = app.querySelector('.screen');
  if (newScreen) {
    newScreen.classList.add('screen-enter');
  }

  // Mount (event listeners, etc.)
  if (result.mount) {
    currentCleanup = result.mount() || null;
  }

  currentScreen = route;
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);

  // Initial route
  if (!window.location.hash) {
    window.location.hash = '#home';
  } else {
    handleRoute();
  }
}
