/*
 * Type of data handle for axios-api
 * You can use those fun in help js
 * created: 2017/9/30.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
/*==========================================================================================================================*/
import axios from 'axios';
import {Message} from 'element-ui';
import {fileFlowDistribute, flowTypeList} from './fileFlowDistribute';
import requestHead from '../../store/modules/Common/RequestHeader'


console.log('当前运行环境：', process.env);
console.log(requestHead.state.base);

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000,
  withCredentials: true,
  headers: requestHead.state.base
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  // response => response,
  response => {
    const headers = response.headers;
    //distribution according to content-type
    if (headers && flowTypeList.some(item => item === headers['content-type'])) {
      //file flow distribute handle
      fileFlowDistribute(response, response => {
        return response;
      });
    } else {
      const resData = response.data;
      if (resData && (resData.resultCode === '200' || resData.resultCode === 200)) {
        return Promise.resolve(resData);

      } else {
        service.redirect(resData.resultMsg);
        Message({message: resData.resultMsg, type: 'error', duration: 2000}); //throw message error
        return Promise.reject(resData);
      }
    }
  },
  error => {
    if (error.resultMsg) {
      Message({message: error.resultMsg, type: 'error', duration: 2000}); //throw message error
    } else if (error.response.data.message === 'GENERAL') {
      Message({message: '服务正在重启', type: 'error', duration: 2000}); //throw message error
    }
    let errorInfo = error.data.error ? error.data.error.message : error.data;
    service.redirect(error.message);
    return Promise.reject(errorInfo);
  }
);

//cookie过期重定向登录
service.redirect = message => {
  if (
    message &&
    (message.indexOf('没有token') > 0 || message.indexOf('pre:PermissionFilter') > 0)
  ) {
    window.location.href = window.location.origin + '/Front/login';
  }
};
export default service;
