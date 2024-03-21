export interface SearchParams {
  name: string | null
  status: number | null
  page: number
  pageSize: number
}

export interface DeptInfo {
  id: number
  name: string
  status: number
  sort: number
  parentId: number
  remark: string
  createdAt: Date
  updatedAt: Date
}

export interface CreatedDept {
  name: string
  status?: number
  sort?: number
  parentId?: number
  remark?: string
}
