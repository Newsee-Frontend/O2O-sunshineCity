<template>
  <div class="win" id="precint">
    <div class="ns-container">
      <div class="ns-container-right">
        <!--action-module (search / button)-->
        <div class="action-module">
          <ns-biz-search-conditions>
            <!--action - 权限按钮操作区域-->
            <template slot="btns">
              <ns-biz-role-button-area :buttonList="roleButtonAction" @command="roleButtonCommand" class="fr"></ns-biz-role-button-area>
            </template>
            <template slot="main">
              <ns-form :model="searchConditions" :inline="true" ref="searchForm" class="search-form clear">

                <div class="search-form-items fl clear">
                  <ns-form-item prop="keyWord">
                    <ns-input v-model="searchConditions.keyWord" placeholder="请输入小区名称"></ns-input>
                  </ns-form-item>

                  <ns-form-item prop="status">
                    <ns-select v-model="searchConditions.status" :options="authStatusOptions"
                               placeholder="请选择认证状态"></ns-select>
                  </ns-form-item>

                  <ns-form-item prop="organizationId">
                    <ns-checkbox-tree-select
                      v-model="searchConditions.organizationId"
                      bizType="role-organization"
                      placeholder="请选择组织"
                      :multiple="false"
                      clearable
                      ref="checkboxTree"
                    >
                    </ns-checkbox-tree-select>
                  </ns-form-item>

                  <ns-form-item prop="pubEndTime" v-show="false"></ns-form-item>
                </div>
                <div class="search-operation fl clear">
                  <ns-button type="primary" @click="searchTable">搜索</ns-button>
                  <ns-button @click="reset">重置</ns-button>
                </div>
              </ns-form>
            </template>
          </ns-biz-search-conditions>
        </div>
        <!--表格部分-->
        <ns-biz-table ref="biz-table"
                   :loadState="loadState"
                   is-form-table
                   :data="tableData"
                   :searchConditions="searchConditions"
                   :showSummary="false"
                   @reload="getTableData"
                   @cell-action="getCellAction"
                   @table-action="tableAction"
        ></ns-biz-table>
      </div>

      <!--其他-->
      <community-precinct-info-dialog
        :visible.sync="showVillageDialog"
        :rowData="rowData"
        :type="villageDialogType"
        @reloadGrid="searchTable"
      ></community-precinct-info-dialog>
    </div>
  </div>
</template>

<script>
  import Mixin from '../../../mixins';
  import communityPrecinctInfoDialog from './componnets/community-precinct-infoDialog';
  import { checkhouse } from '../../../service/Community/villageSetting';
  import { tableDataFetch } from '../../../service/System/TableFetch/table-fetch';

  export default {
    name: 'community-precinct',

    pageType: 'basic',

    mixins: [Mixin],

    components: {
      communityPrecinctInfoDialog,
    },

    data() {
      return {
        pageID: 'precint',
        authStatusOptions: [{ label: '待开通', value: '0' }, { label: '开通中', value: '1' }, { label: '已关闭', value: '2' }],
        tableData: {},
        rowData: {},
        //表格数据加载状态
        loadState: {
          data: false,
          head: false,
        },
        searchConditions: {
          keyWord: '',
          organizationId: '',
          status: '',
          pageNum: 1,
          pageSize: 20,
        },
        showServicePhoneDialog: false,

        //新增小区/编辑小区
        showVillageDialog: false,
        villageDialogType: 'add',  //add\edit
      };
    },

    methods: {
      //查询
      searchTable() {
        this.searchConditions.pageNum = 1;
        this.getTableData();
      },

      //重置
      reset(){
        this.$refs.searchForm.resetFields();
        this.$refs.checkboxTree.initTreeModel();
        this.searchTable();
      },

      /**
       * 获取表格数据
       */
      getTableData() {
        this.loadState.data = false;
        tableDataFetch(
          {
            url: '/o2o/precinct/listPrecinct',
            query: this.searchConditions,
            funcId: this.Mix_funcId,
          },
        ).then(res => {
          this.tableData = res.resultData.pageInfo || [];
          console.log('请求到的表格数据：');
          console.log(this.tableData);
          console.log('表格操作按钮', this.gridBtns);
          this.tableBtnDistribute(this.tableData);
          this.loadState.data = true;
        }).catch(() => {
          this.loadState.data = true;
        });
      },

      /**
       *  表格操作
       */
      tableAction(info, scope) {
        this.rowData = scope.row;
        if (info.value === 'gridSynchronizeBtn') {
          this.syncHouse(scope.row);
        }
      },

      /**
       * 编辑小区
       */
      getCellAction(scope) {
        this.rowData = scope.row;
        this.editVillage();
      },

      /**
       * 同步房产
       */
      syncHouse(row) {
        this.$confirm('确定同步房产到该小区? 把物业管理系统的房产信息同步到O2O系统中', '同步房产', {
          type: 'warning',
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '正在同步中...',
            customClass: 'fullpage-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
          checkhouse({ precinctId: row.id }).then(() => {
            loading.close();
            this.$message.success('同步成功');
          }, (err) => {
            loading.close();
          });
        });
      },

      /**
       * action btn 点击
       */
      roleButtonCommand: function(command) {
        if (command.code === 'actionAddBtn') {
          this.showVillageDialog = true;
          this.villageDialogType = 'add';
        }
      },

      /**
       * 编辑小区
       */
      editVillage() {
        this.showVillageDialog = true;
        this.villageDialogType = 'edit';
      },
    },

    created() {
      this.searchTable();
    },
  };
</script>
