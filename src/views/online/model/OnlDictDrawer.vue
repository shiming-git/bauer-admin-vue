<template>
  <div>
    <el-drawer
      :visible.sync="isVisible"
      :with-header="withHeader"
      :show-close="true"
    >
      <span>
        <el-page-header
          @back="goBack"
          :content="rowObj.table"
          style="margin: 10px"
        ></el-page-header>
        <el-table :data="tableData" style="width: 100%" border size="small">
          <el-table-column prop="table" label="名称" align="center">
          </el-table-column>
          <el-table-column prop="code" label="编码" align="center">
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showEdit(scope.row)"
                >编辑</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                type="text"
                size="small"
                @click="deleteField(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-row style="margin: 10px">
          <el-col :span="12">
            <el-button type="primary" round size="small" @click="showAdd"
              >添加字典</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-drawer>

    <!-- 添加弹窗 -->
    <readTableModel ref="modelField" @ok="submitForm"></readTableModel>
  </div>
</template>
<script>
import http from "@/http/http";
import readTableModel from "./OnlDictFieldModel";

export default {
  name: "OnlDictDrawer",
  components: { readTableModel },
  props: {
    title: {
      type: String,
      default: "",
    },
    withHeader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: false,
      dialogVisible: false,
      model: {},
      rowObj: {},
      tableData: [],
      fromMode: {},
      url: {
        field: "/onl/onl_dict_field",
        fieldOne: "/onl/onl_dict_field/one",
      },
    };
  },
  created() {},
  methods: {
    edit(row) {
      this.rowObj = Object.assign({}, row);
      this.tableData = [];
      this.getFieldList();
      this.isVisible = true;
    },
    goBack() {
      this.isVisible = false;
    },

    showAdd() {
      let row = {
        dict_code: this.rowObj.code,
      };
      this.$refs.modelField.title = "添加";
      this.$refs.modelField.add(row);
    },
    showEdit(row) {
      this.$refs.modelField.title = "修改";
      this.$refs.modelField.edit(row);
    },

    submitForm() {
      this.getFieldList();
    },

    deleteField(row) {
      let that = this;
      this.$confirm("此操作将删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        http
          .delete(this.url.field, { ids: row.id, dict_code: row.dict_code })
          .then((res) => {
            if (res.code !== "00000") {
              return this.$message.error(res.message);
            }
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            that.getFieldList();
          });
      });
    },

    getFieldList() {
      let parm = {
        dict_code: this.rowObj.code,
        column: "sort",
        order: "ASC",
      };
      http.get(this.url.field, parm).then((res) => {
        if (res.code != "00000") {
          return;
        }
        this.tableData = res.data.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>