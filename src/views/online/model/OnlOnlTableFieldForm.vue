<template>
  <div>
    <!-- 表头 -->
    <el-form
      :model="model"
      :rules="rules"
      label-width="80px"
      size="small"
      ref="form"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="表名"
            prop="table_name"
            :label-width="labelWidth"
          >
            <el-input
              v-model="model.table_name"
              show-word-limit
              maxlength="50"
              placeholder="请输入表名"
              :disabled="!!model.id"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="表描述"
            prop="table_describe"
            :label-width="labelWidth"
          >
            <el-input
              v-model="model.table_describe"
              show-word-limit
              maxlength="100"
              placeholder="请输入表描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="表类型"
            prop="table_type"
            :label-width="labelWidth"
          >
            <x-select
              v-model="model.table_type"
              placeholder="请选择表类型"
              dict="dictString"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="弹窗宽度"
            prop="dialog_width"
            :label-width="labelWidth"
          >
            <el-input
              v-model="model.dialog_width"
              show-word-limit
              maxlength="10"
              placeholder="请输入弹窗宽度"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="表分类"
            prop="table_class"
            :label-width="labelWidth"
          >
            <x-select
              v-model="model.table_class"
              placeholder="请输入表分类"
              dict="dictString"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="弹窗满屏"
            prop="dialog_is_whole"
            :label-width="labelWidth"
          >
            <el-input
              v-model="model.dialog_is_whole"
              show-word-limit
              maxlength="10"
              placeholder="请输入弹窗满屏"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否分页"
            prop="table_paging"
            :label-width="labelWidth"
          >
            <x-radio v-model="model.table_paging" dict="dictString"></x-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否树"
            prop="table_tree"
            :label-width="labelWidth"
          >
            <x-radio v-model="model.table_tree" dict="dictString"></x-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 字段 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="数据库属性" name="1">
        <onlDatabasePropertiesTable
          :dataList="fieldList"
          @add="handleAdd"
          @delete="handleDelete"
        />
      </el-tab-pane>
      <el-tab-pane label="页面属性" name="2">
        <onPagePropertiesTable :dataList="fieldList" />
      </el-tab-pane>
      <el-tab-pane label="校验字段" name="3">
        <onlCheckFieldTable :dataList="fieldList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import http from "@/http/http";
import onlDatabasePropertiesTable from "./onlDatabasePropertiesTable";
import onPagePropertiesTable from "./onPagePropertiesTable";
import onlCheckFieldTable from "./onlCheckFieldTable";
const snowId = require("simple-flakeid");

const field = {
  id: null, //主键
  create_time: null, //创建时间
  create_user: null, //创建人
  updata_time: null, //更新时间
  updata_user: null, //更新人
  table_name: null, //表名
  field_name: null, //字段名
  field_describe: null, //字段描述
  field_length: null, //字段长度
  field_decimal: null, //小数点
  field_default: null, //默认值
  field_type: null, //字段类型
  field_is_key: null, //是否主键
  field_is_null: null, //允许为空
  extra: null, //主键类型
  sort: null, //排序
  show_form: null, //显示表单
  show_list: null, //显示列表
  is_sort: null, //是否排序
  is_read_only: null, //是否只读
  control_type: null, //控件类型
  control_width: null, //控件长度
  is_query: null, //是否查询
  query_type: null, //查询类型
  validation_rules: null, //校验规则
  validation_required: null, //校验必填
  dictionary_table: null, //字典Table
  dictionary_code: null, //字典Code
  dictionary_text: null, //字典Text
  main_table_name: null, //主表名
  main_table_field: null, //主表字段
};

const defValue = [
  {
    field_name: "id", //表名
    field_describe: "ID", //字段名
    field_type: "varchar",
    field_length: 50,
    field_is_key: "PRI",
    field_is_null: "NO",
  },
  {
    field_name: "create_user", //表名
    field_describe: "创建人", //字段名
    field_type: "varchar",
    field_length: 50,
    field_is_key: "",
    field_is_null: "YES",
  },
  {
    field_name: "create_time", //表名
    field_describe: "创建时间", //字段名
    field_type: "datetime",
    field_length: 0,
    field_is_key: "",
    field_is_null: "YES",
  },
  {
    field_name: "updata_user", //表名
    field_describe: "更新人", //字段名
    field_type: "varchar",
    field_length: 50,
    field_is_key: "",
    field_is_null: "YES",
  },
  {
    field_name: "updata_time", //表名
    field_describe: "更新时间", //字段名
    field_type: "datetime",
    field_length: 0,
    field_is_key: "",
    field_is_null: "YES",
  },
];

export default {
  name: "OnlOnlTableFieldForm",
  components: {
    onlDatabasePropertiesTable,
    onPagePropertiesTable,
    onlCheckFieldTable,
  },
  data() {
    return {
      activeName: "1",
      labelWidth: "100px",
      modelDefault: {},
      model: {
        dialog_width: 900,
        table_paging: "Y",
        table_tree: "N",
        dialog_is_whole: "N",
      },
      fieldList: [],
      url: {
        add: "/onl/onl_table/submit",
        eidt: "/onl/onl_table/submit",
        field: "/onl/onl_table_field",
        tableId: "/onl/onl_table/one",
      },

      rules: {
        table_name: [
          { required: true, message: "请输入表名", trigger: "blur" },
        ],
        table_describe: [
          { required: true, message: "请输入表描述", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    //备份model原始值
    this.modelDefault = JSON.parse(JSON.stringify(this.model));
  },
  methods: {
    add() {
      this.model = Object.assign({}, this.modelDefault);
      this.fieldList = this.defaultValue();
    },
    edit(record) {
      this.getTableInfo(record.id);
      this.getDataInfo(record.table_name);
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$emit("err");
          return false;
        }
        let keys = [];
        let list = this.fieldList;
        for (let i in list) {
          let item = list[i];

          if (!item["field_name"] || !item["field_describe"]) {
            this.$message.error("字段名和描述不能为空");
            this.$emit("err");
            return;
          }
          if (keys.indexOf(item["field_name"]) >= 0) {
            this.$message.error(`【${item["field_name"]}】字段名已存在！`);
            this.$emit("err");
            return;
          }
          keys.push(item["field_name"]);
        }
        let parm = {
          table: this.model,
          table_field: this.fieldList,
        };

        if (this.model.id) {
          http.put(this.url.eidt, parm).then((res) => {
            if (res.code != "00000") {
              this.$message.error(res.message);
              this.$emit("err");
              return;
            }
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.$emit("ok");
          });
        } else {
          http.post(this.url.add, parm).then((res) => {
            if (res.code != "00000") {
              this.$message.error(res.message);
              this.$emit("err");
              return;
            }
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.$emit("ok");
          });
        }
      });
    },

    getTableInfo(id) {
      http.get(this.url.tableId, { id: id }).then((res) => {
        if (res.code != "00000") {
          this.$message.error(res.message);
          return;
        }
        this.model = res.data;
      });
    },

    getDataInfo(name) {
      http
        .get(this.url.field, { table_name: name, column: "sort", order: "ASC" })
        .then((res) => {
          if (res.code != "00000") {
            this.$message.error(res.message);
            return;
          }
          this.fieldList = res.data.data;
        });
    },

    // 添加字段
    handleAdd() {
      let fi = Object.assign({}, field);
      let gen = new snowId.SnowflakeIdv1({ workerId: 1 });
      fi["id"] = gen.NextId();
      fi["sort"] = this.fieldList.length + 1;
      this.fieldList.push(fi);
    },

    // 删除字段
    handleDelete(keys) {
      if (keys.length <= 0) {
        this.$message.error("请选择数据！");
        return;
      }
      let fieldList = this.fieldList;
      let list = [];
      for (let i in fieldList) {
        let item = fieldList[i];
        if (keys.indexOf(item["id"]) < 0) {
          list.push(item);
        }
      }
      this.fieldList = list;
    },

    // 添加默认值
    defaultValue() {
      let list = [];
      let gen = new snowId.SnowflakeIdv1({ workerId: 1 });
      for (let i in defValue) {
        let fi = Object.assign({}, field);
        let item = defValue[i];
        fi["id"] = gen.NextId();
        fi["field_describe"] = item["field_describe"];
        fi["field_name"] = item["field_name"];
        fi["field_type"] = item["field_type"];
        fi["field_length"] = item["field_length"];
        fi["field_is_key"] = item["field_is_key"];
        fi["field_is_null"] = item["field_is_null"];
        fi["sort"] = Number(i) + 1;
        list.push(fi);
      }
      return list;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>