/**全局注册SvgIcon**/
import { type App } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue"; // Svg Component
import "virtual:svg-icons-register"; //需要按装 npm install fast-glob -D,否则报错

export function loadSvg(app: App) {
  app.component("SvgIcon", SvgIcon);
}
