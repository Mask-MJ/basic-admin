<script setup lang="ts">
import { changePassword } from '@/api/system/user'
import type { UserInfo } from '@/api/system/user.type'
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'

interface FormValueType {
  password: string | null
  reenteredPassword: string | null
}

const props = defineProps({
  rowData: { type: Object as PropType<UserInfo>, required: true }
})

const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const formValue = ref<FormValueType>({ password: null, reenteredPassword: null })
function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!formValue.value.password &&
    formValue.value.password.startsWith(value) &&
    formValue.value.password.length >= value.length
  )
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === formValue.value.password
}
const handlePasswordInput = () => {
  if (formValue.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}
const rules: FormRules = {
  password: [{ required: true, message: '请输入密码' }],
  reenteredPassword: [
    { required: true, message: '请再次输入密码', trigger: ['input', 'blur'] },
    { validator: validatePasswordStartWith, message: '两次密码输入不一致', trigger: 'input' },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}
const submitCallback = async () => {
  await formRef.value?.validate()
  const id = props.rowData.id
  changePassword({
    id,
    password: formValue.value.password!,
    oldPassword: formValue.value.reenteredPassword!
  })
}
const cancelCallback = () => {
  formValue.value = { password: null, reenteredPassword: null }
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    title="请输入新密码"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitCallback"
    @after-leave="cancelCallback"
  >
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="formValue.password"
          type="password"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
        <n-input
          v-model:value="formValue.reenteredPassword"
          :disabled="!formValue.password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style lang="" scoped></style>
