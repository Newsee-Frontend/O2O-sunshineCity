<template>
  <div class="win" id="notice">
    <div class="ns-container">
      <!--temple container-->
      <div class="ns-container-right">
        <!--action-module (search / button)-->
        <div class="action-module">
          <ns-biz-search-conditions>
            <template slot="btns">
              <ns-biz-role-button-area :buttonList="roleButtonAction" @command="roleButtonCommand" class="fr"></ns-biz-role-button-area>
            </template>

            <template slot="main">
              <ns-form :model="searchConditions" :inline="true" ref="searchForm" class="search-form clear">

                <div class="search-form-items fl clear">
                  <ns-form-item prop="keyWord">
                    <ns-input v-model="searchConditions.keyWord" placeholder="请输入标题公告"></ns-input>
                  </ns-form-item>

                  <ns-form-item prop="precinctId">
                    <ns-select :options="villageOptions" filterable v-model="searchConditions.precinctId"
                               placeholder="请选择小区"></ns-select>
                  </ns-form-item>

                  <ns-form-item prop="status">
                    <ns-select :options="activestatueOptions" v-model="searchConditions.status"
                               placeholder="请选择公告状态"></ns-select>
                  </ns-form-item>

                  <ns-form-item prop="pubBeginTime">
                    <ns-date-picker
                      v-model="dateRange"
                      type="daterange"
                      size="medium"
                      clearable
                      startPlaceholder="发布时间起"
                      endPlaceholder="发布时间止"
                    ></ns-date-picker>
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
        <ns-biz-table ref="biz-table" :loadState="loadState" :data="tableData"
                   :searchConditions="searchConditions"
                   :showSummary="false"
                   @reload="getTableData"
                   @table-action="tableAction"
                   @selection-change="selectionChange"
        ></ns-biz-table>
      </div>

      <!--其他-->
      <community-notice-info-dialog :type="noticeTpye" :rowData="rowData" :visible.sync="showNoticeDialog" @reloadGrid="searchTable"></community-notice-info-dialog>
      <community-notice-check-dialog :visible.sync="checkNoticeVisible" :rowData="rowData"></community-notice-check-dialog>
    </div>
  </div>
</template>

<script>
  import communityNoticeInfoDialog from './componnets/community-notice-infoDialog';
  import communityNoticeCheckDialog from './componnets/community-notice-checkDialog';
  import { deleteNotice } from '../../../service/Community/noticeManagement';
  import { getVillageOptions } from '../../../service/Form/getOptions';
  import { tableDataFetch } from '../../../service/System/TableFetch/table-fetch';
  import Mixin from '../../../mixins';

  export default {
    name: 'community-notice',

    pageType: 'basic',

    mixins: [Mixin],

    components: { communityNoticeInfoDialog, communityNoticeCheckDialog },

    data() {
      return {
        pageID: 'notice',
        searchConditions: {
          keyWord: '',
          precinctId: '',
          noticeCategory: '',
          status: '',
          pubBeginTime: '',
          pubEndTime: '',
          category: '1',
          pageNum: 1, //当前页数
          pageSize: 20, //每页显示条目个数
        },
        /**发布或保存*/
        activestatueOptions: [{ label: '暂存', value: 0 }, { label: '已发布', value: 1 }],
        villageOptions: [],
        noticeTypeOptions: [],

        noticeTpye: 'add',  //add\edit
        showNoticeDialog: false,
        checkNoticeVisible: false,
        rowData: {},
        tableData: {},
        //表格数据加载状态
        loadState: {
          data: false,
          head: false,
        },
      };
    },

    computed: {
      dateRange: {
        get: function() {
          return this.searchConditions.pubBeginTime ? [this.searchConditions.pubBeginTime, this.searchConditions.pubEndTime] : [];
        },

        set: function(arr) {
          let range = arr || [];
          this.searchConditions.pubBeginTime = range.length > 1 ? range[0] + ' 00:00:00' : '';
          this.searchConditions.pubEndTime = range.length > 1 ? range[1] + ' 23:59:59' : '';
        },
      },
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
        this.searchTable();
      },

      /**
       * 获取表格数据
       */
      getTableData() {
        this.loadState.data = false;
        tableDataFetch(
          {
            url: '/o2o/notice/listNotice',
            query: this.searchConditions,
            funcId: 'funcId',
          },
        ).then(res => {
          this.tableData = res.resultData.pageInfo || {};
          console.log('请求到的表格数据：');
          console.log(this.tableData);
          console.log('表格操作按钮', this.gridBtns, this.roleButtonGrid);
          this.tableBtnDistribute(this.tableData);
          this.loadState.data = true;
        }).catch(() => {
          this.loadState.data = true;
        });
      },

      /**
       * 表格 selection 选择
       * @param row
       * @param index
       */
      selectionChange(row, index) {
        console.log('表数据 checkbox/radio 选择的时候');
        console.log(row);
        console.log(index);
      },

      /**
       * table column action
       * @param info
       * @param scope
       */
      /**
       * 按钮点击
       * */
      tableAction(info, scope) {
        this.rowData = scope.row;
        if (info.value === 'gridEditBtn') {
          this.showNoticeDialog = true;
          this.noticeTpye = 'edit';
        } else if (info.value === 'gridRemoveBtn') {
          this.$confirm('确定要删除该活动??', '提示', { type: 'warning' }).then(() => {
            deleteNotice({ id: this.rowData.id }).then(() => {
              this.$message.success('删除成功');
              this.getTableData();
            });
          });
        } else if (info.value === 'gridDetailBtn') {
          this.checkNoticeVisible = true;
        }
      },

      /**
       * 获取小区名称的权限
       */
      getVillageOptions: function() {
        //入参没有实际意义
        getVillageOptions({id: 1}).then((data) => {
          this.villageOptions = data.resultData || [];
        });
      },


      /**
       * action btn 点击
       */
      roleButtonCommand: function(command) {
        if (command.code === 'actionAddBtn') {
          this.noticeTpye = 'add';
          this.showNoticeDialog = true;
        }
      },
    },

    created() {
      this.getVillageOptions();
      this.searchTable();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
