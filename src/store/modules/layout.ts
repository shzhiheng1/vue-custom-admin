import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import store from "../index";
import { RouteLocationNormalized } from "vue-router";

export type tagType = Partial<RouteLocationNormalized>;

export const useLayoutStore = defineStore(
  "layout",
  () => {
    interface defineState {
      tagViews: tagType[];
      cachedViews: string[];
    }
    // 是否收缩
    const isCollapse = ref(false);
    const state = reactive<defineState>({
      tagViews: [],
      cachedViews: []
    });
    const handleCollspse = () => {
      isCollapse.value = !isCollapse.value;
    };
    // 添加tag相关
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
  },
  //第一种：.pinia-plugin-persistedstate插件使用，默认localStorage存储,
  {
    //persist:true //全部存储,
    persist: {
      // 默认全部,localStorage存储,
      storage: sessionStorage //修改为sessionStorage存储类型
      // paths: ["isCollapse"] //用于指定 state 中哪些数据需要被持久化,[]表示都不存储
      // key: "Collapse" //存储key别名
    }
  }
  // 第二种：pinia-plugin-persist插件使用，默认sessionStorage存储,
  // {
  //   persist: {
  //     enabled: true //默认缓存所有
  //   }
  // }
  // 独存储
  // {
  // 方式1
  //   persist: {
  //     enabled: true,
  //     strategies: [
  //       { storage: sessionStorage, paths: ['firstName', 'lastName'] }, // firstName 和 lastName字段用sessionStorage存储
  //       { storage: localStorage, paths: ['accessToken'] }, // accessToken字段用 localstorage存储
  //     ],
  //   },
  // 方式2
  // persist: {
  //   enabled: true, // 开启缓存 localstorage/sessionStorage
  //   storage: sessionStorage, // 缓存使用方式
  //   paths:['baseDomain'] // 需要缓存键
  // }
  // }
);
// setup外使用
export function useLayoutStoreHook() {
  useLayoutStore(store);
}
