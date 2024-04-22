<template>
  <div class="aside">
    <!-- <div class="logo"></div> -->
    <Logo></Logo>
    <el-aside>
      <el-scrollbar>
        <el-menu
          background-color="var(--sidebar-menu-bg-color)"
          text-color="var(--sidebar-menu-text-color)"
          active-text-color="var(--sidebar-menu-active-text-color)"
          class="el-menu-vertical-demo"
          :default-active="actionMenu"
          :collapse="isCollapse"
          router
        >
          <!-- 嵌套路由拼接产生菜单时使用 -->
          <menu-item
            v-for="route in menuMap"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
          <!-- 全路由产生菜单时使用 -->
          <!-- <CopyMenuItem
            v-for="route in menuMap"
            :key="route.path"
            :item="route"
          /> -->
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
import MenuItem from "./MenuItem.vue";
// import CopyMenuItem from "./CopyMenuItem.vue";
import Logo from "./Logo.vue";
// import { useUserStore } from "@/store/modules/user";
import { usePermissionRoutesStore } from "@/store/modules/permission";
import { useRoute } from "vue-router";
import { filterShowMenu } from "@/utils/generateRoutes";

const layoutStore = useLayoutStore();
const isCollapse = computed(() => layoutStore.isCollapse);
// const userStore = useUserStore();
// const menuMap = userStore.menuMap;
/********使用第二种方式通过角色*********/
const permissionRoutes = usePermissionRoutesStore();
const menuMap = filterShowMenu(permissionRoutes.routes);
console.log("------路由菜单------", menuMap);
/**********end********/
const route = useRoute();
const actionMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="scss" scoped>
.aside {
  background-color: var(--sidebar-menu-bg-color);
  position: relative;
  color: #fff;
  // overflow-x: hidden;
  //   自定义菜单样式
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-aside {
    width: auto;
    height: calc(100vh - 86px);
    .el-menu {
      border-right: none;
      // item的样式
      .el-menu-item.is-active {
        background-color: #3370ff !important;
        color: #fff;
        span {
          color: #fff !important;
        }
      }
      .el-menu-item.is-active::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background-color: #fff;
      }
      .el-menu-item:hover {
        background-color: #409eff !important;
        color: #fff;
      }
      // 菜单标题的样式
      :deep(.el-sub-menu__title:hover) {
        background-color: #409eff !important;
        color: #fff;
      }
    }
    // 折叠的样式
    .el-menu--collapse {
      :deep(.el-sub-menu.is-active) {
        background-color: #3370ff;
        // 去掉title上竖线
        .el-sub-menu__title ::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 0px;
          height: 100%;
          background-color: #fff;
        }
      }
      :deep(.el-sub-menu.is-active ::before) {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background-color: #fff;
      }
      // 折叠是隐藏文字和旋转箭头
      :deep(span) {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
      :deep(i) {
        display: none;
      }
    }
  }
}
</style>
