import {addPageTabs} from './pageTabsData';
import {judgeRoleAndJump} from './auxiliary';
import {getToken} from "../utils/auth";

/**
 * hook Fn for router
 */
export default {
  beforeEach: (to, from, next) => {
    console.log(555555555);
    console.log(to);
    console.log(to.meta);
    console.log(to.meta.auth);
    if (to.meta.auth) {
      console.log(getToken());
      if (getToken()) {
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
