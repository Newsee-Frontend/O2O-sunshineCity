<template>
  <div class="win" id="nnn">
    <div class="ns-container">
      <div class="ns-container">
        <!--tree-module-->
        <div class="ns-container-left">
        </div>
        <!--temple container-->
        <div class="ns-container-right">
          <!--action-module (search / button)-->
          <div class="action-module" style="overflow: hidden">
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
                  @click="addNotice()"

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
                  <ns-input v-model="searchConditions.keyWord" placeholder="请输入标题公告"></ns-input>
                </div>

                <div class="clear fl search-option">
                  <ns-select :options="villageOptions" v-model="searchConditions.precinctId"
                             placeholder="请选择小区"></ns-select>
                </div>

                <div class="clear fl search-option">
                  <ns-select :options="activestatueOptions" v-model="searchConditions.status"
                             placeholder="请选择公告状态"></ns-select>
                </div>

                <div class="clear fl search-option">
                  <ns-date-picker
                    v-model="dateRange"
                    type="daterange"
                    size="medium"
                    clearable
                    startPlaceholder="发布时间起"
                    endPlaceholder="发布时间止"
                  ></ns-date-picker>
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
                     :showHeadOperation="false"
                     @reload="getTableData"
                     @table-action="tableAction"
                     @selection-change="selectionChange"
          ></biz-table>
        </div>
      </div>

      <notice-dialog
        :type="noticeTpye"
        :rowData="rowData"
        :visible.sync="showNoticeDialog"
        @reloadGrid="searchTable"
      ></notice-dialog>

      <check-notice-detail
        :visible.sync="checkNoticeVisible"
        :rowData="rowData"
      >

      </check-notice-detail>

    </div>
  </div>
</template>

<script>
  import noticeDialog from './componnets/notice-dialog';
  import checkNoticeDetail from './componnets/checkNoticeDetail';
  import { deleteNotice } from '../../../service/Channel/noticeManagement'
  import { getVillageOptions } from '../../../service/Form/getOptions';
  import { tableDataFetch } from '../../../service/TableFetch/table-fetch';
  import Mixin from "../../../mixins";

  export default {
    name: 'notice-management',

    pageType: 'basic',

    mixins: [Mixin],

    components: {
      noticeDialog,
      checkNoticeDetail
    },

    data() {
      return {
        searchConditions: {
          keyWord: '',
          precinctId: '',
          noticeCategory: '',
          status: '',
          pubBeginTime: '',
          pubEndTime: '',
          category: "1",
          pageNum: 1, //当前页数
          pageSize: 20, //每页显示条目个数
        },
        /**发布或保存*/
        activestatueOptions: [{ label: '暂存', value: 0 }, { label: '已发布', value: 1 }, { label: '已结束', value: 2 }],
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
            url: '/o2o/notice/listNotice',
            query: this.searchConditions,
            funcId: 'funcId',
          },
        ).then(res => {
          this.tableData = res.resultData.pageInfo || {};
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
       * 表格 selection 选择
       * @param row
       * @param index
       */
      selectionChange(row, index) {
        console.log('表数据 checkbox/radio 选择的时候');
        console.log(row);
        console.log(index);
      }
      ,

      /**
       * table column action
       * @param info
       * @param scope
       */
      /**
       * 按钮点击
       * */
      tableAction(info, scope){
        this.rowData = scope.row;
        if(info.value === "gridEditBtn"){
          this.showNoticeDialog = true;
          this.noticeTpye = 'edit'
        }else if(info.value === 'gridRemoveBtn'){
          this.$confirm('确定要删除该活动??', '提示', {type: 'warning'}).then(()=>{
            deleteNotice({id: this.rowData.id}).then(()=>{
              this.$message.success('删除成功');
              this.getTableData();
            });
          })
        }else if(info.value === 'gridCheckBtn'){
          this.checkNoticeVisible = true;
        }
      },

      /**
       * 获取小区名称的权限
       */
      getVillageOptions: function() {
        getVillageOptions().then((data) => {
          this.villageOptions = data.resultData || [];
        });
      },

      /**
       * 新增公告
       */
      addNotice() {
        this.noticeTpye = 'add';
        this.showNoticeDialog = true;
      },
    },

    computed: {
      dateRange: {
        get: function() {
          return this.searchConditions.pubBeginTime ? [this.searchConditions.pubBeginTime, this.searchConditions.pubEndTime] : [];
        },

        set: function(arr) {
          let range = arr || [];
          this.searchConditions.pubBeginTime = range.length > 1 ? range[0] + ' 00:00:00' :  '';
          this.searchConditions.pubEndTime = range.length > 1 ? range[1] + ' 23:59:59': '';
        },
      },
    },

    created() {
      this.searchTable();
      this.getVillageOptions();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
