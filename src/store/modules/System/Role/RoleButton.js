import { roleButtonList } from '../../../../service/Role/role-button';


const RoleButton = {
  state: {
    roleButtonList: [],

    roleButton: {
      ACTION: [],
      FORM: [],
      GRID: [],
    },
  },

  mutations: {
    SET_ROLE_BUTTON_LIST: (state, data) => {
      state.roleButtonList = data;
      state.roleButton.ACTION = data.filter(item => item.areaType === 'ACTION');
      state.roleButton.FORM = data.filter(item => item.areaType === 'FORM');
      state.roleButton.GRID = data.filter(item => item.areaType === 'GRID');
    },

    CLEAR_ROLE_BUTTON_LIST:  (state) => {
      state.roleButtonList = [];
      state.roleButton.ACTION = [];
      state.roleButton.FORM = [];
      state.roleButton.GRID = [];
    },
  },

  actions: {
    getRoleButtonList: ({ commit }, requestHead) => {
      let btnlist = null;
      commit('CLEAR_ROLE_BUTTON_LIST');
      roleButtonList(requestHead)
        .then(response => {
          try {
            btnlist = response.resultData.map(item => {
              return {
                code: item.resourcebuttonCode, //按钮编码
                name: item.resourcebuttonName, //按钮名称
                nameEn: item.resourcebuttonNameEn, //按钮英文名称
                areaType: item.resourcebuttonType, //按钮区域类型
                index: item.syOrderindex, //排序号
                btnType: item.resourcebuttonBigiconcls, //按钮类型 （single / dropDown）
                disabled: item.resourcebuttonDisabled === '1',//是否禁用
                hide: item.resourcebuttonHidden === '1', //是否隐藏
                icon: item.resourcebuttonIconcls,//按钮图标
              };
            });
            console.log('请求的rolebtn数据',btnlist);
          }
          catch (e) {
            btnlist = [];
          }
          commit('SET_ROLE_BUTTON_LIST', btnlist);
        }).catch(err => {
          btnlist = [];
          commit('SET_ROLE_BUTTON_LIST', btnlist);
        },
      );
    },
  },

};

export default RoleButton;
