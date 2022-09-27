import type { AppRouteRecordRaw } from '/@/router/types';
import type { RouteItem } from './model/menuModel';
import { defHttp } from '/@/utils/axios';

enum Api {
  GetMenuList = '/system/menu/getRouters',
  List = '/system/menu/list',
  Menu = '/system/menu/',
}

export const getMenuList = async () => {
  const res = await defHttp.get<RouteItem[]>({ url: Api.GetMenuList });
  return res.map((item) => {
    const redirect =
      item.alwaysShow && item.children?.length ? item.path + '/' + item.children[0].path : '';
    return { ...item, redirect };
  }) as AppRouteRecordRaw[];
};
