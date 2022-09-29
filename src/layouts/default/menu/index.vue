<template>
  <a-menu
    v-model:selectedKeys="menuState.selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    :open-keys="menuState.openKeys"
    @click="change"
    @open-change="onOpenChange"
  >
    <template v-for="item in menus" :key="item.path">
      <MenuItem v-if="item.children?.length" :item="item" />
      <a-menu-item v-else :key="item.path">
        <template #icon> <Icon :icon="item.icon" /> </template>
        {{ item.name }}
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
  import type { MenuState } from './types';
  import { usePermissionStore } from '/@/store/modules/permission';
  import MenuItem from './MenuItem.vue';

  const permissionStore = usePermissionStore();
  const collapsed = ref<boolean>(false);
  const menuState = reactive<MenuState>({
    openKeys: [],
    selectedKeys: [],
    rootSubmenuKeys: [],
    collapsedOpenKeys: [],
  });
  // 获取导航栏列表
  const menus = computed(() => {
    permissionStore.getBackMenuList.forEach((ele) => {
      menuState.rootSubmenuKeys.push(ele.path);
    });
    return permissionStore.getBackMenuList;
  });

  const change = (e) => {
    console.log(e);
  };

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find((key) => menuState.openKeys.indexOf(key) === -1);
    if (menuState.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      menuState.openKeys = openKeys;
    } else {
      menuState.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  };
</script>

<style scoped></style>
