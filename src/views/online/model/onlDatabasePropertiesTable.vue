<template>
  <div>
    <el-row>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus"
        @click="handleAdd"
      >
        添加
      </el-button>
      <el-button
        type="danger"
        size="mini"
        icon="el-icon-delete"
        @click="handleDelete"
      >
        删除
      </el-button>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="tableData"
      :max-height="clientHeight"
      highlight-current-row
      style="width: 100%"
      size="small"
      rowKey="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column property="sort" label="排序" width="150" align="center">
        <template scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.sort"
            :step="1"
          ></el-input-number>
        </template>
      </el-table-column>
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
            placeholder="字段名"
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
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="field_type"
        label="字段类型"
        width="160"
        align="center"
      >
        <template scope="scope">
          <x-select
            v-model="scope.row.field_type"
            placeholder="字段类型"
            dict="onl_table_field_type"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column
        property="field_length"
        label="字段长度"
        width="150"
        align="center"
      >
        <template scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.field_length"
            :step="1"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        property="field_decimal"
        label="小数点"
        width="150"
        align="center"
      >
        <template scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.field_decimal"
            :step="1"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        property="field_is_null"
        label="允许为空"
        width="80"
        align="center"
      >
        <template scope="scope">
          <el-checkbox
            v-model="scope.row.field_is_null"
            size="medium"
            true-label="YES"
            false-label="NO"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        property="field_is_key"
        label="是否主键"
        width="80"
        align="center"
      >
        <template scope="scope">
          <el-checkbox
            v-model="scope.row.field_is_key"
            size="medium"
            true-label="PRI"
            false-label=""
          ></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "onlDatabasePropertiesTable",
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
      keys: [],
    };
  },
  created() {
    this.clientHeight = `${document.documentElement.clientHeight}` - 420;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}` - 420;
    };
  },
  mounted() {},

  methods: {
    setTableData(list) {
      this.tableData = list;
    },

    handleDelete() {
      let keys = Object.assign([], this.keys);
      this.$refs.multipleTable.clearSelection();
      this.$emit("delete", keys);
    },

    handleAdd() {
      this.$emit("add");
    },
    // 手动勾选
    handleSelectionChange(selects) {
      let keys = [];
      selects.forEach((row) => {
        keys.push(row["id"]);
      });
      this.keys = keys;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>