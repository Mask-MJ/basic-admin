import type { ProjectConfig } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/store/modules/app';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

export function useRootSetting() {
  const appStore = useAppStore();

  const getPageLoading = computed(() => appStore.getPageLoading);

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive);

  const getContentMode = computed(() => appStore.getProjectConfig.contentMode);

  const getUseOpenBackTop = computed(() => appStore.getProjectConfig.useOpenBackTop);

  const getShowBreadCrumb = computed(() => appStore.getProjectConfig.showBreadCrumb);

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting);
  }

  return {
    setRootSetting,

    getPageLoading,
    getOpenKeepAlive,
    getShowBreadCrumb,
    getUseOpenBackTop,
    getContentMode,
  };
}
