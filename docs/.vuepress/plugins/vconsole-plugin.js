const path = require('path')

module.exports = (options, ctx) => {
  const config = {
    name: "vconsole-plugin",
  };
  if(ctx.isProd){
    return config;
  }
  return {
    ...config,
    clientRootMixin: path.resolve(__dirname, '../mixins/vconsole.js')
  }
}
