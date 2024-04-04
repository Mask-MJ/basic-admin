<script setup lang="ts">
import type { SearchParams, FactoryInfo } from '@/api/project/factory.type'
import { NButton, NFlex, NPopconfirm, NPopover, NTag, type DataTableColumns } from 'naive-ui'
import { getFactoryList, deleteFactory } from '@/api/project/factory'
import EditModal from './EditModal.vue'

const formValue = ref({ name: '', status: null })
const tableData = ref<FactoryInfo[]>([])
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    pagination.value.page = page
    getLists()
  }
})
const showEditModal = ref(false)
const rowData = ref<FactoryInfo>()

const columns: DataTableColumns<FactoryInfo> = [
  { title: '工厂名称', key: 'name', align: 'center' },
  { title: '工厂地址', key: 'address', align: 'center' },
  {
    title: '状态',
    key: 'status',
    width: 100,
    align: 'center',
    render(row) {
      return h(
        NTag,
        { type: row.status === 1 ? 'success' : 'error' },
        { default: () => (row.status === 1 ? '启用' : '禁用') }
      )
    }
  },
  { title: '创建时间', key: 'createdAt', width: 200, align: 'center' },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    width: 150,
    render(row) {
      return h(
        NFlex,
        { justify: 'center' },
        {
          default: () => [
            h(
              NPopover,
              { trigger: 'hover' },
              {
                default: () => '编辑',
                trigger: () =>
                  h(
                    NButton,
                    {
                      size: 'small',
                      type: 'primary',
                      onClick: () => {
                        showEditModal.value = true
                        rowData.value = row
                      }
                    },
                    { default: () => h('i', { class: 'i-ant-design:edit-outlined' }) }
                  )
              }
            ),
            h(
              NPopover,
              { trigger: 'hover' },
              {
                default: () => '删除',
                trigger: () =>
                  h(
                    NPopconfirm,
                    {
                      onPositiveClick: async () => {
                        await deleteFactory(row.id)
                        getLists()
                      }
                    },
                    {
                      default: () => '确认删除该数据吗？',
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
          ]
        }
      )
    }
  }
]

const add = () => {
  showEditModal.value = true
  rowData.value = undefined
}
const getLists = async () => {
  const params: SearchParams = {
    name: formValue.value.name || null,
    status: formValue.value.status,
    page: pagination.value.page,
    pageSize: pagination.value.pageSize
  }
  const result = await getFactoryList(params)
  tableData.value = result.data
  pagination.value.itemCount = result.total
}

const handleReset = async () => {
  formValue.value = { name: '', status: null }
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
          <n-form-item-gi :span="8" label="工厂名称">
            <n-input v-model:value="formValue.name" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="状态">
            <n-select
              v-model:value="formValue.status"
              placeholder="Select"
              :options="[
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 }
              ]"
            />
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
    <n-card title="工厂管理" class="flex-1" size="medium" hoverable>
      <template #header-extra>
        <NButton type="primary" @click="add"> 新增工厂 </NButton>
      </template>
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
    <EditModal v-model="showEditModal" :rowData="rowData" @reload="handleReset" />
  </div>
</template>
