<template>
  <el-form-item
    class="ns-form-item"
    :prop="prop"
    :label="label"
    :label-width="labelWidth"
    :required="required"
    :error="error"
    :show-message="showMessage"
    :rules="rule"
    :size="size"
  >
    <slot></slot>
  </el-form-item>
</template>
<script>
import { distributor } from '../../../../../utils/validate/index';

export default {
  name: 'form-item',
  data() {
    return {
      rule: null,
    };
  },
  props: {
    prop: { type: String },
    label: { type: [Number, String] },
    'label-width': { type: String },
    required: { type: Boolean, default: false },
    rules: { type: [String, Object, Array], default: null },
    type: { type: String, default: 'string' },
    requireMsg: { type: String, default: null },
    trigger: { type: String, default: 'blur' },
    error: { type: String },
    'show-message': { type: Boolean, default: true },
    size: { type: String, default: 'small' },
  },
  created() {
    const ruleMode = this.rules;
    const d = distributor(ruleMode, this.type, this.trigger, this.requireMsg);
    if (typeof d === 'object' || typeof d === 'array') {
      this.rule = ruleMode ? d : null;
    }
  },
  methods: {},
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>
