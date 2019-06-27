<template>
  <ns-slip-dialog
    :visible.sync="showSlipDialog"
    left="50px"
    right="0px"
    top="88px"
    bottom="0px"
    :appendToBody="false"
    animation="fade-normal"
    :beforeClose="beforeClose"
    ref="slipDialog">

    <div class="slip-title">{{title}}</div>
    <div class="slip-btns">
      <slot name="slip-btns"></slot>
      <ns-button @click="showSlipDialog = false">返    回</ns-button>
    </div>
    <div class="silp-container">
      <slot name="main"></slot>
    </div>
  </ns-slip-dialog>
</template>

<script>
  export default {
    name: 'biz-slip-dialog',


    props: {
      visible: Boolean,

      title: String
    },

    data(){
      return {
        showSlipDialog: false
      }
    },

    methods:{
      beforeClose(){
        this.$emit('update:visible', this.showSlipDialog);
        this.$emit('close');
      },
    },

    watch: {
      visible(val){
        this.showSlipDialog = val;
      }
    }
  };
</script>

<style>
  .slip-title {
    font-size: 16px;
    font-weight: bold;
    padding: 14px 0;
  }

  .silp-container{
    margin: 20px auto;
    width: 1000px;
  }

</style>
