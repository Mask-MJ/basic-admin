<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition mode="out-in" appear>
        <keep-alive :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </RouterView>
  <!-- <FrameLayout v-if="getCanEmbedIFramePage" /> -->
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  // import FrameLayout from '/@/layouts/iframe/index.vue';

  // import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  // import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
  import { getTransitionName } from './transition';

  import { useMultipleTabStore } from '/@/store/modules/multipleTab';

  export default defineComponent({
    name: 'PageLayout',
    // components: { FrameLayout },
    setup() {
      // const { getShowMultipleTab } = useMultipleTabSetting();
      const tabStore = useMultipleTabStore();

      // const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting();

      const { getBasicTransition, getEnableTransition } = useTransitionSetting();

      const openCache = computed(() => false);

      const getCaches = computed((): string[] => {
        // if (!unref(getOpenKeepAlive)) {
        //   return [];
        // }
        return tabStore.getCachedTabList;
      });

      return {
        getTransitionName,
        openCache,
        getEnableTransition,
        getBasicTransition,
        getCaches,
        // getCanEmbedIFramePage,
      };
    },
  });
</script>
