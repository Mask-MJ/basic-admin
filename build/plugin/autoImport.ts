import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export const configAutoImportPlugin = () => [
  AutoImport({
    // 自动导入 vue vue-router @vueuse/head @vueuse/core
    imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
    vueTemplate: true,
    dts: 'types/auto-import.d.ts',
  }),
  Components({
    // 按需自动导入 .vue 文件
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    resolvers: [IconsResolver(), AntDesignVueResolver()],
    dts: 'types/components.d.ts',
    dirs: ['src/components'], // 按需加载的文件夹
  }),
  // 自动导入 icon
  Icons({
    autoInstall: true,
  }),
];
