<template>
  <ns-slip-dialog
    :visible.sync="showDialog"
    left="50px"
    right="0px"
    top="50px"
    bottom="0px"
    :appendToBody="false"
    animation="fade-normal"
    :beforeClose="close">
    <slot></slot>
  </ns-slip-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Biz-slip-dialog',

    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },

    data(){
      return {
        showDialog:  this.visible
      }
    },

    watch: {
      visible(val){
        this.showDialog = val;
      }
    },

    computed: {
      ...mapGetters(['isInIframe']),

      position(){
        return {
          left: this.isInIframe ? '0px': '50px'
        }
      }
    },


    methods: {
      /**
       * 关闭
       */
      close(){
        this.showDialog = false;
        this.$emit('update:visible', false);
        this.$emit('close');
      }
    }
  };
</script>

