const VConsole = require('vconsole');

export default {
  mounted () {
    if(/android|iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())){
      new VConsole()
    }
  }
}
