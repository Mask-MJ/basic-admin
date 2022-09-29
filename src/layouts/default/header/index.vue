<template>
  <a-layout-header class="!p-0 !bg-gray-50 !h-20">
    <div class="flex h-12 leading-none items-center border-b-1 overflow-hidden">
      <span class="px-2 cursor-pointer hover:bg-gray-200">
        <Icon class="!text-xl" :icon="icon" @click="toggleCollapsed" />
      </span>
      <LayoutBreadcrumb />
    </div>
    <div class="h-8"></div>
  </a-layout-header>
</template>

<script setup lang="ts">
  import type { MenuSetting } from '/#/config';
  import { useAppStore } from '/@/store/modules/app';
  import LayoutBreadcrumb from './Breadcrumb.vue';

  const appStore = useAppStore();
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

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

<style scoped></style>
