import Vue from 'vue';
import Vuex from 'vuex';

import Core from './modules/System/Common/Core';
import User from './modules/System/User/User';

import Sidebar from './modules/System/Layout/Sidebar';
import PageInfo from './modules/System/Common/PageInfo';
import PageTabs from './modules/System/Layout/PageTabs';
import FrameMode from './modules/System/FrameMode/FrameMode';


import Form from './modules/Form';

import OrganizeTree from './modules/System/Tree/Organize-tree';
import HouseTree from './modules/System/Tree/House-tree';

import SearchConditions from './modules/System/Common/SearchConditions';
import RoleButton from './modules/System/Role/RoleButton';
import Table from './modules/System/Table/Table';
import RequestHead from './modules/System/Common/RequestHeader';


import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Core,
    User,
    Sidebar,
    PageInfo,
    PageTabs,

    FrameMode,

    Form,

    OrganizeTree,
    HouseTree,

    Search: SearchConditions,
    RoleButton,

    Table,
    RequestHead,
  },
  getters,
});

export default store;
