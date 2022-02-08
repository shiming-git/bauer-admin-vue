<template>
  <dir class="x-content">
    <el-container style="height: 100%">
      <el-header>
        <HeaderCom />
      </el-header>
      <el-container>
        <el-aside width="200px" style="overflow-y: hidden">
          <el-menu
            :default-active="NavigationIndex"
            class="el-menu-vertical-demo"
          >
            <NavigationCom :list="getNavigationList" />
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 标签页 -->
          <el-tabs
            type="border-card"
            v-model="editableTabsValue"
            size="small"
            id="x-el-tabs"
            @tab-click="handleClick"
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="item in getEditableTabs"
              :key="item.id + ''"
              :name="item.id + ''"
              :closable="item.isclosable"
            >
              <span slot="label">
                <i :class="item.iconCls"></i> {{ item.name }}
              </span>
            </el-tab-pane>
          </el-tabs>
          <!-- 页面 -->
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
    <!-- 铃声 -->
    <audio controls="controls" hidden :src="audioMP3" ref="audioRef"></audio>
  </dir>
</template>
<script>
import Au8407 from "@/assets/8407.wav";
import { mapGetters, mapMutations } from "vuex";
import NavigationCom from "@/components/NavigationCom.vue";
import AppMain from "@/components/AppMain.vue";
import HeaderCom from "@/components/HeaderCom.vue";
import { TabsList } from "@/util/entity";

export default {
  components: {
    NavigationCom,
    HeaderCom,
    AppMain,
  },
  data() {
    return {
      audioMP3: Au8407,
      NavigationIndex: "",
      editableTabsValue: "-1",
    };
  },

  computed: {
    ...mapGetters([
      "getNavigationList",
      "getUserInfo",
      "getChatFriend",
      "getChatFriendsList",
      "getCusUserInfo",
      "getEditableTabs",
      "getEditableTabsValue",
    ]),
  },
  created() {},
  mounted() {
    this.initEditableTabs();
    // this.initWebSocket();
  },
  methods: {
    ...mapMutations([
      "setNavigationList",
      "addChatList",
      "setChatFriend",
      "setChatFriendsList",
      "setEditableTabs",
      "setEditableTabsValue",
      "deleteEditableTabs",
      "triggerEditableTabs",
    ]),

    // 链接websocket 并将做为全局变量
    // initWebSocket() {
    //   let userId = this.getUserInfo.userId;

    //   let websockLink = "ws://localhost:8021/api-websocket/websocket/" + userId;
    //   // let websockLink = "wss://lookup.sichuangde.com/api-websocket/websocket/" + userId;
    //   window.websock = new WebSocket(websockLink);
    //   window.websock.onopen = this.websocketonopen;
    //   window.websock.onerror = this.websocketonerror;
    //   window.websock.onmessage = this.websocketonmessage;
    //   window.websock.onclose = this.websocketclose;
    // },
    // websocketonopen() {
    //   console.log("WebSocket连接成功");
    //   this.heartbeat();
    // },
    // websocketonerror(e) {
    //   console.log("WebSocket连接发生错误");
    //   this.clearbeat();
    // },
    // websocketonmessage(e) {
    //   console.log("WebSocket信息通知");
    //   let SocketMass = JSON.parse(e.data);
    //   //聊天
    //   if (SocketMass.doc == "chat") {
    //     SocketMass.data.isOwn = false;
    //     this.$refs.audioRef.currentTime = 0; //从头开始播放提示音
    //     this.$refs.audioRef.play(); //播放
    //     this.messageReceived(SocketMass.data);
    //   }
    // },
    // websocketclose(e) {
    //   console.log("关闭WebSocket连接");
    //   let that = this;
    //   this.clearbeat();
    //   if (getSession("token") && getSession("userInfo")) {
    //     setTimeout(() => {
    //       that.initWebSocket();
    //     }, 2000);
    //   }
    // },

    // 心跳包 5分钟一次 150000
    // heartbeat() {
    //   let that = this;
    //   this.iswebsock = setInterval(function () {
    //     if (!window.websock || !that.iswebsock) {
    //       that.clearbeat();
    //       return;
    //     }
    //     console.log("心跳包发送...");
    //     let docstr = JSON.stringify(Instructions("ping", {}));
    //     window.websock.send(docstr);
    //     that.heartbeatRefresh();
    //   }, 150000);
    // },
    // 停止心跳
    // clearbeat() {
    //   if (this.iswebsock) {
    //     clearInterval(this.iswebsock);
    //     this.iswebsock = null;
    //   }
    //   if (window.websock) {
    //     window.websock.close();
    //     window.websock = null;
    //   }
    // },
    //接收到消息处理
    // messageReceived(item) {
    //   //添加聊天记录
    //   let userlist = messageReceivedFun(this.getChatFriendsList, item);
    //   //判断是否提示
    //   let obj = messageClearNumberFun(userlist, this.getCusUserInfo);
    //   if (obj) {
    //     userlist = obj.list;
    //     this.addChatList(item);
    //   }
    //   //分组
    //   let friendList = friendManagementFun(this.getChatFriend, userlist);
    //   this.setChatFriendsList(userlist);
    //   this.setChatFriend(friendList);
    // },
    //心跳包刷新好友状态
    // heartbeatRefresh() {
    //   let par = {
    //     userId: this.getUserInfo.userId,
    //   };
    //   this.$api.getFriendlist(par).then((res) => {
    //     if (res.code != "00000") {
    //       this.$message.error(res.msg);
    //       return;
    //     }
    //     //共享列表状态
    //     let list = messageRefreshFun(this.getChatFriendsList, res.data);
    //     this.setChatFriendsList(list);
    //     var arr = Object.keys(this.getChatFriend);
    //     if (arr.length <= 0) {
    //       return;
    //     }
    //     //分组
    //     let friendList = friendManagementFun(this.getChatFriend, list);
    //     this.setChatFriend(friendList);
    //   });
    // },
    //标签页
    initEditableTabs() {
      this.setEditableTabs([]);
      let path = this.$route.path;
      let obj = this.lookupPath(path, this.getNavigationList);
      if (Object.keys(obj).length > 0) {
        this.triggerEditableTabs(obj);
      } else {
        let obj = TabsList();
        obj.id = "-1";
        obj.name = "首页";
        obj.path = "/homePage";
        obj.iconCls = "el-icon-message";
        obj.pageName = "index";
        obj.isclosable = false;
        this.triggerEditableTabs(obj);
      }
    },

    // 找路径
    lookupPath(path, list) {
      let obj = {};
      for (let i in list) {
        let item = list[i];
        if (item.modelURL == path) {
          obj = TabsList();
          obj.id = item.modelID;
          obj.name = item.modelName;
          obj.path = item.modelURL;
          obj.iconCls = item.modelIcon;
          obj.pageName = item.pageName;
          obj.isclosable = true;
          return obj;
        }
        if (item.children.length > 0) {
          obj = this.lookupPath(path, item.children);
        }
        if (Object.keys(obj).length > 0) {
          return obj;
        }
      }
      return obj;
    },

    handleClick(targetName) {
      this.setEditableTabsValue(targetName.paneName);
    },
    removeTab(id) {
      this.deleteEditableTabs(id);
    },
  },
  watch: {
    getEditableTabsValue: function (newVal) {
      let list = this.getEditableTabs;
      for (let i in list) {
        if (list[i].id == newVal) {
          this.editableTabsValue = newVal;
          this.$router.push({ path: list[i].path });
          return;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.x-content {
  height: 100vh;
  width: 100vw;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}

.el-header {
  background-color: royalblue;
}

.el-aside {
  background-color: #f2f2f2;
  overflow: hidden;
  padding-right: 2px;
  box-sizing: border-box;
}
.el-scrollbar {
  height: 90vh;
  overflow-x: hidden;
}
.el-main {
  padding: 10px;
}

// .el-tabs--border-card > .el-tabs__content {
//   padding: 0px !important;
// }
// .el-tabs--border-card > .el-tabs__content {
//   padding: 0px !important;
// }
</style>