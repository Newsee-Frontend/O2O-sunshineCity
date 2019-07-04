<!--数据字典-->
<template>
  <div class="win" :id="pageID">
    <div class="ns-container">
      <div class="ns-container-left" :class="{ 'ns-container-left-border': changeStatus.status }">
        <biz-organize-tree
          title="组织架构"
          :funcId="Mix_funcId"
          @tree-item-click="organizeTreeItemClick"
          orgTypeFilter="1"
          :searchConditions="Mix_searchConditions"
          :changeStatus="changeStatus"
        ></biz-organize-tree>
      </div>
      <div class="ns-container-left" :class="{ 'ns-container-left-border': true }">
        <dictionary-tree
          v-if="dictionaryTreeVisible"
          title="数据字典"
          :organizationId="org_nodeId"
          showFunction
          :searchConditions="Mix_searchConditions"
          @tree-item-click="treeItemClick"
        >
        </dictionary-tree>
      </div>
      <div class="ns-container-right" :id="pageID + '-holder'">
        <!--action-module (search / button)-->
        <div class="action-module" :id="pageID + '-search'">
          <!--search module-->
          <ns-search-conditions
            :funcId="Mix_funcId"
            :thlist="Mix_thlist"
            :searchConditions="Mix_searchConditions"
            @query="getTableData"
            :changeStatus="changeStatus"
          >
            <!--fnbutton module / slot for secrch conditions ---->
            <div class="action-fnbutton">
              <ns-role-button
                mode="icon"
                :roleInfo="{
                  areaType: 'ACTION',
                  code: 'actionAddBtn',
                  name: '新增',
                  nameEn: '',
                  index: 1,
                  btnType: 'single',
                }"
                @click="addDictionaryItem()"
              ></ns-role-button>
              <ns-role-button
                mode="dp-text"
                title="更多"
                @command="handleCommand"
                :searchConditions="Mix_searchConditions"
              ></ns-role-button>
            </div>
          </ns-search-conditions>
        </div>

        <!--grid module-->
        <biz-table ref="biz-table" :loadState="loadState" :data="tableData"
                   :searchConditions="Mix_searchConditions"
                   :showSummary="false"
                   @reload="getTableData"
                   @table-action="tableAction"
                   @selection-change="selectionChange"
        ></biz-table>
        <!--grid module-->
        <!--<ns-grids-->
          <!--:gridID="pageID + '-grid'"-->
          <!--:gridData="gridData"-->
          <!--:thlist="Mix_thlist"-->
          <!--:loadState="Mix_loadState"-->
          <!--:searchConditions="Mix_searchConditions"-->
          <!--:holderInfo="Mix_holderInfo"-->
          <!--:funcId="Mix_funcId"-->
          <!--@refreshGrid="getTableData"-->
          <!--@grid-ation="gridAtion"-->
          <!--@selection-change="selectionChange"-->
        <!--&gt;</ns-grids>-->

        <!--dialog - auto form submit infomation-->
        <ns-dialog
          :title="dialogTit"
          :visible.sync="dialogVisible.visible"
          type="autoHeight"
          @close="dialogClose('addDictionaryItemForm')"
        >
          <!--auto form-->
          <ns-auto-form
            ref="addDictionaryItemForm"
            autoFormID="addDictionaryItemForm"
            :funcId="Mix_funcId"
            :request-url="requestUrl"
            :submit-url="submitUrl"
            :query="{ dictionaryItemId: selectedGridNodeObj.jeCoreDictionaryitemId }"
            :cover-data="coverData"
            cue-type="only-error"
            :showMessage="showMessage"
            @afterRequest="afterRequest"
          >
          </ns-auto-form>
          <div slot="footer">
            <ns-auto-form-operation
              :buttonInfo="buttonInfo"
              autoFormID="addDictionaryItemForm"
            ></ns-auto-form-operation>
          </div>
        </ns-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { gridDataDelete } from '../../../service/System/data-dictionary';
import * as store from '../../../utils/nsQuery/nsStore';
import Mixin from "../../../mixins";
import { downloadExcel } from '../../../service/Download/download';
import {tableDataFetch} from '../../../service/TableFetch/table-fetch';
import OrganizeTree from '../../../components/Biz/Biz-tree/Biz-organize-tree/Biz-organize-tree.vue'; // 组织树 组件
import DictionaryTree from '../../../components/Biz/Biz-tree/Biz-data-dictionary-tree/Biz-data-dictionary-tree.vue'; // 数据字典树 组件

export default {
  name: 'data-dictionary',
  pageType: 'basic',
  mixins: [Mixin],
  components: {
    OrganizeTree,
    DictionaryTree
  },
  data() {
    return {
      //========== 基本 base =========
      pageID: 'data-dictionary', //页面、表格、自动表单 ID值（必须）

      //========== 筛选器 search =========
      changeStatus: { status: true }, // 左侧树的状态

      //表格数据加载状态
      loadState: {
        data: false,
        head: false,
      },

      //========== 表格 grid =========
      tableData: {}, //列表数据
      multipleSelection: [], //grid selected list
      selectedGridNodeObj: {}, //选中的表格当前行数据

      //========== dialog auto form  =========
      dialogVisible: { visible: false }, //dialog switch
      dialogTit: '', //dialog title
      submitType: 'add', //判断当前表单的类型（add / edit）
      requestUrl: '', //自动表单提交地址
      showMessage: false,
      buttonInfo: [
        {
          funcType: 'submit',
          style: 'primary',
          code: 'formConfirmBtn',
          name: '保存',
          areaType: 'FORM',
          btnType: 'single',
          event: this.autoFormSubmit,
        },
        {
          funcType: 'custom',
          style: '',
          code: 'formCancelBtn',
          name: '取消',
          areaType: 'FORM',
          btnType: 'single',
          event: this.autoFormCancel,
        },
      ],
      submitUrl: '',
      coverData: {},

      //========== 树 tree =========
      treeNodeObj:{},
      dictionaryTreeVisible: {
        visible: false,
      },
      org_nodeId: '',
      org_nodeName: '',
      dic_nodeName: '',
    };
  },
  methods: {
    //表数据查询
    getTableData(condition) {
      console.log('表数据查询-表数据查询');
      console.log(this.condition);
      if (condition) {
        this.Mix_searchConditions.filterList = condition;
      }

      this.loadState.data = false;
      tableDataFetch(
        {
          url: '/system/dictionary/list-dictionaryItem',
          query: this.Mix_searchConditions,
          funcId: this.Mix_funcId,
          params: {
            dictionaryitemDictionaryId: this.Mix_searchConditions.dictionaryitemDictionaryId,
            dictionaryGroupId: this.Mix_searchConditions.dictionaryGroupId,
          },
        },
      ).then(res => {
        this.tableData = res.resultData;
        console.log(33333333);
        console.log(this.Mix_searchConditions);
        console.log(this.tableData)
        //增加 固定操作列 - 按钮数据
        this.tableData.list.forEach(item => {
          item.fnsclick = [
            { label: '编辑', value: 'gridEditBtn' },
            { label: '删除', value: 'gridRemoveBtn' },
          ];
        });
        this.loadState.data = true;

      }).catch(() => {

        this.tableData = {};
        this.loadState.data = true;

      });
    },


    /**
     * grid ation event （操作列操作回调事件）
     * @param params
     * @param scope
     */
    tableAction(params, scope) {
      this.selectedGridNodeObj = scope.row;
      switch (params.value) {
        //删除
        case 'gridRemoveBtn':
          this.$confirm('确定删除?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              gridDataDelete(
                {
                  dictionaryItemId: this.selectedGridNodeObj.jeCoreDictionaryitemId,
                },
                {}
              )
                .then(() => {
                  this.$message({
                    message: '删除成功',
                    type: 'success',
                  });
                  this.getTableData();
                })
                .catch(() => {
                  this.$message({
                    message: '删除失败，请联系开发商',
                    type: 'error',
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '删除已取消',
              });
            });
          break;
        //编辑
        case 'gridEditBtn':
          this.dialogTit = '编辑字典项';
          this.requestUrl = '/system/dictionary/detail-dictionaryItem';
          this.submitUrl = '/system/dictionary/edit-dictionaryItem';
          store.formController.set('addDictionaryItemForm', {
            show: true,
          });
          this.$set(this.dialogVisible, 'visible', true);
          break;
        default:
          break;
      }
    },

    /**
     * auto-form submit  ( 提交按钮事件操作 )
     * @param formName       button-info
     */
    autoFormSubmit(formName) {
      this.showMessage = true;
      this.$refs[formName].submitForm(formName).then(()=>{
        this.$message({ message: '保存成功', type: 'success' });
        this.showMessage = false;
        this.$set(this.dialogVisible, 'visible', false);
        store.formController.delete('addDictionaryItemForm');
        this.getTableData();
      });
    },

    /**
     * auto-form Cancel  ( 取消按钮事件操作 )
     * @param formName       button-info
     */
    autoFormCancel(formName) {
      this.$refs[formName].resetForm(formName);
      this.$set(this.dialogVisible, 'visible', false);
      this.showMessage = false;
    },

    //自动表单请求获取数据之后 操作
    afterRequest(vm, data) {
      data.modelData.dictionaryitemDictionaryId = this.treeNodeInfo.nodeValue;
      data.modelData.organizationId = this.treeNodeInfo.organizationId;
      //新增的时候从树上获取节点层级
      if (data.modelData.dictionaryitemDictionaryName === '') {
        let pName = this.treeNodeInfo.parent? this.treeNodeInfo.parent.nodeName : '';
        let nodeName =   this.treeNodeInfo.nodeName;
        data.modelData.dictionaryitemDictionaryName = `${pName}-${nodeName}`;
      }
      data.modelData.organizationName = this.org_nodeName;
      data.modelData.organizationId = this.org_nodeId;
    },
    //新增-初始化动态表单
    addDictionaryItem() {
      if (
        !this.treeNodeInfo.nodeValue ||
        this.treeNodeInfo.nodeType === 'root' ||
        this.treeNodeInfo.nodeType === 'dicGroup'
      ) {
        this.$message({ message: '请先选择字典', type: 'warning' });
        return false;
      } else {
        this.dialogTit = '新增字典项';
        this.requestUrl = '/system/dictionary/init-form';
        this.submitUrl = '/system/dictionary/add-dictionaryItem';
        store.formController.delete('addDictionaryItemForm');
        store.formController.set('addDictionaryItemForm', { show: true });
        this.$set(this.dialogVisible, 'visible', true);
      }
    },
    /**
     * tree item click (选择组织节点回调)
     * @param condition
     */
    treeItemClick(condition, parent) {
      this.treeNodeInfo = condition;
      this.treeNodeInfo.parent = parent;
      this.getTableData();
    },


    organizeTreeItemClick(org) {
      this.org_nodeName = org.organizationName;
      this.org_nodeId = org.organizationId;
    },
    //grid选择项发生变化时
    selectionChange(selection) {
      let arry = [];
      for (let i = 0; i < selection.length; i++) {}
      this.multipleSelection = arry;
    },
    //表数据查询
    ssss(condition) {
      if (condition) {
        this.Mix_searchConditions.filterList = condition;
      }
      this.loadState.data = false;
      this.grid.fetch(
        {
          url: '/system/dictionary/list-dictionaryItem',
          query: this.Mix_searchConditions,
          funcId: this.Mix_funcId,
          params: {
            dictionaryitemDictionaryId: this.Mix_searchConditions.dictionaryitemDictionaryId,
            dictionaryGroupId: this.Mix_searchConditions.dictionaryGroupId,
          },
        },
        res => {
          this.gridData = res;

          //增加 固定操作列 - 按钮数据
          this.gridData.list.forEach(item => {
            item.fnsclick = [
              { label: '编辑', value: 'gridEditBtn' },
              { label: '删除', value: 'gridRemoveBtn' },
            ];
          });
          this.loadState.data = true;
        },
        () => {
          this.gridData = {};
          this.loadState.data = true;
        }
      );
    },
    /**
     * dialog close
     * @param formName
     */
    dialogClose(formName) {
      this.showMessage = false;
      store.formController.delete(formName); //销毁表单
    },
    //更多功能
    handleCommand(command) {
      if (command === 'actionExportBtn') {
        //导出
        downloadExcel('/system/dictionary/export-excel', this.Mix_searchConditions)
      }
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss"></style>
