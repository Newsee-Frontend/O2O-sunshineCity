<template>
    <div class="active-management-wrapper">
      <div class="ns-container">
        <div class="ns-container-right">
          <div class="action-module">
            <biz-search-conditions>
              <template slot="btns">
                <ns-role-button
                  mode="icon"
                  :coerciveShow="true"
                  :roleInfo="{
                  areaType: 'ACTION',
                  code: 'actionAddBtn',
                  name: '新增',
                  nameEn: '',
                  index: 1,
                  btnType: 'single',
                }"
                  @click="addActive()"

                >
                  <!--<ns-role-button-->
                  <!--mode="dp-text"-->
                  <!--title="更多"-->
                  <!--@command="handleCommand"-->
                  <!--&gt;</ns-role-button>-->
                </ns-role-button>
              </template>
              <template slot="main">
                <div class="clear fl search-option">
                  <ns-input v-model="searchConditions.keyWord" placeholder="请输入活动名称"></ns-input>
                </div>

                <div class="clear fl search-option">
                  <ns-select :options="villageOptions" v-model="searchConditions.precinctId" placeholder="请选择小区"></ns-select>
                </div>

                <div class="clear fl search-option">
                  <ns-date-picker
                    v-model="dateRange"
                    type="daterange"
                    size="medium"
                    clearable
                    startPlaceholder="活动时间起"
                    endPlaceholder="活动时间止"
                  ></ns-date-picker>
                </div>

                <div class="clear fl search-option">
                  <ns-select v-model="searchConditions.status" :options="activestatueOptions" placeholder="请选择活动状态"></ns-select>
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
                     @table-action="tableAction"
          ></biz-table>
        </div>
      </div>

      <activity-info-dialog
        :visible.sync="activityInfoVisible"
        :type="activityType"
        :rowData="rowData"
      ></activity-info-dialog>

    </div>
</template>

<script>
  import activityInfoDialog from './components/activityInfoDialog'
  import { deleteActivity } from '../../../service/Channel/activeManagement'
  import { getVillageOptions } from '../../../service/Form/getOptions'
  import Mixin from "../../../mixins";
  import { tableDataFetch } from '../../../service/TableFetch/table-fetch';
  export default {
    name: 'active-management',

    pageType: 'basic',

    mixins: [Mixin],

    components: {
      activityInfoDialog
    },

    data(){
      return{
        pageID: 'active',
        activityInfoVisible: false,
        activityType: 'add',
        /**发布或保存*/
        activestatueOptions: [{ label: '暂存', value: 0 }, { label: '已发布', value: 1 }, { label: '已结束', value: 2 }],
        searchConditions: {
          noticeCategory: "",
          precinctId: "",
          activityBeginTime: "",
          activityEndTime: "",
          orderBy: "",
          category: "2",
          status: "",
          keyWord: "",
          pageNum: 1,
          pageSize: 20,
        },
        tableData: {},
        rowData: {},
        villageOptions: [],
        //表格数据加载状态
        loadState: {
          data: false,
          head: false,
        },
      }
    },

    computed: {
      dateRange: {
        get: function(){
          return this.searchConditions.activityBeginTime ? [this.searchConditions.activityBeginTime, this.searchConditions.activityEndTime] : []
        },

        set: function(arr){
          let range = arr || [];
          this.searchConditions.activityBeginTime = range.length > 1 ? range[0] + ' 00:00:00' :  '';
          this.searchConditions.activityEndTime = range.length > 1 ? range[1] + ' 23:59:59': '';
        }
      }
    },

    methods: {

      /**
       * 获取表格数据
       */
      getTableData() {
        tableDataFetch(
          {
            url: '/o2o/activity/listActivity',
            query: this.searchConditions,
            funcId: this.Mix_funcId,
          },
        ).then(res => {
          this.tableData = res.resultData.pageInfo || [];
          console.log('请求到的表格数据：');
          console.log(this.tableData);
          this.tableData.list.forEach(item => {
            item.fnsclick = [
              { label: '编辑', value: 'gridEditBtn' },
              { label: '删除', value: 'gridRemoveBtn'},
              { label: '查看', value: 'gridCheckBtn'}
            ];
          });
          this.loadState.data = true;
        }).catch(() => {
          this.loadState.data = true;
        });
      },

      /**
       * 表格点击查询
       */
      searchTable() {
        this.searchConditions.pageNum = 1;
        this.getTableData();
      },

      /**
       * 按钮点击
       * */
      tableAction(info, scope){
        this.rowData = scope.row;
        if(info.value === "gridEditBtn"){
          this.activityInfoVisible = true;
          this.activityType = 'edit'
        }else if(info.value === 'gridRemoveBtn'){
          this.$confirm('确定要删除该活动??', '提示', {type: 'warning'}).then(()=>{
            deleteActivity({id: this.rowData.id}).then(()=>{
              this.$message.success('删除成功');
              this.getTableData();
            });
          })
        }
      },


      addActive: function(){
        this.activityType = 'add';
        this.activityInfoVisible = true;
      },

      /**
       * 获取小区名称的权限
       */
      getVillageOptions: function(){
        getVillageOptions().then((data)=>{
          this.villageOptions = data.resultData || [];
        })
      }
    },

    created(){
      this.getVillageOptions();
      this.getTableData();
    }
  };
</script>
