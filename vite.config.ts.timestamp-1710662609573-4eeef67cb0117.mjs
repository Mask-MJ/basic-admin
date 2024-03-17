// vite.config.ts
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import VueI18nPlugin from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/@intlify+unplugin-vue-i18n@2.0.0_vue-i18n@9.9.1/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import { unheadVueComposablesImports } from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/@unhead+vue@1.8.10_vue@3.4.20/node_modules/@unhead/vue/dist/index.mjs";
import vue from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.4_vue@3.4.20/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.1.4_vue@3.4.20/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { NaiveUiResolver } from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.20/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.20/node_modules/unplugin-vue-components/dist/vite.js";
import { VueRouterAutoImports } from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/unplugin-vue-router@0.7.0_vue-router@4.3.0_vue@3.4.20/node_modules/unplugin-vue-router/dist/index.mjs";
import VueRouter from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/unplugin-vue-router@0.7.0_vue-router@4.3.0_vue@3.4.20/node_modules/unplugin-vue-router/dist/vite.mjs";
import Layouts from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_vite@5.1.4_vue-router@4.3.0_vue@3.4.20/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Unocss from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_vite@5.1.4/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/vite@5.1.4_@types+node@20.11.21_sass@1.71.1/node_modules/vite/dist/node/index.js";
import mkcert from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/vite-plugin-mkcert@1.17.4_vite@5.1.4/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import glsl from "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/node_modules/.pnpm/vite-plugin-glsl@1.2.1_vite@5.1.4/node_modules/vite-plugin-glsl/src/index.js";
var __vite_injected_original_import_meta_url = "file:///G:/study/%E5%A4%96%E5%8C%85%E9%A1%B9%E7%9B%AE/basic-admin/vite.config.ts";
var vite_config_default = defineConfig(({ mode }) => {
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } = loadEnv(mode, process.cwd());
  return {
    base: VITE_PUBLIC_PATH,
    resolve: { alias: { "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)) } },
    server: {
      port: Number(VITE_PORT) || 3100,
      host: true,
      proxy: {
        "/api": {
          target: VITE_PROXY,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    esbuild: { pure: ["console.log", "console.info", "console.error"] },
    plugins: [
      VueRouter({
        dts: "./types/typed-router.d.ts",
        routesFolder: [{ src: "src/views", path: "" }],
        extensions: [".page.vue"]
      }),
      vue(),
      vueJsx(),
      mkcert(),
      VueI18nPlugin({
        runtimeOnly: true,
        include: [path.resolve(process.cwd(), "src/locales/lang/**")]
      }),
      glsl(),
      Unocss(),
      Layouts(),
      AutoImport({
        imports: [
          "vue",
          "vue-i18n",
          VueRouterAutoImports,
          unheadVueComposablesImports,
          "@vueuse/core",
          { "vue-router/auto": ["useLink"] },
          { "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"] }
        ],
        vueTemplate: true,
        dirs: ["src/store/modules", "src/components/Common"],
        dts: "types/auto-imports.d.ts"
      }),
      Components({ dts: "types/components.d.ts", resolvers: [NaiveUiResolver()] })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxzdHVkeVxcXFxcdTU5MTZcdTUzMDVcdTk4NzlcdTc2RUVcXFxcYmFzaWMtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkc6XFxcXHN0dWR5XFxcXFx1NTkxNlx1NTMwNVx1OTg3OVx1NzZFRVxcXFxiYXNpYy1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovc3R1ZHkvJUU1JUE0JTk2JUU1JThDJTg1JUU5JUExJUI5JUU3JTlCJUFFL2Jhc2ljLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCBWdWVJMThuUGx1Z2luIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXHJcbmltcG9ydCB7IHVuaGVhZFZ1ZUNvbXBvc2FibGVzSW1wb3J0cyB9IGZyb20gJ0B1bmhlYWQvdnVlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgeyBOYWl2ZVVpUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IFZ1ZVJvdXRlckF1dG9JbXBvcnRzIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlcidcclxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXHJcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJ1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCdcclxuaW1wb3J0IGdsc2wgZnJvbSAndml0ZS1wbHVnaW4tZ2xzbCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCB7IFZJVEVfUFVCTElDX1BBVEgsIFZJVEVfUE9SVCwgVklURV9QUk9YWSB9ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBWSVRFX1BVQkxJQ19QQVRILFxyXG4gICAgcmVzb2x2ZTogeyBhbGlhczogeyAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSB9IH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogTnVtYmVyKFZJVEVfUE9SVCkgfHwgMzEwMCxcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL2FwaSc6IHtcclxuICAgICAgICAgIHRhcmdldDogVklURV9QUk9YWSxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlc2J1aWxkOiB7IHB1cmU6IFsnY29uc29sZS5sb2cnLCAnY29uc29sZS5pbmZvJywgJ2NvbnNvbGUuZXJyb3InXSB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBWdWVSb3V0ZXIoe1xyXG4gICAgICAgIGR0czogJy4vdHlwZXMvdHlwZWQtcm91dGVyLmQudHMnLFxyXG4gICAgICAgIHJvdXRlc0ZvbGRlcjogW3sgc3JjOiAnc3JjL3ZpZXdzJywgcGF0aDogJycgfV0sXHJcbiAgICAgICAgZXh0ZW5zaW9uczogWycucGFnZS52dWUnXVxyXG4gICAgICB9KSxcclxuICAgICAgdnVlKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICBta2NlcnQoKSxcclxuICAgICAgVnVlSTE4blBsdWdpbih7XHJcbiAgICAgICAgcnVudGltZU9ubHk6IHRydWUsXHJcbiAgICAgICAgaW5jbHVkZTogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2xvY2FsZXMvbGFuZy8qKicpXVxyXG4gICAgICB9KSxcclxuICAgICAgZ2xzbCgpLFxyXG4gICAgICBVbm9jc3MoKSxcclxuICAgICAgTGF5b3V0cygpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgICAndnVlJyxcclxuICAgICAgICAgICd2dWUtaTE4bicsXHJcbiAgICAgICAgICBWdWVSb3V0ZXJBdXRvSW1wb3J0cyxcclxuICAgICAgICAgIHVuaGVhZFZ1ZUNvbXBvc2FibGVzSW1wb3J0cyxcclxuICAgICAgICAgICdAdnVldXNlL2NvcmUnLFxyXG4gICAgICAgICAgeyAndnVlLXJvdXRlci9hdXRvJzogWyd1c2VMaW5rJ10gfSxcclxuICAgICAgICAgIHsgJ25haXZlLXVpJzogWyd1c2VEaWFsb2cnLCAndXNlTWVzc2FnZScsICd1c2VOb3RpZmljYXRpb24nLCAndXNlTG9hZGluZ0JhciddIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxyXG4gICAgICAgIGRpcnM6IFsnc3JjL3N0b3JlL21vZHVsZXMnLCAnc3JjL2NvbXBvbmVudHMvQ29tbW9uJ10sXHJcbiAgICAgICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnRzLmQudHMnXHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHsgZHRzOiAndHlwZXMvY29tcG9uZW50cy5kLnRzJywgcmVzb2x2ZXJzOiBbTmFpdmVVaVJlc29sdmVyKCldIH0pXHJcbiAgICBdXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFTLE9BQU8sVUFBVTtBQUN0VCxTQUFTLGVBQWUsV0FBVztBQUVuQyxPQUFPLG1CQUFtQjtBQUMxQixTQUFTLG1DQUFtQztBQUM1QyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZUFBZTtBQUN0QixPQUFPLGFBQWE7QUFDcEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFoQmdKLElBQU0sMkNBQTJDO0FBbUJsTixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLEVBQUUsa0JBQWtCLFdBQVcsV0FBVyxJQUFJLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUMvRSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDLEVBQUUsRUFBRTtBQUFBLElBQzVFLFFBQVE7QUFBQSxNQUNOLE1BQU0sT0FBTyxTQUFTLEtBQUs7QUFBQSxNQUMzQixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLEVBQUUsTUFBTSxDQUFDLGVBQWUsZ0JBQWdCLGVBQWUsRUFBRTtBQUFBLElBQ2xFLFNBQVM7QUFBQSxNQUNQLFVBQVU7QUFBQSxRQUNSLEtBQUs7QUFBQSxRQUNMLGNBQWMsQ0FBQyxFQUFFLEtBQUssYUFBYSxNQUFNLEdBQUcsQ0FBQztBQUFBLFFBQzdDLFlBQVksQ0FBQyxXQUFXO0FBQUEsTUFDMUIsQ0FBQztBQUFBLE1BQ0QsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsU0FBUyxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxxQkFBcUIsQ0FBQztBQUFBLE1BQzlELENBQUM7QUFBQSxNQUNELEtBQUs7QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUU7QUFBQSxVQUNqQyxFQUFFLFlBQVksQ0FBQyxhQUFhLGNBQWMsbUJBQW1CLGVBQWUsRUFBRTtBQUFBLFFBQ2hGO0FBQUEsUUFDQSxhQUFhO0FBQUEsUUFDYixNQUFNLENBQUMscUJBQXFCLHVCQUF1QjtBQUFBLFFBQ25ELEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxNQUNELFdBQVcsRUFBRSxLQUFLLHlCQUF5QixXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO0FBQUEsSUFDN0U7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
