<script setup lang="ts">
import type { UserInfo, SearchParams } from '@/api/system/user.type'
import { NButton, NFlex, NPopconfirm, NPopover, NTag, type DataTableColumns } from 'naive-ui'
import { getUsersList, deleteUser } from '@/api/system/user'
import EditModal from './EditModal.vue'
import ChangePasswordModal from './ChangePasswordModal.vue'

const formValue = ref({
  nickname: '',
  phoneNumber: '',
  status: null,
  createTime: null
})
const tableData = ref<UserInfo[]>([])
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
const showChangePasswordModal = ref(false)
const rowData = ref<UserInfo>({} as UserInfo)

const columns: DataTableColumns<UserInfo> = [
  { title: '账号', key: 'account', align: 'center' },
  { title: '用户名', key: 'nickname', align: 'center' },
  {
    title: '性别',
    key: 'sex',
    width: 80,
    align: 'center',
    render(row) {
      return h('span', null, { default: () => (row.status === 1 ? '男' : '女') })
    }
  },
  { title: '邮箱', key: 'email', align: 'center' },
  { title: '手机号', key: 'phoneNumber', align: 'center' },
  {
    title: '状态',
    key: 'status',
    width: 80,
    align: 'center',
    render(row) {
      return h(
        NTag,
        { type: row.status === 1 ? 'success' : 'error' },
        { default: () => (row.status === 1 ? '启用' : '禁用') }
      )
    }
  },
  { title: '备注', key: 'remark', align: 'center' },
  { title: '创建时间', key: 'createdAt', width: 200, align: 'center' },
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
                default: () => '修改密码',
                trigger: () =>
                  h(
                    NButton,
                    {
                      size: 'small',
                      type: 'warning',
                      onClick: () => {
                        showChangePasswordModal.value = true
                        rowData.value = row
                      }
                    },
                    { default: () => h('i', { class: 'i-ant-design:lock-outlined' }) }
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
                        await deleteUser(row.id)
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

const addUser = () => {
  showEditModal.value = true
  rowData.value = {} as UserInfo
}

const getLists = async () => {
  const params: SearchParams = {
    nickname: formValue.value.nickname || null,
    phoneNumber: formValue.value.phoneNumber || null,
    status: formValue.value.status,
    beginTime: formValue.value.createTime?.[0] || null,
    endTime: formValue.value.createTime?.[1] || null,
    page: pagination.value.page,
    pageSize: pagination.value.pageSize
  }
  const { data, total } = await getUsersList(params)
  tableData.value = data
  pagination.value.itemCount = total
}
const handleReset = () => {
  formValue.value = {
    nickname: '',
    phoneNumber: '',
    status: null,
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
          <n-form-item-gi :span="8" label="用户名">
            <n-input v-model:value="formValue.nickname" placeholder="请输入用户名" />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="手机号">
            <n-input v-model:value="formValue.phoneNumber" placeholder="请输入手机号" />
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
          <n-form-item-gi :span="16" label="创建时间">
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
    <n-card size="medium" hoverable title="用户管理" class="flex-1">
      <template #header-extra>
        <NButton type="primary" @click="addUser"> 新增用户 </NButton>
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
      />
    </n-card>
    <EditModal v-model="showEditModal" :rowData="rowData" @reload="handleReset" />
    <ChangePasswordModal v-model="showChangePasswordModal" :rowData="rowData" />
  </div>
</template>
