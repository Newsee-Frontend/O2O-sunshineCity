import keyRefer from '../../../components/Biz/Biz-sidebar/sidebar-keyRefer';

const PageInfo = {
  state: {
    pageinfoList: JSON.parse(localStorage.getItem('pi')) || [],
    currentPageInfo: {},
  },
  mutations: {
    SET_PAGE_INFO_LIST: (state, data) => {
      state.pageinfoList = data;
      localStorage.setItem('pi', JSON.stringify(data));
    },

    SET_CURRENT_PAGE: (state, data) => {
      state.currentPageInfo = data;
    },
  },
  actions: {
    setPageInfoList({ commit }, data) {
      let pageInfoList = [];
      if (!data || data.length < 1) {
        pageInfoList = [];
      }
      else {
        data.forEach((firstItem, firstIndex) => {
          if (firstItem[keyRefer['childMenus']] && firstItem[keyRefer['childMenus']].length > 0) {
            firstItem[keyRefer['childMenus']].forEach((secondItem, secondIndex) => {
              pageInfoList.push({
                name: secondItem[keyRefer['menuLabel']], //router-web name
                path: '/' + firstItem[keyRefer['menuRouter']] + '/' + secondItem[keyRefer['menuRouter']], //path
                firstMenuIndex: firstItem[keyRefer['menuIndex']] - 1, //first menu index ( -1 )
                secondMenuIndex: secondItem[keyRefer['menuIndex']] - 1, //second menu index ( -1 )
                funcId: secondItem[keyRefer['funcId']], //funcId
              });
            });
          } else {
            pageInfoList.push({
              name: firstItem[keyRefer['menuLabel']],
              path: '/' + firstItem[keyRefer['menuRouter']],
              funcId: firstItem[keyRefer['funcId']] ||  'normalFunic',
            });
          }
        });
      }
      commit('SET_PAGE_INFO_LIST', pageInfoList);
    },

    setCurrentPage({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENT_PAGE', data);
        resolve(data);
      });
    },

  },
};
export default PageInfo;
