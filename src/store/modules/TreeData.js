
const treeData = {
  state: {
    orgnizeTree: []
  },

  mutations: {
    SET_TREE_DATA: (state, data)  => {
      if(data.list && data.list.length > 0){
        state.orgnizeTree = data.list;
      }
    }
  },

  actions: {
    setTreeData({commit},data){
      commit('SET_TREE_DATA',data)
    }
  }


};


export default treeData;
