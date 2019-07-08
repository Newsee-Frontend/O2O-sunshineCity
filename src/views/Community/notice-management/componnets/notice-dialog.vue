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
      <biz-role-button-area :buttonList="roleButtonForm" @command="roleButtonCommand"></biz-role-button-area>
    </div>

    <div class="silp-container">
      <ns-form ref="noticeForm" :model="model" :rules="rules" label-width="140px">
        <ns-row>
          <ns-col :span="12">
            <biz-precinct :precinctModel="model" ref="bizPrecinct"></biz-precinct>
          </ns-col>
          <!--<ns-col :span="12">-->
            <!--<ns-form-item label="附件" prop="fileList">-->
              <!--<ns-upload-->
                <!--v-model="model.fileList"-->
                <!--:width="120"-->
                <!--:height="120"-->
                <!--:headers="requestHead"-->
                <!--@change="itemChanged('fileList')"-->
                <!--action="/api/o2o/activity/uploadFile"-->
              <!--&gt;</ns-upload>-->
            <!--</ns-form-item>-->
          <!--</ns-col>-->
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
      ...mapGetters(['requestHead', 'roleButtonForm']),
      pluginsConfig() {
        return {
          'editor-image': {
            action: '/api/o2o/activity/fileUploadBase64',//图片请求地址
            headers: this.requestHead,//请求头
            response: res => {
              return res.resultData[0].file;
            }
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



      roleButtonCommand(item){
        switch (item.code) {
          case 'formSaveBtn':
            this.submit(item);
            break;

          case 'formTempsaveBtn':
            this.submit(item);
            break;

          case 'formReturnBtn':
            this.showDialog = false;
            break
        }
      },


      /**
       *  提交
       */
      submit: function (btnInfo) {
        this.model.status = btnInfo.code === 'formSaveBtn' ? 1 : 0;
        this.$set(btnInfo, 'disabled', true);
        this.$refs.noticeForm.validate((valid) => {
          if (valid) {
            saveNotice(this.model).then((data) => {
              this.$set(btnInfo, 'disabled', false);
              this.showDialog = false;
              this.$message.success('保存成功');
              this.$emit('reloadGrid')
            }, () => {
              this.$set(btnInfo, 'disabled', false);
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
