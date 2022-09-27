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
