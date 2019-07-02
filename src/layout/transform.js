import {getUrlParam} from '../utils'

export default {
  created() {
    console.log(123123812391728398);
    console.log(123123812391728398);


    this.isSimple = getUrlParam("isShowIframe");

    const token = getUrlParam("token");
    const id = getUrlParam("id");

    console.log(id);
    console.log(token);

    this.$store.dispatch('setToken', token);

    console.log(123123812391728398);
    console.log(123123812391728398)
  },
}
