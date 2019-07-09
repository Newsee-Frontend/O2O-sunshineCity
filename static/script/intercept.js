/**
 * get browser info
 */
var getBrowserInfo = function() {

  var userAgent = navigator.userAgent;
  var info = {};

  if (userAgent.indexOf('Trident') > -1) {

    info.browser = 'IE';

    info.ieVer = userAgent.indexOf('rv:11.0') > -1 ?
      11 :
      parseInt(userAgent.split(';')[1].replace(' MSIE ', ''));
  }
  else if (userAgent.indexOf('Chrome') > -1) {

    info.browser = 'Chrome';

  }
  return info;
};

/**
 * judge and intercept
 */
var intercept = function() {

  var browserInfo = getBrowserInfo();

  switch (browserInfo.browser) {
    case 'IE':
      if (browserInfo.ieVer < 9) {
        alert('您的浏览器版本过低，请升级浏览器或切换非兼容模式');
      }
      break;
    case 'Chrome':
      break;
    default:
      break;
  }
};


intercept();


