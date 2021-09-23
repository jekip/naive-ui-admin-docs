# BasicTable 表格组件
对 `Data Table` 组件进行封装

> 如果文档内没有，可以尝试在在线示例内寻找

## 基础使用

```vue
<template>
    <n-card :bordered="false" class="proCard">
        <BasicTable
            title="表格列表"
            titleTooltip="这是一个提示"
            :columns="columns"
            :request="loadDataTable"
            :row-key="(row) => row.id"
            ref="actionRef"
            :actionColumn="actionColumn"
            @update:checked-row-keys="onCheckedRow"
        >
            <template #toolbar>
                <n-button type="primary" @click="reloadTable">刷新数据</n-button>
            </template>
        </BasicTable>
    </n-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, h } from 'vue';
import { BasicTable, TableAction } from '@/components/Table';
import { getTableList } from '@/api/table/list';
import { columns } from './basicColumns';
import { useDialog, useMessage } from 'naive-ui';
export default defineComponent({
    components: { BasicTable },
    setup() {
        const message = useMessage();
        const dialog = useDialog();
        const actionRef = ref();
        const state = reactive({
            params: {
                pageSize: 5,
                name: 'xiaoMa',
            },
            actionColumn: {
                width: 150,
                title: '操作',
                dataIndex: 'action',
                fixed: 'right',
                align: 'center',
                render(record) {
                    return h(TableAction, {
                        style: 'button',
                        actions: createActions(record),
                    });
                },
            },
        });

        function createActions(record) {
            return [
                {
                    label: '删除',
                    icon: 'ic:outline-delete-outline',
                    onClick: handleDelete.bind(null, record),
                    // 根据业务控制是否显示 isShow 和 auth 是并且关系
                    ifShow: () => {
                        return true;
                    },
                    // 根据权限控制是否显示: 有权限，会显示，支持多个
                    auth: ['basic_list'],
                },
                {
                    label: '编辑',
                    onClick: handleEdit.bind(null, record),
                    ifShow: () => {
                        return true;
                    },
                    auth: ['basic_list'],
                },
            ];
        }

        const loadDataTable = async (params) => {
            const data = await getTableList(params);
            return data;
        };

        function onCheckedRow(rowKeys) {
            console.log(rowKeys);
        }

        function reloadTable() {
            actionRef.value.reload();
        }

        function handleDelete(record) {
            console.log(record);
            dialog.info({
                title: '提示',
                content: `您想删除${record.name}`,
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: () => {
                    message.success('删除成功');
                },
                onNegativeClick: () => {},
            });
        }

        function handleEdit(record) {
            console.log(record);
            message.success('您点击了编辑按钮');
        }

        return {
            ...toRefs(state),
            columns,
            actionRef,
            loadDataTable,
            onCheckedRow,
            reloadTable,
        };
    },
});
</script>
```

## 编辑单元格
```vue
<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @edit-end="editEnd"
      @edit-change="onEditChange"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, h } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from './CellColumns';
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const actionRef = ref();
      const currentEditKeyRef = ref('');
      const state = reactive({
        params: {
          pageSize: 5,
          name: 'xiaoMa',
        },
        actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          align: 'center',
          render(record) {
            return h(TableAction, {
              style: 'button',
              actions: createActions(record),
            });
          },
        },
      });

      function handleEdit(record) {
        currentEditKeyRef.value = record.key;
        record.onEdit?.(true);
      }

      function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = '';
        record.onEdit?.(false, false);
      }

      function onEditChange({ column, value, record }) {
        if (column.dataIndex === 'id') {
          record.editValueRefs.name4.value = `${value}`;
        }
        console.log(column, value, record);
      }

      async function handleSave(record: EditRecordRow) {
        const pass = await record.onEdit?.(false, true);
        if (pass) {
          currentEditKeyRef.value = '';
        }
      }

      function createActions(record) {
        if (!record.editable) {
          return [
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
          ];
        } else {
          return [
            {
              label: '保存',
              onClick: handleSave.bind(null, record),
            },
            {
              label: '取消',
              onClick: handleCancel.bind(null, record),
            },
          ];
        }
      }

      const loadDataTable = async (params) => {
        const data = await getTableList(params);
        return data;
      };

      function onCheckedRow(rowKeys) {
        console.log(rowKeys);
      }

      function reloadTable() {
        console.log(actionRef.value);
        actionRef.value.reload();
      }

      function editEnd({ record, index, key, value }) {
        console.log(value);
      }

      return {
        ...toRefs(state),
        columns,
        actionRef,
        loadDataTable,
        onCheckedRow,
        reloadTable,
        editEnd,
        onEditChange,
      };
    },
  });
</script>
```

## 编辑整行
```vue
<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @edit-end="editEnd"
      @edit-change="onEditChange"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, h } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from './rowColumns';
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const actionRef = ref();
      const currentEditKeyRef = ref('');
      const state = reactive({
        params: {
          pageSize: 5,
          name: 'xiaoMa',
        },
        actionColumn: {
          width: 150,
          title: '操作',
          key: 'action',
          fixed: 'right',
          align: 'center',
          render(record) {
            return h(TableAction, {
              style: 'button',
              actions: createActions(record),
            });
          },
        },
      });

      function handleEdit(record) {
        currentEditKeyRef.value = record.key;
        record.onEdit?.(true);
      }

      function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = '';
        record.onEdit?.(false, false);
      }

      function onEditChange({ column, value, record }) {
        if (column.dataIndex === 'id') {
          record.editValueRefs.name4.value = `${value}`;
        }
        console.log(column, value, record);
      }

      async function handleSave(record: EditRecordRow) {
        const pass = await record.onEdit?.(false, true);
        if (pass) {
          currentEditKeyRef.value = '';
        }
      }

      function createActions(record) {
        if (!record.editable) {
          return [
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
          ];
        } else {
          return [
            {
              label: '保存',
              onClick: handleSave.bind(null, record),
            },
            {
              label: '取消',
              onClick: handleCancel.bind(null, record),
            },
          ];
        }
      }

      const loadDataTable = async (params) => {
        const data = await getTableList(params);
        return data;
      };

      function onCheckedRow(rowKeys) {
        console.log(rowKeys);
      }

      function reloadTable() {
        console.log(actionRef.value);
        actionRef.value.reload();
      }
      
      function editEnd({ record, index, key, value }) {
        console.log(value);
      }
      
      return {
        ...toRefs(state),
        columns,
        actionRef,
        loadDataTable,
        onCheckedRow,
        reloadTable,
        editEnd,
        onEditChange,
      };
    },
  });
</script>
```

## 支持编辑组件
```ts
import {
    NInput,
    NSelect,
    NCheckbox,
    NInputNumber,
    NSwitch,
    NDatePicker,
    NTimePicker,
} from 'naive-ui';
```

## Props

::: tip 温馨提醒

- 除以下参数外，官方文档内的 props 也都支持，具体可以参考 [Data Table](https://www.naiveui.com/zh-CN/os-theme/components/data-table)
:::

| 属性                    | 类型                                               | 默认值  | 可选值 | 说明                                                                                            | 版本 |
| ----------------------- | -------------------------------------------------- | ------- | ------ | ----------------------------------------------------------------------------------------------- | ---- |
| title                   | `string`                                           | `null`  | -      | 表格标题
| titleTooltip            | `string`                                           | `null`  | -      | 表格标题右侧温馨提醒
| tableData               | `any[]`                                            | `-`     | -      | 表格数据
| request                 | `function`                                         | `-`     | -      | 请求接口，如数据不需要二次处理，可以直接将src/api内的函数直接传入
| pagination              | `any`                                              | -       | -      | 分页信息配置，为 `false` 不显示分页
| canResize               | `boolean`                                          | `true`  | -      | 是否可以自适应高度
| resizeHeightOffset      | `number`                                           | 0       | -      | 表格自适应高度计算结果会减去这个值
| actionColumn            | `object`                                           | `-`     | -      | 操作列按钮，用`render` 配合`TableAction`实现，参考以上基础表格示例

## column

除 参考官方 [Column 配置](https://www.naiveui.com/zh-CN/os-theme/components/data-table)外，扩展以下参数

| 属性               | 类型                                                      | 默认值  | 可选值 | 说明                     |
| ------------------ | --------------------------------------------------------- | ------- | ------ | ------------------------ |
| helpMessage        | `string｜string[]`                                        | -       | -      | 列头右侧帮助文本         |
| edit               | `boolean`                                                 | -       | -      | 是否开启单元格编辑       |
| editRow            | `boolean`                                                 | -       | -      | 是否开启行编辑           |
| editable           | `boolean`                                                 | false   | -      | 是否处于编辑状态         |
| editComponent      | `ComponentType`                                           | `Input` | -      | 编辑组件                 |
| editComponentProps | `any`                                                     | -       | -      | 对应编辑组件的 props     |
| editRule           | `((text: string, record: Recordable) => Promise<string>)` | -       | -      | 对应编辑组件的表单校验   |
| editValueMap       | `(value: any) => string`                                  | -       | -      | 对应单元格值枚举         |
| onEditRow          | `（）=>void`                                               | -       | -      | 触发行编辑               |
| auth               | `RoleEnum` ｜ `RoleEnum[]` ｜ `string` ｜ `string[]`       | -       | -      | 根据权限编码来控制当前列是否显示    |
| ifShow             | `boolean ｜ ((action: ActionItem) => boolean)`            | -       | -      | 根据业务状态来控制当前列是否显示    |


### tableAction
```ts
{
  // 按钮列表
  actions: Array;
  // 按钮风格 可选 `button`, `text`
  style?: String;
  // 更多按钮列表
  dropDownActions?: Array;
  // 更多按钮选择之后回调事件
  select?: Function;
}
```
### tableAction.actions
```ts
{
    //按钮点击
    onClick?: Fn;
    //按钮文字
    label?: string;
    //主题
    color?: 'success' | 'error' | 'warning';
    //图标，暂未实现
    icon?: string;
    //禁用
    disabled?: boolean;
    // 权限编码控制是否显示
    auth?: RoleEnum | RoleEnum[] | string | string[];
    // 业务控制是否显示
    ifShow?: boolean | ((action: ActionItem) => boolean);
}
```

## 事件

::: tip 温馨提醒

除以下事件外，官方文档内的 event 也都支持，具体可以参考 [Data Table](https://www.naiveui.com/zh-CN/os-theme/components/data-table)

:::

| 事件             | 回调参数                                | 说明                                |
| ---------------- | --------------------------------------- | ----------------------------------- |
| fetch-success    | `Function({items,total})`               | 接口请求成功后触发                  |
| fetch-error      | `Function(error)`                       | 错误信息                            |
| edit-end         | `Function({record, index, key, value})` | 单元格编辑完成触发                  |
| edit-cancel      | `Function({record, index, key, value})` | 单元格取消编辑触发                  |
| edit-row-end     | `Function()`                            | 行编辑结束触发                      |
| edit-change      | `Function({column,value,record})`       | 单元格编辑组件的 value 发生变化时触发 |

::: tip edit-change 说明

对于 `edit-change` 事件，`record` 中的 `editValueRefs` 装载了当前行的所有编辑组件（如果有的话）的值的 `ref` 对象，可用于处理同一行中的编辑组件的联动。请看下面的例子

:::

```javascript
      function onEditChange({ column, record }) {
        // 当同一行的单价或者数量发生变化时，更新合计金额（三个数据均为当前行编辑组件的值）
        if (column.dataIndex === 'qty' || column.dataIndex === 'price') {
          const { editValueRefs: { total, qty, price } } = record;
          total.value = unref(qty) * unref(price);
        }
      }
```

## Slots

::: tip 温馨提醒

除以下参数外，官方文档内的 slot 也都支持，[Data Table](https://www.naiveui.com/zh-CN/os-theme/components/data-table)

:::

| 名称              | 说明             |  版本  |
| ----------------- | ---------------- | -- |
| tableTitle        | 表格顶部左侧区域 |  |
| toolbar           | 表格顶部右侧区域 |  |

