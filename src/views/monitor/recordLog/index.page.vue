<script setup lang="ts">
import { getRecordLogList } from '@/api/monitor/recordLog'
import type { RecordLogInofo, SearchParams } from '@/api/monitor/recordLog.type'
import type { DataTableColumns } from 'naive-ui/es/data-table'
const formValue = ref({
  account: '',
  action: '',
  module: '',
  createTime: null
})
const tableData = ref<RecordLogInofo[]>([])
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    pagination.value.page = page
    getLists()
  }
})
const columns: DataTableColumns<RecordLogInofo> = [
  { title: '账号', key: 'account', align: 'center' },
  { title: '操作', key: 'action', align: 'center' },
  { title: '操作模块', key: 'module', align: 'center' },
  { title: '操作信息', key: 'message', align: 'center' },
  { title: '操作详情', key: 'detail', align: 'center' },
  { title: '操作时间', key: 'createdAt', width: 200, align: 'center' }
]

const getLists = async () => {
  const params: SearchParams = {
    account: formValue.value.account || null,
    action: formValue.value.action || null,
    module: formValue.value.module || null,
    beginTime: formValue.value.createTime?.[0] || null,
    endTime: formValue.value.createTime?.[1] || null,
    ...pagination.value
  }
  const result = await getRecordLogList(params)
  // console.log(result)
  tableData.value = result.data
  pagination.value = { ...pagination.value, itemCount: result.total }
}
const handleReset = () => {
  formValue.value = {
    account: '',
    action: '',
    module: '',
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
          <n-form-item-gi :span="8" label="账号">
            <n-input v-model:value="formValue.account" placeholder="请输入账号" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="操作">
            <n-input v-model:value="formValue.action" placeholder="请输入操作" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="操作模块">
            <n-input v-model:value="formValue.module" placeholder="请输入操作模块" />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="操作时间">
            <n-date-picker v-model:value="formValue.createTime" type="daterange" class="w-full" />
          </n-form-item-gi>
          <n-form-item-gi :span="8">
            <NFlex justify="end" class="w-full">
              <NButton type="primary" @click="getLists"> 查询 </NButton>
              <NButton attr-type="button" @click="handleReset"> 重置 </NButton>
            </NFlex>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
    <n-card size="medium" hoverable title="操作日志监控" class="flex-1">
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
