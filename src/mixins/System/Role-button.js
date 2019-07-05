import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['roleButtonAction', 'roleButtonForm', 'roleButtonGrid']),
  },
  created() {
    this.$store.dispatch('getRoleButtonList', { funcId: this.Mix_funcId }); //get new role button-list
  },
};
