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
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'
    }],
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
      name: 'mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    // 百度统计
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?b12064005b3a968695be09e7a30b8c26";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
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
          // text值必须与首页的关键字一致，这里也作为链接和关键字的映射
          { text: 'HTML5', link: '/article/html5/' },
          { text: 'CSS3', link: '/article/css/' },
          { text: 'JavaScript', link: '/article/javascript/' },
          { text: 'TypeScript', link: '/article/typescript/' },
          { text: 'Web技术', link: '/article/web/' },
          { text: 'Vue', link: '/article/vue/' },
          { text: '代码设计', link: '/article/codeDesign/' },
          { text: '代码性能', link: '/article/codePerformance/' },
          { text: '工具', link: '/article/tool/' },
        ]
      },
      {
        text: 'Github',
        link: 'https://github.com/muzhidong'
      },
      {
        text: 'NPM',
        link: 'https://www.npmjs.com/~muzhidong'
      },
      {
        text: '小程序',
        customType: 'image',
        src: '/miniapp.jpg'
      },
      {
        text: '公众号',
        customType: 'image',
        src: '/officialAccount.jpg'
      },
    ],
    sidebar: {
      '/article/html5/': [        
        '',
        'Canvas应用',
        'HTML元素大杂烩',
        'HTML5系列之语义篇',
        'HTML5系列之存储篇上',
        'HTML5系列之存储篇下',
        'HTML5系列之连接篇上',
        'HTML5系列之性能篇',
      ],
      '/article/css/': [
        '',
        '来次Sass与Less的碰撞',
        'CSS快速入门篇上',
        'CSS快速入门篇中',
        'CSS快速入门篇下',
        'CSS3你知道有多少',
        'CSS查漏补缺',
        'CSS Houdini',
        'CSS规则集',
        'CSS伪类集锦',
        'CSS伪元素集锦',
        'CSS函数集锦',
        'CSS规范',
        'CSS安全漏洞',
        'UI设计',
      ],
      '/article/javascript/': [
        '',
        'ES系列——Generator函数与Async函数',
        'ES系列——模块化规范与ES6模块',
      ],
      '/article/typescript/': [
        '',
        'TypeScript基础篇下',
      ],
      '/article/web/': [
        '',
        'SEO初识'
      ],
      '/article/vue/': [
        '',
      ],
      '/article/codeDesign/': [
        '',
        '快速搭建脚手架',
        '富文本编辑器支持小程序跳转',
        '浅记需求开发中一次代码优化过程',
        '代码片段欣赏',
      ],
      '/article/codePerformance/': [
        '',
        '干货！页面响应13条性能优化规则',
        '高性能网站建设进阶指南上篇',
      ],
      '/article/tool/': [
        '',
        '工具篇——Hexo基础',
        '工具篇——使用Hexo在Github快速建站',
        '工具篇——VuePress建站',
        '工具篇——VSCode你知多少',
        '工具篇——Postman如何作并发请求',
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
    require('./plugins/vconsole-plugin'),
  ],

  markdown: {
    // 显示目录
    toc: {
      includeLevel: [1, 2, ]
    },
    lineNumbers: true
  },

  // 继承主题进行扩展
  extend: '@vuepress/theme-default',

  // 打包路径
  dest: './dist',
}
