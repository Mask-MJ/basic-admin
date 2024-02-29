<script setup lang="ts">
import type { FormItemGiProps } from 'naive-ui'
import type { BasicFormProps, FormAction, FormActionType, FormSchema } from './types'
import { onKeyStroke } from '@vueuse/core'
import { isBoolean, isFunction, merge } from 'lodash-es'
import { basicProps } from './props'
import { createFormItemRule } from './helper'
import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'

const attrs = useAttrs()
const props = defineProps(basicProps)
const emits = defineEmits(['reset', 'submit', 'register', 'pathValueChange'] as string[])

// 表单数据
const formModel = ref()
// 表单选项默认值
const defaultValueRef = ref()
// 存放表单实例
const formElRef = ref<FormActionType | null>()
// 存放 schema
const schemaRef = ref<FormSchema[]>([])
// 判断表单实例是否初始化
const isInitedDefaultRef = ref(false)
// 通过 setProps 注入的值
const propsRef = ref<Partial<BasicFormProps>>({})
// 获取最初传入的 props 和通过 setProps 事件传入的 props 合集
const getProps = computed(() => merge({ ...(props as BasicFormProps) }, propsRef.value))
// 获取在调用实例上绑定的值, 传递到 n-from 上
const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) }))
// 获取传入的 schema 并处理
const getSchemas = computed((): FormSchema[] => {
  return getBindValue.value.schemas.filter((schema) => getShow(schema).isIfShow)
})
// 获取绑定到 n-grid 上的值
const getGridBindValue = computed(() => getProps.value.formGrid)
// 获取绑定到 form-item-gi 上的值
const getBindItemValue = (schema: FormSchema) => {
  return {
    ...(getProps.value.formItem as unknown as FormItemGiProps),
    ...createFormItemRule(schema)
  }
}
// 获取需要绑定到组件上的值
const getBindComponentValue = computed(() => {
  return {
    getProps: unref(getProps),
    defaultValueRef: unref(defaultValueRef),
    formModel,
    formActionType
  }
})
// 获取需要绑定到操作栏上的值
const getBindActionValue = computed(() => {
  const { formAction, formGrid, formItem } = getProps.value
  return {
    schemas: getSchemas.value,
    formGrid,
    formItem,
    formAction: formAction as FormAction
  }
})

const { handleFormValues, initDefault } = useFormValues({
  getProps,
  defaultValueRef,
  getSchemas,
  formModel
})

const {
  resetPaths,
  handleSubmit,
  restoreValidation,
  validate,
  getPathsValue,
  updateSchema,
  resetSchema,
  appendSchemaByPath,
  removeSchemaByPath,
  setPathsValue
} = useFormEvents({
  emits,
  getProps,
  formModel,
  getSchemas,
  defaultValueRef,
  formElRef: formElRef as Ref<FormActionType>,
  schemaRef: schemaRef as Ref<FormSchema[]>,
  handleFormValues
})

const setProps = async (formProps: Partial<BasicFormProps>) => {
  propsRef.value = merge(unref(propsRef) || {}, formProps)
}
const setFormModel = (key: string, value: any) => {
  formModel.value[key] = value
  // validate();
  emits('pathValueChange', key, value)
}
// 判断组件是否展示
const getShow = (schema: FormSchema) => {
  const { show, ifShow } = schema
  const { mergeDynamicData } = getProps.value
  const schemaArgs = {
    path: schema.path,
    model: formModel,
    values: { ...mergeDynamicData, ...defaultValueRef.value, ...formModel },
    schema: schema
  }
  let isShow = true
  let isIfShow = true

  if (isBoolean(show)) {
    isShow = show
  }
  if (isBoolean(ifShow)) {
    isIfShow = ifShow
  }
  if (isFunction(show)) {
    isShow = show(schemaArgs)
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow(schemaArgs)
  }
  return { isShow, isIfShow }
}
/** 按下回车键提交表单 */
const handleEnterPress = () => {
  const { formAction } = unref(getProps)
  if (!formAction.submitButtonOptions!.autoSubmitOnEnter) return
  onKeyStroke('Enter', (e) => {
    const target: HTMLElement = e.target as HTMLElement
    if (target && target.tagName && target.tagName.toUpperCase() === 'INPUT') {
      // handleSubmit()
    }
  })
}
// 操作栏点击事件
const action = (type: string) => {
  if (type === 'reset') {
    resetPaths()
  } else if (type === 'submit') {
    handleSubmit()
  } else if (type === 'toggle') {
    const { formGrid } = getProps.value
    propsRef.value = merge(unref(propsRef) || {}, {
      formGrid: { collapsed: !formGrid.collapsed }
    })
  }
}
const formActionType: FormActionType = {
  submit: handleSubmit,
  getPathsValue,
  setPathsValue,
  resetPaths,
  updateSchema,
  resetSchema,
  setProps,
  removeSchemaByPath,
  appendSchemaByPath,
  restoreValidation,
  validate
}

// 监听表项中收集到的值的对象
watchEffect(() => {
  const { model, schemas = [] } = unref(getProps)
  if (model) {
    setPathsValue(model)
  }
  resetSchema(schemas)
  if (!isInitedDefaultRef.value && schemas?.length) {
    initDefault()
    isInitedDefaultRef.value = true
  }
})
</script>

<template>
  <n-form
    ref="formElRef"
    v-bind="getBindValue"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <n-grid v-bind="getGridBindValue">
      <template v-for="schema in getSchemas" :key="schema.path">
        <n-form-item-gi v-show="getShow(schema).isShow" v-bind="getBindItemValue(schema)">
          <FormItemComponent
            :schema="schema"
            v-bind="getBindComponentValue"
            @path-value-change="setFormModel"
          >
            <template v-for="item in Object.keys($slots)" #[item]="data">
              <slot :name="item" v-bind="data || {}"></slot>
            </template>
          </FormItemComponent>
        </n-form-item-gi>
      </template>
      <n-form-item-gi v-if="getProps.formAction.show" suffix v-bind="getProps.formAction.actionGi">
        <FormActionComp v-bind="getBindActionValue" @action="action" />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<style lang="" scoped></style>
