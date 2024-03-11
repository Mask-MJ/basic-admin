import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router/auto'
import type { LoginParams, UserInfo } from '@/api/system/user.type'
import type { RemovableRef } from '@vueuse/core'

import { getMenuList } from '@/api/system/role'
import { getUserInfo, login } from '@/api/system/user'
import { router } from '@/router'
import { CACHE_ROUTES, PageEnum, TOKEN_KEY, USER_INFO_KEY } from '@/settings/enums'
import { defineStore } from 'pinia'
import { flatMapDeep } from 'lodash-es'
import { transformersMenus } from '../helper/user-helper'

interface UserState {
  /** Token */
  token: RemovableRef<string | null>
  /** 用户信息 */
  userInfo: RemovableRef<UserInfo>
  /** 路由是否动态添加 */
  isDynamicAddedRoute: boolean
  /** 后台返回的路由列表 */
  backendRouteList: RouteRecordRaw[]
  /** 菜单列表 */
  menus: MenuOption[]
  /** 缓存路由页面 */
  cacheRoutes: RemovableRef<string[]>
}

export const useUserStore = defineStore('user-store', {
  state: (): UserState => ({
    token: useStorage(TOKEN_KEY, null),
    userInfo: useStorage(USER_INFO_KEY, {} as UserInfo),
    isDynamicAddedRoute: false,
    backendRouteList: [],
    menus: [],
    cacheRoutes: useStorage(CACHE_ROUTES, [])
  }),
  getters: {
    getToken(): string {
      return this.token || ''
    },
    getUserInfo(): UserInfo {
      return this.userInfo || ({} as UserInfo)
    },
    getMenuList(): MenuOption[] {
      // const locale = useStorage('LANGUAGE__', 'zh-CN')
      return transformersMenus(this.backendRouteList)
    }
  },
  actions: {
    setToken(info: string | null = null) {
      this.token = info
    },
    setUserInfo(info?: UserInfo) {
      this.userInfo = info || ({} as UserInfo)
    },
    async login(params: LoginParams) {
      try {
        const { accessToken } = await login(params)
        this.setToken(accessToken)
        await this.getUserInfoAction()
        const redirect = router.currentRoute.value.query.redirect
        router.push(redirect ? (redirect as string) : PageEnum.BASE_HOME)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const result = await getUserInfo()
      this.setUserInfo(result)
      return result
    },
    async logout() {
      if (this.getToken) {
        // await doLogout()
      }
      this.setToken()
      this.setUserInfo()
      router.push('/login')
    },
    async RedirectHome() {
      router.push(PageEnum.BASE_HOME)
    },
    /** 获取路由 */
    async getRoutesAction() {
      let data = await getMenuList()
      data = [
        {
          id: 1,
          name: 'Dashboard',
          path: '/dashboard',
          redirect: '',
          meta: {
            title: '首页',
            icon: 'i-ant-design:appstore-outlined',
            sort: 1,
            hidden: false,
            parentId: 0,
            status: 1
          },
          children: [
            {
              id: 1112,
              name: 'WorkTable',
              path: '/dashboard/workTable',
              redirect: '',
              meta: {
                title: '个人工作台',
                icon: 'i-ant-design:laptop-outlined',
                sort: 1,
                hidden: false,
                parentId: 1,
                status: 1
              }
            }
          ]
        },
        {
          id: 3,
          name: 'System',
          path: '/system',
          redirect: '/system/user',
          meta: {
            title: '系统设置',
            icon: 'i-ant-design:setting-outlined',
            hidden: false,
            parentId: 0,
            status: 1,
            sort: 3
          },
          children: [
            {
              id: 7,
              name: 'User',
              path: '/system/user',
              redirect: '',
              meta: {
                title: '用户管理',
                icon: 'i-ant-design:user-outlined',
                hidden: false,
                parentId: 3,
                status: 1,
                sort: 1
              }
            },
            {
              id: 8,
              name: 'Role',
              path: '/system/role',
              redirect: '',
              meta: {
                title: '角色管理',
                icon: 'i-ant-design:usergroup-add-outlined',
                hidden: false,
                parentId: 3,
                status: 1,
                sort: 2
              }
            },
            {
              id: 11,
              name: 'Menu',
              path: '/system/menu',
              redirect: '',
              meta: {
                title: '菜单管理',
                icon: 'i-ant-design:menu-outlined',
                hidden: false,
                parentId: 3,
                status: 1,
                sort: 3
              }
            },
            {
              id: 11,
              name: 'Dept',
              path: '/system/dept',
              redirect: '',
              meta: {
                title: '部门管理',
                icon: 'i-ant-design:gold-twotone',
                hidden: false,
                parentId: 3,
                status: 1,
                sort: 3
              }
            },
            {
              id: 10,
              name: 'Dict',
              path: '/system/dict',
              redirect: '',
              meta: {
                title: '字典管理',
                icon: 'i-ant-design:medicine-box-outlined',
                hidden: false,
                parentId: 3,
                status: 1,
                sort: 3
              }
            },
            {
              id: 10,
              name: 'Notice',
              path: '/system/notice',
              redirect: '',
              meta: {
                title: '通知公告',
                icon: 'i-ant-design:message-outlined',
                hidden: false,
                parentId: 3,
                status: 1,
                sort: 3
              }
            },
            {
              id: 120,
              name: 'Setting',
              path: '/system/setting',
              redirect: '',
              meta: {
                title: '个人中心',
                icon: 'i-ant-design:radius-setting-outlined',
                hidden: false,
                parentId: 3,
                status: 1,
                sort: 3
              }
            }
          ]
        },
        {
          id: 66,
          name: 'Monitor',
          path: '/monitor',
          redirect: '',
          meta: {
            title: '系统监控',
            icon: 'i-ant-design:android-filled',
            hidden: false,
            parentId: 0,
            status: 1,
            sort: 2
          },
          children: [
            {
              id: 14,
              name: 'Online',
              path: '/monitor/online',
              redirect: '',
              meta: {
                title: '在线用户',
                icon: 'i-ant-design:aim-outlined',
                hidden: false,
                parentId: 2,
                status: 1,
                sort: 1
              }
            },
            {
              id: 15,
              name: 'Server',
              path: '/monitor/server',
              redirect: '',
              meta: {
                title: '服务监控',
                icon: 'i-ant-design:cloud-outlined',
                hidden: false,
                parentId: 2,
                status: 1,
                sort: 2
              }
            },
            {
              id: 16,
              name: 'Log',
              path: '/monitor/log',
              redirect: '',
              meta: {
                title: '日志监控',
                icon: 'i-ant-design:cloud-server-outlined',
                hidden: false,
                parentId: 2,
                status: 1,
                sort: 3
              }
            }
          ]
        }
      ]
      const routes = router.getRoutes()

      // 把路由同步到 router 中
      flatMapDeep(data, (route) => [route, route.children] as RouteRecordRaw[]).forEach((route) => {
        routes.forEach((item) => {
          if (route.path === item.path) {
            item.meta = { ...item.meta, ...route.meta }
          }
        })
      })
      // const route = useRoute()
      // const tabStore = useMultipleTabStore()
      // console.log('route', route)
      // tabStore.iniTabStore(route)

      this.setBackendRouteList(data)
      this.isDynamicAddedRoute = true
      return data
    },
    /** 设置路由 */
    setBackendRouteList(list: RouteRecordRaw[]) {
      this.backendRouteList = list
    },
    /** 设置缓存路由 */
    setCacheRoutes(list: string[]) {
      this.cacheRoutes = list
    },
    /** 设置菜单 */
    setMenus(list: any[]) {
      this.menus = list
    }
  }
})
