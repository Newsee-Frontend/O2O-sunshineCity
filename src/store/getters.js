const getters = {

  //core
  funcId: state => state.Core.funcId,

  //user
  token: state => state.User.userinfo.token,
  userName: state => state.User.userinfo.userName,
  avatar: state => state.User.userinfo.avatar,
  theme: state => state.User.userinfo.theme,

  //layout
  visitedPages: state => state.PageTabs.visitedPages,
  sideBarList: state => state.Sidebar.sideBarList,
  currentPageInfo: state => state.PageInfo.currentPageInfo,

  //all search conditions (object for all page search conditions)
  searchConditions: state => state.Search.conditions,

  //form demo
  optionsDataTemplate: state => state.Form.optionsDataTemplate,
  roleButtonList: state => state.RoleButton.roleButtonList,


  //table
  tableHead: state => state.Table.tableHead,


};
export default getters;
