<template>
  <div class="origanize-tree-wrapper">
    <!--树显示按钮-->
    <ns-icon-svg v-show="!showTree" @click="treeToggle" icon-class="hj" class="zhankai"></ns-icon-svg>
    <!--树隐藏按钮-->
    <ns-icon-svg v-show="showTree" @click="treeToggle" icon-class="shouqi1" class="shouqi"></ns-icon-svg>

    <div v-show="showTree" class="tree-width">
      <!--树搜索框-->
      <el-autocomplete
        v-model="treeInput"
        :fetch-suggestions="remoteSearch"
        value-key="organizationName"
        placeholder="快速查询"
        suffix-icon="el-icon-search"
        clearable
        size="small"
        @select="origanizeTreeSearch"
        @clear="origanizeTreeSearch"
      ></el-autocomplete>
      <!--树主体-->
      <div class="tree-body">
        <p class="treeTitle" ref="title">{{ title }}</p>
        <h1>{{organizeTreeData.length>0?organizeTreeData[0].expanded:''}}</h1>
        <ns-tree
          ref="organizeTree"

          v-loading="treeloading"
          :draggable="draggable"
          expandAllNodes
          :dropJudge="dropJudge"
          :keyRefer="keyRefer"
          @nodeClick="nodeClick"
        >
          <template slot-scope="{node, parent,index}">
            <div class="slot-container">
              <div class="title-text">
                {{node.organizationName}}
              </div>

              <el-dropdown
                trigger="click"
                :hide-on-click="true"
                v-if="showFunction"
              >
                  <span
                    @click.stop
                    class="fnsicon_svg_span"
                  >
                  <img
                    class="tree_node_img_more"
                    src="../../../../assets/img/tree/more@2x.png"
                  />
                </span>

                <el-dropdown-menu slot="dropdown" class="tree-more-dropdown">
                  <el-dropdown-item @click.native.stop="treeEdit(node, parent)">
                    编辑
                  </el-dropdown-item>
                  <el-dropdown-item v-if="node.isHasChild === false">
                    <ns-popover placement="top" width="280" trigger="click">
                      <p>
                        "{{ node.organizationShortName }}"&nbsp;删除后不可恢复，确定继续删除吗？
                      </p>
                      <div class="prompt-delete">
                        <ns-button type="primary" size="mini" @click.native="treeDelete(node, parent,index)">确 定</ns-button>
                        <ns-button size="mini" @click="cancel">取 消</ns-button>
                      </div>
                      <div slot="reference">删除</div>
                    </ns-popover>
                  </el-dropdown-item>
                  <template>
                    <el-dropdown-item divided disabled>
                      <p class="addChildre">新增子节点</p>
                    </el-dropdown-item>
                    <template v-if="node.organizationType === 0 || node.organizationType === 1">
                      <el-dropdown-item @click.native="fnclick(node, 'company')">
                        <ns-icon-svg icon-class="dian-copy"></ns-icon-svg>
                        新建子公司
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="fnclick(node, 'department')">
                        <ns-icon-svg icon-class="dian-copy"></ns-icon-svg>
                        新建部门
                      </el-dropdown-item>
                    </template>
                    <template v-else>
                      <el-dropdown-item @click.native="fnclick(node, 'department')">
                        <ns-icon-svg icon-class="dian-copy"></ns-icon-svg>
                        新建子部门
                      </el-dropdown-item>
                    </template>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </ns-tree>
      </div>
      <!--新建编辑子公司-->
      <add-or-edit-company
        v-if="dialogVisible.companyVisible.visible"
        :companyVisible="dialogVisible.companyVisible"
        :type="companyDialogObj.type"
        :nodeInfo="companyDialogObj.nodeInfo"
        :parentNodeInfo="companyDialogObj.parentNodeInfo"
        @query="getTreeData"
      ></add-or-edit-company>
      <!--部门编辑弹出框-->
      <add-or-edit-department
        v-if="dialogVisible.departmentVisible.visible"
        :visible="dialogVisible.departmentVisible"
        :type="departmentDialogObj.type"
        :nodeInfo="departmentDialogObj.nodeInfo"
        :parentNodeInfo="departmentDialogObj.parentNodeInfo"
        @query="getTreeData"
      ></add-or-edit-department>
      <!-- 集团弹窗 -->
      <group-Dialog
        v-if="dialogVisible.groupVisible.visible"
        :visible="dialogVisible.groupVisible"
        :nodeInfo="groupDialogObj.nodeInfo"
        @query="refreshTreeData"
      />
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import {changeData, getInputData, companyDelete, departmentDelete,} from '../../../../service/Tree/organize-tree';
  import {addOrEditCompany, addOrEditDepartment, groupDialog} from './Biz-organize-dialogs'
  import request from './mixins/request';
  import keyRefer from './keyRefer';
  import {isEmptyObject} from '../../../../utils';


  export default {
    name: 'origanize-tree',
    mixins: [request],
    components: {addOrEditCompany, addOrEditDepartment, groupDialog},
    data() {
      return {
        treeData: [],//origanize tree data use to render
        showTree: true,  //树是否展示
        childKey: '',    //节点树选中的值
        //部门节点信息
        departmentOptions: [
          {
            //部门类型
            label: '服务中心',
            value: 0,
          },
          {
            label: '职能中心',
            value: 1,
          },
        ],
        dialogVisible: {
          groupVisible: {visible: false},
          companyVisible: {visible: false},
          departmentVisible: {visible: false},
        },
        groupDialogObj: {
          nodeInfo: {},
        },
        //公司dialog信息
        companyDialogObj: {
          type: '',
          parentNodeInfo: {
            organizationName: '',
            organizationId: '',
          },
          nodeInfo: {},
        },
        //部门dialog信息
        departmentDialogObj: {
          type: '',
          parentNodeInfo: {
            organizationName: '',
            organizationId: '',
          },
          nodeInfo: {},
        },
        searchTip: '搜索数据中...',
        //树显示
        treeInput: '',
        treeloading: false,
        //树节点对应的字段
        keyRefer
      };
    },
    props: {
      title: {
        type: String,
      },
      searchConditions: {
        type: Object,
        default() {
          return {};
        },
      },
      draggable: {
        type: Boolean,
        default: false,
      },
      showFunction: {
        type: Boolean,
        default: false,
      },
      'show-checkBox': {
        type: Boolean,
      },
      orgTypeFilter: null,
      // 树的显示隐藏
      changeStatus: {
        type: Object,
        default() {
          return {};
        },
      },
      funcId: {
        type: [Number, String],
      },
    },
    computed: {
      ...mapGetters(['organizeTreeData']),
    },
    watch: {
      organizeTreeData: {
        handler(newVal, oldVal) {
          this.treeData = newVal;
        },
        deep: true
      },
      treeData: {
        handler(newVal, oldVal) {
          console.log(newVal);
          // this.$store.dispatch('asyncOrganizeTreeData', newVal);
        },
        deep: true
      }
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
       *  树节点重新渲染
       */
      refreshTreeData() {
        this.getTreeData(true);
      },

      /**
       * origanizeTreeSearch
       * @param item 搜索输入内容
       */
      origanizeTreeSearch(item) {
        if (item) {
          changeData({
            organizationId: item.organizationId,
          }).then(r => {
            this.treeData = [r.resultData];
            this.$refs.organizeTree.initTree(this.treeData);
            this.childKey && (this.$refs.organizeTree.nodeSelectedByKey([this.childKey]));
          });

        } else {
          this.getSearchTreeData()
        }
      },

      //树搜索输入触发查询
      remoteSearch(query, cb) {
        if (query !== '') {
          this.searchTip = '搜索数据中...';
          getInputData({
            organizationName: query,
          })
            .then(r => {
              cb(r.resultData);
            })
            .catch(err => {
              this.searchTip = '服务器出错';
            });
        } else {
          cb([]);
        }
      },

      //拖放判断，暂时不支持
      dropJudge() {
      },


      /**
       * 树删除操作
       */
      treeDelete(node, parent, index) {
        if (node.organizationType !== 0 && node.organizationType !== 1) {
          //删除部门节点
          departmentDelete({
            organizationId: node.organizationId,
          }).then(r => {
            this.$message({
              message: r.resultMsg,
              type: 'success',
            });
            this.$refs.organizeTree.delNode(node, parent, index);
          });
        } else {
          //删除公司节点
          companyDelete({
            organizationId: node.organizationId,
          }).then(r => {
            this.$message({
              message: r.resultMsg,
              type: 'success',
            });
            this.$refs.organizeTree.delNode(node, parent, index);
          });
        }
      },

      /**
       * 新建 部门、公司
       */
      fnclick(item, orgType) {
        //新增功能
        if (orgType === 'department') {
          this.departmentDialogObj.type = 'add';
          this.departmentDialogObj.parentNodeInfo = item;
          this.dialogVisible.departmentVisible.visible = true;
        } else if (orgType === 'company') {
          this.companyDialogObj.type = 'add';
          this.companyDialogObj.parentNodeInfo = item;
          this.dialogVisible.companyVisible.visible = true;
        }
      },

      /**
       * popPicker 隐藏
       */
      cancel() {
        this.$refs.title.click();
      },

      /**
       * 树编辑
       * */
      treeEdit(node, parent) {
        this.companyDialogObj.parentNodeInfo = parent;
        this.companyDialogObj.nodeInfo = node;
        this.groupDialogObj.nodeInfo = node;
        this.departmentDialogObj.parentNodeInfo = parent;
        this.departmentDialogObj.nodeInfo = node;
        if (node.organizationType === 2) {
          //部门
          this.departmentDialogObj.type = 'edit';
          this.dialogVisible.departmentVisible.visible = true;
        } else if (node.organizationType === 1) {
          //公司
          this.companyDialogObj.type = 'edit';
          this.dialogVisible.companyVisible.visible = true;
        } else if (node.organizationType === 0) {
          //集团
          // this.groupDialogObj.visible.visible = true;
          this.dialogVisible.groupVisible.visible = true;
        }
      },

      /**
       *  节点点击事件
       * */
      nodeClick: function (node) {
        //同一个节点多次点击
        if (node.organizationId === this.childKey) return;
        this.childKey = node.organizationId;
        this.searchConditions.organizationId = node.organizationId;
        this.searchConditions.companyId = node.companyId;
        this.searchConditions.departmentId = node.departmentId;
        this.searchConditions.mainSearch = '';
        this.searchConditions.pageNum = 1;
        this.$emit('tree-item-click', node);
      },


      /**
       * init render tree
       */
      initRender() {

        console.log('organizeTreeData - 数据是否存在：');
        console.log(!isEmptyObject(this.organizeTreeData));

        //判断 organizeTreeData store 数据是否存在，存在则无需请求数据，直接获取
        if (!isEmptyObject(this.organizeTreeData)) {

          this.treeData = this.organizeTreeData;
          //
          this.$refs.organizeTree.initTree(this.treeData);

          this.$emit('tree-item-click', this.treeData);
          
        }
        else {
          this.getTreeData(true)
        }
      }
    },
    created() {

    },
    mounted() {
      this.initRender();
    },

    beforeDestroy() {
      this.$store.dispatch('asyncOrganizeTreeData', this.treeData);
    }
  };
</script>
<style></style>
<style rel="stylesheet/scss" lang="scss">
  @import '../../../../assets/css/Modular/tree/tree.scss';
</style>
