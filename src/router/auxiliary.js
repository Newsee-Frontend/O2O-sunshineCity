import $store from '../store/index';
import {logStyle} from '../utils/log';

/**
 * judge role and jump
 * @param to
 * @param from
 * @param next
 */
export function judgeRoleAndJump(to, from, next) {
  const currentPageInfo = $store.state.PageInfo.pageinfoList.find((item) => {
    return item.path === to.path;
  }) || {};

  $store.dispatch('setCurrentPage', currentPageInfo).then(info => {
    $store.dispatch('setFuncId', info.funcId);//store current funcId from current page info

    _routerAndpageInfo(to);

    next();
  });
}


/**
 * router and page information show in console
 * @param to
 * @private
 */
function _routerAndpageInfo(to) {
  console.log('%c\n## 当前跳转页面的相关信息展示 ##\n', logStyle('3DTest'));
  console.log('%c========================', logStyle('tit'));
  console.log('%c1、跳转页面:', logStyle('info'));
  console.log('%c' + to.name, logStyle('text'));
  console.log('%c2、跳转路径:', logStyle('info'));
  console.log('%c' + to.path, logStyle('text'));
  console.log('%c3、funcId值:', logStyle('info'));
  console.log('%c' + $store.state.Core.funcId, logStyle('text'));
  console.log('%c============', logStyle('line'));
  console.log('%c4、所有页面相关信息列表如下:', logStyle('info'));
  console.log($store.state.PageInfo.pageinfoList);
  console.log('%c========================', logStyle('tit'));
}
