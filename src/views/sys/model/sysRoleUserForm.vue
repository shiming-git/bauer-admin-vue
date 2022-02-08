<template>
  <el-tree
    :data="treeArray"
    :default-checked-keys="defaultChecked"
    :props="defaultProps"
    check-strictly
    show-checkbox
    default-expand-all
    node-key="modelID"
    ref="tree"
    highlight-current
  >
  </el-tree>
</template>
<script>
import { cacheNavigation } from "@/http/cacheApi";
import http from "@/http/http";

export default {
  name: "sysRoleUserForm",
  data() {
    return {
      model: {},
      rules: {},
      url: {
        list: "/sys/role_model",
      },
      defaultChecked: [],
      treeArray: [],
      defaultProps: {
        children: "children",
        label: "modelName",
      },
    };
  },
  created() {
    //备份model原始值
    this.modelDefault = JSON.parse(JSON.stringify(this.model));
    this.getmodelist();
  },
  methods: {
    add() {
      this.edit(this.modelDefault);
    },
    edit(record) {
      this.model = Object.assign({}, record);
      this.getRoleUser();
    },
    submitForm() {
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      let halfKeys = this.$refs.tree.getHalfCheckedKeys();
      let save = checkedKeys.concat(halfKeys);
      let id = this.model.roleID;
      http.put(this.url.list, { ids: save, roleId: id }).then((res) => {
        if (res.code !== "00000") {
          this.$emit("err")
          return this.$message.error(res.message);
        }
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.$emit("ok");
      });
    },
    //获取页面列表
    getmodelist() {
      cacheNavigation().then((res) => {
        this.treeArray = res.nav;
      });
    },
    getRoleUser() {
      let id = this.model.roleID;
      http.get(this.url.list, { id: id }).then((res) => {
        if (res.code !== "00000") {
          return this.$message.error(res.message);
        }
        let list = res.data.map((item) => {
          return item.modelID;
        });
        this.defaultChecked = list;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>