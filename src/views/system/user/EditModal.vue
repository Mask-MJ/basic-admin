<script setup lang="ts">
import type { UserInfo } from '@/api/system/user.type'

defineProps({
  row: { type: Object as PropType<UserInfo> },
  typeModal: { type: String, default: 'add' }
})
const showModal = defineModel({ required: true, type: Boolean })
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :title="typeModal === 'add' ? '新增用户' : '编辑用户'"
  >
    111
  </n-modal>
</template>

<style lang="" scoped></style>
