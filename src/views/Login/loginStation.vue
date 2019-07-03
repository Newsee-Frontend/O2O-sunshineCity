<!--login station 中转跳转页面-->
<template>
  <div class="login-wrap">
    <h1>loading......</h1>
    <img src="../../assets/img/loading/loading.gif" alt="loading"/>
  </div>
</template>
<script>
  import {getUrlParam} from '../../utils'
  import {mutilLogin} from '../../service/User/loginStation';

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
          token: getUrlParam('token'),
        };
        mutilLogin(data)
          .then(res => {

            // this.$store.dispatch('Login', res.resultData.userId).then((r) => {});
          })
          .catch(response => {
            if (
              response.resultCode === 604 ||
              response.resultCode === 601 ||
              response.resultCode === 500
            ) {
              this.timer = setTimeout(() => {
                // window.location.href = window.location.origin + ':90/sossLogin.html';
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
