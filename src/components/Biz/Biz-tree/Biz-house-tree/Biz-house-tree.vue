<!--房产树-->
<template>
  <div class="biz-tree biz-house-tree clear" ref="biz-tree">
    <div class="house-tree-wrapper">
      <div v-show="showTree" class="tree-width">
        <!--树搜索框-->
        <el-autocomplete
          v-model="treeSearchInput"
          :fetch-suggestions="remoteSearch"
          value-key="houseFullName"
          placeholder="快速查询"
          suffix-icon="el-icon-search"
          clearable
          size="small"
          @select="houseTreeChange"
          @clear="houseTreeChange"
        ></el-autocomplete>

      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex';
  import request from './mixins/request';
  import {isEmptyObject} from '../../../../utils';
  export default {
    name: 'Biz-house-tree',

    mixins: [request],

    props: {
      // 树的显示隐藏
      changeStatus: {
        type: Object,
        default() {
          return {};
        },
      },

      treeType: {
        type: String,
      },

      searchConditions: {
        type: Object,
        default() {
          return {};
        },
      },
    },

    data(){
      return {
        showTree: '',

        treeData: [],
        treeloading: false,

        treeSearchInput: '',//搜索
        searchTip: '搜索数据中...',
      }
    },

    computed: {
      ...mapGetters(['$store__houseTreeData']),
    },

    methods: {
      /**
       * 树的显示隐藏
       * */
      treeToggle() {
        this.showTree = !this.showTree;
        this.changeStatus.status = this.showTree;   //外层根据该值重新计算
      },

      /**
       * init render tree
       */
      initRender() {
        console.log('$store__houseTreeData - 数据是否存在：');
        console.log(this.$store__houseTreeData);
        console.log(!isEmptyObject(this.$store__houseTreeData));

        if(!isEmptyObject(this.$store__orgTreeData)){
          this.treeData = this.$store__orgTreeData;
          this.treeSearchInput = this.$store.state.HouseTree.$store_searchQuery;
          this.nodeClick(this.$store.state.HouseTree.currentTreeNode);
        }else{
          this.getTreeData(true)
        }
      }
    },

    created(){
      this.initRender();
    }
  };
</script>

<style scoped>

</style>
