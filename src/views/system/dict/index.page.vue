<script setup lang="ts">
import { deleteDict, getDictList } from '@/api/system/dict'
import type { DictInfo, SearchParams } from '@/api/system/dict.type'
import { NButton, NFlex, NPopconfirm, NPopover } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui/es/data-table'
import EditModal from './EditModal.vue'
import { router } from '@/router'

const formValue = ref({ name: '', status: null, value: '' })
const tableData = ref<DictInfo[]>([])
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
const rowData = ref<DictInfo>()
const columns: DataTableColumns<DictInfo> = [
  { title: '字典名称', key: 'name', align: 'center' },
  { title: '字典值', key: 'value', align: 'center' },
  // { title: '字典状态', key: 'status', align: 'center' },
  { title: '备注', key: 'remark', align: 'center' },
  { title: '创建时间', key: 'createdAt', width: 200, align: 'center' },
  { title: '更新时间', key: 'updatedAt', width: 200, align: 'center' },
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
                        // console.log(row)
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
                default: () => '列表',
                trigger: () =>
                  h(
                    NButton,
                    {
                      size: 'small',
                      type: 'warning',
                      onClick: () => {
                        router.push(`/system/dictData/${row.id}`)
                      }
                    },
                    { default: () => h('i', { class: 'i-ant-design:unordered-list-outlined' }) }
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
                        await deleteDict(row.id)
                        getLists()
                      }
                    },
                    {
                      default: () => '确认删除该字典吗？',
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

const getLists = async () => {
  const params: SearchParams = {
    name: formValue.value.name || null,
    value: formValue.value.value || null,
    status: formValue.value.status,
    page: pagination.value.page,
    pageSize: pagination.value.pageSize
  }
  const result = await getDictList(params)
  // console.log(result)
  tableData.value = result.data
  pagination.value.itemCount = result.total
}
const handleReset = () => {
  formValue.value = { name: '', status: null, value: '' }
  getLists()
}
const addDict = () => {
  showEditModal.value = true
  rowData.value = undefined
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
          <n-form-item-gi :span="8" label="字典名称">
            <n-input v-model:value="formValue.name" />
          </n-form-item-gi>

          <n-form-item-gi :span="8" label="字典值">
            <n-input v-model:value="formValue.value" />
          </n-form-item-gi>
          <!-- <n-form-item-gi :span="8" label="状态">
            <n-select
              v-model:value="formValue.status"
              placeholder="Select"
              :options="[
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 }
              ]"
            />
          </n-form-item-gi> -->
          <n-form-item-gi :span="8">
            <NFlex justify="end" class="w-full">
              <NButton type="primary" @click="getLists"> 查询 </NButton>
              <NButton attr-type="button" @click="handleReset"> 重置 </NButton>
            </NFlex>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
    <n-card title="字典管理" class="flex-1" size="medium" hoverable>
      <template #header-extra>
        <NButton type="primary" @click="addDict"> 新增字典 </NButton>
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

<style lang="" scoped></style>
