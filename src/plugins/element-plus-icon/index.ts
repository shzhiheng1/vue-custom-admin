/******把所有的element-plus-icon注册为vue组件********/
import * as ElementPlusIcon from "@element-plus/icons-vue";
import type { App } from "vue";

export const LoadElementPlusIcon = (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIcon)) {
    app.component(key, component);
  }
};
