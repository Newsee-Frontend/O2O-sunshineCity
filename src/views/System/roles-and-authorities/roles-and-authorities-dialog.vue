<template>
  <ns-dialog title="新增角色权限" :visible.sync="visibles.visible1.visible">
    <ns-form ref="addValidateForm" :model="addValidateForm" label-width="100px">
      <ns-form-item label="所属组织">
        <span>全公司</span>
      </ns-form-item>
      <ns-form-item label="角色组">
        <el-input
          size="small"
          auto-complete="off"
          placeholder="请输入角色名称，公司内不能重复"
        ></el-input>
      </ns-form-item>
      <ns-form-item label="角色名称">
        <el-input
          size="small"
          auto-complete="off"
          placeholder="请输入角色名称，公司内不能重复"
        ></el-input>
      </ns-form-item>
      <ns-form-item label="备注">
        <el-input
          size="small"
          maxlength="200"
          auto-complete="off"
          placeholder="请输入角色描述"
        ></el-input>
      </ns-form-item>
      <ns-form-item label="角色权限">
        **********暂时搁置***********
      </ns-form-item>
      <ns-form-item label="功能和权限">
        <el-checkbox v-model="allCheck">全选</el-checkbox>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          show-checkbox
          ref="tree"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
        </el-tree>
      </ns-form-item>
    </ns-form>
    <span slot="footer" class="dialog-footer">
      <ns-button type="default">取消</ns-button>
      <ns-button type="primary">保存</ns-button>
    </span>
  </ns-dialog>
</template>

<script>
export default {
  props: {
    visibles: {
      type: Object,
      default: function() {
        return {
          visible1: false,
        };
      },
    },
  },
  watch: {
    allCheck(flag) {
      if (flag) {
        this.$refs.tree.setCheckedNodes(this.treeData);
      } else {
        this.$refs.tree.setCheckedNodes([]);
      }
    },
  },
  methods: {},
  data() {
    return {
      addValidateForm: {},
      allCheck: false,
      treeData: [
        {
          id: 1,
          label: '系统管理',
          children: [
            {
              id: 11,
              label: '部门员工',
            },
            {
              id: 12,
              label: '角色权限',
            },
            {
              id: 13,
              label: '数据字典',
            },
          ],
        },
        {
          id: 2,
          label: '业户管理',
          children: [
            {
              id: 21,
              label: '部门员工',
            },
            {
              id: 22,
              label: '角色权限',
            },
            {
              id: 23,
              label: '数据字典',
            },
          ],
        },
        {
          id: 3,
          label: '收费管理',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
};
</script>

<style></style>
