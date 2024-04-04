<script setup lang="ts">
import { createDict, updateDict } from '@/api/system/dict'
import type { DictInfo } from '@/api/system/dict.type'
import type { FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash-es'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<DictInfo> }
})
const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as DictInfo)
const rules = {
  name: { required: true, message: '请输入字典名称', trigger: 'blur' },
  value: { required: true, message: '请输入字典值', trigger: 'blur' }
}
// Modal 出现后的回调: 如果有 rowData, 则将 rowData 赋值给 formValue
const setDataCallback = async () => {
  if (props.rowData) {
    // const result = await getDictDetail(props.rowData.id)
    // console.log(result)
    // formValue.value = result
    formValue.value = cloneDeep(props.rowData)
  }
}
// 确认按钮的回调: 如果有 rowData, 则执行编辑操作, 否则执行新增操作
const submitCallback = async () => {
  await formRef.value?.validate()
  if (props.rowData) {
    // 编辑
    await updateDict(formValue.value)
  } else {
    // 新增
    await createDict(formValue.value)
  }
  emits('reload')
}
// 取消按钮的回调: 清空 formValue
const cancelCallback = () => {
  formValue.value = {} as DictInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑字典' : '新增字典'"
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
      <n-form-item label="部门名称" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
      <!-- <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formValue.status" :default-value="1">
          <n-space>
            <n-radio :value="1"> 启用 </n-radio>
            <n-radio :value="0"> 禁用 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item> -->
      <n-form-item label="字典值" path="value">
        <n-input v-model:value="formValue.value" />
      </n-form-item>
      <n-form-item label="字典备注" path="remark">
        <n-input v-model:value="formValue.remark" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style lang="" scoped></style>
