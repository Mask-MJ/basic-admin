import type { UserState, UserInfo, ErrorMessageMode } from '/@/store/types';
import type { GetUserInfoModel, LoginParams } from '/@/api/basic/model/userModel';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { router } from '/@/router';
import { PageEnum } from '/@/router/pageEnum';

import { TOKEN_KEY, USER_INFO_KEY } from '/@/store/enum/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { useMessage } from '/@/hooks/web/useMessage';
import { doLogout, getUserInfo, loginApi } from '/@/api/basic/user';

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setUserInfo(info) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & { goHome?: boolean; mode?: ErrorMessageMode },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { access_token } = data;
        // save token
        this.setToken(access_token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();
      goHome && (await router.replace(PageEnum.BASE_HOME));
      return userInfo;
    },
    async getUserInfoAction(): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      this.setUserInfo(userInfo.user);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        await doLogout();
      }
      this.setToken(undefined);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '温馨提示'),
        content: () => h('span', '是否确认退出系统'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
