/**
 * Organize tree
 * created: 2019/06/19.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2019 Broccoli spring( gcx )
 * @type {{state: {funcId: string}, mutations: {SET_FUNCID: Core.mutations.SET_FUNCID}, actions: {setFuncId({commit: *}, *=): void}}}
 */
import {treeDataFetch} from '../../../service/Tree/organize-tree';
import transformKeyFun from '../../../components/Biz/Biz-tree/utils/transformNode';
import keyRefer from '../../../components/Biz/Biz-tree/Biz-organize-tree/keyRefer';

const OrganizeTree = {
  state: {
    organizeTreeData: [],//organize tree data
    currentTreeNode: {},//current tree node information
  },
  mutations: {
    SET_ORGANIZE_TREE_DATA: (state, data) => {

      state.organizeTreeData = data;
      // alert('SET_ORGANIZE_TREE_DATA');
      // alert(data[0].expanded);
      // alert(state.organizeTreeData[0].expanded);
    },
    SET_CURRENT_TREE_NODE: (state, data) => {
      state.currentTreeNode = data;
    }
  }
  ,
  actions: {
    getOrganizeTreeData({commit}, query) {
      return new Promise((resolve, reject) => {
          treeDataFetch(query).then(res => {
            console.log('请求到组织树数据，如下：');
            console.log(res.resultData);

            const storeData = transformKeyFun([res.resultData], keyRefer, {expandedIndex: 1});//转换树数据
            const initCurrentNode = storeData[0];//default is to take the top-level node as the initialization selected node

            commit('SET_ORGANIZE_TREE_DATA', storeData);
            commit('SET_CURRENT_TREE_NODE', initCurrentNode);//store current tree node noject

            resolve(res.resultData);
          })
        }
      );
    },
    getCurrentTreeNode({commit}, data) {
      commit('SET_CURRENT_TREE_NODE', data);
    },
    asyncOrganizeTreeData({commit}, data) {
      console.log('同步 同步 同步 同步- 组织树数据如下');
      console.log(data);
      commit('SET_ORGANIZE_TREE_DATA', data);
    }
  },
};
export default OrganizeTree;
