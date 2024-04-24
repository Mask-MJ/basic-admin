<script setup lang="ts">
import type { ValveInfo } from '@/api/project/valve.type'
import { createValve, updateValve } from '@/api/project/valve'
import type { FormInst } from 'naive-ui'
import { getFactoryList } from '@/api/project/factory'
import type { FactoryInfo } from '@/api/project/factory.type'
import { cloneDeep } from 'lodash-es'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<ValveInfo> }
})

const route = useRoute() as any
const factoryId = computed(() => Number(route.params.id))

const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as ValveInfo)
const rules = {
  name: { required: true, message: '请输入阀门名称', trigger: 'blur' }
}
const factoryList = ref<FactoryInfo[]>([])
const factoryOptions = computed(() => {
  return factoryList.value.map((item) => ({
    label: item.name,
    value: item.id
  }))
})
const setDataCallback = async () => {
  if (props.rowData) {
    formValue.value = cloneDeep(props.rowData)
  }
  // 如果有工厂id factoryId, 则将 factoryId 赋值给 formValue
  if (factoryId.value) {
    formValue.value.factoryId = factoryId.value
  }
  // 获取工厂列表的数据
  factoryList.value = (await getFactoryList()).data
}
const submitCallback = async () => {
  await formRef.value?.validate()
  // 判断是新增还是编辑
  if (props.rowData) {
    // 编辑
    await updateValve(formValue.value)
    emits('reload')
  } else {
    // 新增
    await createValve(formValue.value)
    emits('reload')
  }
}
const cancelCallback = () => {
  formValue.value = {} as ValveInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑阀门' : '新增阀门'"
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
      <n-form-item label="阀门名称" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formValue.status" :default-value="1">
          <n-space>
            <n-radio :value="1"> 启用 </n-radio>
            <n-radio :value="0"> 禁用 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="所属工厂" path="factoryId" v-if="!factoryId">
        <n-select
          v-model:value="formValue.factoryId"
          placeholder="Select"
          :options="factoryOptions"
        />
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="formValue.remark" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>
