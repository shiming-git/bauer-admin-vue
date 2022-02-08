<template>
  <span>
    <span v-for="route in list" :key="route.modelID">
      <el-submenu
        :index="route.modelID + ''"
        v-if="route.children && route.children.length > 0"
        style="text-align: left;"
      >
        <template slot="title">
          <i :class="route.modelIcon"></i>
          <span>{{ route.modelName }}</span>
        </template>
        <NavigationCom :list="route.children" />
      </el-submenu>
      <el-menu-item
        :index="route.modelID + ''"
        v-else
        @click.native.stop="clicknavig(route)"
        style="text-align: left;"
      >
        <span slot="title">{{ route.modelName }}</span>
      </el-menu-item>
    </span>
  </span>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { TabsList } from "@/util/entity";
export default {
  name: "NavigationCom",
  props: {
    list: Array,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapMutations(["triggerEditableTabs"]),
    //点击导航事件
    clicknavig(item) {
      let obj = TabsList();
      obj.id = item.modelID;
      obj.name = item.modelName;
      obj.path = item.modelURL;
      obj.iconCls = item.modelIcon;
      obj.pageName = item.pageName;
      obj.isclosable = true;
      this.triggerEditableTabs(obj);
    },
  },
};
</script>
<style lang="scss" scoped>

</style>