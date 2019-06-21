/**
 * grid cell fifter function
 * @param val
 * @param key
 * @returns {*}
 */
const activestatueOptions = [{ label: '暂存', value: 0 }, { label: '已发布', value: 1 }, { label: '已结束', value: 2 }];
export default (val, key) => {
  if (key === 'sex') {
    if (val === '1') {
      return '男';
    }
    else if (val === '2') {
      return '女';
    }
    else {
      return val;
    }
  }

  if(key === 'status'){
    let activestatue = activestatueOptions.find((item) => {
      return item.value === val
    });
    return activestatue? activestatue.label : ''
  }

  return val;
}
