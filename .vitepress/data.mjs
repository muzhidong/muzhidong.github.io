import {
  transformSideBars,
  transformArticleNav
} from './utils/index.mjs'

// head配置
const h = [
  ['link', {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon.ico',
  }],
  ['meta', {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'
  }],
  ['meta', {
    name: 'mobile-web-app-capable',
    content: 'yes'
  }],
  ['meta', {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'black'
  }]
]
if (process.env.NODE_ENV === 'production') {
  // 百度统计
  h.push(['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?b12064005b3a968695be09e7a30b8c26";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  `])
}
export const head = h

// 用于系列文章导航、侧边栏
const articles = [
  {
    name: 'HTML',
    pathPrefix: 'html',
    items: [
      'video实现简易版弹幕视频',
      'Canvas应用',
      'HTML元素大杂烩',
      'HTML5系列之语义篇',
      'HTML5系列之存储篇上',
      'HTML5系列之存储篇下',
      'HTML5系列之连接篇上',
      'HTML5系列之性能篇',
      'SVG入门',
      'MathML入门'
    ]
  },
  {
    name: 'CSS',
    pathPrefix: 'css',
    items: [
      'CSS3动画实现3D倒计时',
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
    ]
  },
  {
    name: 'JavaScript',
    pathPrefix: 'javascript',
    items: [
      'ES6系列之Promise基础',
      'ES6系列之Generator函数与Async函数',
      'ES6系列之模块化',
    ]
  },
  {
    name: 'TypeScript',
    pathPrefix: 'typescript',
    items: [
      'TypeScript基础篇上',
      'TypeScript基础篇下',
    ]
  },
  {
    name: 'Web技术',
    pathPrefix: 'web',
    items: [
      'BOM基础',
      'SEO初识'
    ]
  },
  {
    name: 'Vue',
    pathPrefix: 'vue',
    items: [
      '自定义指令之水平循环滚动',
    ]
  },
  {
    name: '浏览器',
    pathPrefix: 'browser',
    items: [
      '兼容性',
    ]
  },
  {
    name: '代码设计',
    pathPrefix: 'codeDesign',
    items: [
      '手把手带你实现LRU、双队列缓存',
      '快速搭建脚手架',
      '富文本编辑器支持小程序跳转',
      '浅记需求开发中一次代码优化过程',
      '代码片段欣赏',
    ]
  },
  {
    name: '代码性能',
    pathPrefix: 'codePerformance',
    items: [
      '页面加载优化实践',
      '干货！页面响应13条性能优化规则',
      '高性能网站建设进阶指南上篇',
    ]
  },
  {
    name: '工具',
    pathPrefix: 'tool',
    items: [
      'Markdown入门',
      'Hexo基础',
      'Hexo建站部署Github',
      'VuePress建站',
      'VSCode你知多少',
      'Postman如何作并发请求',
      '工具大集合',
      '资源集锦'
    ]
  },
]

// nav配置
export const nav = [
  {
    text: '系列文章',
    items: transformArticleNav(articles)
  },
  {
    text: '设计模式',
    link: '/designMode'
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
  }
]

// sidebar配置
export const sidebar = transformSideBars(articles)
