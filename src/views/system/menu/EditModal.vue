<script setup lang="ts">
import type { MenuInfo } from '@/api/system/menu.type'
import { createMenu, updateMenu } from '@/api/system/menu'
import type { FormInst } from 'naive-ui'

const emits = defineEmits(['reload'])
const props = defineProps({
  rowData: { type: Object as PropType<MenuInfo> }
})
const show = defineModel({ required: true, type: Boolean })
const formRef = ref<FormInst | null>(null)
const formValue = ref({} as MenuInfo)
const rules = {
  name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
  path: { required: true, message: '请输入菜单路径', trigger: 'blur' },
  icon: { required: true, message: '请选择菜单图标', trigger: 'blur' }
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
    await updateMenu(formValue.value)
    emits('reload')
  } else {
    // 新增
    await createMenu(formValue.value)
    emits('reload')
  }
}
const cancelCallback = () => {
  formValue.value = {} as MenuInfo
}
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="dialog"
    :title="rowData ? '编辑菜单' : '新增菜单'"
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
      <n-form-item label="菜单名称" path="name">
        <n-input v-model:value="formValue.name" />
      </n-form-item>
      <n-form-item label="菜单路径" path="path" v-if="!rowData">
        <n-input v-model:value="formValue.path" />
      </n-form-item>
      <n-form-item label="菜单图标" path="icon">
        <n-input v-model:value="formValue.icon" />
      </n-form-item>
      <n-form-item label="是否隐藏" path="hidden">
        <n-radio-group v-model:value="formValue.hidden" :default-value="1">
          <n-space>
            <n-radio :value="1"> 展示 </n-radio>
            <n-radio :value="0"> 隐藏 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formValue.status" :default-value="1">
          <n-space>
            <n-radio :value="1"> 启用 </n-radio>
            <n-radio :value="0"> 禁用 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="排序">
        <n-input-number v-model:value="formValue.sort" />
      </n-form-item>
      <n-form-item label="父级菜单">
        <n-select
          v-model:value="formValue.parentId"
          placeholder="Select"
          :options="[
            { label: '管理员', value: 1 },
            { label: '普通用户', value: 2 }
          ]"
        />
      </n-form-item>
    </n-form>
  </n-modal>
</template>
