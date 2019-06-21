<!--login-->
<template>
  <div class="login-wrap">
    <div class="login-header">
      <div class="login-logo"><img :src="operator.operatorLogo" /></div>
    </div>
    {{operator.operatorPicture}}
    <div class="login-body" :style="{'background-image': 'url(' + operator.operatorBackgroudPic + ')'}">
      <div class="ms-login">
        <img :src="operator.operatorPicture" class="banner" />
        <sign-in-box></sign-in-box>
      </div>
    </div>
    <div class="login-footer">
      <div class="information">
        <span>Copyright © {{operator.operatorDesc}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {getOperatorInfo} from '../../service/User';
  import signInBox from './sign-in-box/sign-in-box';
  export default {
    components: { signInBox },
    data() {
      return {
        isDefault: 1,
        afterRequset: false,
        operator: {
          operatorBackgroudPic: '',
          operatorLoginPic: '',
          operatorLogo: '',
          operatorPicture: '',
          operatorDesc: ''
        }
      };
    },
    created() {
      this.getInfo();
    },
    methods: {
      getInfo() {
        getOperatorInfo({isDefault: this.isDefault}).then(res => {
          this.afterRequset = true;
          for (let key in this.operator) {
            if (this.operator.hasOwnProperty(key)) {
              if (key === 'operatorDesc') {
                this.operator[key] = res.resultData[key];
              } else {
                this.operator[key] = 'data:image/jpeg;base64,' + res.resultData[key];
              }
            }
          }
          localStorage.setItem('operatorInfo', JSON.stringify(this.operator));
        })
      }
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/css/Modular/login/login.css';
</style>
