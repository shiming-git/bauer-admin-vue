import Router from "@/router"
import { resetRouter } from '@/router'
import api from "@/http/api"
import store from '@/store/index';


// 动态路由处理
export function addRouterHandle() {
    return new Promise((resolve, reject) => {
        api.getNavigation().then(res => {
            if (res.code != "00000") {
                return;
            }
            let treelsit = res.data
            store.commit("setNavigationList", treelsit)
            let routeObj = TreeList(treelsit)

            // 重置
            resetRouter()
            // 添加
            Router.addRoutes(routeObj)
            resolve();

        })
    })
}

// 遍历
function TreeList(list) {
    let trees = []
    for (let i in list) {
        let item = list[i]
        let obj = {}
        if (item.children.length > 0) {
            let children = TreeList(item.children)
            obj = {
                path: item.modelURL,
                name: item.pageName,
                component: resolve => require(['@/views/index.vue'], resolve),
                children: children
            }
        } else {
            obj = {
                path: item.modelURL,
                name: item.pageName,
                component: resolve => require([`@/views${item.modelPath}.vue`], resolve),
            }
        }
        trees.push(obj)
    }
    return trees;
}