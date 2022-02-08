<template>
  <el-card shadow="always">
    <el-row>
      <el-col :span="table">站点</el-col>
      <el-col :span="value">{{ item.codeName || "" }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="table">网络</el-col>
      <el-col :span="value">{{ item.networkId || "" }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="table">地址</el-col>
      <el-col :span="value">{{ item.address || "" }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="table">来源</el-col>
      <el-col :span="value">{{ item.source || "" }}</el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      table: 3,
      value: 21,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-row {
  text-align: left;
  font-size: 12px;
  color: #202020;
  margin: 5px 0px;

  .el-col:nth-child(1) {
    color: #838383;
  }
}
</style>