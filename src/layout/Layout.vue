<template>
  <ns-layout :class="{'is-hide-frame':isInIframe}">
    <template slot="header">
      <!--左logo 插槽 - 根据实际情况插入业务组图片 -->
      <div class="fl">
        <img src="../assets/img/logo/nwLOGO.png" alt="head-logo">
      </div>

      <!--业务组 - 自定义头部模块 -->
      <div class="fl">
        <header-custom></header-custom>
      </div>

      <!--右边 - 用户下拉菜单 业务组在插槽内调用组件，传入值，并且调用方法即可  -->
      <div class="fr">
        <ns-screenfull></ns-screenfull>
        <ns-biz-skiner></ns-biz-skiner>
        <ns-biz-user-dropdown></ns-biz-user-dropdown>
      </div>
    </template>

    <!--侧边栏 - 业务组直接调用封装的侧边栏组件即可 -->
    <template slot="sidebar">
      <ns-biz-sidebar></ns-biz-sidebar>
    </template>

    <!--history task-tabs link-->
    <template slot="tabs-view">
      <ns-biz-tabs-views></ns-biz-tabs-views>
    </template>

    <!--工作台模块 - 嵌入路由视图即可 -->
    <template slot="app-main">
      <!--changing-over  work bench module-->
      <transition leave-active-class="" enter-active-class="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </template>

  </ns-layout>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { nsBizSidebar, nsBizTabsViews, nsBizSkiner, nsBizUserDropdown, headerCustom } from './index';
  import transform from './transform';

  export default {
    name: 'layout',
    mixins: [transform],
    components: { nsBizSidebar,nsBizTabsViews, nsBizSkiner, nsBizUserDropdown, headerCustom },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['userName', 'avatar']),
      key() {
        return this.$route.name !== undefined
          ? this.$route.name + +new Date()
          : this.$route + +new Date();
      },
    },
    created() {
      console.log(this.isInIframe);
    },
    methods: {},
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  #layout {
    //在嵌套模式下，去掉头，侧边栏，tab页面，内容部分全屏撑开
    &.is-hide-frame {
      .header-wrapper, .sidebar-wrapper, .ns-page-tabs {
        display: none;
      }
      .main-container {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .app-main, .win, .ns-container, .ns-container-right, .ns-container-left {
          height: 100%;
          min-height: 100%;
        }
      }
    }
  }
</style>
