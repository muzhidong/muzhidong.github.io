---
title: TypeScript基础篇下
tags: 
- TypeScript
---

本章是TypeScript基础篇的下章。

## 类型操作
### 1、泛型
泛型可以理解为类型的参数，参数名可以自定义。目的是为了提高可重用性，以便支持新的数据类型。

- 泛型函数
  ```typescript
  // 示例一：泛型函数声明、调用、引用
  function who<T>(arg: T): T {
    return arg
  }

  // 传递所有参数，进行调用函数
  const a = who<number>(10)
  console.log(a)
  // 不传类型参数，自动推断，进行调用函数
  const b = who("string")
  console.log(b);

  // 直接函数声明引用函数
  const c: <A>(arg:A) => A = who
  // 函数调用签名引用函数
  const d: { <A>(arg: A): A } = who


  // 示例二：泛型支持设置默认值
  type U<A, B> = A | B;
  function fn<C = string, D = number>(p: U<C, D>):void{
    console.log(typeof p);
  }
  fn(1)
  ```

- 泛型接口
  ```typescript
  // 示例一：上面的泛型函数介绍了两种引用函数的方式外，也可以通过接口实现函数的调用签名
  interface IWho<B> {
    (arg: B): B
  }
  const q: IWho<number> = who

  // 示例二：泛型可以有多个
  interface IPerson<T,K>{
    name: T;
    age: K;
  }
  const r: IPerson<string,number> = {
    name: "yy",
    age: 20
  }
  ```

- 泛型类

  举例如下，
  ```typescript
  class Drink<T>{
    thing: T
    constructor(what: T) {
      this.thing = what
    }
    get what(): T {
      return this.thing
    }
    set what(what: T) {
      this.thing = what
    }
  }
  class Cola {
    // 类的静态属性不能使用泛型
    static num: number = 0
    add(): void {
      console.log("It is the", ++Cola.num, " of cola, a drink.")
    }
  }
  class Juice extends Cola {}

  const colaDrink = new Drink(Cola)
  console.log(colaDrink.thing)
  colaDrink.what = Juice
  console.log(colaDrink.thing)
  ```

- 泛型约束

  举例如下，
  ```typescript
  class BeeKeeper {
    hasMask: boolean = false
  }
  class ZooKeeper {
    nameTag: string = 'zoo'
  }
  class Biological {
    numLegs: number = 2
  }
  class Bee extends Biological {
    keeper: BeeKeeper = new BeeKeeper()
  }
  class Lion extends Biological {
    keeper: ZooKeeper = new ZooKeeper()
  }

  // 通过extends约束泛型
  function createInstance<T extends Biological>(animal: new () => T): T {
    return new animal()
  }
  console.log("bee has mask:", createInstance(Bee).keeper.hasMask)
  console.log("lion's nameTag is ", createInstance(Lion).keeper.nameTag)
  ```

> 除了使用unknown可以代替any，使用泛型也可以规避any类型
  ```typescript
  // Bad
  LRUCache {
    add(key: string, value: any) {}    
    get(key: string): any {}
  }
  // Good
  LRUCache<T> {    
    add(key: string, value: T) {}    
    get(key: string): T {}
  }
  ```

> 使用泛型，能通过入参类型自动确定出参类型
  ```typescript
  declare function map<TIn, TOut, TCtx>(    
    arr: readonly TIn[],    
    cb: (this: TCtx, val: TIn, index?: number, arr?: readonly TIn[]) => TOut, 
    context?: TCtx): TOut[]

  // 自动确定res类型为string[]
  const res = map([1, 2, 3], function (val) {       
    return val.toFixed(2);
  });
  ```

### 2、keyof类型操作符
用于获取对象的键字面量的联合类型
```typescript
interface IHuman{
  name: string;
  age: number;
  male?: boolean;
  [num: number]: any;
}
type TKey = keyof IHuman; // 相当于 "name"|"age"|"male"|"number"
let t:TKey = "name"
t = "male"
t = 1
```

### 3、typeof类型操作符
用于获取变量或属性的类型
```typescript
class Greeter {
  static defaultGreeting = "Hello, my friend";

  greet() {
    console.log(Greeter.defaultGreeting);
  }
}
const greetMaker: typeof Greeter = Greeter;// typeof Greeter表示取Greeter类的类型
greetMaker.defaultGreeting = "Ladies and Gentlemen,good morning";
const greeter: Greeter = new greetMaker();
greeter.greet();
```

### 4、索引访问操作符T[K]
获取某一类型中某些属性的类型
```typescript
type TPerson = { age: number; name: string; alive: boolean };
type One = TPerson["age"]; // number
type Two = TPerson["age" | "name"]; // number|string
type Three = TPerson[keyof TPerson];// number|string| boolean
```

### 5、条件类型
描述输入类型与输出类型之间的关系。形如`SomeType extends OtherType ? TrueType : FalseType;`的类型格式
```typescript
type L<T> = T extends string|number? T[]: T;
const o: L<number> = [1,2,3];
const s: L<boolean> = false;
```
结合类型推断关键字infer搭配条件类型，示例如下，
```typescript
type W<T> = T extends {name: infer N, age: infer A}? [N, A]: null;
const x:W<{name:string,age:number}> = ['lisi',28];
const y:W<{name:'wangwu',age:30}> = ['wangwu',30];
const z:W<number> = null;
```

### 6、映射类型
可以用于属性或类型的处理，如属性只读、限制类型、或转换类型等等。
```typescript
// 示例一
// 定义一个类型，其键可以是字符串或数值，值必须是字符串
type U = string|number;
type ITest = {
  [k in U]: string;
}
const v:ITest = {
  name: 'hello',
  12: 'abc'
}

// 示例二
// 传入不同事件类型，生成对应事件处理函数类型。此处as关键字可理解为对键再作一次映射
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
 
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>
// type Config = {
//   square: (event: SquareEvent) => void;
//   circle: (event: CircleEvent) => void;
// }
```

### 7、模板字面类型
模板字符串中的变量是类型，体现ts是操作"类型的类型"的语言。也可以认为是模板字符串在类型别名的应用
```typescript
type LocaleId = `locale_id`;
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${LocaleId}`;


type Request = 'Http' | 'Https'
interface Success {
  type: `${Request}Success`;
  body: Request;
}
function handler(r: Success) {
  if(r.type === 'HttpSuccess') {
    console.log(r.body)
  }
}
```

> 一道综合性的类型操作示例
  ```typescript
  // 使用更精确的类型定义
  type PropType<T, P extends string> = string extends P ? unknown 
    : P extends keyof T ? T[P] 
    : P extends `${infer K}.${infer R}` ? K extends keyof T ? PropType<T[K], R> : unknown : unknown;

  interface Model<TDataDef> {
    get<T extends string>(key: T): PropType<TDataDef, T>    
    set<T extends string>(key: T, val: PropType<TDataDef, T>): void
  }
  interface ComponentData {  
    foo: {      
      bar: string  
    }  
    baz: number
  }
  declare const model: Model<ComponentData>;
  const baz = model.get('baz')  // baz为number类型
  const bar = model.get('foo.bar')  // bar为string类型
  const bar2 = model.get('foo.baz')  // 返回unknown，后面再继续使用会报错
  ```

## 类型别名
在前面知识点多多少少接触了，这里对它进行重新梳理。其用于自定义类型。类型别名与接口的区别有如下，
- 1、接口只能描述对象或函数，而类型别名能描述各种类型
  ```typescript
  // 定义函数
  type G = (p: number) => string;
  const h:G = (a: number):string => `${a}`;

  // 定义对象
  type I = {
    func: (p:string) => void,
  }
  const j:I = {
    func: (s:string) => {
      console.log(s);
    }
  }
  ```
- 2、接口支持重复声明，编译时自动声明合并，而类型别名不支持
- 3、在对象扩展上，接口使用extends实现，类型别名使用&实现
  ```ts
  interface S { 
    a: string 
  }
  interface T extends R { 
    c: boolean 
  }

  type R =  { a: string }
  type U = S & { c: boolean }
  ```
- 4、当接口和类型别名均可用时，接口在类型检查上更严格。于是定义函数或接口时一般用接口，其它定义用类型别名
  ```ts
  // 示例1：向不同类型赋值时，类型别名不报错，interface报错
  type X = {
    title: string
  }
  const x: X = {
    title: 'hello' 
  }

  interface Y {
    title: string;
  }
  const y: Y =  {
    title: 'world'
  }

  interface Z {
    [key: string]: string
  }
  let z: Z;
  z = x  // 类型别名不报错
  z = y  // interface报错


  // 示例2.1：扩展时，类型别名不报错，interface报错
  interface C {
    count: number;
  }
  interface D extends C {
    count: string; // 报错，会检查形参、返回值类型是否兼容
  }

  type E = {
    count: number;
  }
  type F = E & {
    count: string;
  } // 不报错，但此时count类型是never，因为number & string无交集


  // 示例2.2：扩展时，都报错，但interface报错原因更准确
  interface G { x: number }
  interface H { y: number }
  interface I { z: number }
  interface J extends G,H {}
  interface K extends J,I {}
  const l: K = {
    x: 1, 
    y: 2
  } // Property 'z' is missing in type '{ x:number, y:number }',but required in type 'K'

  type M = {x: number}
  type N = {y: number}
  type O = {z: number}
  type P = M & N & O
  const q: P = {
    x: 1, 
    y: 2
  } // Type '{ x:number, y:number }' is not assignable to type 'P'
  ```

更多应用
```ts
// 类型别名可以是接口上某个属性的类型，通过索引获取
interface IType {
  t: string;
}
type E = IType['t'];
const f:E = 'abc';

// 类型别名支持内部递归使用
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};

// 使用类型别名使其类型具有语义性
// Bad
const fill: string = 'red'
// Good
type Color = string;
const fill: Color = 'red';
```

## 工具类型
### 1、Partial

属性可选。
```typescript
interface IPerson{
  name: string;
  age: number;
  male?: boolean;
}
const q:Partial<IPerson> = {
  name: 'zhangsan'
}
// 相当于
// const q:{
//   name: string | undefined;
//   age: number | undefined;
//   male: boolean | undefined;
// } = {
//   name: 'zhangsan'
// }

type MPartial<T> = {[K in keyof T]?: T[K]|undefined}
const aq:MPartial<IPerson> = {
  name: 'zhangsan'
}
```

### 2、Required

属性必选。
```typescript
interface IPerson{
  name: string;
  age: number;
  male?: boolean;
}
const r:Required<IPerson> = {
  name: 'lisi',
  age: 20,
  male: false,
}
// 相当于
// const r: {
//   name: string;
//   age: number;
//   male: boolean;
// } = {
//   name: 'lisi',
//   age: 20,
//   male: false,
// }

// 在修饰符readonly或?前加-，表示删除该修饰限制
type MRequired<T> = {[K in keyof T]-?: T[K]}
const ar:MRequired<IPerson> = {
  name: 'lisi',
  age: 20,
  male: false,
}
```

### 3、ReadOnly

属性只读。
```typescript
interface IPerson{
  name: string;
  age: number;
  male?: boolean;
}
const s: Readonly<IPerson> = {
  name: 'wagnwu',
  age: 30,
}

type MReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};
const as: MReadOnly<IPerson> = {
  name: 'wagnwu',
  age: 30,
};
```

### 4、其他工具类型简介
```typescript
Awaited<Type> // 获取异步操作返回值类型

Record<Keys, Type> // Keys作键集，Type是每个键值的类型

Pick<Type, Keys> //从Type取出指定Keys键集

Omit<Type, Keys> // 从Type剔除指定Keys键集

Exclude<UnionType, ExcludedMembers> // 从联合类型UnionType剔除被排除的成员ExcludedMembers

Extract<Type, Union> // 从Type和Union两种类型中取出共有属性

NonNullable<Type> // 从Type删除null或undefined类型

Parameters<Type> // 从Type取出参数类型

ConstructorParameters<Type> // 从Type取出构造函数参数类型数组

ReturnType<Type> // 从Type取出返回值类型

InstanceType<Type> // 从Type获取其实例类型

ThisParameterType<Type> // 从Type获取this参数类型

OmitThisParameter<Type> // 删除Type中this参数类型，再获取Type

ThisType<Type> // 仅作为上下文this类型的标记

Uppercase<StringType> // 将字符串转为大写

Lowercase<StringType> // 将字符串转为小写

Capitalize<StringType> // 将字符串首字母大写

Uncapitalize<StringType> // 将字符串首字母小写
```
传送门：[工具类型官方文档链接](https://www.typescriptlang.org/docs/handbook/utility-types.html)


## 声明合并
指编译器将针对同名的多处独立声明合并为一个声明。合并后的声明同时拥有原先所有声明的特性。

### 1、接口合并
接口的非函数成员应该是唯一的，若不唯一，必须保证相同类型，否则编译时报错。接口函数成员允许不唯一，需通过函数重载签名作兼容，调用时后声明的会优于先声明的。
```typescript
interface ITest{
  name: string;
  func(n: number): void;
}
interface ITest{
  // name: number;
  age: number;
  func(s: string): void;
}
const d:ITest = {
  name: 'benben',
  age: 10,
  func: function(val: number|string){
    console.log(val);
  }
}
```

### 2、名称空间合并
```typescript
namespace A{
  export const a = 1
  export const b = 2
}
namespace A{
  export function funA(){
    console.log(`Welcome to the namespace A`);
  }
}
console.log(A); // { a: 1, b: 2, funA: [Function: funA] }
```

### 3、名称空间与函数、类、枚举的合并
当名称空间与函数、类或枚举同名时，彼此可以共享暴露的内容。
```typescript
class Album {
  label!: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel {}
}

function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}

enum Color {
  red = 1,
  green = 2,
  blue = 4,
}
namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == "yellow") {
      return Color.red + Color.green;
    } else if (colorName == "white") {
      return Color.red + Color.green + Color.blue;
    } else if (colorName == "magenta") {
      return Color.red + Color.blue;
    } else if (colorName == "cyan") {
      return Color.green + Color.blue;
    }
  }
}
```

### 4、全局声明与模块内声明
```typescript
// 全局声明，在整个项目可用
declare global {
  interface Array<T> {
    isUnique(value: unknown): boolean;
  }
}
Array.prototype.isUnique = function (value: unknown): boolean {
  for(let i = 0; i < this.length; i++){
    if(this[i] === value){
      return true;
    }
  }
  return false;
};

// 模块内声明，声明模块内可用
declare module "./module" {
  interface A {
    a: number;
    b: string;
  }
}
```

## 模块
当文件顶层出现`import`或`export`时，该文件被视为一个模块，否则视为全局的一段脚本。

### 1、导出export
```typescript
// 声明导出。常量、变量、函数、类可以被导出，但接口、类型别名无法导出。
// 导出常量
export const a = 10;

// 导出变量
export let b = 2;

// 导出函数
export function func(){
  return a + b
}

// 导出类
export class Print{
  print(){
    console.info("这是一条信息")
  }
}

// 导出接口
export interface IPrint{
  print(info:string):void
}

// 导出类型别名
export type Position = {
  left: string,
  right: string,
}

// 导出语句。指定要导出部分，亦可重命名。
let x:string, y, z;
export { 
  x as abc, 
  y as def, 
  z as hij
}

// 默认导出，相当于导出变量default
export default "Hello,Typescript"

// 从某模块导入再导出
export * as SomeModule  from './xxx';

// 为了支持CommonJS和AMD的exports，提供了 export = XXX 语法。XXX表示一个模块的导出对象，可以是函数、类、枚举。使用 export = XXX 导出，必须使用 import XXX = require('XXX') 导入。当使用了该方式导出，其他导出方式均不生效。
enum Color{
  RED,
  BLUE,
  YeLLOW,
};
export = Color;
```

### 2、导入import
```typescript
// 部分导入
import {a, b, func as foo} from './module';
console.log(a, b, foo()); 

// 默认值导入
import str from './module';
console.log(str);

// 完整模块导入，包括默认导出值
import * as m from './module';
for(let k in m){
  console.log("数据类型是",typeof k,"键为",k)
}

// 副作用导入，加载模块并执行
import './module';

// 支持CommonJS和AMD的导入方式。使用了该方式导入，则不支持部分导入，而默认导入和完整模块导入的值会跟着变化。
import Color = require('./module')
console.log(Color);
```

### 3、模块解析
- 指编译器在查找导入模块内容时所遵循的流程。可以在使用`tsc`编译时添加`--traceResolution`选项，跟踪模块解析

- 模块解析策略

分Node和Classic两种，默认是Node。若编译选项module指定为AMD、System或ES2015，则为Classic。以下面示例认识这两种策略。

```typescript
// /root/src/folder/A.ts
// 相对导入模块
import * as B from "./moduleB";

// Classic策略查询路径：
// /root/src/folder/moduleB.ts
// /root/src/folder/moduleB.d.ts

// Node策略查询路径：
// /root/src/moduleB.ts
// /root/src/moduleB.tsx
// /root/src/moduleB.d.ts
// /root/src/moduleB/package.json (如果指定了"types"属性)
// /root/src/moduleB/index.ts
// /root/src/moduleB/index.tsx
// /root/src/moduleB/index.d.ts


// 非相对导入模块
import * as B from "moduleB";

// Classic策略查询路径：
// /root/src/folder/moduleB.ts
// /root/src/folder/moduleB.d.ts
// /root/src/moduleB.ts
// /root/src/moduleB.d.ts
// /root/moduleB.ts
// /root/moduleB.d.ts
// /moduleB.ts
// /moduleB.d.ts

// Node策略查询路径：    
// /root/src/node_modules/moduleB.ts
// /root/src/node_modules/moduleB.tsx
// /root/src/node_modules/moduleB.d.ts
// /root/src/node_modules/moduleB/package.json (如果指定了"types"属性)
// /root/src/node_modules/moduleB/index.ts
// /root/src/node_modules/moduleB/index.tsx
// /root/src/node_modules/moduleB/index.d.ts 

// /root/node_modules/moduleB.ts
// /root/node_modules/moduleB.tsx
// /root/node_modules/moduleB.d.ts
// /root/node_modules/moduleB/package.json (如果指定了"types"属性)
// /root/node_modules/moduleB/index.ts
// /root/node_modules/moduleB/index.tsx
// /root/node_modules/moduleB/index.d.ts 

// /node_modules/moduleB.ts
// /node_modules/moduleB.tsx
// /node_modules/moduleB.d.ts
// /node_modules/moduleB/package.json (如果指定了"types"属性)
// /node_modules/moduleB/index.ts
// /node_modules/moduleB/index.tsx
// /node_modules/moduleB/index.d.ts
```

- 模块决策相关的选项参数说明

baseurl：告诉编译器到哪里去查找模块。非相对模块导入都会被当做相对于baseUrl；相对模块导入不会被设置的baseUrl所影响，因为它们总是相对于导入它们的文件。

paths：模块路径映射，简写形式方便导入相对模块

rootDirs：指定root列表，列表里的内容会在运行时被合并

示例如下，
```json
"baseurl": ".",
"paths":{
  "jquery": ["node_modules/jquery/dist/jquery"],
  "*": ["*", "generated/*"] // "*"表示<moduleName>直接映射为<baseUrl>/<moduleName>，"generated/*"表示模块路径前是“generated”的，<moduleName>将映射为<baseUrl>/generated/<moduleName>
},
"rootDirs": ["src/views", "generated/templates/views"],// 这两个目录将在运行时自动合并在同一目录下
```


## 文件声明
在声明文件*.d.ts中作类型声明，可以是变量、函数、类、名称空间。若全局引进的第三方依赖如JQuery需类型增强，安装@type/jquery依赖即可。


## 三斜线指令
是包含单个XML标签的单行注释。注释的内容会做为编译器指令使用。仅可放在包含它的文件的最顶端，如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

```typescript
// 依赖声明
/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("https://www.typescriptlang.org");

// 包的依赖声明
/// <reference types="node" />

// 默认生成的AMD模块是匿名的，这个指令可以给amd模块设置名称
/// <amd-module name="amdName" />
```

## 名称空间
可以理解为在全局名称空间中命名的JavaScript对象。名称空间使用简单，与模块不同，一个名称空间可以跨多个文件定义，并可以通过`--outFile`选项合并。
```typescript
// Validation.ts
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}
// LettersOnlyValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
}
// ZipCodeValidator.ts
/// <reference path="Validation.ts" />
namespace Validation {
  const numberRegexp = /^[0-9]+$/;
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
// Test.ts
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

let strings = ["Hello", "98052", "101"];
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}
```

由于Test.ts通过三斜线指令引用了名称空间Validation多个文件，编译时会自动合并引入
```bash
tsc --outFile dist.js Test.ts
# 等价于 tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
```


## 类型兼容
- 基于结构的子类型

类型兼容是基于结构的子类型，它是一种只使用其成员来描述类型的方式。其规则是，如果x要兼容y，那么y至少具有与x相同的属性。
```typescript
interface Person {
  color: string;
}
class American {
  // 必须存在，且类型必须一致
  color: string = "white";
  // 额外字段可选
  name: string = "american";
  age: number = 0;
}
let p: Person = new American();
console.log(p.color);
//  额外字段是无法调用的
console.log(p.name);// 报错：Property 'name' does not exist on type 'Person'.
```

- 函数兼容

要求参数列表中的必选参数类型按序保持一一对应，返回值类型也要一致。其中，参数列表可以具体展开为以下4点，

  1、当源函数x的必选参数列表在目标函数y的必选参数列表都有，那么可以y=x是兼容的，否则不兼容。

  2、源函数x与目标函数y的可选参数互不影响。

  3、源函数x与目标函数y的剩余参数当作无限制的可选参数列表进行处理即可。

  4、源函数有重载时，目标函数必须提供兼容所有重载的签名。


```typescript
let x = (a: number, c?: string) => 0;
let y = (b: number, d: string, e?: boolean) => 0;
y = x; // OK
x = y; // 报错如下：
// Type '(b: number, d: string, e?: boolean) => number' is not assignable to type '(a: number, c?: string) => number'.
//  Types of parameters 'd' and 'c' are incompatible.
//    Type 'string | undefined' is not assignable to type 'string'.
//      Type 'undefined' is not assignable to type 'string'.
```

- 枚举兼容

数字枚举兼容数字类型，数字类型兼容数字枚举，但是不同数字枚举不兼容。
```typescript
enum Status {
  Ready,
  Waiting,
}
enum Color {
  Red,
  Blue,
  Green,
}
let status = Status.Ready;
status = 3;
status = Color.Red; // 报错：Type 'Color.Red' is not assignable to type 'Status'.
```

- 类兼容

比较两个类类型的对象时，只有实例的成员会被比较，即静态成员和构造函数不在比较范围内，但私有成员和受保护成员会被比较

- 泛型兼容

对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。然后用结果类型进行比较

- 基本数据类型兼容

![类型兼容](/typescript/类型兼容.png)
>蓝勾表示支持类型兼容赋值如`const v:void = undefined`，红叉表示不支持类型兼容赋值。当配置项strictNullChecks为false时，绿勾生效。

## JSX
- 使用步骤
  
1、文件扩展名设置为.tsx；

2、启用jsx选项，提供preserve, react, react-native, react-jsx, react-jsxdev五个值。

![jsx选项值说明](/typescript/jsx选项值说明.png)


## JS文件中类型检查
[传送门](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)


## 最后
[传送门——官方四张图带你快速回顾](https://www.typescriptlang.org/cheatsheets)
