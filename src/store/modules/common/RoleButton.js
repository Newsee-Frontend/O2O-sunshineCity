const RoleButton =  {
  state: {
    roleButtonList: [],
  },

  mutations: {
    SET_ROLE_BUTTON_LIST: (state, data) =>{
      state.roleButtonList = data
    }
},

  actions: {
    setRoleButtonList: ({commit}, data) =>{
      commit('SET_ROLE_BUTTON_LIST', data)
    }
  }

};

export default RoleButton;
