<script setup lang="ts">
import type { UnitInfo } from '@/api/system/unit.type'
import type { FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash-es'
import { createUnit, updateUnit } from '@/api/system/unit'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<UnitInfo> }
})
const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as UnitInfo)
const rules = {
  name: { required: true, message: '请输入单位名称', trigger: 'blur' },
  value: { required: true, message: '请输入单位值', trigger: 'blur' }
}

// Modal 出现后的回调: 如果有 rowData, 则将 rowData 赋值给 formValue
const setDataCallback = () => {
  if (props.rowData) {
    formValue.value = cloneDeep(props.rowData)
  }
}
// 确认按钮的回调: 如果有 rowData, 则执行编辑操作, 否则执行新增操作
const submitCallback = async () => {
  await formRef.value?.validate()
  if (props.rowData) {
    // 编辑
    await updateUnit(formValue.value)
  } else {
    // 新增
    await createUnit(formValue.value)
  }
  emits('reload')
}
// 取消按钮的回调: 清空 formValue
const cancelCallback = () => {
  formValue.value = {} as UnitInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑单位' : '新增单位'"
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
      <n-form-item label="单位名称" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
      <n-form-item label="单位值" path="value">
        <n-input v-model:value="formValue.value" />
      </n-form-item>
      <n-form-item label="单位备注" path="remark">
        <n-input v-model:value="formValue.remark" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style lang="" scoped></style>
