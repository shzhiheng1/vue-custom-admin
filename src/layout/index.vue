<template>
  <div class="layout">
    <el-container>
      <Aside />
      <el-container class="container">
        <Header></Header>
        <el-scrollbar class="main-content">
          <el-main>
            <!-- <KeepAlive :include="layoutStore.state.cachedViews">
            <RouterView :key="$route.fullPath" />
          </KeepAlive> -->
            <router-view v-slot="{ Component, route }">
              <transition name="el-fade-in" mode="out-in">
                <keep-alive :include="layoutStore.state.cachedViews">
                  <component :is="Component" :key="route.path" />
                </keep-alive>
              </transition>
            </router-view>
          </el-main>
        </el-scrollbar>

        <el-footer>
          <p class="footer-content">
            免责声明:2024年3月5号,由石先生负责开发的vue3+ts管理系统项目。
          </p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from "./components/aside/index.vue";
import Header from "./components/header/index.vue";
import { RouterView } from "vue-router";
import { useLayoutStore } from "@/store/modules/layout";
const layoutStore = useLayoutStore();
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}
.main-content {
  height: calc(100vh - 80px);
}
.el-footer {
  --el-footer-height: 40px;
}
.footer-content {
  border-top: 1px solid #eee;
  text-align: center;
  line-height: 39px;
  color: #ccc;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
