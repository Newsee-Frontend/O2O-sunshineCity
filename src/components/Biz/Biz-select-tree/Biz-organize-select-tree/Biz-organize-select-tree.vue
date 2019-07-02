<template>
  <ns-select-tree
    :size="size"
    appendToBody
    v-model="selectModel"
    :options="options"
    @input="emitInput"
  ></ns-select-tree>
</template>
<script>
  export default {
    name: 'biz-organize-select-tree',

    props: {
      size: String
    },

    data(){
      return{
        selectModel: this.value,
        options: null
      }
    },

    watch: {
      value(val){
        this.selectModel = val;
      }
    },

    methods: {
      emitInput: function(){
        this.$emit('input', this.selectModel);
      }
    }
  }

</script>
