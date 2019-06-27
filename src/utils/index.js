/**
 * judge type accurate
 * @param value
 * @returns {*}
 */
export const judgeType = value => {
  const t = Object.prototype.toString.call(value);
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (value instanceof Element) {
    return 'element';
  }
  return map[t];
};


/**
 * addEventListener（绑定Dom元素的监听事件）
 * @param target  监听对象
 * @param type    监听函数类型，如 click,mouseover
 * @param func    监听函数
 */

export const addEventHandler = (target, type, func) => {
  if (target.addEventListener) {
    target.addEventListener(type, func, false);
  } else if (target.attachEvent) {
    target.attachEvent('on' + type, func);
  } else {
    target['on' + type] = func;
  }
};

/**
 * removeEventHandler （移除Dom元素的监听事件）
 * target：监听对象
 * type：监听函数类型，如click,mouseover
 * func：监听函数
 */

export const removeEventHandler = (target, type, func) => {
  if (target.removeEventListener) {
    target.removeEventListener(type, func, false);
  } else if (target.detachEvent) {
    target.detachEvent('on' + type, func);
  } else {
    delete target['on' + type];
  }
};

/**
 * stop propagation
 * @param e
 */
export const stopPropagation = e => {
  if (e && e.stopPropagation) {
    e.stopPropagation(); //W3C stop propagation
  } else {
    window.event.cancelBubble = true; //IE stop propagation
  }
};


/**
 * judge object is empty
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = obj => {
  return Object.keys(obj).length === 0;
};

