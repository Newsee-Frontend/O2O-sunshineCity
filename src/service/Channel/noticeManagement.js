import { dataFilter } from '../../utils/fetch/fetchDataType';
import fetch from '../../utils/fetch/fetch';

export function saveNotice(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/o2o/notice/saveNotice',
    method: 'post',
    data: query
  });
};


export function getNotice(query) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/o2o/notice/detailNotice',
    method: 'post',
    data: query
  });
};
