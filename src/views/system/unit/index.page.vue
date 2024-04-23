<script setup lang="ts">
import { deleteUnit, getUnitList } from '@/api/system/unit'
import type { UnitInfo } from '@/api/system/unit.type'
import { NButton, NFlex, NPopconfirm, NPopover, type DataTableColumns } from 'naive-ui'
import EditModal from './EditModal.vue'

const formValue = ref({ name: '', value: '' })
const tableData = ref<UnitInfo[]>([])
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
const rowData = ref<UnitInfo>()
const columns: DataTableColumns<UnitInfo> = [
  { title: '单位名称', key: 'name', align: 'center' },
  { title: '单位值', key: 'value', align: 'center' },
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
                default: () => '删除',
                trigger: () =>
                  h(
                    NPopconfirm,
                    {
                      onPositiveClick: async () => {
                        // console.log(row)
                        await deleteUnit(row.id)
                        getLists()
                      }
                    },
                    {
                      default: () => '确认删除该单位吗？',
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
  const params = {
    page: pagination.value.page,
    pageSize: pagination.value.pageSize,
    name: formValue.value.name,
    value: formValue.value.value
  }
  const result = await getUnitList(params)
  // console.log(result)
  tableData.value = result.data
  pagination.value.itemCount = result.total
}
const handleReset = () => {
  formValue.value = { name: '', value: '' }
  getLists()
}
const addUnit = () => {
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
          <n-form-item-gi :span="8" label="单位名称">
            <n-input v-model:value="formValue.name" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="单位值">
            <n-input v-model:value="formValue.value" />
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
    <n-card title="单位管理" class="flex-1" size="medium" hoverable>
      <template #header-extra>
        <NButton type="primary" @click="addUnit"> 新增单位 </NButton>
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
