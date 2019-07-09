import Vue from 'vue';
import Vuex from 'vuex';

import Core from './modules/Common/Core';
import User from './modules/User/User';

import Sidebar from './modules/Common/Sidebar';
import PageInfo from './modules/Common/PageInfo';
import PageTabs from './modules/Common/PageTabs';
import FrameMode from './modules/System/FrameMode/FrameMode';


import Form from './modules/Form';

import OrganizeTree from './modules/Tree/Organize-tree';
import HouseTree from './modules/Tree/House-tree';

import SearchConditions from './modules/Common/SearchConditions';
import RoleButton from './modules/System/Role/RoleButton';
import TreeData from './modules/TreeData';
import Table from './modules/System/Table/Table';
import RequestHead from './modules/Common/RequestHeader';


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
    TreeData,
    Table,
    RequestHead,
  },
  getters,
});

export default store;
