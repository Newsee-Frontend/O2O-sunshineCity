import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['roleButtonAction', 'roleButtonForm', 'roleButtonGrid']),

    //table中的按钮
    gridBtns() {
      return this.roleButtonGrid.map(({ name, code }) => ({ label: name, value: code }));
    },
  },

  created() {
    this.$store.dispatch('getRoleButtonList', { funcId: this.Mix_funcId }).then(
      data => {
        console.log(787787878787878787878);
        console.log(787787878787878787878);
        console.log(787787878787878787878);
        console.log(787787878787878787878);
        console.log(data);
        this.loadState.roleButton = true;
      },
    ); //get new role button-list
  },
};
