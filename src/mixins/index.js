import funcId from './Common/FuncId';
import other from './other';
import roleButton from './system/Role-button/index';
import searchConditions from './search-conditions';


import table from './system/Table';

export default {
  mixins: [funcId, other, roleButton, searchConditions, table],
};

