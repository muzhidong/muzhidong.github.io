// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.scss'

import VConsole from 'vconsole' ;

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 开发环境下移动端开启调试台
    // const isDev = process.env.NODE_ENV === 'development'
    const isDev = import.meta.env.DEV
    const mobileDeviceReg = /android|iphone|ipad|ipod/
    const ua = window?.navigator?.userAgent?.toLowerCase()
    if (isDev && mobileDeviceReg.test(ua)) {
      new VConsole()
    }

    // 主题跟随系统并监听
    const media = window.matchMedia ? window?.matchMedia('(prefers-color-scheme: dark)') : void 0
    const toggleTheme = (isDark) => {
      switch (isDark) {
        case false:
          document.documentElement.classList.add('dark')
          break;
        case true:
          document.documentElement.classList.remove('dark')
          break;
        default:
          break;
      }
    }
    toggleTheme(media?.matches)
    media?.addEventListener('change', (e) => {
      toggleTheme(e.matches)
    })
  }
}
