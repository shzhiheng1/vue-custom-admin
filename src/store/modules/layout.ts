import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import store from "../index";
import { RouteLocationNormalized } from "vue-router";

export type tagType = Partial<RouteLocationNormalized>;

export const useLayoutStore = defineStore("layout", () => {
  interface defineState {
    tagViews: tagType[];
    cachedViews: string[];
  }
  // 是否收缩
  const isCollapse = ref(false);
  const state = reactive<defineState>({
    tagViews: [],
    cachedViews: [],
  });
  const handleCollspse = () => {
    isCollapse.value = !isCollapse.value;
  };
  // tag相关
  const addTagViews = (item: tagType) => {
    const index = state.tagViews.findIndex((tag) => tag.path === item.path);
    if (index === -1) {
      if (item.meta?.affix) {
        state.tagViews.unshift(item);
      } else {
        state.tagViews.push(item);
      }
      addCachedViews(item);
    }
  };
  // 删除tag
  const deleteTagViews = (item: tagType) => {
    const index = state.tagViews.findIndex((tag) => tag.path === item.path);
    if (index !== -1) {
      state.tagViews.splice(index, 1);
      deleteCachedViews(item);
    }
  };
  // 添加缓存
  const addCachedViews = (view: tagType) => {
    if (typeof view.name !== "string") return;
    const index = state.cachedViews.findIndex((name) => name === view.name);
    if (index === -1 && view.meta?.keepAlive) {
      state.cachedViews.push(view?.name);
    }
  };
  // 删除缓存
  const deleteCachedViews = (view: tagType) => {
    if (typeof view.name !== "string") return;
    const index = state.cachedViews.findIndex((name) => name === view.name);
    if (index !== -1) {
      state.cachedViews.splice(index, 1);
    }
  };

  return { isCollapse, handleCollspse, state, addTagViews, deleteTagViews };
});
// setup外使用
export function useLayoutStoreHook() {
  useLayoutStore(store);
}
