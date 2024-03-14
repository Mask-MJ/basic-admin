<script setup lang="ts">
import type { UserInfo } from '@/api/system/user.type'
import { createUser, updateUser } from '@/api/system/user'
import type { FormInst } from 'naive-ui'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<UserInfo> }
})
const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as UserInfo)
const rules = {
  account: { required: true, message: '请输入账号', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
  nickname: { required: true, message: '请输入用户名', trigger: 'blur' }
}
const setDataCallback = () => {
  if (props.rowData?.id) {
    formValue.value = props.rowData
  }
}
const submitCallback = async () => {
  await formRef.value?.validate()
  // 判断是新增还是编辑
  if (props.rowData?.id) {
    // 编辑
    await updateUser(formValue.value)
    emits('reload')
  } else {
    // 新增
    await createUser(formValue.value)
    emits('reload')
  }
}
const cancelCallback = () => {
  formValue.value = {} as UserInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑用户' : '新增用户'"
    positive-text="确认"
    negative-text="取消"
    @after-enter="setDataCallback"
    @positive-click="submitCallback"
    @after-leave="cancelCallback"
  >
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="账号" path="account">
        <n-input v-model:value="formValue.account" />
      </n-form-item>
      <n-form-item label="密码" path="password" v-if="!rowData">
        <n-input v-model:value="formValue.password" />
      </n-form-item>
      <n-form-item label="用户名" path="nickname">
        <n-input v-model:value="formValue.nickname" />
      </n-form-item>
      <n-form-item label="邮箱">
        <n-input v-model:value="formValue.email" />
      </n-form-item>
      <n-form-item label="手机号">
        <n-input v-model:value="formValue.phoneNumber" />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formValue.status" :default-value="1">
          <n-space>
            <n-radio :value="1"> 启用 </n-radio>
            <n-radio :value="0"> 禁用 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="角色">
        <n-select
          v-model:value="formValue.roles"
          placeholder="Select"
          :options="[
            { label: '管理员', value: 1 },
            { label: '普通用户', value: 2 }
          ]"
        />
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="formValue.remark" type="textarea" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>
