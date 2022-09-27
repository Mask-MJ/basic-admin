import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
// 使用Iconify中所有的图标
import purgeIcons from 'vite-plugin-purge-icons';
import windiCSS from 'vite-plugin-windicss';
// http2 证书
import VitePluginCertificate from 'vite-plugin-mkcert';
// setup name
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
// 用于读取 three.js 材质文件
import glsl from 'vite-plugin-glsl';
// 按需引入组件和组件样式 vue
import { configAutoImportPlugin } from './autoImport';
import { configStyleImportPlugin } from './styleImport';

export function createVitePlugins(_viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueSetupExtend(),
    VitePluginCertificate({
      source: 'coding',
    }),
  ];

  vitePlugins.push(windiCSS());
  vitePlugins.push(glsl());
  //   vitePlugins.push(configSvgIconsPlugin(isBuild));
  vitePlugins.push(purgeIcons());
  vitePlugins.push(...configAutoImportPlugin());
  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  return vitePlugins;
}
