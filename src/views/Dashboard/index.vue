<!--主页-->
<template>
  <div class="Dashboard">
    <ns-particles class="ns-particles" :color="particlesColor"/>
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

</style>
