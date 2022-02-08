<template>
  <el-select
    v-model="myValue"
    :multiple="multiple"
    :disabled="disabled"
    :filterab="filterable"
    :placeholder="placeholder"
    :size="size"
    clearable
    @change="onChange"
    :style="'width:' + width"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "XSelect",
  model: {
    prop: "value",
    event: "onChange",
  },
  props: {
    value: {
      type: [String, Array],
      default: () => {
        return null;
      },
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
            value: "single",
            label: "单表",
          },
        ];
      },
    },
    /**
     * 字典
     * table,code,text,screen
     */
    dict: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    size: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  watch: {
    value(val) {
      this.myValue = val;
    },
    dict() {
      this.handleDict();
    },
  },
  data() {
    return {
      myValue: null,
    };
  },
  created() {
    this.handleDict();
  },
  methods: {
    onChange(val) {
      this.$emit("onChange", val);
    },
    handleDict() {
      if(!this.dict){
          return;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>