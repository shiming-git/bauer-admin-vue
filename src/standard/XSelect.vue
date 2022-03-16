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
      v-for="(item, index) in table_field_list"
      :key="index"
      :label="item.value"
      :value="item.code"
    >
    </el-option>
  </el-select>
</template>
<script>
import { cacheDataDict } from "@/http/cacheApi";

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
    // 自定义列表
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * 字典
     * table,code,text,screen
     */
    /**
     * code 字典/表字段
     * table 表名
     * value 值名称
     * where 条件
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
      table_field_list: [],
    };
  },
  created() {
    this.myValue = this.value;
    this.handleDict();
  },
  methods: {
    onChange(val) {
      this.$emit("onChange", val);
    },
    handleDict() {
      this.table_field_list = [];
      if (this.options.length > 0) {
        this.table_field_list = this.options;
        return;
      }
      if (!this.dict) {
        return;
      }
      let arr = this.dict.split(",");
      let code = "";
      let table = "";
      let value = "";
      let where = "";

      if (arr[0]) {
        code = String(arr[0]);
      }
      if (arr[1]) {
        table = String(arr[1]);
      }
      if (arr[2]) {
        value = String(arr[2]);
      }
      if (arr[3]) {
        where = String(arr[3]);
      }
      cacheDataDict(code, table, value, where).then((list) => {
        this.table_field_list = list;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>