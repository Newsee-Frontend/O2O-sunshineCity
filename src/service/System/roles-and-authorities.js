/*==========================================================================================================================*/
import fetch from '../../utils/fetch/fetch';
import { dataFilter } from '../../utils/fetch/fetchDataType';

/*==========================================================================================================================*/
export function tableDataFetch(query, head) {
  //表数据-获取
  dataFilter(query);
  return fetch({
    url: '/system/role/list-role',
    method: 'post',
    data: query,
    headers: head,
  });
}

export function gridDataDelete(query, head) {
  //删除
  dataFilter(query);
  return fetch({
    url: '/system/role/delete-role',
    method: 'get',
    data: query,
    params: { roleid: query.roleid },
    headers: head,
  });
}
