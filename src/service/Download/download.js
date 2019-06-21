/*
 * fetch for Vue
 * created: 2018/2/10.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
/*==========================================================================================================================*/
import fetch from '@/utils/fetch/fetch';
import { dataFilter } from '@/utils/fetch/fetchDataType';
import $store from '../../store/index';

/*==========================================================================================================================*/

/**
 * download Excel
 * @param query
 */
export function download(query) {
  //Filter data
  dataFilter(query);
  //fetch out
  return fetch({
    url: '/fastdfs/fastdfs/downloadFile',
    method: 'get',
    params: query,
    responseType: 'blob',
  });
}

/**
 * download Excel for each modules pages
 * @param query - searchConditions
 */
export function downloadExcel(url, parmas) {
  //Filter data
  dataFilter(parmas);
  //fetch out
  return fetch({
    url:  url,
    method: 'post',
    data: parmas,
    responseType: 'blob',
  });
}

//===========================export excel for reporting modules================================
/**
 * download Excel for houseInfo and changeInfo(房产信息汇总表、房产变动信息表)
 * @param query - searchConditions
 */
export function exportHouseInfoExcel(query) {
  //Filter data
  dataFilter(query);
  //fetch out
  return fetch({
    url: '/owner/report/export-excel',
    method: 'post',
    data: query,
    responseType: 'blob',
  });
}

/**
 * download Excel for collectionRate(收缴率统计表)
 * @param query - searchConditions
 */
export function exportCollectionRateExcel(query) {
  //Filter data
  dataFilter(query);
  //fetch out
  return fetch({
    url: '/charge/reporting/collectionRate/export',
    method: 'post',
    data: query,
    responseType: 'blob',
  });
}

/**
 * download Excel for oweDetail(欠费明细报表)
 * @param query - searchConditions
 */
export function exportOweDetailExcel(query) {
  //Filter data
  dataFilter(query);
  //fetch out
  return fetch({
    url: '/charge/reporting/oweDetail/export',
    method: 'post',
    data: query,
    responseType: 'blob',
  });
}

/**
 * download Excel for day payment(收银日报表)
 * @param query - searchConditions
 */
export function exportDayPaymentExcel(query) {
  //Filter data
  dataFilter(query);
  //fetch out
  return fetch({
    url: '/bill/paymentChargePay/daypayment-export',
    method: 'post',
    data: query,
    responseType: 'blob',
  });
}

/**
 * download Excel for payment(应收款明细报表)
 * @param query - searchConditions
 */
export function exportPaymentExcel(query) {
  //Filter data
  dataFilter(query);
  //fetch out
  return fetch({
    url: '/charge/payment/payment-export',
    method: 'post',
    data: query,
    responseType: 'blob',
  });
}

/**
 * download Excel for charge details(收款明细汇总表)
 * @param query - searchConditions
 */
export function exportChargeDetailsExcel(query) {
  //Filter data
  dataFilter(query);
  //fetch out
  return fetch({
    url: '/bill/export/export-payment-report',
    method: 'post',
    data: query,
    responseType: 'blob',
  });
}

/**
 * download Excel for day closing report(交账报表)
 * @param query - searchConditions
 */
export function exportDayClosingExcel(query) {
  //Filter data
  dataFilter(query);
  //fetch out
  return fetch({
    url: '/bill/export/export-report',
    method: 'post',
    data: query,
    responseType: 'blob',
  });
}
