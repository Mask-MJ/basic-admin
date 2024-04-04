export interface CreateDict {
  name: string
  value: string
  remark: string
}

export interface DictInfo {
  id: number
  name: string
  value: string
  remark: string
  createdAt: Date
  updatedAt: Date
}

export interface SearchParams {
  page: number
  pageSize: number
  name: string | null
  value: string | null
  status: number | null
}
