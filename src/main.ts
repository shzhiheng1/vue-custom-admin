import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
// 样式
import "normalize.css";
import "element-plus/dist/index.css";
// 黑色主题
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";

// 路由守卫
import "@/utils/permission";
// mock数据
import "@/mock";

// element-plus
import ElementPlus from "element-plus";

const app = createApp(App);

// 注册@element-plus/icons-vue为组件
import { LoadElementPlusIcon } from "./plugins/element-plus-icon";
LoadElementPlusIcon(app);

// 自定义svg-icon,并注册
import { loadSvg } from "./plugins/svg-icon";
loadSvg(app);

// 国际化，默认en;期日选择器的切换
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

app.use(router);
app.use(ElementPlus, { locale: zhCn });
app.use(store);
app.mount("#app");
//使用vue.js devtools工具
app.config.performance = true;
