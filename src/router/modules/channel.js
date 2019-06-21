const Layout = resolve => require(['../../layout/Layout.vue'], resolve);
export const channelRouter = [
  {
    path: '/o2o',
    component: Layout,
    redirect: '/o2o/activeManagement',
    name: '活动中心',
    children: [
      {
        path: 'activeManagement',
        component: () => import('../../views/Community/active-management/active-management.vue'),
        meta: {auth: true, key: 'activeManagement', title: '活动'},
        name: '活动管理',
      },
      {
        path: 'noticeManagement',
        component: () => import('../../views/Community/notice-management/notice-management.vue'),
        meta: {auth: true, key: 'noticeManagement', title: '活动'},
        name: '公告管理',
      },
      {
        path: 'villageSetting',
        component: () => import('../../views/Channel/village-setting/village-setting.vue'),
        meta: {auth: true, key: 'villageSetting', title: '设置'},
        name: '小区设置',
      },
    ],
  },
];
