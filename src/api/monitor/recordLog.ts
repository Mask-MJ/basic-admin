import { defHttp } from '@/utils'
import type { Result } from '@/utils/request/types'
import type { RecordLogInofo } from './recordLog.type'

enum Api {
  RecordLog = 'monitor/record-log'
}

//获取操作日志列表
export const getRecordLogList = (params?: any) =>
  defHttp.get<Result<RecordLogInofo[]>>({ url: Api.RecordLog, params })

//获取操作日志详情
export const getRecordLogDetail = (id: number) =>
  defHttp.get<RecordLogInofo>({ url: `${Api.RecordLog}/${id}` })
