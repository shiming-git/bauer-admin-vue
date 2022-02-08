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
        property="show_form"
        label="显示表单"
        width="80"
        align="center"
      >
        <template scope="scope">
          <el-checkbox
            v-model="scope.row.show_form"
            size="medium"
            true-label="Y"
            false-label="N"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        property="show_list"
        label="显示列表"
        width="80"
        align="center"
      >
        <template scope="scope">
          <el-checkbox
            v-model="scope.row.show_list"
            size="medium"
            true-label="Y"
            false-label="N"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        property="is_sort"
        label="是否排序"
        width="80"
        align="center"
      >
        <template scope="scope">
          <el-checkbox
            v-model="scope.row.is_sort"
            size="medium"
            true-label="Y"
            false-label="N"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        property="is_read_only"
        label="是否只读"
        width="80"
        align="center"
      >
        <template scope="scope">
          <el-checkbox
            v-model="scope.row.is_read_only"
            size="medium"
            true-label="Y"
            false-label="N"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        property="control_type"
        label="控件类型"
        width="150"
        align="center"
      >
        <template scope="scope">
          <el-input
            size="small"
            v-model="scope.row.control_type"
            placeholder="控件类型"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column
        property="is_query"
        label="是否查询"
        width="80"
        align="center"
      >
        <template scope="scope">
          <el-checkbox
            v-model="scope.row.is_query"
            size="medium"
            true-label="Y"
            false-label="N"
          ></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column
        property="control_width"
        label="控件长度"
        width="180"
        align="center"
      >
        <template scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.control_width"
            :step="1"
          ></el-input-number>
        </template>
      </el-table-column>

      <el-table-column
        property="field_default"
        label="默认值"
        width="180"
        align="center"
      >
        <template scope="scope">
          <el-input
            size="small"
            v-model="scope.row.field_default"
            placeholder="默认值"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "onPagePropertiesTable",
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
      clientHeight: "200", // - 280
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