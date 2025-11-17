---
title: TypeScript进阶
tags: 
- TypeScript
---

## 从JavaScript迁移到TypeScript
- 1、JS迁移到TS两种方式
  
  激进做法：从全局出发梳理整体项目结构，一步到位；适合中小型项目
  
  温和做法：迭代中一点点改造，循序渐进；适合大型或稳定性要求高的项目；存在上下文恢复的开销和推翻重来的可能

  > 所有js/jsx的文件后缀改为ts/tsx，文件顶部加上@ts-nocheck;

- 2、绝对约束
  
  包括Lint规则集(eslint、stylelint、commitLint、gitHook)、CodeReview、测试(e2e测试用例)、统一工具集(云端CI/CD)、其他特异性需求

  eslint/tsconfig规则集：
  - 语法统一：使用[]还是Array作为数组类型、使用as还是<>进行类型断言、使用prop还是function声明接口的方法、使用??而不是||，使用?.而不是&&、使用any还是unknown + 类型断言、使用import type导入类型、对象类型统一使用interface声明
  - 类型书写：不允许使用{}、Function作为类型注释、函数、类方法必须显式声明返回值类型、泛型参数的书写
  - 强制卡口：是否允许使用@ts-指令、所有类型分支都必须被处理、strictNullChecks|strictFunctionTypes|noImplicitAny

  基于Compiler API源码级约束（AST Checker处理ESLint处理不了的事情）：ESLint侧重语法统一、类型书写规范，而AST Checker关注代码逻辑。需要懂编译原理基础，才知道怎么使用typescript库提供的相关API，社区提供了ts-morph库，对ts底层api进行了封装

## 编译性能优化
- 1、"Project References"（packA -> packB -> packC）与tsc --build结合，精确做到在依赖的项目更新时自动去按需编译
- 2、代码层面：扩展用接口而不用交叉类型，因为接口继承的类型级联关系会被缓存；函数、类方法要显式声明返回值类型
- 3、按需加载定义的类型包，通常加载node_modules中的所有@types包，方便一些测试包，推荐CompilerOptions.types中，按需引入真正需要的类型定义
- 4、transpile only，ts-loader或ts-node提供，跳过编译时类型检查，可与webpack插件fork-ts-checker-plugin搭配使用，多进程进行类型检查
- 5、isolateModule，当除ts外的构建工具遇到无法编译的语法时给出警告，如重新导出（export...from...）、常量枚举
- 6、不正确的include和exclude配置，即包含了不该有的文件、没有把无关文件剔除，可以用tsc --listFiles检查所有被引入文件
- 7、使用--extendDiagnostics检查其他环节的编辑器耗时，如IO、解析、类型检查

## 工具库
- tsd：单元测试，其中type-coverage和ts-coverage-report可以检查项目中ts类型覆盖率
- flow：静态类型检查

## TypeScript在React实践
```typescript
// 示例一
import * as React from 'react'
import * as ReactDOM from 'react-dom'
interface IAppProps {
  message: string;
}
// 组件内置属性:children、propTypes、displayName、defaultProps
const App: React.FC<React.PropsWithChildren<IAppProps>> = ({message = 'hello', children}) => (
  <div>
    <span>{message}</span>
    {children}
  </div>
)

// 示例二
// 值可变，即ref1.current值可变
const ref1 = React.useRef<HTMLInputElement|null>(null)
// 值只读，即ref2.current值不可变？
const ref2 = React.useRef<HTMLInputElement>(null)

// 示例三
// 自定义hook返回值若是数组类型，TS自动推导为联合类型。可以借助下面函数进行转换
function tuplify<T extends any[]>(...elements: T) {
  return elements
}
function useLoading() {
  const [loading, setLoading] = React.useState(false)
  const load = (p: Promise<any>) => {
    setLoading(true)
    return p.then(() => setLoading(false))
  } 
  // 结果是[boolean, typeof load]，而不是(boolean | typeof load)[]
  return tuplify(loading, load)
}
// 建议：
// 定义公共API时使用interface，方便使用者继承接口
// 定义组件属性props和状态state时使用type，因为type约束性更强

// 示例四：获取未导出的Type
import { Button } from 'library'
type ButtonProps = React.ComponentProps<typeof Button>
function foo() {
  return {
    baz: 1
  }
}
type FooReturn = ReturnType<typeof foo>

// 示例五：
// React常见内置类型声明
// children: React.ReactNode
// style: React.CSSProperties
// 事件处理函数，如React.ChangeEventHandler<T=Element>，同理还有ClipboardEventHandler、TouchEventHandler、DragEventHandler、KeyboardEventHandler等等
// 事件对象类型，如React.ChangeEvent<T=Element>，同理还有ClipboardEvent、TouchEvent、DragEvent、KeyboardEvent等等

// 示例六：不要在type或interface中使用函数声明，防止子类赋值给父类
// 推荐
interface ICounter {
  start: (value: number) => string
}
// 不推荐
interface ICounter1 {
  start(value: number): string
}
// 具体示例：
interface Animal {}
interface Dog extends Animal {
  wow:() => void
}

interface Comparer<T> {
  compare: (a: T, b: T) => number
}
declare let animalComparer: Comparer<Animal>
declare let dogComparer: Comparer<Dog>
animalComparer = dogComparer // error
dogComparer = animalComparer // ok

interface Comparer1<T> {
  compare(a: T, b: T): number
}
declare let animalComparer1: Comparer1<Animal>
declare let dogComparer1: Comparer1<Dog>
animalComparer1 = dogComparer1 // ok
dogComparer1 = animalComparer1 // ok
```

## TypeScript在请求工具中的应用实践
```typescript
// 每次添加接口时，都需要补充1、2两点
// 1、接口响应结构类型声明
interface IQueryUserRes {
  name: string;
  bio: string;
}

interface IMutateUserRes extends IQueryUserRes {
  lastModified: number;
}

// 2、请求与接口响应结构映射
enum API_MAP {
  QueryUser = 'GET /api/user'
  MutateUser = 'POST /api/user'
}

interface IResMap {
  [API_MAP.QueryUser]: IQueryUserRes;
  [API_MAP.MutateUser]: IMutateUserRes;
}

// -----------------------------------------------
// 请求封装
// TResponse = never 表示不关心响应结构，即不关心data字段的类型
interface IRequest<TResponse = never> {
  success: boolean;
  code: number;
  data: TResponse;
}

// T extends API_MAP表示泛型参数限制为API_MAP中的值
export function request<T extends API_MAP>(
  api: T,
  params?: Record<string, unknown>
): IRequest<IResMap[T]> {
  // ...
  return {
    // ...
  }
}
// -----------------------------------------------

// 调用
const res = request(API_MAP.QueryUser);
```
