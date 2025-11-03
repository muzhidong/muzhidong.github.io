// import { num, xiaoming, print, default as square } from './submodule.mjs'
// console.log(num)
// print(`你好，${xiaoming}`)
// console.log(square(5))

// import * as module from './submodule.mjs'
// console.log(Object.keys(module)) // [ 'default', 'xiaoming', 'num', 'print' ]
// console.log(module.num)
// module.print(`你好，${module.xiaoming}`)
// console.log(module.default(10))

import square from './submodule.mjs'
console.log(square(5))
