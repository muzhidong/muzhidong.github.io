// cjs、esm区别：
// 加载时机：cjs是运行时加载；esm是编译时加载，可用于确定模块依赖关系，做静态分析
// 加载方式：cjs是同步加载，仅适于服务端；esm是异步加载，适于客户端和服务端
// 赋值方式：cjs是深拷贝，有循环依赖会引起报错，但不会造成死循环；esm是引用或浅拷贝

const { b } = require('./submodule');
console.log(`main.js b：`, b); // undefined

module.exports = {
  a: 2
}

