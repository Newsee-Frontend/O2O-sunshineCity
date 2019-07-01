import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['tableHead']),
    Mix_thlist() {
      console.log(777777777777777777777777777777);
      console.log(777777777777777777777777777777);
      console.log(777777777777777777777777777777);
      console.log(this.tableHead);
      return {
        thlistDefault: this.tableHead || [] //为筛选器需要的表头数据赋值
      }
    }
  }
}
