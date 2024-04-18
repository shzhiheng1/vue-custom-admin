import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import store from "../index";
import { loginApi, infoApi } from "@/api/login/index";
import { type LoginRequestData } from "@/api/login/types/login";
import { setToken, removeToken } from "@/utils/cookie";
import { filterAsyncRouter, filterShowMenu } from "@/utils/generateRoutes";
import { constantRoutes } from "@/router/index";
// import router from "@/router";

export const useUserStore = defineStore("user", () => {
  const userName = ref<string>();
  const token = ref("");
  const roles = ref<string[]>([]); //角色
  const menuList = ref<any[]>([]); //后端返回的路由列表
  const menuMap = ref<any[]>([]); //前端展示的菜单
  const dynamicRouters = shallowRef<any[]>([]); //动态路由
  //   登录
  const login = async ({ username, password, code }: LoginRequestData) => {
    const { data } = await loginApi({ username, password, code });
    token.value = data.token;
    setToken(data.token);
    userName.value = username;
  };
  // 用户信息
  const userInfo = async () => {
    const { data } = await infoApi();
    roles.value = data.roles;
    menuList.value = data.menuList;
    const cloneMenuList = JSON.parse(JSON.stringify(data.menuList));
    dynamicRouters.value = filterAsyncRouter(cloneMenuList);
    // 添加404拦截
    dynamicRouters.value.push({
      path: "/:catchAll(.*)",
      redirect: "/404",
    });
    const allRouter = constantRoutes.concat(dynamicRouters.value);
    // 前端展示的菜单
    menuMap.value = filterShowMenu(allRouter);
    return dynamicRouters.value;
  };
  // 退出登录
  const logout = () => {
    removeToken();
    token.value = "";
    roles.value = [];
    menuList.value = [];
  };
  return {
    userName,
    roles,
    menuList,
    dynamicRouters,
    menuMap,
    login,
    userInfo,
    logout,
  };
});

// setpu外使用
export function useUserStoreHook() {
  return useUserStore(store);
}
