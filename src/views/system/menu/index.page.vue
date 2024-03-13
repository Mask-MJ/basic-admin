<script setup lang="ts">
import type { SearchParams, MenuInfo } from '@/api/system/menu.type'
import { NButton, NFlex, NPopconfirm, NPopover, NTag, type DataTableColumns } from 'naive-ui'
import { getMenuList, deleteMenu } from '@/api/system/menu'
import EditModal from './EditModal.vue'

const formValue = ref<SearchParams>({ name: '', status: null })
const tableData = ref<MenuInfo[]>([])
const pagination = ref({ page: 1, pageSize: 10 })
const showEditModal = ref(false)
const rowData = ref<MenuInfo>()

const columns: DataTableColumns<MenuInfo> = [
  { title: '菜单名称', key: 'name', align: 'center' },
  { title: '菜单路径', key: 'path', align: 'center' },
  { title: '菜单图标', key: 'icon', align: 'center' },
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
                        await deleteMenu(row.id)
                        tableData.value = await getMenuList({
                          ...formValue.value,
                          ...pagination.value
                        })
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
          ]
        }
      )
    }
  }
]

const addMenu = () => {
  showEditModal.value = true
  rowData.value = undefined
}

const handleSearch = async () => {
  tableData.value = await getMenuList({ ...formValue.value, ...pagination.value })
}

const handleReset = async () => {
  formValue.value = { name: '', status: null }
  tableData.value = await getMenuList()
}

onMounted(async () => {
  tableData.value = await getMenuList()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <n-card class="mb-4" size="medium" hoverable>
      <n-form ref="formRef" inline :label-width="80" :model="formValue" label-placement="left">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="菜单名称">
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
              <NButton type="primary" @click="handleSearch"> 查询 </NButton>
              <NButton attr-type="button" @click="handleReset"> 重置 </NButton>
            </NFlex>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
    <n-card title="菜单管理" class="flex-1" size="medium" hoverable>
      <template #header-extra>
        <NButton type="primary" @click="addMenu"> 新增菜单 </NButton>
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
    <EditModal v-model="showEditModal" :rowData="rowData" @reload="handleReset" />
  </div>
</template>
