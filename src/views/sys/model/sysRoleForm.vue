<template>
  <el-form
    :model="model"
    :rules="rules"
    label-width="80px"
    size="small"
    ref="form"
  >
    <el-row>
      <el-col :span="24">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="model.roleName"
            show-word-limit
            maxlength="10"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="角色排序" prop="roleSort">
          <el-input-number
            v-model="model.roleSort"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="角色状态" prop="roleStat">
          <el-switch
            v-model="model.roleStat"
            size="mini"
            active-value="0"
            inactive-value="1"
          ></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import http from "@/http/http";
export default {
  name: "sysRoleForm",
  data() {
    return {
      model: {},
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      url: {
        model: "/sys/role",
      },
    };
  },
  created() {
    //备份model原始值
    this.modelDefault = JSON.parse(JSON.stringify(this.model));
  },
  methods: {
    add() {
      this.edit(this.modelDefault);
    },
    edit(record) {
      this.model = Object.assign({}, record);
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.model.roleID) {
          http.put(this.url.model, this.model).then((res) => {
            if (res.code != "00000") {
              this.$message.error(res.message);
              this.$emit("err")
              return;
            }
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.$emit("ok");
          });
        } else {
          http.post(this.url.model, this.model).then((res) => {
            if (res.code != "00000") {
              this.$message.error(res.message);
              this.$emit("err")
              return;
            }
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.$emit("ok");
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>