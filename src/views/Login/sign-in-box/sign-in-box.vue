<template>
  <div class="sign-in-box">
    <!--用户名账号登录窗口-->
    <div class="sign-in-left"></div>
    <div class="sign-in-right">
      <div class="signIn step-one" v-if="!hasMultiEnterprise" @keyup.enter="submitForm('loginForm')">
        <p>登录</p>
        <el-form
          :model="loginForm"
          ref="loginForm"
          :rules="rules_login"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item prop="username" class="username" :show-message="false">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名或者手机号"
              autofocus="autofocus"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="pwd" :show-message="false">
            <!--记住密码-->
            <el-input type="password" autocomplete="on" v-model="loginForm.password" placeholder="登录密码"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" class="btnCss" :loading="submitLoading" @click="submitForm('loginForm')">登录</el-button>
      </div>

      <!--多企业账号，选择登录-->
      <multi-enterprise
        v-if="hasMultiEnterprise"
        :loginForm="loginForm"
        :enterprise="enterprise"
        @back="goPrevStep"
      ></multi-enterprise>
    </div>

  </div>
</template>

<script>
  import {isMultipleEnterprise} from '../../../service/User/login';
  import MultiEnterprise from './multi-enterprise';
  import authLogin from '../authLogin';
  import cryptoPassWord from '../cryptoPassWord';

  export default {
    name: 'sign-in-box',
    mixins: [authLogin, cryptoPassWord],
    components: {MultiEnterprise},
    data() {
      return {
        validateError: '你输入的密码和账户名不匹配,请重新输入',
        hasMultiEnterprise: false,
        submitLoading: false,
        loginForm: {
          username: '',
          password: '',
        },
        rules_login: {
          username: [{required: true, message: '请输入用户名', trigger: 'change'}],
          password: [{required: true, message: '请输入密码', trigger: 'change'}],
        },
        enterprise: [],
      };
    },
    methods: {
      /**
       * 点击登录按钮
       * @param formName
       */
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.checkMultipleEnterprise(); // 检测是否是多企业账号
          } else {
            this.$message({
              message: this.validateError,
              type: 'error',
            });
          }
        });
      },

      /**
       * 检测是否是多企业账号
       */
      checkMultipleEnterprise() {
        let registerInfo = {
          userAccount: this.loginForm.username,
          password: this.getCryptoBybase64,
        };
        isMultipleEnterprise(registerInfo)
          .then(res => {
            this.enterprise = res.resultData;
            // 多企业账号跳转到选择企业界面
            if (this.enterprise.length > 1) {
              this.hasMultiEnterprise = true;
            }
            // 不是多企业账号，直接登录
            else {
              const loginParams = {
                username: this.loginForm.username,
                password: this.getCryptoBybase64,
              };
              this.authLogin(loginParams);
            }
          })
          .catch(err => {
            console.log('多企业登录失败', err);
          });
      },

      // 返回上一页
      goPrevStep() {
        this.hasMultiEnterprise = !this.hasMultiEnterprise;
      },
    },
  };
</script>

<style scoped lang="scss">
  #findPass {
    width: 333px;
    height: 40px;
    margin-left: 47px;
  }
</style>
