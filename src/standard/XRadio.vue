<template>
  <el-radio-group v-model="myValue" @change="change">
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item.value || ''"
    >
      {{ item.label || "" }}
    </el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: "XRadio",
  model: {
    prop: "value",
    event: "onChange",
  },
  props: {
    value: {
      type: [String, Boolean, Number],
      default: null,
    },
    /**
     * label
     * value
     * disabled
     */
    options: {
      type: Array,
      default: () => {
        return [
          {
            label: "是",
            value: "Y",
          },
          {
            label: "否",
            value: "N",
          },
        ];
      },
    },
  },
  data() {
    return {
      myValue: null,
    };
  },
  watch: {
    value(val) {
      this.myValue = val;
    },
    dict() {
      this.handleDict();
    },
  },
  created() {},
  methods: {
    change(val) {
      this.$emit("onChange", val);
    },
    handleDict() {
      if (!this.dict) {
        return;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>