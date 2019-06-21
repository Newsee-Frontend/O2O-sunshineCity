/*
 * base request data for dictionary
 * created: 2018/8/1.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2018 Broccoli spring( gcx )
 */

import { getOptionFromDictionary } from '../../../../service/Form/getOptionFromDictionary';

//base request data for dictionary
const baseQuery = {
  companyId: 2,
  departmentId: 0,
  organizationId: 3,
  dictionaryitemDictionaryId: '',
  filterList: [],
  pageNum: 1,
  pageSize: 10,
  orderBy: '',
  orderFieldName: '',
  mainSearch: '',
  filterConditions: [],
  otherConditions: {},
  size: '',
  treeConditions: [{ comparison: 'LIKE', fieldName: 'path', fieldValue: '/', type: 'text' }],
  dictionaryGroupId: '',
};

/**
 * get dynamic options form dictionary
 * @param vm
 * @param dynamicUrl
 * @param dynamicQuery
 * @param labelAsValue
 * @param modelType
 */
const getDynamicOptions = (vm, dynamicUrl, dynamicQuery, labelAsValue, modelType) => {
  baseQuery.dictionaryitemDictionaryId = dynamicQuery.dictionaryitemDictionaryId || '';
  baseQuery.dictionaryGroupId = dynamicQuery.dictionaryGroupId || '';
  vm.state = true;
  vm.options = [];
  getOptionFromDictionary(dynamicUrl, baseQuery)
    .then(response => {
      const list = response.resultData.list;
      try {
        list.forEach(item => {
          modelType = modelType === 'id' ? 'id': 'dictionaryitemItemcode';
          vm.options.push({
            label: item.dictionaryitemItemname,
            value: labelAsValue ? item.dictionaryitemItemname : item[modelType],
          });
        });
      } catch (e) {
        vm.options = [];
      }
      vm.state = false;
    })
    .catch(err => {
      vm.options = [];
    });
};

export default getDynamicOptions;
