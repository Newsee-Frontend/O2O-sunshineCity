const activeGrid = (req, res) => {
  return res.json({
    "resultCode": "200",
    "resultMsg": "操作成功",
    "resultData": {
      "precinctNameList": [{
        "value": "",
        "label": ""
      }, {
        "value": "1",
        "label": "桃李春风小区"
      }, {
        "value": "5",
        "label": "浙江·杭州·学苑管家测试"
      }, {
        "value": "6",
        "label": "夏夏夏"
      }, {
        "value": "7",
        "label": "中牟百合花园"
      }, {
        "value": "8",
        "label": "第二·春江花月"
      }],
      "pageInfo": {
        "pageNum": 1,
        "pageSize": 20,
        "size": 2,
        "startRow": 1,
        "endRow": 2,
        "total": 2,
        "pages": 1,
        "list": [{
          "id": 48,
          "category": 2,
          "title": "22222",
          "picid": 1560762294055,
          "usertype": 0,
          "createuserid": 1,
          "createtime": "2019-06-14 14:45:28",
          "updateuserid": 1,
          "updatetime": "2019-06-17 17:04:53",
          "rulecategory": 1,
          "rulevalue": "{\"ruleValueID\":48,\"ruleValueName\":\"22222\"}",
          "status": 2,
          "publishtime": "2019-06-17 17:04:53",
          "publishuserid": 1,
          "publishUserName": "admin",
          "sendtype": 0,
          "ispush": 0,
          "activityStartTime": "2019-06-05 14:44:00",
          "activityEndTime": "2019-06-14 14:45:00",
          "sponsor": "zx",
          "activitySpace": "22222",
          "activityNum": 0,
          "roasting": 0,
          "bgPicId": 0,
          "recommend": 1,
          "sendToWx": 0,
          "categoryName": "系统参数",
          "content": "",
          "precinctNames": "第二·春江花月,夏夏夏,中牟百合花园,浙江·杭州·学苑管家测试",
          "listPrecinctName": ["第二·春江花月", "夏夏夏", "中牟百合花园", "浙江·杭州·学苑管家测试"],
          "precincts": [{
            "precinctName": "第二·春江花月,夏夏夏,中牟百合花园,浙江·杭州·学苑管家测试",
            "createTime": "2019-06-17 17:04:53",
            "updateTime": "2019-06-17 17:04:53",
            "serviceCall": "",
            "heatingCall": "",
            "waterCall": "",
            "electricCall": "",
            "gasCall": "",
            "precinctShortName": ""
          }]
        }, {
          "id": 49,
          "category": 2,
          "title": "zxzxzx",
          "picid": 1560759955995,
          "usertype": 0,
          "createuserid": 1,
          "createtime": "2019-06-17 16:25:55",
          "updateuserid": 1,
          "updatetime": "2019-06-17 16:25:55",
          "rulecategory": 1,
          "rulevalue": "{\"ruleValueID\":49,\"ruleValueName\":\"zxzxzx\"}",
          "status": 2,
          "publishtime": "2019-06-17 16:25:55",
          "publishuserid": 1,
          "publishUserName": "admin",
          "sendtype": 0,
          "ispush": 0,
          "activityStartTime": "2019-06-12 16:00:00",
          "activityEndTime": "2019-06-17 16:13:00",
          "sponsor": "zxzbf",
          "activitySpace": "zxhddd",
          "activityNum": 0,
          "roasting": 0,
          "bgPicId": 0,
          "recommend": 1,
          "sendToWx": 0,
          "categoryName": "系统参数",
          "content": "",
          "precinctNames": "第二·春江花月,夏夏夏,中牟百合花园,浙江·杭州·学苑管家测试",
          "listPrecinctName": ["第二·春江花月", "夏夏夏", "中牟百合花园", "浙江·杭州·学苑管家测试"],
          "precincts": [{
            "precinctName": "第二·春江花月,夏夏夏,中牟百合花园,浙江·杭州·学苑管家测试",
            "createTime": "2019-06-17 17:04:53",
            "updateTime": "2019-06-17 17:04:53",
            "serviceCall": "",
            "heatingCall": "",
            "waterCall": "",
            "electricCall": "",
            "gasCall": "",
            "precinctShortName": ""
          }]
        }],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 0,
        "lastPage": 1,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [1]
      },
      "userType": 1
    }
  })
};

const  notice = (req, res) => {
  return res.json({
    "resultCode": "200",
    "resultMsg": "操作成功",
    "resultData": {
      "id": 48,
      "category": 2,
      "title": "22222",
      "picid": 1560762294055,
      "usertype": 0,
      "createuserid": 1,
      "createtime": "2019-06-14 14:45:28",
      "updateuserid": 1,
      "updatetime": "2019-06-17 17:04:53",
      "rulecategory": 1,
      "rulevalue": "{\"ruleValueID\":48,\"ruleValueName\":\"22222\"}",
      "status": 1,
      "publishtime": "2019-06-17 17:04:53",
      "publishuserid": 1,
      "publishUserName": "admin",
      "sendtype": 0,
      "ispush": 0,
      "activityStartTime": "2019-06-05 14:44:00",
      "activityEndTime": "2019-06-14 14:45:00",
      "sponsor": "zx",
      "activitySpace": "22222",
      "activityNum": 0,
      "roasting": 0,
      "bgPicId": 0,
      "recommend": 1,
      "sendToWx": 0,
      "categoryName": "系统参数",
      "content": "cdc fvfvfvfv",
      "fileList": [{fileUrl: "fileupload/80800/system_default_file/2019/6/1560494716999_1446103511165800.jpg" }],
      "listPrecinct": [{
        "value": "5",
        "label": "浙江·杭州·学苑管家测试"
      }, {
        "value": "6",
        "label": "夏夏夏"
      }, {
        "value": "7",
        "label": "中牟百合花园"
      }, {
        "value": "8",
        "label": "第二·春江花月"
      }],
      "precincts": []
    }
  });
};

const getPrecincts = (req, res) => {
  return res.json({
    "resultCode": "200",
    "resultMsg": "操作成功",
    "resultData": [{
      "value": "1",
      "label": "桃李春风小区"
    }, {
      "value": "5",
      "label": "浙江·杭州·学苑管家测试"
    }, {
      "value": "6",
      "label": "夏夏夏"
    }, {
      "value": "7",
      "label": "中牟百合花园"
    }, {
      "value": "8",
      "label": "第二·春江花月"
    }]
  })
}

module.exports = {
  'POST /property-service/property-rest/rest/noticeManage/grid': activeGrid,
  'POST /property-service/property-rest/rest/noticeManage/getNotice': notice,
  'POST /property-service/property-rest/rest/precinct/getPrecincts': getPrecincts
};
