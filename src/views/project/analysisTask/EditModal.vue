<script setup lang="ts">
import { createAnalysisTask, updateAnalysisTask } from '@/api/project/analysisTask'
import type { AnalysisTaskInfo } from '@/api/project/analysisTask.type'
import { getFactoryList } from '@/api/project/factory'
import type { FactoryInfo } from '@/api/project/factory.type'
import { getDictList } from '@/api/system/dict'
import type { DictInfo } from '@/api/system/dict.type'
import { cloneDeep } from 'lodash-es'
import type { FormInst, FormRules } from 'naive-ui'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<AnalysisTaskInfo> }
})
const route = useRoute() as any
const factoryId = computed(() => Number(route.params.id))

const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as AnalysisTaskInfo)
const rules: FormRules = {
  name: { required: true, message: '请输入任务名称', trigger: 'blur' },
  factoryId: {
    required: true,
    message: '请选择所属工厂',
    trigger: ['blur', 'change'],
    type: 'number'
  },
  dictId: {
    required: true,
    message: '请选择所属字典数据',
    trigger: ['blur', 'change'],
    type: 'number'
  }
}
const factoryList = ref<FactoryInfo[]>([])
const factoryOptions = computed(() => {
  return factoryList.value.map((item) => ({
    label: item.name,
    value: item.id
  }))
})
const dictList = ref<DictInfo[]>([])
const dictOptions = computed(() => {
  return dictList.value.map((item) => ({
    label: item.name,
    value: item.id
  }))
})

// Modal 出现后的回调: 如果有 rowData, 则将 rowData 赋值给 formValue
const setDataCallback = async () => {
  if (props.rowData) {
    formValue.value = cloneDeep(props.rowData)
  }
  // 如果有工厂id factoryId, 则将 factory
  if (factoryId.value) {
    formValue.value.factoryId = factoryId.value
  }
  // 获取工厂列表的数据
  factoryList.value = (await getFactoryList()).data

  // 如果有字典数据, 则将字典数据赋值给 formValue
  if (props.rowData) {
    formValue.value.dictId = props.rowData.dictId
  }
  // 获取字典数据列表
  dictList.value = (await getDictList()).data
}

// 确认按钮的回调: 如果有 rowData, 则执行编辑操作, 否则执行新增操作
const submitCallback = async () => {
  await formRef.value?.validate()
  // 判断是新增还是编辑
  if (props.rowData) {
    // 编辑
    await updateAnalysisTask(formValue.value)
  } else {
    // 新增
    await createAnalysisTask({ ...formValue.value, pdfPath: [] })
  }
  emits('reload')
}

// 取消按钮的回调: 清空 formValue
const cancelCallback = async () => {
  formValue.value = {} as AnalysisTaskInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑任务' : '新增任务'"
    positive-text="确认"
    negative-text="取消"
    @after-enter="setDataCallback"
    @positive-click="submitCallback"
    @after-leave="cancelCallback"
  >
    <n-form
      ref="formRef"
      :label-width="120"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="任务名称" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
      <!-- <n-form-item label="上传PDF" path="saler">
        <n-input v-model:value="formValue.pdfPath" />
      </n-form-item> -->
      <n-form-item label="所属工厂" path="factoryId">
        <n-select
          v-model:value="formValue.factoryId"
          placeholder="Select"
          :options="factoryOptions"
        />
      </n-form-item>
      <n-form-item label="所属字典数据" path="dictId">
        <n-select v-model:value="formValue.dictId" placeholder="Select" :options="dictOptions" />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formValue.status">
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

<style lang="" scoped></style>
