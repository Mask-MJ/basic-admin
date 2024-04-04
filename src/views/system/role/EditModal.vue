<script setup lang="ts">
import { createRole, updateRole } from '@/api/system/role'
import type { RoleInfo } from '@/api/system/role.type'
import type { FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash-es'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<RoleInfo> }
})
const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as RoleInfo)
const rules = {
  name: { required: true, message: '请输入角色名称', trigger: 'blur' },
  value: { required: true, message: '请输入角色关键字', trigger: 'blur' }
}

// 打开弹窗时的回调，如果是编辑操作，将数据填充到表单中
const setDataCallback = () => {
  if (props.rowData?.id) {
    formValue.value = cloneDeep(props.rowData)
  }
}
// 打开弹窗时的回调
const submitCallback = async () => {
  await formRef.value?.validate()
  // 判断是新增还是编辑
  if (props.rowData?.id) {
    // 编辑
    await updateRole(formValue.value)
  } else {
    // 新增
    await createRole(formValue.value)
  }
  emits('reload')
}
// 关闭弹窗时的回调
const cancelCallback = () => {
  formValue.value = {} as RoleInfo
}
</script>

<template>
  <div>
    <n-modal
      v-model:show="show"
      preset="dialog"
      positive-text="确认"
      negative-text="取消"
      :title="rowData?.id ? '编辑用户' : '新增用户'"
      @after-enter="setDataCallback"
      @positive-click="submitCallback"
      @after-leave="cancelCallback"
    >
      <n-form
        ref="formRef"
        :label-width="100"
        :model="formValue"
        label-placement="left"
        :rules="rules"
      >
        <n-form-item label="角色名称" path="name">
          <n-input v-model:value="formValue.name" />
        </n-form-item>
        <n-form-item label="角色关键字" path="value">
          <n-input v-model:value="formValue.value" />
        </n-form-item>
        <n-form-item label="标注">
          <n-input v-model:value="formValue.remark" type="textarea" />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<style lang="" scoped></style>
