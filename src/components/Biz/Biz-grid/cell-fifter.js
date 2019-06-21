export default {
  /**
   * grid cell fifter function
   * @param val
   * @param key
   * @returns {*}
   */
  cellFifter: (val, key) => {
    if (key === 'fifter') {
      if (val === 0) {
        return '否';
      } else if (val === 1) {
        return '是';
      } else {
        return val;
      }
    }
    // 房产管理-锁定状态
    if (key === 'isLock') {
      if (val === 0) {
        return '未锁定';
      } else if (val === 1) {
        return '已锁定';
      } else {
        return val;
      }
    }
    if (key === 'syFlag' || key === 'isActived') {
      if (val === '0') {
        return '否';
      } else if (val === '1') {
        return '是';
      } else {
        return val;
      }
    }
    if (key === 'userState') {
      if (val === '0') {
        return '离职';
      } else if (val === '1') {
        return '在职';
      } else {
        return val;
      }
    }
    if (key === 'productCode') {
      if (val === '0') {
        return '幸福里';
      } else if (val === 'NSPAY') {
        return '收费易';
      } else {
        return val;
      }
    }
    if (key === 'payStatus') {
      const map = {
        '0': '申请购买',
        '1': '待支付',
        '2': '支付成功',
        '3': '支付失败',
        '4': '取消订单',
      };
      return map[val] ? map[val] : val;
    }
    //soss - 订单 - 是否开通
    if (key === 'serviceWork') {
      const map = {
        '0': '待开通',
        '1': '已开通',
        '2': '关闭',
        '3': '已取消',
      };
      return map[val] ? map[val] : val;
    }
    //soss - 公告 - 栏目
    if (key === 'noticeType') {
      const map = {
        0: '常见问题',
        10: '新手学堂',
        20: 'SOOS系统',
        30: 'SAAS系统',
      };
      return map[val] ? map[val] : val;
    }
    return val;
  },
};
