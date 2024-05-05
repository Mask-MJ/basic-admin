<script setup lang="ts">
import { deleteContract, getContractList } from '@/api/project/contract'
import type { ContractInfo, SearchParams } from '@/api/project/contract.type'
import { NButton, NFlex, NPopconfirm, NPopover, type DataTableColumns } from 'naive-ui'
import EditModal from './EditModal.vue'

const formValue = ref({ name: '', customer: '', saler: '' })
const tableData = ref<ContractInfo[]>([])
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
const rowData = ref<ContractInfo>()

const columns: DataTableColumns<ContractInfo> = [
  { title: '项目名称', key: 'name', align: 'center' },
  { title: '所属工厂', key: 'factory.name', align: 'center' },
  { title: '客户名称', key: 'customer', align: 'center' },
  { title: '客户联系方式', key: 'customerPhone', align: 'center' },
  { title: '采购阀门总数', key: 'valveCount', align: 'center' },
  { title: '高级阀门数量', key: 'highValveCount', align: 'center' },
  { title: '签订合同时间', key: 'contractTime', width: 200, align: 'center' },
  { title: '销售人员', key: 'saler', align: 'center' },
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
                        await deleteContract(row.id)
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
  const params: SearchParams = {
    page: pagination.value.page,
    pageSize: pagination.value.pageSize,
    name: formValue.value.name,
    customer: formValue.value.customer,
    saler: formValue.value.saler
    // beginTime: formValue.value.createTime?.[0] || null,
    // endTime: formValue.value.createTime?.[1] || null
  }
  const result = await getContractList(params)
  // console.log(result)
  tableData.value = result.data
  pagination.value.itemCount = result.total
}
const handleReset = () => {
  formValue.value = { name: '', customer: '', saler: '' }
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
          <n-form-item-gi :span="8" label="客户名称">
            <n-input v-model:value="formValue.customer" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="销售人员">
            <n-input v-model:value="formValue.saler" />
          </n-form-item-gi>
          <!-- <n-form-item-gi :span="16" label="创建时间">
            <n-date-picker v-model:value="formValue.createTime" type="daterange" class="w-full" />
          </n-form-item-gi> -->
          <n-form-item-gi :span="24">
            <NFlex justify="end" class="w-full">
              <NButton type="primary" @click="getLists"> 查询 </NButton>
              <NButton attr-type="button" @click="handleReset"> 重置 </NButton>
            </NFlex>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>

    <n-card title="项目管理" class="flex-1" size="medium" hoverable>
      <template #header-extra>
        <NButton type="primary" @click="add"> 新增项目 </NButton>
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
