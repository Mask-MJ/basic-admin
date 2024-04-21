<script setup lang="ts">
import { getUserInfo, updateUser } from '@/api/system/user'
import type { UserInfo } from '@/api/system/user.type'
import EditModal from './EditModal.vue'
import ChangePasswordModal from './ChangePasswordModal.vue'
import type { UploadFileInfo } from 'naive-ui'

const userStore = useUserStore()
const showEditModal = ref(false)
const rowData = ref<UserInfo>({} as UserInfo)
const showChangePasswordModal = ref(false)

const userInfo = ref<UserInfo>({} as UserInfo)
const token = computed(() => {
  return `Bearer ${userStore.getToken}`
})

// ts 获取 UserInfo 中的每一个 key
const getDeescriptionValue = (key: keyof UserInfo) => {
  if (key === 'sex') {
    return userInfo.value[key] === 1 ? '男' : '女'
  } else if (key === 'status') {
    return userInfo.value[key] === 1 ? '正常' : '停用'
  } else {
    return userInfo.value[key]
  }
}
const columns = [
  { title: '账号', key: 'account', align: 'center' },
  { title: '用户名', key: 'nickname', align: 'center' },
  { title: '邮箱', key: 'email', align: 'center' },
  { title: '手机号', key: 'phoneNumber', align: 'center' },
  { title: '性别', key: 'sex', align: 'center' },
  {
    title: '状态',
    key: 'status',
    width: 100,
    align: 'center'
  },
  { title: '所属部门', key: 'deptId', align: 'center' },
  // { title: '备注', key: 'remark', align: 'center' },
  { title: '创建时间', key: 'createdAt', width: 200, align: 'center' }
]

const changeUserInfo = () => {
  showEditModal.value = true
  rowData.value = {} as UserInfo
}

const handleReset = async () => {
  userInfo.value = {} as UserInfo
  await getUserInfo()
}

// Todo: 需要完善后台接口的上传头像功能, error事件->改为finish事件;
const handleFinish = () => {
  updateUser({ id: userInfo.value.id }).then((res) => {
    // console.log(res)
    userInfo.value = res
  })
}
// 上传图片前的校验
const beforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  const arr = ['image/png', 'image/jpeg', 'image/jpg']
  // console.log(data.file.file?.size)
  if (!arr.includes(data.file.file?.type || '')) {
    window.$message.error('只能上传png/jpeg/jpg格式的图片文件，请重新上传')
    return false
  }
  if (data.file.file?.size && data.file.file?.size > 1024 * 1024 * 2) {
    window.$message.error('图片大小不能超过2M，请重新上传')
    return false
  }
  return true
}

onMounted(async () => {
  userInfo.value = await getUserInfo()
  // console.log(userInfo.value)
})
</script>

<template>
  <div class="flex-center flex-col h-full">
    <n-card class="mb-4 h-250 w-250" size="huge" content-style="padding:20px  50px">
      <n-tabs
        type="line"
        size="large"
        :tabs-padding="20"
        pane-style="padding: 50px; "
        class="w-150"
      >
        <n-tab-pane name="基础信息">
          <n-avatar round :size="88" :src="userInfo.avatar || ''" class="my-5 mx-24" />
          <n-popover trigger="hover" placement="bottom" class="text-3 color-gray">
            <template #trigger>
              <n-upload
                action="/api/system/user/uploadAvatar"
                :headers="{ Authorization: token }"
                list-type="image"
                class="w-19 mb-12 mx-24"
                :show-file-list="false"
                @before-upload="beforeUpload"
                @finish="handleFinish"
              >
                <n-button strong secondary type="tertiary">更换头像</n-button>
              </n-upload>
            </template>
            请选择图片上传：大小180 * 180像素<br />支持JPG、PNG等格式，图片需小于2M
          </n-popover>
          <n-descriptions label-placement="left">
            <n-descriptions-item v-for="item in columns" :key="item.key" :span="3">
              <template #label> {{ item.title }} </template>
              {{ getDeescriptionValue(item.key as keyof UserInfo) }}
            </n-descriptions-item>
          </n-descriptions>

          <n-button class="my-10 mx-24" @click="changeUserInfo">修改用户信息</n-button>
        </n-tab-pane>

        <n-tab-pane name="修改密码">
          <ChangePasswordModal v-model="showChangePasswordModal" :rowData="rowData" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <EditModal v-model="showEditModal" :rowData="rowData" @reload="handleReset" />
  </div>
</template>

<style lang="" scoped></style>
