<script setup lang="ts">
import type { FactoryInfo } from '@/api/project/factory.type'
import { createFactory, updateFactory } from '@/api/project/factory'
import type { FormInst } from 'naive-ui'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<FactoryInfo> }
})
const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as FactoryInfo)
const rules = {
  name: { required: true, message: '请输入工厂名称', trigger: 'blur' },
  address: { required: true, message: '请输入工厂地址', trigger: 'blur' }
}
const setDataCallback = () => {
  if (props.rowData) {
    formValue.value = props.rowData
  }
}
const submitCallback = async () => {
  await formRef.value?.validate()
  // 判断是新增还是编辑
  if (props.rowData) {
    // 编辑
    await updateFactory(formValue.value)
    emits('reload')
  } else {
    // 新增
    await createFactory(formValue.value)
    emits('reload')
  }
}
const cancelCallback = () => {
  formValue.value = {} as FactoryInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑工厂' : '新增工厂'"
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
      <n-form-item label="工厂名称" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
      <n-form-item label="工厂地址" path="address">
        <n-input v-model:value="formValue.address" />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formValue.status" :default-value="1">
          <n-space>
            <n-radio :value="1"> 启用 </n-radio>
            <n-radio :value="0"> 禁用 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="formValue.remark" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>
