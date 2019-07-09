<template>
  <ns-dialog title="报名情况"
             :visible.sync="showDialog"
             size="large"
             @close="close"
  >
    <div class="action-module">
      <div class="search-container">
        <biz-search-conditions>
          <template slot="btns">
            <biz-role-button-area :buttonList="roleButtonLocal" @command="download()" class="fr"></biz-role-button-area>
          </template>
          <template slot="main">
            <div class="clear fl search-option">
              <ns-input v-model="searchConditions.applyUserName" placeholder="请输入客户名称"></ns-input>
            </div>
            <div class="clear fl search-option">
              <ns-button type="primary" @click="searchTable">查询</ns-button>
            </div>
          </template>
        </biz-search-conditions>
      </div>
    </div>
    <!--表格部分-->
    <biz-table ref="biz-table" :loadState="loadState" :data="tableData"
               :autoResize="false"
               :customHeight="340"
               :localHead="head"
               :searchConditions="searchConditions"
               :showSummary="false"
               :hasActionCol="false"
               :firstColType="null"
               @reload="getTableData"
    ></biz-table>

    <span slot="footer" class="dialog-footer">
        <ns-button size="small" @click="showDialog = false">关 闭</ns-button>
      </span>
  </ns-dialog>
</template>

<script>
  import head from './tableHead.js'
  import {tableDataFetch} from '../../../../service/System/TableFetch/table-fetch';
  import {downloadExcel} from '../../../../service/Download/download';

  export default {
    name: 'checkActivityDetail',

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
