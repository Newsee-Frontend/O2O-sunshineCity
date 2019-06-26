import Vue from 'vue';

import BizTable from './Biz-table/Biz-table';
import nsGrids from './Biz-grid/ns-grids';

import SearchConditions from './Biz-search-conditions/Biz-search-conditions';

import BizSlipDialog from './Biz-slip-dialog/Biz-slip-dialog'


//table
Vue.component('biz-table', BizTable);
Vue.component('ns-grids', nsGrids);

Vue.component('biz-search-conditions', SearchConditions);


//侧滑
Vue.component('biz-slip-dialog', BizSlipDialog);




