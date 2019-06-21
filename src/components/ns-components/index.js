import Vue from 'vue';

import SearchConditions from './search-conditions/search-conditions.vue'; // 筛选器(票据使用管理)
import checkboxTreeSelect from './form-components/business-select/checkboxTreeSelect/checkboxTreeSelect.vue';
import authorizer from './form-components/authorizer/authorizer.vue';
import roleGroup from './form-components/business-select/role-group/role-group.vue';
import roleFnBtn from './form-components/roleFnBtn/roleFnBtn.vue';
import manageRangeSelect from './form-components/manage-range/index.vue';


Vue.component('ns-search-conditions', SearchConditions);
Vue.component('ns-checkbox-tree-select', checkboxTreeSelect);
Vue.component('ns-transfer-authorizer', authorizer);
Vue.component('ns-role-group', roleGroup);
Vue.component('ns-role-fn-btn', roleFnBtn);
Vue.component('cx-manage-range', manageRangeSelect);

