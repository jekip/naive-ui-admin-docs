# 权限

项目中集成了三种权限处理方式：

1. 通过用户角色来过滤菜单(前端方式控制)，路由在前端配置，通过API返回角色过滤
2. 通过后台来动态生成路由表(后台方式控制)
3. 通过后台返回所有权限集合（包括菜单和按钮），前端固定路由，进行过滤

## 前端角色权限

**实现原理:** 在前端固定写死路由的权限，指定路由有哪些权限可以查看。只初始化通用的路由，需要权限才能访问的路由没有被加入路由表内。在登陆后或者其他方式获取用户角色后，通过角色去遍历路由表，获取该角色可以访问的路由表，生成路由表，再通过 `router.addRoutes` 添加到路由实例，实现权限的过滤。

**缺点:** 权限相对不自由，如果后台改动角色，前台也需要跟着改动。适合角色较固定的系统

#### 实现

在项目配置`projectSetting.ts`将系统内权限模式改为 `ROLE` 模式

```ts
const setting: setting = {
    //菜单权限模式 ROLE 前端固定角色  BACK 动态获取
    permissionMode: 'ROLE'
};
```

## 后台动态路由

**实现原理:** 在前端固定，路由表对应的组件映射map，通过API获取路由表，动态生成路由，再通过 `router.addRoutes` 添加到路由实例，实现权限的过滤。

**缺点:** 前端需要维护一个路由表，保持和后端一致，如果后台改动角色，前台也需要跟着改动。

#### 实现

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
            //这里配置父级路由需要哪些权限可访问 这里是子路由权限集合
            permission: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
            sort: 0,
        },
        children: [
            {
                path: 'console',
                name: `${routeName}_console`,
                meta: {
                    title: '主控台',
                    //配置该路由需要哪些权限可访问 这里是针对单个路由
                    permission: ['dashboard_console'],
                },
                component: () => import('@/views/dashboard/console/console.vue'),
            },
        ],
    },
];
export default routes;
```
::: warning 注意

后端接口返回的数据结构请参考，[/mock/user/menu.ts](https://github.com/jekip/naive-ui-admin.git/tree/main/mock/user/menu.ts) `menusList`

:::

## 通过所有权限

**实现原理:** 在前端固定路由表，并且配置路由所需的权限，实现权限的过滤。

**缺点:** 权限过多，不易维护，毕竟权限集合不在前端定义

**优点:** 简单，实用，菜单，按钮，等所有权限都可以通吃

#### 实现

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
            //这里配置父级路由需要哪些权限可访问 这里是子路由权限集合
            permission: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
            sort: 0,
        },
        children: [
            {
                path: 'console',
                name: `${routeName}_console`,
                meta: {
                    title: '主控台',
                    //配置该路由需要哪些权限可访问 这里是针对单个路由
                    permission: ['dashboard_console'],
                },
                component: () => import('@/views/dashboard/console/console.vue'),
            },
        ],
    },
];
export default routes;
```


## 细粒度权限

**函数方式**

[usePermission](https://github.com/jekip/naive-ui-admin.git/tree/main/src/hooks/web/usePermission.ts) 还提供了按钮级别的权限控制。

```vue
<template>
  <n-button v-if="hasPermission([RoleEnum.ADMIN, RoleEnum.NORMAL])">
    拥有[admin,normal]权限可见
  </n-button>
</template>
<script lang="ts">
  import { usePermission } from '@/hooks/web/usePermission';
  import { RoleEnum } from '@/enums/roleEnum';

  export default defineComponent({
    setup() {
      const { hasPermission } = usePermission();

      return { hasPermission, RoleEnum };
    },
  });
</script>
```

**指令方式**

::: tip

指令方式不能动态更改权限

:::

```html
@param seffect 'disabled' 禁用按钮 不传 默认移除按钮
<n-button v-permission="{action:['RoleEnum.ADMIN, RoleEnum.NORMAL'], effect:'disabled'}" type="primary" class="mx-4"> 拥有admin,normal角色权限可见</n-button>
```
