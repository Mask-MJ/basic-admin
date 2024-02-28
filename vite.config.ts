import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueRouter from 'unplugin-vue-router/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import mkcert from 'vite-plugin-mkcert'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: {
    port: 3100,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  esbuild: { pure: ['console.log', 'console.info', 'console.error'] },
  plugins: [
    VueRouter({
      dts: './types/typed-router.d.ts',
      routesFolder: [{ src: 'src/views', path: '' }],
      extensions: ['.page.vue']
    }),
    vue(),
    vueJsx(),
    mkcert(),
    VueI18nPlugin({
      runtimeOnly: true,
      include: [path.resolve(process.cwd(), 'src/locales/lang/**')]
    }),
    Unocss(),
    Layouts(),
    // MetaLayouts(),
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        VueRouterAutoImports,
        unheadVueComposablesImports,
        '@vueuse/core',
        { 'vue-router/auto': ['useLink'] },
        { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] }
      ],
      vueTemplate: true,
      dirs: ['src/store/modules', 'src/components/Common'],
      dts: 'types/auto-imports.d.ts'
    }),
    Components({ dts: 'types/components.d.ts', resolvers: [NaiveUiResolver()] })
  ]
})
