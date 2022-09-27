<template>
  <a-menu
    v-model:openKeys="menuState.openKeys"
    v-model:selectedKeys="menuState.selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    :subMenuOpenDelay="0.2"
    @click="change"
  >
    <template v-for="item in list" :key="item.path">
      <MenuItem :item="item" />
    </template>
  </a-menu>
</template>

<script setup lang="ts">
  import type { MenuState } from './types';
  import MenuItem from './MenuItem.vue';
  const collapsed = ref<boolean>(false);
  const menuState = reactive<MenuState>({
    openKeys: [],
    selectedKeys: [],
    defaultSelectedKeys: [],
    collapsedOpenKeys: [],
  });
  const list = computed(() => {
    return [
      {
        path: '1',
        name: 'Option 1',
      },
      {
        path: '2',
        name: 'Navigation 2',
        children: [
          {
            path: '2.1',
            name: 'Navigation 3',
            children: [{ path: '2.1.1', name: 'Option 2.1.1' }],
          },
        ],
      },
    ];
  });
  const change = (e) => {
    console.log(e);
  };
</script>

<style scoped></style>
