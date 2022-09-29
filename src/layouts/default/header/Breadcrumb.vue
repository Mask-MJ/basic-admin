<template>
  <div>
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <Icon :icon="getIcon(route)" v-if="getIcon(route)" />
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
  // import { useRouter } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { isString } from '/@/utils/is';
  // import { REDIRECT_NAME } from '/@/router/constant';
  // import { getMenus } from '/@/router/menus';

  const go = useGo();
  const routes = ref([]);
  // const { currentRoute } = useRouter();

  watchEffect(async () => {
    // if (currentRoute.value.name === REDIRECT_NAME) return;
    // const menus = await getMenus();
    // const routeMatched = currentRoute.value.matched;
    // const cur = routeMatched?.[routeMatched.length - 1];
    // let path = currentRoute.value.path;
    // if (cur && cur?.meta?.currentActiveMenu) {
    //   path = cur.meta.currentActiveMenu as string;
    // }
    // const parent = getAllParentPath(menus, path);
    // const filterMenus = menus.filter((item) => item.path === parent[0]);
    // const matched = getMatched(filterMenus, parent) as any;
    // if (!matched || matched.length === 0) return;
    // const breadcrumbList = filterItem(matched);
    // if (currentRoute.value.meta?.currentActiveMenu) {
    //   breadcrumbList.push({
    //     ...currentRoute.value,
    //     name: currentRoute.value.meta?.title || currentRoute.value.name,
    //   } as unknown as RouteLocationMatched);
    // }
    // routes.value = breadcrumbList;
  });

  const getIcon = (route) => route.icon || route.meta?.icon;
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
</script>

<style scoped></style>
