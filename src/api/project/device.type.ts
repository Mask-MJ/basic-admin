export interface SearchParams {
  page: number
  pageSize: number
  name: string | null
  status: number | null
  factoryId?: number | null
}

export interface DeviceInfo {
  id: number
  name: string
  status: number
  remark: string
  factoryId: number
  createrId: number
  valves: number[]
  createdAt: string
  updatedAt: string
}
export interface CreatedDevice {
  name: string
  status?: number
  remark?: string
  factoryId: number
}
