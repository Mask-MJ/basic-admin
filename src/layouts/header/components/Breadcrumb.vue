<template>
  <div>
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <span v-if="!hasRedirect(routesMatched, route)">
          {{ route.name || route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ route.name || route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
  import type { RouteLocationMatched } from 'vue-router';
  import type { Menu } from '/@/router/types';

  import { useRouter } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { isString } from '/@/utils/is';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { getMenus } from '/@/router/menus';
  import { getAllParentPath } from '/@/router/helper/menuHelper';
  import { filter } from '/@/utils/helper/treeHelper';

  interface Route extends RouteLocationMatched {
    path: string;
    breadcrumbName: string;
    children: any;
  }

  const go = useGo();
  const routes = ref<Route[]>();
  const { currentRoute } = useRouter();

  watchEffect(async () => {
    // 判断路由是否是跳转路由
    if (currentRoute.value.name === REDIRECT_NAME) return;
    // 获取 pinia 中的路由列表
    const menus = await getMenus();
    // 当前路由对象嵌套的路由记录
    const routeMatched = currentRoute.value.matched;
    const cur = routeMatched?.[routeMatched.length - 1];
    let path = currentRoute.value.path;
    if (cur && cur?.meta?.currentActiveMenu) {
      path = cur.meta.currentActiveMenu as string;
    }
    const parent = getAllParentPath(menus, path);
    const filterMenus = menus.filter((item) => item.path === parent[0]);
    const matched = getMatched(filterMenus, parent) as any;
    if (!matched || matched.length === 0) return;
    const breadcrumbList = filterItem(matched);
    if (currentRoute.value.meta?.currentActiveMenu) {
      breadcrumbList.push({
        ...currentRoute.value,
        name: currentRoute.value.meta?.title || currentRoute.value.name,
      } as unknown as Route);
    }
    routes.value = breadcrumbList;
  });

  const hasRedirect = (routes: RouteLocationMatched[], route: RouteLocationMatched) =>
    routes.indexOf(route) !== routes.length - 1;

  const handleClick = (route: RouteLocationMatched, paths: string[], e: Event) => {
    e?.preventDefault();
    const { children, redirect, meta } = route;

    if (children?.length && !redirect) {
      e?.stopPropagation();
      return;
    }
    if (meta?.carryParam) {
      return;
    }

    if (redirect && isString(redirect)) {
      go(redirect);
    } else {
      let goPath = '';
      if (paths.length === 1) {
        goPath = paths[0];
      } else {
        const ps = paths.slice(1);
        const lastPath = ps.pop() || '';
        goPath = `${lastPath}`;
      }
      goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
      go(goPath);
    }
  };

  const filterItem = (list: Route[]) => {
    return filter(list, (item) => {
      const { meta, name } = item;
      if (!meta) {
        return !!name;
      }
      const { title, hideBreadcrumb, hideMenu } = meta;
      if (!title || hideBreadcrumb || hideMenu) {
        return false;
      }
      return true;
    }).filter((item) => !item.meta?.hideBreadcrumb);
  };

  const getMatched = (menus: Menu[], parent: string[]) => {
    const metched: Menu[] = [];
    menus.forEach((item) => {
      if (parent.includes(item.path)) {
        metched.push({
          ...item,
          name: (item.meta?.title as string) || item.name,
        });
      }
      if (item.children?.length) {
        metched.push(...getMatched(item.children, parent));
      }
    });
    return metched;
  };
</script>

<style scoped></style>
