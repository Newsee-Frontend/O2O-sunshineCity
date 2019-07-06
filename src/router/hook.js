import { addPageTabs } from './pageTabsData';
import { judgeRoleAndJump, transQueryAndNext } from './auxiliary';
import { getToken } from '../utils/auth';


/**
 * hook Fn for router
 */
export default {
  beforeEach: (to, from, next) => {
    console.log('beforeEach-beforeEach');
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
    console.log('beforeResolve-beforeResolve');
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
    console.log('afterEach-afterEach');
    if (to.meta.auth) {
      addPageTabs(to.matched);
    }
  },
};
