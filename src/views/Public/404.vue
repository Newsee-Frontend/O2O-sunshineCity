<template>
  <div class="pic-404">
    <img :src="img_404" alt="404" />
    <div class="error-text"> 您要访问的页面走丢啦～ </div>
    <ns-button type="primary" @click="goBack">点击返回</ns-button>
  </div>
</template>

<script>
import img_404 from '../../assets/img/404/404.png';

export default {
  data() {
    return {
      img_404,
    };
  },

  methods: {
    goBack(){
      history.back();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pic-404 {
  width: 100%;
  padding: 264px 0;
  overflow: hidden;
  text-align: center;
  .error-text{
    font-weight:400;
    color:rgba(127,65,65,1);
    line-height:22px;
    padding: 35px 0;
  }
}
</style>
