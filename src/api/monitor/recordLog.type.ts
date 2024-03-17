export interface RecordLogInofo {
  id: number
  account: string
  action: string
  module: string
  message: string
  detail: string
  createdAt: Date
  updatedAt: Date
}
export interface SearchParams {
  account: string | null
  action: string | null
  module: string | null
  beginTime?: number | null
  endTime?: number | null
  page: number
  pageSize: number
}
