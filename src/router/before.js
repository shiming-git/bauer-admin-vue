import router from '@/router/index';
import { Whitelist } from "@/router"
import { removeSession,getSession } from "@/util/sessionStorage";
// import store from '@/store/index';

// 全局前置守卫
router.beforeEach((to, from, next) => {
    console.log("全局前置守卫", to)
    next();
})
// 全局解析守卫
router.beforeResolve((to, from, next) => {
    console.log("全局解析守卫", to)
    for (let i in Whitelist) {
        if (Whitelist[i]["path"] == to["path"]) {
            console.log("免权限路由")
            return next();
        }
    }
    // 检查token
    let token = getSession("token");
    //插件userinfo
    let userinfo = getSession("userInfo");
    if (!token || !userinfo) {
        removeSession("token");
        removeSession("userInfo");
        return next('/login');
    } else {
        return next();
    }
})
// 全局后置钩子
router.afterEach(() => {
    console.log("全局后置钩子")
})