/*==========================================================================================================================*/
import fetch from '../../utils/fetch/fetch';
import { dataFilter } from '../../utils/fetch/fetchDataType';

/*==========================================================================================================================*/
export function tableDataFetch(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/property-service/property-rest/rest/precinct/listPrecinct',
    method: 'post',
    data: query
  });
};


export function getPhoneList(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/property-service/property-rest/rest/precinct/getServicePhoneList',
    method: 'post',
    data: query
  });
};

export function saveServicePhoneList(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/property-service/property-rest/rest/precinct/saveServicePhoneList',
    method: 'post',
    data: query
  });
};

export function delServicePhone(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/property-service/property-rest/rest/precinct/delServicePhone',
    method: 'post',
    data: query
  });
};



export function checkhouse(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/property-service/property-rest/rest/precinct/checkHouse',
    method: 'post',
    data: query
  });
};

export function getPrecinctInfo(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/property-service/property-rest/rest/precinct/getPrecinct',
    method: 'post',
    data: query
  });
};

export function savePrecinctInfo(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: 'property-service/property-rest/rest/precinct/savePrecinct',
    method: 'post',
    data: query
  });
};
