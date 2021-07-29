# 滑块验证码
说明： 滑块验证码组件常用于各种表单提交前的验证。

## 基础效果

```vue
<template>
    <mi-captcha></mi-captcha>
</template>
```

## 自定义背景

```vue
<template>
    <mi-captcha image="/@images/bg.jpg"></mi-captcha>
</template>
```

## 自定义主题色

```vue
<template>
    <mi-captcha theme-color="#2F9688"></mi-captcha>
</template>
```

## 开启弹窗前的校验
#### 可以用于后端校验用户操作行为，确认是否弹窗进行校验。

```vue
<template>
    <mi-captcha check-action="v1/captcha/check"></mi-captcha>
</template>
```

## 结合远程校验
#### 可结合initAction验证码初始化接口

```vue
<template>
    <mi-captcha check-action="v1/captcha/check"></mi-captcha>
</template>
```

## Props

::: tip 温馨提醒

- 除以下参数外，官方文档内的 props 也都支持，具体可以参考 [Upload](https://www.naiveui.com/zh-CN/os-theme/components/upload)
  :::

| 属性                    | 类型                                               | 默认值  | 可选值 | 说明                                                                                            | 版本 |
| ----------------------- | -------------------------------------------------- | ------- | ------ | ----------------------------------------------------------------------------------------------- | ---- |
| width                   | `number,string`                                    | `-`     | -      | 宽度
| height                  | `number,string`                                    | `-`     | -      | 高度
| radius                  | `number`                                           | `42px`  | -      | 圆角弧度
| themeColor              | `string`                                           | `42px`  | -      | 主题色
| logo                    | `string`                                           | `-`     | -      | Logo 图标地址
| bgColor                 | `string`                                           | `-`     | -      | 初始框的背景色
| borderColor             | `string`                                           | `-`     | -      | 初始框的边框颜色
| textColor               | `string`                                           | `-`     | -      | 初始框的文本颜色
| boxShadow               | `boolean`                                          | `true`  | -      | 是否显示初始框的阴影效果
| boxShadowColor          | `string`                                           | `-`     | -      | 初始框阴影效果的颜色值
| boxShadowBlur           | `number`                                           | `4`     | -      | 初始框的阴影效果模糊级数
| modalBgColor            | `string`                                           | `-`     | -      | 验证码弹窗的背景色
| modalBoxShadow          | `boolean`                                          | `true`  | -      | 是否显示验证码弹窗的阴影效果
| modalBoxShadowBlur      | `number`                                           | `-`     | -      | 验证码弹窗的阴影效果的模糊级数
| image                   | `string`                                           | `-`     | -      | 验证码弹窗背景图地址
| maxTries                | `string`                                           | `5`     | -      | 单次验证最大尝试次数若还未匹配成功，则自动关闭
| mask                    | `boolean`                                          | `true`  | -      | 是否显示遮罩
| maskClosable            | `boolean`                                          | `true`  | -      | 点击遮罩是否可关闭
| initParams              | `object`                                           | `-`     | -      | 初始化参数
| initAction              | `string`                                           | `-`     | -      | 初始化接口地址
| checkAction             | `string`                                           | `-`     | -      | 辅助校验的接口地址比如检测设备等其它辅助校验
| verifyParams            | `object`                                           | `-`     | -      | 二次校验的参数
| verifyAction            | `object`                                           | `-`     | -      | 二次校验的接口地址即拼合成功后的二次校验


## 事件

| 事件             | 回调参数                                | 说明                                |
| ---------------- | --------------------------------------- | ----------------------------------- |
| onCaptchaInit     | `Function()`                    | 验证码初始化成功后的回调               |
| onCaptchaChecked  | `Function()`                    | 验证码辅助校验成功后的回调             |
| onCaptchaSuccess  | `Function()`                    | 验证码辅助校验成功后的回调             |
