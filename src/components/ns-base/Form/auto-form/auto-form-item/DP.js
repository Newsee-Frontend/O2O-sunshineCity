import ns from '../../../../../utils/nsQuery/nsQuery';
import keyRefer from '../keyRefer';

const refer = Symbol('refer');
const canCoverList = Symbol('canCoverList');

/**
 * data processing
 */
class DP {
  [canCoverList] = () => {
    const Canlist = [
      'item-type',
      'second-type',
      'third-type',
      'width',
      'height',
      'label-width',
      'label',
      'freedom',
      'required',
      'require-msg',
      'rules',
      'rules-type',
      'placeholder',
      'disabled',
      'readonly',
      'editable',
      'clearable',
      'colspan',
      'rowspan',
      'items',
      'max',
      'min',
      'step',
      'icon',
      'group-name',
      'hidden',
      'scale',
      'tableHead',
      'pickerOptions',
      'format',
      'value-format',
      'dynamicUrl',
      'dynamicQuery',
      'dynamicSrc',
      'fnList',
    ];
    return Canlist;
  };

  [refer] = (vm, prop) => {
    const fieldsRefer = keyRefer.fields; //fields 指代属性
    const infoRefer = keyRefer.info; //info 指代属性
    return {
      info: vm.formData.info,
      infoKey: infoRefer[prop],
      fieldsKey: fieldsRefer[prop],
    };
  };

  /**
   * dataSources ( choice data( property value ) in cover-data > field-data )
   * @param vm             auto-form component
   * @param formitem       field data
   * @param prop           property-key in fields-refer
   * @returns {*}
   */
  dataSources = (vm, formitem, prop) => {
    const Refer = this[refer];
    const info = Refer(vm, prop).info;
    const infoKey = Refer(vm, prop).infoKey;
    const fieldsKey = Refer(vm, prop).fieldsKey;
    const modelKey = formitem[Refer(vm, 'model-key').fieldsKey]; //field=>resourcefieldCode 对应 model-data 的值
    const canCoverSW = ns.base.arrContainObj(this[canCoverList](), prop);
    //cover-data
    if (_isCoverDataSet.apply(this, [vm, fieldsKey, modelKey]) && canCoverSW) {
      return vm.coverData[fieldsKey][modelKey]; //use cover data
    } else {
      //fields data
      if (isfieldsDataSet.call(this, formitem, fieldsKey)) {
        return formitem[fieldsKey];
      } else {
        //help-config data
        const otherConfigKey = this[refer](vm, 'other-config').fieldsKey;
        if (isOtherConfigDataSet.call(this, formitem, fieldsKey, otherConfigKey)) {
          return formitem[Refer(vm, 'other-config').fieldsKey][fieldsKey]; //=>use data in 'help-config'
        } else {
          //info data
          if (info.hasOwnProperty(infoKey)) {
            return info[infoKey];
          }
        }
      }
    }
  };

  /**
   * component-width calculation
   * @param formitem            field data
   * @param allWidth            all width (label + content )
   * @returns {*}
   */
  componentWidth = (vm, formitem) => {
    let allWidth = this.dataSources(vm, formitem, 'width');
    let lw = parseInt(this.dataSources(vm, formitem, 'label-width'));
    //not exits = > 0
    allWidth = ns.base.isExitsVariable(allWidth) && !isNaN(allWidth) ? allWidth : 0;
    lw = ns.base.isExitsVariable(lw) && !isNaN(lw) ? lw : 0;
    //judge label-width and all-width , which one is larger
    if (allWidth >= lw) {
      //no label-components' width is all-width
      return ns.base.arrContainObj(vm.noLabelList, this.dataSources(vm, formitem, 'item-type'))
        ? allWidth
        : allWidth - lw;
    } else {
      const modelKey = this.dataSources(vm, formitem, 'model-key');
      const itemType = this.dataSources(vm, formitem, 'item-type');
      throw 'The error in this components ( model-key: ' +
        modelKey +
        ', item-type: ' +
        itemType +
        ' ), all-width is should be larger than label-width, ' +
        'you better find it';
    }
  };
}

export default new DP();

/**
 * judge whether property-value is loaded from cover-data
 * @param vm             auto-form component
 * @param key           property - key in field
 * @param modelKey      model - key
 * @returns {boolean}
 */
let _isCoverDataSet = (vm, key, modelKey) => {
  if (ns.base.judgeType(vm.coverData) === 'object') {
    //judge hasOwnProperty this key
    return vm.coverData.hasOwnProperty(key)
      ? vm.coverData[key].hasOwnProperty(modelKey)
        ? true
        : false
      : false;
  } else {
    return false;
  }
};

/**
 * judge whether property-value is loaded from fields-Data
 * @param formitem           property - key in field
 * @param fieldsKey          fields-property Key
 * @returns {boolean}
 */
let isfieldsDataSet = (formitem, fieldsKey) => {
  //judge field-data have property key or not ( field-data中是否有对应的字段 )
  return formitem.hasOwnProperty(fieldsKey) ? true : false;
};

/**
 * judge whether property-value is loaded from otherConfig-Data
 * @param formitem           property - key in field
 * @param fieldsKey          fields-property Key
 * @returns {boolean}
 */
let isOtherConfigDataSet = (formitem, fieldsKey, otherConfigKey) => {
  if (formitem.hasOwnProperty(otherConfigKey)) {
    //formitem have propetry ( help-config )
    const otherConfigObj = formitem[otherConfigKey];
    //help-config is exits and the type of it is object
    if (ns.base.judgeType(otherConfigObj) === 'object') {
      // judge help-config has this propetry
      return otherConfigObj.hasOwnProperty(fieldsKey);
    } else {
      return false;
    }
  } else {
    return false;
  }
};
