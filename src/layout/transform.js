import {getUrlParam} from '../utils'

export default {
  created() {

    this.isSimple = getUrlParam("isShowIframe");

    const token = getUrlParam("token");
    const id = getUrlParam("id");

    // console.log(id);
    // console.log(token);
    // this.$store.dispatch('setToken', token);

  },
}
