import Vue from 'vue';

//table
import NsBizTable from './Ns-biz-table/Ns-biz-table';

//tree
import NsBizOrganizeTree from './Ns-biz-tree/Ns-biz-organize-tree/Ns-biz-organize-tree';
import NsBizDataDictionaryTree from './Ns-biz-tree/Ns-biz-data-dictionary-tree/Ns-biz-data-dictionary-tree';

//select-tree
import NsBizOrgnizeSelectTree from './Ns-biz-select-tree/Ns-biz-organize-select-tree/Ns-biz-organize-select-tree.vue';


//conditions
import NsBizSearchConditions from './Ns-biz-search-conditions/Ns-biz-search-conditions';

import NsBizSlipDialog from './Ns-biz-slip-dialog/Ns-biz-slip-dialog';

import NsBizRoleButtonArea from './Ns-biz-role-button-area/Ns-Biz-role-button-area';


//table
Vue.component('ns-biz-table', NsBizTable);

//tree
Vue.component('ns-biz-organize-tree', NsBizOrganizeTree);
Vue.component('ns-biz-data-dictionary-tree', NsBizDataDictionaryTree);


Vue.component('ns-biz-search-conditions', NsBizSearchConditions);

//select tree
Vue.component('ns-biz-organize-select-tree', NsBizOrgnizeSelectTree);

Vue.component('ns-biz-role-button-area', NsBizRoleButtonArea);

Vue.component('ns-biz-slip-dialog', NsBizSlipDialog);
