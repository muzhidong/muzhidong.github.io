module.exports = {

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '大猿猴的前端世界',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: '一名前端程序猿，目前正在一点点地进步，希望有一天能够在IT行业找到自我的价值。',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', {
      rel: 'icon',
      type: 'image/x-icon',
      href: './favicon.ico',
    }],
    ['meta', {
      name: 'theme-color',
      content: '#1890ff'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    logo: '/logo.png',
    nav: [{
        text: '系列文章',
        items: [
          { text: 'HTML5', link: '/article/html5/' },
          { text: 'CSS', link: '/article/css/' },
          { text: 'JavaScript', link: '/article/javascript/' },
          { text: 'Web技术', link: '/article/web/' },
          { text: '代码设计', link: '/article/codeDesign/' },
          { text: '工具', link: '/article/tool/' },
        ]
      },
      {
        text: 'Github',
        link: 'https://github.com/muzhidong'
      },
    ],
    sidebar: {
      '/article/html5/': [        
        '',
        'HTML5系列——语义',
        'HTML5系列——存储上',
        'HTML5系列——存储下',
        'HTML5系列——Canvas应用',
      ],
      '/article/css/': [
        '',
        'CSS系列——来次Sass与Less的碰撞',
      ],
      '/article/javascript/': [
        '',
        'ES系列——Generator函数与Async函数',
        'ES系列——模块化规范与ES6模块',
      ],
      '/article/web/': [
        '',
      ],
      '/article/codeDesign/': [
        ''
      ],
      '/article/tool/': [
        '',
        '/article/tool/工具篇——Hexo基础',
        '/article/tool/工具篇——使用Hexo在Github快速建站',
        '/article/tool/工具篇——VuePress建站',
        '/article/tool/工具篇——VSCode如何一键生成模板',
        '/article/tool/工具篇——Postman如何作并发请求',
      ],
    },
    collapsable: false,
    sidebarDepth: 2,
    smoothScroll: true,
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],

  markdown: {
    // 显示目录
    toc: {
      includeLevel: [1, 2, ]
    }
  },

  // 继承主题进行扩展
  extend: '@vuepress/theme-default',

  // 打包路径
  dest: './dist',
}
