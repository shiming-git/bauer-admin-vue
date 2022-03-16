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
          type="danger"
          size="mini"
          icon="el-icon-delete"
          v-if="multipleSelection.length > 0"
          @click="batchdeleteHandle"
        >
          批量删除
        </el-button>
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
      <template v-slot:modify="{ txt, row, index }">
        <el-button type="text" size="small" @click="editHandle(row)"
          >编辑</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" size="small" @click="editDrawer(row)"
          >修改字典</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-dropdown size="small">
          <el-button type="text" size="small"> 更多 </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-delete"
              @click.native="deleteHandle(row.id)"
            >
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </x-table>

    <readTableModel ref="model" @ok="submitForm"></readTableModel>
    <OnlDictDrawer ref="drawer"></OnlDictDrawer>
  </div>
</template>
<script>
import { pageMiXin } from "@/mixins/pageMiXin";
import readTableModel from "./model/OnlDictModel";
import OnlDictDrawer from "./model/OnlDictDrawer";
import { cacheDataDict } from "@/http/cacheApi";

export default {
  name: "OnlOnlDictList",
  mixins: [pageMiXin],
  components: { readTableModel, OnlDictDrawer },
  data() {
    return {
      table_describe: "数据字典",
      table_name: "onl_dict",
      config: {
        setting_button: true,
      },
      isorter: {
        column: "create_time",
        order: "DESC",
      },
      defineAttributes: {
        oper_button: {
          width: "180px",
        },
      },

      url: {
        list: "/onl/onl_dict",
        edit: "/onl/onl_dict",
        delete: "/onl/onl_dict",
      },
    };
  },
  created() {
    cacheDataDict("onl_table_type");
  },
  methods: {
    editDrawer(row) {
      this.$refs.drawer.edit(row);
    },
  },
};
</script>
<style lang="less" scoped>
</style>