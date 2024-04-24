<script setup lang="ts">
import { createDevice, updateDevice } from '@/api/project/device'
import type { DeviceInfo } from '@/api/project/device.type'
import { getFactoryList } from '@/api/project/factory'
import type { FactoryInfo } from '@/api/project/factory.type'
import type { FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash-es'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<DeviceInfo> }
})

const route = useRoute() as any
const factoryId = computed(() => Number(route.params.id))

const formValue = ref({} as DeviceInfo)
const formRef = ref<FormInst | null>(null)

const show = defineModel({ required: true, type: Boolean })
const rules = {
  name: { required: true, message: '请输入装置名称', trigger: 'blur' }
}
const factoryList = ref<FactoryInfo[]>([])
const factoryOptions = computed(() => {
  return factoryList.value.map((item) => ({
    label: item.name,
    value: item.id
  }))
})

// Modal 出现后的回调: 如果有 rowData, 则将 rowData 赋值给 formValue
const setDataCallback = async () => {
  if (props.rowData) {
    formValue.value = cloneDeep(props.rowData)
  }
  // 如果有工厂id factoryId, 则将 factoryId 赋值给 formValue
  // console.log(factoryId.value)
  if (factoryId.value) {
    formValue.value.factoryId = factoryId.value
  }

  // 获取工厂列表的数据
  factoryList.value = (await getFactoryList()).data
}
// 确认按钮的回调: 如果有 rowData, 则执行编辑操作, 否则执行新增操作
const submitCallback = async () => {
  await formRef.value?.validate()
  // 判断是新增还是编辑
  if (props.rowData) {
    // 编辑
    await updateDevice(formValue.value)
    emits('reload')
  } else {
    // 新增
    await createDevice(formValue.value)
    emits('reload')
  }
}
// 取消按钮的回调: 清空 formValue
const cancelCallback = () => {
  formValue.value = {} as DeviceInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑装置' : '新增装置'"
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
      <n-form-item label="装置名称" path="name">
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
      <n-form-item label="备注"> <n-input v-model:value="formValue.remark" /> </n-form-item>
    </n-form>
  </n-modal>
</template>

<style lang="" scoped></style>
