<template>
  <ns-biz-slip-dialog
    :visible.sync="showDialog"
    @close="close"
    :title="type === 'add'? '新增活动': '编辑活动'"
  >
    <!--权限按钮区-->
    <template slot="btns">
      <ns-biz-role-button-area :buttonList="roleButtonForm" @command="roleButtonCommand"></ns-biz-role-button-area>
    </template>

    <!--主要内容区-->
    <template slot="main">
      <ns-form ref="activityForm" :model="model" :rules="rules" label-width="140px">
        <ns-row>
          <ns-col :span="12">
            <ns-biz-precinct :precinctModel="model" ref="bizPrecinct"></ns-biz-precinct>

            <ns-form-item label="活动类型" prop="type">
              <ns-select :options="activityTypeOptions" v-model="model.type" placeholder="请选择活动类型"></ns-select>
            </ns-form-item>

            <ns-form-item label="活动名称" prop="title">
              <ns-input v-model.trim="model.title" placeholder="请填写活动名称" clearable></ns-input>
            </ns-form-item>

            <ns-form-item label="是否可报名" prop="enableApply">
              <ns-switch
                :active-value=" enableApplyOptions.Y" :inactive-value="enableApplyOptions.N"
                @change="switchChange" v-model="model.enableApply"
              ></ns-switch>
            </ns-form-item>

            <ns-form-item label="最大报名人数" prop="activityLimitNum">
              <ns-input :disabled="model.enableApply === 0" v-model.trim="model.activityLimitNum" placeholder="请输入报名人数"></ns-input>
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

            <ns-form-item label="活动开始时间" prop="activityStartTime">
              <ns-date-picker
                v-model="model.activityStartTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择活动开始时间"
              ></ns-date-picker>
            </ns-form-item>

            <ns-form-item label="活动结束时间" prop="activityEndTime">
              <ns-date-picker
                v-model="model.activityEndTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择活动结束时间"
              ></ns-date-picker>
            </ns-form-item>

            <ns-form-item label=" 活动地点" prop="activitySpace">
              <ns-input v-model.trim="model.activitySpace" placeholder="请填写活动地点" clearable></ns-input>
            </ns-form-item>

            <ns-form-item label=" 主办方" prop="sponsor">
              <ns-input v-model.trim="model.sponsor" placeholder="请填写主办方" clearable></ns-input>
            </ns-form-item>

            <ns-form-item label=" 列表缩略图" prop="fileList">
              <ns-upload
                v-model="model.fileList"
                :width="200"
                :height="200"
                :headers="requestHead"
                :beforeUpload="beforeUpload"
                @change="itemChanged('fileList')"
                action="/api/o2o/activity/uploadFile"
              >
              </ns-upload>
            </ns-form-item>
          </ns-col>
        </ns-row>
        <ns-form-item label=" 活动内容:" prop="content">
          <ns-editor :height="200" @input="itemChanged('content')"
                     model="normal" :plugins-config="pluginsConfig"
                     v-model="model.content" v-if="showDialog"/>
        </ns-form-item>
      </ns-form>

      <apply-dialog
        :visible.sync="showApplyDialog"
        :submitModel = model
        @submitApproval="publishSuccess"
        :baseInfo="baseInfo"></apply-dialog>
    </template>


  </ns-biz-slip-dialog>
</template>

<script>
  import nsBizPrecinct from '../../../../components/Biz/Ns-biz-precint/Ns-biz-precinct';
  import applyDialog from './community-active-applyDialog';
  import { getActiveInfo, publishActivity } from '../../../../service/Community/activeManagement';
  import { mapGetters } from 'vuex';

  export default {
    name: 'community-active-infoDialog',

    components: {
      nsBizPrecinct,
      applyDialog
    },

    props: {
      visible: Boolean,
      rowData: {
        type: Object,
        default: {},
      },
      type: String,
    },

    data() {
      const validActivityLimitNum = (rule, value, callback) => {
        let reg = /^[1-9][0-9]*$/;
        if (value && !reg.test(value)) {
          callback(new Error('请输入正整数'));
        } else {
          callback();
        }
      };
      return {
        // 是否可报名options
        enableApplyOptions: {
          N: 0,
          Y: 1,
        },

        // 活动类型options
        activityTypeOptions: [
          {
            value: 1,
            label: '活动',
          },
          {
            value: 2,
            label: '房源',
          },
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
          category: '2',
          content: '',
        },

        showDialog: this.visible,
        showApplyDialog: false,
        baseInfo: {},

        rules: {
          precinctIds: [{ required: true, trigger: 'change', message: '请选择范围' }],
          provinceId: [{ required: true, trigger: 'change', message: '请选择省' }],
          cityId: [{ required: true, trigger: 'change', message: '请选择市' }],
          type: [{ required: true, trigger: 'change', message: '请选择活动类型' }],
          title: [{ required: true, trigger: 'change', message: '请输入活动名称' }],
          activityLimitNum: [{ validator: validActivityLimitNum, trigger: 'change' }],
          voteEndTime: [{ required: true, trigger: 'change', message: '请选择报名截止时间' }],
          activityStartTime: [{ required: true, trigger: 'change', message: '请选择活动开始时间' }],
          activityEndTime: [{ required: true, trigger: 'change', message: '请选择活动截止时间' }],
          activitySpace: [{ required: true, trigger: 'change', message: '请输入活动地点' }],
          sponsor: [{ required: true, trigger: 'change', message: '请输入主办方' }],
          content: [{ required: true, message: '请输入活动内容' }],
          fileList: [{ required: true, message: '请选择图片' }],
        },
      };
    },


    watch: {
      //初始化
      visible(val) {
        this.showDialog = val;
        if (!val) return;
        this.model.content = '';
        if (this.type === 'edit') {
          this.getActiveInfo();
        } else {
          this.model.enableApply = this.enableApplyOptions.Y;
        }
      },
    },

    computed: {
      ...mapGetters(['requestHead', 'roleButtonForm']),
      pluginsConfig() {
        return {
          'editor-image': {
            action: '/api/o2o/activity/fileUploadBase64',//图片请求地址
            headers: this.requestHead,//请求头
            response: res => {
              return res.resultData[0].file;
            },
          },
        };
      },
    },

    methods: {
      //弹框关闭前的清除
      close() {
        this.showDialog = false;
        this.$refs.activityForm.resetFields();
        this.$emit('update:visible', this.showDialog);
      },

      // 是否可报名
      switchChange(val) {
        if (val === this.enableApplyOptions.N) {
          this.model.activityLimitNum = '';
        }
      },

      //获取详情
      getActiveInfo() {
        getActiveInfo({
          noticeId: this.rowData.id,
        }).then((data) => {
          this.model = data.resultData;
          this.$refs.bizPrecinct.initAreaLink();
        });
      },

      //附加校验
      itemChanged(str) {
        this.$refs.activityForm.clearValidate(str);
      },

      //图片校验
      beforeUpload(file) {
        if (['image/jpeg', 'image/png'].indexOf(file.type) === -1) {
          this.$message.error(`上传头像图片只能是jpeg, png格式!`);
          return false;
        }

        if (file.size / 1024 > 300) {
          this.$message.error('上传头像图片大小不能超过300k');
          return false;
        }

      },

      /**
       *  权限按钮操作
       */
      roleButtonCommand: function(command) {
        switch (command.code) {
          case 'formSaveBtn':this.publishActivity(command);break;
          case 'formTempsaveBtn':this.publishActivity(command);break;
          case 'formReturnBtn':this.showDialog = false;break;
        }
      },

      /***
       * 发布/暂存
       * @param btnInfo
       */
      publishActivity(btnInfo) {
        this.$refs.activityForm.validate((valid) => {
          if (valid) {
            if (this.model.activityStartTime > this.model.activityEndTime) {
              this.$message.error('活动开始时间不能晚于活动结束时间， 请重新选择');
              return;
            }
            this.model.status = btnInfo.code === 'formSaveBtn' ? 1 : 0;
            this.model.id = this.type === 'add' ? '' : this.rowData.id;
            this.$set(btnInfo, 'disabled', true);
            let url = this.type === 'add' ? '/o2o/activity/publish' : '/o2o/activity/editActivity';
            publishActivity(url, this.model).then((res) => {
              this.$set(btnInfo, 'disabled', false);
              if(typeof res.resultData === 'object'){
                this.baseInfo =  res.resultData;
                this.showApplyDialog = true;
              }else{
                this.publishSuccess();
              }
            }, () => {
              this.$set(btnInfo, 'disabled', false);
            });
          }
        });
      },


      /**
       * publish success
       */
      publishSuccess(){
        this.$message.success('保存成功');
        this.close();
        this.$emit('reloadGrid');
      }
    }

  };
</script>
