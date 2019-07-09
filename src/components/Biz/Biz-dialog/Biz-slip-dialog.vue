<template>
  <ns-slip-dialog
    :visible.sync="showDialog"
    :left="position.left"
    :right="position.right"
    :top="position.top"
    :bottom="position.bottom"
    :appendToBody="false"
    animation="fade-normal"
    :beforeClose="close">

    <div class="slip-title">
      {{title}}
    </div>

    <div class="slip-btns">
      <slot name="btns"></slot>
    </div>

    <div class="silp-container">
      <slot name="main"></slot>
    </div>
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
      },

      title: {
        type: String
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
          left: this.isInIframe ? '0px': '50px',
          right: '0px',
          bottom: '0px',
          top: this.isInIframe ? '0px': '50px',
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


<style>
  .slip-title {
    font-size: 16px;
    font-weight: bold;
    padding: 14px 0;
  }

  .silp-container {
    margin: 20px auto;
    width: 1000px;
  }

</style>

