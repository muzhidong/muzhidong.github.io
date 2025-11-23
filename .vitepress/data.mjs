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
const frontEndArticles = [
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
      'HTML5系列之连接篇下',
      'HTML5系列之性能篇',
      'HTML5系列之媒体篇',
      'HTML5系列之硬件篇',
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
      'JavaScript基础上篇',
      'JavaScript基础中篇',
      'JavaScript基础下篇',
      '面向对象编程篇',
      '函数式编程篇',
      'ES6上篇',
      'ES6中篇',
      'ES6下篇',
      'ES6系列之Promise基础',
      'ES6系列之Generator函数与Async函数',
      'ES6系列之模块化',
      'ES6+新特性你知道多少',
    ]
  },
  {
    name: 'TypeScript',
    pathPrefix: 'typescript',
    items: [
      'TypeScript基础篇上',
      'TypeScript基础篇下',
      'TypeScript查漏补缺',
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
      '你知道浏览器多少',
      '初识V8',
      "带你了解浏览器渲染过程",
      '浏览器兼容性处理',
    ],
    filter: true
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
    name: '工具资源',
    pathPrefix: 'tool',
    items: [
      'Markdown入门',
      'Hexo基础',
      'Hexo建站部署Github',
      'VuePress建站',
      'VSCode你知多少',
      'Postman如何作并发请求',
      '工具大集合',
      '资源集锦',
      '前端技术文档归类'
    ]
  },
]

const computerArticles = [
  {
    name: '设计模式',
    pathPrefix: 'designMode',
    items: [
      "设计模式",
      "UML"
    ]
  },
  {
    name: 'Git',
    pathPrefix: 'git',
    items: [
      "认识Git",
      "Git命令",
      "快速认识GitFlow",
      "Git相关规范",
      "搭建git服务器"
    ]
  },
  {
    name: 'Linux',
    pathPrefix: 'os',
    items: [
      "Linux学习",
      "Linux零碎笔录",
    ]
  },
  {
    name: '计算机网络',
    pathPrefix: 'network',
    items: [
      '网络基础上篇',
      '网络基础下篇',
      'HTTP',
      '网络安全',
    ],
    filter: true
  },
]

// nav配置
export const nav = [
  {
    text: '前端系列',
    items: transformArticleNav(frontEndArticles)
  },
  {
    text: '计算机系列',
    items: transformArticleNav(computerArticles)
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
export const sidebar = transformSideBars([...frontEndArticles, ...computerArticles])
