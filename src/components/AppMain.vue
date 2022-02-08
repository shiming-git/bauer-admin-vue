<template>
  <section class="x-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {};
  },
  computed: {
    cachedViews() {
      return this.$store.state.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.x-main {
  position: relative;
  overflow-x: hidden;
  width: calc(100% -1px);
  height: calc(90vh - 84px);
  background-color: white;
  border: 1px solid #dcdfe6;
  border-top: none;
}
</style>
