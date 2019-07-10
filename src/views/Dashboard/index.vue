<!--主页-->
<template>
  <div class="Dashboard">
    <img src="../../assets/img/dashboard/dashboard.png">
    <!--<ns-particles class="ns-particles" :color="particlesColor"/>-->
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        particlesColor: '#a9abae',
      };
    },
    created() {
    },
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .Dashboard {
    position: relative;
    height: 100%;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -250px;
      margin-top: -150px;
    }
  }
</style>
