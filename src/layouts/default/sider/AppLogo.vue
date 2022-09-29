<template>
  <div class="ng-anticon" @click="goHome">
    <img class="w-8 h-8 ml-1" src="../../../assets/images/logo.png" />
    <div v-if="!props.collapsed" class="ml-2 truncate md:opacity-100"> NGEVmate </div>
  </div>
</template>

<script setup lang="ts">
  const goHome = () => {};
  const props = defineProps({
    collapsed: { type: Boolean, default: false },
  });
</script>

<style lang="less" scoped>
  .ng-anticon {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 48px;
    padding: 10px 4px 10px 10px;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
  }
</style>
