<script setup lang="ts">
import { changePassword } from '@/api/system/user'
import type { FormInst, FormItemRule } from 'naive-ui'

const userStore = useUserStore()

const formValue = ref({
  oldPassword: '',
  password: '',
  reenteredPassword: ''
})
const formRef = ref<FormInst | null>(null)

// 第二次输入密码是否和第一次输入密码一致
const validatePasswordStartWith = (rule: FormItemRule, value: string): boolean => {
  return (
    !!formValue.value.password &&
    formValue.value.password.startsWith(value) &&
    formValue.value.password.length >= value.length
  )
}
// 两次密码是否一致
const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
  return value === formValue.value.password
}
// 表单验证规则
const rules = {
  oldPassword: { required: true, message: '请输入原密码', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
  reenteredPassword: [
    { required: true, message: '请再次输入密码', trigger: ['input', 'blur'] },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}

const handleSubmit = async () => {
  const id = userStore.getUserInfo.id
  // const result = await changePassword({ id, password: formValue.value.password })
  // console.log(result)

  // 表单中的validate()方法会返回一个 Promise 对象，如果验证通过，Promise 对象会 resolve，否则会 reject
  try {
    await formRef.value?.validate()
    await changePassword({
      id,
      password: formValue.value.password,
      oldPassword: formValue.value.oldPassword
    })
    window.$message.success('修改密码成功')
    handleReset()
  } catch (error) {
    window.$message.error('验证失败，请检查输入是否正确')
  }
}

const handleReset = () => {
  formValue.value = {
    oldPassword: '',
    password: '',
    reenteredPassword: ''
  }
}
</script>

<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" label-placement="left" :rules="rules">
    <n-form-item path="oldPassword" label="原密码">
      <n-input v-model:value="formValue.oldPassword" type="password" />
    </n-form-item>
    <n-form-item path="password" label="新密码">
      <n-input v-model:value="formValue.password" type="password" />
    </n-form-item>
    <n-form-item label="确认密码" path="reenteredPassword">
      <n-input v-model:value="formValue.reenteredPassword" type="password" />
    </n-form-item>
    <n-form-item class="flex-center mt-10">
      <n-button type="primary" class="mr-5" @click="handleSubmit">确认</n-button>
      <n-button @click="handleReset">取消</n-button>
    </n-form-item>
  </n-form>
</template>

<style lang="" scoped></style>
