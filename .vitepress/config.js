// @ts-check
/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  base: '/',
  dest: '/',
  title: 'Naive-Ui-Admin',
  lang: 'zh-CN',
  description: '一个开箱即用的前端框架',
  head: createHead(),
  themeConfig: {
    repo: 'jekip/naive-ui-admin',
    docsRepo: 'jekip/naive-ui-admin-docs',
    logo: '/logo.png',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: '为此页提供修改建议',
    nav: createNav(),
    sidebar: createSidebar(),
  },
};

/**
 * @type {()=>import('vitepress').HeadConfig[]}
 */

function createHead() {
  return [
    ['meta', { name: 'author', content: 'Vbenjs Team' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'vben, vitejs, vite, ant-design-vue, vue',
      },
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
    ],
    ['meta', { name: 'keywords', content: 'vue vben admin docs' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ];
}

/**
 * @type {()=>import('./theme-default/config').DefaultTheme.NavItem[]}
 */
function createNav() {
  return [
    {
      text: '指南',
      link: '/guide/introduction'
    },
    {
      text: '组件',
      link: '/components/',
      items: [
        {
          text: '常用组件',
          link: '/components/table',
        }
      ],
    },
    {
      text: '相关链接',
      items: [
        {
          text: '在线预览',
          link: 'https://jekip.github.io/',
        },
        {
          text: '文档源码',
          link: 'https://github.com/jekip/naive-ui-admin-docs',
        },
        {
          text: '更新日志',
          link: 'https://github.com/jekip/naive-ui-admin/blob/main/CHANGELOG.md',
        },
      ],
    },
    {
      text: '赞助',
      link: '/other/donate',
    },
  ];
}

function createSidebar() {
  return {
    '/components/': [
      {
        text: '常用组件',
        children: [
          {
            text: '表单',
            link: '/components/form',
          },
          {
            text: '表格',
            link: '/components/table',
          },
          {
            text: '图片上传',
            link: '/components/upload',
          },
          {
            text: '滑块验证码',
            link: '/components/market-captcha',
          },
          {
            text: '弹窗',
            link: '/components/modal',
          }
        ],
      },
    ],
    '/': [
      {
        text: '基础',
        children: [
          {
            text: '介绍',
            link: '/guide/introduction',
          },
          {
            text: '开始',
            link: '/guide/',
          },
          {
            text: '项目配置',
            link: '/guide/settings',
          },
          {
            text: '路由',
            link: '/guide/router',
          },
          {
            text: '权限',
            link: '/guide/auth',
          },
          {
            text: 'Mock&联调',
            link: '/guide/mock',
          },
          {
            text: '组件注册',
            link: '/guide/component',
          },
          {
            text: '样式',
            link: '/guide/design',
          },
          {
            text: '外部模块',
            link: '/guide/lib',
          },
          {
            text: '构建&部署',
            link: '/guide/deploy',
          },
        ],
      }
    ],
  };
}
