const iniView = '/front/login';

const Layout = resolve => require(['../../layout/Layout.vue'], resolve);

export default [
  { path: '/', redirect: iniView },
  { path: '*', redirect: iniView },

  {
    path: '/404',
    name: '404',
    component: () => import('../../views/Public/404/404'),
    meta: { auth: false },
  },

  {
    path: '/sso/404',
    name: 'sso-404',
    component: () => import('../../views/Public/404/sso-404'),
    meta: { auth: false },
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
        meta: { auth: true, key: 'dashboard' },
        name: '欢迎页面',
      },
    ],
  },
];
