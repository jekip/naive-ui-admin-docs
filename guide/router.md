# 路由

项目路由配置存放于 [src/router](https://github.com/jekip/naive-ui-admin/tree/main/src/router) 下面。 [src/router/modules](https://github.com/jekip/naive-ui-admin.git/tree/main/src/router/modules)用于存放路由模块，在该目录下的文件会自动注册。

## 配置

### 模块说明

在 [src/router/modules](https://github.com/jekip/naive-ui-admin.git/tree/main/src/router/modules) 内的 `.ts` 文件会被视为一个路由模块。

一个路由模块包含以下结构

```ts
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DashboardOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'dashboard';

const routes: Array<RouteRecordRaw> = [
    { 
        path: '/dashboard',
        name: routeName,
        redirect: '/dashboard/console',
        component: Layout,
        meta: {
            title: 'Dashboard',
            icon: renderIcon(DashboardOutlined),
            permission: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
            sort: 0,
        },
        children: [
            {
                path: 'console',
                name: `${routeName}_console`,
                meta: {
                    title: '主控台',
                    permission: ['dashboard_console'],
                },
                component: () => import('@/views/dashboard/console/console.vue'),
            },
            {
                path: 'workplace',
                name: `${routeName}_workplace`,
                meta: {
                    title: '工作台',
                    keepAlive: true,
                    permission: ['dashboard_workplace'],
                },
                component: () => import('@/views/dashboard/workplace/workplace.vue'),
            },
        ],
    },
];
export default routes;
```

### 多级路由

::: warning 注意事项

- 整个项目所有路由 `name` 不能重复
- 除了 layout 对应的 path 前面需要加 `/`，其余子路由都不要以`/`开头

:::

**示例**

```ts
import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/constant';
import { WalletOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'comp';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/comp',
        name: routeName,
        component: Layout,
        redirect: '/comp/table',
        meta: {
            title: '组件示例',
            icon: renderIcon(WalletOutlined),
            sort: 8,
        },
        children: [
            {
                path: 'table',
                name: `${routeName}_table`,
                redirect: '/comp/table/basic',
                component: ParentLayout,
                meta: {
                    title: '表格',
                },
                children: [
                    {
                        path: 'basic',
                        name: `${routeName}_table_basic`,
                        meta: {
                            title: '基础表格',
                        },
                        component: () => import('@/views/comp/table/basic.vue'),
                    },
                    {
                        path: 'editCell',
                        name: `${routeName}_table_editCell`,
                        meta: {
                            title: '单元格编辑',
                        },
                        component: () => import('@/views/comp/table/editCell.vue'),
                    },
                    {
                        path: 'editRow',
                        name: `${routeName}_table_editRow`,
                        meta: {
                            title: '整行编辑',
                        },
                        component: () => import('@/views/comp/table/editRow.vue'),
                    },
                ],
            },
            {
                path: 'upload',
                name: `${routeName}_upload`,
                meta: {
                    title: '上传',
                },
                component: () => import('@/views/comp/upload/index.vue'),
            },
        ],
    },
];
export default routes;
```

### Meta 配置说明

```ts
export interface RouteMeta {
  //菜单名称 一般必填
  title: string;
  //禁用菜单
  disabled:boolean;
  // 菜单图标  
  icon: VNode;
  //缓存该路由
  keepAlive: boolean;
  //排序越小越排前
  sort: number;
}
```

## 图标

为了简化使用，只需用renderIcon(WalletOutlined)方法，传入 [xicons](https://www.xicons.org/) 中图标即可

## 新增路由

### 如何新增一个路由模块

1. 在 [src/router/modules](https://github.com/jekip/naive-ui-admin.git/tree/main/src/router/modules) 内新增一个模块文件。

示例，新增 test.ts 文件

```ts
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/result',
        name: 'Result',
        redirect: '/result/success',
        component: Layout,
        meta: {
            title: '结果页面',
            icon: renderIcon(CheckCircleOutlined),
            sort: 4,
        },
        children: [
            {
                path: 'success',
                name: 'result-success',
                meta: {
                    title: '成功页',
                },
                component: () => import('@/views/result/success.vue'),
            },
        ],
    },
];
export default routes;
```

此时路由已添加完成，不需要手动引入，放在[src/router/modules](https://github.com/jekip/naive-ui-admin.git/tree/main/src/router/modules) 内的文件会自动被加载。

### 验证

访问 **ip:端口/result/success** 出现对应组件内容即代表成功

## 路由刷新

项目中采用的是**重定向**方式

### 实现

```ts
import { useRoute } from 'vue-router';
const route = useRoute();
router.push({
    path: '/redirect' + unref(route).fullPath,
});
```

### Redirect

[src/views/redirect/index.vue](https://github.com/jekip/naive-ui-admin.git/tree/main/src/views/redirect/index.vue)

```ts
import { defineComponent, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NEmpty } from 'naive-ui';

export default defineComponent({
    name: 'Redirect',
    setup() {
        const route = useRoute();
        const router = useRouter();
        onBeforeMount(() => {
            const { params, query } = route;
            const { path } = params;
            router.replace({
                path: '/' + (Array.isArray(path) ? path.join('/') : path),
                query,
            });
        });
        return () => <NEmpty />;
    },
});
```

## 外联
你也可以在侧边栏中配置一个外链，只要你在 name 中填写了合法的 url 路径，当你点击侧边栏的时候就会帮你新开这个页面。

```ts
{
    path: '/external',
    name: 'https://jekip.github.io/docs/',
    meta: {
        title: '文档地址',
        icon: renderIcon(CheckCircleOutlined),
        sort: 4,
    }
}
```
::: warning 注意事项
- `path` 不能为链接，必须为 `/` 开头字符串
- 子路由都不要以`/`开头，跳转外部地址，只需把 `name` 填写完整网址即可
:::

### 如何开启单个页面缓存

开启缓存有 3 个条件

1. 在router中meta内将`keepAlive` 设置为 `true`
2. 路由设置 `name`，且**不能重复**
3. 路由对应的组件加上 `name`，与路由设置的 `name` 保持一致

```ts
 {
   ...,
    // name
    name: 'Login',
    // 对应组件组件的name
    component: () => import('@/views/login/index.vue'),
    ...
  },

  // @/views/login/index.vue
  export default defineComponent({
    // 需要和路由的name一致
    name:"Login"
  });
```

:::warning 注意

keep-alive 生效的前提是：需要将路由的 `name` 属性及对应的页面的 `name` 设置成一样。因为：

**include - 字符串或正则表达式，只有名称匹配的组件会被缓存**
:::
