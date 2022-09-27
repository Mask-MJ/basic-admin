<template>
  <a-layout-sider>
    <!-- <AppLogo :class="unref(getLogoClass)" /> -->
    <LayoutMenu />
  </a-layout-sider>
</template>

<script setup lang="ts">
  import LayoutMenu from '../menu/index.vue';
</script>

<style scoped></style>
