<template>
  <a-layout-sider width="210" class="layout-side-bar">
    <AppLogo />
    <LayoutMenu />
  </a-layout-sider>
</template>

<script setup lang="ts">
  import LayoutMenu from '../menu/index.vue';
  import AppLogo from './AppLogo.vue';
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
