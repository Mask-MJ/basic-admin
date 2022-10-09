<template>
  <a-layout-header class="!p-0 !bg-gray-50 !h-80px">
    <div class="flex-box justify-between h-12 border-b-1">
      <div class="flex-box h-full">
        <div class="flex-box px-2 mr-2 h-full cursor-pointer hover:bg-gray-200">
          <Icon class="!text-xl" :icon="icon" @click="toggleCollapsed" />
        </div>
        <LayoutBreadcrumb />
      </div>
      <ul class="flex-box cursor-pointer mb-0">
        <li class="px-3"><Notify /></li>
        <li class="px-3"><FullScreen /></li>
        <li><UserDropDown /></li>
      </ul>
    </div>
    <LayoutMultipleHeader />
  </a-layout-header>
</template>

<script setup lang="ts">
  import type { MenuSetting } from '/#/config';
  import { useAppStore } from '/@/store/modules/app';
  import { FullScreen, Notify, LayoutBreadcrumb, UserDropDown } from './components';
  import LayoutMultipleHeader from '../MultipleHeader/index.vue';
  import { useLayoutHeight } from '../content/useContentViewHeight';

  const appStore = useAppStore();
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
  const { setHeaderHeight } = useLayoutHeight();
  // 设置高度给内容区计算高度
  setHeaderHeight(80);
  const icon = computed(() =>
    appStore.getMenuSetting.collapsed
      ? 'ant-design:menu-unfold-outlined'
      : 'ant-design:menu-fold-outlined',
  );

  const setMenuSetting = (menuSetting: Partial<MenuSetting>) =>
    appStore.setProjectConfig({ menuSetting });

  const toggleCollapsed = () => {
    setMenuSetting({ collapsed: !unref(getCollapsed) });
  };
</script>

<style scoped>
  .flex-box {
    @apply flex items-center;

    li {
      @apply flex items-center h-12  leading-none cursor-pointer hover:bg-gray-200;
    }
  }
</style>
