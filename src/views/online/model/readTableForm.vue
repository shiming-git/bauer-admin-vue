<template>
  <el-transfer
    filterable
    filter-placeholder="请输入表名"
    :props="{
      key: 'table_name',
      label: 'table_name',
      disabled: 'disabled',
    }"
    v-model="value"
    :data="generateData"
  >
  </el-transfer>
</template>
<script>
import http from "@/http/http";

export default {
  name: "readTableForm",

  data() {
    return {
      model: {},
      modelDefault: {},
      rules: {},
      url: {
        addOnl: "/onl/onl_table/all",
        editOnl: "/onl/onl_table/all",
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
      delete record.children;
      this.model = Object.assign({}, record);
      this.getmodelist();
    },
    getmodelist() {
      Promise.all([this.$api.getReadTable(), this.$api.getOnlTableAll()]).then(
        (posts) => {
          let table = Object.assign([], posts[0].data);
          let onl_table = Object.assign([], posts[1].data);
          let key = [];
          onl_table.forEach((item) => {
            key.push(item["table_name"]);
          });
          table.forEach((item) => {
            if (key.indexOf(item["table_name"]) >= 0) {
              item["disabled"] = true;
            }
          });
          this.generateData = table;
        }
      );
    },
    submitForm() {
      console.log(this.value);
      let list = [];
      for (let i in this.value) {
        let item = this.tableFormHeald(this.value[i], this.generateData);
        list.push(item);
      }
      http.post(this.url.addOnl, { tables: list }).then((res) => {
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
    },

    tableFormHeald(key, list) {
      for (let i in list) {
        let itme = list[i];
        if (itme["table_name"] == key) {
          return Object.assign({}, itme);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-transfer-panel {
  width: 300px !important;
  height: 400px !important;
}
/deep/ .el-transfer-panel__body {
  height: 290px !important;
}
/deep/ .el-transfer-panel__list.is-filterable {
  height: 100% !important;
}
</style>