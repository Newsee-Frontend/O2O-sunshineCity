<!--角色与权限-->
<template>
  <div class="win" :id="pageID">
    <div class="ns-container">
      <div class="ns-container-left" :class="{ 'ns-container-left-border': changeStatus.status }">
        <organize-tree
          :funcId="Mix_funcId"
          title="组织架构"
          :searchConditions="Mix_searchConditions"
          @tree-item-click="treeItemClick"
          :changeStatus="changeStatus"
        ></organize-tree>
      </div>
      <div class="ns-container-right" :id="pageID + '-holder'">
        <!--action-module (search / button)-->
        <div class="action-module" :id="pageID + '-search'">
          <!--search module-->
          <ns-search-conditions
            :funcId="Mix_funcId"
            :thlist="Mix_thlist"
            :searchConditions="Mix_searchConditions"
            @query="getGridData"
            :changeStatus="changeStatus"
          >
            <!--fnbutton module / slot for secrch conditions ---->
            <div class="action-fnbutton">
              <ns-role-button
                mode="icon"
                :roleInfo="{
                  code: 'actionAddRoleBtn',
                  name: '新增角色',
                  nameEn: '',
                  areaType: 'ACTION',
                  index: '',
                  btnType: 'single',
                }"
                @click="addRole()"
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
        <ns-grids
          :gridID="pageID + '-grid'"
          :gridData="gridData"
          :thlist="Mix_thlist"
          :loadState="Mix_loadState"
          :searchConditions="Mix_searchConditions"
          :holderInfo="Mix_holderInfo"
          :funcId="Mix_funcId"
          @refreshGrid="getGridData"
          @grid-ation="gridAtion"
          @selection-change="selectionChange"
          :ationColConfig="{ width: 200 }"
        ></ns-grids>
        <!--dialog - auto form submit infomation-->
        <ns-dialog
          :id="nsDialogName"
          :title="dialogTit"
          :width="dialogWidth"
          :visible.sync="dialogVisible.visible"
          @close="dialogClose('addRoleForm', 'addPersonToRoleForm')"
        >
          <!--auto form 新增角色-->
          <ns-auto-form
            ref="addRoleForm"
            autoFormID="addRoleForm"
            :funcId="Mix_funcId"
            :request-url="requestUrl"
            :submit-url="submitUrl"
            :query="{ roleid: selectedGridNodeObj.roleid }"
            :local-data="localData"
            :cover-data="addRoleCoverData"
            cue-type="only-error"
            :showMessage="showMessage"
            @afterRequest="afterRequest"
          ></ns-auto-form>
          <!--auto form-->
          <ns-auto-form
            ref="addPersonToRoleForm"
            autoFormID="addPersonToRoleForm"
            :funcId="Mix_funcId"
            :request-url="requestUrl"
            :submit-url="submitUrl"
            :query="{ roleid: selectedGridNodeObj.roleid }"
            :local-data="localDataRolePerson"
            :cover-data="addPersonToRoleCoverData"
            cue-type="only-error"
            :showMessage="showMessage"
            @afterRequest="afterRequest"
          ></ns-auto-form>
          <div slot="footer">
            <ns-auto-form-operation
              :buttonInfo="buttonInfo"
              :autoFormID="autoFormID"
            ></ns-auto-form-operation>
          </div>
        </ns-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import {gridDataDelete } from '../../../service/System/roles-and-authorities';
  import OrganizeTree from '../../../components/Biz/Biz-tree/biz-organize-tree/Biz-organize-tree.vue'; // 组织树 组件
  import * as store from '../../../utils/nsQuery/nsStore';
  import roleStaticData from './roleStaticData';
  import rolePersonStaticData from './rolePersonStaticData';
  import Mixin from "../../../mixins";
  import { downloadExcel } from '../../../service/Download/download';


  export default {
    name: 'roles-and-authorities',
    pageType: 'basic',
    mixins: [Mixin],
    components: {
      OrganizeTree
    },
    data() {
      return {
        //========== 基本 base =========
        pageID: 'roles-and-authorities', //页面、表格、自动表单 ID值（必须）
        nsDialogName: 'roles-and-authorities_addRoleForm',
        //========== 筛选器 search =========
        changeStatus: { status: true }, // 左侧树的状态

        //========== 表格 grid =========
        gridData: {}, //列表数据
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
        autoFormID: '', //表单ID
        dialogWidth: '764px',
        addRoleCoverData: {
          dynamicQuery: {
            rolecategoryId: '',
          },
        },
        addPersonToRoleCoverData: {
          dynamicQuery: {
            userIds: '',
          },
        },
        localData: roleStaticData,
        localDataRolePerson: rolePersonStaticData,
      };
    },
    methods: {
      /**
       * auto-form submit  ( 提交按钮事件操作 )
       * @param formName       button-info
       */
      autoFormSubmit(formName) {
        this.showMessage = true;
        this.nsDialogName = '';
        this.$refs[formName].submitForm(formName).then(()=>{
          this.$message({ message: '保存成功', type: 'success' });
          this.showMessage = false;
          this.$set(this.dialogVisible, 'visible', false);
          store.formController.delete('addRoleForm');
          store.formController.delete('addPersonToRoleForm');
          this.getGridData();
        });
      },

      /**
       * auto-form Cancel  ( 取消按钮事件操作 )
       * @param formName       button-info
       */
      autoFormCancel(formName) {
        this.$refs[formName].resetForm(formName);
        this.$set(this.dialogVisible, 'visible', false);
        this.nsDialogName = 'roles-and-authorities_addRoleForm';
      },

      //自动表单请求获取数据之后 操作
      afterRequest(vm, data) {
        if (vm.autoFormID === 'addRoleForm') {
          if (this.Mix_treeNodeObj.organizationId && this.Mix_treeNodeObj.organizationName) {
            data.modelData.organizationName = this.Mix_treeNodeObj.organizationName;
            data.modelData.organizationId = this.Mix_treeNodeObj.organizationId;
          } else {
            data.modelData.organizationName = this.selectedGridNodeObj.organizationName;
            data.modelData.organizationId = this.selectedGridNodeObj.organizationId;
          }
          //从本地获取此表单的静态数据
          const formStaticData = this.localData; //this.autoFrom.getFixedFormData("roleStaticData").fixed;
          //将本地数据的modeldata和请求的数据的modeldata混合
          Object.assign(data.modelData, formStaticData.modelData);
          //将本地数据的fields和请求的数据的fields混合
          //vm.$set(data,'fields', formStaticData.fields.concat(data.fields));
          vm.$set(data, 'fields', data.fields.concat(formStaticData.fields));
        }
        if (vm.autoFormID === 'addPersonToRoleForm') {
          data.modelData.roleid = this.selectedGridNodeObj.roleid;
          data.modelData.organizationId = this.selectedGridNodeObj.organizationId;
          //从本地获取此表单的静态数据
          const formStaticData = this.localDataRolePerson;
          //将本地数据的modeldata和请求的数据的modeldata混合
          Object.assign(data.modelData, formStaticData.modelData);
          //将本地数据的fields和请求的数据的fields混合
          vm.$set(data, 'fields', formStaticData.fields.concat(data.fields));
        }
      },
      //新增-初始化动态表单
      addRole() {
        if (!this.Mix_treeNodeObj.organizationId || this.Mix_treeNodeObj.organizationId == 0) {
          this.$message({ message: '请先选择组织', type: 'warning' });
        } else {
          this.dialogWidth = '900px';
          this.dialogTit = '新增角色';
          this.requestUrl = '/system/role/init-form';
          this.submitUrl = '/system/role/add-role';
          this.autoFormID = 'addRoleForm';
          store.formController.delete('addPersonToRoleForm');
          store.formController.set('addRoleForm', {
            show: true,
          });
          this.$set(this.dialogVisible, 'visible', true);
        }
      },
      /**
       * grid ation event （操作列操作回调事件）
       * @param params
       * @param scope
       */
      gridAtion(params, scope) {
        this.selectedGridNodeObj = scope.row;
        switch (params.value) {
          case 'gridEditBtn': //编辑
            this.dialogWidth = '900px';
            this.dialogTit = '编辑角色';
            this.requestUrl = "/system/role/detail-role?enterpriseId="+scope.row.enterpriseId+"&organizationId="+scope.row.organizationId;
            this.submitUrl = '/system/role/edit-role';
            this.autoFormID = 'addRoleForm';
            store.formController.delete('addPersonToRoleForm');
            store.formController.set('addRoleForm', {
              show: true,
              formOperateType: 1,
            });
            this.$set(this.dialogVisible, 'visible', true);
            break;
          case 'gridRemoveBtn': //删除
            this.$confirm('确定删除?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              customClass: 'el-message-box-oppositeBtns',
              type: 'warning',
              closeOnClickModal: false,
            })
              .then(() => {
                gridDataDelete(
                  {
                    roleid: this.selectedGridNodeObj.roleid,
                  },
                  {}
                )
                  .then(() => {
                    this.$message({ message: '删除成功', type: 'success' });
                    this.getGridData();
                  })
                  .catch(r => {
                    this.$message({
                      message: r.resultMsg || '删除失败，请联系管理员及时处理',
                      type: 'error',
                    });
                  });
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除',
                });
              });
            break;
          case 'gridAuthorizerBtn': //新增授权人
            this.dialogWidth = '764px';
            this.dialogTit = '新增授权人';
            this.requestUrl = '/system/role/init-form-add-person';
            this.submitUrl = '/system/role/add-person-to-role';
            this.autoFormID = 'addPersonToRoleForm';
            store.formController.delete('addRoleForm');
            store.formController.set('addPersonToRoleForm', {
              show: true,
              formOperateType: 1,
            });
            this.$set(this.dialogVisible, 'visible', true);
            break;
          default:
            break;
        }
      },
      //grid选择项发生变化时
      selectionChange(selection) {
        let arry = [];
        for (let i = 0; i < selection.length; i++) {}
        this.multipleSelection = arry;
      },
      //选择组织节点回调
      treeItemClick(org) {
        console.log('表数据查询-表数据查询');
        console.log(this.condition)
        this.Mix_treeNodeObj = org;
        this.addRoleCoverData.dynamicQuery.rolecategoryId = this.Mix_treeNodeObj.organizationId;
        this.addPersonToRoleCoverData.dynamicQuery.userIds = this.Mix_treeNodeObj.organizationId;
        this.getGridData();
      },
      //表数据查询
      getGridData(condition) {
        if (condition) {
          this.Mix_searchConditions.filterList = condition;
        }
        this.Mix_loadState.data = false;
        this.grid.fetch(
          {
            url: '/system/role/list-role',
            query: this.Mix_searchConditions,
            funcId: this.Mix_funcId,
          },
          res => {
            this.gridData = res;
            //增加 固定操作列 - 按钮数据
            this.gridData.list.forEach(item => {
              item.fnsclick = [
                { label: '新增授权人', value: 'gridAuthorizerBtn' },
                { label: '编辑', value: 'gridEditBtn' },
                { label: '删除', value: 'gridRemoveBtn' },
              ];
            });
            this.Mix_loadState.data = true;
          },
          () => {
            this.gridData = {};
            this.Mix_loadState.data = true;
          }
        );
      },
      /**
       * dialog close
       * @param formName1
       * @param formName2
       */
      dialogClose(formName1, formName2) {
        //销毁表单
        this.showMessage = false;
        store.formController.delete(formName1);
        store.formController.delete(formName2);
        this.nsDialogName = 'roles-and-authorities_addRoleForm';
      },
      //更多功能
      handleCommand(command) {
        if (command === 'actionExportBtn') {
          //导出
          downloadExcel('/system/role/export-excel', this.Mix_searchConditions).then(d =>{
            console.log(d)
          }, e => {
            console.log(d)
          })
        }
      },
    },
    //初始化获取数据
    created() {
      this.getGridData();
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  #roles-and-authorities_addRoleForm {
    .el-form-item__error {
      display: none;
    }
    .el-input__inner {
      border-color: #cecece;
    }
  }
</style>
