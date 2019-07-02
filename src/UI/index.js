import Vue from "vue";
import ElementUI from 'element-ui';
import 'cx-theme/dist/cx-theme.min.css';
import '@/assets/css/public.scss';
import '../style/element-cover123/index.scss';//cover
import '@/assets/css/common.scss';
import '../static-data/iconfont/iconfont';


import '../components/ns-components/index.js';
import '../components/ns-base/index.js';
import '../components/Biz';
import nsMount from '../utils/nsQuery/nsMount';


import 'cx-grid/dist/cx-grid.min.css';
import nsGrid from 'cx-grid/dist/cx-grid.min';
import cellFifter from '../components/Biz/Biz-grid/cell-fifter';
import rulesInfo from '../utils/validate/rulesInfo';

import nsui from 'ns-form-components/lib/ns-ui.min.js';
import 'ns-form-components/lib/index.css';


Vue.use(ElementUI);

Vue.use(nsui, {
  prefix: 'ns', //stage name
  tie: '-',
  log: false, //show log information
  type: 'globle',
});
Vue.use(nsGrid, {stageName: 'ns', stageNamelink: '-', fifter: cellFifter, validate: rulesInfo});
Vue.use(nsMount);
