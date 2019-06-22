<template>
  <ns-dialog
    title="报名情况"
    :visible.sync="showDialog"
    size="large"
    @close="close"
  >
    <div class="search-container">
      <biz-search-conditions>
        <template slot="main">
          <div class="clear fl search-option">
            <ns-input v-model="searchConditions.keyWord" placeholder="请输入活动名称"></ns-input>
          </div>
          <div class="clear fl search-option">
            <ns-input v-model="searchConditions.keyWord" placeholder="请输入活动名称"></ns-input>
          </div>
          <div class="clear fl search-option">
            <ns-input v-model="searchConditions.keyWord" placeholder="请输入活动名称"></ns-input>
          </div>
        </template>
      </biz-search-conditions>
    </div>
  </ns-dialog>
</template>

<script>
  export default {
    name: 'checkActivityDetail',

    data(){
      return{
        showDialog: false,
        keyWord: '',
        searchConditions: {
          keyWord: ''
        }
      }
    },

    props: {
      visible: Boolean,
    },

    watch: {
      visible(val){
        this.showDialog = val;
      }
    },

    methods: {
      close(){
        this.showDialog = false;
        this.$emit('update:visible',  this.showDialog);
      },
    }
  };
</script>

<style scoped>
  .search-container{

  }
</style>
