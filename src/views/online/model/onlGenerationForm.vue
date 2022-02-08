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
        <el-form-item label="表名" prop="table_name" :label-width="labelWidth">
          <el-input
            v-model="model.table_name"
            show-word-limit
            maxlength="50"
            placeholder="请输入表名"
            disabled
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="模块名"
          prop="table_model"
          :label-width="labelWidth"
        >
          <el-input
            v-model="model.table_model"
            show-word-limit
            maxlength="50"
            placeholder="请输入模块名"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="表描述"
          prop="table_describe"
          :label-width="labelWidth"
        >
          <el-input
            v-model="model.table_describe"
            show-word-limit
            maxlength="200"
            placeholder="请输入表描述"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import http from "@/http/http";

export default {
  components: {},
  name: "onlGenerationForm",

  data() {
    return {
      labelWidth: "100px",
      model: {},
      modelDefault: {},
      rules: {
        table_name: [
          { required: true, message: "请输入表名", trigger: "blur" },
        ],
        table_model: [
          { required: true, message: "请输入表描述", trigger: "blur" },
        ],
      },
      url: {
        onlGeneration: "/onl/onl_generation",
      },
      generateData: [],
      value: [],
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
      this.getmodelist();
    },
    getmodelist() {},

    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$emit("err");
          return false;
        }
        http.post(this.url.onlGeneration, this.model).then((res) => {
          if (res.code !== "00000") {
            this.$message.error(res.message);
            this.$emit("err");
          }
          this.$message({
            type: "success",
            message: "代码生成成功!",
          });
          this.$emit("ok");
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>