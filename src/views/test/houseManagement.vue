<template>
  <div class="ns-container">
    <ns-drawer class="ns-container-left" speed="160ms">
      <biz-house-tree
        @tree-item-click="treeItemClick"
      ></biz-house-tree>
    </ns-drawer>
  </div>
</template>

<script>
  import bizHouseTree from '../../components/Biz/Biz-tree/Biz-house-tree/Biz-house-tree'
  import Mixin from "../../mixins";
  export default {
    name: 'houseManagement',
    components: {bizHouseTree},
    mixins: [Mixin],

    methods: {
      treeItemClick(node){
        console.log('node change', node);
      }
    }
  };
</script>

<style scoped>

</style>
