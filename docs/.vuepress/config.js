module.exports = {

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '大猿猴的前端世界',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: '欢迎来到我的前端世界',

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
        text: '文章',
        link: '/article/',
      },
      {
        text: '关于我',
        link: '/more/'
      },
    ],
    sidebar: {
      '/article/': [{
        title: '',
        collapsable: false,
        children: [
          '',
          'HTML5系列——存储上',
          'HTML5系列——存储下',
          'HTML5系列——video实现简易版弹幕视频',
          'HTML5系列——Canvas应用',
          'CSS3系列——CSS3动画实现3D倒计时',
          'ES系列——Promise基础',
          'ES系列——Generator函数与Async函数',
          'ES系列——模块化规范与ES6模块',
          'Web技术系列——BOM基础',
          '工具篇——markdown入门',
          '工具篇——Hexo基础',
          '工具篇——使用Hexo在Github快速建站',
          '工具篇——VuePress建站',
          '工具篇——VSCode如何一键生成模板',
          '工具篇——Postman如何作并发请求',
        ]
      }],
    },
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