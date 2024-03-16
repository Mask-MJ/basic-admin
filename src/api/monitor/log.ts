import { defHttp } from '@/utils'
import type { logInofo } from './log.type'
import type { Result } from '@/utils/request/types'

enum Api {
  Log = 'system/log'
}

// 获取日志列表
export const getLogList = (params?: any) =>
  defHttp.get<Result<logInofo[]>>({ url: Api.Log, params })

//获取日志详情
export const getLogDetail = (id: number) => defHttp.get<logInofo>({ url: `${Api.Log}/${id}` })
