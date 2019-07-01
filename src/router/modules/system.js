const Layout = resolve => require(['../../layout/Layout.vue'], resolve);
export default [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    name: '系统管理',
    children: [
      {
        path: 'index',
        component: () => import('../../views/system/roles-and-authorities/roles-and-authorities'),
        meta: {auth: true, key: 'system-index', title: '设置'},
        name: '系统管理主页',
      },
      {
        path: 'systemRolePermission',
        component: () => import('../../views/system/roles-and-authorities/roles-and-authorities'),
        meta: {auth: true, key: 'roles-and-authorities', title: '设置'},
        name: '角色与权限',
      },
      {
        path: 'systemOrgEmployee',
        component: () => import('../../views/System/employeeList/employeeList'),
        meta: {auth: true, key: 'employeeList', title: '设置'},
        name: '组织与员工',
      },
      {
        path: 'systemDataDictionary',
        component: () => import('../../views/System/data-dictionary/data-dictionary'),
        meta: {auth: true, key: 'data-dictionary', title: '设置'},
        name: '数据字典',
      },

      {
        path: 'designSync',
        component: () => import('../../views/System/design-sync/design-sync'),
        meta: {auth: true, key: 'design-sync', title: '设置'},
        name: '数据同步',
      },
    ],
  },
];
