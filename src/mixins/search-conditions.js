import page_type_config from "../utils/pageTypeConfig";

export default {
  data() {
    return {
      Mix_searchConditions: {}, //初始查询条件
    };
  },
  //destory
  beforeDestroy(){
    this.$store.dispatch('emptySearchConditions', this.pageID);
  },

  created() {
    if (page_type_config.has_register_searchConditions.includes(this.$options.pageType)) {
      if (typeof this.pageID !== 'string') {
        throw "The function of conditions handle - set only one params (ID), ID must exist，it's String format, you better find it";
      }
      this.$store.dispatch('setSearchConditions', this.pageID);
      this.Mix_searchConditions = this.$store.state.Search.conditions[this.pageID]
    }
  },
}
