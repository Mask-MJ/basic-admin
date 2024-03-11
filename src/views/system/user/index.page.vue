<script setup lang="ts">
import type { UserInfo } from '@/api/system/user.type'
import type { DataTableColumns } from 'naive-ui'
import { getUsersList } from '@/api/system/user'
import { pickBy } from 'lodash-es'
import Action from './Action.vue'
import EditModal from './EditModal.vue'

const formValue = ref({
  nickname: null,
  phoneNumber: null,
  status: null,
  createTime: null
})
const tableData = ref<UserInfo[]>([])
const pagination = ref({ page: 1, pageSize: 10 })
const columns: DataTableColumns<UserInfo> = [
  { title: '账号', key: 'account', align: 'center' },
  { title: '用户名', key: 'nickname', align: 'center' },
  { title: '状态', key: 'status', width: 200, align: 'center' },
  { title: '邮箱', key: 'email', align: 'center' },
  { title: '手机号', key: 'phoneNumber', align: 'center' },
  { title: '创建时间', key: 'createdAt', width: 200, align: 'center' },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    width: 200,
    render(row) {
      return h(Action, {
        row,
        showModal: showModal.value,
        onShowEditModal: (e, type) => {
          showModal.value = e
          typeModal.value = type
        }
      })
    }
  }
]
const showModal = ref(false)
const typeModal = ref('add')
const row = ref<UserInfo>()
const addUser = () => {
  showModal.value = true
  row.value = undefined
  typeModal.value = 'add'
}
const getData = async () => {
  // 排除空值
  const params = pickBy(formValue.value, (o) => Boolean(o))
  return getUsersList({ ...params, ...pagination.value })
}
onMounted(async () => {
  tableData.value = await getData()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <n-card class="mb-4" size="small" hoverable>
      <n-form ref="formRef" inline :label-width="80" :model="formValue" label-placement="left">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="用户名" path="user.age">
            <n-input v-model:value="formValue.nickname" placeholder="请输入用户名" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="手机号" path="datetimeValue">
            <n-input v-model:value="formValue.phoneNumber" placeholder="请输入手机号" />
          </n-form-item-gi>

          <n-form-item-gi :span="8" label="状态" path="datetimeValue">
            <n-input v-model:value="formValue.status" placeholder="请输入手机号" />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="创建时间" path="datetimeValue">
            <n-date-picker
              v-model:formatted-value="formValue.createTime"
              value-format="yyyy.MM.dd HH:mm:ss"
              type="daterange"
              class="w-full"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="8">
            <NFlex justify="end" class="w-full">
              <NButton type="primary"> 查询 </NButton>
              <NButton attr-type="button"> 重置 </NButton>
            </NFlex>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
    <n-card size="small" hoverable title="用户管理" class="flex-1">
      <template #header-extra>
        <NButton type="primary" @click="addUser"> 新增用户 </NButton>
      </template>
      <n-data-table
        class="h-full"
        :single-line="false"
        flex-height
        size="small"
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
      />
    </n-card>
    <EditModal v-model="showModal" :row="row" :typeModal="typeModal" />
  </div>
</template>

<style lang="" scoped></style>
