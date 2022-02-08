<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      :max-height="clientHeight"
      highlight-current-row
      style="width: 100%"
      size="small"
      rowKey="id"
    >
      <el-table-column
        property="field_name"
        label="字段名"
        width="180"
        align="center"
      >
        <template scope="scope">
          <el-input
            size="small"
            v-model="scope.row.field_name"
            placeholder="请输入内容"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="field_describe"
        label="字段描述"
        width="180"
        align="center"
      >
        <template scope="scope">
          <el-input
            size="small"
            v-model="scope.row.field_describe"
            placeholder="字段描述"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="validation_rules"
        label="校验规则"
        width="180"
        align="center"
      >
        <template scope="scope">
          <el-input
            size="small"
            v-model="scope.row.validation_rules"
            placeholder="校验规则"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="validation_required"
        label="校验必填"
        width="80"
        align="center"
      >
        <template scope="scope">
          <el-checkbox
            v-model="scope.row.validation_required"
            size="medium"
            true-label="Y"
            false-label="N"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        property="dictionary_table"
        label="字典Table"
        width="180"
        align="center"
      >
        <template scope="scope">
          <el-input
            size="small"
            v-model="scope.row.dictionary_table"
            placeholder="字典Table"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="dictionary_code"
        label="字典Code"
        width="180"
        align="center"
      >
        <template scope="scope">
          <el-input
            size="small"
            v-model="scope.row.dictionary_code"
            placeholder="字典Code"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="dictionary_text"
        label="字典Text"
        width="180"
        align="center"
      >
        <template scope="scope">
          <el-input
            size="small"
            v-model="scope.row.dictionary_text"
            placeholder="字典Text"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "onlCheckFieldTable",
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    dataList(val) {
      this.setTableData(val);
    },
  },
  data() {
    return {
      clientHeight: "300", // - 280
      tableData: [],
      currentRow: null,
    };
  },
  created() {
    this.clientHeight = `${document.documentElement.clientHeight}` - 390;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}` - 390;
    };
  },
  mounted() {},

  methods: {
    setTableData(list) {
      this.tableData = list;
    },

    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>