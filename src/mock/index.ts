/**
 * mockjs 模拟接口数据
 *
 *
 * **/
import Mock from "mockjs";
// const baseUrl = import.meta.env.BASE_URL;

// 用户信息
Mock.mock(`/api/users/info`, "get", () => {
  const _data = {
    roles: ["Menu1", "Menu2", "Menu3"],
    username: "admin",
    menuList: [
      {
        path: "/menu",
        component: "LayoutView",
        redirect: "/menu/menu1",
        name: "Menu",
        meta: {
          title: "多级路由",
          // SvgIcon: "menu",
          elIcon: "Operation",
          show: true,
        },
        children: [
          {
            path: "/menu/menu1",
            component: "menus/menu1/index",
            name: "Menu1",
            meta: {
              title: "Menu1",
              show: true,
              keepAlive: true,
            },
          },
          {
            path: "/menu/menu2",
            component: "menus/menu2/index",
            name: "Menu2",
            meta: {
              title: "Menu2",
              show: false,
              breadcrumb: false,
            },
          },
          {
            path: "/menu/menu3",
            component: "menus/menu3/index",
            name: "Menu3",
            meta: {
              title: "Menu3",
              show: true,
            },
          },
        ],
      },
    ],
  };
  return {
    code: 0,
    message: "用户信息获取成功",
    data: _data,
  };
});

// 获取table列表
Mock.mock("/api/table/list", "get", () => {
  const _data = Mock.mock({
    "list|10": [
      {
        "id|+1": 1,
        name: "@cname",
        email: "@email",
        // status: "@boolean",
        "status|0-1": 1,
        createTime: "@datetime",
        role: "@last",
        phone: /\d{11}/,
      },
    ],
  });
  return {
    code: 0,
    message: "获取数据成功",
    data: { ..._data, total: 50 },
  };
});
