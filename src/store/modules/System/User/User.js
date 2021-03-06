import { getToken, setToken, removeToken, storageFactory } from '../../../../utils/auth';
import { oauthlogin, multipleEnterpriseLogin, ssoLogin } from '../../../../service/System/User/login';
import router from '../../../../router/index';
import $store from '@/store/index';

const userinfokey = storageFactory('user_info');

/**
 * deCrypto user-information data in cookie
 * @returns {{}}
 * @private
 */
function _deCryptoUserInfo() {
  return JSON.parse(localStorage.getItem(userinfokey)) || {};
}


const User = {
  state: {
    userinfo: {
      token: getToken(),
      userId: _deCryptoUserInfo().userId,
      userName: _deCryptoUserInfo().userName,
      avatar: _deCryptoUserInfo().avatar,
      userType: _deCryptoUserInfo().userType,
      userPhone: _deCryptoUserInfo().userPhone,
      userSex: _deCryptoUserInfo().userSex,
      themeColor: _deCryptoUserInfo().themeColor,
    },
  },
  mutations: {
    //login and set/store - token info
    SET_LOGIN_DATA: (state, data) => {

      //user information by login
      state.userinfo.userId = data.userId;
      state.userinfo.userName = data.userName;
      state.userinfo.avatar = data.avatar; //avatar data mock
      state.userinfo.userType = data.userType;
      state.userinfo.userPhone = data.userPhone;
      state.userinfo.userSex = data.userSex;
      state.userinfo.themeColor = data.themeColor;


      localStorage.setItem(userinfokey, JSON.stringify(state.userinfo));
    },

    //set token info
    SET_TOKEN: (state, data) => {
      setToken(data);
    },

    //empty
    EMPTY_STORAGE: (state, data) => {

      removeToken();

      $store.dispatch('delAllVisitedPages');
      $store.dispatch('delSideBarData');
      $store.dispatch('emptyPageInfo');

      $store.dispatch('emptyOrganizeTreeStore');

      localStorage.removeItem(userinfokey);
    },
  },

  actions: {
    //登录
    oauthlogin({ commit }, query) {
      return new Promise((resolve, reject) => {
        oauthlogin(query).then(res => {
          const userinfo = res.resultData || {};

          commit('SET_TOKEN', userinfo.token);
          commit('SET_LOGIN_DATA', userinfo);

          resolve(res.resultData);
        }).catch(err => {
          reject(err);
        });
      });
    },

    //多户登录
    multipleEnterpriseLogin({ commit }, query) {
      return multipleEnterpriseLogin(query).then(res => {
        const userinfo = res.resultData || {};

        commit('SET_TOKEN', userinfo.token);
        commit('SET_LOGIN_DATA', userinfo);
      });
    },

    //单点登录
    ssoLogin({ commit }, query) {
      return ssoLogin(query).then(res => {
        const userinfo = res.resultData || {};
        commit('SET_TOKEN', userinfo.token);
        commit('SET_LOGIN_DATA', userinfo);
      });
    },


    //更新用户信息
    updateLoginData({ commit }, query) {
      commit('SET_LOGIN_DATA', query);
    },

    //清除本地存储信息
    emptyStorage({ commit }) {
      return commit('EMPTY_STORAGE');
    },

    //退出
    logOut({ commit }) {

      $store.dispatch('emptyStorage');

      router.push({ path: '/front/login' });
    },

  },
};

export default User;
