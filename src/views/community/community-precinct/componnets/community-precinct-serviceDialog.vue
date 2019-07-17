<template>
    <ns-dialog
      :visible.sync="showDialog"
      @close="close"
      title="服务电话">
      <div class="service-phone-list">
        <div class="service-phone-item" v-for=" item in phoneList">
          <ns-input v-model="item.name" :disabled="item.disabled" placeholder="请输入服务电话名称"></ns-input>
          <ns-input v-model="item.phone" :disabled="item.disabled" placeholder="请输入服务电话"></ns-input>
          <i class="el-icon-edit" style="color: #409EFF" v-show="item.disabled" @click="changeEditStatus(item)"> </i>
          <i class="el-icon-check" style="color: #67C23A" v-show="!item.disabled"></i>
          <i class="el-icon-delete" style="color: #F56C6C" v-show="item.id"></i>
        </div>
      </div>
    </ns-dialog>
</template>

<script>
  import {getPhoneList, saveServicePhoneList, delServicePhone} from '../../../../service/Community/villageSetting'
  export default {
    name: 'servicePhoneDialog',

    props: {
      rowData: Object,
      visible: {
        type: Boolean,
        default: false
      }
    },

    data(){
      return {
        showDialog: false,

        phoneList: []
      }
    },

    watch: {
      visible(val){
        this.showDialog = val;
        if(val){
          this.getPhoneList();
        }
      }
    },

    methods: {
      /**
       * 获取电话列表
       */
      getPhoneList(){
        getPhoneList().then((data)=>{
          this.packagePhoneList(data.resultData);
        })
      },
      /**
       * 删除电话
       */
      delServicePhone(){
        delServicePhone().then((data)=>{
          this.packagePhoneList(data.resultData);
        })
      },
      /**
       * 保存电话列表
       */
      saveServicePhoneList(){
        saveServicePhoneList().then((data)=>{
          this.packagePhoneList(data.resultData);
        })
      },


      packagePhoneList(list){
        this.phoneList = list.concat([{name: '', phone: ''}]);

        //增加是否可编辑
        this.phoneList.forEach((item) => {
          this.$set(item, 'disabled', !!item.name);
        })
      },

      /**
       * 改变编辑状态
       */
      changeEditStatus(item){
        item.disabled = false;
      },


      close(){
        this.showDialog = false;
        this.$emit('update:visible', this.showDialog);
      }


    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
.service-phone-item {
  margin-bottom: 18px;
  i{
    margin: 0 5px;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
