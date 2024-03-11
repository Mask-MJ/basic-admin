export interface RegisterParams {
  account: string
  password: string
  nickname?: string
  roles?: string[]
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
  nickname: string
  phoneNumber: string
  status: number | null
  createTime: string
  page: number
  pageSize: number
}
