<template>
  <el-form-item
    :class="[
      'ns-muster-item',
      { 'limit-label': parseInt(labelWidthConvert) < 13 },
      { 'isMockBlock-100': isMockBlock && parseInt(infoLabelWidth) === 100 },
      { 'isMockBlock-150': isMockBlock && parseInt(infoLabelWidth) === 150 },
      { validating: isValidating },
      { 'cue-normal': cueType === 'normal' },
      { 'cue-all': cueType === 'all' },
      { 'cue-only-error': cueType === 'only-error' },
      { 'cue-only-error-hover': cueType === 'only-error-hover' },
    ]"
    ref="ns-muster-item"
    :size="itemSize"
    :prop="!arrContainObj(noValidateList, itemType) ? prop : null"
    :label="labelValueShow"
    :label-width="labelWidthConvert"
    :required="!arrContainObj(noValidateList, itemType) ? required : false"
    :error="error"
    :show-message="showMessage"
    :inline-message="false"
    :rules="!arrContainObj(noValidateList, itemType) ? rule : null"
    :style="{ width: items_width, height: items_height, 'line-height': items_lineHeight }"
  >
    <!-- *** ================================================================================= *** -->
    <!-- normal - auto form components 常规表单控件 -->
    <!-- *** ================================================================================= *** -->
    <!--1、input-->
    <ns-input
      v-if="itemType === 'input'"
      v-model="childItem"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :suffix-icon="icon"
      :rows="rows"
      :size="size"
      :minlength="parameConver('min', min)"
      :maxlength="parameConver('max', max)"
      :autofocus="autofocus"
      :readonly="readonly"
      :width="width"
      :height="height"
      :clearable="parameConver('clearable', clearable)"
      @change="change"
      @blur="blur"
    ></ns-input>
    <!--2、checkbox-->
    <ns-checkbox
      v-if="itemType === 'checkbox'"
      v-model="childItem"
      :type="type"
      :options="items"
      :min="parameConver('min', min)"
      :max="parameConver('max', max)"
      :size="size"
      :fill="fill"
      :text-color="textColor"
      :dynamic="dynamic"
      :width="width"
      :height="height"
    ></ns-checkbox>
    <!--3、select-->
    <ns-select
      v-if="itemTypeDistribute === 'select'"
      v-model="childItem"
      :items="items"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="parameConver('clearable', clearable)"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :filterable="filterable"
      :allow-create="allowCreate"
      :remote="remote"
      :remoteData="remoteData"
      :custom="custom"
      :size="size"
      :width="width"
      :height="height"
      :isDynamic="isDynamic"
      :dynamicUrl="dynamicUrl"
      :dynamicQuery="dynamicQuery"
      @change="change"
      @visible-change="visibleChange"
    >
    </ns-select>
    <!--4、select-remote（ 远程搜索 ）-->
    <ns-select-remote
      v-if="itemTypeDistribute === 'select-remote'"
      v-model="childItem"
      :type="bizType"
      :options="items"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="parameConver('clearable', clearable)"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :filterable="true"
      :allow-create="allowCreate"
      :remote="true"
      :custom="custom"
      :size="size"
      :width="width"
      :height="height"
      :dynamicUrl="dynamicUrl"
      :dynamicQuery="dynamicQuery"
      @change="change"
      @visible-change="visibleChange"
    >
    </ns-select-remote>
    <!--5、radio-->
    <ns-radio
      v-if="itemType === 'radio'"
      v-model="childItem"
      :type="type"
      :options="items"
      :disabled="disabled"
      :dynamic="dynamic"
      :size="size"
      :width="width"
      :height="height"
      @change="change"
    >
    </ns-radio>
    <!--6、switch-->
    <ns-switch
      v-if="itemType === 'switch'"
      v-model="childItem"
      :disabled="disabled"
      :active-text="onText"
      :inactive-text="offText"
      :active-color="onColor"
      :inactive-color="offColor"
      :active-icon-class="onIconClass"
      :inactive-icon-class="offIconClass"
      :active-value="onValue"
      :inactive-value="offValue"
      :switchWidth="switchWidth"
      :width="width"
      :height="height"
      @change="change"
    >
    </ns-switch>
    <!--7、slider - 非范围选择-->
    <ns-slider
      v-if="itemType === 'slider'"
      v-model="childItem"
      :disabled="disabled"
      :show-tooltip="showTooltip"
      :format-tooltip="formatTooltip"
      :show-stops="showStops"
      :show-input="showInput"
      :step="step"
      :range="false"
      :min="parameConver('min', min)"
      :max="parameConver('max', max)"
      :vertical="vertical"
      :width="width"
      :height="height"
    >
    </ns-slider>
    <!--8、slider - 范围选择-->
    <ns-slider
      v-if="itemType === 'slider-range'"
      v-model="childItem"
      :disabled="disabled"
      :show-tooltip="showTooltip"
      :format-tooltip="formatTooltip"
      :show-stops="showStops"
      :show-input="showInput"
      :step="step"
      :range="true"
      :min="parameConver('min', min)"
      :max="parameConver('max', max)"
      :vertical="vertical"
      :width="width"
      :height="height"
    >
    </ns-slider>
    <!--9、date-picker-->
    <ns-date-picker
      v-if="itemType === 'datepicker'"
      v-model="childItem"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :align="align"
      :clearable="parameConver('clearable', clearable)"
      :editable="editable"
      :placeholder="placeholder"
      :format="format"
      :value-format="valueFormat"
      :popper-class="popperClass"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :size="size"
      :width="width"
      :height="height"
    >
    </ns-date-picker>
    <!--10、time-picker-->
    <ns-time-picker
      v-if="itemType === 'timepicker'"
      v-model="childItem"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :clearable="parameConver('clearable', clearable)"
      :align="align"
      :popperClass="popperClass"
      :is-range="range"
      :format="format"
      :value-format="valueFormat"
      :size="size"
      :width="width"
      :height="height"
    >
    </ns-time-picker>
    <!--11、cascader-->
    <ns-cascader
      v-if="itemType === 'cascader'"
      v-model="childItem"
      :type="type"
      :options="items"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="parameConver('clearable', clearable)"
      :expand-trigger="expandTrigger"
      :filterable="filterable"
      :show-all-levels="showAllLevels"
      :change-on-select="changeOnSelect"
      :size="size"
      :width="width"
      :height="height"
      :dynamicUrl="dynamicUrl"
      :dynamicQuery="dynamicQuery"
    >
    </ns-cascader>
    <!--12、base-table - ( 基础表格 )-->
    <ns-base-table
      v-if="itemType === 'baseTable'"
      v-model="childItem"
      :tableHead="tableHead"
      :tableItems="tableItems"
      showIndex
    ></ns-base-table>

    <!--13、separator （分割线/划分线/下拉展开线）-->
    <ns-separator
      v-if="itemType === 'separator'"
      :type="type"
      :on-off="onOff"
      :label="label"
      :width="width"
      :height="height"
      :icon="icon"
      :disabled="disabled"
      @click="click"
    ></ns-separator>

    <!--14、text -（ 普通文字/文字链接 表单控件 ）-->
    <ns-text
      v-if="itemType === 'text'"
      :type="type"
      :content="childItem"
      :width="width"
      :height="height"
      :rows="rows"
      :dynamicSrc="dynamicSrc"
      :gap="10"
      :secondModelKey="secondModelKey"
      :title="childItem"
      @click="click"
    ></ns-text>

    <!--15、avatar -（图片/头像 表单控件）-->
    <ns-avatar
      v-if="itemType === 'avatar'"
      :type="type"
      :dynamicSrc="dynamicSrc"
      :width="width"
      :height="height"
    ></ns-avatar>

    <!--16、Upload - 上传控件-->
    <ns-upload
      v-if="itemType === 'upload'"
      v-model="childItem"
      :type="type"
      :width="width"
      :height="height"
      :disabled="disabled"
      :action="dynamicUrl"
      :headers="requestHeader"
      :dynamicQuery="dynamicQuery"
    >
    </ns-upload>
    <!--17、select - 区域联动-->
    <ns-area-linkage
      v-if="itemTypeDistribute === 'area-linkage'"
      v-model="childItem"
      :options="initItems"
      :type="type"
      :width="width"
      :height="height"
      :dynamicUrl="dynamicUrl"
      :dynamicQuery="dynamicQuery"
      @change="change"
      @visible-change="visibleChange"
    >
    </ns-area-linkage>
    <!--18、button 按钮-->
    <ns-autoForm-button
      v-if="itemType === 'button'"
      :btnLabel="childItem"
      :type="type"
      :size="size"
      :width="width"
      :height="height"
      :disabled="disabled"
      :icon="icon"
      @click="click"
    >
    </ns-autoForm-button>

    <!-- *** ================================================================================= *** -->
    <!--business - auto form components 业务相关的表单控件-->
    <!-- *** ================================================================================= *** -->

    <!--role-group （ 角色组操作组件 ）-->
    <ns-role-group
      v-if="itemTypeDistribute === 'role-group'"
      v-model="childItem"
      :options="items"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :width="width"
      :height="height"
      :clearable="parameConver('clearable', clearable)"
      :filterable="filterable"
      :dynamicUrl="dynamicUrl"
      :dynamicQuery="dynamicQuery"
      @change="change"
      @visible-change="visibleChange"
    >
    </ns-role-group>
    <!--role-employee （ 员工角色权限 ）-->
    <ns-role-employee
      v-if="itemTypeDistribute === 'role-employee'"
      v-model="childItem"
      :options="items"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="parameConver('clearable', clearable)"
      :multiple="true"
      :multiple-limit="0"
      :allow-create="allowCreate"
      :width="width"
      :height="height"
      @change="change"
      :dynamicUrl="dynamicUrl"
      :dynamicQuery="dynamicQuery"
      @visible-change="visibleChange"
    >
    </ns-role-employee>

    <!--checkbox - get user role func-button （获取当前用户的功能菜单按钮） -->
    <ns-role-fn-btn
      v-if="itemType === 'checkbox' && type === 'roleFnBtn'"
      v-model="childItem"
      :bizType="bizType"
      :size="size"
      :min="parameConver('min', min)"
      :max="parameConver('max', max)"
      :width="width"
      :height="height"
      :disabled="disabled"
    ></ns-role-fn-btn>

    <!--transfer （ 获取某个组织下的所有员工（授权人）列表 ） -->
    <ns-transfer-authorizer
      v-if="itemType === 'transfer' && type === 'authorizer'"
      v-model="childItem"
      :width="width"
      :height="height"
      :disabled="disabled"
      :dynamicUrl="dynamicUrl"
      :dynamicQuery="dynamicQuery"
    >
    </ns-transfer-authorizer>

    <!--simple tree in select （ 请选择所属部门树状数据 /  ） -->
    <ns-checkbox-tree-select
      v-if="itemTypeDistribute === 'checkbox-tree-select'"
      v-model="childItem"
      :bizType="bizType"
      :width="width"
      :height="multiple ? 'auto' : height"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :multiple="multiple"
      :clearable="parameConver('clearable', clearable)"
    >
    </ns-checkbox-tree-select>

    <!--客户/企业选择 - 信息联动 （ 远程搜索 ）-->
    <ns-customer-info-linkage
      v-if="itemTypeDistribute === 'customer-info-linkage'"
      v-model="childItem"
      :required="required"
      :type="bizType"
      :options="items"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="parameConver('clearable', clearable)"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :filterable="true"
      :remote="true"
      :custom="custom"
      size="small"
      :width="width"
      :height="height"
      :labelWidth="infoLabelWidth"
      :dynamicUrl="dynamicUrl"
      @change="change"
      @visible-change="visibleChange"
    >
    </ns-customer-info-linkage>
    <!--客户/企业选择 - 单个 - 信息不联动（ 远程搜索 ）-->
    <ns-customer-info-single
      v-if="itemTypeDistribute === 'customer-info-single'"
      v-model="childItem"
      :type="bizType"
      :options="items"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="parameConver('clearable', clearable)"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :filterable="true"
      :allow-create="allowCreate"
      :remote="true"
      :custom="custom"
      :size="size"
      :width="width"
      :height="height"
      :dynamicUrl="dynamicUrl"
      :dynamicQuery="dynamicQuery"
      @change="change"
      @visible-change="visibleChange"
    >
    </ns-customer-info-single>
    <!--时间频率选择，定位到时间点 （年/月/周/日）-->
    <ns-time-interval
      v-if="itemTypeDistribute === 'time-interval'"
      v-model="childItem"
      :type="bizType"
      :width="width"
      :height="height"
    >
    </ns-time-interval>

    <cx-manage-range
      v-if="itemTypeDistribute === 'manage-range'"
      v-model="childItem"
      :width="width"
      :height="height"
    >
    </cx-manage-range>
  </el-form-item>
</template>
<script>
import * as store from '../../../../../utils/nsQuery/nsStore';
import ns from '../../../../../utils/nsQuery/nsQuery';
import { distributor } from '../../../../../utils/validate/index';
import { config } from './config';

export default {
  name: 'form-item',
  data() {
    return {
      childItem: '',
      rule: null,
      defaultLabelWidth: '150px', //default label-width
      blurList: config.blurList, //trigger-blur list （ form-component ）
      blurAndChangeList: config.blurAndChangeList,
      noValidateList: config.noValidateList, //no-rules list （ form-component ）

      mockBlockList: config.mockBlockList,
      noHeightList: config.noHeightList, //no-height list （ form-component ）
      noLineHeightList: config.noLineHeightList, //no-line-height list （ form-component ）
      noLabelList: config.noLabelList, //no-label list （ form-component ）

      typeDistribution: config.typeDistribution,

      imgUpload: [],
    };
  },
  created() {
    //报错需要修改的部分==============================================
    //      console.log('=============')
    //      console.log('表单label名称：', this.labelValueShow);
    //      console.log('一级类型：', this.itemType);
    //      console.log('二级类型：', this.type);
    //      if (this.itemType === 'input') {
    //        if (this.type === 'normal') {
    //          console.error('当前表单的二级类型值错误，如果一级标签为 input 输入框，二级类型请改为 "text" ');
    //        }
    //      }
    //======================================================================

    this.childItem = this.fatherItem;
    //set rule for this form-item component
    this.rule = this.roleDistributor();
  },
  mounted() {},
  computed: {
    //in ths components , props-items-width/height have default val, so you don't judge it'area-linkage value is existed or not any more.
    items_width() {
      //in freedom status, el-form-item / ns-muster-item'width is freedom, no longer bound by colmax-width.
      return !this.freedom ? this.autoForm.convertUnits(this.itemWidth, 'width') : 'auto';
    },
    //judge is mockdata-block components or not
    isMockBlock() {
      return this.mockBlockList.some((item, index) => {
        return (
          item.firstType === this.itemType &&
          (item.secondType === this.type || !item.secondType) &&
          (item.thirdType === this.bizType || !item.thirdType)
        );
      });
    },
    //calculating the height value of the current component
    items_height() {
      /*1、 try to conver props height to our desired format*/
      const converHeight = this.autoForm.convertUnits(this.itemHeight, 'height');
      /* 2、 according to the form item-type and height whitch has convered （first step），
        return corresponding height */
      const isNoH = this.noHeightList.some((item, index) => {
        return (
          item.firstType === this.itemType &&
          (item.secondType === this.type || !item.secondType) &&
          (item.thirdType === this.bizType || !item.thirdType)
        );
      });
      return isNoH ? null : converHeight;
    },
    //calculating the line-height value of the current component
    items_lineHeight() {
      /*1、 try to conver props line-height to our desired format ( conver props height to our desired format )*/
      const converLineHeight = this.autoForm.convertUnits(this.itemHeight, 'height', 'auto');
      /* 2、 according to the form item-type and line-height whitch has convered （first step），
        return corresponding height */
      const isNoLh = this.noHeightList.some((item, index) => {
        return (
          item.firstType === this.itemType &&
          (item.secondType === this.type || !item.secondType) &&
          (item.thirdType === this.bizType || !item.thirdType)
        );
      });
      return isNoLh ? null : converLineHeight;
    },
    //label-width convert to expected value
    labelWidthConvert() {
      const units = 'px';
      /*
        string? => this value
        number => this value + 'px'
        help(null,undefined,boolean...) => default Label-Width (100 / 150)
        */
      return ns.base.isXType('string', this.labelWidth)
        ? this.labelWidth
        : ns.base.isXType('number', this.labelWidth)
        ? this.labelWidth + units
        : this.defaultLabelWidth;
    },
    /**
       * label-value convert and to display
       * Explain：
       *----------------------------------------------
       1、the component for auto-form which is not has label value :  => null
       2、the component for auto-form which is has label value :
       (2-1) has label value  => label
       (2-2) not has label value  =>
       (2-2-1) without width or width of 0 (no occupancy)  => null
       (2-2-2) has width (occupying)  => ' '
       * ----------------------------------------------
       * @returns {null}
       */
    labelValueShow() {
      return this.arrContainObj(this.noLabelList, this.itemType)
        ? null
        : this.label
        ? this.label
        : !this.labelWidth || this.labelWidth === 0
        ? null
        : ' ';
    },

    /*
         set isValidating status
         1、judge item-type is out of 'noValidateList'? some of items is not required ,so we have't to add class 'validating' to it.
         2、judge props of 'required' and 'rules' to find this items'area-linkage config
         3、judge this item is in validating status or not （if it changed or blur，push it'area-linkage ID to checkList in Vuex），
            we can judge checkList is contain this id or not（validate-form-item'area-linkage ID in this checkList）
          只有特定的表单控件才会在失焦/改变等事件的作用下，激活验证状态（想校验列表中增加其自己的唯一ID值），凡是处在验证激活状态下的表单控件，才会
          作用特定的验证提示（如：正确错误同时作用）
       */
    isValidating() {
      const checkList = this.$store.state.Form.check.checkList; //check list
      const checkKey = this.itemId; //check-key for form part in check list
      if (this.arrContainObj(this.noValidateList, this.itemType)) {
        return false;
      } else {
        if (this.required || this.rules) {
          return (
            ns.base.arrContainObj(checkList, checkKey) ||
            ns.base.arrContainObj(checkList, 'all-check')
          );
        } else {
          return false;
        }
      }
    },
    /**
     * the type of item-components to distribute
     * base on data of typeDistribution you can configure it
     */
    itemTypeDistribute() {
      function _changeName(name) {
        return name && name !== 0 ? name : 'normal';
      }

      const len = this.typeDistribution.length;
      for (let i = 0; i < len; i++) {
        if (this.typeDistribution[i].firstType === _changeName(this.itemType)) {
          if (this.typeDistribution[i].sexondType === _changeName(this.type)) {
            return this.typeDistribution[i].transform;
          }
        }
      }
    },
    // requestHeader添加userAccount
    requestHeader() {
      let requestHeader = store.requestHead.get();
      requestHeader.userAccount = window.name;
      return requestHeader;
    },
  },
  methods: {
    /**
     * role distributor
     * @returns {*}
     */
    roleDistributor() {
      if (!this.rules && !this.required) return null; //not set content validation rules and not set required status

      /**
       * base blurList and blurAndChangeList to judge which trigger we want
       * @param type
       * @returns {*}
       * @private
       */
      let _T = type => {
        if (this.arrContainObj(this.blurList, type)) {
          return 'blur';
        } else if (this.arrContainObj(this.blurAndChangeList, type)) {
          return ['blur', 'change'];
        } else {
          return 'change'; //help is change trigger
        }
      };
      return distributor(
        this.required,
        this.rules,
        this.rulesType,
        _T(this.itemType),
        this.requireMsg
      );
    },
    /**
     * parame to conver
     * @param type      parame type
     * @param parame
     * @returns {*}
     */
    parameConver(type, parame) {
      if (ns.base.judgeType(parame) === 'string') {
        const map = {
          min: parseInt(parame),
          max: parseInt(parame),
          clearable: eval(parame.toLowerCase()),
        };
        return map[type];
      } else {
        return parame;
      }
    },

    onPreview(file, fileList) {
      console.log(file, fileList);
    },
    onRemove(file) {
      console.log(file);
    },

    //change - function
    change(value) {
      this.$store.dispatch('setCustomCheck', this.itemId);
      this.$emit('change', value);
    },
    //blur - function
    blur(value) {
      this.$store.dispatch('setCustomCheck', this.itemId);
      this.$emit('blur', value);
    },
    //click - function
    click(value) {
      this.$emit('click', value);
    },
    //visible-change - function （ 点击下拉菜单 ）
    visibleChange() {
      this.$emit('visible-change');
    },
    //judge array contain another Obj
    arrContainObj(arr, val) {
      return ns.base.arrContainObj(arr, val);
    },
    //judge string contain another string in definite place
    strContainPlace(str, substr, place) {
      return ns.base.strContainPlace(str, substr, place);
    },
  },
  model: {
    prop: 'fatherItem',
    event: 'change',
  },
  watch: {
    //model value binding child to father or father to child.
    childItem: {
      handler: function(val) {
        this.$emit('change', val);
      },
      deep: true,
    },
    fatherItem: {
      handler: function(val) {
        this.childItem = val;
      },
      deep: true,
    },
  },
  props: {
    //身份标识
    itemId: { type: String },
    //form-item-size ( 用于控制该表单域下组件的尺寸: medium / small / mini )
    itemSize: { type: String, default: 'small' },
    /*
       cueType - 表单验证提示展现类型
       1、normal:（常规，参照element-ui）
       2、all:（包含错误错误和正确的展现)
       3、only-error:（只有错误的展现）
       4、only-error-hover:（只有错误的展现，且鼠标移入展现错误提示)
     */
    cueType: { type: String, default: 'normal' },
    showMessage: { type: Boolean },
    modelKey: { type: String },
    //字段
    fatherItem: [Array, String, Number, Object, Boolean, Date], //v-model
    secondModelKey: { type: String }, //二级表单model字段名称
    //类型
    itemType: { type: String, default: 'string' }, //item 内的 表单元素种类 ( 一级分类 )
    type: { type: String, default: 'normal' }, //该表单控件类型 ( 二级分类 )
    bizType: { type: String, default: 'normal' }, //控件-业务 ( 三级分类 )

    //尺寸
    itemWidth: { type: [Number, String], default: '100%' }, //表单items 宽度
    itemHeight: { type: [Number, String], default: '32px' }, //表单items 高度  （高度不能为百分数）
    width: { type: [String, Number] }, //表单控件宽度
    height: { type: [String, Number] }, //表单控件高度
    labelWidth: { type: [Number, String] }, //单个表单域标签的的宽度，在外层封装 写死！
    infoLabelWidth: { type: [Number, String] }, //全局设置的表单域标签的的宽度
    freedom: { type: Boolean, default: false }, //el-form-item / ns-muster-item 自由宽度开关 （ 其宽度有实际子内容宽度决定，不再由基础最大宽度控制 ），浮动依次排列
    label: { type: String }, //标签文本
    scale: { type: [Number, String] }, //表单元素（图片/上传控件图片），宽度高度比例（ 宽度 / 高度 ）

    //表单控件内容（ checkbox/radio/select/cascader... ）
    items: { type: Array }, //表单控件内容部分（array格式）（checkbox，radio......）
    initItems: { type: Object }, //表单控件内容部分（object格式) - (省市区专用）

    //编辑 / 操作
    placeholder: { type: String }, //输入框占位文本
    disabled: { type: Boolean }, //禁用
    readonly: { type: Boolean }, //只读
    clearable: { type: [Boolean, String] }, //是否支持清空选项
    editable: { type: Boolean, default: true }, //文本框可输入
    multiple: { type: Boolean }, //是否多选

    //验证
    required: { type: Boolean, default: false }, //是否必填 required，如不设置，则会根据校验规则自动生成
    requireMsg: { type: String, default: null }, //只有在rules 为 required 的时候，可以定义出错信息，默认为null
    rules: { type: [String, Object, Array], default: null }, //内容验证规则
    rulesType: { type: String, default: null }, //验证字段的内容类型
    prop: { type: String }, //表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的

    //辅助属性
    min: { type: [Number, String] }, //最小可选择值
    max: { type: [Number, String] }, //最大可选择值
    step: { type: Number }, //步长
    rows: { type: Number }, //行数
    icon: { type: String }, //图标

    //请求交互
    isDynamic: { type: Boolean },
    dynamicUrl: { type: String }, //前后台交互 请求地址
    dynamicQuery: { type: [Object, String, Array, Number, Boolean], default: null }, //前后台交互 请求参数

    //时间格式格式属性
    format: { type: String }, //显示在输入框中的格式
    valueFormat: { type: String }, //时间日期绑定值格式，不指定则绑定Data对象

    //table-head
    tableHead: { type: [Object, Array, String] },
    //table-components-items ( the components whitch need load items )
    tableItems: { type: [Object, Array] },
    //separator
    onOff: { type: [Object, Boolean], default: false }, //分割线 组件 的开关

    /*=========== JEPF 没有该字段，默认配置，无需暴露 ============*/

    error: { type: String }, //表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息
    range: { type: Boolean }, //slide 是否为范围选择(需要分情况书写)
    allowCreate: { type: Boolean }, //是否允许用户创建新条目，需配合 filterable 使用
    changeOnSelect: { type: Boolean, default: true }, //选择即改变，可选择任意一级菜单的选项。
    'show-message': { type: Boolean, default: true }, //是否显示校验错误信息   写死！
    size: { type: String }, //尺寸
    filterable: { type: Boolean }, //可搜索  默认开启
    switchWidth: { type: Number }, //switch
    //input 特殊属性
    autofocus: { type: Boolean, default: false }, //是否自动聚焦，注意，若存在多个具有该属性的表单控件，则只作用于第一个特定的表单元素（input）
    //checkbox 特殊属性
    fill: { type: String }, //背景颜色
    textColor: { type: String }, //字体颜色
    dynamic: { type: Object, default: null }, //动态获取 Checkbox - lable/value
    //select 特殊属性
    multipleLimit: { type: Number }, //多选时用户最多可以选择的项目数，为 0 则不限制
    remote: { type: Boolean, default: false }, //是否为远程搜索
    remoteData: { type: Array }, //远程搜索的 数据
    custom: { type: Boolean, default: false }, //自定义 下拉内容
    //switch 特殊属性
    onValue: { type: [Boolean, String, Number], default: true }, //switch 打开时的值        //默认
    offValue: { type: [Boolean, String, Number], default: false }, //switch 关闭时的值       //默认
    onText: { type: String, default: 'ON' }, //switch 打开时的文字         //默认
    offText: { type: String, default: 'OFF' }, //switch 关闭时的文字        //默认
    onColor: { type: String }, //switch 打开时的背景色     //默认
    offColor: { type: String }, //switch 关闭时的背景色    //默认
    onIconClass: { type: String, default: null }, //switch 打开时所显示图标的类名，设置此项会忽略 on-text    //默认
    offIconClass: { type: String }, //switch 关闭时所显示图标的类名，设置此项会忽略 off-text                  //默认
    //slider 特殊属性
    showTooltip: { type: Boolean, default: true }, //是否显示 tooltip
    formatTooltip: { type: Function }, //自定义 tooltip message
    showStops: { type: Boolean, default: false }, //是否显示间断点
    showInput: { type: Boolean, default: false }, //是否显示输入框，仅在非范围选择时有效
    vertical: { type: Boolean, default: false }, //是否竖向模式

    align: { type: String, default: 'left' }, //对齐方式
    popperClass: { type: String, default: null }, //DateTimePicker 下拉框的类名
    pickerOptions: { type: Object }, //当前时间日期选择器特有的选项参考下表
    rangeSeparator: { type: String, default: '~' }, //选择范围时的分隔符
    //cascader 特殊属性
    expandTrigger: { type: String, default: 'click' }, //触发方式
    showAllLevels: { type: Boolean, default: true }, //输入框中是否显示选中值的完整路径
    //Upload
    dynamicSrc: { type: String }, //必选参数, 上传的地址
    fileList: { type: Array }, //上传的文件列表
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import '../../../../../style/Modular/Form-style/validateStyle/validateStyle-judgment';
@import '../../../../../style/Modular/Form-style/Main/form-item';
</style>
