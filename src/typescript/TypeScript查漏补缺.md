---
title: TypeScript查漏补缺
tags: 
- TypeScript
---

本篇针对TypeScript进行查漏补缺，补充一些特性

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
