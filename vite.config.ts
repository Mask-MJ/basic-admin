// import type { UserConfig, ConfigEnv } from "vite";
import { defineConfig } from "vite";
// import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
// export default ({ command, mode }: ConfigEnv): UserConfig => {
//   // 当前工作目录路径
//   const root = process.cwd();
//   /**
//    * vite方法, 加载环境变量
//    * loadEnv接收三个参数，
//    * 第一个是.env后面的名字，
//    * 第二个是绝对路径，
//    * 第三个参数是你环境变量名的前缀，在vite中默认是VITE_
//    */
// };
