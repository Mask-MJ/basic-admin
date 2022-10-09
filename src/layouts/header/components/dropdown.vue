<template>
  <a-dropdown
    class="h-12 items-center px-3"
    placement="bottomLeft"
    overlayClassName="dropdown-overlay"
  >
    <span class="flex">
      <img :src="getUserInfo.avatar" />
      <span class="hidden md:block">
        <span class="truncate">
          {{ getUserInfo.userName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="lock">
          <span class="flex items-center">
            <Icon icon="ion:lock-closed-outline" class="mr-1" />
            <span>锁定屏幕</span>
          </span>
        </a-menu-item>
        <a-menu-item key="logout">
          <span class="flex items-center">
            <Icon icon="ion:power-outline" class="mr-1" />
            <span>退出系统</span>
          </span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <!-- <LockAction @register="register" /> -->
</template>

<script setup lang="ts">
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
  const getUserInfo = computed(() => {
    const userInfo = userStore.getUserInfo || {};
    return { userName: userInfo.userName, avatar: userInfo.avatar };
  });
  const handleMenuClick = () => {};
</script>

<style lang="less">
  .dropdown-overlay {
    .ant-dropdown-menu-item {
      min-width: 120px;
    }
  }
</style>
