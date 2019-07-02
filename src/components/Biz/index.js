import Vue from 'vue';

//table
import BizTable from './Biz-table/Biz-table';
import nsGrids from './Biz-grid/ns-grids';

//tree
import BizOrganizeTree from './Biz-tree/Biz-organize-tree/Biz-organize-tree';

//select-tree
import BizOrgnizeSelectTree from './Biz-select-tree/Biz-organize-select-tree/Biz-organize-select-tree.vue'


//conditions
import SearchConditions from './Biz-search-conditions/Biz-search-conditions';


//table
Vue.component('biz-table', BizTable);
Vue.component('ns-grids', nsGrids);

//tree
Vue.component('biz-organize-tree', BizOrganizeTree);

Vue.component('biz-search-conditions', SearchConditions);

//select tree
Vue.component('biz-organize-select-tree', BizOrgnizeSelectTree)





