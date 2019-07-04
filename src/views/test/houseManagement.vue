<template>
  <div class="ns-container">
    <div class="ns-container-left" :class="{ 'ns-container-left-border': changeStatus.status }">
      <biz-organize-tree
        title="组织架构"
        :funcId="Mix_funcId"
        @tree-item-click="organizeTreeItemClick"
        orgTypeFilter="1"
        :searchConditions="Mix_searchConditions"
        :changeStatus="changeStatus"
      ></biz-organize-tree>
    </div>
  </div>
</template>

<script>
  import biz from '../../components/Biz/Biz-tree/Biz-house-tree/Biz-house-tree'
  export default {
    name: 'houseManagement',
  };
</script>

<style scoped>

</style>
