<template>
  <ns-biz-slip-dialog
    :visible.sync="showDialog"
    @close="close"
    :title="type === 'add'? '新增公告': '编辑公告'"
  >
    <template slot="btns">
      <ns-biz-role-button-area :buttonList="roleButtonForm" @command="roleButtonCommand"></ns-biz-role-button-area>
    </template>

    <template slot="main">
      <ns-form ref="noticeForm" :model="model" :rules="rules" label-width="140px">
        <ns-row>
          <ns-col :span="12">
            <ns-biz-precinct :precinctModel="model" ref="bizPrecinct"></ns-biz-precinct>
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
    </template>
  </ns-biz-slip-dialog>
</template>

<script>
  import bizPrecinct from '../../../../components/Biz/Ns-biz-precint/Ns-biz-precinct'
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

      // 初始化
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
      //弹框关闭前操作
      close() {
        this.$refs.noticeForm.resetFields();
        this.showDialog = false;
        this.$emit('update:visible', this.showDialog)
      },


      //附加校验
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


      // 权限按钮点击
      roleButtonCommand(item){
        switch (item.code) {
          case 'formSaveBtn':this.submit(item);break;
          case 'formTempsaveBtn':this.submit(item);break;
          case 'formReturnBtn':this.showDialog = false;break;
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
