<template>
  <div class="sign-in-box">
    <!--用户名账号登录窗口-->
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
          <el-input type="password" v-model="loginForm.password" placeholder="登录密码"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" class="btnCss" @click="submitForm('loginForm')">登录</el-button>
    </div>

    <!--多企业账号，选择登录-->
    <multi-enterprise
      v-if="hasMultiEnterprise"
      :cryptoKey="cryptoKey"
      :loginForm="loginForm"
      :enterprise="enterprise"
      @jump="jumpToPage"
      @back="goPrevStep"
    ></multi-enterprise>
  </div>
</template>

<script>
  import {isMultipleEnterprise} from '../../../service/User';
  import ns from '../../../utils/nsQuery/nsQuery';
  import MultiEnterprise from './multi-enterprise';


  export default {
    name: 'sign-in-box',
    components: {MultiEnterprise},
    data() {
      return {
        validateError: '你输入的密码和账户名不匹配,请重新输入',
        hasMultiEnterprise: false,
        loginForm: {
          username: 'superAdmin',
          password: 'newsee888',
          remember: false,
        },
        rules_login: {
          username: [{required: true, message: '请输入用户名', trigger: 'change'}],
          password: [{required: true, message: '请输入密码', trigger: 'change'}],
        },
        enterprise: [],
        cryptoKey: '0123456789012345', //crypto key
      };
    },
    computed: {
      //set crypto by Pass64
      setCryptoBybase64() {
        return ns.crypto.encryptBase64(this.loginForm.password, this.cryptoKey);
      },
    },
    created() {
      /**
       * loginAutoHandle
       * @param t
       * @param user
       * @param ps
       * @param bol
       */
      const loginAutoHandle = function (t, user, ps, bol) {
        t.loginForm.username = user;
        t.loginForm.password = ps;
        t.loginForm.remember = bol;
      };

      loginAutoHandle(this, this.loginForm.username, this.loginForm.password, false);
    },
    methods: {
      /**
       * 点击登录按钮
       * @param formName
       */
      submitForm(formName) {
        this.$store.dispatch('logOut');
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
          password: this.setCryptoBybase64,
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
                password: this.setCryptoBybase64,
                remember: this.loginForm.remember,
              };

              this.$store.dispatch('oauthlogin', loginParams).then(() => {
                this.jumpToPage();
              }, (error) => {
                console.log('登录失败', error);
              });
            }
          })
          .catch(err => {
            console.log('失败', err);
          });
      },

      // 返回上一页
      goPrevStep() {
        this.hasMultiEnterprise = !this.hasMultiEnterprise;
      },


      //选中企业跳转
      jumpToPage() {
        this.$store.dispatch('generateSideBar').then(list => {
          this.$router.push({path: list.length > 0 ? '/dashboard' : '/404'});
        });
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
