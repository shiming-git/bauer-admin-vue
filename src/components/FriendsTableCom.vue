<template>
  <div>
    <!-- 列表头 -->
    <el-row class="x-operation">
      <el-col :span="20"> 好友列表 </el-col>
      <el-col :span="4">
        <el-dropdown trigger="click">
          <el-button
            type="primary"
            plain
            icon="el-icon-s-tools"
            circle
            size="mini"
          ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-s-unfold"
              @click.native="managementGroup"
              >管理分组</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <el-dialog title="分组管理" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form
          label-width="80px"
          :model="formLabelAlign"
          size="small"
          v-loading="loading"
        >
          <el-form-item label="名称" prop="groupName">
            <el-input v-model="formLabelAlign.groupName"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number
              v-model="formLabelAlign.sort"
              :min="1"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <!-- 内弹窗 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false" size="small">关闭</el-button>
          <el-button @click="serve" type="primary" size="small">确定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="getChatFriend"
        column-key="groupId"
        style="width: 100%"
        size="small"
      >
        <el-table-column prop="groupName" label="分组名称"> </el-table-column>
        <el-table-column prop="sort" label="排序" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="scope.row.groupId > 0">
            <el-button size="mini" @click="editGroup(scope.row)"
              >编辑</el-button
            >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click="delGroup(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="outerVisible = false">关闭</el-button>
        <el-button size="mini" type="primary" @click="addGroup()"
          >添加</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

function initfrom() {
  return {
    groupId: "", //分组Id
    userId: "", //用户ID
    groupName: "", //分组名称
    newDate: "", //创建时间
    sort: 0, //排序
  };
}
export default {
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      loading: false,
      formLabelAlign: {},
    };
  },
  computed: {
    ...mapGetters(["getChatFriend", "getUserInfo"]),
  },
  methods: {
    //管理分组
    managementGroup() {
      this.outerVisible = true;
    },
    //添加
    addGroup() {
      this.formLabelAlign = initfrom();
      this.formLabelAlign.sort = this.getChatFriend.length + 1;
      this.innerVisible = true;
    },
    //管理
    editGroup(item) {
      delete item.userList;
      this.formLabelAlign = item;
      this.innerVisible = true;
    },
    //删除
    delGroup(item) {
      let par = {
        id: item.groupId,
        uid: this.getUserInfo.userId,
      };
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.delFriendgroup(par).then((res) => {
          if (res.code != "00000") {
            this.$message.error(res.msg);
            return;
          }
          this.$notify({
            title: "成功",
            message: "成功删除",
            type: "success",
          });
          this.$emit("updataFried");
        });
      });
    },

    //确认修改
    serve() {
      this.formLabelAlign.userId = this.getUserInfo.userId;
      if (this.formLabelAlign.groupId) {
        this.$api.editFriendgroup(this.formLabelAlign).then((res) => {
          if (res.code != "00000") {
            this.$message.error(res.msg);
            return;
          }
          this.$notify({
            title: "成功",
            message: "成功修改",
            type: "success",
          });
          this.innerVisible = false;
          this.$emit("updataFried");
        });
      } else {
        this.$api.addFriendgroup(this.formLabelAlign).then((res) => {
          if (res.code != "00000") {
            this.$message.error(res.msg);
            return;
          }

          this.$notify({
            title: "成功",
            message: "成功添加",
            type: "success",
          });
          this.innerVisible = false;
          this.$emit("updataFried");
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.x-operation {
  width: 100%;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-top: none;
  border-left: none;
  padding: 2px 0px;
  box-sizing: border-box;
}
.el-col:nth-child(1) {
  font-weight: bold;
  color: black;
  line-height: 30px;
}
.el-popconfirm {
  padding-left: 5px;
}
</style>