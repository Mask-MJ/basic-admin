<template>
  <div class="ng-layout-content h-full" v-loading="getOpenPageLoading && getPageLoading">
    <RouterView>
      <template #default="{ Component, route }">
        <transition name="fade-slide" mode="out-in" appear>
          <keep-alive :include="getCaches">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </template>
    </RouterView>
  </div>
</template>
<script setup lang="ts" name="LayoutContent">
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useContentViewHeight } from './useContentViewHeight';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  useContentViewHeight();

  const tabStore = useMultipleTabStore();
  const { getOpenPageLoading } = useTransitionSetting();
  const getCaches = computed((): string[] => tabStore.getCachedTabList);
  const { getPageLoading } = useRootSetting();
</script>

<style lang="less" scoped>
  .ng-layout-content {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }

    &-loading {
      position: absolute;
      top: 200px;
      z-index: 10000;
    }
  }
</style>
