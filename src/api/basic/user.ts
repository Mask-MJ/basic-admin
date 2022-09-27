import type { ErrorMessageMode } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  GetPictureModel,
} from './model/userModel';

enum Api {
  Login = '/system/token/login', // 登录
  Logout = '/system/token/logout', // 退出登录
  GetUserInfo = '/system/user/getInfo', // 获取用户信息
  GetPictureCode = '/code',
}

export const loginApi = (params: LoginParams, mode: ErrorMessageMode = 'modal') =>
  defHttp.post<LoginResultModel>({ url: Api.Login, params }, { errorMessageMode: mode });

export const getUserInfo = () => defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });

export const doLogout = () => defHttp.delete({ url: Api.Logout });

export const getPictureCode = () => defHttp.get<GetPictureModel>({ url: Api.GetPictureCode });
