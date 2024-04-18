import { ref, watch } from "vue";
// 标题
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE ?? "管理系统";

// 动态标题
const dynamicTitle = ref<string>("");

// 设置标题
const setTitle = (title?: string) => {
  dynamicTitle.value = title ? `${VITE_APP_TITLE} | ${title}` : VITE_APP_TITLE;
};

// 监听标题的变化,设置标题
watch(
  () => dynamicTitle.value,
  (newVal, _oldVal) => {
    document.title = newVal;
  }
);

export const useTitle = () => {
  return { setTitle };
};
