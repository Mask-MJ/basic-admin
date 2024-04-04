<script setup lang="ts">
import type { DictDataInfo } from '@/api/system/dictData.type'
import type { FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash-es'
import { createDictData, updateDictData } from '@/api/system/dictData'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<DictDataInfo> },
  dictId: { type: Number, required: true }
})
const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as DictDataInfo)

const rules = {
  name: { required: true, message: '请输入字典名称', trigger: 'blur' },
  value: { required: true, message: '请输入字典值', trigger: 'blur' }
}
const setDataCallback = async () => {
  if (props.rowData) {
    formValue.value = cloneDeep(props.rowData)
  }
}
const submitCallback = async () => {
  await formRef.value?.validate()
  const params = {
    ...formValue.value,
    dictId: props.dictId
  }
  if (props.rowData) {
    // 编辑
    await updateDictData(params)
  } else {
    // 新增
    await createDictData(params)
  }
  emits('reload')
}
const cancelCallback = () => {
  formValue.value = {} as DictDataInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑字典列表' : '新增字典列表'"
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
      <n-form-item label="字典名称" path="name">
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
