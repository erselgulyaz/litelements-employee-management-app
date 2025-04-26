import { initRouter } from './router/app-router.js';

import '@components/elements/nav-bar';

window.addEventListener('load', () => {
  const lang = localStorage.getItem('lang') || 'tr';
  document.documentElement.lang = lang;
  initRouter();
});
