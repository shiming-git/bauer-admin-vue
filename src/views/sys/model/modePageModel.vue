<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    @close="close"
    :destroy-on-close="true"
  >
    <modelForm ref="from" @ok="submitCallback" @err="handleErr"></modelForm>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="handleOk" size="mini"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import modelForm from "./modePageForm";
import { Loading } from "element-ui";

export default {
  name: "modePageModel",
  components: { modelForm },
  data() {
    return {
      title: "添加",
      width: "500px",
      dialogVisible: false,
      loadingInstance: null,
    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.from.add();
      });
    },
    edit(record) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.from.edit(record);
      });
    },
    close() {
      this.$emit("close");
      this.dialogVisible = false;
    },

    handleOk() {
      this.loadingInstance = Loading.service({ fullscreen: true });
      this.$refs.from.submitForm();
    },

    handleErr() {
      this.loadingInstance.close();
    },

    submitCallback() {
      this.$emit("ok");
      this.loadingInstance.close();
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>