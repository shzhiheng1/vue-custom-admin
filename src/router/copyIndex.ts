/*****************使用全路由时配置菜单时使用*******************/

import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "@v/Home/index.vue";
import LayoutView from "@/layout/index.vue";
// import { compRoutes } from "./modules/comp";

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
        path: "/home",
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
  {
    path: "/menu",
    component: LayoutView,
    redirect: "/menu/menu1",
    name: "Menu",
    meta: {
      title: "多级路由",
      // SvgIcon: "menu",
      elIcon: "Operation",
      show: true, //是否显示菜单
      // roles: ["admin", "editor"],//为空所有都可见
    },
    children: [
      {
        path: "/menu/menu1",
        component: () => import("@/views/menus/menu1/index.vue"),
        name: "Menu1",
        meta: {
          title: "Menu1",
          show: true,
          keepAlive: true,
          roles: ["Menu1"],
        },
      },
      {
        path: "/menu/menu2",
        component: () => import("@/views/menus/menu2/index.vue"),
        name: "Menu2",
        meta: {
          title: "Menu2",
          show: false,
          breadcrumb: false,
          roles: ["Menu2"],
        },
      },
      {
        path: "/menu/menu3",
        component: () => import("@/views/menus/menu3/index.vue"),
        name: "Menu3",
        meta: {
          title: "Menu3",
          show: true,
          roles: ["Menu3"],
        },
      },
      {
        path: "/menu/menu4",
        component: () => import("@/views/menus/menu4/index.vue"),
        name: "Menu4",
        meta: {
          title: "Menu4",
          show: true,
          roles: ["Menu4"],
          keepAlive: true,
        },
      },
      {
        path: "/menu/menu5",
        component: () => import("@/views/menus/menu5/index.vue"),
        name: "Menu5",
        meta: {
          title: "Menu5",
          show: true,
          //roles不设置是所有权限都可以见
        },
      },
    ],
  },
  {
    path: "/comp",
    name: "Comp",
    component: () => import("@/layout/index.vue"),
    redirect: "/comp/count-to",
    meta: {
      title: "组件",
      elIcon: "Operation",
      show: true,
    },
    children: [
      {
        path: "/comp/count-to",
        name: "CountTo",
        component: () => import("@/views/comp/count-to/index.vue"),
        meta: {
          title: "数字滚动",
          show: true,
        },
      },
      {
        path: "/comp/editor",
        name: "Editor",
        component: () => import("@/views/comp/editor/index.vue"),
        meta: {
          title: "富文本",
          show: true,
        },
      },
      {
        path: "/comp/echarts",
        name: "Echarts",
        redirect: "/comp/echarts/bar",
        meta: {
          title: "Echarts图",
          show: true,
          elIcon: "DataLine",
        },
        children: [
          {
            path: "/comp/echarts/bar",
            name: "Bar",
            component: () => import("@/views/comp/echers/bar/index.vue"),
            meta: {
              title: "柱状图",
              show: true,
            },
          },
          {
            path: "/comp/echarts/line",
            name: "Line",
            component: () => import("@/views/comp/echers/line/index.vue"),
            meta: {
              title: "折线图",
              show: true,
            },
          },
        ],
      },
    ],
  },
  // 组件模块模块的数据
  // ...compRoutes,
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
    console.log("------记录滚动条的位置-----", savePosition);
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
