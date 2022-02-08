<template>
  <div class="x-content">
    <el-form
      :model="ValidateForm"
      ref="form"
      label-width="60px"
      size="mini"
      class="x-form"
      :rules="rules"
      status-icon
    >
      <div class="x-title">
        <img :src="logSrc" alt="" />
        <div>小树苗系统工具</div>
      </div>
      <el-form-item label="账号" prop="userName">
        <el-input
          placeholder="请输入账号"
          v-model="ValidateForm.userName"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="realName" v-if="!isLogin">
        <el-input
          placeholder="请输入名称"
          v-model="ValidateForm.realName"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="ValidateForm.passWord"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: left" v-if="isLogin">
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button type="" @click="switchState(false)">注册</el-button>
      </el-form-item>
      <el-form-item style="text-align: left" v-else>
        <el-button type="" @click="switchState(true)">登录</el-button>
        <el-button type="primary" @click="resetForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { setSession } from "@/util/sessionStorage";
import logo from "@/assets/logo.png";
import { addRouterHandle } from "@/router/handle";
export default {
  data() {
    return {
      logSrc: logo,
      isLogin: true,
      ValidateForm: {
        userName: "", //账号
        realName: "", //用户名称
        passWord: "", //密码
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        realName: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //切换状态
    switchState() {
      this.isLogin = !this.isLogin;
    },
    //登录
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        let from = JSON.parse(JSON.stringify(this.ValidateForm));
        from.passWord = this.$md5(from.passWord);
        this.$api.login(from).then((res) => {
          if (res.code != "00000") {
            this.$message.error("账号或密码错误！");
            return;
          }
          let userinfo = res.data.userinfo;
          setSession("token", res.data.token);
          setSession("userInfo", JSON.stringify(userinfo));
          this.$store.commit('setToken',res.data.token)
          this.$store.commit('userInfo',res.data.token)

          this.getNavigation()
        });
      });
    },
    //注册
    resetForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        let from = JSON.parse(JSON.stringify(this.ValidateForm));
        from.passWord = this.$md5(from.passWord);

        this.$api.userRegister(from).then((res) => {
          if (res.code != "00000") {
            this.$message.error(res.msg);
            return;
          }
          this.$message({
            message: "恭喜注册成功，快去登录吧",
            type: "success",
          });
          this.switchState();
        });
      });
    },

    //获取导航
    getNavigation() {
      addRouterHandle().then(() => {
        this.$router.push({ path: "/index" });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.x-content {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: #030828;
  background-image: url("../assets/loginbg.jpg");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .x-form {
    width: 300px;
    height: 350px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    padding-top: 40px;
    box-sizing: border-box;
    background-color: rgba($color: #fff, $alpha: 1);
    margin-right: 10%;

    .x-title {
      color: #0e1d3c;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;

      img {
        width: 40px;
        margin-right: 10px;
      }
    }
  }
  .el-input {
    width: 210px;
  }
}
</style>