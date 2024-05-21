<script setup lang="ts">
import { deleteAnalysisTask, getAnalysisTaskList } from '@/api/project/analysisTask'
import type { AnalysisTaskInfo, SearchParams } from '@/api/project/analysisTask.type'
import { NButton, NFlex, NPopconfirm, NPopover, NTag, type DataTableColumns } from 'naive-ui'
import EditModal from './EditModal.vue'

const formValue = ref({ name: '' })
const tableData = ref<AnalysisTaskInfo[]>([])
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
const rowData = ref<AnalysisTaskInfo>()

const columns: DataTableColumns<AnalysisTaskInfo> = [
  { title: '任务名称', key: 'name', align: 'center' },
  { title: '所属工厂', key: 'factory.name', align: 'center' },
  { title: '所属字典数据', key: 'dict.name', align: 'center' },
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
  { title: '创建者', key: 'createBy', align: 'center' },
  { title: '更新者', key: 'updateBy', align: 'center' },
  // { title: '备注', key: 'remark', align: 'center' },
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
                        rowData.value = row
                        showEditModal.value = true
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
                        // console.log(row.id)
                        await deleteAnalysisTask(row.id)
                        getLists()
                      }
                    },
                    {
                      default: () => '确认删除吗?',
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
  const params: Partial<SearchParams> = {
    page: pagination.value.page,
    pageSize: pagination.value.pageSize,
    name: formValue.value.name
  }
  const result = await getAnalysisTaskList(params)
  // console.log(result)
  tableData.value = result.data
  pagination.value.itemCount = result.total
}
const handleReset = () => {
  formValue.value = { name: '' }
  getLists()
}
const add = () => {
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
          <n-form-item-gi :span="8" label="项目名称">
            <n-input v-model:value="formValue.name" />
          </n-form-item-gi>

          <n-form-item-gi :span="16">
            <NFlex justify="end" class="w-full">
              <NButton type="primary" @click="getLists"> 查询 </NButton>
              <NButton attr-type="button" @click="handleReset"> 重置 </NButton>
            </NFlex>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>

    <n-card title="分析任务管理" class="flex-1" size="medium" hoverable>
      <template #header-extra>
        <NButton type="primary" @click="add"> 新增分析任务 </NButton>
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
