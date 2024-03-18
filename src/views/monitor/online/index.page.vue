<script setup lang="ts">
import { deleteOnlineUser, getOnlineUser } from '@/api/monitor/online'
import type { SearchParams, onlineUserInfo } from '@/api/monitor/online.type'
import { NButton, NPopconfirm, NPopover, type DataTableColumns } from 'naive-ui'

const formValue = ref({
  account: '',
  nickname: '',
  phoneNumber: ''
})

const tableData = ref<onlineUserInfo[]>([])
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    pagination.value.page = page
    getLists()
  }
})

const columns: DataTableColumns<onlineUserInfo> = [
  { title: '账号', key: 'account', align: 'center' },
  { title: '用户名', key: 'nickname', align: 'center' },
  { title: '邮箱', key: 'email', align: 'center' },
  { title: '手机号', key: 'phoneNumber', align: 'center' },
  { title: '状态', key: 'status', width: 200, align: 'center' },
  { title: '创建时间', key: 'createdAt', width: 200, align: 'center' },
  { title: '更新时间', key: 'updatedAt', width: 200, align: 'center' },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    width: 200,
    render(row) {
      return h(
        NPopover,
        { trigger: 'hover' },
        {
          default: () => '删除',
          trigger: () =>
            h(
              NPopconfirm,
              {
                onPositiveClick: async () => {
                  await deleteOnlineUser(row.id)
                  getLists()
                }
              },
              {
                default: () => '确认删除该用户吗？',
                trigger: () =>
                  h(
                    NButton,
                    { size: 'small', type: 'error' },
                    { default: () => h('i', { class: 'i-ant-design:delete-outlined' }) }
                  )
              }
            )
        }
      )
    }
  }
]

const getLists = async () => {
  const params: SearchParams = {
    account: formValue.value.account || null,
    nickname: formValue.value.nickname || null,
    phoneNumber: formValue.value.phoneNumber || null,
    page: pagination.value.page,
    pageSize: pagination.value.pageSize
  }
  const result = await getOnlineUser(params)
  // console.log(result)
  tableData.value = result.data
  pagination.value.itemCount = result.total
}
const handleReset = async () => {
  formValue.value = {
    account: '',
    nickname: '',
    phoneNumber: ''
  }
  getLists()
}

onMounted(async () => {
  getLists()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <n-card class="mb-4" size="medium" hoverable>
      <n-form ref="formRef" inline :label-width="80" :model="formValue" label-placement="left">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="账号">
            <n-input v-model:value="formValue.account" placeholder="请输入账号" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="用户名">
            <n-input v-model:value="formValue.nickname" placeholder="请输入用户名" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="手机号">
            <n-input v-model:value="formValue.phoneNumber" placeholder="请输入用户手机号" />
          </n-form-item-gi>
          <n-form-item-gi :span="24">
            <NFlex justify="end" class="w-full">
              <NButton type="primary" @click="getLists"> 查询 </NButton>
              <NButton attr-type="button" @click="handleReset"> 重置 </NButton>
            </NFlex>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
    <n-card size="medium" hoverable title="在线用户" class="flex-1">
      <template #header-extra>
        <NButton type="error">强退用户 </NButton>
      </template>
      <n-data-table
        class="h-full"
        :single-line="false"
        :remote="true"
        flex-height
        size="small"
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
      />
    </n-card>
  </div>
</template>

<style lang="" scoped></style>
@/api/monitor/online@/api/monitor/online.type
