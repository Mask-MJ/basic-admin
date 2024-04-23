export interface SearchParams {
  page: number
  pageSize: number
  name: string | null
  value: string | null
  status: number | null
}

export interface UnitInfo {
  id: number
  name: string
  value: string
  status: number
  remark: string
  createdAt: Date
  updatedAt: Date
}
export interface CreateUnit {
  name: string
  value: string
  remark: string
}
