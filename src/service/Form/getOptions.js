import { dataFilter } from '../../utils/fetch/fetchDataType';
import fetch from '../../utils/fetch/fetch';

export function  getVillageOptions(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/o2o/precinct/getPrecinctNameList',
    method: 'post',
    data: query
  });
}

export function getAreaList(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/o2o/activity/getArea',
    method: 'post',
    data: query,
    params: query
  })
};

export function getPrecinct(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/o2o/precinct/getPrecinctByArea',
    method: 'post',
    data: query,
    params: query
  })
}
