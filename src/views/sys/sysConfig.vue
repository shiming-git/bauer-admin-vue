<template>
  <div>
    <!-- 头部按钮 -->
    <div class="x-table-top">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus"
        @click="handleShow(SysConfig)"
        >添加</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      size="mini"
      row-key="configOn"
      border
    >
      <el-table-column prop="configOn" label="配置编码"></el-table-column>
      <el-table-column prop="configName" label="配置名称"></el-table-column>
      <el-table-column prop="configValue" label="配置属性" show-overflow-tooltip></el-table-column>
      <el-table-column prop="configType" label="配置类型">
        <template slot-scope="scope">
          <span v-for="(item, index) in options" :key="index">
            <el-tag
              type="success"
              v-if="scope.row.configType == item.value"
              size="mini"
              >{{ item.label }}</el-tag
            >
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="configGroup" label="配置组名">
        <template slot-scope="scope">
          <span v-for="(item, index) in optionsGroup" :key="index">
            <el-tag v-if="scope.row.configGroup == item.value" size="mini">{{
              item.label
            }}</el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleShow(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteMode(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-dialog
      :title="!formId ? '添加' : '修改'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="配置编码" prop="configOn">
          <el-input
            v-model="form.configOn"
            show-word-limit
            maxlength="255"
          ></el-input>
        </el-form-item>
        <el-form-item label="配置名称" prop="configName">
          <el-input
            v-model="form.configName"
            show-word-limit
            maxlength="255"
          ></el-input>
        </el-form-item>
        <el-form-item label="配置属性" prop="configValue">
          <el-input
            v-model="form.configValue"
            type="textarea"
            :rows="3"
            resize="none"
          ></el-input>
        </el-form-item>
        <el-form-item label="配置类型" prop="configType">
          <el-select
            v-model="form.configType"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配置组名" prop="configGroup">
          <el-select
            v-model="form.configGroup"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in optionsGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { SysConfig } from "@/util/entity";

export default {
  name: "sysConfig",
  data() {
    return {
      SysConfig: SysConfig(),
      dialogVisible: false,
      tableData: [],
      form: {},
      formId: "",
      rules: {
        configOn: [
          { required: true, message: "请输入配置编码", trigger: "blur" },
        ],
        configName: [
          { required: true, message: "请输入配置名称", trigger: "change" },
        ],
        configValue: [
          { required: true, message: "请输入配置属性", trigger: "blur" },
        ],
        configType: [
          { required: true, message: "请输入配置类型", trigger: "blur" },
        ],
        configGroup: [
          { required: true, message: "请输入配置组名", trigger: "blur" },
        ],
      },
      options: [
        {
          value: "text",
          label: "文本",
        },
      ],
      optionsGroup: [
        {
          value: "wx",
          label: "微信",
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.selectConfig();
  },
  methods: {
    //显示弹窗
    handleShow(item) {
      this.form = JSON.parse(JSON.stringify(item));
      this.formId = this.form.configOn;
      this.dialogVisible = true;
    },
    //查询列表
    selectConfig() {
      this.$api.selectConfig().then((res) => {
        if (res.code != "00000") {
          this.$message.error(res.msg);
          return;
        }
        this.tableData = res.data;
      });
    },
    deleteMode(item) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.deleteConfig({ id: item.configOn }).then((res) => {
          if (res.code != "00000") {
            this.$message.error(res.msg);
            return;
          }
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.selectConfig();
        });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }

        if (this.formId) {
          this.$api.updateConfig(this.form).then((res) => {
            if (res.code != "00000") {
              this.$message.error(res.msg);
              return;
            }
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.selectConfig();
            this.dialogVisible = false;
          });
        } else {
          this.$api.insertConfig(this.form).then((res) => {
            if (res.code != "00000") {
              this.$message.error(res.msg);
              return;
            }
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.selectConfig();
            this.dialogVisible = false;
          });
        }
      });
    },
  },
};
</script>
<style lang="sass" scoped>
</style>