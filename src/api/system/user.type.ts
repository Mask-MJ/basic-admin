export interface RegisterParams {
  account: string
  password: string
  nickname?: string
  email: string | null
  avatar: string | null
  phoneNumber: string | null
  roles: number[]
  sex: number
  status: number
  deptId: number | null
  remark: string | null
}

export interface LoginParams {
  account: string
  password: string
}

export interface LoginResult {
  accessToken: string
  refreshToken: string
}

export interface UserInfo {
  id: number
  isAdmin: boolean
  account: string
  password: string
  nickname: string | null
  email: string | null
  avatar: string | null
  phoneNumber: string | null
  roles: number[]
  sex: number
  status: number
  deptId: number | null
  remark: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Role {
  id: number
  name: string
  remark: string
  roleKey: string
  sort: number
  status: number
}

export interface SearchParams {
  nickname: string | null
  phoneNumber: string | null
  status: number | null
  beginTime: number | null
  endTime: number | null
  page: number
  pageSize: number
}
