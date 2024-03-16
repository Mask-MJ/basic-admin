import { defHttp } from '@/utils'
import type { SearchParams, onlineUserInfo } from './online.type'
import type { Result } from '@/utils/request/types'

enum Api {
  Online = 'system/online'
}

//获取在线用户
export const getOnlineUser = (params?: Partial<SearchParams>) =>
  defHttp.get<Result<onlineUserInfo[]>>({ url: Api.Online, params })

//移除在线用户
export const deleteOnlineUser = (ids: number | string) =>
  defHttp.delete({ url: `${Api.Online}/${ids}` })
