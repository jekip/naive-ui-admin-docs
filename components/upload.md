# BasicUpload 图片上传
对 `upload` 组件进行封装

> 如果文档内没有，可以尝试在在线示例内寻找

## 基础使用

```vue
<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="上传图片"> 上传图片，用于向用户收集图片信息 </n-card>
    </div>
    <n-card :bordered="false" class="proCard mt-4">
      <n-grid cols="2 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            :label-width="80"
            :model="formValue"
            :rules="rules"
            label-placement="left"
            ref="formRef"
            class="py-8"
          >
            <n-form-item label="预约姓名" path="name">
              <n-input v-model:value="formValue.name" placeholder="输入姓名" />
            </n-form-item>
            <n-form-item label="预约号码" path="mobile">
              <n-input placeholder="电话号码" v-model:value="formValue.mobile" />
            </n-form-item>

            <n-form-item label="病例图片" path="images">
              <BasicUpload
                :action="`${uploadUrl}/v1.0/files`"
                :headers="uploadHeaders"
                :data="{ type: 0 }"
                name="files"
                :width="100"
                :height="100"
                @uploadChange="uploadChange"
                v-model:value="formValue.images"
                helpText="单个文件不超过2MB，最多只能上传10个文件"
              />
            </n-form-item>
            <div style="margin-left: 80px">
              <n-space>
                <n-button type="primary" @click="formSubmit">提交预约</n-button>
                <n-button @click="resetForm">重置</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, reactive, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicUpload } from '@/components/Upload';
  import { useGlobSetting } from '@/hooks/setting';
  const globSetting = useGlobSetting();
  const rules = {
    name: {
      required: true,
      message: '请输入预约姓名',
      trigger: 'blur',
    },
    remark: {
      required: true,
      message: '请输入预约备注',
      trigger: 'blur',
    },
    images: {
      required: true,
      type: 'array',
      message: '请上传病例图片',
      trigger: 'change',
    },
  };
  export default defineComponent({
    components: { BasicUpload },
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const { uploadUrl } = globSetting;

      const state = reactive({
        formValue: {
          name: '',
          mobile: '',
          //图片列表 通常查看和编辑使用 绝对路径 | 相对路径都可以
          images: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
        },
        uploadHeaders: {
          platform: 'miniPrograms',
          timestamp: new Date().getTime(),
          token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
        },
      });

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('验证成功');
          } else {
            message.error('验证失败，请填写完整信息');
          }
        });
      }

      function resetForm() {
        formRef.value.restoreValidation();
      }

      function uploadChange(list: string[]) {
        state.formValue.images = unref(list);
      }

      return {
        ...toRefs(state),
        formRef,
        uploadUrl,
        rules,
        formSubmit,
        resetForm,
        uploadChange,
      };
    },
  });
</script>
```

## Props

::: tip 温馨提醒

- 除以下参数外，官方文档内的 props 也都支持，具体可以参考 [Upload](https://www.naiveui.com/zh-CN/os-theme/components/upload)
  :::

| 属性                    | 类型                                               | 默认值  | 可选值 | 说明                                                                                            | 版本 |
| ----------------------- | -------------------------------------------------- | ------- | ------ | ----------------------------------------------------------------------------------------------- | ---- |
| accept                  | `string`                                           | `.jpg,.png,.jpeg,.svg,.gif`  | -      | 可接受图片类型
| helpText                | `string`                                           | `null`  | -      | 帮助提示文本
| maxSize                 | `number`                                           | `2`     | -      | 图片单张大小 默认2，单位M
| maxNumber               | `infinity`                                         | `-`     | -      | 最大可上传图片张数
| value                   | `any[]`                                            | -       | -      | 默认显示图片列表
| width                   | `number`                                           | `104`   | -      | 图片列表-宽度
| height                  | `number`                                           | `104`   | -      | 图片列表-高度


## 事件

::: tip 温馨提醒

除以下事件外，官方文档内的 event 也都支持，具体可以参考 [Upload](https://www.naiveui.com/zh-CN/os-theme/components/upload)

:::

| 事件             | 回调参数                                | 说明                                |
| ---------------- | --------------------------------------- | ----------------------------------- |
| uploadChange     | `Function(fileList)`                    | 接口请求成功后触发                  |
| delete           | `Function(fileList)`                    | 删除图片后触发                      |
