import { defineConfig } from 'vitepress'
import {
  head,
  nav,
  sidebar,
} from './data.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "大猿猴的前端世界",
  titleTemplate: false,
  description: "一名前端程序猿，目前正在一点点地进步，希望有一天能够在IT行业找到自我的价值。",
  head,
  srcDir: './src',
  outDir: './dist',
  cleanUrls: true,
  appearance: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav,
    sidebar,
    aside: true,
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/muzhidong' },
      { icon: 'npm', link: 'https://www.npmjs.com/~muzhidong' },
      { icon: 'codepen', link: 'https://codepen.io/muzhidong' },
    ],
    outline: {
      label: '文章导航',
      level: 2
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    externalLinkIcon: true,
    lastUpdated: true,
    markdown: {
      toc: {
        level: [2, 3]
      } 
    }
  },
})
