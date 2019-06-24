<template>
  <ns-dialog :title="type === 'add'? '新增活动': '编辑活动'"
             :visible.sync="showDialog"
             size="large"
             @close="close">
    <ns-form ref="activityForm" :model="model" :rules="rules" label-width="140px">
      <ns-row>
        <ns-col :span="12">
          <biz-precinct :precinctModel="model" ref="bizPrecinct"></biz-precinct>

          <ns-form-item label="活动类型" prop="type">
            <ns-select  :options="activityTypeOptions" v-model="model.type" placeholder="请选择活动类型"></ns-select>
          </ns-form-item>

          <ns-form-item label="活动名称" prop="title">
            <ns-input v-model="model.title" placeholder="请填写活动名称" clearable></ns-input>
          </ns-form-item>

          <ns-form-item label="是否可报名" prop="enableApply">
            <ns-switch
              :active-value=" enableApplyOptions.Y"
              :inactive-value="enableApplyOptions.N"
              @change="switchChange"
              v-model="model.enableApply"
            ></ns-switch>
          </ns-form-item>

          <ns-form-item label="最大报名人数" prop="activityLimitNum">
            <ns-input
              :disabled="model.enableApply === 0"
              v-model.number="model.activityLimitNum"
              placeholder="请输入报名人数"
            ></ns-input>
          </ns-form-item>

          <ns-form-item label="报名截止时间" prop="voteEndTime">
            <ns-date-picker
              v-model="model.voteEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择报名截止时间"
            ></ns-date-picker>
          </ns-form-item>

        </ns-col>
        <ns-col :span="12">

          <ns-form-item label="活动开始时间"  prop="activityStartTime">
            <ns-date-picker
              v-model="model.activityStartTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择活动开始时间"
            ></ns-date-picker>
          </ns-form-item>

          <ns-form-item label="活动结束时间"  prop="activityEndTime">
            <ns-date-picker
              v-model="model.activityEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择活动结束时间"
            ></ns-date-picker>
          </ns-form-item>

          <ns-form-item label=" 活动地点" prop="activitySpace">
            <ns-input v-model="model.activitySpace" placeholder="请填写活动地点"  clearable></ns-input>
          </ns-form-item>

          <ns-form-item label=" 主办方" prop="sponsor">
            <ns-input v-model="model.sponsor"  placeholder="请填写主办方"  clearable></ns-input>
          </ns-form-item>

          <ns-form-item label=" 列表缩略图"  prop="fileList">
            <ns-upload
              v-model="model.fileList"
              :width="200"
              :height="200"
              action="http://192.168.1.20:7777/o2o/activity/uploadFile"
            >
            </ns-upload>
          </ns-form-item>
        </ns-col>
      </ns-row>


      <ns-form-item label=" 活动内容:" prop="content">
        <ns-editor :height="200" v-model="model.content" ref="editor" v-if="showDialog"/>
      </ns-form-item>
    </ns-form>

    <span slot="footer" class="dialog-footer">
        <ns-button type="primary" @click="publish('publish')" size="small" :loading="submitLoadingBtn === 'publish'">发布</ns-button>
        <ns-button @click="publish('tempPublish')" size="small" :loading="submitLoadingBtn === 'tempPublish'">暂 存</ns-button>
      </span>
  </ns-dialog>
</template>

<script>
  import bizPrecinct from '../../../../components/biz/biz-form/biz-precinct'
  import { getActiveInfo, publishActivity } from '../../../../service/Channel/activeManagement'
  export default {
    name: 'activityInfoDialog',

    components: {
      bizPrecinct
    },

    props: {
      visible: Boolean,
      rowData: {
        type: Object,
        default: {}
      },

      type: String
    },

    data(){
      var validActivityLimitNum = (rule, value, callback) => {
        let reg = /^\d+$/
        if(this.enableApply && value && !reg.test(value)){
          callback(new Error('请输入正整数'));
        }else{
          callback();
        }
      };

      return{
        enableApplyOptions: {
          N: 0,
          Y: 1
        },

        activityTypeOptions: [
          {
            value: 1,
            label: '活动'
          },
          {
            value: 2,
            label: '房源'
          }
        ],


        model: {
          id: '',
          provinceId: '',
          cityId: '',
          precinctIds: [],
          title: '',
          type: '',
          enableApply: '',  //是否可报名
          activityLimitNum: '',
          activityStartTime: '', //活动开始时间
          activityEndTime: '', //活动截止时间
          voteEndTime: '',  //截止报名时间
          activitySpace: '',
          sponsor: '',
          fileList: [],
          status: '',
          category: "2",
          content: ""
        },

        showDialog: this.visible,

        submitLoadingBtn: '',

        rules: {
          precinctIds:  [{ required: true, trigger: 'change',message: '请选择范围'}],
          provinceId: [{ required: true, trigger: 'change',message: '请选择省'}],
          cityId: [{ required: true, trigger: 'change',message: '请选择市'}],
          type: [{ required: true, trigger: 'change',message: '请选择活动类型'}],
          title: [{ required: true, trigger: 'change',message: '请输入活动名称'}],
          activityLimitNum:  [{validator: validActivityLimitNum, trigger: 'change' }],
          voteEndTime: [{ required: true, trigger: 'change',message: '请选择报名截止时间'}],
          activityStartTime: [{ required: true,  trigger: 'change',message: '请选择活动时间'},],
          activityEndTime: [{ required: true,  trigger: 'change',message: '请选择活动截止时间'}],
          activitySpace: [{ required: true, trigger: 'change',message: '请输入活动地点'}],
          sponsor: [{ required: true, trigger: 'change',message: '请输入主办方'}],
          content: [{ required: true, trigger: 'input',message: '请输入活动内容'}],
        },
      }
    },

    methods: {
      close(){
        this.showDialog = false;
        this.$refs.activityForm.resetFields();
        this.$emit('update:visible',  this.showDialog);
      },

      // 是否可报名
      switchChange(val){
       if(val ===  this.enableApplyOptions.N){
         this.model.activityLimitNum = ''
       }
      },

      //获取详情
      getActiveInfo(){
        getActiveInfo({
          noticeId: this.rowData.id
        }).then((data) => {
          this.model = data.resultData;
          this.$refs.bizPrecinct.initAreaLink();
        })
      },

      /***
       * 发布/暂存
       * @param submitType
       */
      publish(submitType){
        this.$refs.activityForm.validate((valid)=>{
          if(valid){
            this.model.status = submitType === 'publish'? 1 : 0;
            this.submitLoadingBtn = submitType;
            this.model.id = this.type === 'add'? '' : this.rowData.id;
            let url = this.type === 'add'? '/o2o/activity/publish': '/o2o/activity/editActivity';
            publishActivity(url, this.model).then(()=>{
              this.submitLoadingBtn = '';
              this.$message.success('保存成功');
              this.close();
              this.$emit('reloadGrid')
            }, ()=>{
              this.submitLoadingBtn = '';
            });
          }
        });
      }
    },

    watch: {
      visible(val){
        this.showDialog = val;
        if(val) return
        if(this.type === 'edit'){
          this.getActiveInfo();
        }else{
          this.model.enableApply = this.enableApplyOptions.Y;
        }
      }
    },
    computed: {
      // 'timeRange': {
      //   get: function(){
      //     return this.model.activityStartTime? [this.model.activityStartTime, this.model.activityEndTime]: '';
      //   },
      //
      //   set: function(arr){
      //     this.model.activityStartTime = arr.length > 1 ? arr[0] :  '';
      //     this.model.activityEndTime = arr.length > 1 ? arr[1] : '';
      //   }
      // }
    },
  };
</script>

<style scoped>

</style>
