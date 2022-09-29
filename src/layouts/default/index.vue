<template>
  <a-layout class="h-screen">
    <LayoutSideBar />
    <a-layout>
      <LayoutHeader />
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import LayoutSideBar from './sider/index.vue';
  import LayoutHeader from './header/index.vue';
</script>
