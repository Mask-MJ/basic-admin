<script setup lang="ts">
import { updateUser } from '@/api/system/user'
import type { UserInfo } from '@/api/system/user.type'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  rowData: { type: Object as PropType<UserInfo>, required: true }
})
const emits = defineEmits(['reload'])

const userInfo = ref({} as UserInfo)

const show = defineModel({ required: true, type: Boolean })

const rules = {
  account: { required: true, message: '请输入账号', trigger: 'blur' },
  // password: { required: true, message: '请输入密码', trigger: 'blur' },
  nickname: { required: true, message: '请输入用户名', trigger: 'blur' }
}

// 模态框显示时的回调，设置数据
const setDataCallback = () => {
  userInfo.value = cloneDeep(props.rowData)
}
// 提交数据
const submitCallback = async () => {
  await updateUser(userInfo.value)
  emits('reload')
}
// 模态框关闭时的回调，清空数据
const cancelCallback = () => {
  userInfo.value = {} as UserInfo
}
</script>

<template>
  <div>
    <n-modal
      v-model:show="show"
      preset="dialog"
      positive-text="确认"
      negative-text="取消"
      title="编辑用户信息"
      class="h-140 py-12"
      @after-enter="setDataCallback"
      @positive-click="submitCallback"
      @after-leave="cancelCallback"
    >
      <n-form
        ref="formRef"
        :label-width="80"
        :model="userInfo"
        label-placement="left"
        :rules="rules"
      >
        <n-form-item label="账号" path="account">
          <n-input v-model:value="userInfo.account" />
        </n-form-item>
        <n-form-item label="用户名" path="account">
          <n-input v-model:value="userInfo.nickname" />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="userInfo.email" />
        </n-form-item>
        <n-form-item label="手机">
          <n-input v-model:value="userInfo.phoneNumber" />
        </n-form-item>
        <n-form-item label="性别" path="sex">
          <n-radio-group v-model:value="userInfo.sex" :default-value="1">
            <n-space>
              <n-radio :value="1"> 男 </n-radio>
              <n-radio :value="0"> 女 </n-radio>
              <n-radio :value="2"> 保密 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<style lang="" scoped></style>
