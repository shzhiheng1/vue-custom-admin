/*******路由拦截******/

// import { useRouter } from "vue-router";
import { getToken } from "./cookie";
// import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionRoutesStoreHook } from "@/store/modules/permission";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "@/router";
import { ElMessage } from "element-plus";
import { useTitle } from "@/hooks/useTitle";

import { dynamicRoutes } from "@/router/index";

// title
const { setTitle } = useTitle();

const whiteList = <string[]>["/login"]; //白名单

router.beforeEach((to, _from, next) => {
  const token = getToken();
  //   开始进度条
  NProgress.start();
  if (token) {
    console.log("---to---", to);
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      /************第一种方式后端返回路由************/
      // const { roles, userInfo } = useUserStoreHook();
      // if (roles.length === 0) {
      //   //    获取用户信息(请求接口)
      //   userInfo()
      //     .then((dynamicRouters) => {
      //       dynamicRouters.forEach((route) => router.addRoute(route));
      //       next({ ...to, replace: true });
      //     })
      //     .catch((err) => {
      //       ElMessage.error("用户信息获取失败！");
      //       console.log("---------", err);
      //     })
      //     .finally(() => {
      //       NProgress.done();
      //     });
      // } else {
      //   next();
      //   NProgress.done();
      // }
      /*****************第二种方式后端返回角色*******************/
      const permissionStore = usePermissionRoutesStoreHook();
      if (permissionStore.roles && permissionStore.roles.length === 0) {
        //    获取用户信息(请求接口)
        permissionStore
          .getUserInfo()
          .then((data) => {
            permissionStore.setRoutes(data.roles, dynamicRoutes);
            permissionStore.permissionRoutes.forEach((route) =>
              router.addRoute(route)
            );
            // dynamicRouters.forEach((route) => router.addRoute(route));
            next({ ...to, replace: true });
          })
          .catch((err) => {
            ElMessage.error("用户信息获取失败！");
            console.log("---------", err);
          })
          .finally(() => {
            NProgress.done();
          });
      } else {
        next();
        NProgress.done();
      }
    }
  } else {
    const isWhiteList = whiteList.includes(to.path);
    if (isWhiteList) {
      next();
    } else {
      next("/login");
    }
    NProgress.done();
  }
});

router.afterEach((to) => {
  // 设置title
  setTitle(to.meta.title);
  NProgress.done();
});
