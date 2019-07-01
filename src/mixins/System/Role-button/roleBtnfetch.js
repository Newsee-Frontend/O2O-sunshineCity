import { roleButtonList } from '../../../service/Role/role-button';
import ns from '../../../utils/nsQuery/nsQuery';
import $store from '../../../store/index';

/**
 * get new role button-list
 * @param oldList
 * @returns {Array}
 * @private
 */
function _getRoleButtonList(oldList) {
  if (!oldList || ns.base.isEmpty(oldList)) {
    return [];
  }
  const arr = [];
  oldList.forEach(item => {
    arr.push({
      code: item.resourcebuttonCode, //按钮编码
      name: item.resourcebuttonName, //按钮名称
      nameEn: item.resourcebuttonNameEn, //按钮英文名称
      areaType: item.resourcebuttonType, //按钮区域类型
      index: item.syOrderindex, //排序号
      btnType: item.resourcebuttonBigiconcls, //按钮类型 （single / dropDown）
      hide: item.resourcebuttonHidden === '1', //是否隐藏
    });
  });
  return arr;
}

/**
 * get role button list
 * @param head
 * @param cb
 * @param errcb
 * @private
 */
export function roleButtonListOperation(head) {
 return roleButtonList(head)
    .then(response => {
      const role = _getRoleButtonList(response.resultData);
      $store.dispatch('setRoleButtonList',role ); //set new role button-list
    });
}
