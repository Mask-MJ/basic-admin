<template>
  <Tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="toggle">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </Tooltip>
</template>
<script setup lang="ts" name="FullScreen">
  import { computed, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { useFullscreen } from '@vueuse/core';

  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';

  const { toggle, isFullscreen } = useFullscreen();
  const getTitle = computed(() => (unref(isFullscreen) ? '退出全屏' : '全屏'));
</script>
