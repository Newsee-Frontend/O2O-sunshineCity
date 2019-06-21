import ns from '@/utils/nsQuery/nsQuery';
import $store from '../../../../store/index';

class Loginfo {
  /**
   * remote data request log
   * @param type
   * @param vm
   * @param requireData
   */
  remote(type, vm, requireData) {
    this.local(type, vm);
    console.log('%c4、自动表单请求头部如下：', ns.log.logStyle('info'));
    console.log('%cfuncId: ' + requireData.head.funcId, ns.log.logStyle('text'));
    console.log('%cinterpreter: ' + requireData.head.interpreter, ns.log.logStyle('text'));
    console.log('%cformOperateType: ' + requireData.head.formOperateType, ns.log.logStyle('text'));
    console.log('%c============', ns.log.logStyle('line'));
  }

  /**
   * local data request log
   * @param type
   * @param vm
   */
  local(type, vm) {
    console.log('%c\n## 自动表单信息 ##\n', ns.log.logStyle('3DTest'));
    console.log('%c========================', ns.log.logStyle('tit'));
    console.log('%c1、自动表单主体数据来源（服务端/本地):', ns.log.logStyle('info'));
    console.info(`主体数据来源: %c${type}`, ns.log.logStyle('info'));
    console.log('%c2、自动表单ID值：', ns.log.logStyle('info'));
    console.log('%c' + vm.autoFormID, ns.log.logStyle('text'));
    console.log('%c============', ns.log.logStyle('line'));
  }

  /**
   * data check log
   * @param vm
   */
  dataCheck(vm) {
    if (vm.isCheck) {
      console.log('%c==== 数据检测完毕完毕: ====', ns.log.logStyle('tit'));
      console.log('%c错误信息列表数据：', ns.log.logStyle('info'));
      console.log(vm.dataCheckResult);
      const len = vm.dataCheckResult.length;
      len > 0
        ? console.log('%c6、有' + len + '个错误信息，请查看修改', ns.log.logStyle('warning'))
        : console.log('%c没有错误信息，数据正常', ns.log.logStyle('success'));
    } else {
      console.log(
        '%c7、数据检测关闭，如需开启检测，请在表单标签中添加 is-Check 标签',
        ns.log.logStyle('info')
      );
    }
    console.log('%c========================', ns.log.logStyle('tit'));
  }

  /**
   * data getted log
   * @param data
   */
  datagetted(data) {
    console.log('%c====== 自动表单数据获取成功 ======', ns.log.logStyle('success'));
    console.log('%c4、自动表单数据如下：', ns.log.logStyle('info'));
    console.info(data);
    // console.log(JSON.stringify(data, null, 4));
    console.log('%c============', ns.log.logStyle('line'));
  }

  /**
   * data after request handle
   * @param data
   */
  afterRequest(data) {
    console.log('%c5、数据获取进行二次操作后的数据如下:', ns.log.logStyle('info'));
    console.info(data);
    // console.log(JSON.stringify(data, null, 4));
    console.log('%c6、表单初始 modelData 数据如下:', ns.log.logStyle('info'));
    console.info($store.state.Form.control.initModelData);
    console.log('%c============', ns.log.logStyle('line'));
  }
}

export default new Loginfo();
