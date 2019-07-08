import { mapGetters } from 'vuex';
import { isEmptyObject } from '../../utils';

export default {
  computed: {
    ...mapGetters(['roleButtonAction', 'roleButtonForm', 'roleButtonGrid']),

    gridBtns() {
      return this.roleButtonGrid.map(({ name, code }) => ({ label: name, value: code }));
    },
  },
  methods: {
    /**
     * 表格操作列权限按钮处理
     * @param tableData
     */
    tableBtnDistribute(tableData) {
      if (isEmptyObject(tableData)) return;
      try {
        tableData.list.forEach(item => {
          item.fnsclick = this.gridBtns;
        });
      }
      catch (e) {

      }
    },
  },
  beforeCreate() {
    this.$store.dispatch('getRoleButtonList', { funcId: this.Mix_funcId }).then(
      data => {

        console.log('请求到权限按钮！！！！！！！！！！！');
        console.log('请求到权限按钮！！！！！！！！！！！');
        console.log('请求到权限按钮！！！！！！！！！！！');
        console.log(data);
        console.log(this.tableData);
        this.tableBtnDistribute(this.tableData);
      },
    ); //get new role button-list
  },
};
