<template>
  <div>
    <div class="x-table-top">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus"
        @click="addHandle()"
        >添加</el-button
      >
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="modelID"
      border
      size="mini"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="modelName" label="模板名称"></el-table-column>
      <el-table-column prop="modelURL" label="模板链接"></el-table-column>
      <el-table-column prop="pageName" label="页面名称"></el-table-column>
      <el-table-column prop="modelIcon" label="模块icon">
        <template slot-scope="scop">
          <i :class="scop.row.modelIcon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="modelSort" label="模块排序"></el-table-column>
      <el-table-column prop="modelState" label="模块状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.modelState"
            size="mini"
            active-value="0"
            inactive-value="1"
            @change="updataHandle(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editHandle(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteHandle(scope.row.modelID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <modePageModel ref="model" @ok="submitForm"></modePageModel>
  </div>
</template>
<script>
import { pageMiXin } from "@/mixins/pageMiXin";
import modePageModel from "./model/modePageModel";
import { cacheNavigation } from "@/http/cacheApi";
import http from "@/http/http";

export default {
  name: "modePage",
  mixins: [pageMiXin],
  components: { modePageModel },
  data() {
    return {
      pageName: "菜单管理",
      dataSheetName: "sys_model",
      isPublicMethod: false,

      Havigation: {},
      tableData: [],
      dialogVisible: false,
      treeArray: [],
      defaultProps: {
        children: "children",
        label: "modelName",
      },

      url: {
        list: "/sys/model/getmodelist",
        add:"/sys/model/getmodelist",
        edit:"/sys/model/getmodelist",
        delete:"/sys/model/getmodelist"
      },
    };
  },
  created() {
    this.getmodelist();
  },
  methods: {
    //获取页面列表
    getmodelist() {
      cacheNavigation(true).then((res) => {
        this.tableData = res.nav;
      });
    },

    submitForm() {
      this.getmodelist();
    },
  },
};
</script>
<style lang="scss" scoped>
.a {
  background-color: white;
}
</style>