# BasicModal 弹窗扩展
对 `Modal` 组件进行封装

> 如果文档内没有，可以尝试在在线示例内寻找

## 基础使用

```vue
<template>
    <n-button type="primary" @click="showModal">打开Modal</n-button>
    <basicModal @register="modalRegister" ref="modalRef" class="basicModal" @on-ok="okModal">
        <template #default>
            <p>我是弹窗内容</p>
        </template>
    </basicModal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { basicModal, useModal } from '@/components/Modal';
export default defineComponent({
    components: { basicModal },
    setup() {
        const [modalRegister, { openModal, closeModal }] = useModal({
            title: '新增预约',
        });

        async function okModal() {
           closeModal();
        }

        function showModal() {
            openModal();
        }
        
        return {
            modalRegister,
            okModal,
            showModal
        }
    }
})
</script>
```

## Props

::: tip 温馨提醒

- 除以下参数外，官方文档内的 props 也都支持，具体可以参考 [Modal | Dialog](https://www.naiveui.com/zh-CN/os-theme/components/modal)
  :::

| 属性                    | 类型                                               | 默认值  | 可选值 | 说明                                                                                            | 版本 |
| ----------------------- | -------------------------------------------------- | ------- | ------ | ----------------------------------------------------------------------------------------------- | ---- |
| title                   | `string`                                           | -       | -      | 弹窗标题
| subBtuText              | `string`                                           | `确认`   | -      | 确认按钮文字


## 事件

| 事件             | 回调参数                                | 说明                                |
| ---------------- | --------------------------------------- | ----------------------------------- |
| setProps         | `Function(props)`                       | 设置组件内部参数-参考官方UI文档        |
| openModal        | `Function()`                            | 打开弹窗                             |
| closeModal       | `Function()`                            | 关闭弹窗                             |
| setSubLoading    | `Function()`                            | 设置确定按钮loading状态              |
