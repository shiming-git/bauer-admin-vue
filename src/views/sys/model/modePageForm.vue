<template>
  <el-form
    :model="model"
    :rules="rules"
    label-width="80px"
    size="small"
    ref="form"
  >
    <el-form-item label="模板名称" prop="modelName">
      <el-input
        v-model="model.modelName"
        show-word-limit
        maxlength="10"
      ></el-input>
    </el-form-item>

    <el-form-item label="模板链接" prop="modelURL">
      <el-input
        v-model="model.modelURL"
        show-word-limit
        maxlength="255"
      ></el-input>
    </el-form-item>

    <el-form-item label="页面路径" prop="modelPath">
      <el-input
        v-model="model.modelPath"
        show-word-limit
        maxlength="255"
      ></el-input>
    </el-form-item>

    <el-form-item label="页面名称" prop="pageName">
      <el-input
        v-model="model.pageName"
        show-word-limit
        maxlength="255"
      ></el-input>
    </el-form-item>

    <el-form-item label="模块icon" prop="modelIcon">
      <el-input
        v-model="model.modelIcon"
        show-word-limit
        maxlength="255"
      ></el-input>
    </el-form-item>

    <el-form-item label="父级模块" prop="modelSup">
      <el-select
        v-model="treeData"
        placeholder="请选择..."
        style="width: 16rem"
      >
        <el-option
          :value="treeDataValue"
          style="height: auto; background-color: white"
        >
          <el-tree
            ref="tree"
            :data="treeArray"
            node-key="modelID"
            :props="defaultProps"
            @node-click="handleNodeClick"
            size="mini"
          />
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="模块排序" prop="modelSort">
      <el-input-number v-model="model.modelSort" :min="1"></el-input-number>
    </el-form-item>

    <el-form-item label="模块状态" prop="modelState">
      <el-switch
        v-model="model.modelState"
        size="mini"
        active-value="0"
        inactive-value="1"
      ></el-switch>
    </el-form-item>
  </el-form>
</template>
<script>
import { cacheNavigation } from "@/http/cacheApi";
import http from "@/http/http";
export default {
  name: "modePageForm",
  data() {
    return {
      model: {},
      treeArray: [],
      treeData: "",
      treeDataValue: "",
      defaultProps: {
        children: "children",
        label: "modelName",
      },
      rules: {
        modelName: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        modelURL: [
          { required: true, message: "请输入模板链接", trigger: "blur" },
        ],
        modelSup: [
          { required: true, message: "请选择父级模块", trigger: "blur" },
        ],
        modelSort: [
          { required: true, message: "请选择模块排序", trigger: "blur" },
        ],
        modelIcon: [
          { required: true, message: "请输入模块icon", trigger: "blur" },
        ],
        modelState: [
          { required: true, message: "请输入模块状态", trigger: "blur" },
        ],
        pageName: [
          { required: true, message: "请输入页面名称", trigger: "blur" },
        ],
        modelPath: [
          { required: true, message: "请输入页面路径", trigger: "blur" },
        ],
      },

      url: {
        list: "/sys/model/getmodelist",
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
      delete record.children;
      this.model = Object.assign({}, record);
      this.getmodelist();
    },

    //选择树形
    handleNodeClick(data) {
      this.treeDataValue = data;
      this.treeData = data.modelName;
      this.model.modelSup = data.modelID;
    },
    //获取页面列表
    getmodelist() {
      cacheNavigation().then((res) => {
        this.treeArray = res.rootNav;
        if (this.model.modelSup) {
          let item = this.handleQuery(
            Number(this.model.modelSup),
            this.treeArray
          );
          if (item) {
            this.treeData = item.modelName;
          }
        }
      });
    },
    //查找
    handleQuery(key, list) {
      let then = this;
      let obj = null;
      for (let i in list) {
        let item = list[i];
        if (item.modelID == key) {
          obj = { modelID: item.modelID, modelName: item.modelName };
          return obj;
        }
        if (item.children && item.children.length > 0) {
          obj = then.handleQuery(key, item.children);
          if (obj) {
            return obj;
          }
        }
      }
      return obj;
    },

    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.model.modelID) {
          http.put(this.url.list, this.model).then((res) => {
            if (res.code != "00000") {
              this.$message.error(res.message);
              this.$emit("err");
              return;
            }
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.$emit("ok");
          });
        } else {
          http.post(this.url.list, this.model).then((res) => {
            if (res.code != "00000") {
              this.$message.error(res.message);
              this.$emit("err");
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