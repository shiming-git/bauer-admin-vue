<template>
  <div>
    <div class="x-table-top">
      <el-row>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus"
          @click="addHandle()"
        >
          添加
        </el-button>

        <el-button
          type="primary"
          size="small"
          icon="el-icon-receiving"
          @click="readTableHandle"
        >
          导入数据库表
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-magic-stick"
          @click="handlerGeneration"
        >
          代码生成
        </el-button>

        <template v-if="multipleSelection.length > 0">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="batchdeleteHandle"
          >
            批量移除
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete">
            批量删除
          </el-button>
        </template>
      </el-row>
    </div>
    <x-table
      rowKey="id"
      :tableColumn="tableColumn"
      :tableData="tableData"
      :loading="loading"
      :pagination="ipagination"
      isSelection
      isNumber
      v-model="multipleSelection"
      @onpage="handlePage"
    >
      <template v-slot:updataState="{ row }">
        <el-switch
          v-model="row.roleStat"
          size="mini"
          active-value="0"
          inactive-value="1"
          @change="updataHandle(row)"
        ></el-switch>
      </template>

      <template v-slot:modify="{ txt, row, index }">
        <el-button type="text" size="small" @click="editHandle(row)"
          >编辑</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-dropdown size="small">
          <el-button type="text" size="small"> 更多 </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-copy-document"
              @click.native="createForm(row.table_name)"
            >
              同步表单
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-delete"
              @click.native="deleteHandle(row.id)"
            >
              移除记录
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-coin"> 删除表单 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </x-table>

    <OnlOnlTableFieldModel ref="model" @ok="submitForm"></OnlOnlTableFieldModel>
    <readTableModel ref="readModel" @ok="submitReadForm"></readTableModel>
    <onlGenerationModel
      ref="generationModel"
      @ok="submitGenerationForm"
    ></onlGenerationModel>
  </div>
</template>
<script>
import http from "@/http/http";
import { pageMiXin } from "@/mixins/pageMiXin";
import readTableModel from "./model/readTableModel";
import onlGenerationModel from "./model/onlGenerationModel";
import OnlOnlTableFieldModel from "./model/OnlOnlTableFieldModel";

export default {
  name: "onlTable",
  mixins: [pageMiXin],
  components: {
    readTableModel,
    onlGenerationModel,
    OnlOnlTableFieldModel,
  },
  data() {
    return {
      table_name: "onl_table",
      /* 排序参数 */
      isorter: {
        column: "create_time",
        order: "DESC",
      },
      config: {
        setting_button: true,
      },
      url: {
        list: "/onl/onl_table",
        edit: "/onl/onl_table",
        delete: "/onl/onl_table",
        create_form: "/onl/onl_table_create_form",
      },
    };
  },
  created() {},
  methods: {
    //  获取数据库表
    readTableHandle() {
      if (this.$refs.readModel) {
        this.$refs.readModel.title = "导入数据库表";
        this.$refs.readModel.add();
      }
    },
    submitReadForm() {
      this.handleRequest();
    },

    handlerGeneration() {
      if (
        this.multipleSelection.length <= 0 ||
        this.multipleSelection.length > 1
      ) {
        return this.$message.error("请选择一条数据");
      }

      let id = this.multipleSelection[0];
      let item = {};
      for (let i in this.tableData) {
        if (this.tableData[i]["id"] == id) {
          item = this.tableData[i];
          break;
        }
      }

      this.$refs.generationModel.title = "代码生成器";
      this.$refs.generationModel.edit(item);
    },

    submitGenerationForm() {},

    createForm(table_name) {
      http
        .post(this.url.create_form, { table_name: table_name })
        .then((res) => {
          if (res.code != "00000") {
            this.$message.error(res.message);
            return;
          }
          this.$message({
            message: "操作成功",
            type: "success",
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
</style>