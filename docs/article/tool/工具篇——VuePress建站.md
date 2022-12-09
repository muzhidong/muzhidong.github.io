---
title: VuePress建站
tags: 
- VuePress
---
# VuePress建站

### VuePress 目录结构

```
.
├── docs
│   ├── .vuepress (可选的，存放全局的配置、组件、静态资源等)
│   │   ├── components (可选的，该目录中的 Vue 组件将会被自动注册为全局组件)
│   │   ├── theme (可选的，存放本地主题)
│   │   │   └── Layout.vue
│   │   ├── public (可选的，静态资源目录)
│   │   ├── styles (可选的，存放样式相关的文件)
│   │   │   ├── index.styl(将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级)
│   │   │   └── palette.styl(用于重写默认颜色常量，或者设置新的 stylus 颜色常量)
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html(用于开发环境的 HTML 模板文件)
│   │   │   └── ssr.html(构建时基于 Vue SSR 的 HTML 模板文件)
│   │   ├── config.js (可选的，配置文件的入口文件)
│   │   └── enhanceApp.js (可选的，客户端应用的增强)
│   │
│   ├── README.md(页面路由/)
│   ├── guide
│   │   └── README.md(页面路由/guide/)
│   └── config.md(页面路由/config.html)
│
├── dist(打包目录)
├── README.md
├── .gitignore
└── package.json
```

### VuePress命令
```bash
# 本地启动网站，支持热更新
vuepress dev docs
# 打包生成网站
vuepress build docs
```
