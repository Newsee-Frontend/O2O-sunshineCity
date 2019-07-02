<template>
  <ns-slip-dialog
    :visible.sync="showDialog"
    left="50px"
    right="0px"
    top="50px"
    bottom="0px"
    :appendToBody="false"
    animation="fade-normal"
    :beforeClose="close"
    ref="slipDialog">
    <div class="slip-title">{{type === 'add'? '新增公告': '编辑公告'}}</div>

    <div class="slip-btns">
      <ns-button type="primary" @click="submit('publish')" :loading="submitLoading === 'publish'">保 存</ns-button>

      <ns-button type="primary" @click="submit('tempPublish')" :loading="submitLoading === 'tempPublish'">暂 存</ns-button>

      <ns-button @click="showDialog = false">返    回</ns-button>
    </div>

    <div class="silp-container">
      <ns-form ref="noticeForm" :model="model" :rules="rules" label-width="140px">
        <ns-row>
          <ns-col :span="12">
            <biz-precinct :precinctModel="model" ref="bizPrecinct"></biz-precinct>
          </ns-col>
          <ns-col :span="12">
            <ns-form-item label="附件" prop="fileList">
              <ns-upload
                v-model="model.fileList"
                :width="120"
                :height="120"
                :headers="requestHead"
                @change="itemChanged('fileList')"
                action="http://192.168.1.20:7777/o2o/activity/uploadFile"
              ></ns-upload>
            </ns-form-item>
          </ns-col>
        </ns-row>
        <ns-form-item label="公告标题" prop="title">
          <ns-input v-model.trim="model.title" placeholder="请输入公告标题" width="100%"></ns-input>
        </ns-form-item>
        <ns-form-item label="公告内容" prop="content">
          <ns-editor
            :plugins-config="pluginsConfig"
            :height="200"
            v-model="model.content"
            model="normal"
            @input="itemChanged('content')"
            v-if="showDialog"/>
        </ns-form-item>
      </ns-form>
    </div>
  </ns-slip-dialog>
</template>

<script>
  import bizPrecinct from '../../../../components/biz/biz-form/biz-precinct'
  import {saveNotice, getNotice} from '../../../../service/Community/noticeManagement.js'
  import {mapGetters} from 'vuex';

  export default {
    name: 'notice-dialog',

    components: {
      bizPrecinct,
    },

    data() {
      return {
        showDialog: false,
        submitLoading: '',
        provinces: [],
        cities: [],
        precincts: [],
        noticeTypeOptions: [],
        model: {
          title: '',
          precinctIds: [],
          provinceId: '',
          cityId: '',
          fileList: [],
          noticeCategory: '',
          category: "1",
          content: '',
          status: ''
        },
        rules: {
          precinctIds: [{required: true, trigger: 'change', message: '请选择范围'}],
          provinceId: [{required: true, trigger: 'change', message: '请选择省'}],
          cityId: [{required: true, trigger: 'change', message: '请选择市'}],
          content: [{required: true, trigger: 'change', message: '请输入公告内容'}],
          title: [{required: true, trigger: 'change', message: '请输入公告标题'}],
        }
      }
    },

    props: {
      type: String,
      rowData: Object,  //编辑的时候
      visible: Boolean
    },

    watch: {
      visible(val) {
        this.showDialog = val;
        if (val && this.type === 'edit') {
          this.model.id = this.rowData.id;
          this.getNoticeInfo()
        } else {
          this.model.id = '';
          this.model.content = '';
        }
      }
    },

    computed: {
      ...mapGetters(['requestHead']),
      pluginsConfig() {
        return {
          'editor-image': {
            action: 'http://192.168.1.20:7777/o2o/activity/fileUploadBase64',//图片请求地址
            headers: this.requestHead,//请求头
          },
        };
      }
    },

    methods: {
      close() {
        this.$refs.noticeForm.resetFields();
        this.showDialog = false;
        this.$emit('update:visible', this.showDialog)
      },

      itemChanged(str) {
        this.$refs.noticeForm.clearValidate(str);
      },

      /**
       * 获取公告基础信息
       */
      getNoticeInfo() {
        getNotice({id: this.model.id}).then((data) => {
          this.model = data.resultData;
          this.$refs.bizPrecinct.initAreaLink();
        })
      },


      /**
       *  提交
       */
      submit: function (submitType) {
        this.model.status = submitType === 'publish' ? 1 : 0;
        this.$refs.noticeForm.validate((valid) => {
          if (valid) {
            this.submitLoading = submitType;
            saveNotice(this.model).then((data) => {
              this.submitLoading = '';
              this.showDialog = false;
              this.$message.success('保存成功');
              this.$emit('reloadGrid')
            }, () => {
              this.$message.error('保存失败');
              this.submitLoading = '';
            })
          }
        })
      },
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
