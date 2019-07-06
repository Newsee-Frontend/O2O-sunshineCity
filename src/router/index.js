import Vue from 'vue';
import Router from 'vue-router';
import hook from './hook';


import Public from './modules/public';
import User from './modules/user';
import System from './modules/system';
import Community from './modules/community';

const routes = [...Public, ...User, ...System, ...Community];


Vue.use(Router);

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach(hook.beforeEach);
router.beforeResolve(hook.beforeResolve);
router.afterEach(hook.afterEach);

export default router;
