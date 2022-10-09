<template>
  <div :style="getHiddenDomStyle"></div>
  <a-layout-sider
    :width="210"
    :collapsedWidth="64"
    class="layout-side-bar"
    v-model:collapsed="getCollapsed"
    :trigger="null"
    collapsible
  >
    <AppLogo :collapsed="getCollapsed" />
    <LayoutMenu />
  </a-layout-sider>
</template>

<script setup lang="ts">
  import type { CSSProperties } from 'vue';
  import { useAppStore } from '/@/store/modules/app';
  import LayoutMenu from '../menu/index.vue';
  import AppLogo from './AppLogo.vue';

  const appStore = useAppStore();
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
  const getHiddenDomStyle = computed((): CSSProperties => {
    const width = `${unref(getCollapsed.value ? 64 : 210)}px`;
    return {
      width: width,
      overflow: 'hidden',
      flex: `0 0 ${width}`,
      maxWidth: width,
      minWidth: width,
      transition: 'all 0.2s',
    };
  });
</script>

<style scoped>
  .layout-side-bar {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
  }

  .layout-side-bar::-webkit-scrollbar {
    display: none;
  }
</style>
