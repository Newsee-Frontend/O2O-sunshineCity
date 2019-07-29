<template>
  <ns-dialog
    id="applyDialog"
    title="活动申请"
    :visible.sync="showDialog"
    @close="activityApplyClose"
  >
    <ns-form ref="applyForm" label-width="140px" :model="model">
      <ns-form-item label="流程类别"
                    prop="bsid"
                    :rules="[{ required: true, message: '请选择流程类别', trigger: 'blur' }]">
        <ns-radio :options="options" v-model="model.bsid"></ns-radio>
      </ns-form-item>

      <ns-form-item label="活动序号" ><span> {{ model.activityCode }}</span></ns-form-item>

      <ns-form-item label="发起时间" ><span> {{ model.applyTime }}</span></ns-form-item>

      <ns-form-item label="发起人" ><span> {{ model.applyUserName }}</span></ns-form-item>

      <ns-form-item label="发起部门" ><span>{{model.applyOrganName}}</span></ns-form-item>

      <ns-form-item label="相关附件"  prop="fileLists"  :rules="[{ required: true, message: '请输入相关附件', trigger: 'change' }]">
        <ns-upload
          v-model="model.fileLists"
          type="otherFileList"
          :headers="requestHead"
          action="http://192.168.1.20/api/o2o/activity/uploadFile"
          @change="itemChanged('fileList')"
        >
          <ns-button type="primary">点击上传附件</ns-button>
        </ns-upload>
      </ns-form-item>

      <ns-form-item label="发起说明" prop="applyDetail"  :rules="[{ required: true, message: '请填写发起说明', trigger: 'blur' }]">
        <ns-input size="medium" type="textarea" v-model="model.applyDetail" placeholder="请填写发起说明"></ns-input>
      </ns-form-item>
    </ns-form>

    <div slot="footer">
      <ns-button type="primary" @click="submit" :disabled="submitLoading">提交</ns-button>
      <ns-button @click="showDialog = false">关闭</ns-button>
    </div>
  </ns-dialog>
</template>

<script>
  import {approvalActivity} from '../../../../service/Community/activeManagement'
  import { mapGetters } from 'vuex';
  export default {
    name: 'community-active-applyDialog',

    props: {
      visible: Boolean,

      baseInfo: Object,

      submitModel: Object
    },

    data(){
      return {
        options: [{label: '物业活动', value: 'V10_ACTIVITY_STARTWY'},{label: '客关活动', value: 'V10_ACTIVITY_STARTKG'}],
        model: {
          bsid: '',
          fileLists: [],
          applyDetail: ''
        },
        showDialog: this.visible,
        submitLoading: false
      }
    },

    computed: {
      ...mapGetters(['requestHead']),

    },

    watch: {
      visible(val){
        this.showDialog = val;
        val && this.initForm();
      }
    },

    methods: {
      initForm(){
        this.model = Object.assign(this.model, this.submitModel,this.baseInfo);
        this.model.fileLists =  this.baseInfo.fileList.slice(0, this.baseInfo.fileList.length);
      },

      activityApplyClose: function(){
        this.showDialog = false;
        this.$emit('update:visible',  this.showDialog);
      },

      //附加校验
      itemChanged(str) {
        this.$refs.applyForm.clearValidate(str);
      },

      submit(){
        this.$refs.applyForm.validate((valid) =>{
          if(valid){
            this.submitLoading = true;
            approvalActivity(this.model).then((res)=>{
              this.$emit('submitApproval');
              this.submitLoading = false;
              window.open(res.resultData);
            },()=>{
              this.submitLoading = false;
            })
          }
        })
      }
    }
  };
</script>
