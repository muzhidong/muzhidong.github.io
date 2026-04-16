---
title: TypeScript查漏补缺
tags: 
- TypeScript
---

本篇针对TypeScript进行查漏补缺，补充特性，工具，或优化等

## 4.2开始，以_开头的变量未使用不报错
```typescript
// 4.2开始，以_开头的变量未使用不报错，告知变量以下划线开头为未使用变量
// 以下示例在>=4.2编译时不报错，在4.2以下报错
const [_a, b] = [1, 2]
console.log(b)
```

## 元组类型新特性
```ts
// 1、元组类型支持泛型
type OnlyReadArray = readonly unknown[]
function partialCall<A extends OnlyReadArray, B extends OnlyReadArray, C>(
  func: (...params: [...A, ...B]) => C, 
  ...firstPartParams: A) {
  return (...secondPartParams: B) => func(...firstPartParams, ...secondPartParams)
}
const foo = { x: string, y: number, z: boolean } => {
  return 'bingo'
}
const f1 = partialCall(foo, 100) // error，类型不对
const f2 = partialCall(foo, 'hello', 100, true, 'oops') // error，参数个数不匹配
const f3 = partialCall(foo, 'hello')
f3(123, true) 
f3() // error，参数个数不匹配
f3(123, 'hello') // error， 类型不对

// 2、元组类型支持带标记
function fn(x: [p: number, q: number]) {
  const [p, q] = x
}

// 3、元组类型支持rest参数位置不放在最后，位置不再约束，但有且只能一个rest，后面也不能跟可选参数
let a: [string, ...number[], boolean] = ['hello world', 0, true]
a = ['hello', 1, 2, 3, false]
let b: [...string[], number?];
let c: [...string[], ...number[]];
```

## this可以做返回值声明
```ts
// this不仅可以做函数形参声明，也可以做返回值声明
class Tool {
  count: number = 0;
  log(): this {
    console.log(++this.count)
    return this
  }
}
const tool = new Tool()
tool.log().log()
```

## 抽象构造签名
```ts
abstract class Shape {
  abstract getArea(): number;
}
type abstractCtor<T> = abstract new (...args: any[]) => T;

function makeSubClassWithArea<T extends abstractCtor<object>>(Ctor: T) {
  // 为什么这里还是要加抽象修饰符？因为这里是抽象构造签名
  abstract class SubClass extends Ctor {
    getArea() {
      return 1
    }
  }
  return SubClass
}

// 抽象构造签名需继承实现，应用场景在哪？
class SubClassWithArea extends makeSubClassWithArea(Shape) {
  customMethod() {
    return this.getArea()
  }
}
const inst = new SubClassWithArea()
console.log(inst.getArea())
console.log(inst.customMethod())
```

## as const用途
```ts
// 1、定义常量对象时，使用as const标记对象为只读
const EVENT_MAP = {
  click: 'CLICK',
  ready: 'READY',
} as const
// 2、as const恢复字面量模板推断
declare const a: string
const bar = `hello ${a}` as const
const baz = `hello ${a}`
type C = typeof bar // C --> hello ${string}
type D = typeof baz // D --> string
```

## 操作符!
表示类型可为空

## TS注释指令
- 行级注释指令
  - `// @ts-ignore`表示忽略下一行的类型错误
  - `// @ts-expect-error`表示期待下一行有错误，如果没有错误则报错
- 文件级注释指令，写在文件顶行
  - `// @ts-check`表示JS文件开启类型检查
  - `// @ts-nocheck`或`/* @ts-nocheck */`告诉TypeScript编译器跳过整个TS或JS文件的类型检查

> 与项目级配置文件tsconfig.json不在一个层次

## TS工具库
- [ts-morph](https://www.npmjs.com/package/ts-morph)，封装TS编译器API，提供更简便的API浏览和操作TS和JS代码
- [tsd](https://www.npmjs.com/package/tsd)，对TS类型定义进行单测
- [flow](https://www.npmjs.com/package/flow)，在浏览器或NodeJs中流式书写异步逻辑，类似函数组合的写法

## TS编译优化或排查举措
### 优化举措
- 类型扩展使用接口，不用交叉类型
  
  接口继承的类型级联关系会被缓存

- 按需编译
  
  配置`references`声明依赖，加以`tsc --build <packageName>`增量构建。实现ts依赖包变化，引用包自动编译
  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      // 被引用的项目包必须开启`composite: true`
      "composite": true,
    },
    // 通过`references`建立依赖关系
    "references": [
      // 假设引用包与被引用包目录在同级
      { "path": "../dependency-package" }
    ],
  }
  ```

- 按需加载定义的类型包
  
  一般会加载node_modules中的所有@types包，添加`compilerOptions.types`配置，按需引入真正需要的类型定义

- 启用`compilerOptions.isolatedModules`
  
  当ts外的构建工具遇到无法编译的语法时会给出警告，如重新导出(`export...from...`)、常量枚举(`const enum`)，启用它会保留这些语法

- 使用ts-loader或[ts-node](https://www.npmjs.com/package/ts-node)做转译，跳过了编译时类型检查，可以考虑使用webpack插件fork-ts-checker-plugin加速类型检查

### 排查举措
- 使用`tsc --listFiles`列举所有引入文件，检查include和exclude配置是否正确

- 添加`compilerOptions.extendDiagnostics`配置，检查ts编辑时耗时环节，如IO、解析、类型检查
