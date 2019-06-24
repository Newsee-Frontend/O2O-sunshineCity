<template>
    <ns-dialog
      :title="type === 'add'? '新增公告': '编辑公告'"
      @close="close"
      size="large"
      :visible.sync="showDialog"
    >
      <ns-form ref="noticeForm" :model="model" :rules="rules" label-width="140px">
        <biz-precinct :precinctModel="model"></biz-precinct>

        <ns-form-item label="公告标题" prop="title">
          <ns-input v-model="model.title"></ns-input>
        </ns-form-item>

        <ns-form-item label="附件" prop="fileList">
          <ns-upload
            v-model="model.fileList"
            :width="200"
            :height="200"
            action="/property-service/common/uploadFile"
          >
          </ns-upload>
        </ns-form-item>

        <ns-form-item label="公告内容" prop="content">
          <ns-editor :height="200" v-model="model.content" v-if="showDialog"/>
        </ns-form-item>
      </ns-form>

      <span slot="footer" class="dialog-footer">
        <ns-button @click="showDialog = false" size="small">取 消</ns-button>
        <ns-button type="primary" @click="submit" size="small" :loading="submitLoading">确 定</ns-button>
      </span>
    </ns-dialog>
</template>

<script>
  import bizPrecinct from '../../../../components/biz/biz-form/biz-precinct'
  import { saveNotice, getNotice } from '../../../../service/Channel/noticeManagement.js'
  export default {
    name: 'notice-dialog',

    components: {
      bizPrecinct,
    },

    data(){
      return {
        showDialog: false,
        submitLoading: false,
        provinces: [],
        cities: [],
        precincts: [],
        noticeTypeOptions: [],
        model: {
          title: '',
          precinctIdList: [],
          provinceId: '',
          cityId: '',
          fileList: [],
          noticeCategory: '',
          category: "1",
          content: ''
        },
        rules: {
          precinctIdList:  [{ required: true, trigger: 'change',message: '请选择范围'}],
          provinceId: [{ required: true, trigger: 'change',message: '请选择省'}],
          cityId: [{ required: true, trigger: 'change',message: '请选择市'}],
          // fileList: [{ required: true, trigger: 'change',message: '请选择附件'}],
          title: [{ required: true, trigger: 'change',message: '请输入公告标题'}],
        }
      }
    },

    props: {
      type: String,
      rowData: Object,  //编辑的时候
      visible: Boolean
    },

    watch: {
      visible(val){
        this.showDialog = val;
        if(val && this.type === 'edit'){
          this.model.id =  this.rowData.id;
          this.getNoticeInfo()
        }else{
          this.model.id = '';
        }
      }
    },

    methods: {
      close(){
        this.$refs.noticeForm.resetFields();
        this.showDialog = false;
        this.$emit('update:visible', this.showDialog)
      },

      /**
       * 获取公告基础信息
       */
      getNoticeInfo(){
        getNotice({id:  this.model.id}).then((data)=>{
          this.model = data.resultData;
        })
      },


      /**
       *  提交
       */
      submit: function(){
        this.$refs.noticeForm.validate((valid)=>{
          if(valid){
            this.submitLoading = true;
            saveNotice(this.model).then((data)=>{
              this.submitLoading = false;
              this.showDialog = false;
              this.$message.success('保存成功');
              this.$emit('reloadGrid')
            }, ()=>{
              this.$message.error('保存失败');
              this.submitLoading = false;
            })
          }
        })
      },
    }
  };
</script>

<style scoped>

</style>
