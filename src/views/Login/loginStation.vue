<!--login station 中转跳转页面-->
<template>
  <div class="login-wrap">
    <h1>loading......</h1>
    <img src="../../assets/img/loading/loading.gif" alt="loading"/>
  </div>
</template>
<script>
  import {mutilLogin, mutilLoginTwo} from '../../service/User/loginStation';

  export default {
    data() {
      return {
        cryptoKey: '0123456789012345', //crypto key
        timer: null
      };
    },
    created() {
      this.loginTo(); //login
    },
    methods: {
      loginTo() {
        let data = {
          remember: false,
          userAccount: window.name.split('*')[0],
          password: window.name.split('*')[1],
          enterpriseId: window.name.split('*').length > 2 ? window.name.split('*')[2] : null,
        };
        mutilLogin(data)
          .then(res => {
            if (res.resultData.userId === 145) {
              //跳转平台概览
              this.$router.push({
                path: '/soss/operationHome',
              });
            } else {
              let users = {userId: res.resultData.userId};
              mutilLoginTwo(users).then(r => {
                if (r.resultData) {
                  this.$router.push({
                    path: '/soss/operationHome',
                  });
                } else {
                  this.$router.push({
                    path: '/soss/buyProduct',
                  });
                }
              });
            }
            // this.$store.dispatch('Login', res.resultData.userId).then((r) => {});
          })
          .catch(response => {
            if (
              response.resultCode === 604 ||
              response.resultCode === 601 ||
              response.resultCode === 500
            ) {
              this.timer = setTimeout(() => {
                window.location.href = window.location.origin + ':90/sossLogin.html';
              }, 2000);
            }
          });
      },
    },
    beforeDestroy() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .login-wrap {
    position: relative;
    text-align: center;
    h1 {
      font-weight: 400;
      color: #1f2f3d;
      margin: 30px 0 5px -100px;
    }
    img {
      position: absolute;
      width: 100px;
      height: 100px;
      margin-left: -100px;
    }
  }
</style>
