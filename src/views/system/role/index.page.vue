<script setup lang="ts">
import { deleteRole, getRolesList } from '@/api/system/role'
import type { RoleInfo, SearchParams } from '@/api/system/role.type'
import { NButton, NFlex, NPopconfirm, NPopover, type DataTableColumns } from 'naive-ui'
import EditModal from './EditModal.vue'

const formValue = ref({
  name: '',
  createTime: null
})
const tableData = ref<RoleInfo[]>([])
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    pagination.value.page = page
    getLists()
  }
})
const columns: DataTableColumns<RoleInfo> = [
  { title: '角色名称', key: 'name', align: 'center' },
  { title: '角色关键字', key: 'value', align: 'center' },
  { title: '标注', key: 'remark', align: 'center' },
  { title: '创建时间', key: 'createdAt', width: 200, align: 'center' },
  { title: '更新时间', key: 'updatedAt', width: 200, align: 'center' },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    width: 200,
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
                      // 编辑角色的点击事件
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
                      // 删除角色的点击事件
                      onPositiveClick: async () => {
                        await deleteRole(row.id)
                        getLists()
                      }
                    },
                    {
                      default: () => '确认删除该角色户吗？',
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
const showEditModal = ref(false)
const rowData = ref<RoleInfo>()

const getLists = async () => {
  const params: SearchParams = {
    name: formValue.value.name || null,
    beginTime: formValue.value.createTime?.[0] || null,
    endTime: formValue.value.createTime?.[1] || null,
    ...pagination.value
  }
  const result = await getRolesList(params)
  tableData.value = result.data
  // console.log(result)
  pagination.value = { ...pagination.value, itemCount: result.total }
}

const handleReset = () => {
  formValue.value = {
    name: '',
    createTime: null
  }
  getLists()
}

const addRole = () => {
  showEditModal.value = true
  rowData.value = {} as RoleInfo
}

onMounted(async () => {
  getLists()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <n-card class="mb-4" size="medium" hoverable>
      <n-form ref="formRef" :model="formValue" inline :label-width="80" label-placement="left">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="8" label="角色名称">
            <n-input v-model:value="formValue.name" placeholder="请输入角色名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="16" label="创建时间">
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
    <n-card size="medium" hoverable title="角色管理" class="flex-1">
      <template #header-extra>
        <NButton type="primary" @click="addRole"> 新增角色 </NButton>
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
      ></n-data-table>
    </n-card>
    <EditModal v-model="showEditModal" :rowData="rowData" @reload="handleReset" />
  </div>
</template>

<style lang="" scoped></style>
