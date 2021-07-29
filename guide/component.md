# 组件注册

## 按需引入

项目目前用到的组件，都在这引入了，需要其他的在这加即可 [src/plugins/naive.ts](https://github.com/jekip/naive-ui-admin.git/tree/main/src/plugins/naive.ts)。

```ts
import { NMenu } from 'naive-ui';
const naive = create({
    components: [
        NMenu
    ]
})
```

## tsx 文件注册

**tsx 文件内不能使用全局注册组件**

```jsx
import { NMenu } from 'naive-ui';

export default defineComponent({
  setup() {
    return () => (
      <NMenu />
    );
  },
});
```

## 全局注册

如果不习惯按需引入方式，可以进行全局注册，可参考一下官网文档。

```ts
import { createApp } from 'vue'
import naive from 'naive-ui'

const app = createApp(App)
app.use(naive)
```
