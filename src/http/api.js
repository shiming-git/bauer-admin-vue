import http from "./http";

const headers = {
    "Content-Type": "application/json; charset=utf-8"
}
// const fromData = {
//     'Content-Type': 'application/x-www-form-urlencoded'
// }
// const fromFile = {
//     "Content-Type": "multipart/form-data"
// }


export default {

    /**
     * 用户登录
     */
    login(data = {}) {
        return http.post("/sys/login/LoginAccountPassword", data, headers)
    },
    //获取页面列表
    getmodelist(data = {}) {
        return http.get("/sys/model/getmodelist", data, headers)
    },
    // 获取数据看表名 直接读取
    getReadTable(data = {}) {
        return http.get("/onl/read_table_all", data)
    },
    // 获取onl表数据
    getOnlTableAll(data = {}) {
        return http.get("/onl/onl_table/all", data)
    },
    // 获取表字段名
    getOnlTableFaild(data ={}){
        return http.get("/onl/onl_field_name",data)
    },



    //添加好友分组
    addFriendgroup(data = {}) {
        return http.post("/api-admin/friendgroup/intsert", data, headers)
    },
    //修改好友分组
    editFriendgroup(data = {}) {
        return http.post("/api-admin/friendgroup/updata", data, headers)
    },
    //删除好友分组
    delFriendgroup(data = {}) {
        return http.post("/api-admin/friendgroup/delete", data, headers)
    },
    //获取好友分组
    getFriendgroup(data = {}) {
        return http.get("/api-admin/friendgroup/selectList", data, headers)
    },
    //获取好友列表
    getFriendlist(data = {}) {
        return http.get("/api-admin/friendlist/selectList", data, headers)
    },
    //修改好友
    updataFriendlist(data = {}) {
        return http.post("/api-admin/friendlist/updata", data, headers)
    },
    //删除好友
    deleteFriendlist(data = {}) {
        return http.post("/api-admin/friendlist/delete", data, headers)
    },
    //获取历史记录
    getLogRecord(data = {}) {
        return http.get("/api-admin/LogRecord/selectList", data, headers)
    },
    //修改用户密码
    updataPass(data = {}) {
        return http.post("/api-admin/user/updatapass", data, headers)
    },
    //用户注册
    userRegister(data = {}) {
        return http.post("/api-auth/users/register", data, headers)
    },


    //获取角色列表
    getrolelist(data = {}) {
        return http.get("/api-admin/role/getrolelist", data, headers)
    },
    //添加角色
    addrole(data = {}) {
        return http.post("/api-admin/role/addrole", data, headers)
    },
    //删除角色
    deleterole(data = {}) {
        return http.post("/api-admin/role/deleterole", data, headers)
    },
    //修改角色
    updatarole(data = {}) {
        return http.post("/api-admin/role/updatarole", data, headers)
    },
    //修改角色状态
    updatastate(data = {}) {
        return http.post("/api-admin/role/updatastate", data, headers)
    },
    // 添加角色模板权限
    empowerment(data = {}) {
        return http.post("/api-admin/role/empowerment", data, headers)
    },
    //添加角色模板权限
    selectJurisdiction(data = {}) {
        return http.get("/api-admin/role/selectJurisdiction", data, headers)
    },
    //获取用户导航列表
    getNavigation(data = {}) {
        return http.get("/sys/navigation/getList", data, headers)
    },
    //给用户赋权
    empowermentuser(data = {}) {
        return http.post("/api-admin/userrole/empowermentuser", data, headers)
    },
    //添加配置文件 
    insertConfig(data = {}) {
        return http.post("/api-admin/config/insertConfig", data, headers)
    },
    //删除配置
    deleteConfig(data = {}) {
        return http.post("/api-admin/config/deleteConfig", data, headers)
    },
    //修改配置
    updateConfig(data = {}) {
        return http.post("/api-admin/config/updateConfig", data, headers)
    },
    //查询列表
    selectConfig(data = {}) {
        return http.get("/api-admin/config/selectConfig", data, headers)
    },
    //查询配置单个
    getConfig(id = '') {
        return http.get("/api-admin/config/getConfig/" + id, {}, headers)
    },
}