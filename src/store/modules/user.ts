import type { UserState, UserInfo } from '/@/store/types';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { TOKEN_KEY, USER_INFO_KEY } from '../enum/cacheEnum';
// import { PageEnum } from '/@/router/pageEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: {
      nickName: '',
      avatar: '',
      userName: '',
    },
    token: undefined,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
