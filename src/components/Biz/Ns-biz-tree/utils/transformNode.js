import vue from 'vue';

/**
 * transformKeyFun
 * @param list       原始数据
 * @param keyRefer   字段配置
 * @param config     配置节点 lazy（配置懒加载）, expandedIndex（默认展示层级）,expandAllNodes是否全部展开
 * @returns {Array}
 */
const transformKeyFun = (list = [], keyRefer, config = {}) => {
  const addKeyRefer = {
    expanded: 'expanded',
    isHasChild: 'isHasChild',
    disabled: 'disabled',
  };

  let refer = Object.assign(addKeyRefer, keyRefer);


  list.forEach((item) => {
    //设置树对应的字段
    Object.keys(refer).forEach(key => {
      let hitKey = refer[key];
      vue.set(item, [key], item[hitKey]);
      // item[key] = item[hitKey];
    });

    if (
      (config.expandedIndex > 0 && !(config.lazy && item.isHasChild && item.children.length === 0))
      || config.expandAllNodes
    ) {
      vue.set(item, 'expanded', true);
    }
    else {
      vue.set(item, 'expanded', false);
    }


    if (item.children && item.children.length > 0) {
      if (config.expandedIndex > -1) config.expandedIndex--;
      transformKeyFun(item.children, keyRefer, config);
    }

    //树的懒加载
    else if (config.lazy && item.isHasChild) {
      vue.set(item, 'async', true);
    }
  });
  return list;
};


export default transformKeyFun;
