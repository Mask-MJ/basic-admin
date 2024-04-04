export interface SearchParams {
  page: number
  pageSize: number
  dictId: number
  name: string | null
  value: string | null
  status: number | null
}

export interface DictDataInfo {
  id: number
  name: string
  value: string
  remark: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateDictData {
  name: string
  value: string
  remark: string
}
