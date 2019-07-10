import Vue from 'vue';

//table
import BizTable from './Biz-table/Biz-table';

//tree
import BizOrganizeTree from './Biz-tree/Biz-organize-tree/Biz-organize-tree';
import BizDataDictionaryTree from './Biz-tree/Biz-data-dictionary-tree/Biz-data-dictionary-tree';

//select-tree
import BizOrgnizeSelectTree from './Biz-select-tree/Biz-organize-select-tree/Biz-organize-select-tree.vue';


//conditions
import SearchConditions from './Biz-search-conditions/Biz-search-conditions';

import BizSlipDialog from './Biz-slip-dialog/Biz-slip-dialog';

import BizRoleButtonArea from './Biz-role-button-area/Biz-role-button-area';


//table
Vue.component('biz-table', BizTable);

//tree
Vue.component('biz-organize-tree', BizOrganizeTree);
Vue.component('biz-data-dictionary-tree', BizDataDictionaryTree);


Vue.component('biz-search-conditions', SearchConditions);

//select tree
Vue.component('biz-organize-select-tree', BizOrgnizeSelectTree);

Vue.component('biz-role-button-area', BizRoleButtonArea);

Vue.component('biz-slip-dialog', BizSlipDialog);
