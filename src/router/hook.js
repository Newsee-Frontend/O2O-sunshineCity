import { addPageTabs } from './pageTabsData';
import { judgeRoleAndJump } from './auxiliary';
import { getToken } from '../utils/auth';


/**
 * hook Fn for router
 */
export default {
  beforeEach: (to, from, next) => {

    if (to.meta.auth) {
      if (getToken()) {
        judgeRoleAndJump(to, from, next);
      }
      else {
        next('/front/login');
      }
    } else {
      next();
      // transQueryAndNext(to, from, next);
    }
  },

  beforeResolve: (to, from, next) => {

    const transKey = 'isShowFrame';
    if (to.query[transKey]) {
      next();
      return;
    }
    if (from.query[transKey]) {
      let toQuery = JSON.parse(JSON.stringify(to.query));
      toQuery[transKey] = from.query[transKey];
      next({
        path: to.path,
        query: toQuery,
      });
    }
    else {
      next();
    }
  },


  afterEach: (to, from, next) => {

    if (to.meta.auth) {
      addPageTabs(to.matched);
    }
  },
};
