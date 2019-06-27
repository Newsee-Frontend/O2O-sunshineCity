export default {
  methods: {
    /**
     * 生成树 请求入参
     */
    createRequestQuery() {
      // 控制只显示到公司节点
      const query = {};
      if (this.orgTypeFilter) {
        Object.assign(query, {orgType: this.orgTypeFilter});
      }
      return query;
    },


    /**
     * 获取树 搜索 数据
     */
    getSearchTreeData() {
      this.treeloading = true;//loading

      //search organize tree data
      this.$store.dispatch('getOrganizeTreeData', this.createRequestQuery()).then(res => {

        this.treeData = res;

        //树数据--更新数据
        this.$refs.organizeTree.initTree(this.treeData);

        this.childKey && (this.$refs.organizeTree.nodeSelectedByKey([this.childKey]));

        this.treeloading = false;
      });
    },


    /**
     * 获取树数据
     * @param isFirst
     */
    getTreeData(isFirst = false) {

      this.treeloading = true;//loading

      //first request : change searchConditions
      if (isFirst) {
        this.searchConditions.treeConditions = [
          {
            comparison: 'LIKE',
            fieldName: 'path',
            fieldValue: '/',
            type: 'text',
          },
        ];
      }

      //request organize tree data
      this.$store.dispatch('getOrganizeTreeData', this.createRequestQuery()).then(res => {

        this.treeData = this.organizeTreeData;

        this.$refs.organizeTree.initTree(this.treeData);

        //默认选中第一项
        this.childKey = res.organizationId;
        this.$refs.organizeTree.nodeSelectedByKey([this.childKey]);


        // searchConditions state change
        this.searchConditions.organizationId = res.organizationId;
        this.searchConditions.companyId = res.companyId;
        this.searchConditions.departmentId = res.departmentId;

        this.treeloading = false;

        // this.$emit('handle-click', null, true);
        this.$emit('tree-item-click', res);

      });
    },

  }
}
