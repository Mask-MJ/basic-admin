import type { BeforeMiniState } from '/@/store/types';
import type { ProjectConfig, HeaderSetting, MenuSetting, MultiTabsSetting } from '/#/config';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { PROJ_CFG_KEY } from '/@/store/enum/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { resetRouter } from '/@/router';
import { deepMerge } from '/@/utils';

interface AppState {
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // 当窗口缩小时，记住一些状态，并在窗口恢复时恢复这些状态
  beforeMiniInfo: BeforeMiniState;
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
