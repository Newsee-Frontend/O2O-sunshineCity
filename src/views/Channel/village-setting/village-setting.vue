<template>
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
              <ns-select v-model="searchConditions.companyID" :options="companyList" placeholder="请选择公司"></ns-select>
            </div>

            <div class="clear fl search-option">
              <ns-button type="primary">查询</ns-button>
            </div>
          </template>
        </biz-search-conditions>
      </div>

      <el-table
        :data="gridData"
        border
        style="width: 100%">

        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-button @click="syncHouse(scope.row)" type="text" size="small">
              同步房产
            </el-button>
            <el-button  @click="editVillage(scope.row)"  type="text" size="small">
              编辑
            </el-button>
            <!--<el-button @click="servicePhoneAction(scope.row)" type="text" size="small">-->
            <!--服务电话-->
            <!--</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <!--<service-phone-dialog-->
        <!--:visible.sync="showServicePhoneDialog"-->
        <!--:rowData="rowData"-->
      <!--&gt;</service-phone-dialog>-->

      <village-info-dialog
        :visible.sync="showVillageDialog"
        :rowData="rowData"
        :companyList="companyList"
        :type="villageDialogType"
      ></village-info-dialog>

    </div>
  </div>
</template>

<script>
  // import servicePhoneDialog from './componnets/servicePhoneDialog';
  import villageInfoDialog from './componnets/villageInfoDialog';
  import { checkhouse } from '../../../service/Channel/villageSetting';
  import { tableDataFetch } from '../../../service/TableFetch/table-fetch'

  export default {
    name: 'village-setting',

    components: {
      villageInfoDialog,
    },

    data() {
      return {
        authStatusOptions: [{ label: '待开通', value: '0' }, { label: '开通中', value: '1' }, { label: '已关闭', value: '2' }],
        companyList: [],
        gridData: [],
        rowData: {},
        searchConditions: {
          keyWord: '',
          companyID: '',
          status: '',
        },
        showServicePhoneDialog: false,

        //新增小区/编辑小区
        showVillageDialog: false,
        villageDialogType: 'add',  //add\edit
      };
    },

    methods: {
      /***
       * 获取小区列表
       */
      getGridData() {
        tableDataFetch(this.searchConditions).then((data)=> {
          this.gridData = data.resultData.pageInfo.list;
          this.companyList = data.resultData.companyList;
        });
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
            this.$message.success(err.resultMsg);
            loading.close();
          });
        });
      },

      /**
       * 服务电话，暂不开通
       */
      servicePhoneAction(row) {
        this.rowData = row;
        this.showServicePhoneDialog = true;
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
      editVillage(row) {
        this.showVillageDialog = true;
        this.villageDialogType = 'edit';
        this.rowData = row;
      },
    },

    created() {
      this.getGridData();
    },
  };
</script>

<style scoped>

</style>
