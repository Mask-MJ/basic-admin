/**
 * @param envConf
 * 加载的环境变量是json字符串
 * 通过 wrapperEnv 方法转换格式
 */
export const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: any = {};
  for (const envName of Object.keys(envConf)) {
    let value = envConf[envName];
    if (envName === 'VITE_PORT') {
      value = Number(value);
    }
    if (envName === 'VITE_PROXY' && value) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch (error) {
        value = '';
      }
    }
    ret[envName] = value;
  }
  return ret;
};
