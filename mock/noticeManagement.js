const noticeType = (req, res) => {
  req.method = 'GET';
  return res.json({
    "resultCode": "200",
    "resultMsg": "操作成功",
    "resultData": [{
      "value": "",
      "label": "请选择类型"
    }, {
      "value": "COMMUNITY_NOTICE",
      "label": "公告",
      "valueType": "INDEX"
    }]
  })
}

module.exports = {
  'POST /o2o/noticeManage/noticeCagtegory': noticeType,
};


