import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/proxy';
import { createVitePlugins } from './build/plugin';

const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir);
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 当前工作目录路径
  const root = process.cwd();
  /**
   * vite方法, 加载环境变量
   * loadEnv接收三个参数，
   * 第一个是.env后面的名字，
   * 第二个是绝对路径，
   * 第三个参数是你环境变量名的前缀，在vite中默认是VITE_
   */
  const env = loadEnv(mode, root);
  const isBuild = command === 'build';
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        { find: /\/@\//, replacement: pathResolve('src') + '/' },
        { find: /\/#\//, replacement: pathResolve('types') + '/' },
      ],
    },
    server: {
      https: true,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      reportCompressedSize: false,
      outDir: 'dist',
      chunkSizeWarningLimit: 2000,
    },
    css: {
      preprocessorOptions: {
        less: { javascriptEnabled: true },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  };
};
