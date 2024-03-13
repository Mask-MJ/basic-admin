import type { CreatedMenu, MenuInfo, SearchParams } from './menu.type'

import { defHttp } from '@/utils'

enum Api {
  Menu = 'system/menu'
}

// 获取菜单列表
export const getMenuList = (params?: Partial<SearchParams>) =>
  defHttp.get<MenuInfo[]>({ url: Api.Menu, params })
// 创建菜单
export const createMenu = (params: CreatedMenu) => defHttp.post({ url: Api.Menu, params })
// 获取单个菜单信息
export const getMenuDetail = (id: number) => defHttp.get<MenuInfo>({ url: `${Api.Menu}/${id}` })
// 更新菜单
export const updateMenu = (params: Partial<MenuInfo>) =>
  defHttp.patch({ url: `${Api.Menu}/${params.id}`, params })
// 删除菜单
export const deleteMenu = (ids: number | string) => defHttp.delete({ url: `${Api.Menu}/${ids}` })
