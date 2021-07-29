# 引入外部模块

除了自带组件以外，有时我们还需要引入其他外部模块。我们以 `makeit-captcha` 为例：

## 安装

安装 `makeit-captcha`

```bash
# 在终端输入下面的命令完成安装
yarn add makeit-captcha
```

## 使用

### 全局使用

```ts
import { createApp } from 'vue';
import App from './App.vue';
import MakeitCaptcha from 'makeit-captcha';
import 'makeit-captcha/dist/captcha.min.css';
const app = createApp(App);
app.use(MakeitCaptcha);
app.mount('#app');
```

### 局部使用

```vue
<template>
  <Button>text</Button>
</template>

<script>
  import { defineComponent } from 'vue';
  import MakeitCaptcha from 'makeit-captcha';
  export default defineComponent({
    components: { 
        MakeitCaptcha,
    },
  });
</script>
```

## 注意

- 如果组件有依赖样式，则需要再引入样式文件
