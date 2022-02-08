<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="x-logo">
          <img :src="logourl" />
          <div>小树苗系统工具</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="x-user">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ getUserInfo.userName || "" }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" @click.native="uodatameans">
                修改资料
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" @click.native="updatapass">
                修改密码
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-switch-button"
                @click.native="logout"
              >
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-avatar :size="40" :src="getUserInfo.userUserHeadUrl || ''">
            <el-avatar :size="40" icon="el-icon-user-solid"></el-avatar>
          </el-avatar>
        </div>
      </el-col>
    </el-row>

    <!-- 修改密码 -->
    <el-dialog title="收货地址" :visible.sync="dialogPassword" width="30%">
      <el-form
        :model="formPass"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            type="password"
            v-model="formPass.oldPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passWord">
          <el-input
            type="password"
            v-model="formPass.passWord"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPassword = false">取 消</el-button>
        <el-button type="primary" @click="submitpass('ruleForm')">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { setSession, removeSession } from "../util/sessionStorage";
import logo from "../assets/logo.png";
export default {
  data() {
    return {
      logourl: logo,
      dialogPassword: false,
      formPass: {
        userId: "",
        oldPassword: "",
        passWord: "",
      },
      rules: {
        oldPassword: [
          { required: true, min: 3, max: 15, message: "长度在 3 到 15 个字符" },
        ],
        passWord: [
          { required: true, min: 3, max: 15, message: "长度在 3 到 15 个字符" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(["setEditableTabs", "setCachedViews"]),
    uodatameans() {},
    updatapass() {
      this.dialogPassword = true;
    },
    submitpass(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        let from = JSON.parse(JSON.stringify(this.formPass));
        from.userId = this.getUserInfo.userId;
        from.oldPassword = this.$md5(from.oldPassword);
        from.passWord = this.$md5(from.passWord);

        this.$api.updataPass(from).then((res) => {
          if (res.code != "00000") {
            this.$message.error(res.msg);
            return;
          }
          this.$message({
            message: "密码修改成功",
            type: "success",
          });
          this.formPass.userId = "";
          this.formPass.oldPassword = "";
          this.formPass.passWord = "";
          this.dialogPassword = false;
        });
      });
    },

    logout() {
      removeSession("token");
      removeSession("userInfo");
      this.setEditableTabs([]);
      this.setCachedViews([]);
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style lang="scss" scoped>
.x-logo {
  height: 60px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  img {
    height: 40px;
  }

  div {
    font-size: 18px;
    font-weight: bold;
    margin-left: 10px;
  }
}

.x-user {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  .el-dropdown {
    margin: 0px 10px;
    color: white;
  }
}
</style>