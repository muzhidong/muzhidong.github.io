const path = require('path')

module.exports = (options, ctx) => {
  if(ctx.isProd){
    return {
      name: "vconsole-plugin",
    }
  }
  return {
    name: "vconsole-plugin",
    clientRootMixin: path.resolve(__dirname, '../mixins/vconsole.js')
  }
}
