<!--auto-form-operation 自动表单-操作模块部分-->
<template>
  <!--handle 操作按钮部分-->
  <div class="auto-form-operation">
    <ns-role-button
      v-for="(btnItem, index) in buttonInfo"
      :index="index"
      :key="index"
      mode="button"
      :btnType="btnItem.style"
      :disabled="btnItem.disabled"
      :roleInfo="btnRoleInfo(btnItem)"
      @click="btnItem.event(autoFormID, btnItem)"
    ></ns-role-button>
  </div>
</template>
<script>
import ns from '@/utils/nsQuery/nsQuery';
import * as store from '@/utils/nsQuery/nsStore';

export default {
  props: {
    autoFormID: { type: String }, //自动表单唯一ID值（根据业务自定义）
    /*
     * auto-form button information
     * type:  'submit','reset','custom'
     * style: primary,success,warning,danger,info,text
     */
    buttonInfo: { type: Array },
    formStatus: { type: Number },
  },
  created() {},
  methods: {
    /**
     * button role information ( 按钮权限信息 )
     * @param info            role information (Object)
     * @returns {{code, name, nameEn, areaType, index, btnType, coerciveShow: (*|boolean)}}
     */
    btnRoleInfo(info) {
      return {
        code: info.code, //按钮编码
        name: info.name, //按钮名称
        nameEn: info.nameEn, //按钮英文名称
        areaType: info.areaType, //按钮区域类型
        index: info.index, //排序号
        btnType: info.btnType, //按钮类型 （single / dropDown）
        coerciveShow: info.coerciveShow, //按钮是否强制显示
      };
    },
    /**
     * auto form submit
     * @param formName      form name
     */
    submitForm222(formName) {
      console.log('提交数据如下：');
      console.log(this.formData.modelData);
      const params = {
        vm: this, //vue
        formData: this.formData, //formData
        formName: formName, //form name
      };
      //before validate handle
      this.$emit('validate-before', params);
      this.$refs[formName].validate(valid => {
        //表单提交添加'all-check' 标识到checkList中，开启第一级验证开关（即对所有自定义验证的表单进行验证）。
        this.$store.dispatch('setCustomCheck', 'all-check'); //多张表单 存在bug
        //before submit callback
        this.$emit('submit-before', params);
        //validate right
        if (valid && ns.base.checkRange('.ns-form', '.ns-is-error')) {
          //sure quert for auto-form submit
          const query = this.isFreeSubmit ? this.customModelData : this.formData.modelData;
          console.log(query);
          //submit request
          this.autoForm.submit(this.submitUrl, query, () => {
            //submit success callback
            this.$emit('submit-success', params);
          });
        } else {
          //submit error callback
          this.$emit('validate-error', params);
          return false;
        }
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>
