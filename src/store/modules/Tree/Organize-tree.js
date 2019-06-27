/**
 * Organize tree
 * created: 2019/06/19.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2019 Broccoli spring( gcx )
 * @type {{state: {funcId: string}, mutations: {SET_FUNCID: Core.mutations.SET_FUNCID}, actions: {setFuncId({commit: *}, *=): void}}}
 */
import {treeDataFetch} from '../../../service/Tree/organize-tree';


const OrganizeTree = {
  state: {
    organizeTreeData: [],
  },
  mutations: {
    SET_ORGANIZE_TREE_DATA: (state, data) => {

      state.organizeTreeData = data;
      // alert('SET_ORGANIZE_TREE_DATA');
      // alert(data[0].expanded);
      // alert(state.organizeTreeData[0].expanded);
    },

  },
  actions: {
    getOrganizeTreeData({commit}, query) {
      return new Promise((resolve, reject) => {
          treeDataFetch(query).then(res => {
            console.log('请求到组织树数据，如下：');
            console.log(res.resultData);
            commit('SET_ORGANIZE_TREE_DATA', [res.resultData]);
            resolve(res.resultData);
          })
        }
      );
    },

    asyncOrganizeTreeData({commit}, data) {
      console.log('同步 同步 同步 同步- 组织树数据如下');
      console.log(data);
      commit('SET_ORGANIZE_TREE_DATA', data);
    }
  },
};
export default OrganizeTree;
