/***
 * 第二种动态路由模式：前端写死路由和页面角色，后端提供角色即可。
 *
 *
 * **/
import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import { type RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router/index";
import { infoApi } from "@/api/login/index";
import store from "../index";

// 路由角色数组中是存在于当前路由相同角色
const hasPersission = (route: RouteRecordRaw, roles: string[]) => {
  const routeRoles = route.meta?.roles;
  // 系统管理员所有页面都可以看到
  if (roles.includes("system")) return true;
  // 没有设置路由权限的为都可以访问
  return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true;
};
// 过滤权限路由
const filterPersissionRoutes = (roles: string[], routes: RouteRecordRaw[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tempRoute = { ...route };
    if (hasPersission(tempRoute, roles)) {
      if (tempRoute?.children) {
        tempRoute.children = filterPersissionRoutes(roles, tempRoute.children);
      }
      res.push(tempRoute);
    }
  });
  return res;
};
export const usePermissionRoutesStore = defineStore("dynamic", () => {
  const routes = shallowRef<RouteRecordRaw[]>([]);
  const permissionRoutes = shallowRef<RouteRecordRaw[]>([]);
  // 设置路由
  const setRoutes = (roles: string[], dynamicRoutes: RouteRecordRaw[]) => {
    permissionRoutes.value = filterPersissionRoutes(roles, dynamicRoutes);
    routes.value = constantRoutes.concat(permissionRoutes.value);
    console.log("-----routes.value-----", routes.value);
  };
  /*********为了不与第一种方式冲突，暂时把userInfo接口写到这里，真实开发中写到userStore中,这里可以删除************/
  const roles = ref<string[]>([]);
  const getUserInfo = async () => {
    const { data } = await infoApi();
    roles.value = data.roles;
    return data;
  };

  /*********************end**********************/
  return { routes, permissionRoutes, setRoutes, roles, getUserInfo };
});

// 在setUp外使用
export const usePermissionRoutesStoreHook = () => {
  return usePermissionRoutesStore(store);
};
