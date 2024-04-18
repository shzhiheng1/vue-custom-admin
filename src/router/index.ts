/***********通过嵌套路由产生菜单时使用**************/

import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "@v/Home/index.vue";
import LayoutView from "@/layout/index.vue";
import { compRoutes } from "./modules/comp";
import { menuRoutes } from "./modules/menu";

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@v/Login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    redirect: "/home",
    component: LayoutView,
    meta: {
      title: "首页",
      show: true,
      breadcrumb: false,
    },
    children: [
      {
        component: HomeView,
        path: "home",
        name: "Home",
        meta: {
          title: "首页",
          show: true,
          SvgIcon: "home",
          affix: true,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/link",
    meta: {
      title: "外连接",
      elIcon: "Link",
      show: true,
    },
    children: [
      {
        path: "https://www.baidu.com/",
        component: () => {},
        name: "Link1",
        meta: {
          title: "百度",
          show: true,
          link: true, //是否为外链接
        },
      },
      {
        path: "https://www.google.cn/",
        component: () => {},
        meta: {
          title: "谷歌",
          show: true,
          link: true,
        },
      },
    ],
  },
  {
    path: "/404",
    name: "NotFound",
    meta: {
      title: "404页面",
    },
    component: () => import("@/views/404/index.vue"),
  },

  // // 拦截不存在的页面(必须使用正则pathMatch或catchAll，而非直接*),必须放在最后面
  // {
  //   path: "/:catchAll(.*)",
  //   redirect: "/404",
  // },
];
/*************第二种后端返回角色前端控制路由的方式*************/
export const dynamicRoutes: Array<RouteRecordRaw> = [
  // 组件模块模块的数据
  ...compRoutes,
  ...menuRoutes,
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  // 两种模式：createWebHashHistory和createWebHistory
  history: createWebHashHistory(),
  // 滚动条的位置：使用该方法时，应该把项目的body的高度设定为100%，y轴方向滚动条显示；不能重新加载数据。
  scrollBehavior: (_to, _from, savePosition) => {
    // console.log("------记录滚动条的位置-----", savePosition);
    return new Promise((resolve) => {
      // 有keepalive缓存时，savePosition存在,记录滚动条的高度
      if (savePosition) {
        resolve(savePosition);
      } else {
        resolve({ left: 0, top: 0 });
      }
    });
  },
  routes: constantRoutes,
});
export default router;
