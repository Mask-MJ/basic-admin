export interface SearchParams {
  page: number
  pageSize: number
  name: string | null
  customer: string | null
  saler: string | null
  factoryId?: number | null
  // beginTime: number | null
  // endTime: number | null
}

export interface ContractInfo {
  id: number
  name: string
  contractTime: number
  highValveCount: number
  valveCount: number
  customer: string
  customerPhone: string
  saler: string
  remark?: string
  factoryId: number
  createrId: number
  createdAt: string
  updatedAt: string
}
export interface CreatedContract {
  name: string
  contractTime: number
  valveCount: number
  highValveCount?: number
  customer: string
  customerPhone?: string
  saler: string
  remark?: string
  factoryId: number
}
