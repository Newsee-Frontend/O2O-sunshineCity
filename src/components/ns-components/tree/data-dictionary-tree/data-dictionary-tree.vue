<template>
  <div class="tree-width data-dictionary-tree">
    <div class="tree-body">
      <p class="treeTitle" ref="title">{{ title }}</p>
      <ns-tree
        ref="dictionaryTree"
        :keyRefer="keyRefer"
        v-loading="treeloading"
        @nodeClick="nodeClick"
      >

        <template slot-scope="{node, parent,index}">
          <div class="slot-container">
            <div class="title-text">
              {{node.nodeName}}
            </div>

            <el-dropdown
              trigger="click"
              :hide-on-click="true"
              v-if="showFunction"
            >
              <span
                class="fnsicon_svg_span"
                @click.stop
              >
                <img
                  class="tree_node_img_more"
                  src="../../../../assets/img/tree/more@2x.png"
                  v-if="node.nodeType === 'dicGroup' || node.organizationId !== 0"
                />
              </span>
              <el-dropdown-menu slot="dropdown" class="tree-more-dropdown">
                <template v-if="node.nodeType === 'dic'">
                  <el-dropdown-item @click.native="treeEdit(node)">
                    编辑
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="treeDelete(node, parent,index)">
                    删除
                  </el-dropdown-item>
                </template>
                <template v-if="node.nodeType === 'dicGroup'">
                  <el-dropdown-item @click.native="treeAdd(node)">
                    新增字典
                  </el-dropdown-item>
                </template>
                <el-dropdown-item v-if="node.nodeType === 'root'" @click.native="treeAdd(node)">
                  新增字典类型
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </ns-tree>
    </div>
    <tree-dialog
      :visible="dialogObj.visible"
      :type="dialogObj.type"
      v-if="dialogObj.visible.visible"
      @query="getTreeData"
      :organizationId="organizationId"
      :itemInfo="dialogObj.itemInfo"
      :detailInfo="dialogObj.detailInfo"
    >
    </tree-dialog>
  </div>
</template>
<script>
import {
  treeDataFetch,
  dicGroupDetailFetch,
  dicDictionaryFetch,
  deleteDictionaryFetch,
  deleteDictionaryGroupFetch,
} from '../../../../service/Tree/dictionary-tree';
import TreeDialog from './tree-dialog.vue';

export default {
  components: {
    TreeDialog,
  },
  data() {
    return {
      childKey: '', //选中的节点
      initIndex: 0,
      objActive: '', //是否选中
      //树显示
      treeloading: true,

      dialogObj: {
        visible: {
          visible: false,
        },
        type: '',
        organizationId: this.organizationId,
        itemInfo: {},
        detailInfo: {},
      },
      keyRefer: {
        id: 'nodeValue',
        title: 'nodeName',
        children: 'children',
        isHasChild: 'isHasChild',
        disabled: 'disabled',
        expanded: '$foldClose'
      }
    };
  },
  props: {
    title: {
      type: String,
    },

    searchConditions: {
      type: Object,
      default: function() {
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
    organizationId: {
      type: [Number, String],
    },
  },
  methods: {
    //树删除操作
    treeDelete(node, parent,index) {
      if (node.organizationId == 0) {
        this.$message({
          message: '系统默认的不可删除',
          type: 'warning',
        });
        return false;
      }
      this.$confirm('确认删除?', {
        customClass: 'el-message-box-oppositeBtns',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (node.nodeType === 'dicGroup') {
          deleteDictionaryGroupFetch({
            dictionaryGroupId: node.nodeValue,
          })
            .then(r => {
              this.$message({
                message: '删除成功',
                type: 'success',
              });
              this.$refs.dictionaryTree.delNode(node, parent,index);
            })
            .catch(r => {
              this.$message({
                message: r.data.resultMsg,
                type: 'warning',
              });
            });
        } else if (node.nodeType === 'dic') {
          deleteDictionaryFetch({
            dictionaryId: node.nodeValue,
          })
            .then(r => {
              this.$message({
                message: '删除成功',
                type: 'success',
              });
              this.$refs.dictionaryTree.delNode(node, parent,index);
            })
            .catch(r => {
              this.$message({
                message: r.data.resultMsg,
                type: 'warning',
              });
            });
        }
      });
    },
    //树编辑
    treeEdit(item) {
      this.dialogObj.itemInfo = item;
      if (item.nodeType === 'dicGroup') {
        this.dialogObj.type = 'edit-group';
        dicGroupDetailFetch({
          dictionaryGroupId: item.nodeValue,
        }).then(r => {
          if (r.resultData.organizationId == 0) {
            this.$message({
              message: '系统默认项不可编辑',
              type: 'warning',
            });
          } else {
            this.dialogObj.detailInfo = r.resultData;
            this.dialogObj.visible.visible = true;
          }
        });
        this.dialogObj.visible.visible = true;
      } else if (item.nodeType === 'dic') {
        this.dialogObj.type = 'edit-dic';
        dicDictionaryFetch({
          dictionaryId: item.nodeValue,
        }).then(r => {
          if (r.resultData.organizationId == 0) {
            this.$message({
              message: '系统默认项不可编辑',
              type: 'warning',
            });
          } else {
            this.dialogObj.detailInfo = r.resultData;
            this.dialogObj.visible.visible = true;
          }
        });
      }
    },
    //树新增
    treeAdd(item) {
      this.dialogObj.itemInfo = item;
      if (item.nodeType === 'root') {
        this.dialogObj.type = 'add-group';
        this.dialogObj.visible.visible = true;
      } else if (item.nodeType === 'dicGroup') {
        this.dialogObj.type = 'add-dic';
        this.dialogObj.visible.visible = true;
      }
    },

    //树节点点击
    nodeClick(item, selected, position, parent) {
      if(this.childKey === item.nodeValue) return
      this.childKey = item.nodeValue;
      if (item.nodeType === 'dic') {
        this.searchConditions.organizationId = this.organizationId;
        this.searchConditions.dictionaryitemDictionaryId = item.nodeValue;
        this.searchConditions.dictionaryGroupId = '';
      } else if (item.nodeType === 'dicGroup') {
        this.searchConditions.organizationId = this.organizationId;
        this.searchConditions.dictionaryitemDictionaryId = '';
        this.searchConditions.dictionaryGroupId = item.nodeValue;
      } else {
        this.searchConditions.organizationId = this.organizationId;
        this.searchConditions.dictionaryitemDictionaryId = '';
        this.searchConditions.dictionaryGroupId = '';
      }
      this.searchConditions.mainSearch = '';
      this.searchConditions.pageNum = 1;
      this.$emit('tree-item-click', item,parent);
    },

    getTreeData() {
      //获取树数据
      this.treeloading = true;
      treeDataFetch({
        organizationId: this.organizationId,
      }).then(r => {
        this.$refs.dictionaryTree.initTree([r.resultData], 1);
        this.defaultSelected(r);
        this.treeloading = false;
      });
    },
    /*
     * 默认选中第一项
     * @params data object
     * */
    defaultSelected(data) {
      let idata = data.resultData;
      this.childKey = idata.nodeValue;
      this.childKey && (this.$refs.dictionaryTree.nodeSelectedByKey([this.childKey]));
      this.searchConditions.organizationId = this.organizationId;
      this.searchConditions.dictionaryitemDictionaryId = '';
      this.searchConditions.dictionaryGroupId = '';
      this.$emit('tree-item-click', idata);
    },
  },
  watch: {
    organizationId() {
      this.getTreeData(true);
    },
  },
  created() {
    if (this.organizationId != '') {
      //树数据初始化
      this.getTreeData(true);
    }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
  .data-dictionary-tree{
    .ns-tree{
      padding-top: 10px;
      box-sizing: border-box;
    }
  }
</style>
<style scoped="">
@import '../../../../assets/css/Modular/tree/tree.scss';
</style>
