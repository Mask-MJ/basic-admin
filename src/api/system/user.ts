import type { LoginParams, LoginResult, RegisterParams, SearchParams, UserInfo } from './user.type'
import type { Result } from '@/utils/request/types'

import { defHttp } from '@/utils'

enum Api {
  Register = 'authentication/sign-up',
  Login = 'authentication/sign-in',

  Users = 'system/user',
  UserInfo = 'system/user/info',
  ChangePassword = 'system/user/changePassword',
  Logout = 'system/user/logout'
}

// 注册
export const register = (params: RegisterParams) => defHttp.post({ url: Api.Register, params })
// 登录
export const login = (params: LoginParams) => defHttp.post<LoginResult>({ url: Api.Login, params })
// 退出
export const doLogout = () => defHttp.post({ url: Api.Logout })
// 获取自身用户信息
export const getUserInfo = () => defHttp.get<UserInfo>({ url: Api.UserInfo })

// 获取用户列表
export const getUsersList = (params?: Partial<SearchParams>) =>
  defHttp.get<Result<UserInfo[]>>({ url: Api.Users, params })
// 创建用户
export const createUser = (params: UserInfo) => defHttp.post({ url: Api.Users, params })
// 获取单个用户信息
export const getUserDetail = (id: number) => defHttp.get<UserInfo>({ url: `${Api.Users}/${id}` })
// 修改密码
export const changePassword = (params: { id: number; password: string; oldPassword: string }) =>
  defHttp.patch({ url: Api.ChangePassword, params })
// 更新用户
export const updateUser = (params: Partial<UserInfo>) =>
  defHttp.patch({ url: `${Api.Users}/${params.id}`, params })
// 删除用户
export const deleteUser = (ids: number | string) => defHttp.delete({ url: `${Api.Users}/${ids}` })
