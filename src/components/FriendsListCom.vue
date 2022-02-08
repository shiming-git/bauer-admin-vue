<template>
  <el-collapse>
    <el-collapse-item
      v-for="(item, index) in list"
      :key="index"
      :title="item.groupName + '(' + item.userList.length + ')'"
      :name="item.groupId"
      class="x-el-collapse"
    >
      <div
        v-for="row in item.userList"
        :key="row.fromUserId"
        class="x-userlist"
      >
        <el-row>
          <el-col :span="5" @click.native="switchChat(row)">
            <el-badge
              :value="row.numberMessages > 0 ? row.numberMessages : null"
              :max="99"
              class="item"
            >
              <el-avatar
                :size="35"
                :src="row.avatarUrl"
                fit="contain"
                :class="row.isLogin == 1 ? '' : 'gray'"
              >
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
            </el-badge>
          </el-col>
          <el-col :span="15" @click.native="switchChat(row)">
            <div :class="row.isLogin == 1 ? 'x-name' : 'x-name x-name-gray'">
              {{ row.noteName || row.realName || "" }}
            </div>
            <div class="x-date">{{ row.loginDate }}</div>
          </el-col>
          <el-col :span="4" class="x-search">
            <el-dropdown size="small">
              <el-button
                :type="row.isLogin == 1 ? 'primary' : 'info'"
                icon="el-icon-more"
                plain
                circle
                size="mini"
              ></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-search"
                  @click.native="iconSearch(row)"
                  >查看足迹</el-dropdown-item
                >
                <el-dropdown-item
                  icon="el-icon-edit"
                  @click.native="iconEdit(row)"
                  >编辑好友</el-dropdown-item
                >
                <el-dropdown-item
                  icon="el-icon-delete"
                  @click.native="iconDelete(row)"
                  >删除好友</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    //切换聊天
    switchChat(item) {
      this.$emit("switchChat", item);
    },
    //查看
    iconSearch(item) {
      this.$emit("iconSearch", item);
    },
    //编辑
    iconEdit(item) {
      this.$emit("iconEdit", item);
    },
    //删除
    iconDelete(item) {
      this.$emit("iconDelete", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.x-el-collapse {
  background-color: white;
  padding: 0px 10px;
  box-sizing: border-box;
}
.x-userlist {
  padding: 10px 0px;
  box-sizing: border-box;
}
.x-name {
  font-size: 12px;
  color: #28272a;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.x-date {
  font-size: 10px;
  color: #b6b6b6;
  text-align: left;
}
.x-search {
  line-height: 40px;
}

.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.x-name-gray {
  color: gray;
}
</style>