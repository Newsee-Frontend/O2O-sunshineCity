const iniView = '/Front/login';
import Front from '../../views/Front/index.vue'

const Layout = resolve => require(['../../layout/Layout.vue'], resolve);

export default [
  {path: '/', redirect: iniView},
  {path: '*', redirect: iniView},

  {
    path: '/404',
    name: '404',
    component: () => import('../../views/Public/404'),
    meta: {auth: false},
  },

  // 前台登录
  {
    path: '/Front',
    component: Front,
    redirect: '/Front/login',
    name: '前台',
    children: [
      {
        path: 'login',
        component: () => import('../../views/Login/login'),
        name: '登录',
        meta: {auth: false, type: 'Front'},
      }]
  },

  // 主页
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [
      {
        path: 'dashboard',
        component: () => import('../../views/Dashboard/index'),
        meta: {auth: true, key: 'dashboard'},
        name: '欢迎页面',
      },
    ],
  },
];
