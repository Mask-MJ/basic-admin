<template>
  <a-sub-menu :item="props.item">
    <template #icon>{{ item.icon }} </template>
    <template #title>{{ item.name }} </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <!-- <a-menu-item>{{ childrenItem.name }}</a-menu-item> -->
      <MenuItem :item="childrenItem" />
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts" name="BasicMenuItem">
  import type { PropType } from 'vue';
  import type { Menu } from '/@/router/types';

  const props = defineProps({
    item: {
      type: Object as PropType<Menu>,
      default: () => {},
    },
  });
</script>
