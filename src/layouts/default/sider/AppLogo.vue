<template>
  <div class="anticon" @click="goHome">
    <img class="w-8 h-8" src="../../../assets/images/logo.png" />
    <div class="ml-2 truncate md:opacity-100"> NGEVmate </div>
  </div>
</template>

<script setup lang="ts">
  const goHome = () => {};
</script>

<style lang="less" scoped>
  .anticon {
    // display: flex;
    // align-items: center;
    // padding-left: 7px;
    // cursor: pointer;
    // transition: all 0.2s ease;
    // height: 48px;
    // padding: 10px 4px 10px 10px;
    // color: #fff;
    // font-weight: 700;
    // font-size: 16px;
  }
</style>
