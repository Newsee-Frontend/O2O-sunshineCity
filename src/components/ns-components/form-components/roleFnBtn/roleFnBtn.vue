<!--role-funcButton list ( 用户的功能菜单按钮 组件)-->
<template>
  <div
    class="ns-roleFnBtn"
    v-model="childRoleFnBtn"
    v-loading="loading"
    element-loading-text="加载中"
    :style="{ width: checkbox_width, height: 'auto' }"
  >
    <!-- check all module -->
    <div class="moduleTit mainTit">
      <el-checkbox
        v-model="firstStatus.checkSW"
        :indeterminate="firstStatus.indeterminate"
        @change="checkAllMethods('first', { vm: vm, value: firstStatus.checkSW })"
      >
      </el-checkbox>
      <span>全选</span>
    </div>
    <!-- first module -->
    <div
      class="firstModule noselect fl"
      v-for="(firstItem, firstIndex) in options"
      :key="firstItem[firstKeyRefer['menu-id']]"
      v-if="!loading"
    >
      <!-- first module title -->
      <div class="moduleTit mainTit firstModuleTit">
        <el-checkbox
          v-model="firstItem[firstKeyRefer['checkSW']]"
          :indeterminate="firstItem[firstKeyRefer['indeterminate']]"
          @change="
            checkAllMethods('second', {
              vm: vm,
              value: firstItem[firstKeyRefer['checkSW']],
              firstItem: firstItem,
              firstIndex: firstIndex,
            })
          "
        >
        </el-checkbox>
        <span>{{ firstItem[firstKeyRefer['menu-name']] }}</span>
        <!--svg-icon click show/hidden-->
        <ns-icon-svg
          :icon-class="moduleShowList[firstIndex].sw ? 'CombinedShape1' : 'CombinedShapeCopy1'"
          @click="foldOrOpen(firstIndex)"
        ></ns-icon-svg>
      </div>
      <!-- first module content -->
      <div
        class="firstContent"
        v-for="(secondItem, secondIndex) in firstItem[firstKeyRefer.children]"
        :key="secondItem[secondKeyRefer['menu-id']]"
        :class="{ opened: moduleShowList[firstIndex].sw }"
        v-if="moduleShowList[firstIndex].isLoaded"
      >
        <!-- second module title -->

        <!--:style="{width: titBaseW + 'px'}"-->
        <div class="moduleTit subTit secondModuleTit">
          <el-checkbox
            v-model="secondItem[secondKeyRefer['infoVo']][secondKeyRefer['checkSW']]"
            class="fl"
            :indeterminate="secondItem[secondKeyRefer['infoVo']][secondKeyRefer['indeterminate']]"
            @change="
              checkAllMethods('third', {
                vm: vm,
                value: secondItem[secondKeyRefer['infoVo']][secondKeyRefer['checkSW']],
                secondItem: secondItem,
                firstIndex: firstIndex,
                secondIndex: secondIndex,
              })
            "
          ></el-checkbox>
          <!--vm / value / secondItem / firstIndex /secondIndex-->
          <span class="fl">{{ secondItem[secondKeyRefer['menu-name']] }}</span>
          <!--manage-range component-->
          <cx-manage-range
            v-model="
              childRoleFnBtn[firstIndex][modelKeyRefer['infoVo']][secondIndex][
                modelKeyRefer['dataSeeModel']
              ]
            "
            width="200px"
            height="32px"
            class="fl"
            v-if="bizType === 'data-permissions'"
            @change="cxChange"
          >
          </cx-manage-range>
        </div>
        <!-- second module content -->
        <div
          :class="[
            'secondContent',
            'fl',
            {
              clear:
                thirdIndex + 1 ===
                secondItem[secondKeyRefer['infoVo']][secondKeyRefer.btnItems].length,
            },
          ]"
          v-for="(thirdItem, thirdIndex) in secondItem[secondKeyRefer['infoVo']][
            secondKeyRefer.btnItems
          ]"
          :key="thirdIndex"
        >
          <!-- third module title -->
          <div class="moduleTit subTit thirdModuleTit fl" :style="{ width: titBaseW + 'px' }">
            <span>{{ thirdItem[thirdKeyRefer['btnType']] }}</span>
          </div>
          <!--third module checkbox-->
          <ns-checkbox
            class="thirdModuleCheckbox fl"
            v-model="
              childRoleFnBtn[firstIndex][modelKeyRefer['infoVo']][secondIndex][
                modelKeyRefer['btnItems']
              ]
            "
            type="button"
            :options="thirdItem[thirdKeyRefer['children']]"
            :min="min"
            :max="max"
            :size="size"
            :width="width - titBaseW"
            :height="height"
            :keyRefer="{
              label: thirdKeyRefer.label,
              value: thirdKeyRefer.value,
              disabled: thirdKeyRefer.disabled,
            }"
          ></ns-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ns from '../../../../utils/nsQuery/nsQuery';
import keyRefer from './keyRefer'; //key - refer
import { createInitModel, watchModel, checkAllMethods } from './index'; //methods
import { getRoleFuncButton } from '../../../../service/System/Role-components/role-funcButton';

export default {
  name: '',
  data() {
    return {
      testModel: [],
      vm: {}, //store this Vue components
      childRoleFnBtn: [],
      firstKeyRefer: keyRefer.firstLevel, //指代属性字段值 一级
      secondKeyRefer: keyRefer.secondLevel, //指代属性字段值 二级
      thirdKeyRefer: keyRefer.thirdLevel, //指代属性字段值 三级
      modelKeyRefer: keyRefer.modelKey, //指代属性字段值 modelData
      loading: true, //loding

      firstStatus: {
        checkSW: false, //check all checkbox
        indeterminate: false, //indeterminate all checkbox
      },

      options: [], //check and checkbox option list
      initModelData: [], //init model data - 初始model数据
      moduleShowList: [], //module show list ( 模块折叠显示开关列表 )
      openedList: [0], //init opened modules
      titBaseW: 120, //base width
    };
  },
  created() {
    console.time('用户的功能菜单按钮 - 总耗时');
    this.vm = this;
    this.childRoleFnBtn = this.fatherRoleFnBtn;
    //request role-funcButton list (请求获取当前用户的功能菜单按钮)
    this.getRoleFuncButtonInfo();
    console.time('前端页面渲染时间');
  },
  mounted() {
    console.timeEnd('前端页面渲染时间');
  },
  methods: {
    /**
     * get role funcButton list information  (请求获取当前用户的功能菜单按钮)
     */
    getRoleFuncButtonInfo() {
      this.loading = true;
      console.time('用户的功能菜单按钮 - 请求后台数据时间');
      getRoleFuncButton()
        .then(response => {
          console.timeEnd('用户的功能菜单按钮 - 请求后台数据时间');
          console.time('前端数据处理时间');
          this.options = response.resultData;
          //create module show list  (创建模块显隐开关列表)
          this.createModuleShowList(this.options);
          //create init model and add status for data
          createInitModel(this.vm, this.options, this.childRoleFnBtn);

          /*--
              the length of init model-data list >= 0    =>    set data for childRoleFnBtn, or set it []
              保护写法：避免当后台没有数据返回时造成前台自主生产的初始modleData数组为空
              --*/
          this.initModelData.length !== 0
            ? (this.childRoleFnBtn = this.initModelData)
            : (this.childRoleFnBtn = [{}]); //手动赋予
          console.log('gcxgcgxcgxgcxgcgxcg');
          console.log(this.childRoleFnBtn);

          this.loading = false;
          console.timeEnd('前端数据处理时间');
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },

    /**
     * create module show list  (创建模块显隐开关状态值 列表)
     * @param options           option list
     */
    createModuleShowList(options) {
      options.forEach((item, index) => {
        this.moduleShowList.push({
          isLoaded: ns.base.arrContainObj(this.openedList, index) ? true : false, //加载成功标识(是否加载过)
          sw: ns.base.arrContainObj(this.openedList, index) ? true : false, //显隐开关
        });
      });
    },

    /**
     * folding/open module  (折叠/开启 模块面板操作)
     * @param options           option list
     */
    foldOrOpen(firstIndex) {
      this.moduleShowList[firstIndex].isLoaded = true; //永久开启加载成功标识
      this.moduleShowList[firstIndex].sw = !this.moduleShowList[firstIndex].sw;
    },
    /**
     *checkAll - methods (first / second /third modules for check all handle)
     * @param type       ( first / second /third )
     * @param param      Object
     * @returns {*}
     */
    checkAllMethods(type, param) {
      let checkAll = new checkAllMethods();
      switch (type) {
        case 'first':
          return checkAll.checkAllChange(param);
          break;
        case 'second':
          return checkAll.checkAllModulesChange(param);
          break;
        case 'third':
          return checkAll.checkAllItemsChange(param);
          break;
        default:
          break;
      }
    },
    cxChange(val) {
      this.xxx = val;
    },
  },
  computed: {
    checkbox_width() {
      return this.autoForm.convertUnits(this.width, 'width');
    },
    checkbox_height() {
      return this.autoForm.convertUnits(this.height, 'height', 'auto');
    },
  },
  props: {
    fatherRoleFnBtn: Array,
    /* =====================================================================================================
      注意：
        组件在使用中，如实编辑状态，即：组件初始化渲染时，有按钮初始状态被选中。
        传入的model-value的值必须符合组件渲染数据格式要求,格式参考如下（相关字段如要修改，需配合组件字段指代配置文件同步进行）
        / --------------------------------------------- /
        一：默认业务 （ 无功能插槽植入 ）
        * [
            {
              "jeCoreMenuId": "1",
              "functionVos": [
                {"jeCoreFuncinfoId": "1-1", "buttonIds": ["search1", "edit1"]},
                {"jeCoreFuncinfoId": "1-2", "buttonIds": []}
              ]
            },
            {
              "jeCoreMenuId": "2",
              "functionVos": [
                {"jeCoreFuncinfoId": "2-1", "buttonIds": []},**
                {"jeCoreFuncinfoId": "2-2", "buttonIds": []}
              ]
            }
          ]
          解释说明：
          1、"search1", "edit1"为选中按钮ID值。
          2、若该子节点数组中没有值存在，可以不配置书写，如 **，
          3、各个条目之间顺序不做特定要求，条件不允许的情况下，可以前后颠倒。

          / --------------------------------------------- /
          二：数据权限业务 （ 数据权限业务-功能插槽植入 ）
           {
            "jeCoreMenuId": "2",
            "functionVos": [
              {"jeCoreFuncinfoId": "2-1", "buttonIds": ["search2"]},
              {"jeCoreFuncinfoId": "2-2", "buttonIds": [], "dataSeeScopeVo": {"seeScopeType": 4, "seeOtherOrgIdList": [2, 12, 13]}}
            ]
           },
           {
            "jeCoreMenuId": "1",
            "functionVos": [
              {"jeCoreFuncinfoId": "1-1", "buttonIds": ["search1", "edit1"], "dataSeeScopeVo": {"seeScopeType": 1, "seeOtherOrgIdList": [1]}},
              {"jeCoreFuncinfoId": "1-2", "buttonIds": [], "dataSeeScopeVo": {"seeScopeType": 2, "seeOtherOrgIdList": [1, 11]}}
            ]
           },
          解释说明：
          1、若按钮信息（'buttonIds'属性值）数据为空，且数据权限（'dataSeeScopeVo'属性值）也为空时，则可省略不写该条目。
          2、而如果数据权限属性字段有值时，则连带着必须同时带有按钮信息（'buttonIds'属性值）（必须书写完整，因为数据权限所对应的id值，来源该数据条目，否则无法匹配）
          3、若存在按钮信息（'buttonIds'属性值）数据，且数据权限（'dataSeeScopeVo'属性值）为空时，则可省略数据权限属性字段。
          4、各个条目之间顺序不做特定要求，条件不允许的情况下，可以前后颠倒。
          5、数据相关字段值可以在相关文件中根据业务进行配置
      * =======================================================================================================
      * */
    width: { type: [String, Number] }, //表单控件宽度
    height: { type: [String, Number] }, //表单控件高度
    size: { type: String, default: 'medium' }, //尺寸
    min: { type: Number, default: 0 }, //可被勾选的 checkbox 的最小数量
    max: { type: Number, default: 99999 }, //可被勾选的 checkbox 的最大数量
    bizType: { type: String, default: 'normal' }, //业务类型 （如：normal（无）/ data-permissions(开启数据权限)）
  },
  model: {
    prop: 'fatherRoleFnBtn',
    event: 'change',
  },
  watch: {
    childRoleFnBtn: {
      handler: function(val, oldVal) {
        if (this.loading) {
          return;
        }
        watchModel(this, val);
        this.$emit('change', val);
      },
      deep: true,
    },
    fatherRoleFnBtn() {
      this.childRoleFnBtn = this.fatherRoleFnBtn;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>
