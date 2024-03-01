<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router/auto'

import { router } from '@/router'

const route = useRoute()
const theme = useThemeStore()
const user = useUserStore()

function getTopLevelMenu(
  path: string,
  routes: RouteRecordRaw[],
  parentPath?: string
): RouteRecordRaw | undefined {
  return routes.find((item) => {
    const fullPath = parentPath ? `${parentPath}/${item.path}` : item.path
    if (fullPath === path) return true
    if (Array.isArray(item.children)) {
      return getTopLevelMenu(path, item.children, item.path)
    }
    return false
  })
}

function generateBreadcrumbs(routes: RouteRecordRaw[]): DropdownOption[] {
  const locale = useAppStore().locale
  return routes.map((route) => {
    const label = locale === 'zh-CN' ? route.meta?.title : (route.name as string)
    const list: DropdownOption = {
      label,
      key: route.path,
      icon: () => h('i', { class: route.meta!.icon })
    }
    if (route.children && route.children.length > 0) {
      list.children = generateBreadcrumbs(route.children)
    }
    return list
  })
}

const breadcrumbs = computed(() => {
  const topLevelMenu = getTopLevelMenu(route.path, user.backendRouteList)
  // 获取当前路由菜单
  if (topLevelMenu) {
    if (topLevelMenu.children) {
      topLevelMenu.children = topLevelMenu.children.filter((item) => !item.meta?.hidden)
      const currentRoute = topLevelMenu.children.find(
        (item) => `${topLevelMenu.path}/${item.path}` === route.path
      )
      return generateBreadcrumbs([topLevelMenu, currentRoute!])
    }
    return generateBreadcrumbs([topLevelMenu!])
  }

  return []
})

function dropdownSelect(key: string) {
  router.push({ path: key })
}
</script>

<template>
  <n-breadcrumb class="px-1">
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <n-breadcrumb-item>
        <n-dropdown
          v-if="breadcrumb.children && breadcrumb.children.length > 0"
          :options="breadcrumb.children"
          @select="dropdownSelect"
        >
          <span>
            <component
              :is="breadcrumb.icon"
              v-if="theme.header.crumb.showIcon"
              :class="{ 'text-#BBBBBB': theme.header.inverted }"
              class="inline-block align-text-bottom mr-4px text-16px"
            />
            <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
              {{ breadcrumb.label }}
            </span>
          </span>
        </n-dropdown>
        <template v-else>
          <component
            :is="breadcrumb.icon"
            v-if="theme.header.crumb.showIcon"
            :class="{ 'text-#BBBBBB': theme.header.inverted }"
            class="inline-block align-text-bottom mr-4px text-16px"
          />
          <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
            {{ breadcrumb.label }}
          </span>
        </template>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
  <div></div>
</template>
