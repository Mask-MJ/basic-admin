export interface CreatedMenu {
  name: string
  path: string
  icon: string
  hidden?: boolean
  status: number
  sort?: number
  parentId?: number
}

export interface MenuInfo {
  id: number
  name: string
  path: string
  icon: string
  hidden: boolean
  status: number
  sort: number
  parentId: number
  createdAt: Date
  updatedAt: Date
}

export interface SearchParams {
  name: string | null
  status: number | null
  page: number
  pageSize: number
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
