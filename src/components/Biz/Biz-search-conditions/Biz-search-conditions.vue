<template>
  <div class="search-container" style="overflow: hidden;">
    <div class="search-conditions borderBox fl clear" style="position: inherit;">
      <div class="search-header clear">
        <div class="fl">
          <span class="lineBlue"></span>
          <span class="search-title">搜索</span>
        </div>
        <slot name="btns"></slot>
      </div>

      <div class="search-body clear">
        <div class="clear f1">
          <slot name="main"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'biz-search-condition',
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../../style/Modular/search-conditions/search-conditions';
</style>

