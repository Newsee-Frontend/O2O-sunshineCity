const getters = {

  //core
  funcId: state => state.Core.funcId,

  //user
  token: state => state.User.userinfo.token,
  userName: state => state.User.userinfo.userName,
  avatar: state => state.User.userinfo.avatar,
  themeColor: state => state.User.userinfo.themeColor,

  //layout
  visitedPages: state => state.PageTabs.visitedPages,
  sideBarList: state => state.Sidebar.sideBarList,
  currentPageInfo: state => state.PageInfo.currentPageInfo,

  //all search conditions (object for all page search conditions)
  searchConditions: state => state.Search.conditions,

  //form demo
  optionsDataTemplate: state => state.Form.optionsDataTemplate,
  roleButtonList: state => state.RoleButton.roleButtonList,

  //tree
  $store__orgTreeData: state => state.OrganizeTree.$store__orgTreeData,
  houseTreeData: state => state.HouseTree.houseTreeData,


  //table
  tableHead: state => state.Table.tableHead,

  //requestHead
  requestHead: state => state.RequestHead.base

};
export default getters;
