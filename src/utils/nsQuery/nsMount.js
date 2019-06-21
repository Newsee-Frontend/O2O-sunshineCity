/*=====================================================================================================================*/
/*
 * auxiliary for Vue
 * With the wrapper function below, you can use the Vue extension function more quickly
 * created: 2017/7/3.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
/*=====================================================================================================================*/
import ns from './nsQuery';
import $store from '../../store/index';
import { autoForm, autoFormSubmit } from '../../service/Form/auto-form';
import tableHeadMap from '../../static-data/table/table-head';
import { tableDataFetch } from '../../service/TableFetch/table-fetch';

/**
 * create params for validate/reset
 * @param formName
 * @returns {{vm, formData, formName: *}}
 */
function _createParams(formName) {
  const vm = store.vm.get(formName);
  return {
    vm: vm, //vue
    formData: vm.formData, //formData
    formName: formName, //form name
  };
}

export default {
  install: function(Vue, options) {
    //autoForm
    Vue.prototype.autoForm = {
      /**
       * create auto-form data
       * @param url
       * @param requestHead
       * @param query
       * @param cb            success callback function
       */
      create: (url, requestHead, query, cb) => {
        autoForm(url, requestHead, query)
          .then(response => {
            cb(response.resultData);
          })
          .catch(response => {
            return Promise.reject(response);
          });
      },
      /**
       * auto-form submit
       * @param url
       * @param query
       * @param cb       success callback function
       */
      submit: (url, query) => {
        return autoFormSubmit(url, query)
          .then(response => {
            console.log('表单提交成功！！');
            console.log(response);
            return response.resultData;
          })

      },
      /**
       * validate
       * @param formName
       */
      validate: formName => {
        return new Promise((resolve, reject) => {
          let cp = _createParams(formName);
          console.log('提交数据如下：');
          console.log(cp.formData.modelData);
          // console.log(JSON.stringify(cp.formData.modelData, null, 4));
          cp.vm.$refs[formName].validate(valid => {
            //表单提交添加'all-check' 标识到checkList中，开启第一级验证开关（即对所有自定义验证的表单进行验证）。
            cp.vm.$store.dispatch('setCustomCheck', 'all-check'); //多张表单 存在bug
            if (valid && ns.base.checkRange('.ns-form', '.ns-is-error')) {
              console.log('表单验证成功');
              resolve(cp);
            } else {
              console.log('表单验证失败');
              reject();
            }
          });
        });
      },
      /**
       * auto form reset
       * @param formName
       */
      resetForm: formName => {
        return new Promise((resolve, reject) => {
          const cp = _createParams(formName);
          //element base reset function
          cp.vm.$refs[formName].resetFields();
          cp.vm.$store.dispatch('setCustomCheck', 'no-check');
          resolve(cp);
        });
      },
      /**
       * element base reset function
       * @param formName
       */
      elResetForm(formName) {
        const cp = _createParams(formName);
        cp.vm.$refs[formName].resetFields();
      },

      /**
       * delete fields item (删除fields列表中特定字段的所在条目)
       * @param fields
       * @param key
       * @param delList
       */
      delFieldsItem(fields, key, delList) {
        return fields.filter((item, index) => {
          const k = item[key];
          if (!ns.base.arrContainObj(delList, k)) {
            console.log(k);
            return item;
          }
        });
      },

      /**
       * judge current model-data and init model-data is equal ( data is changed or not )
       * @param formId          form id
       * @returns {*|boolean}
       */
      judgeDataIsChange(formId) {
        let params = _createParams(formId);
        const modelData = params.formData.modelData; //current model-data
        const init = $store.state.Form.control.initModelData; //init model-data
        return ns.base.isEqual(init, modelData);
      },

      /**
       * convert width / height - units
       * @param val
       * @param type
       * @param base
       * @returns {*}
       */
      convertUnits: function(val, type, base) {
        if (val || val === 0) {
          if (ns.base.judgeType(val) === 'number') {
            return val + 'px';
          } else if (ns.base.judgeType(val) === 'string') {
            return val;
          } else {
            throw 'the value of the units must be string or number format ，you better find it';
          }
        } else {
          if (type) {
            if (base) {
              return base;
            } else {
              return type === 'width' ? '100%' : null;
            }
          } else {
            throw "in function of 'convertUnits', you should set type-value to tell this function " +
              'which style ( width / height ) you went to set value.';
          }
        }
      },
      /**
       * get table-head data from local static data
       * @param name          //table-head-name(key) && the value of this TableFetch'area-linkage v-model
       */
      getTableHead: name => {
        const data = tableHeadMap;
        return data[name];
      },

    };
    //grid
    Vue.prototype.grid = {
      //请求表格的内容数据
      fetch: (requestData, successcb, errorcb) => {
        // $store.dispatch('tableDataFetch', {gridID, url, query});
        //requestData.query.isSwitch 房产信息汇总表和房产变动信息表表格单元链接跳转查询参数开关
        tableDataFetch(
          requestData.url,
          requestData.query,
          requestData.funcId,
          requestData.params,
        )
          .then(res => {
            successcb(res.resultData);
          })
          .catch(res => {
            errorcb(res);
          });
      },
      /**
       * grid validate
       * @param gridCheck
       * @returns {Promise<any>}
       */
      validate: gridCheck => {
        return new Promise((resolve, reject) => {
          try {
            gridCheck.state = 'all-check';
            let status = false;
            let submitHandle = () => {
              status = ns.base.checkRange('.grid-container', '.cx-is-error');
              if (status) {
                window.clearTimeout(submitHandle);
                resolve(gridCheck);
              } else {
                window.clearTimeout(submitHandle);
                reject(gridCheck);
              }
            };
            setTimeout(submitHandle, 0);
          } catch (e) {
            // statements to handle any exceptions
            throw 'Please check the automatic grid validation method. There are some errors in the internal code.';
          }
        });
      },
      /**
       * grid reValidate
       * @param gridCheck
       * @returns {Promise<any>}
       */
      reValidate: gridCheck => {
        return new Promise((resolve, reject) => {
          try {
            gridCheck.state = 'empty-check-list';
            let resetHandle = () => {
              if (gridCheck.list.length === 0) {
                window.clearTimeout(resetHandle);
                resolve(gridCheck);
              } else {
                window.clearTimeout(resetHandle);
                reject(gridCheck);
              }
            };
            setTimeout(resetHandle, 0);
          } catch (e) {
            // statements to handle any exceptions
            throw 'Please check the automatic grid validation method. There are some errors in the internal code.';
          }
        });
      },
    };
    //search
    Vue.prototype.search = {
      //搜索条件
      conditions: {
        companyId: '', //公司id
        departmentId: '', //部门id
        organizationId: '',
        dictionaryitemDictionaryId: '',
        filterList: [], //条件
        pageNum: 1, //当前页数
        pageSize: 10, //每页显示条目个数
        orderBy: '', //排序：升序还是降序
        orderFieldName: '', //排序：字段名
        mainSearch: '', //输入框值
        filterConditions: [], //筛选器记录的条件
        otherConditions: {},
        size: '',
      },
      /**
       * makeData
       * @param isFirstShow (第一行是否显示) data (后台得到数据)
       * @param cb
       */
      makeData: (isFirstShow, data, thlist) => {
        if (isFirstShow) {
          let arry = data.resultData.list;
          arry.splice(0, 0, {});
          return arry;
        } else if (thlist.length === 0) {
          return []; //列表数据
        } else {
          return data.resultData.list; //列表数据
        }
      },
      /**
       * makeData
       * @param condition (条件) data (后台得到数据)
       * @param cb
       */
      errorSelect: (condition, data, thlist) => {
        if (thlist.length === 0) {
          return 'error';
        } else if (data.resultData.total === 0 && condition !== []) {
          return 'noResult';
        } else if (data.resultData.total === 0) {
          return 'noData';
        } else {
          return 'normal';
        }
      },
      DateFormat(time, fmt) {
        let o = {
          'M+': time.getMonth() + 1, //月份
          'd+': time.getDate(), //日
          'h+': time.getHours(), //小时
          'm+': time.getMinutes(), //分
          's+': time.getSeconds(), //秒
          'q+': Math.floor((time.getMonth() + 3) / 3), //季度
          S: time.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
        return fmt;
      },
    };
  },
};
