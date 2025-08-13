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
    const isDev = process.env.NODE_ENV === 'development'
    const mobileDeviceReg = /android|iphone|ipad|ipod/
    const ua = window.navigator.userAgent.toLowerCase()
    if (isDev && mobileDeviceReg.test(ua)) {
      new VConsole()
    }
  }
}
