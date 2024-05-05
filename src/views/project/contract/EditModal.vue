<script setup lang="ts">
import type { ContractInfo } from '@/api/project/contract.type'
import type { FormInst, FormRules } from 'naive-ui'
import type { FactoryInfo } from '@/api/project/factory.type'
import { createContract, updateContract } from '@/api/project/contract'
import { getFactoryList } from '@/api/project/factory'
import { cloneDeep } from 'lodash-es'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<ContractInfo> }
})

const route = useRoute() as any
const factoryId = computed(() => Number(route.params.id))

const formValue = ref({} as ContractInfo)
const formRef = ref<FormInst | null>(null)

const show = defineModel({ required: true, type: Boolean })
const rules: FormRules = {
  name: { required: true, message: '请输入项目名称', trigger: 'blur' },
  customer: { required: true, message: '请输入客户名称', trigger: 'blur' },
  customerPhone: { required: true, message: '请输入客户联系方式', trigger: 'blur' },
  valveCount: {
    type: 'number',
    required: true,
    message: '请输入采购阀门总数',
    trigger: ['blur', 'change']
  },
  highValveCount: {
    type: 'number',
    required: true,
    message: '请输入高级阀门数量',
    trigger: ['blur', 'change']
  },
  contractTime: {
    required: true,
    message: '请输入签订合同时间',
    type: 'number',
    trigger: ['blur', 'change']
  },
  saler: { required: true, message: '请输入销售人员', trigger: 'blur' }
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
    formValue.value = cloneDeep({
      ...props.rowData,
      // 将后台返回的 contractTime 转换为时间戳
      contractTime: new Date(props.rowData.contractTime).getTime()
    })
  }
  // 如果有工厂id factoryId, 则将 factory
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
    await updateContract(formValue.value)
  } else {
    // 新增
    await createContract(formValue.value)
  }
  emits('reload')
}

// 取消按钮的回调: 清空 formValue
const cancelCallback = async () => {
  formValue.value = {} as ContractInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑合同' : '新增合同'"
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
      <n-form-item label="项目名称" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
      <n-form-item label="客户名称" path="customer">
        <n-input v-model:value="formValue.customer" />
      </n-form-item>
      <n-form-item label="客户联系方式" path="customerPhone">
        <n-input v-model:value="formValue.customerPhone" />
      </n-form-item>
      <n-form-item label="采购阀门总数" path="valveCount">
        <n-input-number v-model:value="formValue.valveCount" />
      </n-form-item>
      <n-form-item label="高级阀门数量" path="highValveCount">
        <n-input-number v-model:value="formValue.highValveCount" />
      </n-form-item>
      <n-form-item label="签订合同时间" path="contractTime">
        <n-date-picker v-model:value="formValue.contractTime" type="date" />
      </n-form-item>
      <n-form-item label="销售人员" path="saler">
        <n-input v-model:value="formValue.saler" />
      </n-form-item>
      <n-form-item label="所属工厂" path="factoryId" v-if="!factoryId">
        <n-select
          v-model:value="formValue.factoryId"
          placeholder="Select"
          :options="factoryOptions"
        />
      </n-form-item>
      <n-form-item label="备注" path="remark">
        <n-input v-model:value="formValue.remark" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style lang="" scoped></style>
