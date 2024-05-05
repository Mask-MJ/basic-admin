import type { Result } from '@/utils/request/types'
import { defHttp } from '@/utils'
import type { ContractInfo, CreatedContract, SearchParams } from './contract.type'

enum Api {
  Contract = 'project/contract'
}

// 获取合同列表
export const getContractList = (params?: Partial<SearchParams>) =>
  defHttp.get<Result<ContractInfo[]>>({ url: Api.Contract, params })
// 创建合同
export const createContract = (params: CreatedContract) =>
  defHttp.post({ url: Api.Contract, params })
// 获取单个合同信息
export const getContractDetail = (id: number) =>
  defHttp.get<ContractInfo>({ url: `${Api.Contract}/${id}` })
// 更新合同
export const updateContract = (params: Partial<ContractInfo>) =>
  defHttp.patch({ url: `${Api.Contract}/${params.id}`, params })
// 删除合同
export const deleteContract = (ids: number | string) =>
  defHttp.delete({ url: `${Api.Contract}/${ids}` })
