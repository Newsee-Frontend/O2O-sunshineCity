import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['tableHead']),
    Mix_thlist() {
      return {
        thlistDefault: this.tableHead || [] //为筛选器需要的表头数据赋值
      }
    }
  }
}
