import { addPageTabs } from './pageTabsData';
import { judgeRoleAndJump } from './auxiliary';


/**
 * hook Fn for router
 */
export default {
  beforeEach: (to, from, next) => {
    if (to.meta.auth) {
      if (2) {
        judgeRoleAndJump(to, from, next)
      }
      else {
        next('/Front/login');
      }
    } else {
      next();
    }
  },
  afterEach: (to, from, next) => {
    if (to.meta.auth) {
      console.log('matched');
      console.log(to);
      addPageTabs(to.matched);
    }
  },
};
