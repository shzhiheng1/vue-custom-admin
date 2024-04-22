<template>
  <div class="tags-view">
    <el-scrollbar>
      <div class="tags-view-group">
        <el-space>
          <el-tag
            :effect="currentPath === tag.path ? 'dark' : 'plain'"
            :closable="!tag.meta?.affix"
            v-for="tag in tagList"
            :key="tag.fullPath"
            @close="handleClose(tag)"
          >
            <router-link :to="{ path: tag.path, query: tag.query }">
              <div :class="currentPath === tag.path ? 'tag-title' : ''">
                {{ tag?.meta?.title }}
              </div>
            </router-link>
          </el-tag>
        </el-space>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue";
import { useLayoutStore, type tagType } from "@/store/modules/layout";
import { RouteRecordRaw, useRouter } from "vue-router";
import { constantRoutes } from "@/router/index";
const loyoutStore = useLayoutStore();
// const tagList = ref<tagType[]>([]);
const router = useRouter();

const currentPath = ref(router.currentRoute.value.path);
const tagList = computed(() => {
  return loyoutStore.state.tagViews;
});
// 初始化
const initTags = () => {
  // 放入
  const affixTags = filterAffix(constantRoutes);
  for (const tag of affixTags) {
    tag.name && loyoutStore.addTagViews(tag);
  }
};
const filterAffix = (routes: RouteRecordRaw[]) => {
  const tags: tagType[] = [];
  routes.forEach((route) => {
    if (route.path === "/") {
      return tags;
    }
    if (route?.meta?.affix) {
      tags.push({
        path: route.path,
        name: route.name,
        meta: { ...route.meta }
      });
    }
    if (route.children && route.children.length > 0) {
      const childTags = filterAffix(route.children);
      tags.push(...childTags);
    }
  });
  return tags;
};
// 是否未当前页面
const isActive = (tag: tagType) => {
  return tag.path === currentPath.value;
};
// 删除
const handleClose = (tag: tagType) => {
  loyoutStore.deleteTagViews(tag);
  if (isActive(tag)) {
    toLastTag();
  }
};
// 调整到最后一个tab
const toLastTag = () => {
  const lastTag = tagList.value.slice(-1)[0];
  router.push({ path: lastTag.path, query: lastTag.query });
};

// 监听路由
watch(
  () => router.currentRoute,
  (to) => {
    loyoutStore.addTagViews(to.value);
    currentPath.value = to.value.path;
  },
  {
    deep: true,
    immediate: true
  }
);

onMounted(() => {
  initTags();
});
</script>

<style lang="scss" scoped>
.tags-view {
  width: 100%;
  height: 36px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  .tags-view-group {
    height: 36px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    .el-tag--dark {
      a {
        color: #fff;
        .tag-title::before {
          content: "";
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #fff;
          display: inline-block;
          margin-right: 2px;
        }
      }
    }
    .el-tag--plain {
      a {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
