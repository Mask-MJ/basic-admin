<script setup lang="ts">
import type { UserInfo } from '@/api/system/user.type'
import { deleteUser } from '@/api/system/user'

const emits = defineEmits(['showEditModal'])
defineProps({
  row: { type: Object as PropType<UserInfo>, required: true },
  showModal: { type: Boolean, required: true }
})
const edit = () => {
  emits('showEditModal', true, 'edit')
}
</script>

<template>
  <n-flex justify="center">
    <n-popover>
      编辑
      <template #trigger>
        <n-button size="small" type="primary" @click="edit">
          <i class="i-ant-design:edit-outlined"></i>
        </n-button>
      </template>
    </n-popover>
    <n-popover>
      修改密码
      <template #trigger>
        <n-button size="small" type="primary">
          <i class="i-ant-design:lock-outlined"></i>
        </n-button>
      </template>
    </n-popover>
    <n-popover>
      删除
      <template #trigger>
        <n-popconfirm @positive-click="deleteUser(row.id)">
          确认删除该用户吗？
          <template #trigger>
            <n-button size="small" type="error">
              <i class="i-ant-design:delete-outlined"></i>
            </n-button>
          </template>
        </n-popconfirm>
      </template>
    </n-popover>
  </n-flex>
</template>
