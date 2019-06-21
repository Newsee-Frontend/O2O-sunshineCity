const  list = (req, res) => {
  req.method = 'GET';
  return res.json({
    "resultCode": "200",
    "resultMsg": "操作成功。",
    "restLog": null,
    "resultData":  {
      "companyList": [{
        "value": "1",
        "label": "桃李春风控股集团"
      }],
      "pageInfo": {
        "pageNum": 1,
        "pageSize": 20,
        "size": 5,
        "startRow": 1,
        "endRow": 5,
        "total": 5,
        "pages": 1,
        "list": [{
          "id": 8,
          "companyID": 1,
          "precinctName": "第二·春江花月",
          "provinceID": "981",
          "cityID": "982",
          "areaID": "987",
          "address": "西斗门3号",
          "contact": "双叶杏",
          "contactPhone": "13211111111",
          "lngLat": "120.122552,30.297737",
          "status": 1,
          "isCanceled": 0,
          "createUserID": 1,
          "createTime": "2019-06-13 15:41:09",
          "updateTime": "2019-06-14 14:17:04",
          "serviceCall": "123456",
          "heatingCall": "",
          "waterCall": "",
          "electricCall": "",
          "gasCall": "",
          "precinctShortName": "第二·春江花月",
          "companyName": "桃李春风控股集团",
          "serverAddress": "http://new-see.oicp.io:88/",
          "uuid": "8EA923CC18544B51B04FA04E4571103C"
        }, {
          "id": 7,
          "companyID": 1,
          "precinctName": "中牟百合花园",
          "provinceID": "981",
          "cityID": "982",
          "areaID": "987",
          "address": "西斗门",
          "contact": "小王",
          "contactPhone": "12345",
          "lngLat": "120.136438,30.265916",
          "status": 1,
          "isCanceled": 0,
          "createUserID": 1,
          "createTime": "2019-05-30 16:55:27",
          "updateTime": "2019-06-14 15:36:46",
          "serviceCall": "123456",
          "heatingCall": "",
          "waterCall": "",
          "electricCall": "",
          "gasCall": "",
          "precinctShortName": "中牟百合花园",
          "companyName": "桃李春风控股集团",
          "serverAddress": "http://new-see.oicp.io:88/",
          "uuid": "BF858C98F4644264943D4EA236A90092"
        }, {
          "id": 6,
          "companyID": 1,
          "precinctName": "夏夏夏",
          "provinceID": "981",
          "cityID": "982",
          "areaID": "987",
          "address": "西湖",
          "contact": "111",
          "contactPhone": "111",
          "lngLat": "120.136438,30.265916",
          "status": 1,
          "isCanceled": 0,
          "createUserID": 1,
          "createTime": "2019-05-30 15:02:42",
          "updateTime": "2019-05-30 15:02:42",
          "serviceCall": "1213423",
          "heatingCall": "",
          "waterCall": "",
          "electricCall": "",
          "gasCall": "",
          "precinctShortName": "夏夏夏",
          "companyName": "桃李春风控股集团",
          "serverAddress": "http://new-see.oicp.io:88/"
        }, {
          "id": 5,
          "companyID": 1,
          "precinctName": "浙江·杭州·学苑管家测试",
          "provinceID": "981",
          "cityID": "982",
          "areaID": "987",
          "address": "天堂软件园",
          "contact": "测试1",
          "contactPhone": "12345",
          "lngLat": "120.123199,30.296647",
          "status": 1,
          "isCanceled": 0,
          "createUserID": 1,
          "createTime": "2019-05-30 10:39:54",
          "updateTime": "2019-06-12 17:04:36",
          "serviceCall": "12345678",
          "heatingCall": "",
          "waterCall": "",
          "electricCall": "",
          "gasCall": "",
          "precinctShortName": "XYGJCS",
          "companyName": "桃李春风控股集团",
          "serverAddress": "http://new-see.oicp.io:88/",
          "uuid": "46A3C7F4876A4EE7ADAAF970C5924333"
        }, {
          "id": 1,
          "companyID": 1,
          "precinctCode": "nwAccessTest",
          "precinctName": "桃李春风小区",
          "provinceID": "2144",
          "cityID": "2172",
          "areaID": "2177",
          "streetID": "",
          "address": "临安市888号",
          "contact": "项目经理",
          "contactPhone": "13545123544",
          "lngLat": "113.930013,22.707433",
          "status": 1,
          "isCanceled": 0,
          "createUserID": 1,
          "createTime": "2018-06-12 08:53:14",
          "updateTime": "2018-06-12 08:53:14",
          "serviceCall": "0571-1234567",
          "heatingCall": "",
          "waterCall": "",
          "electricCall": "",
          "gasCall": "",
          "precinctShortName": "桃李春风小区主服务器01",
          "companyName": "桃李春风控股集团",
          "serverAddress": "http://new-see.oicp.io:88/"
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
      "userType": 1,
      "isAdmin": 1,
      "proxyPassUrl": null
    }
  })
};



const phoneList = (req, res) => {
  req.method = 'GET';
  return res.json(
    {
      "resultCode": "200",
      "resultMsg": "操作成功",
      "resultData": [{
        "id": 89,
        "preinctid": 8,
        "category": 0,
        "name": "`",
        "phone": "2",
        "orderid": 0,
        "createtime": "2019-06-18 13:57:33",
        "updatetime": "2019-06-18 13:57:33",
        "categoryName": ""
      }]
    }
  )
};

const precinctInfo = (req, res) => {
  req.method = 'GET';
  return res.json({
    "resultCode": "200",
    "resultMsg": "操作成功",
    "resultData": {
      "o2oPropertyPrecinctVo": {
        "id": 5,
        "companyID": 1,
        "precinctName": "浙江·杭州·学苑管家测试",
        "provinceID": "981",
        "cityID": "982",
        "areaID": "987",
        "address": "天堂软件园",
        "contact": "测试1",
        "contactPhone": "12345",
        "lngLat": "120.123199,30.296647",
        "status": '1',
        "isCanceled": 0,
        "createUserID": 1,
        "createTime": "2019-05-30 10:39:54",
        "updateTime": "2019-06-12 17:04:36",
        "serviceCall": "12345678/324234324234234",
        "companyCall": "13957116368",
        "heatingCall": "",
        "waterCall": "",
        "electricCall": "",
        "gasCall": "",
        "precinctShortName": "XYGJCS",
        "md5Key": "67018e40dd36e251611909a1ddd78fc6",
        "workStartTime": "08:30",
        "workEndTime": "17:30",
        "visitLimit": 10,
        "memberLimit": 8,
        "repairServices": "1,2",
        "companyName": "桃李春风控股集团",
        "serverAddress": "http://new-see.oicp.io:1061/",
        "provinceName": "浙江省",
        "cityName": "杭州市",
        "areaName": "西湖区",
        "propertyContactList": [{
          "id": 77,
          "preinctid": 5,
          "category": 1,
          "name": "园区服务电话",
          "phone": "12345678/324234324234234",
          "categoryName": "园区服务电话"
        }],
        "uuid": "46A3C7F4876A4EE7ADAAF970C5924333"
      }
    }
  })
};

module.exports = {
  'POST /property-service/property-rest/rest/precinct/listPrecinct': list,
  'POST /property-service/property-rest/rest/precinct/getServicePhoneList': phoneList,
  'POST /property-service/property-rest/rest/precinct/delServicePhone': phoneList,
  'POST /property-service/property-rest/rest/precinct/saveServicePhoneList': phoneList,
  'POST /property-service/property-rest/rest/precinct/getPrecinct': precinctInfo
};
