import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['roleButtonAction', 'roleButtonForm', 'roleButtonGrid']),

    //table中的按钮
    gridBtns(){
      return this.roleButtonGrid.map(({name, code}) => ({label: name, value:code }));
    }
  },

  created() {
    this.$store.dispatch('getRoleButtonList', { funcId: this.Mix_funcId }); //get new role button-list
  },
};
