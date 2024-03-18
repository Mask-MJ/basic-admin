<script setup lang="ts">
import { getLoginLogList } from '@/api/monitor/loginLog'
import type { SearchParams, LoginLogInofo } from '@/api/monitor/loginLog.type'
import { NButton, type DataTableColumns } from 'naive-ui'

const formValue = ref({
  account: '',
  address: '',
  userAgent: '',
  createTime: null
})
const tableData = ref<LoginLogInofo[]>([])
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    pagination.value.page = page
    getLists()
  }
})

const columns: DataTableColumns<LoginLogInofo> = [
  { title: '账号', key: 'account', align: 'center' },
  { title: '登陆地址', key: 'address', align: 'center' },
  { title: 'IP', key: 'ip', align: 'center' },
  { title: '用户操作', key: 'userAgent', align: 'center' },
  { title: '登陆时间', key: 'createdAt', width: 200, align: 'center' }
]

const getLists = async () => {
  const params: SearchParams = {
    account: formValue.value.account || null,
    address: formValue.value.address || null,
    beginTime: formValue.value.createTime?.[0] || null,
    endTime: formValue.value.createTime?.[1] || null,
    page: pagination.value.page,
    pageSize: pagination.value.pageSize
  }
  const result = await getLoginLogList(params)
  // console.log(result)
  tableData.value = result.data
  pagination.value.itemCount = result.total
}
const handleReset = () => {
  formValue.value = {
    account: '',
    address: '',
    userAgent: '',
    createTime: null
  }
  getLists()
}

onMounted(() => {
  getLists()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <n-card class="mb-4" size="medium" hoverable>
      <n-form ref="formRef" inline :label-width="80" :model="formValue" label-placement="left">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="6" label="账号">
            <n-input v-model:value="formValue.account" placeholder="请输入账号" />
          </n-form-item-gi>
          <n-form-item-gi :span="6" label="登陆地址">
            <n-input v-model:value="formValue.address" placeholder="请输入登陆地址" />
          </n-form-item-gi>
          <!-- <n-form-item-gi :span="8" label="用户操作">
            <n-input v-model:value="formValue.userAgent" placeholder="请输入用户操作" />
          </n-form-item-gi> -->
          <n-form-item-gi :span="12" label="登陆时间">
            <n-date-picker v-model:value="formValue.createTime" type="daterange" class="w-full" />
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

    <n-card size="medium" hoverable title="登陆日志监控" class="flex-1">
      <n-data-table
        class="h-full"
        :single-line="false"
        flex-height
        size="small"
        :columns="columns"
        :data="tableData"
        :remote="true"
        :pagination="pagination"
      />
    </n-card>
  </div>
</template>

<style lang="" scoped></style>
