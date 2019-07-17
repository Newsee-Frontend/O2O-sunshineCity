<template>
  <ns-dialog title="报名情况"
             :visible.sync="showDialog"
             size="large"
             @close="close"
  >
    <div style="position: relative;height: 100%">
      <div class="action-module">
        <div class="search-container">
          <ns-biz-search-conditions>
            <!--权限按钮区-->
            <template slot="btns">
              <ns-biz-role-button-area :buttonList="roleButtonLocal" @command="download()" class="fr"></ns-biz-role-button-area>
            </template>

            <!--查询条件-->
            <template slot="main">
              <ns-form :model="searchConditions" :inline="true" ref="searchForm" class="search-form clear">
                <div class="search-form-items fl clear">
                  <ns-form-item prop="keyWord">
                    <ns-input v-model="searchConditions.applyUserName" placeholder="请输入活动名称"></ns-input>
                  </ns-form-item>
                </div>
                <div class="search-operation fl clear">
                  <ns-button type="primary" @click="searchTable">搜索</ns-button>
                </div>
              </ns-form>
            </template>
          </ns-biz-search-conditions>
        </div>
      </div>
      <!--表格部分-->
      <ns-biz-table ref="biz-table" :loadState="loadState" :data="tableData"
                 :autoResize="false"
                 :customHeight="404"
                 :localHead="head"
                 :searchConditions="searchConditions"
                 :showSummary="false"
                 :hasActionCol="false"
                 :firstColType="null"
                 @reload="getTableData"
      ></ns-biz-table>
    </div>

    <span slot="footer" class="dialog-footer">
        <ns-button size="small" @click="showDialog = false">关 闭</ns-button>
      </span>
  </ns-dialog>
</template>

<script>
  import head from './community-active-checkHead.js'
  import {tableDataFetch} from '../../../../service/System/TableFetch/table-fetch';
  import {downloadExcel} from '../../../../service/Download/download';

  export default {
    name: 'community-active-checkDialog',

    data() {
      return {
        showDialog: false,
        roleButtonLocal: [
          {
            areaType: "ACTION",
            btnType: "single",
            code: "actionExportBtn",
            icon: "daochuExcel",
            name: "导出Excel",
            type: "text"
          }
        ],
        keyWord: '',
        head: head,
        tableData: {},
        searchConditions: {
          applyUserName: '',
          noticeId: '',
          pageNum: 1,
          pageSize: 20,
        },

        //表格数据加载状态
        loadState: {
          data: false,
          head: false,
        },
      }
    },

    props: {
      visible: Boolean,
      rowData: Object,
      funcId: [String, Number]
    },

    watch: {
      //初始化
      visible(val) {
        this.showDialog = val;
        if (val) {
          this.searchConditions = {
            applyUserName: '',
            noticeId: this.rowData.id,
            pageNum: 1,
            pageSize: 20,
          };
          this.searchTable();
        }
      }
    },

    methods: {
      close() {
        this.showDialog = false;
        this.$emit('update:visible', this.showDialog);
      },

      /**
       * 获取表格数据
       */
      getTableData() {
        this.loadState.data = false;
        this.tableData = {};
        tableDataFetch(
          {
            url: '/o2o/activity/detail',
            query: this.searchConditions,
            method: 'get',
            funcId: this.funcId,
          },
        ).then(res => {
          this.tableData = res.resultData.pageInfo;
          console.log('请求到的表格数据：');
          console.log(this.tableData);
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
       * 下载
       */
      download() {
        //导出
        downloadExcel('/o2o/activity/export', {id: this.rowData.id});
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
