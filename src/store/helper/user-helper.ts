import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router/auto'
import { RouterLink } from 'vue-router/auto'

export function transformersMenus(data: RouteRecordRaw[]) {
  const locale = useAppStore().locale
  const menuOption: MenuOption[] = []
  data.forEach((item) => {
    if (item.meta) {
      const label = locale === 'zh-CN' ? item.meta.title : (item.name as string)
      const menu: MenuOption = {
        key: item.path,
        label: () =>
          item.meta?.parentId === 0
            ? h('span', label)
            : h(RouterLink, { to: item.path }, { default: () => label }),
        icon: () => h('i', { class: item.meta?.icon }),
        children: item.children ? transformersMenus(item.children) : undefined
      }
      menuOption.push(menu)
    }
  })
  return menuOption
}
