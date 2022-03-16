<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      :style="{ width: width }"
      :size="size"
      :showHeader="showHeader"
      :rowKey="rowKey"
      :border="border"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <!-- 
      type 对应列的类型
      index 如果设置了 type=index，可以通过传递 index 属性来自定义索引
      column-key column 的 key，如果需要使用 filter-change 事件
      label 显示的标题
      prop 对应列内容的字段名，也可以使用 property 属性
      width 对应列的宽度 string
      min-width 对应列的最小宽度，与 width 的区别是 width 是固定的
      fixed 列是否固定在左侧或者右侧
      render-header 列标题 Label 区域渲染使用的 Function
      sortable 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
      sort-method 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效
      sort-by 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效
      sort-orders 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效
      resizable 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
      formatter 用来格式化内容
      show-overflow-tooltip 当内容过长被隐藏时显示 tooltip
      align 对齐方式
      header-align 表头对齐方式，若不设置该项，则使用表格的对齐方式
      class-name 列的 className
      label-class-name 当前列标题的自定义类名
      selectable 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
      reserve-selection 仅对 type=selection 的列有效，类型为 Boolean
      filters 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性
      filter-placement 过滤弹出框的定位
      filter-multiple 数据过滤的选项是否多选
      filter-method 数据过滤使用的方法，如果是多选的筛选项
      filtered-value 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性

      column 自定义显示格式
   -->
      <el-table-column
        type="selection"
        width="50"
        v-if="isSelection"
      ></el-table-column>
      <el-table-column
        type="index"
        width="50"
        label="序号"
        v-if="isNumber"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in tableColumn"
        :key="item[rowKey]"
        :label="item.label || ''"
        :prop="item.prop || ''"
        :width="item.width || ''"
        :align="item.align || 'center'"
        :sortable="item.sortable || ''"
        :showOverflowTooltip="item.showOverflowTooltip || true"
        :headerAlign="item.headerAlign || 'center'"
        :fixed="item.fixed || false"
      >
        <template slot-scope="scope">
          <!-- 判断模块 -->
          <div v-if="item.slotVlue">
            <slot
              :name="item.slotVlue"
              :txt="scope.row[item.prop]"
              :row="scope.row"
              :index="index"
            ></slot>
          </div>
          <!-- 判断自定义函数 -->
          <div v-else-if="item.column">{{ item.column(scope.row, item) }}</div>
          <!-- 默认显示 -->
          <div v-else>{{ showContents(item.prop, scope.row) }}</div>
        </template>
      </el-table-column>
    </el-table>

    <el-row
      type="flex"
      class="row-bg"
      justify="end"
      style="margin-top: 10px; margin-right: 10px"
    >
      <el-col>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="page.pageSizeOptions"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          style="text-align: right"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "XTable",
  model: {
    prop: "multipleSelection",
    event: "Selection",
  },
  props: {
    loading: {
      try: Boolean,
      default: false,
    },
    // 是否选择
    isSelection: {
      type: Boolean,
      default: false,
    },
    // 选择列表
    multipleSelection: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // 是否序号
    isNumber: {
      type: Boolean,
      default: false,
    },
    /**
     *行数据的 Key，用来优化 Table 的渲染
     */
    rowKey: {
      type: String,
      default: "id",
    },
    tableColumn: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * 表格数据
     * prop 字段
     * label 字段名
     * width 宽度
     */
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * Table 的高度，默认为自动高度
     */
    width: {
      type: String,
      default: "100%",
    },

    /**
     * 是否为斑马纹 table
     */
    stripe: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "small",
    },
    /**
     * 是否显示表头
     */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否带有纵向边框
     */
    border: {
      type: Boolean,
      default: true,
    },
    // 分页
    pagination: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    multipleSelection(val) {
      this.toggleSelection(val);
    },
    pagination(val) {
      this.setPage(val);
    },
  },
  data() {
    return {
      currentPage: 1,
      page: {},
    };
  },
  created() {
    this.setPage(this.pagination);
  },
  mounted() {},
  methods: {
    // 手动勾选
    handleSelectionChange(selects) {
      let keys = [];
      let key = this.rowKey;
      selects.forEach((row) => {
        keys.push(row[key]);
      });
      this.$emit("Selection", keys);
    },
    //自定义勾选
    toggleSelection(keys) {
      let key = this.rowKey;
      if (keys && keys.length > 0) {
        this.tableColumn.forEach((row) => {
          let id = row[key];
          if (keys.includes(id)) {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          }
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("onpage", val);
    },

    setPage(val) {
      this.page = {};
      this.page = Object.assign({}, val);
      this.$forceUpdate();
    },

    showContents(key, row) {
      return row[key + "_describe"] || row[key];
    },
  },
};
</script>
<style  scoped>
</style>