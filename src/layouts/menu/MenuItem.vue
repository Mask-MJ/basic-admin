<template>
  <a-sub-menu :key="item.path">
    <template #icon> <Icon :icon="item.icon" /> </template>
    <template #title>{{ item.name }} </template>
    <template v-for="childrenItem in item.children" :key="childrenItem.path">
      <MenuItem v-if="childrenItem?.children" :item="childrenItem" />
      <a-menu-item v-else :key="childrenItem.path">
        <template #icon> <Icon :icon="childrenItem.icon" /> </template>
        {{ childrenItem.name }}
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts" name="BasicMenuItem">
  import type { PropType } from 'vue';
  import type { Menu } from '/@/router/types';

  defineProps({
    item: {
      type: Object as PropType<Menu>,
      default: () => {},
    },
  });
</script>
