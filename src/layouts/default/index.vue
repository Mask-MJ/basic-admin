<template>
  <a-layout class="h-screen">
    <LayoutSideBar />
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import LayoutSideBar from './sider/index.vue';
</script>

<style scoped></style>
