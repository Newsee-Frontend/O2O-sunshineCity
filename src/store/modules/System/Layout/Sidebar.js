import { sideBarService } from '../../../../service/System/Layout/sideBar';
import keyRefer from '../../../../components/Biz/Ns-biz-sidebar/sidebar-keyRefer';
import { storageFactory } from '../../../../utils/auth';
import $store from '@/store/index';

const navkey = storageFactory('nav');


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
      item.hide = item.syStatus === '1';
    });
  });
  return list;
};


const SideBar = {
  state: {
    sideBarList: JSON.parse(localStorage.getItem(navkey)),
    firstpath: null,
  },
  mutations: {
    SET_SIDEBAR_DATA: (state, data) => {
      state.sideBarList = data.side;
      state.firstpath = data.entry;
      localStorage.setItem(navkey, JSON.stringify(data.side));
    },
    DEL_SIDEBAR_DATA: (state, data) => {
      state.sideBarList = [];
      state.firstpath = null;
      localStorage.removeItem(navkey);
    },
  },
  actions: {
    generateSideBar({ commit }) {
      return new Promise((resolve, reject) => {
        sideBarService().then(res => {
          const list = res.resultData || [];
          let sideBarList = _filtersidelist(list);
          commit('SET_SIDEBAR_DATA', {
            side: sideBarList,
            entry: '',
          });
          $store.dispatch('setPageInfoList', sideBarList);
          resolve(list);
        }).catch(err => {
          reject(err);
        });
      });
    },
    delSideBarData: ({ commit }) => {
      commit('DEL_SIDEBAR_DATA');
    },
  },
};
export default SideBar;
