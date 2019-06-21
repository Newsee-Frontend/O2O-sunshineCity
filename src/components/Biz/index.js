import Vue from 'vue';

import BizTable from './Biz-table/Biz-table'; // 筛选器(票据使用管理)
import nsGrids from './Biz-grid/ns-grids'; // 筛选器(票据使用管理)

import SearchConditions from './Biz-search-conditions/Biz-search-conditions'; // 筛选器(票据使用管理)


//table
Vue.component('biz-table', BizTable);
Vue.component('ns-grids', nsGrids);

Vue.component('biz-search-conditions', SearchConditions);


