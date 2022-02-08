<template>
  <div>
    <div class="x-table-top">
      <el-row>
        <el-button
          type="primary"
          size="mini"
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
      rowKey="roleID"
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
        <el-button type="text" size="small" @click="editHandle(row)">
          编辑
        </el-button>
        <el-divider direction="vertical"></el-divider>
        <el-dropdown size="small">
          <el-button type="text" size="small"> 更多 </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-copy-document"
              @click.native="showRole(row)"
            >
              授权
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-coin"
              @click.native="deleteHandle(row.roleID)"
            >
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </x-table>

    <sysRoleModel ref="model" @ok="submitForm"></sysRoleModel>
    <sysRoleUserModel ref="modelRole" @ok="submitRoleForm"></sysRoleUserModel>
  </div>
</template>
<script>
import { pageMiXin } from "@/mixins/pageMiXin";
import sysRoleModel from "./model/sysRoleModel";
import sysRoleUserModel from "./model/sysRoleUserModel";

export default {
  name: "sysRole",
  mixins: [pageMiXin],
  components: { sysRoleModel, sysRoleUserModel },
  data() {
    return {
      table_name: "sys_role",
      config: {
        setting_button: true,
      },

      tableData: [],
      url: {
        list: "/sys/role",
        edit: "/sys/role",
        delete: "/sys/role",
      },
    };
  },
  created() {},
  methods: {
    showRole(record) {
      this.$refs.modelRole.title = "角色授权";
      this.$refs.modelRole.edit(record);
    },
    submitRoleForm() {},
  },
};
</script>
<style lang="sass" scoped>
</style>