import type { CreateDictData, DictDataInfo, SearchParams } from './dictData.type'
import type { Result } from '@/utils/request/types'
import { defHttp } from '@/utils'

enum Api {
  DictData = 'system/dict-data'
}

// 获取字典列表
export const getDictDataList = (params?: Partial<SearchParams>) =>
  defHttp.get<Result<DictDataInfo[]>>({ url: Api.DictData, params })
// 创建字典列表
export const createDictData = (params: CreateDictData) =>
  defHttp.post({ url: Api.DictData, params })
// 获取单个字典列表
export const getDictDataDetail = (id: number) =>
  defHttp.get<DictDataInfo>({ url: `${Api.DictData}/${id}` })
// 更新字典列表
export const updateDictData = (params: Partial<DictDataInfo>) =>
  defHttp.patch({ url: `${Api.DictData}/${params.id}`, params })
// 删除字典列表
export const deleteDictData = (ids: number | string) =>
  defHttp.delete({ url: `${Api.DictData}/${ids}` })
