<template>
  <div class="win" id="village">
    <div class="ns-container">
      <div class="ns-container-right">
        <div class="action-module">
          <biz-search-conditions>
            <template slot="btns">
              <ns-role-button
                mode="icon"
                :coerciveShow="true"
                @click="addVillage"
                :roleInfo="{
                  areaType: 'ACTION',
                  code: 'actionAddBtn',
                  name: '新增',
                  nameEn: '',
                  index: 1,
                  btnType: 'single',
                }"></ns-role-button>
            </template>
            <template slot="main">
              <div class="clear fl search-option">
                <ns-input v-model="searchConditions.keyWord" placeholder="请输入小区名称"></ns-input>
              </div>

              <div class="clear fl search-option">
                <ns-select v-model="searchConditions.status" :options="authStatusOptions"
                           placeholder="请选择认证状态"></ns-select>
              </div>

              <div class="clear fl search-option">
                <ns-select v-model="searchConditions.companyId" :options="companyList" placeholder="请选择公司"></ns-select>
              </div>

              <div class="clear fl search-option">
                <ns-button type="primary" @click="searchTable">查询</ns-button>
              </div>
            </template>
          </biz-search-conditions>
        </div>

        <!--表格部分-->
        <biz-table ref="biz-table" :loadState="loadState" :data="tableData"
                   :funcId="Mix_funcId"
                   :searchConditions="searchConditions"
                   :showSummary="false"
                   @reload="getTableData"
                   @cell-action="getCellAction"
                   @table-action="tableAction"
        ></biz-table>

        <!--<village-info-dialog-->
          <!--:visible.sync="showVillageDialog"-->
          <!--:rowData="rowData"-->
          <!--:companyList="companyList"-->
          <!--:type="villageDialogType"-->
          <!--@reloadGrid="searchTable"-->
        <!--&gt;</village-info-dialog>-->

      </div>
    </div>
  </div>
</template>

<script>
  // import servicePhoneDialog from './componnets/servicePhoneDialog';
  import Mixin from "../../../mixins";
  import villageInfoDialog from './componnets/villageInfoDialog';
  import { checkhouse, getCompanyList } from '../../../service/Channel/villageSetting';
  import { tableDataFetch } from '../../../service/TableFetch/table-fetch'

  export default {
    name: 'village-setting',

    pageType: 'basic',

    mixins: [Mixin],

    components: {
      villageInfoDialog,
    },

    data() {
      return {
        authStatusOptions: [{ label: '待开通', value: '0' }, { label: '开通中', value: '1' }, { label: '已关闭', value: '2' }],
        companyList: [],
        tableData: {},
        rowData: {},
        //表格数据加载状态
        loadState: {
          data: false,
          head: false,
        },
        searchConditions: {
          keyWord: '',
          companyId: '',
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
      searchTable() {
        this.searchConditions.pageNum = 1;
        this.getTableData();
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
          this.tableData.list.forEach(item => {
            item.fnsclick = [
              { label: '同步房产', value: 'gridSyncBtn' },
            ];
          });
          this.loadState.data = true;
        }).catch(() => {
          this.loadState.data = true;
        });
      },

      /**
       *  表格操作
       */
      tableAction(info, scope){
        this.rowData = scope.row;
        if(info.value === 'gridSyncBtn'){
          this.syncHouse(scope.row);
        }
      },

      /**
       * 编辑小区
       */
      getCellAction(scope){
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
            this.$message.error(err.resultMsg);
            loading.close();
          });
        });
      },


      /**
       * 增加小区
       */
      addVillage() {
        this.showVillageDialog = true;
        this.villageDialogType = 'add';
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
      getCompanyList().then(data=>{
        this.companyList = data.resultData;
      })
    },
  };
</script>

<style scoped>

</style>
