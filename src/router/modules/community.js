const Layout = resolve => require(['../../layout/Layout.vue'], resolve);
export default [
  {
    path: '/community',
    component: Layout,
    redirect: '/community/activityList',
    name: '活动',
    children: [
      {
        path: 'activityList',
        component: () => import('../../views/Community/active-management/active-management.vue'),
        meta: {auth: true, key: 'activityList', title: '活动'},
        name: '活动管理',
      },
      {
        path: 'noticeList',
        component: () => import('../../views/Community/notice-management/notice-management.vue'),
        meta: {auth: true, key: 'noticeList', title: '公告'},
        name: '公告管理',
      },
      {
        path: 'precinctList',
        component: () => import('../../views/Community/village-setting/village-setting.vue'),
        meta: {auth: true, key: 'precinctList', title: '小区'},
        name: '小区设置',
      }
    ],
  },


  // //小区设置
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/precinctList',
  //   name: '小区设置',
  //   children: [
  //     {
  //       path: 'precinctList',
  //       component: () => import('../../views/Community/village-setting/village-setting.vue'),
  //       meta: {auth: true, key: 'precinctList', title: '小区'},
  //       name: '小区设置',
  //     },
  //   ],
  // },
  // //活动管理
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/activityList',
  //   name: '活动管理',
  //   children: [
  //     {
  //       path: 'activityList',
  //       component: () => import('../../views/Community/active-management/active-management.vue'),
  //       meta: {auth: true, key: 'activityList', title: '活动'},
  //       name: '活动管理',
  //     }
  //   ],
  // },
  // // 公告管理
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/noticeList',
  //   name: '公告管理',
  //   children: [
  //     {
  //       path: 'noticeList',
  //       component: () => import('../../views/Community/notice-management/notice-management.vue'),
  //       meta: {auth: true, key: 'noticeList', title: '公告'},
  //       name: '公告管理',
  //     },
  //   ],
  // },
];
