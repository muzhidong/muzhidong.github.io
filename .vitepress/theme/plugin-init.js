
import VConsole from 'vconsole';

export default function () {
  // 开发环境下移动端开启调试台
  // const isDev = process.env.NODE_ENV === 'development'
  const isDev = import.meta.env.DEV
  const mobileDeviceReg = /android|iphone|ipad|ipod/
  const ua = window.navigator.userAgent.toLowerCase()
  if (isDev && mobileDeviceReg.test(ua)) {
    new VConsole()
  }

  // 主题跟随系统并监听
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const toggleTheme = (isDark) => {
    switch (isDark) {
      case true:
        document.documentElement.classList.add('dark')
        break;
      case false:
        document.documentElement.classList.remove('dark')
        break;
      default:
        break;
    }
  }
  toggleTheme(media.matches)
  media.addEventListener('change', (e) => {
    toggleTheme(e.matches)
  })
}
