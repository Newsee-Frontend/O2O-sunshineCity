export default {
  data() {
    return {
      initPath: '/dashboard'
    }
  },
  methods: {
    authLogin(query) {
      //clear
      this.$store.dispatch('logOut');

      this.$store.dispatch('oauthlogin', query).then(() => {
        this.getMenuAndJump();
      }, (error) => {
        console.log('登录失败', error);
      });
    },

    multipleAuthLogin(query) {
      //clear
      this.$store.dispatch('logOut');

      this.$store.dispatch('multipleEnterpriseLogin', loginParams).then(() => {
        this.getMenuAndJump();
      });
    },

    getMenuAndJump() {
      //get side bar data
      this.$store.dispatch('generateSideBar').then(list => {
        this.$router.push({path: list.length > 0 ? this.initPath : '/404'});
      });
    }
  }
}
