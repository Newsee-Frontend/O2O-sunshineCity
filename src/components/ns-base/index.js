
import Vue from 'vue';

import roleButton from './Basic/button/role-button/role-button.vue';
//select
import select from './Form/select/select.vue';

//tree
import checkboxTree from './Form/tree/checkbox-tree.vue';

//表单 - items 相关
import autoFormOperation from './Form/auto-form/auto-form-operation/auto-form-operation.vue';
import autoForm from './Form/auto-form/auto-form.vue';
import musterItem from './Form/auto-form/auto-form-item/muster-item.vue';
import repeatItem from './Form/auto-form/auto-form-item/auto-muster-item.vue';
import text from './Form/text/text.vue';

//Navigation
import dropdown from './Navigation/dropdown.vue';

Vue.component('ns-role-button', roleButton);
// Vue.component('ns-select', select);
Vue.component('ns-checkbox-tree', checkboxTree);


//Navigation
Vue.component('ns-dropdown', dropdown);
// form
Vue.component('ns-auto-form', autoForm);
Vue.component('ns-auto-form-operation', autoFormOperation);
Vue.component('ns-muster-item', musterItem);
Vue.component('ns-repeat-item', repeatItem);
Vue.component('ns-text', text);
