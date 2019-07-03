<!--房产树-->
<template>
    <div class="house-tree-wrapper">
      <!--树显示按钮-->
      <ns-icon-svg v-show="!showTree" @click="treeToggle" icon-class="hj" class="zhankai"></ns-icon-svg>
      <!--树隐藏按钮-->
      <ns-icon-svg v-show="showTree" @click="treeToggle" icon-class="shouqi1" class="shouqi"></ns-icon-svg>
    </div>
</template>

<script>
  export default {
    name: 'Biz-house-tree',

    methods: {
      /**
       * 树的显示隐藏
       * */
      treeToggle() {
        this.showTree = !this.showTree;
        this.changeStatus.status = this.showTree;   //外层根据该值重新计算
      },

    },
  };
</script>

<style scoped>

</style>
