import { ref, watchEffect } from "vue";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

/** 注册的主题名称, 其中 DefaultThemeName 是必填的 */
// export type ThemeName = "light" | "dark";

/** 正在应用的主题名称 */
const activeThemeName = ref<string>(getLocalStorage("theme") || "light");

/** 设置主题 */
const setTheme = (value: string) => {
  activeThemeName.value = value;
};

/** 在 html 根元素上挂载 class */
const setHtmlRootClassName = (value: string) => {
  document.documentElement.className = value;
};

/** 初始化 */
const initTheme = () => {
  // watchEffect 来收集副作用
  watchEffect(() => {
    const value = activeThemeName.value;
    setHtmlRootClassName(value);
    setLocalStorage("theme", value);
  });
};

/** 主题 hook */
export function useThemeHook() {
  return { activeThemeName, initTheme, setTheme };
}
