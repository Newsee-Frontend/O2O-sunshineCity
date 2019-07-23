<template>
  <el-select
    class="ns-select-remote"
    v-model="childSelect"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    :multiple-limit="multipleLimit"
    :size="size"
    :filterable="filterable"
    :filter-method="filterMethod"
    :remote="remote"
    :remote-method="remoteMethod"
    :allow-create="allowCreate"
    :loading="loading"
    :style="{ width: select_width, height: select_height }"
    @change="change"
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
      <span class="fl" v-if="custom"> {{ item.label }}</span>
      <span class="fr customtemplate" v-if="custom">{{ item.value }}</span>
    </el-option>
  </el-select>
</template>
<script>
  import { request, choiceRemoteMethod, customerInfo } from './remoteFunc';

export default {
  name: 'select-remote',
  data() {
    return {
      childSelect: '',
      options: [],
      loading: false,
      remoteSW: false,
      remoteList: [], //remote request data list
      sizeMap: { small: '90px', medium: '120px', normal: '200px', large: '400px', adapt: '100%' },
    };
  },
  computed: {
    select_width() {
      /*
         有 spec 属性则采用 spec 的值所对应的宽度作为宽度值， 否则采用 width 属性值。
         如果spec有值，请注意值是否正确（small，medium，normal，large），可以为 null。
        */
      if (this.spec) {
        return this.sizeMap[this.spec];
      }
      return this.autoForm.convertUnits(this.width, 'width');
    },
    select_height() {
      return this.autoForm.convertUnits(this.height, 'height');
    },
  },
  created() {
    this.childSelect = this.fatherSelect;
    this.judgeSelectType(); //judge select type and handle
  },
  methods: {
    //judge select type and handle
    judgeSelectType() {
      this.remoteSW = this.remote && this.filterable ? true : false; // is open remote switch （ 是否开启远程搜索 ）
      this.options = this.isInitItems ? this.items : []; //is init option （ 是否有初始数据 ）
    },
    /**
     * remote method（ 远程搜索方法 ）
     * @param query      input value
     */
    remoteMethod(query) {
      // is remote-switch opened，have dynamicUrl（ request url ）and have request query （input value ）
      if (this.remoteSW && this.dynamicUrl && query !== '') {
        //choice one remote-method to request data (base on business)
        choiceRemoteMethod(this, this.type, this.dynamicUrl, query);
      } else {
        this.options = this.items;
      }
    },
    /**
     * help change function
     * @param value        change value
     */
    changeFunc(value) {
      customerInfo.stroe(this.type, this.remoteList, value); //stroe customer-info
    },
    //chenge
    change(value) {
      this.changeFunc(value); //help change function
      this.$emit('change', value);
    },
  },
  props: {
    fatherSelect: [Array, String, Number],
    /*  =======================  获取下拉菜单内容  =======================  */
    //1、动态获取select-option下拉菜单内容
    dynamicUrl: { type: String, default: null },
    dynamicQuery: { type: [Object, String, Array], default: null },
    //2、静态获取select-option下拉菜单内容
    items: {
      type: Array,
      default: function() {
        return [];
      },
    },
    isInitItems: { type: Boolean, default: false }, //是否有下拉初始数据items（后续会有下拉触发事件，以改变items-data）
    /*  ==================================================================  */
    width: { type: [String, Number], default: '200px' },
    height: { type: [String, Number], default: '32px' },
    type: { type: String, default: 'custom' }, //远程搜索类型，custom-自定义（请求参数自定义）
    placeholder: { type: String, default: null },
    name: { type: String }, //原生 name 属性
    size: { type: String }, //尺寸
    spec: { type: String }, //宽度size尺寸值（small，medium，normal，large,adapt）
    disabled: { type: Boolean, default: false }, //是否禁用
    clearable: { type: Boolean, default: true }, //单选时是否可以清空选项
    multiple: { type: Boolean, default: false }, //是否多选
    multipleLimit: { type: Number, default: 0 }, //多选时用户最多可以选择的项目数，为 0 则不限制
    filterable: { type: Boolean, default: false }, //是否可搜索
    filterMethod: { type: Function, default: null }, //自定义过滤方法
    remote: { type: Boolean, default: false }, //是否为远程搜索
    allowCreate: { type: Boolean, default: false }, //是否允许用户创建新条目，需配合 filterable 使用
    custom: { type: Boolean, default: false }, //自定义 下拉内容
    //远程搜索的 数据
    remoteData: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  model: {
    prop: 'fatherSelect',
    event: 'change',
  },
  watch: {
    childSelect() {
      this.$emit('change', this.childSelect);
    },
    fatherSelect() {
      this.childSelect = this.fatherSelect;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.customtemplate {
  color: #8492a6;
  font-size: 13px;
}
</style>
