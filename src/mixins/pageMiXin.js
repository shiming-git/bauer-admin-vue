import http from "@/http/http";
import { cacheTableFilde } from "@/http/cacheApi";

export const pageMiXin = {
    data() {
        return {
            // 公共方法
            isTableFilde: true,
            isPublicMethod: true,
            loading: false,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            // 自定义字段属性
            defineAttributes: {},
            // 额外表格
            tableList: [],
            // 表格字段
            tableColumn: [],
            // 表格数据
            tableData: [],
            // 表格选择框
            multipleSelection: [],
            url: {},
            // 页面参数
            queryParam: {},
            /* 分页参数 */
            ipagination: {
                current: 1,
                pageSize: 10,
                pageSizeOptions: ['10', '20', '30', '50', '100'],
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条"
                },
                showQuickJumper: true,
                showSizeChanger: true,
                total: 10
            },
            /* 排序参数 */
            isorter: {
                column: 'id',
                order: 'DESC',
            },
            // 配置参数
            config: {}
        }
    },
    created() {
        if (this.isPublicMethod) {
            this.handleTableField()
            this.handleRequest();
        }
    },
    mounted() {

    },
    computed: {},
    // open1() {
    //     this.$message('这是一条消息提示');
    //   },
    //   open2() {
    //     this.$message({
    //       message: '恭喜你，这是一条成功消息',
    //       type: 'success'
    //     });
    //   },

    //   open3() {
    //     this.$message({
    //       message: '警告哦，这是一条警告消息',
    //       type: 'warning'
    //     });
    //   },

    //   open4() {
    //     this.$message.error('错了哦，这是一条错误消息');
    //   }
    methods: {
        //参数化
        initialize() {

        },
        // 获取字段名/onl/onl_field_name
        handleTableField() {
            if (!this.table_name) {
                console.log("未设置表名")
                return
            }
            cacheTableFilde(this.table_name).then(res => {
                this.handleTableFieldColumn(res)
            })
        },
        handleTableFieldColumn(res) {
            let table_column = [];

            let list = this.tableList
            list.forEach(item => {
                table_column.push(item)
            })

            res.forEach(item => {
                console.log(item["field_describe"], "==>>", item["field_name"], "\t", item["field_type"])
                let obj = {}
                obj["label"] = item["field_describe"]
                obj["prop"] = item["field_name"]
                obj["width"] = item["control_width"] || ""
                obj["sortable"] = (item["is_sort"] == "Y")
                if (item["show_list"] == "Y") {
                    table_column.push(obj)
                }
            })

            if (this.config.setting_button) {
                let obj = {
                    label: "操作",
                    prop: "oper_button",
                    sortable: true,
                    slotVlue: "modify",
                    width: "120",
                    fixed: "right"
                }
                table_column.push(obj)
            }
            for (let i in table_column) {
                let item = table_column[i]
                let key = item.prop
                let obj = this.defineAttributes[key]
                if (!obj) {
                    continue
                }
                item["column"] = obj["column"] || null
                item["width"] = obj["width"] || null
            }

            this.tableColumn = table_column
        },

        // 分页
        handlePage(val) {
            let ipagination = this.ipagination
            ipagination.current = val
            this.handleRequest();
        },
        //获取列表
        handleRequest() {
            if (!this.url.list) {
                return this.$message.error('还没有设置URL【list】');
            }
            this.loading = true;
            let parameter = this.getQueryParams();
            http.get(this.url.list, parameter).then(res => {
                if (res.code !== "00000") {
                    return this.$message.error(res.message);
                }
                this.tableData = res.data.data
                let ipagination = Object.assign({}, this.ipagination)
                ipagination["total"] = res.data.count
                this.ipagination = ipagination
            }).finally(() => {
                this.loading = false
            })
        },
        // 添加
        addHandle() {
            if (this.$refs.model) {
                this.$refs.model.title = "添加"
                this.$refs.model.add();
            }
        },
        // 编辑
        editHandle(entity) {
            if (this.$refs.model) {
                this.$refs.model.title = "编辑"
                this.$refs.model.edit(entity);
            }
        },
        // 删除
        deleteHandle(ids) {
            if (!this.url.delete) {
                return this.$message.error('还没有设置URL【delete】');
            }
            this.$confirm('此操作将删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.delete(this.url.delete, { ids: ids }).then(res => {
                    if (res.code !== "00000") {
                        return this.$message.error(res.message);
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.handleRequest();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 批量删除
        batchdeleteHandle() {
            let select = Object.assign([], this.multipleSelection)
            let ids = select.join(",")
            this.deleteHandle(ids)
        },

        //修改模板状态
        updataHandle(item) {
            if (!this.url.edit) {
                return this.$message.error('还没有设置URL【edit】');
            }
            http.put(this.url.edit, item).then((res) => {
                if (res.code != "00000") {
                    this.$message.error(res.msg);
                    return;
                }
                this.$message({
                    message: "操作成功",
                    type: "success",
                });
                this.handleRequest();
            });
        },
        // 表单提交
        submitForm() {
            this.handleRequest();
        },

        //获取参数
        getQueryParams() {
            let param = Object.assign(this.queryParam, this.isorter);
            param.pageNo = this.ipagination.current;
            param.pageSize = this.ipagination.pageSize;
            return param;
        }

    }
}
