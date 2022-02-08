<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { getSession, removeSession } from "./util/sessionStorage";
import { addRouterHandle } from "@/router/handle";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    // 检查token
    let token = getSession("token");
    //插件userinfo
    let userinfo = getSession("userInfo");
    if (!token || !userinfo) {
      removeSession("token");
      removeSession("userInfo");
    } else {
      this.setUserInfo(JSON.parse(userinfo));
      this.setToken(token);
      this.getNavigation();
    }
  },
  methods: {
    ...mapMutations(["setUserInfo", "setToken"]),
    //获取导航
    getNavigation() {
      addRouterHandle().then(() => {});
    },
  },
};
</script>
<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
}
.x-table-top {
  text-align: left;
  padding: 5px;
  box-sizing: border-box;
}
.el-form-item {
  text-align: left;
}

</style>
