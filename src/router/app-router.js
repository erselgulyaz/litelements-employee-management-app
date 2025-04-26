import { Router } from '@vaadin/router';

import '../pages/home-page.js';
import '../pages/employee-create-page.js';
import '../pages/employee-edit-page.js';

export const initRouter = () => {
  const outlet = document.getElementById('outlet');

  const router = new Router(outlet);
  router.setRoutes([
    { path: '/', component: 'home-page' },
    { path: '/add', component: 'employee-create-page' },
    { path: '/edit/:id', component: 'employee-edit-page' }
  ]);
};
