import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 配置svg-icon
    createSvgIconsPlugin({
      // 文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
      // 标识id
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@v": path.resolve(__dirname, "src/views"),
      // "@c": path.resolve(__dirname, "src/components"),
    },
  },
  /***css**/
  css: {
    // 将局部scss变量，预设为全局变量
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/styles/constant.scss';",
      },
    },
  },
  server: {
    port: 3000, // 端口
    strictPort: false, //端口被占用是否退出
    host: true, // host: "0.0.0.0"
    cors: true /** 跨域设置允许 */,
    open: false, //是否自动打开
    proxy: {
      "/api/v1": {
        target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212", //目标
        changeOrigin: true, //是否允许跨域
        // rewrite: (path) => path.replace(/^\/api/, ""), //把api重写为空
      },
    },
  },
});
