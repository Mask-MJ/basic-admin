export interface logInofo {
  id: number
  userId: number
  account: string | null
  ip: string
  address: string | null
  userAgent: string
  createdAt: Date
  updatedAt: Date
  user: number
}

export interface SearchParams {
  account: string | null
  address: string | null
  beginTime?: number | null
  endTime?: number | null
  page: number
  pageSize: number
}
