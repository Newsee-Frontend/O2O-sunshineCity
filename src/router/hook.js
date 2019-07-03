import {addPageTabs} from './pageTabsData';
import {judgeRoleAndJump} from './auxiliary';
import {getToken} from "../utils/auth";


/**
 * hook Fn for router
 */
export default {
  beforeEach: (to, from, next) => {
    if (to.meta.auth) {
      if (getToken()) {
        judgeRoleAndJump(to, from, next)
      }
      else {
        next('/front/login');
      }
    } else {
      next();
    }
  },
  afterEach: (to, from, next) => {
    if (to.meta.auth) {
      addPageTabs(to.matched);
    }
  },
};
