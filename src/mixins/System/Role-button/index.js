import page_type_config from "../../../utils/pageTypeConfig";
import {roleButtonListOperation} from "./roleBtnfetch";

export default {
  methods: {

  },


  created() {
    if (page_type_config.has_get_role_button_list.includes(this.$options.pageType)) {
      //get role button list
      roleButtonListOperation({ funcId: this.Mix_funcId });
    }
  },
}
