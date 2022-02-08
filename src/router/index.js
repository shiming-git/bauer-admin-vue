import Vue from 'vue'
import Router from 'vue-router'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
// 白名单
export const Whitelist = [
  {
    path: '/',
    name: 'index',
    redirect: "/index",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: '/404',
    component: () => import('@/error/404'),
    hidden: true
  },

  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

// 系统默认路由
const constantRouterMap = [
  {
    path: '/index',
    name: 'hoem',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: "/homePage",
        name: "首页",
        component: () => import("@/views/homePage.vue")
      },
    ]
  },

]


// 创建
const createRouter = () => new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRouterMap.concat(Whitelist)
});

// 初始化
const router = createRouter();


// 重置
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}



// 导出
export default router;