import type { Result } from '@/utils/request/types'
import { defHttp } from '@/utils'
import type { CreatedDevice, DeviceInfo, SearchParams } from './device.type'

enum Api {
  Device = 'project/device'
}

// 获取装置列表
export const getDeviceList = (params?: Partial<SearchParams>) =>
  defHttp.get<Result<DeviceInfo[]>>({ url: Api.Device, params })
// 创建装置
export const createDevice = (params: CreatedDevice) => defHttp.post({ url: Api.Device, params })
// 获取单个装置信息
export const getDeviceDetail = (id: number) =>
  defHttp.get<DeviceInfo>({ url: `${Api.Device}/${id}` })
// 更新装置
export const updateDevice = (params: Partial<DeviceInfo>) =>
  defHttp.patch({ url: `${Api.Device}/${params.id}`, params })
// 删除装置
export const deleteDevice = (ids: number | string) =>
  defHttp.delete({ url: `${Api.Device}/${ids}` })
