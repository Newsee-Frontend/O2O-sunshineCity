import { getUrlParam } from '../utils';

export default {
  data() {
    return {
      isHideFrame: false,//是否隐藏外框（头 + 侧边栏 + tabs页)
    };
  },
  created() {
    this.isHideFrame = getUrlParam('isShowFrame') === 'false';
    console.log(this.isHideFrame);
  },
};
