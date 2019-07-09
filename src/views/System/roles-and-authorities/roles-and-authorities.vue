<!--角色与权限-->
<template>
  <div class="win">
    <div class="ns-container">
      <ns-drawer class="ns-container-left" speed="160ms">
        <biz-organize-tree
          :funcId="Mix_funcId"
          draggable
          showFunction
          :searchConditions="Mix_searchConditions"
          @tree-item-click="treeItemClick"
        ></biz-organize-tree>
      </ns-drawer>
      <div class="ns-container-right">
        <!--action-module (search / button)-->
        <div class="action-module">
          <!--search module-->
          <ns-search-conditions
            :funcId="Mix_funcId"
            :searchConditions="Mix_searchConditions"
            @query="getTableData"
            :changeStatus="changeStatus"
          >
            <!--action - 权限按钮操作区域-->
            <biz-role-button-area :buttonList="roleButtonAction" @command="roleButtonCommand" class="fr"></biz-role-button-area>
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
        <!--dialog - auto form submit infomation-->
        <biz-slip-dialog
          :id="nsDialogName"
          :title="dialogTit"
          :visible.sync="dialogVisible.visible"
          @close="dialogClose('addRoleForm', 'addPersonToRoleForm')"
        >
          <template slot="btns">
            <biz-role-button-area :buttonList="roleButtonForm" @command="roleButtonCommandForm"></biz-role-button-area>
          </template>

          <template slot="main">
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
          </template>

        </biz-slip-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import { tableDataFetch } from '../../../service/System/TableFetch/table-fetch';
  import { gridDataDelete } from '../../../service/System/System-pages/roles-and-authorities';
  import * as store from '../../../utils/nsQuery/nsStore';
  import roleStaticData from './roleStaticData';
  import rolePersonStaticData from './rolePersonStaticData';
  import Mixin from '../../../mixins';
  import { downloadExcel } from '../../../service/Download/download';
  import { mapGetters } from 'vuex';


  export default {
    name: 'roles-and-authorities',
    pageType: 'basic',
    mixins: [Mixin],

    data() {
      return {
        //========== 基本 base =========
        nsDialogName: 'roles-and-authorities_addRoleForm',
        //========== 筛选器 search =========
        changeStatus: { status: true }, // 左侧树的状态

        //========== 表格 grid =========
        tableData: {}, //列表数据
        multipleSelection: [], //grid selected list
        selectedGridNodeObj: {}, //选中的表格当前行数据

        //表格数据加载状态
        loadState: {
          data: false,
          head: false,
        },

        //========== tree =========
        treeNodeObj: {},

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

    computed: {
      ...mapGetters(['roleButtonForm']),
    },

    methods: {
      /**
       * 表单按钮点击
       * @param command按钮信息
       */
      roleButtonCommandForm(command) {
        if (command.code === 'formConfirmBtn') {
          this.autoFormSubmit();
        }
        if (command.code === 'formCancelBtn') {
          this.autoFormCancel();
        }
      },


      /**
       * auto-form submit  ( 提交按钮事件操作 )
       * @param formName       button-info
       */
      autoFormSubmit() {
        this.showMessage = true;
        this.nsDialogName = '';
        this.$refs[this.autoFormID].submitForm(this.autoFormID).then(() => {
          this.$message({ message: '保存成功', type: 'success' });
          this.showMessage = false;
          this.$set(this.dialogVisible, 'visible', false);
          store.formController.delete('addRoleForm');
          store.formController.delete('addPersonToRoleForm');
          this.getTableData();
        });
      },

      /**
       * auto-form Cancel  ( 取消按钮事件操作 )
       */
      autoFormCancel() {
        this.$refs[this.autoFormID].resetForm(this.autoFormID);
        this.$set(this.dialogVisible, 'visible', false);
        this.nsDialogName = 'roles-and-authorities_addRoleForm';
      },

      //自动表单请求获取数据之后 操作
      afterRequest(vm, data) {
        if (vm.autoFormID === 'addRoleForm') {
          if (this.treeNodeInfo.organizationId && this.treeNodeInfo.organizationName) {
            data.modelData.organizationName = this.treeNodeInfo.organizationName;
            data.modelData.organizationId = this.treeNodeInfo.organizationId;
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

      /**
       * 权限按钮区域操作
       * @param command
       */
      roleButtonCommand(command) {
        //新增员工-初始化动态表单
        if (command.code === 'actionAddRoleBtn') {
          this.addRole();
        }
        if (command.code === 'actionExportBtn') {
          //导出
          downloadExcel('/system/role/export-excel');
        }

      },

      //新增-初始化动态表单
      addRole() {
        if (!this.treeNodeInfo.organizationId || this.treeNodeInfo.organizationId == 0) {
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


      //选择组织节点回调
      treeItemClick(org) {
        console.log('表数据查询-表数据查询');
        console.log(this.condition);
        this.treeNodeInfo = org;
        this.addRoleCoverData.dynamicQuery.rolecategoryId = this.treeNodeInfo.organizationId;
        this.addPersonToRoleCoverData.dynamicQuery.userIds = this.treeNodeInfo.organizationId;
        this.getTableData();
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

      //获取表格数据
      getTableData(condition) {
        console.log('表数据查询-表数据查询');
        console.log(this.condition);
        if (condition) {
          this.Mix_searchConditions.filterList = condition;
        }

        this.loadState.data = false;

        tableDataFetch(
          {
            url: '/system/role/list-role',
            query: this.Mix_searchConditions,
            funcId: this.Mix_funcId,
          },
        ).then(res => {
          this.tableData = res.resultData;
          console.log('请求到的表格数据：');
          console.log(this.tableData);
          console.log('表格操作按钮', this.gridBtns);
          this.tableBtnDistribute(this.tableData);
          this.loadState.data = true;
        }, () => {
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
          case 'gridEditBtn': //编辑
            this.dialogWidth = '900px';
            this.dialogTit = '编辑角色';
            this.requestUrl = '/system/role/detail-role?enterpriseId=' + scope.row.enterpriseId + '&organizationId=' + scope.row.organizationId;
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
              type: 'warning',
              closeOnClickModal: false,
            })
              .then(() => {
                gridDataDelete(
                  {
                    roleid: this.selectedGridNodeObj.roleid,
                  },
                  {},
                )
                  .then(() => {
                    this.$message({ message: '删除成功', type: 'success' });
                    this.getTableData();
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
        for (let i = 0; i < selection.length; i++) {
        }
        this.multipleSelection = arry;
      },
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

  .table-head-action .cell {
    width: 200px;
  }
</style>
