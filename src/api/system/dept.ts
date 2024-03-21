import { defHttp } from '@/utils'
import type { CreatedDept, DeptInfo, SearchParams } from './dept.type'
import type { Result } from '@/utils/request/types'

enum Api {
  Dept = 'system/dept'
}

// 获取部门列表
export const getDeptList = (params?: Partial<SearchParams>) =>
  defHttp.get<Result<DeptInfo[]>>({ url: Api.Dept, params })
// 创建部门
export const createDept = (params: CreatedDept) => defHttp.post({ url: Api.Dept, params })
// 获取单个部门信息
export const getDeptDetail = (id: number) => defHttp.get<DeptInfo>({ url: `${Api.Dept}/${id}` })
// 更新部门
export const updateDept = (params: Partial<DeptInfo>) =>
  defHttp.patch({ url: `${Api.Dept}/${params.id}`, params })
// 删除部门
export const deleteDept = (ids: number | string) => defHttp.delete({ url: `${Api.Dept}/${ids}` })
