
const treeData = {
  state: {
    treeTempData: {

    }
  },

  mutations: {
    SET_TREE_DATA: (state, data)  => {
      if(data.key){
        state.treeTempData[data.key] = data.list;
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
