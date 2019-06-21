<!--主页-->
<template>
  <div class="Dashboard">
    <ns-particles :color="particlesColor" class="ns-particles"></ns-particles>
    <ns-editor :height="500" v-model="content"/>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        particlesColor: '#a9abae',
        content: ''
      };
    },
    created() {
    },
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
