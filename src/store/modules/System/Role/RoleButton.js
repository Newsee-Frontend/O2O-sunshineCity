import { roleButtonList } from '../../../../service/Role/role-button';


const RoleButton = {
  state: {
    roleButtonList: [],

    roleButton: {
      ACTION: [],
      FROM: [],
      GRID: [],
    },
  },

  mutations: {
    SET_ROLE_BUTTON_LIST: (state, data) => {

      state.roleButtonList = data;
      state.roleButton.ACTION = data.filter(item => item.areaType === 'ACTION');
      state.roleButton.FROM = data.filter(item => item.areaType === 'FROM');
      state.roleButton.GRID = data.filter(item => item.areaType === 'GRID');
      console.log(33333333333333);
      console.log(state.roleButton);
      console.log(33333333333333);

    },
  },

  actions: {
    getRoleButtonList: ({ commit }, requestHead) => {
      console.log(1111111111);
      let btnlist = null;
      roleButtonList(requestHead)
        .then(response => {
          console.log(222222222222);
          try {
            btnlist = response.resultData.map(item => {
              return {
                code: item.resourcebuttonCode, //按钮编码
                name: item.resourcebuttonName, //按钮名称
                nameEn: item.resourcebuttonNameEn, //按钮英文名称
                areaType: item.resourcebuttonType, //按钮区域类型
                index: item.syOrderindex, //排序号
                btnType: item.resourcebuttonBigiconcls, //按钮类型 （single / dropDown）
                hide: item.resourcebuttonHidden === '1', //是否隐藏
              };
            });
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
