import type { Result } from '@/utils/request/types'
import type { CreateDict, DictInfo, SearchParams } from './dict.type'

import { defHttp } from '@/utils'

enum Api {
  Dict = 'system/dict'
}

// 获取字典列表
export const getDictList = (params?: Partial<SearchParams>) =>
  defHttp.get<Result<DictInfo[]>>({ url: Api.Dict, params })
// 创建字典
export const createDict = (params: CreateDict) => defHttp.post({ url: Api.Dict, params })
// 获取单个字典信息
export const getDictDetail = (id: number) => defHttp.get<DictInfo>({ url: `${Api.Dict}/${id}` })
// 更新字典
export const updateDict = (params: Partial<DictInfo>) =>
  defHttp.patch({ url: `${Api.Dict}/${params.id}`, params })
// 删除字典
export const deleteDict = (ids: number | string) => defHttp.delete({ url: `${Api.Dict}/${ids}` })
