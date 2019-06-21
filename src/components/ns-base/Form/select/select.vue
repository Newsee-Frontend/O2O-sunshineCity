<template>
  <el-select
    :class="selectClass"
    v-model="childSelect"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    :multiple-limit="multipleLimit"
    :size="size"
    :collapse-tags="collapseTags"
    :filterable="filterable"
    :filter-method="filterMethod"
    :remote="remote"
    :remote-method="remoteMethod"
    :allow-create="allowCreate"
    :loading="loading"
    :style="{ width: select_width, height: select_height }"
    @change="change"
    @visible-change="visibleChange"
    @focus="onFocus"
    :placeholder="placeholder"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
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
import getDynamicOptions from '../utils/requestDictionary';

export default {
  name: 'ns-select',
  data() {
    return {
      childSelect: '',
      options: [],
      loading: false,
      sizeMap: { small: '90px', medium: '120px', normal: '200px', large: '400px', adapt: '100%' },
    };
  },
  created() {
    this.childSelect = this.fatherSelect;
    this.getSelectOptions(); //judge select type and handle
  },
  methods: {
    /**
     * judge checkbox type and handle
     * 注释：通过数据字典查找获取options，则初始为[],否则为外部属性item穿入值
     */
    getSelectOptions() {
      this.options = this.isDynamic ? [] : this.items;
    },

    /**
     * visible-Change （ 点击下拉菜单 ）
     */
    visibleChange() {
      if (!this.isDynamic) return false;
      //get dynamic options form dictionary
      getDynamicOptions(this, this.dynamicUrl, this.dynamicQuery, this.labelAsValue, this.modelType);
      this.$emit('visible-change');
    },
    /**
     * select change
     * @param value
     */
    change(value) {
      let item = this.dc(value);
      this.$emit('getItem', item);
      this.$emit('change', value);
    },
    onFocus() {
      this.$emit('focus');
    },
    /**
     * select change item
     * @param id
     */
    dc(id) {
      let value = {};
      this.options.map(item => {
        if (item.value === id) {
          return (value = item);
        }
      });
      return value;
    },
  },
  props: {
    fatherSelect: [Array, String, Number],
    /*  =======================  获取下拉菜单内容  =======================  */
    //1、动态获取select-option下拉菜单内容
    isDynamic: { type: Boolean, default: false }, //是否动态获取options - 通过数据字典查找
    dynamicUrl: { type: String, default: '/system/dictionary/list-dictionaryItem' }, //
    dynamicQuery: { type: [Object, String, Array], default: null }, //{'dictionaryGroupId':'','dictionaryitemDictionaryId':''}
    labelAsValue: { type: Boolean, default: false }, //value = label
    //2、静态获取select-option下拉菜单内容
    items: {
      type: Array,
      default: function() {
        return [];
      },
    },
    /*  ==================================================================  */
    width: { type: [String, Number], default: '200px' },
    height: { type: [String, Number], default: '32px' },
    placeholder: { type: String, default: null },
    name: { type: String },
    size: { type: String, default: 'small' },
    spec: { type: String }, //宽度size尺寸值（small，medium，normal，large, adapt）
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false },
    multipleLimit: { type: Number, default: 0 },
    collapseTags: { type: Boolean, default: false },
    filterable: { type: Boolean, default: false },
    filterMethod: { type: Function, default: null }, //自定义过滤方法
    remote: { type: Boolean, default: false }, //是否为远程搜索
    remoteMethod: { type: Function, default: null }, //远程搜索方法
    allowCreate: { type: Boolean, default: false }, //是否允许用户创建新条目，需配合 filterable 使用
    custom: { type: Boolean, default: false }, //自定义 下拉内容
    modelType: {type: String, default: 'id'}
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
    //select class name
    selectClass() {
      return 'ns-select ' + this.multiple ? ' ns-select-multiple' : '';
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
    items() {
      this.options = this.items;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.ns-select {
  .el-input__inner {
  }
  .customtemplate {
    color: #8492a6;
    font-size: 13px;
  }
}
</style>
