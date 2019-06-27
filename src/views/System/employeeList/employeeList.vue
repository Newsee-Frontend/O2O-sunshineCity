<!--部门与员工-->
<template>
  <div class="win" :id="pageID">
    <div class="ns-container">
      <div class="ns-container-left" :class="{ 'ns-container-left-border': changeStatus.status }">
        <organize-tree
          :funcId="Mix_funcId"
          title="组织架构"
          draggable
          showFunction
          :searchConditions="Mix_searchConditions"
          @tree-item-click="treeItemClick"
          :changeStatus="changeStatus"
        ></organize-tree>
      </div>
      <div class="ns-container-right" :id="pageID + '-holder'">
        <!--action-module (search / button)-->
        <div class="action-module" :id="pageID + '-search'">
          <!--search module-->
          <ns-search-conditions
            :funcId="Mix_funcId"
            :thlist="Mix_thlist"
            :searchConditions="Mix_searchConditions"
            @query="getGridData"
            :changeStatus="changeStatus"
          >
            <!--fnbutton module / slot for secrch conditions ---->
            <div class="action-fnbutton">
              <ns-role-button
                mode="icon"
                :roleInfo="{
                  code: 'actionAddUserBtn',
                  name: '新增员工',
                  nameEn: '',
                  areaType: 'ACTION',
                  index: '',
                  btnType: 'single',
                }"
                @click="addEmployee()"
              ></ns-role-button>
              <ns-role-button
                mode="dp-text"
                title="更多"
                @command="handleCommand"
              ></ns-role-button>
            </div>
          </ns-search-conditions>
        </div>
        <!--grid module-->
        <ns-grids
          :gridID="pageID + '-grid'"
          :gridData="gridData"
          :thlist="Mix_thlist"
          :loadState="Mix_loadState"
          :searchConditions="Mix_searchConditions"
          :funcId="Mix_funcId"
          :holderInfo="Mix_holderInfo"
          @refreshGrid="getGridData"
          @grid-ation="gridAtion"
          @selection-change="selectionChange"
        ></ns-grids>

        <employee-form
          :funcId="Mix_funcId"
          :dialogTit="dialogTit"
          :treeNodeObj="Mix_treeNodeObj"
          :scope="selectedGridNodeObj"
          :dialogVisible="dialogVisible.employeeFormVisible"
          v-if="dialogVisible.employeeFormVisible.visible"
          @refreshGrid="getGridData"
        ></employee-form>
      </div>
      <!--导入弹出框-->
      <ns-dialog title="导入员工信息" :visible.sync="importVisible.visible">
        <ns-form ref="importForm" :model="importForm" label-width="100px">
          <ns-form-item label="操作步骤：">
            <span>
              <br />
              1、下载《员工信息导入模板》
              <br />
              2、打开下载表，将对应字段信息输入或粘贴进本表。<br />为保障粘贴信息被有效导入，请使用纯文本或数字<br />
              3、信息输入完毕，点击 “浏览” 按钮， 选择excel文档<br />
              4、点击 “开始导入”
            </span>
          </ns-form-item>
          <a><span>立即下载《员工信息导入模板》</span></a>
        </ns-form>
        <span slot="footer" class="dialog-footer">
          <ns-button type="primary" @click.native="submitForm('moreFormVisible')">保存</ns-button>
          <ns-button @click.native="importVisible = false">取消</ns-button>
        </span>
      </ns-dialog>
    </div>
  </div>
</template>
<script>
import { gridDataDelete, gridDataOperate } from '../../../service/System/employeeList';
import OrganizeTree from '../../../components/Biz/Biz-tree/biz-organize-tree/Biz-organize-tree.vue'; // 组织树 组件
import employeeStaticData from './employeeStaticData';
import pickerOptionsMap from '../../../static-data/form/picker-options';
import employeeForm from './employeeForm/employeeForm.vue';
import { downloadExcel } from '../../../service/Download/download';
import Mixin from "../../../mixins";


export default {
  name: 'employeeList',
  pageType: 'basic',
  mixins: [Mixin],

  components: {
    OrganizeTree,
    employeeForm,
  },
  data() {
    return {
      //========== 基本 base =========
      pageID: 'employeeList', //页面、表格、自动表单 ID值（必须）

      //========== 筛选器 search =========
      changeStatus: { status: true }, // 左侧树的状态

      //========== 表格 grid =========
      employeeList: [],
      gridData: {}, //列表数据
      multipleSelection: [], //grid selected list
      selectedGridNodeObj: {}, //选中的表格当前行数据

      //========== dialog auto form  =========
      // dialogVisible: {visible: false},//dialog switch
      dialogVisible: {
        employeeFormVisible: { visible: false },
      },
      dialogTit: '', //dialog title
      submitType: 'add', //判断当前表单的类型（add / edit）
      requestUrl: '', //自动表单提交地址
      submitUrl: '',
      autoFormID: '', //表单ID
      dialogWidth: '764px',
      addUserCover: {
        //datePiker option
        pickerOptions: {
          userBirthday: pickerOptionsMap['date-point'].birthday,
        },
        resourcefieldBindingfnList: {
          userState: function(params) {
            if (params.type === 'change' && params.type !== 'visibleChange') {
              const webVm = store.vm.get('employeeList');
              if (params.formData.modelData[params.modelKey] === '0') {
                webVm.$message({
                  message: '离职后该员工将不能登录系统!!!',
                  type: 'warning',
                });
              }
            }
          },
        },
        dynamicQuery: {
          roleids: '',
        },
      },
      addPersonToRoleCoverData: {
        dynamicQuery: {
          userIds: '',
        },
      },
      localData: employeeStaticData,
      isAdd: false, //是否新增表单

      //========== 其他  =========
      importForm: {},
      importVisible: {
        visible: false,
      },
    };
  },
  methods: {
    //新增员工-初始化动态表单
    addEmployee() {
      this.isAdd = true; //新增开关
      if (!this.Mix_treeNodeObj.organizationId || this.Mix_treeNodeObj.organizationId === 0) {
        this.$message({ message: '请先选择组织', type: 'warning' });
      } else {
        this.dialogTit = '新增员工';
        this.selectedGridNodeObj.type = 'add';
        this.dialogVisible.employeeFormVisible.visible = true;
      }
    },
    /**
     * grid ation event （操作列操作回调事件）
     * @param params
     * @param scope
     */
    gridAtion(params, scope) {
      this.selectedGridNodeObj = scope.row;
      this.selectedGridNodeObj.type = 'edit';
      switch (params.value) {
        case 'gridEditBtn': //编辑
          this.dialogTit = '编辑员工';
          this.dialogVisible.employeeFormVisible.visible = true;
          break;
        case 'leave': //离职
          this.$confirm('确定离职?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'el-message-box-oppositeBtns',
            type: 'warning',
          })
            .then(() => {
              gridDataOperate({
                userId: this.selectedGridNodeObj.userId,
                operateType: 'leave',
              })
                .then(() => {
                  this.$message({
                    message: '离职成功',
                    type: 'success',
                  });
                  this.getGridData();
                })
                .catch(() => {
                  this.$message({
                    message: '离职失败，请联系开发商',
                    type: 'error',
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消离职',
              });
            });
          break;
        case 'gridEnableBtn': //激活
          this.$confirm('确定启用?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'el-message-box-oppositeBtns',
            type: 'warning',
          })
            .then(() => {
              gridDataOperate({
                userId: this.selectedGridNodeObj.userId,
                operateType: 'enable',
              })
                .then(() => {
                  this.$message({
                    message: '启用成功',
                    type: 'success',
                  });
                  this.getGridData();
                })
                .catch(() => {
                  this.$message({
                    message: '启用失败，请联系开发商',
                    type: 'error',
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消启用',
              });
            });
          break;
        case 'gridStopBtn': //停用
          this.$confirm('停用之后该员工将不能登录系统，确定停用?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'el-message-box-oppositeBtns',
            type: 'warning',
          })
            .then(() => {
              gridDataOperate({
                userId: this.selectedGridNodeObj.userId,
                operateType: 'stop',
              })
                .then(() => {
                  this.$message({
                    message: '停用成功',
                    type: 'success',
                  });
                  this.getGridData();
                })
                .catch(() => {
                  this.$message({
                    message: '停用失败，请联系开发商',
                    type: 'error',
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消停用',
              });
            });
          break;
        case 'gridRemoveBtn': //删除
          this.$confirm('确定删除?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'el-message-box-oppositeBtns',
            type: 'warning',
            closeOnClickModal: false,
          })
            .then(() => {
              gridDataDelete({
                userId: this.selectedGridNodeObj.userId,
              })
                .then(() => {
                  this.$message({
                    message: '删除成功',
                    type: 'success',
                  });
                  this.getGridData();
                })
                .catch(() => {
                  this.$message({
                    message: '删除失败，请联系开发商',
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
        default:
          break;
      }
    },

    //grid勾选 checkbox/radio 回调
    selectionChange(selection) {
      let arry = [];
      for (let i = 0; i < selection.length; i++) {
        arry.push(selection[i].houseId);
      }
      this.multipleSelection = arry;
    },

    /**
     * tree item click (选择组织节点回调)
     * @param condition
     */
    treeItemClick(condition) {
      this.Mix_treeNodeObj = condition;
      this.addUserCover.dynamicQuery.roleids = this.Mix_treeNodeObj.organizationId;
      this.getGridData()
    },


    //表数据查询
    getGridData(condition) {
      if (condition) {
        this.Mix_searchConditions.filterList = condition;
      }
      this.Mix_loadState.data = false;
      this.grid.fetch(
        {
          url: '/system/user/list-user',
          query: this.Mix_searchConditions,
          funcId: this.Mix_funcId,
        },
        res => {
          this.gridData = res;
          //增加 固定操作列 - 按钮数据
          this.gridData.list.forEach(item => {
            if (item.isActived === '1') {
              item.fnsclick = [
                { label: '编辑', value: 'gridEditBtn' },
                { label: '删除', value: 'gridRemoveBtn' },
                { label: '停用', value: 'gridStopBtn' },
              ];
            } else if (item.isActived === '0') {
              item.fnsclick = [
                { label: '编辑', value: 'gridEditBtn' },
                { label: '删除', value: 'gridRemoveBtn' },
                { label: '启用', value: 'gridEnableBtn' },
              ];
            }
          });
          this.Mix_loadState.data = true;
        },
        () => {
          this.gridData = {};
          this.Mix_loadState.data = true;
        }
      );
    },

    //更多功能
    handleCommand(command) {
      if (command === 'import') {
        //导入
        this.importVisible.visible = true;
      } else if (command === 'actionExportBtn') {
        //导出
        downloadExcel('/system/user/export-excel', this.Mix_searchConditions)
      }
    },
  },
  //初始化获取数据
  created() {
    this.getGridData();
  }

};
</script>
