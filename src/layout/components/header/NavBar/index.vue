<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="expand" @click="hanldeCollapse">
        <el-icon :size="20">
          <Expand v-if="isCollapse" />
          <Fold Expand v-else />
        </el-icon>
      </div>
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
            <span v-if="index === breadcrumbs.length - 1">{{
              item.meta.title
            }}</span>
            <a v-else @click.prevent="handleLink(item)">{{
              item.meta.title
            }}</a>
          </el-breadcrumb-item>
          <!-- <el-breadcrumb-item> 是的 </el-breadcrumb-item> -->
        </el-breadcrumb>
      </div>
    </div>
    <div class="navbar-right">
      <div class="navbar-right-item">
        <el-tooltip
          v-if="isFullFlag"
          placement="bottom"
          effect="dark"
          content="退出全屏"
        >
          <SvgIcon
            name="exitFullScreen"
            @click="handleFullScreen"
            class="svg_icon"
          />
        </el-tooltip>
        <el-tooltip v-else placement="bottom" effect="dark" content="全屏">
          <el-icon size="20px" @click="handleFullScreen">
            <FullScreen />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="navbar-right-item">
        <el-popover :visible="visible" placement="bottom" :width="350">
          <template #reference>
            <el-badge :value="8" @click="visible = !visible">
              <el-tooltip content="消息通知">
                <el-icon :size="20"><Bell /></el-icon>
              </el-tooltip>
            </el-badge>
          </template>
          <template #default>
            <el-tabs v-model="activeName" :stretch="true">
              <el-tab-pane name="inform">
                <template #label>
                  <el-badge :value="2" type="primary"> 通知 </el-badge>
                </template>
                <template #default> 我是通知内容 </template>
              </el-tab-pane>
              <el-tab-pane name="message" label="消息">
                <template #label>
                  <el-badge :value="3" type="warning"> 消息 </el-badge>
                </template>
                <template #default> 我是消息 </template>
              </el-tab-pane>
              <el-tab-pane name="Wait" label="待办">
                <template #label>
                  <el-badge :value="3" type="danger"> 待办 </el-badge>
                </template>
                <template #default> 我是待办 </template>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-popover>
      </div>
      <div class="navbar-right-item">
        <el-tooltip placement="bottom" effect="dark" content="主题模式">
          <el-switch
            v-model:modelValue="isDark"
            :activeActionIcon="Moon"
            :inactiveActionIcon="Sunny"
            @change="handleChangeTheme"
          >
          </el-switch>
        </el-tooltip>
      </div>
      <div class="navbar-right-item">
        <el-dropdown>
          <span class="avatar">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <span>admin</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item> Action 1 </el-dropdown-item>
              <el-dropdown-item divided> Action 2 </el-dropdown-item>
              <el-dropdown-item :divided="true" @click="handleLogout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
import { useUserStore } from "@/store/modules/user";
import screenfull from "screenfull";
import { useRouter, useRoute, RouteLocationMatched } from "vue-router";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useThemeHook } from "@/hooks/useTheme";
const visible = ref(false); //弹出
const activeName = ref("inform"); //默认-通知
const isFullFlag = ref(false);
const route = useRoute(); //当前路由
const layoutStore = useLayoutStore();
const isCollapse = computed(() => layoutStore.isCollapse);
const hanldeCollapse = () => {
  layoutStore.handleCollspse();
};

//面包屑
const breadcrumbs = ref<RouteLocationMatched[]>([]);
// 面包屑
const getBreadcrumb = () => {
  breadcrumbs.value = route.matched.filter(
    (item) => item.meta.title && item.meta.breadcrumb !== false
  );
};
// 监听路由变化
watch(
  () => route.path,
  () => {
    getBreadcrumb();
  },
  { immediate: true }
);
//
const handleLink = (item: RouteLocationMatched) => {
  router.push(item.path);
};
// console.log("-----当前路由----", breadcrumbs.value);
// 监听全屏事件
onMounted(() => {
  document.addEventListener("fullscreenchange", () => {
    isFullFlag.value = screenfull.isFullscreen;
  });
});

// 取消全屏监听
onUnmounted(() => {
  document.removeEventListener("fullscreenchange", () => {});
});
// 手动切换全屏事件
const handleFullScreen = () => {
  isFullFlag.value = !isFullFlag.value;
  screenfull.toggle();
};
// 退出登录
const userStore = useUserStore();
const router = useRouter();
const handleLogout = () => {
  userStore.logout();
  router.replace("/login");
};
// 主题变化
const { activeThemeName, setTheme } = useThemeHook();
const isDark = computed(() => {
  return activeThemeName.value === "dark";
});
const handleChangeTheme = () => {
  if (activeThemeName.value === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  &-left {
    flex: 1;
    margin-left: 10px;
    display: flex;
    align-items: center;
    .expand {
      cursor: pointer;
    }
    .breadcrumb {
      margin-left: 10px;
    }
  }
  &-right {
    display: flex;
    margin-right: 10px;
    align-items: center;
    &-item {
      padding: 0px 10px;
      cursor: pointer;
      .svg_icon {
        width: 20px;
        height: 20px;
      }
      .avatar {
        display: flex;
        align-items: center;
        border-style: none;
        .el-avatar {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
