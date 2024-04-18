import { type RouteRecordRaw } from "vue-router";

export const compRoutes: Array<RouteRecordRaw> = [
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
        path: "count-to",
        name: "CountTo",
        component: () => import("@/views/comp/count-to/index.vue"),
        meta: {
          title: "数字滚动",
          show: true,
        },
      },
      {
        path: "editor",
        name: "Editor",
        component: () => import("@/views/comp/editor/index.vue"),
        meta: {
          title: "富文本",
          show: true,
        },
      },
      {
        path: "echarts",
        name: "Echarts",
        redirect: "/comp/echarts/bar",
        meta: {
          title: "Echarts图",
          show: true,
          elIcon: "DataLine",
        },
        children: [
          {
            path: "bar",
            name: "Bar",
            component: () => import("@/views/comp/echers/bar/index.vue"),
            meta: {
              title: "柱状图",
              show: true,
            },
          },
          {
            path: "line",
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
];
