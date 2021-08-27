import { useDark } from '@vueuse/core';

export const isDark = useDark({
  storageKey: 'naive-ui-admin-color-scheme',
  valueLight: 'light',
});
