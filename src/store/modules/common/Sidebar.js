import {sideBarService} from '../../../service/Sidebar/index';
import $store from '../../index';
import keyRefer from '../../../components/Biz/Biz-sidebar/sidebar-keyRefer';

/**
 * filter side bar data
 * @param list
 * @returns {*}
 * @private
 */
let _filtersidelist = (list) => {
  list.forEach(item => {
    item.hide = item[keyRefer['hide']] === '1';
    item.childMenus && item.childMenus.forEach(item => {
      item.hide = item.syStatus === '1'
    });
  });
  return list;
};


const SideBar = {
  state: {
    sideBarList: JSON.parse(sessionStorage.getItem('nav')),
    firstpath: null,
  },
  mutations: {
    SET_SIDEBAR_DATA: (state, data) => {
      state.sideBarList = data.side;
      state.firstpath = data.entry;
      sessionStorage.setItem('nav', JSON.stringify(data.side));
    },
  },
  actions: {
    generateSideBar({commit}) {
      return new Promise((resolve, reject) => {
        sideBarService().then(res => {
          const list = res.resultData || [];
          let sideBarList = _filtersidelist(list);
          commit('SET_SIDEBAR_DATA', {
            side: sideBarList,
            entry: ''
          });
          $store.dispatch('setPageInfoList', sideBarList);
          resolve(list)
        }).catch(err => {
          reject(err)
        });
      })
    },
  },
};
export default SideBar;
