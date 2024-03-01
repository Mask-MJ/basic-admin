export interface CreatedRole {
  name: string
  roleKey: string
  sort: number
  remark: string
}

export interface RoleInfo {
  id: number
  name: string
  roleKey: string
  sort: number
  remark: string
  createdAt: string
  updatedAt: string
}

export interface SearchParams {
  pageSize: number
  pageNum: number
  name: string
  roleKey: string
  status: string
}

export interface Routes {
  id: number
  name: string
  path: string
  redirect: string
  meta: {
    title: string
    icon: string
    sort: number
    hidden: boolean
    parentId: number
    status: number
  }
  children?: Routes[]
}
