<template>
  <el-radio-group v-model="myValue" @change="change">
    <el-radio
      v-for="item in table_field_list"
      :key="item.code"
      :label="item.value || ''"
    >
      {{ item.value || "" }}
    </el-radio>
  </el-radio-group>
</template>
<script>
import { cacheDataDict } from "@/http/cacheApi";

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
        return [];
      },
    },
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
  },
  data() {
    return {
      myValue: null,
      table_field_list: [],
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
  created() {
    this.myValue = this.value;
    this.handleDict();
  },
  methods: {
    change(val) {
      this.$emit("onChange", val);
    },
    handleDict() {
      this.table_field_list = []
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