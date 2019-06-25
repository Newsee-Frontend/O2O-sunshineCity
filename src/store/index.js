import Vue from 'vue';
import Vuex from 'vuex';

import Core from './modules/common/Core';
import User from './modules/User/User';
import Sidebar from './modules/common/Sidebar';
import PageInfo from './modules/common/PageInfo';
import PageTabs from './modules/common/PageTabs';
import Form from './modules/Form';
import Search from './modules/Search';
import RoleButton from './modules/common/RoleButton';
import TreeData from './modules/TreeData';
import Table from './modules/Table';
import RequestHead from './modules/RequestHeader'


import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Core,
    User,
    Sidebar,
    PageInfo,
    PageTabs,
    Form,
    Search,
    RoleButton,
    TreeData,
    Table,
    RequestHead
  },
  getters,
});

export default store;
