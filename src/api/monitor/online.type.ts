export interface SearchParams {
  account: string | null
  nickname: string | null
  phoneNumber: string | null
  status?: number | null
  beginTime?: number | null
  endTime?: number | null
  page?: number
  pageSize?: number
}

export interface onlineUserInfo {
  id: number
  isAdmin: boolean
  account: string
  password: string
  nickname: string
  email: string
  avatar: string
  phoneNumber: string
  sex: number
  status: number
  deptId: number
  remark: string
  createdAt: Date
  updatedAt: Date
}
