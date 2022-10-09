<template>
  <div class="ng-multiple-header">
    <a-tabs
      type="editable-card"
      size="small"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKey"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.path">
        <a-tab-pane :tab="item.meta.title" :closable="!item.meta?.affix" />
      </template>
      <template #rightExtra>
        <div class="redo" @click="handleRedo">
          <RedoOutlined :spin="loading" />
        </div>
        <Dropdown
          :dropMenuList="getDropMenuList"
          placement="bottom"
          :trigger="['click']"
          overlayClassName="multiple-tabs__dropdown"
          @menu-event="handleMenuEvent"
        >
          <span @click="handleContext">
            <Icon icon="ion:chevron-down" />
          </span>
        </Dropdown>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router';

  import { useRouter } from 'vue-router';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { useUserStore } from '/@/store/modules/user';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { initAffixTabs, useTabsDrag } from './useMultipleTabs';
  import { listenerRouteChange } from '/@/logics/mitt/routeChange';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useTabDropdown } from './useTabDropdown';
  import { TabContentProps } from './types';

  const activeKey = ref('');
  const loading = ref(false);
  const go = useGo();
  const { refreshPage } = useTabs();
  const router = useRouter();
  const userStore = useUserStore();
  const tabStore = useMultipleTabStore();
  const affixTextList = initAffixTabs();
  useTabsDrag(affixTextList);
  const getIsTabs = computed(() => !true);

  const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
    router.currentRoute as unknown as TabContentProps,
    getIsTabs,
  );

  const handleRedo = async () => {
    loading.value = true;
    await refreshPage();
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  };

  const getTabsState = computed(() => {
    return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
  });

  /** 监听路由切换 */
  listenerRouteChange((route) => {
    const { name } = route;
    /** 如果是 重置跳转 | 没有路由 | 没有token 则不做处理 */
    if (name === REDIRECT_NAME || !route || !userStore.getToken) {
      return;
    }
    const { path, fullPath, meta = {} } = route;
    const { currentActiveMenu, hideTab } = meta as RouteMeta;
    const isHide = !hideTab ? null : currentActiveMenu;
    const p = isHide || fullPath || path;
    if (activeKey.value !== p) {
      activeKey.value = p as string;
    }

    if (isHide) {
      const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu);
      findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
    } else {
      tabStore.addTab(unref(route));
    }
  });

  const handleChange = (key: any) => {
    activeKey.value = key;
    go(key, false);
  };
  const handleEdit = (key: string) => {
    tabStore.closeTabByKey(key, router);
  };
  const handleContext = (e) => {
    router.currentRoute && handleContextMenu(unref(router.currentRoute))(e);
  };
</script>

<style lang="less" scoped>
  .ng-multiple-header {
    // @apply;
    ::v-deep(.ant-tabs) {
      .ant-tabs-nav {
        height: 32px;
      }

      .ant-tabs-nav-list {
        align-items: center;

        .ant-tabs-tab {
          height: 28px;
          padding: 0 12px;
          font-size: 12px;
          margin-left: 8px;

          .ant-tabs-tab-remove {
            margin-left: 0;
            line-height: 0.8;

            svg {
              fill: #fff;
            }
          }
        }

        .ant-tabs-tab:not(.ant-tabs-tab-active):hover {
          .ant-tabs-tab-remove {
            svg {
              fill: #666;
            }
          }
        }

        .ant-tabs-tab-active {
          background-color: #0960bd;

          .ant-tabs-tab-btn {
            color: #fff;
          }
        }
      }

      .ant-tabs-extra-content {
        display: flex;

        .redo,
        .ant-dropdown-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 30px;
          cursor: pointer;
          border-left: 1px solid #f0f0f0;

          svg {
            fill: #999;
          }
        }

        .redo:hover {
          svg {
            fill: #555;
          }
        }
      }
    }
  }
</style>
