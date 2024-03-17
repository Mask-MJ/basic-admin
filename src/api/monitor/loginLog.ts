import { defHttp } from '@/utils'
import type { LoginLogInofo } from './loginLog.type'
import type { Result } from '@/utils/request/types'

enum Api {
  LoginLog = 'monitor/login-log'
}

// 获取日志列表
export const getLoginLogList = (params?: any) =>
  defHttp.get<Result<LoginLogInofo[]>>({ url: Api.LoginLog, params })

//获取日志详情
export const getLoginLogDetail = (id: number) =>
  defHttp.get<LoginLogInofo>({ url: `${Api.LoginLog}/${id}` })
