const templateArray = [{
    "value": 1,
    "label": "停气通知"
  }, {
    "value": 2,
    "label": "停电通知"
  },
    {
      "value": 3,
      "label": "停水通知"
    }, {
      "value": 4,
      "label": "关于XX节/假日期间的温馨提示"
    },
    {
      "value": 5,
      "label": "关于电梯停运养护的通知"
    }, {
      "value": 6,
      "label": "关于开展小区绿化消杀的通知"
    },
    {
      "value": 7,
      "label": "关于开展消防联动测试的通知"
    }, {
      "value": 8,
      "label": "关于安装可视电视室内分机通知"
    }
  ];


const templateInfoArray = [{
  noticeCategory: '',
  rulecategory: '1',
  title: '',
  roasting: 1,
  sendToWx: 0,
  fileUrls: '',
  bgUrl: '',
  content: ''
},
  {
    noticeCategory: 'COMMUNITY_NOTICE',
    rulecategory: '1',
    title: '停气通知',
    roasting: 1,
    sendToWx: 0,
    fileUrls: '/pc-front/static/notice/notice1.jpg',
    bgUrl: '/pc-front/static/notice/noticebg.jpg',
    content: '<section data-role="outer" label="Powered by 135editor.com" style="font-family: 微软雅黑;"><section data-role="outer" label="Powered by 135editor.com"><section class="_135editor" data-tools="135编辑器" data-id="91107"><section style="width: 100%;background: url(https://bdn.135editor.com/files/users/522/5228388/201811/gMkyyg2R_nSNI.jpg)repeat;background-position:top ;background-size:100% ;" data-width="100%"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/XBkrkDKD_gTDL.jpg)no-repeat;background-position:top ;background-size:100% ;"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/vujtwuvC_mHMd.jpg)no-repeat;background-position:bottom ;background-size:100% ;"><section><section style="padding: 6em 40px 80px; margin-top: 10%; margin-right: auto; margin-left: auto; line-height: 35px;"><p style="text-align: center;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-size: 20px;">停气通知</span></strong></span></p><p><span style="color: rgb(0, 0, 0); background-color: initial;">尊敬的各位业主/住户：<br/></span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">您好！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">接燃气公司通知，因XXXXXXXXXXXX进行施工检修，检修期间进行计划暂停供气。</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><strong><span style="color: rgb(0, 0, 0);">预计停气时间：XXXX年XX月XX日XX时——XX月XX日XX时。</span></strong></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">请各位业户做好停气准备，检查阀门是否关闭，调整用气时间。如果天燃气恢复以后仍出现无法点燃的情况，属于排空气状态，可尝试多次点燃。燃气公司咨询电话：XXXXXXXX。</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">望广大业户相互转告，感谢您对我们工作的支持与配合，由此给您带来的不便敬请谅解！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">如需帮助，欢迎拨打物业服务中心24小时服务热线：XXXXXXXX，我们将竭诚为您服务！</span></p><p style="line-height: 1.5em; text-align: right;"><span style="background-color: initial; color: rgb(0, 0, 0);"><br/></span></p><p style="line-height: 1.5em; text-align: right;"><span style="background-color: initial; color: rgb(0, 0, 0);">XXXXXXX物业服务中心</span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);">二〇XX年XX月XX日</span></p></section></section></section></section></section></section></section></section><p><br/></p>'
  },
  {
    noticeCategory: 'COMMUNITY_NOTICE',
    rulecategory: '1',
    title: '停电通知',
    roasting: 1,
    sendToWx: 0,
    fileUrls: '/pc-front/static/notice/notice2.jpg',
    bgUrl: '/pc-front/static/notice/noticebg.jpg',
    content: '<section data-role="outer" label="Powered by 135editor.com" style="font-family: 微软雅黑;"><section data-role="outer" label="Powered by 135editor.com"><section class="_135editor" data-tools="135编辑器" data-id="91107"><section style="width: 100%;background: url(https://bdn.135editor.com/files/users/522/5228388/201811/gMkyyg2R_nSNI.jpg)repeat;background-position:top ;background-size:100% ;" data-width="100%"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/XBkrkDKD_gTDL.jpg)no-repeat;background-position:top ;background-size:100% ;"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/vujtwuvC_mHMd.jpg)no-repeat;background-position:bottom ;background-size:100% ;"><section><section style="padding: 6em 40px 80px; margin-top: 10%; margin-right: auto; margin-left: auto; line-height: 35px;"><p style="text-align: center;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-size: 20px;">停电通知</span></strong></span></p><p><span style="color: rgb(0, 0, 0); background-color: initial;">尊敬的各位业主/住户：<br/></span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">您好！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">接供电局通知，因XXXXXXXX进行施工检修，检修期间进行计划暂停供电，请您提前做好相关生活准备工作。</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><strong><span style="color: rgb(0, 0, 0);">预计停电时间：XXXX年XX月XX日XX时——XX月XX日XX时。</span></strong></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">望广大业户相互转告，感谢您对我们工作的支持与配合，由此给您带来的不便敬请谅解！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">如需帮助，欢迎拨打物业服务中心24小时服务热线：XXXXXXXX，我们将竭诚为您服务！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><br/></p><p style="line-height: 1.5em; text-align: right;"><span style="background-color: initial; color: rgb(0, 0, 0);">XXXXXX物业服务中心</span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);">二〇XX年XX月XX日</span></p></section></section></section></section></section></section></section></section>'
  },
  {
    noticeCategory: 'COMMUNITY_NOTICE',
    rulecategory: '1',
    title: '停水通知',
    roasting: 1,
    fileUrls: '/pc-front/static/notice/notice3.jpg',
    bgUrl: '/pc-front/static/notice/noticebg.jpg',
    content: '<section data-role="outer"  style="font-family: 微软雅黑;"><section data-role="outer" label="Powered by 135editor.com"><section class="_135editor" data-tools="135编辑器" data-id="91107"><section style="width: 100%;background: url(https://bdn.135editor.com/files/users/522/5228388/201811/gMkyyg2R_nSNI.jpg)repeat;background-position:top ;background-size:100% ;" data-width="100%"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/XBkrkDKD_gTDL.jpg)no-repeat;background-position:top ;background-size:100% ;"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/vujtwuvC_mHMd.jpg)no-repeat;background-position:bottom ;background-size:100% ;"><section><section style="padding: 6em 40px 80px; margin-top: 10%; margin-right: auto; margin-left: auto; line-height: 35px;"><p style="text-align: center;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-size: 20px; text-align: left; background-color: initial;">停水通知</span></strong></span></p><p><span style="color: rgb(0, 0, 0); background-color: initial;">尊敬的各位业主/住户：<br/></span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">您好！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">接自来水公司通知，因XXXXXXXXX进行施工检修，检修期间计划暂停供水，请您提前做好储水等生活相关准备工作。</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);"><strong>预计停水时间：XXXX年XX月XX日XX时——XX月XX日XX时。</strong></span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">望广大业户相互转告，感谢您对我们工作的支持与配合，由此给您带来的不便敬请谅解！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">如需帮助，欢迎拨打物业服务中心24小时服务热线：XXXXXXXX，我们将竭诚为您服务！</span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);"><br/></span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);">XXXXXXX物业服务中心</span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);">二〇XX年XX月XX日</span></p></section></section></section></section></section></section></section></section><p><br/></p>'
  },
  {
    noticeCategory: 'COMMUNITY_NOTICE',
    rulecategory: '1',
    title: '关于XX节/假日期间的温馨提示',
    roasting: 1,
    sendToWx: 0,
    fileUrls: '/pc-front/static/notice/notice4.jpg',
    bgUrl: '/pc-front/static/notice/noticebg.jpg',
    content: '<section data-role="outer"  style="font-family: 微软雅黑;"><section data-role="outer" label="Powered by 135editor.com"><section class="_135editor" data-tools="135编辑器" data-id="91107"><section style="width: 100%;background: url(https://bdn.135editor.com/files/users/522/5228388/201811/rRcCyAJB_vUFB.jpg)repeat;background-position:top ;background-size:100% ;" data-width="100%"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/B7svp4WG_TwgA.jpg)no-repeat;background-position:top ;background-size:100% ;"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/7HMvLG3t_x5NS.jpg)no-repeat;background-position:bottom ;background-size:100% ;"><section><section style="padding: 6em 40px 100px; margin-top: 10%; margin-right: auto; margin-left: auto; line-height: 35px;"><p style="text-align: center; line-height: 2.19em;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-size: 20px;">关于XX节/假日期间的温馨提示</span></strong></span></p><p style="line-height: 2.19em;"><span style="color: rgb(0, 0, 0); background-color: initial;">尊敬的各位业主/住户：<br/></span></p><p style="text-indent: 2em; text-align: justify; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">您好！</span></p><p style="text-indent: 2em; text-align: justify; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">在XX节/假日来临之际，为了您和家人度过一个安全、舒适、祥和、欢乐的XX节/假日，提醒您注意以下事项：</span></p><p style="text-indent: 2em; text-align: justify; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">1、外出旅游或返乡探亲，请在外出前仔细检查门窗、水、电及煤气是否已经关闭，以免产生不必要的损失；</span></p><p style="text-indent: 2em; text-align: justify; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">2、节日期间(XX月XX日至XX月XX日)，为了不影响其他业主的正常休息，园区禁止一切装饰装修活动(含有声和无声作业)，共创和谐宁静家园；</span></p><p style="text-indent: 2em; text-align: justify; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">3、节日期间，园区外来访客增多，为了园区安全管理，亲友来访敬请配合小区门岗做好登记工作。</span></p><p style="text-indent: 2em; text-align: justify; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">节日期间，敬请广大业户积极配合物业服务中心共同做好安全防范工作，在此物业服务中心全体员工感谢广大业户长期以来对我们工作的支持和理解，祝大家：节日快乐！阖家幸福！</span></p><p style="text-indent: 2em; text-align: justify; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">如需帮助，欢迎拨打物业服务中心24小时服务热线：XXXXXXXX，我们将竭诚为您服务！</span></p><p style="text-align: right; line-height: 1.5em;"><span style="background-color: initial; color: rgb(0, 0, 0);"></span></p><p style="text-align: right; line-height: 1.5em;"><span style="background-color: initial; color: rgb(0, 0, 0);">XXXXXXX物业服务中心</span></p><p style="text-align: right; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">XXXX年XX月XX日</span></p></section></section></section></section></section></section></section></section><p><br/></p>'
  },
  {
    noticeCategory: 'COMMUNITY_NOTICE',
    rulecategory: '1',
    title: '关于电梯停运养护的通知',
    roasting: 1,
    sendToWx: 0,
    fileUrls: '/pc-front/static/notice/notice5.jpg',
    bgUrl: '/pc-front/static/notice/noticebg.jpg',
    content: '<section data-role="outer" label="Powered by 135editor.com" style="font-family: 微软雅黑;"><section data-role="outer" label="Powered by 135editor.com"><section class="_135editor" data-tools="135编辑器" data-id="91107"><section style="width: 100%;background: url(https://bdn.135editor.com/files/users/522/5228388/201811/gMkyyg2R_nSNI.jpg)repeat;background-position:top ;background-size:100% ;" data-width="100%"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/XBkrkDKD_gTDL.jpg)no-repeat;background-position:top ;background-size:100% ;"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/vujtwuvC_mHMd.jpg)no-repeat;background-position:bottom ;background-size:100% ;"><section><section style="padding: 6em 40px 80px; margin-top: 10%; margin-right: auto; margin-left: auto; line-height: 35px;"><p style="text-align: center;"><span style="font-size: 20px; color: rgb(0, 0, 0);"><strong>关于电梯停运养护的通知</strong></span></p><p><span style="color: rgb(0, 0, 0); background-color: initial;">尊敬的各位业主/住户：<br/></span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">您好！</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">为保证业户的公共安全，减少电梯故障风险，物业服务中心计划对XX栋-XX栋电梯进行例行养护工作，养护期间电梯将暂时停止运行。</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);"><strong>养护时间： XXXX年XX月XX日XX时——XX月XX日XX时。</strong></span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">望广大业户相互转告，感谢您对我们工作的支持与配合，由此给您带来的不便敬请谅解！</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">如需帮助，欢迎拨打物业服务中心24小时服务热线：XXXXXXXX，我们将竭诚为您服务！</span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0); background-color: initial;">XXXXXXX物业服务中心<br/></span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);">二〇XX年XX月XX日</span></p></section></section></section></section></section></section></section></section>'
  },
  {
    noticeCategory: 'COMMUNITY_NOTICE',
    rulecategory: '1',
    title: '关于开展小区绿化消杀的通知',
    roasting: 1,
    sendToWx: 0,
    fileUrls: '/pc-front/static/notice/notice6.jpg',
    bgUrl: '/pc-front/static/notice/noticebg.jpg',
    content: '<section data-role="outer" label="Powered by 135editor.com" style="font-family: 微软雅黑;"><section data-role="outer" label="Powered by 135editor.com"><section class="_135editor" data-tools="135编辑器" data-id="91107"><section style="width: 100%;background: url(https://bdn.135editor.com/files/users/522/5228388/201811/gMkyyg2R_nSNI.jpg)repeat;background-position:top ;background-size:100% ;" data-width="100%"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/XBkrkDKD_gTDL.jpg)no-repeat;background-position:top ;background-size:100% ;"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/vujtwuvC_mHMd.jpg)no-repeat;background-position:bottom ;background-size:100% ;"><section><section style="padding: 6em 40px 80px; margin-top: 10%; margin-right: auto; margin-left: auto; line-height: 35px;"><p style="text-align: center;"><span style="color: rgb(0, 0, 0);"><strong><span style="text-align: left; background-color: initial; font-size: 20px;">关于开展小区绿化消杀的通知</span></strong></span></p><p><span style="color: rgb(0, 0, 0); background-color: initial;">尊敬的各位业主/住户：<br/></span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">您好！</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">为营造一个优美、舒适的生活环境，物业服务中心计划对小区绿化草坪进行一次全面喷药消杀。</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);"><strong>消杀时间：XXXX年XX月XX日XX时——XX月XX日XX时，如遇雨天消杀工作顺延。</strong></span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">物业服务中心在此特别提示您：</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">1、喷药期间请做好防护工作，三楼以下的业户请关好门窗；</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">2、尽量不要在喷药后的草坪树木旁停留太长时间，并注意不要让儿童在喷药绿化区及挂有标志牌区域玩耍，以免发生意外。</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">望广大业户相互转告，感谢您对我们工作的支持与配合，由此给您带来的不便敬请谅解！</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><span style="color: rgb(0, 0, 0);">如需帮助，欢迎拨打物业服务中心24小时服务热线：XXXXXXXX，我们将竭诚为您服务！</span></p><p style="line-height: 1.5em; text-align: justify; text-indent: 2em;"><br/></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);">XXXXXXX物业服务中心</span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);">二〇XX年XX月XX日</span></p></section></section></section></section></section></section></section></section><p><br/></p>'
  },
  {
    noticeCategory: 'COMMUNITY_NOTICE',
    rulecategory: '1',
    title: '关于开展消防联动测试的通知',
    roasting: 1,
    sendToWx: 0,
    fileUrls: '/pc-front/static/notice/notice7.jpg',
    bgUrl: '/pc-front/static/notice/noticebg.jpg',
    content: '<section data-role="outer" label="Powered by 135editor.com" style="font-family: 微软雅黑;"><section data-role="outer" label="Powered by 135editor.com"><section class="_135editor" data-tools="135编辑器" data-id="91107"><section style="width: 100%;background: url(https://bdn.135editor.com/files/users/522/5228388/201811/gMkyyg2R_nSNI.jpg)repeat;background-position:top ;background-size:100% ;" data-width="100%"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/XBkrkDKD_gTDL.jpg)no-repeat;background-position:top ;background-size:100% ;"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/vujtwuvC_mHMd.jpg)no-repeat;background-position:bottom ;background-size:100% ;"><section><section style="padding: 6em 40px 80px; margin-top: 10%; margin-right: auto; margin-left: auto; line-height: 35px;"><p style="text-align: center;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-size: 20px;">关于开展消防联动测试的通知</span></strong></span></p><p><span style="color: rgb(0, 0, 0); background-color: initial;">尊敬的各位业主/住户：<br/></span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">您好！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">为了小区消防设备的安全维护，保证消防系统正常运行，物业服务中心计划对小区内消防设备进行联动测试。</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);"><strong>测试时间： XXXX年XX月XX日XX时——XX月XX日XX时。</strong></span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">请各业户注意以下事项：</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">1、测试期间避免乘坐电梯；</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">2、测试期间听到报警声音请勿惊慌。</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">望广大业户相互转告，感谢您对我们工作的支持与配合，由此给您带来的不便敬请谅解！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">如需帮助，欢迎拨打物业服务中心24小时服务热线：XXXXXXXX，我们将竭诚为您服务！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><br/></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0); background-color: initial;">XXXXX物业服务中心<br/></span></p><p style="line-height: 1.5em; text-align: right;"><span style="color: rgb(0, 0, 0);">二〇XX年XX月XX日</span></p></section></section></section></section></section></section></section></section><p><br/></p>'
  },
  {
    noticeCategory: 'COMMUNITY_NOTICE',
    rulecategory: '1',
    title: '关于安装可视电视室内分机通知',
    roasting: 1,
    sendToWx: 0,
    fileUrls: '/pc-front/static/notice/notice8.jpg',
    bgUrl: '/pc-front/static/notice/noticebg.jpg',
    content: '<section data-role="outer" label="Powered by 135editor.com" style="font-family: 微软雅黑;"><section data-role="outer" label="Powered by 135editor.com"><section class="_135editor" data-tools="135编辑器" data-id="91107"><section style="width: 100%;background: url(https://bdn.135editor.com/files/users/522/5228388/201811/gMkyyg2R_nSNI.jpg)repeat;background-position:top ;background-size:100% ;" data-width="100%"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/XBkrkDKD_gTDL.jpg)no-repeat;background-position:top ;background-size:100% ;"><section style="background: url(https://bdn.135editor.com/files/users/522/5228388/201811/vujtwuvC_mHMd.jpg)no-repeat;background-position:bottom ;background-size:100% ;"><section><section style="padding: 6em 40px 80px; margin-top: 10%; margin-right: auto; margin-left: auto; line-height: 35px;"><p style="text-align: center; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-size: 20px;">关于安装可视电视</span></strong><strong><span style="font-size: 20px;"></span></strong></span></p><p style="line-height: 1.5em; text-align: center;"><span style="color: rgb(0, 0, 0);"><strong><span style="color: rgb(0, 0, 0); font-size: 20px;">室</span></strong><strong style="text-align: center; background-color: initial;"><span style="color: rgb(0, 0, 0); font-size: 20px;">内分机的通知</span></strong></span></p><p><span style="background-color: initial; color: rgb(0, 0, 0);">尊敬的各位业主/住户：<br/></span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">您好！</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">小区门禁系统即将启用，为确保广大业户室内的分机能正常使用，物业服务中心特安排智能化公司进行可视电话室内分机安装工作。</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);"><strong>安装时间： XXXX年XX月XX日XX时——XX月XX日XX时。</strong></span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">为避免门禁系统启用后，给您的出入和室内通话带来不便。请各位业户于上述时间段在家耐心等候，我们会尽快上门安装，若逾期可能短期内难以再次集中安装。</span></p><p style="line-height: 1.5em; text-indent: 2em; text-align: justify;"><span style="color: rgb(0, 0, 0);">望广大业户相互转告，感谢您对我们工作的支持与配合，由此给您带来的不变敬请谅解！</span></p><p style="text-indent: 2em; text-align: justify; line-height: 1.5em;"><span style="color: rgb(0, 0, 0);">如需帮助，欢迎拨打物业服务中心24小时服务热线：XXXXXXXX，我们将竭诚为您服务！</span></p><p style="line-height: 1.5em;"><br/></p><p style="line-height: 1.5em; text-align: right;"><span style="background-color: initial; color: rgb(0, 0, 0);">XXXXXX物业服务中心</span></p><p style="line-height: 1.5em; text-align: right;"><span style="background-color: initial; color: rgb(0, 0, 0);">二〇XX年XX月XX日</span></p></section></section></section></section></section></section></section></section><p><br/></p>'
  }
];


export { templateArray, templateInfoArray};
