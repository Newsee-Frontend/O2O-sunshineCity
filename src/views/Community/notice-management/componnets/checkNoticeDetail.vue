<template>
  <ns-dialog
    title="公告详情"
    :visible.sync="showDialog"
    @close="close"
  >
   <div class="notice-container">
     <div v-html="model.content"></div>
   </div>
    <span slot="footer" class="dialog-footer">
        <ns-button size="small" @click="showDialog = false">关 闭</ns-button>
      </span>
  </ns-dialog>
</template>

<script>
  import { getNotice } from '../../../../service/Channel/noticeManagement.js'


  export default {
    name: 'checkNoticeDetail',

    data(){
      return{
        showDialog: false,
        model: {
          content: ''
        }
      }
    },

    props: {
      visible: Boolean,
      rowData: Object
    },

    watch: {
      visible(val){
        this.showDialog = val;
        if(val){
          this.getNoticeInfo()
        }
      }
    },

    methods: {
      close(){
        this.showDialog = false;
        this.$emit('update:visible',  this.showDialog);
      },

      /**
       * 获取公告基础信息
       */
      getNoticeInfo(){
        getNotice({id:  this.rowData.id}).then((data)=>{
          this.model = data.resultData;
        })
      },
    }
  };
</script>
