<template>
  <div class="win">
    <div class="ns-container">
      <div class="ns-container-right">
        <!--action-module (search / button)-->
        <div class="action-module ">
          <ns-biz-search-conditions>
            <!--action - 权限按钮操作区域-->
            <template slot="btns">
              <ns-biz-role-button-area :buttonList="roleButtonAction" @command="roleButtonCommand" class="fr"></ns-biz-role-button-area>
            </template>
            <template slot="main">
              <ns-form :model="searchConditions" :inline="true" ref="searchForm" class="search-form clear">
                <div class="search-form-items fl clear">
                  <ns-form-item prop="keyWord">
                    <ns-input v-model="searchConditions.keyWord" placeholder="请输入活动名称"></ns-input>
                  </ns-form-item>

                  <ns-form-item prop="precinctId">
                    <ns-select :options="villageOptions" filterable v-model="searchConditions.precinctId"
                               placeholder="请选择小区"></ns-select>
                  </ns-form-item>

                  <ns-form-item prop="activityBeginTime">
                    <ns-date-picker
                      v-model="dateRange"
                      type="daterange"
                      size="medium"
                      clearable
                      startPlaceholder="活动时间起"
                      endPlaceholder="活动时间止"
                    ></ns-date-picker>
                  </ns-form-item>

                  <ns-form-item prop="activityEndTime" v-show="false"></ns-form-item>

                  <ns-form-item prop="status">
                    <ns-select v-model="searchConditions.status" :options="activestatueOptions" placeholder="请选择活动状态"></ns-select>
                  </ns-form-item>

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
        <ns-biz-table ref="biz-table" :loadState="loadState" :data="tableData"
                   :searchConditions="searchConditions"
                   :showSummary="false"
                   @reload="getTableData"
                   @table-action="tableAction"
        ></ns-biz-table>
      </div>

      <!--其他-->
      <community-active-info-dialog
        :visible.sync="activityInfoVisible"
        :type="activityType"
        :rowData="rowData"
        @reloadGrid="searchTable"
      ></community-active-info-dialog>

      <community-active-check-dialog
        :visible.sync="checkActivityVisible"
        :rowData="rowData"
        :funcId="Mix_funcId"
      ></community-active-check-dialog>
    </div>
  </div>
</template>

<script>
  import communityActiveInfoDialog from './components/community-active-infoDialog';
  import communityActiveCheckDialog from './components/community-active-checkDialog';
  import { deleteActivity } from '../../../service/Community/activeManagement';
  import { getVillageOptions } from '../../../service/Form/getOptions';
  import Mixin from '../../../mixins';
  import { tableDataFetch } from '../../../service/System/TableFetch/table-fetch';

  export default {
    name: 'community-active',

    pageType: 'basic',

    mixins: [Mixin],

    components: {
      communityActiveInfoDialog,
      communityActiveCheckDialog,
    },

    data() {
      return {
        pageID: 'active',
        activityInfoVisible: false,
        checkActivityVisible: false,
        activityType: 'add',
        /**发布或保存*/
        activestatueOptions: [{ label: '暂存', value: 0 }, { label: '已发布', value: 1 }, { label: '已结束', value: 2 }],
        searchConditions: {
          noticeCategory: '',
          precinctId: '',
          activityBeginTime: '',
          activityEndTime: '',
          orderBy: '',
          category: '2',
          status: '',
          keyWord: '',
          pageNum: 1,
          pageSize: 20,
        },
        tableData: {},
        rowData: {},
        villageOptions: [],
        //表格数据加载状态
        loadState: {
          data: false,
          head: false
        },
      };
    },

    computed: {
      dateRange: {
        get: function() {
          return this.searchConditions.activityBeginTime ? [this.searchConditions.activityBeginTime, this.searchConditions.activityEndTime] : [];
        },
        set: function(arr) {
          let range = arr || [];
          this.searchConditions.activityBeginTime = range.length > 1 ? range[0] + ' 00:00:00' : '';
          this.searchConditions.activityEndTime = range.length > 1 ? range[1] + ' 23:59:59' : '';
        },
      },
    },

    methods: {
      /**
       * 获取表格数据
       */
      getTableData() {
        this.loadState.data = false;
        tableDataFetch(
          {
            url: '/o2o/activity/listActivity',
            query: this.searchConditions,
            funcId: this.Mix_funcId,
          },
        ).then(res => {
          this.tableData = res.resultData.pageInfo;
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
       * 表格点击查询
       */
      searchTable() {
        this.searchConditions.pageNum = 1;
        this.getTableData();
      },

      /**
       * 重置
       */
      reset(){
        this.$refs.searchForm.resetFields();
        this.searchTable();
      },


      /**
       * 按钮点击
       * */
      tableAction(info, scope) {
        this.rowData = scope.row;
        if (info.value === 'gridEditBtn') {
          this.activityInfoVisible = true;
          this.activityType = 'edit';
        }
        else if (info.value === 'gridRemoveBtn') {
          this.$confirm('确定要删除该活动??', '提示', { type: 'warning' }).then(() => {
            deleteActivity({ id: this.rowData.id }).then(() => {
              this.$message.success('删除成功');
              this.getTableData();
            });
          });
        } else if (info.value === 'gridDetailBtn') {
          this.checkActivityVisible = true;
        }
      },


      /**
       * action btn 点击
       */
      roleButtonCommand: function(command) {
        if (command.code === 'actionAddBtn') {
          this.activityType = 'add';
          this.activityInfoVisible = true;
        }
      },

      /**
       * 获取小区名称的权限
       */
      getVillageOptions: function() {
        //入参没有实际意义
        getVillageOptions({id:1}).then((data) => {
          this.villageOptions = data.resultData || [];
        });
      },
    },

    created() {
      this.getVillageOptions();
      this.getTableData();
    },
  };
</script>
