import { MenuModeEnum, MenuTypeEnum } from '/@/store/enum/menuEnum';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface UserInfo {
  nickName: string;
  avatar: string;
  userName: string;
}

export interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
