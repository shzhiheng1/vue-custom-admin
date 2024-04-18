import { type RouteRecordRaw } from "vue-router";
import LayoutView from "@/layout/index.vue";

export const menuRoutes: Array<RouteRecordRaw> = [
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
        path: "menu1",
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
        path: "menu2",
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
        path: "menu3",
        component: () => import("@/views/menus/menu3/index.vue"),
        name: "Menu3",
        meta: {
          title: "Menu3",
          show: true,
          roles: ["Menu3"],
        },
      },
      {
        path: "menu4",
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
        path: "menu5",
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
];
