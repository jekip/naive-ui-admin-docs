# BasicForm 表单
对 `form` 组件进行封装

> 如果文档内没有，可以尝试在在线示例内寻找

## 基础使用
### useForm 方式
下面是一个简单表单的示例
```vue
<template>
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset"/>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicForm, FormSchema, useForm } from '@/components/Form/index';

const schemas: FormSchema[] = [
    {
        field: 'name',
        component: 'NInput',
        label: '姓名',
        labelMessage: '这是一个提示',
        defaultValue: '小马哥',
        componentProps: {
            placeholder: '请输入姓名',
            onInput: (e: any) => {
                console.log(e);
            },
        },
        rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
    }
];

export default defineComponent({
    components: { BasicForm },
    setup() {
        const formRef: any = ref(null);

        const [register, { setFieldsValue }] = useForm({
            gridProps: { cols: 1 },
            collapsedRows: 3,
            labelWidth: 120,
            layout: 'horizontal',
            schemas,
        });
        
        function handleSubmit(values: Recordable) {
            console.log(values);
        }

        function handleReset(values: Recordable) {
            console.log(values);
        }

        return {
            schemas,
            register,
            formRef,
            handleSubmit,
            handleReset,
        };
    },
});
</script>
```

### template 方式

```vue
<template>
    <BasicForm
        submitButtonText="提交预约"
        layout="horizontal"
        :gridProps="{ cols: 1 }"
        :schemas="schemas"
    >
        <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
        </template>
    </BasicForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicForm, FormSchema } from '@/components/Form/index';

const schemas: FormSchema[] = [
    {
        field: 'name',
        component: 'NInput',
        label: '姓名',
        labelMessage: '这是一个提示',
        defaultValue: '小马哥',
        componentProps: {
            placeholder: '请输入姓名',
            onInput: (e: any) => {
                console.log(e);
            },
        },
        rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
    }
];

export default defineComponent({
    components: { BasicForm },
    setup() {
        const formRef: any = ref(null);
        
        function handleSubmit(values: Recordable) {
            console.log(values);
        }

        function handleReset(values: Recordable) {
            console.log(values);
        }

        return {
            schemas,
            formRef,
            handleSubmit,
            handleReset,
        };
    },
});
</script>
```

## useForm
form 组件还提供了 `useForm`，方便调用函数内部方法
### 参数介绍

```ts
const [register, methods] = useForm(props);
```

**参数 props 内的值可以是 computed 或者 ref 类型**

**register**

register 用于注册 `useForm`，如果需要使用 `useForm` 提供的 api，必须将 register 传入组件的 `onRegister`

```vue
<template>
  <BasicForm @register="register" @submit="handleSubmit" />
</template>
<script>
  export default defineComponent({
    components: { BasicForm },
    setup() {
      const [register] = useForm();
      return {
        register,
      };
    },
  });
</script>
```

`Methods`见下方说明

### Methods

**getFieldsValue**

类型: `() => Recordable;`

说明: 获取表单值

**setFieldsValue**

类型: `<T>(values: T) => Promise<void>`

说明: 设置表单字段值

**resetFields**

类型: `()=> Promise<any>`

说明: 重置表单值

**validate**

类型: `(nameList?: NamePath[]) => Promise<any>`

说明: 校验整个表单

**submit**

类型: `() => Promise<void>`

说明: 提交表单

**clearValidate**

类型: `(name?: string | string[]) => Promise<void>`

说明: 清空校验

**setProps**

::: tip

设置表单的 props 可以直接在标签上传递，也可以使用 setProps，或者初始化直接写 useForm(props)

:::

类型: `(formProps: Partial<FormProps>) => Promise<void>`

说明: 设置表单 Props


## Props

::: tip 温馨提醒

除以下参数外，官方文档内的 props 也都支持，具体可以参考 [naiveui form](https://www.naiveui.com/zh-CN/os-theme/components/form)

`gridProps` 和 `giProps` [配置参考](https://www.naiveui.com/zh-CN/os-theme/components/grid)

:::

| 属性 | 类型 | 默认值 | 可选值 | 说明 | 版本 |
| --- | --- | --- | --- | --- | -- |
| layout | `string` | `false` | `inline/Horizontal` | 表单布局方式 |  |
| schemas | `schema[]` | - | - | 表单配置，见下方 `FormSchema` 配置 |  |
| submitOnReset | `boolean` | `true` | - | 重置时是否提交表单 |  |
| gridProps | `Partial<grid>` | - | - | 配置表单栅格，详情见 `grid`组件
| giProps | `Partial<gi>` | - | - | 配置表单栅格，详情见 `gi`组件
| baseGridStyle | `object` | - | - | 配置 Grid 的 style 样式 |  |
| isFull | `boolean` | `true` | - | 组件是否width 100%，表单内所有组件适用 |  |
| labelWidth | `number , string` | - | - | form 内 label 宽度，表单内所有组件适用 |  |
| labelPlacement | `string` | `left` | `left/top` | 标签位置 |  |
| size | `small` | `medium` | `'large'`| 向表单内所有组件传递 size 参数,自定义组件需自行实现 size 接收 |  |
| collapsed | `boolean` | `false` | `true/false` | 是否折叠表单 |  |
| collapsedRows | `number` | 1 | - | 默认展示的grid行数 |  |
| disabled | `boolean` | `false` | `true/false` | 向表单内所有组件传递 disabled 属性 |  |
| inline | `boolean` | `false` | `true/false` | 是否展示为行内表单 |  |
| showAdvancedButton | `boolean` | `false` | `true/false` | 是否显示收起展开按钮 |  |
| showActionButtonGroup | `boolean` | `true` | `true/false` | 是否显示操作按钮(重置/提交) | |
| showResetButton | `boolean` | `true` | - | 是否显示重置按钮 |  |
| resetButtonOptions | `object` |  | - | 重置按钮配置见下方 ActionButtonOption |  |
| showSubmitButton | `boolean` | `true` | - | 是否显示提交按钮 |  |
| submitButtonOptions | `object` |  | - | 确认按钮配置见下方 ActionButtonOption |  |
| resetButtonText | `string` | 重置 | - | 重置按钮文字 |  |
| submitButtonText | `string` | 查询 | - | 确认按钮文字 |  |
| resetFunc | ` () => Promise<void>` |  | - | 自定义重置按钮逻辑`() => Promise<void>;` |  |
| submitFunc | ` () => Promise<void>` |  | - | 自定义提交按钮逻辑`() => Promise<void>;` |  |


### FormSchema

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| field | `string` | - | - | 字段名 |
| label | `string` | - | - | 标签名 |
| labelMessage | `string , string[]` | - | - | 标签名右侧温馨提示 |
| labelMessageStyle | `object, string` | - | - | 标签名右侧样式 |
| defaultValue | `any` | - | - | 所渲渲染组件的初始值 |
| component | `string` | - | - | 组件类型，见下方 ComponentType |
| componentProps | `any,()=>{}` | - | - | 所渲染的组件的 props 和 事件，请参考 naiveui 为了简化使用，和官方保持一致 |
| slot | `string` | - | - | 自定义 slot，渲染组件 |
| suffix | `string` | - | - | 组件后面的内容，返回值，{`value`,`model`,`field`} |
| rules | `object[]` | - | - | 校验规则 参考 naiveui form 组件 validation|
| giProps | `Partial<gi>` | - | - | 配置表单栅格，详情见 `gi`组件
| isFull | `boolean` | `true` | - | 组件是否width 100%，优先级最高 |  |

**ComponentType**

::: tip 温馨提醒
schema 内组件的可选类型，目前只测试了如下组件，实际上只要支持 v-model:value 表单组件理论上都支持，

组件存在子标签组件，需要单独增加，比如： 选项组 NCheckboxGroup 嵌套 NCheckbox 等...
:::

```tsx
export type ComponentType =
  | 'NInput'
  | 'InputNumber'
  | 'NSelect'
  | 'NRadioGroup'
  | 'NCheckbox'
  | 'NCheckboxGroup'
  | 'NDatePicker'
  | 'NSwitch';
```

