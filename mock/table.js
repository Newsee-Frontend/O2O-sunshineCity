const Mock = require('mockjs');

//table data
let tableDataTemplate = [...new Array(100)].map((item, index) => {
  return Mock.mock({
    taskName: function(n) {
      const task = n.context.currentContext.ownerName;
      return task + '的项目';
    },//项目名称
    isChecked: {
      picked: { value: 1 },
      options: [{ label: '已审核', value: 1 }, { label: '未审核', value: 0 }],
    },//是否审核
    createDate: '@datetime',//成立日期
    ownerName: '@cname',//使用人
    level: Mock.Random.float(1, 100, 0, 1),//等级调整
    field: {
      picked: { value: [1] },
      options: [
        { label: '互联网', value: 1 },
        { label: '电子芯片', value: 2 },
        { label: '传统制造', value: 3 },
        { label: '物联网', value: 4 },
        { label: '广告服务', value: 5 },
      ],
    },//涉猎领域（多选）
    isLocked: {
      picked: { value: 1 },
      options: [{ 'label': '是', 'value': 1 }, { 'label': '否', 'value': 0 }],
    },//是否锁定（单选）
    remark: '',//备注 Mock.Random.county(true)
  });
});
//table column data
let systemColumn = {
  '2DEJjvjOcDM5caR4bce': {
    'columns': [{
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'bUGjh3vau3ZLtO6XlIy',
      'resourcecolumnFuncinfoId': '2DEJjvjOcDM5caR4bce',
      'resourcecolumnName': '员工名称',
      'resourcecolumnNameEn': 'userName',
      'resourcecolumnCode': 'userName',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '100',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': '00WaKLMkDDaHVAk7FPm',
      'resourcecolumnFuncinfoId': '2DEJjvjOcDM5caR4bce',
      'resourcecolumnName': '组织简称',
      'resourcecolumnNameEn': 'organizationShortName',
      'resourcecolumnCode': 'organizationShortName',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '110',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': '3sqL6Uv54vBB8AfmZ3K',
      'resourcecolumnFuncinfoId': '2DEJjvjOcDM5caR4bce',
      'resourcecolumnName': '员工账号',
      'resourcecolumnNameEn': 'userAccount',
      'resourcecolumnCode': 'userAccount',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '120',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'SMD40Oh0QC0KllygowL',
      'resourcecolumnFuncinfoId': '2DEJjvjOcDM5caR4bce',
      'resourcecolumnName': '手机号',
      'resourcecolumnNameEn': 'userTelephone',
      'resourcecolumnCode': 'userTelephone',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '120',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': '36jh2rrQIvGGeFDPZxx',
      'resourcecolumnFuncinfoId': '2DEJjvjOcDM5caR4bce',
      'resourcecolumnName': '在职状态',
      'resourcecolumnNameEn': 'userState',
      'resourcecolumnCode': 'userState',
      'resourcecolumnXtype': 'select',
      'resourcecolumnWidth': '112',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': [{
        'label': '在职',
        'value': '1',
      }, {
        'label': '离职',
        'value': '0',
      }],
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'HLRWgtwHwDXTozkZlxU',
      'resourcecolumnFuncinfoId': '2DEJjvjOcDM5caR4bce',
      'resourcecolumnName': '启用状态',
      'resourcecolumnNameEn': 'isActived',
      'resourcecolumnCode': 'isActived',
      'resourcecolumnXtype': 'select',
      'resourcecolumnWidth': '108',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': [{
        'label': '停用',
        'value': '0',
      }, {
        'label': '启用',
        'value': '1',
      }],
    }],
    'columnsEnNames': {
      'userState': '',
      'isActived': '',
    },
  },
  'QEPbzP61apaxqC34rp5': {
    'columns': [{
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'xIkf4jXEr6AuMgNEMeT',
      'resourcecolumnFuncinfoId': 'QEPbzP61apaxqC34rp5',
      'resourcecolumnName': '角色名称',
      'resourcecolumnNameEn': 'rolename',
      'resourcecolumnCode': 'rolename',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '140',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'Ev9gIC1pdBnAc3ccq9t',
      'resourcecolumnFuncinfoId': 'QEPbzP61apaxqC34rp5',
      'resourcecolumnName': '所属组织',
      'resourcecolumnNameEn': 'organizationName',
      'resourcecolumnCode': 'organizationName',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '140',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'ZUnhaXoNfEMdyPg38lo',
      'resourcecolumnFuncinfoId': 'QEPbzP61apaxqC34rp5',
      'resourcecolumnName': '角色组',
      'resourcecolumnNameEn': 'rolecategoryName',
      'resourcecolumnCode': 'rolecategoryName',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '110',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'G5cjHVsuYqBZ1mCgzBQ',
      'resourcecolumnFuncinfoId': 'QEPbzP61apaxqC34rp5',
      'resourcecolumnName': '授权人',
      'resourcecolumnNameEn': 'authorizerNames',
      'resourcecolumnCode': 'authorizerNames',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '270',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }],
    'columnsEnNames': {},
  },
  'cpZKRalyjMljdbsgAC4': {
    'columns': [{
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'FkJ6zhKDYt7fN4LhZTz',
      'resourcecolumnFuncinfoId': 'cpZKRalyjMljdbsgAC4',
      'resourcecolumnName': '名称',
      'resourcecolumnNameEn': 'dictionaryitemItemname',
      'resourcecolumnCode': 'dictionaryitemItemname',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '120',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'Q6RLqvJls6l3XKSh6Ms',
      'resourcecolumnFuncinfoId': 'cpZKRalyjMljdbsgAC4',
      'resourcecolumnName': '所属字典',
      'resourcecolumnNameEn': 'dictionaryDdname',
      'resourcecolumnCode': 'dictionaryDdname',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '140',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'AR3h4xYvttJ2BMXn06T',
      'resourcecolumnFuncinfoId': 'cpZKRalyjMljdbsgAC4',
      'resourcecolumnName': '值',
      'resourcecolumnNameEn': 'dictionaryitemItemcode',
      'resourcecolumnCode': 'dictionaryitemItemcode',
      'resourcecolumnXtype': 'text',
      'resourcecolumnWidth': '194',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': null,
    }, {
      'enterpriseId': 767,
      'eidtConfig': null,
      'organizationId': 263,
      'jeCoreResourcecolumnId': 'CmvvTkBh43TqcNoN7BL',
      'resourcecolumnFuncinfoId': 'cpZKRalyjMljdbsgAC4',
      'resourcecolumnName': '启用状态',
      'resourcecolumnNameEn': 'syFlag',
      'resourcecolumnCode': 'syFlag',
      'resourcecolumnXtype': 'select',
      'resourcecolumnWidth': '220',
      'resourcecolumnFieldorderindex': 0.00,
      'resourcecolumnMorecolumnname': '',
      'resourcecolumnStatisticstype': '',
      'resourcecolumnAllowedit': '0',
      'resourcecolumnColumntip': '0',
      'resourcecolumnOrder': '0',
      'resourcecolumnHidden': '0',
      'selectList': [{
        'label': '停用',
        'value': '0',
      }, {
        'label': '启用',
        'value': '1',
      }],
    }],
    'columnsEnNames': {
      'syFlag': '',
    },
  },
  '033333333333': {
    columns: [
      {
        'resourcecolumnName': '项目名称',//label
        'resourcecolumnNameEn': 'taskName',//model-key
        'resourcecolumnCode': 'taskName',//model-key
        'resourcecolumnXtype': 'text',//筛选列 类型
        'resourcecolumnWidth': '200',//列的宽度
        'resourcecolumnOrder': '4',//列的序号
        'resourcecolumnHidden': '0', //是否隐藏
        'eidtConfig': {
          'switchType': true,
          'type': 'link',
          'decimal': 2,
          'disabled': false,
          'maxlength': null,
          'max': 0,
          'min': 0,
          'placeHolder': '',
          'require': true,
          'validateRule': null,
          'errorMsg': '',
        },
      },
      {
        'resourcecolumnName': '是否审核',//label
        'resourcecolumnNameEn': 'isChecked',//model-key
        'resourcecolumnCode': 'isChecked',//model-key
        'resourcecolumnXtype': 'text',//筛选列 类型
        'resourcecolumnWidth': '120',//列的宽度
        'resourcecolumnOrder': '4',//列的序号
        'resourcecolumnHidden': '0', //是否隐藏
        'eidtConfig': {
          'switchType': true,
          'type': 'select',
          'decimal': 2,
          'disabled': false,
          'maxlength': null,
          'max': 0,
          'min': 0,
          'placeHolder': '请选择',
          'require': true,
          'validateRule': null,
          'errorMsg': '请选择是否审核',
        },
      },
      {
        'resourcecolumnName': '成立日期',//label
        'resourcecolumnNameEn': 'createDate',//model-key
        'resourcecolumnCode': 'createDate',
        'resourcecolumnXtype': 'text',//筛选列 类型
        'resourcecolumnWidth': '150',//列的宽度
        'resourcecolumnOrder': '7',//列的序号
        'resourcecolumnHidden': '0', //是否隐藏
        'eidtConfig': {
          'switchType': true,
          'type': 'date',
          'decimal': 2,
          'disabled': false,
          'maxlength': null,
          'max': 0,
          'min': 0,
          'placeHolder': null,
          'require': true,
          'validateRule': null,
          'errorMsg': '请选择成立日期',
        },
      },
      {
        'resourcecolumnName': '等级调整',//label
        'resourcecolumnNameEn': 'level',//model-key
        'resourcecolumnCode': 'level',
        'resourcecolumnXtype': 'text',//筛选列 类型
        'resourcecolumnWidth': '150',//列的宽度
        'resourcecolumnOrder': '10',//列的序号
        'resourcecolumnHidden': '0', //是否隐藏
        'eidtConfig': {
          'switchType': true,
          'type': 'rate',
          'decimal': 2,
          'disabled': false,
          'maxlength': null,
          'max': 100,
          'min': 0,
          'placeHolder': null,
          'require': true,
          'validateRule': null,
        },
      },
      {
        'resourcecolumnName': '涉猎领域（多选）',//label
        'resourcecolumnNameEn': 'field',//model-key
        'resourcecolumnCode': 'field',
        'resourcecolumnXtype': 'text',//筛选列 类型
        'resourcecolumnWidth': '500',//列的宽度
        'resourcecolumnOrder': '5',//列的序号
        'resourcecolumnHidden': '0', //是否隐藏
        'eidtConfig': {
          'switchType': true,
          'type': 'checkbox',
          'decimal': 2,
          'disabled': false,
          'maxlength': null,
          'max': 5,
          'min': 0,
          'placeHolder': null,
          'require': true,
          'validateRule': null,
          'errorMsg': '请选择涉猎领域',
        },
      },
      {
        'resourcecolumnName': '是否锁定（单选）',//label
        'resourcecolumnNameEn': 'isLocked',//model-key
        'resourcecolumnCode': 'isLocked',
        'resourcecolumnXtype': 'text',//筛选列 类型
        'resourcecolumnWidth': '150',//列的宽度
        'resourcecolumnOrder': '4',//列的序号
        'resourcecolumnHidden': '0', //是否隐藏
        'eidtConfig': {
          'switchType': true,
          'type': 'radio',
          'decimal': 2,
          'disabled': false,
          'maxlength': null,
          'max': null,
          'min': null,
          'placeHolder': null,
          'require': true,
          'validateRule': null,
          'errorMsg': '请选择是否锁定',
        },
      },
      {
        'resourcecolumnName': '使用人',//label
        'resourcecolumnNameEn': 'ownerName',//model-key
        'resourcecolumnCode': 'ownerName',//model-key
        'resourcecolumnXtype': 'text',//筛选列 类型
        'resourcecolumnWidth': '100',//列的宽度
        'resourcecolumnOrder': '5',//列的序号
        'resourcecolumnHidden': '0', //是否隐藏
      },
      {
        'resourcecolumnName': '备注',//label
        'resourcecolumnNameEn': 'remark',//model-key
        'resourcecolumnCode': 'remark',
        'resourcecolumnXtype': 'text',//筛选列 类型
        'resourcecolumnWidth': '300',//列的宽度
        'resourcecolumnOrder': '8',//列的序号
        'resourcecolumnHidden': '0', //是否隐藏
        'eidtConfig': {
          'switchType': true,
          'type': 'input',
          'decimal': 2,
          'disabled': false,
          'maxlength': null,
          'max': 0,
          'min': 0,
          'placeHolder': '请输入备注',
          'require': true,
          'validateRule': '',
          'errorMsg': '',
        },
      },
    ],
    columnsEnNames: {
      hasRelevance: '',
      isBlockUp: '',
      isLock: '',
      isVirtual: '',
      roomPropertyId: '',
      roomTypeId: '',
    },
  },
};


const tableData = (req, res) => {
  const { pageNum, pageSize } = req.body;
  const list = tableDataTemplate.slice((pageNum - 1) * pageSize, pageSize * pageNum);
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: {
      list: list,
      'pageNum': 1,
      'pageSize': 10,
      'size': 10,
      'total': 100,
      'nextPage': 2,
      'lastPage': 8,
    },
  });
};

const listColumn = (req, res) => {
  const funcId = req.headers.funcid;
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: systemColumn[funcId],
    pageNum: null,
    pageSize: null,
    total: null,
  });
};

module.exports = {
  'GET /system/column/list-column': listColumn,
  'POST /system/table/table-data': tableData,
};

