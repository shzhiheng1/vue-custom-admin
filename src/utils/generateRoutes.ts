import LayoutView from "@/layout/index.vue";
// const modules = import.meta.glob("../views/**/**/*.vue");

//将字符串转为组件对象， 方法一：使用filter
export function filterAsyncRouter(asyncRouterMap: any[]) {
  return asyncRouterMap.filter((route) => {
    if (route.component) {
      if (route.component === "LayoutView") {
        route.component = LayoutView;
      } else {
        const compPath = route.component;
        // 为了解决vite的警告
        // route.component = modules[`../views/${compPath}.vue`];
        // 其实是可用，只是有警告
        const pathStr = `../views/${compPath}.vue`;
        route.component = () => import(/* @vite-ignore */ pathStr);
      }
      if (route.children && route.children.length > 0) {
        filterAsyncRouter(route.children);
      }
    }
    return true;
  });
}

// 方法二，使用map
// export function filterAsyncRouter(asyncRouterMap: any[]) {
//   return asyncRouterMap.map((route) => {
//     if (route.component === "LayoutView") {
//       route.component = LayoutView;
//     } else {
//       const compPath = route.component;
//       const pathStr = `../views/${compPath}.vue`;
//       route.component = () => import(pathStr);
//     }
//     if (route.children && route.children.length > 0) {
//       route.children = filterAsyncRouter(route.children);
//     }
//     return route;
//   });
// }

// 前端菜单展示列表(这里只过滤了第1层)
export function filterShowMenu(allRouter: any[]) {
  return allRouter.filter((route) => {
    if (route?.meta?.show) {
      return route;
    } else {
      return false;
    }
  });
}
