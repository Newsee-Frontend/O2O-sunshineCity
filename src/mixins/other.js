
export default {
  data() {
    return {
      Mix_thlist: { thlistDefault: [] }, //筛选器中所需的表头数据
      Mix_loadState: { data: false, head: false }, //表格数据加载状态
      Mix_treeNodeObj: {}
    };
  },
  computed: {
    Mix_holderInfo() {
      return {
        fatherID: this.pageID + '-holder',
        childIDList: [this.pageID + '-search', this.pageID + '-grid-panel'],
      };
    },
  },
  created() {

  },
  methods: {

  },
};
