---
title: TypeScript基础一
tags: 
- TypeScript
---

# TypeScript基础一

## TypeScript特点
相较于JavaScript，TypeScript最大特点是类型约束。

## TypeScript环境准备
```bash
# 全局安装 TypeScript 环境
npm i -g typescript
# 验证 TypeScript 是否安装成功
tsc -v
```

## tsc命令常用选项
- 初始化TypeScript项目，并创建tsconfig.json文件

  `tsc --init`
  
- 监听ts变化，实时编译

  `tsc -w`

- 指定tsconfig文件路径，编译ts

  `tsc -p ./path/to/tsconfig.json`

- 构建项目

  `tsc -b`

- 输出tsconfig.json所有编译配置项说明

  `tsc --all`

- 指定要生成的模块代码

  如生成commonjs模块代码，
  
  `tsc -m commonjs XXX.ts`

- 更多信息，可以通过它学习tsc命令

  `tsc -h`

## 数据类型
### 1、数据类型声明
```typescript
// 完整变量声明
var 变量名:变量类型 = 值;

// 完整函数声明
function 函数名(参数名:参数类型,...):返回值类型 {}

// 表达式中函数声明
var 函数名:(参数名:参数类型,...)=>返回值类型 = function(参数名:参数类型,...):返回值类型 {}

// 接口中的函数声明
interface IFunc {
  函数名(参数名:参数类型,...):返回值类型;
}

// 类中的函数声明
class CFunc {
  函数名(参数名:参数类型,...):返回值类型 {}
}
```

### 2、null与undefined
两者均既可以当类型使用，又可以当值使用。

### 3、void
```typescript
// undefined可以赋值给void类型(详细可以看`类型兼容·基本数据类型兼容`内容介绍)
const v: void = undefined;

// 当函数通过类型别名()=>void定义返回值类型时，允许返回其他类型值
type VoidFn = () => void;
const func: VoidFn = () => true;
console.log(func());// 返回true

// 当函数直接定义返回值类型为void时，而实际返回值非void，编译时报错：Type 'boolean' is not assignable to type 'void'.
const func2 = function():void{
  return true;
}
console.log(func2());// 返回true
```

### 4、never
任何类型无法赋值给never类型。该关键字也无法作为值使用。当函数抛异常或不返回值(如死循环了)总是返回never。
```typescript
const a: boolean = never;// 报错：'never' only refers to a type, but is being used as a value here.

const b: never = true;// 报错：Type 'boolean' is not assignable to type 'never'.

// 先后报错：
// Type 'any' is not assignable to type 'never'. 
// 'never' only refers to a type, but is being used as a value here.
const c: never = never;
```

### 5、any与unknown
在类型不确定时使用。二者区别是，编译阶段进行属性访问或函数调用时，unknown会做类型检查，而any不会。建议用unknown替换any

```typescript
let tAny:any = 2;
tAny = [1];
// 不做类型检查
tAny.toFixed(2);

let tUnknown:unknown = 3;
tUnknown = [1];
// 会做类型检查
tUnknown.toFixed(2);
```

### 6、number
数字类型
```typescript
let num: number = 10;
num = 0xfff + 0x1;
// 虽然写法是16进制，但是最终结果还是以10进制显示
console.log(num); //4096
```

### 7、string
字符串类型
```typescript
const str: string = `Hello TypeScript`;
```

### 8、boolean
布尔类型
```typescript
const bool: boolean = false;
```

### 9、object
- 对象类型
  
  注意类型首字母大小写，object不包含基础数据类型，而Object包含

```typescript
const obj: {a: string, b: number} = {
  a: 'hello',
  b: 10
};
const lowerCaseObj: object = 1; // 报错： Type 'number' is not assignable to type 'object'.
const upperCaseObj: Object = 1;
```

- 数组类型

  类型声明语法为`Array<类型>`，其简写为`类型[]`。

```typescript
const arr1:Array<number> = [1,2,3];
const arr2:string[] =  ['a','b','c'];
const arr3: (string|number|boolean)[] = [1,true, 'abc'];
```

- 元组类型
  
  元组是指元素数量明确，且每个元素类型也明确的一个数组。赋值时须与类型声明顺序一一对应

```typescript
let tuple: [string, number, object] = ["undefined", 10, {}];
console.log(tuple); // [ 'undefined', 10, {} ]
console.log(tuple[3]) // 报错： Tuple type '[string, number, object]' of length '3' has no element at index '3'.
```

### 10、symbol
es2015新增的数据类型，该类型的特点是值不可改变且唯一
```typescript
const s1: symbol = Symbol('hello');
const s2: symbol = Symbol('hello');
console.log(s1 === s2); // false
```

### 11、bigint
es2020新增的数据类型，解决大数精度问题
```typescript
// 使用新特性，建议tsconfig配置项target设置为esnext
const b1: bigint = 10n;
const b2: number = 10;
console.log(b1 === b2); // false
```

### 12、类型断言
- 指定编译时的类型，当类型不兼容时会报错，但不影响运行结果。

- 提供了两种指定方式，关键字as和泛型。记住一句话，若类型x与y具有相同属性，则二者互能为彼此断言。
```typescript
const str:string = "The best of programming language";

console.log(str as number); // 报错：Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

console.log(str as any as number); // 双重断言，这是个漏洞，实际切勿使用。借助了任何类型可以被断言为any，any被可以被断言为任何类型。

console.log(<string>str);
```

- 类型转换与类型断言

类型断言只影响Typescript编译时的类型，类型断言语句在编译结果中会被删除。所以类型断言并不是类型转换，不会真的影响变量类型
```typescript
console.log(1 as boolean); // 1
console.log(Boolean(1)); // true
```

- 类型声明与类型断言

x断言为y，x和y有重叠部分即可；x声明为y，x必须具备y所有属性和方法。类型声明比类型断言更严格，优先使用类型声明。
```typescript
interface Animal{
  name: string;
}
interface Dog{
  name: string;
  run(): void;
}
const animal: Animal = {
  name: '旺财'
}
let dog:Dog = animal; // 报错：Property 'run' is missing in type 'Animal' but required in type 'Dog'.
```

### 13、类型推断
当变量没有显式类声明类型时，可以从以下几处推断类型：变量初始化，函数参数默认值，函数返回值


## 交叉类型
直接举例认识，
```typescript
interface A {
  name: string;
}
interface B {
  age: number;
}
// 同时具备A和B属性
type C = A & B;
const p:C = { name: "David", age: 42 };
console.log(`name: ${p.name},age: ${p.age}`);
```

同属性重复声明时，不起冲突说明都满足，起冲突则返回never类型，在赋值时报错。
```typescript
type AgeType = {age: number} & {age: 10};
const i:AgeType  = {age: 10};

type AgeType2 = {age: 5} & {age: 10};
const j: AgeType2 = {age : 10}; // 报错，Type 'number' is not assignable to type 'never'.
```
注：若是使用继承方式，属性重复声明冲突了，在继承声明时报错。

## 联合类型
联合类型不能直接调用非共有方法。
```typescript
interface Bird {
  fly: ()=> void;
  layEggs: ()=> void;
}

interface Fish {
  swim: ()=> void;
  layEggs: ()=> void;
}

// 返回类型可能是Fish或Bird
const getSmallPet = function(): Fish | Bird {
  const fish: Fish = {
    swim: () => {
      console.log("I can swim");
    },
    layEggs: () => {
      console.log("I can lay eggs");
    }
  };
  const bird: Bird = {
    fly: () => {
      console.log("I can fly");
    },
    layEggs: () => {
      console.log("I can lay eggs");
    }
  };
  return Math.floor(Math.random() * 2) === 0 ? fish : bird;
};
const pet = getSmallPet();
pet.layEggs();
pet.fly(); // 报错：Property 'fly' does not exist on type 'Bird | Fish'. Property 'fly' does not exist on type 'Fish'.
```

### 1、类型保护措施(类型区分)  
- 类型断言
```typescript
if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else {
  (<Bird>pet).fly();
}
```

- 类型谓词（断言函数）
```typescript
function isBird(pet: Fish | Bird): pet is Bird {
  return (<Bird>pet).fly !== undefined;
}
if (isBird(pet)) {
  pet.fly();
} else {
  pet.swim();
}
```

- typeof

类型判断，如`typeof A`

- instanceof

某实例是否是某类型的实例，如`b instanceOf B`

### 2、可辨识联合
也被称为标签联合或代数数据类型。包含三要素：

1.可辨识：具有值唯一的属性

2.联合：一个类型别名包含了这些类型的联合

3.类型保护：有对该属性作类型保护

```typescript
interface Square {
  kind: "square"; // 可辨识
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
type ShapeType = Square | Rectangle | Circle; // 联合
function area(s: ShapeType): number {
  switch (s.kind) {
    case "square": // 类型保护
      return Math.pow(s.size, 2);
      break;
    case "rectangle":
      return s.height * s.width;
      break;
    case "circle":
      return Math.PI * s.radius * 2;
      break;
    default:
      throw new Error("Unexpected object:" + s);
  }
}
const square: Square = {
  size: 10,
  kind: 'square',
}
console.log(square.kind, area(square));
```

### 3、联合交叉类型
- 优先级：& > |
```typescript
type MType = number & 5 | string & 'abc';
const m: MType = 6;
const n: MType = 'def';
```

## 枚举
### 1、特点
- 默认值从0开始为元素编号。分数字枚举、字符串枚举、异构枚举；
- 允许值相同，优先取顺序较后的元素。

### 2、数字枚举
传键则返回值，传值则返回键
```typescript
enum direct {
  up = 10,
  down,
  left,
  right
}
console.log(direct.right);
// 11是key，是对象属性访问，不要把它当作数组索引访问了
console.log(direct[11]);
```

### 3、字符串枚举
始终返回值
```typescript
enum names {
  "Json",
  "Tom",
  "Jack"
}
console.log(names[1]);

enum strDirect {
  up = "toUp",
  down = "toDown",
  left = "toLeft",
  right = "toRight"
}
console.log(strDirect.down);
console.log(strDirect["left"]);
```

### 4、异构枚举
数字枚举和字符串枚举的混合
```typescript
enum result {
  success = 1,
  error = "err"
}
console.log(result[1]);
console.log(result["error"]);
```

### 5、枚举是字面量时需注意的点
切勿使用逻辑或进行类型判断，以下面为示例，
```typescript
enum shape {
  ICircle,
  IRectangle,
  ISquare,
}
interface ICircle {
  kind: shape.ICircle
}
interface IRectangle {
  kind: shape.IRectangle
}
interface ISquare {
  kind: shape.ISquare
}
function func(x: shape) {
  // 条件总是true
  // 编译时会提示报错：This comparison appears to be unintentional because the types 'shape.ITest' and 'shape.ISquare' have no overlap.
  if (x !== shape.ICircle || x !== shape.ISquare) {
    console.log('exec code ...')
  }
}
func(shape.ISquare);
func(shape.ICircle);
```

### 6、枚举成员
枚举成员分常量成员与计算成员。

常量成员，包括以下几种：
- 数值或字符串字面量
- 带圆括号的常量枚举表达式
- 对先前定义的常量枚举成员的引用
- 带有一元操作符(+\-\~)的常量枚举表达式
- 带有二元操作符(+\-\*\/\%\<<\>>>\>>\&\|\^)的常量枚举表达式

计算成员：不符合常量成员条件的成员

示例如下，
```typescript
enum demo {
  "abc",
  num = 6 + (5 & 5),
  zero = ~-1,
  num2 = num,
  len = "abc".length,
}
console.log(demo.abc);
console.log(demo.num);
console.log(demo[0]); // 存在相同值时，取顺序较后的
console.log(demo.num2);
console.log(demo.len);
```

### 7、常量枚举
编译后不生成枚举定义部分的代码。不能包含计算成员，否则编译时报错
```typescript
const enum ConstantEnum {
  a = 1,
  b = a * 2,
  len = 'ab'.length,// 报错：const enum member initializers can only contain literal values and other computed enum values.
}
const refEnum = {
  a: ConstantEnum.a,
  b: ConstantEnum.b
}
// 上面代码编译后生成的代码如下：
// const refEnum = {
//     a: 1 /* ConstantEnum.a */,
//     b: 2 /* ConstantEnum.b */
// };
```

## 函数
### 1、函数类型
函数类型声明格式：`(参数类型列表) => 返回值类型`

示例如下，
```typescript
type FunType = (a: string, b: number, c?: number) => number;
const add:FunType = function (x: string, y: number = 5) { 
  return +x + y
};
console.log(add('4', 10));
console.log(add('4', undefined));

type FunType2 = (a: string, ...rest: number[]) => number;
const add2:FunType2 = function (x: string, ...rest: number[]) {
  const sum: number = (rest || []).reduce((sum, value) => sum + value , 0) 
  return +x + sum
};
console.log(add2('4', 5, 6, 7));
```
从上面示例可以发现，

1、参数类型在顺序上要一一对应，参数名是否正确不影响

2、当参数设置了默认值，若想使用默认值，则传undefined

3、若参数是可选的，可以在参数名加?，且必须置于参数列表末

4、若可选参数有多个且不确定，可以使用剩余参数，可以认为是一个长度不定的可选参数数组

### 2、调用签名
作为函数被调用，且可以额外自定义属性。示例如下，
```typescript
type FunType3 = {
  desc: string;
  (str: string): void;
}
function printf(str: string){
  console.log(str);
}
printf.desc = 'print';
const func3: FunType3 = printf;
console.log(func3.desc);
func3('hello')
```

### 3、构造签名
支持new创建函数对象
```typescript
type FunType4 = {
  new (str: string): object;
  message: string;
}
class consFunc{
  static message:string = "";
  constructor(str: string){
    console.log("constructor");
    consFunc.message = str;
  }
}
const func4: FunType4 = consFunc;
const f = new func4('This is a function object');
console.log(consFunc.message);
```
通过上面示例，发现定义的属性是挂载在类上的静态属性，若希望挂载在实例上，我们可以通过下面方式实现。
```typescript
type FunType5 = {
  message: string;
}
type FunType6 = {
  new (str: string): FunType5;
}
const createInstance = (func: FunType6, str: string): FunType5 => {
  return new func(str);
}
class consFunc2 {
  message: string;
  constructor(str: string){
    console.log("constructor");
    this.message = str;
  }
}
const obj5: FunType5 = createInstance(consFunc2, "This is a function object");
console.log(obj5.message);
```

若希望既支持函数调用，又支持new方式创建，类型定义示例如下，
```typescript
type FuncOrNew = {
  (): void;
  new (): object;
}
```

### 4、函数参数中的this
必须在函数第一个形参定义this，注意函数不能是箭头函数

示例一：
```typescript
// 当对全局对象挂载变量或方法时，若在全局文件中，在本文件声明即可，而若在模块文件中，要在指定路径下的存放类型定义文件中声明
//  --- 声明start ---
interface Window{
  func: (p:string) => void;
  myName: string;
}
//  --- 声明end ---

function func(this: Window, name:string):void{
  this.myName = name;
}
window.func = func;
window.func("I'm a global variable");
console.log(window.myName);
```

示例二：
```typescript
type K = {
  name: string, 
  func: (p:string) => void
};
// 定义时的this类型须与调用时的类型一致。若this指向不单一，可以使用联合类型
function func(this: K, name: string){
  this.name = name;
}
const l:K = {
  name: 'hello',
  func:(p:string) => {},
}
l.func = func;

l.func('hello world')
console.log(l.name);
```

### 5、函数重载
- 重载签名
函数同名，但形参列表的个数、类型、顺序不同。
```typescript
function fn(num: number): void;
function fn(str: string): void;
```

- 重载签名实现
根据传入不同参数，做不同处理。注意有一个以上重载签名，签名实现才有意义。
```typescript
function fn(p: number | string): void{
  console.log(typeof p);
}
fn(1);
fn('welcome to study typescript')
```

## 接口
描述事物

### 1、属性修饰符
提供只读修饰符readonly和可选修饰符?
```typescript
interface Person {
  age: number;
  // readonly表示只读
  readonly sex: string;
  // ?表示可选
  hobby?: string;
}
```

### 2、索引签名
格式：`[attr_name:attr_type]:value_type`

属性名不确定时使用。注意索引签名的值类型必须满足其他现有属性的所有值类型

顺便提及：一般对象字面量都会做属性检查。绕开属性检查的方式有赋值一变量、断言以及这里提到的索引签名。

```typescript
interface Animal {
  age: number;
  sex: string;
  readonly eyes: number | boolean;
  readonly nose: number | boolean;
  readonly mouth: number | boolean;
  readonly hands: number | boolean;
  readonly legs: number | boolean;
  eatMeat?: string;
  // 索引签名
  [prop: string]: any;
}
function addAnimal(animal: Animal) {
  const { 
    eyes, 
    nose, 
    mouth, 
    hands, 
    legs 
  } = animal;
  console.log(
    `It has ${legs} legs,${eyes} eyes,${mouth} mouth,${nose} nose,and ${hands} hands.`
  );
  
  const arr = ["eyes", "legs", "nose", "mouth", "hands"];
  for (let item in animal) {
    if (arr.indexOf(item) === -1) {
      console.log(`more info:${item}:${animal[item]}`);
    }
  }
}
// 绕开属性检查——赋值一变量
const animal: Animal = {
  legs: 2,
  eyes: 2,
  mouth: 1,
  nose: 1,
  hands: 2,
  age: 27,
  sex: "male",
  a: 1
};
addAnimal(animal);
// 绕开属性检查——断言
addAnimal({
  legs: 2,
  eyes: 2,
  mouth: 1,
  nose: 1,
  hands: 2,
  age: 18,
  sex: "female",
  b: 2,
} as Animal);
// 绕开属性检查——索引签名
addAnimal({
  legs: 2,
  eyes: 2,
  mouth: 1,
  nose: 1,
  hands: 2,
  age: 50,
  sex: "male",
  c: 2,
});
```

### 3、接口继承
第一种情况，接口继承接口
```typescript
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
const square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

第二种情况，接口继承类。当一个接口继承一个类后，若另一个类要实现该接口，注意要继承该类，因为接口继承该类，只声明了成员，并未实现，所以需要由其子类实现
```typescript
class A {
  age: number = 1000;
}
interface B extends A {
  getAge(): string;
}
class C extends A implements B {
  getAge(): string {
    return `年龄：${this.age}`;
  }
}
const cInstance = new C();
console.log(cInstance.getAge());
```

支持多继承，用逗号隔开
```typescript
interface Monkey{
  sex: string;
  age: number;
}
interface Human{
  country: string;
  job: string;
}
interface YellowMan extends Human, Monkey{
  language: string; 
}
const p: YellowMan = {
  sex: 'male',
  age: 20,
  country: 'China',
  job: 'engineer',
  language: 'Chinese'
}
```

### 4、接口应用
- 定义对象
```typescript
interface IObj{
  name: string;
}
const obj: IObj = {
  name: 'typescript'
}
```

- 定义函数
```typescript
interface play {
  (time: number, who: string): string;
}
const myPlay: play = function(t: number, w: string): string {
  return `I spent ${t} hours playing with ${w}`;
};
console.log(myPlay(1, "John"));
```

- 定义索引类型

分数字索引签名(键为数字)和字符串索引签名(键为字符串)两种
```typescript
// 数字索引签名
interface NumberIdx{
  [idx:number]: number;
}
const arr: NumberIdx = [1,2,3];
console.log(arr[2]);

// 字符串索引签名
interface StringIdx {
  [index: string]: number;
}
const stringIdx: StringIdx = {
  "Hello World": 0,
  "Hello TypeScript": 1,
  "Hello Friend": 2
};
for (const idx in stringIdx) {
  console.log(`key:${idx},value:${stringIdx[idx]}.`);
}
```

- 接口实现函数的构造签名

下面通过示例解读接口如何实现函数的构造签名
```typescript
// 1、定义好接口静态部分，如属性和方法
interface IClock {
  now: Date;
  setTime(d: Date): void;
}
// 2、定义好接口动态部分，即构造函数
interface ClockConstructor {
  new (hour: number, minute: number): IClock;
}
// 3、定义创建实例的方法
const createClock = (
  cons: ClockConstructor,
  hour: number,
  minute: number
): IClock => {
  return new cons(hour, minute);
};
// 4、实现接口的类
class DigitalClock implements IClock {
  now: Date = new Date();
  constructor(hour: number, minute: number) {
    this.now.setHours(hour);
    this.now.setMinutes(minute);
  }
  setTime(d: Date) {
    this.now = d;
  }
}
// 5、给创建实例方法传入相应参数，创建实例
const digital:IClock = createClock(DigitalClock, 11, 11);
console.log(digital.now);
```

- 接口实现函数的调用签名

解读示例如下，
```typescript
// 1、定义接口
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
// 2、定义获取实现接口函数的方法
function getCounter(): Counter {
  const counter = (function(start: number) {
    console.log("start:", start);
  }) as Counter;
  counter.interval = 10;
  counter.reset = () => {
    counter.interval = 0;
  };
  return counter;
}
// 3、获取函数并调用
const c = getCounter()
c(100);
// 4、获取函数的属性或方法
console.log(c.interval);
c.reset();
console.log(c.interval);
```

## 类
事物的具体实例。

提示：TS内部实现了在定义类时，也自动定义了同名接口。

### 1、成员可见性修饰符
接口部分介绍的属性修饰符和索引签名在类中同样试用。这里的成员可见性修饰符在接口亦适用。
- public：成员可见性默认值。访问无限制

- protected：protected成员在自身及其派生类中可以访问
```typescript
class Developer{
  protected skill!:string;
  protected constructor(){}
}
class FrontEndDeveloper extends Developer{
  // 可以在子类修改成员可见性，暴露受保护成员
  skill:string = 'html,css,javascript'
  constructor(){
    super();
  }
}
// 当构造函数被标记protected，意味该类不能直接被实例化，但是能通过子类实例化
const developer = new Developer();//  Constructor of class 'Developer' is protected and only accessible within the class declaration.
const feDeveloper = new FrontDeveloper();
console.log(`The front end developer is good at ${feDeveloper.skill}`);
```

- private：private成员只在自身类中可以访问

示例一解读：
```typescript
class Girlfriend {
  private girlFriendName: string = "";

  // 通过存取器实现在外部修改私有成员的值
  get name(): string {
    return this.girlFriendName;
  }

  set name(girlFriendName: string) {
    this.girlFriendName = girlFriendName;
  }
}
const myGirlFriend = new Girlfriend();
myGirlFriend.name = "jiuLing";
```

示例二解读：
```typescript
class D {
  private x = 10;
  public sameAs(other: D) {
    // 与其他面向对象编程语言不同，允许访问同个类不同实例的私有成员
    return other.x === this.x;
  }
}
const d = new D();
// 运行时，通过in关键字或遍历简单属性，即使是受保护、私有的成员仍能被访问
console.log('x' in d);
console.log(Object.getOwnPropertyNames(d));
```

### 2、继承类
- 类不能有未初始化的属性或未实现的方法，除非字段后加!修饰，则可不必初始化。
- 当父类属性是可选属性，子类实例想获取该属性时，子类需要重新声明该属性，否则获取到的是undefined。
```typescript
class Base {
  desc!: string;
  // 若count是可选属性，this.count是undefined
  // count?: number = 0;
  count: number = 0;
  print(msg: string):void {
    console.log(msg);
    this.count++;
  }
}
class Derived extends Base {
  // 属性覆盖
  desc: string = "I'm a derived class";

  constructor() {
    // 当继承某个基类，通过this调用成员前必须调用父类构造函数super();
    super();
    console.log(this.count);    
  }

  // 方法重写
  print(msg: string){
    super.print(msg);
    console.log(`current count: ${this.count}`);
  }

  // 类同接口一样，支持索引签名
  [s: string]: boolean | ((s: string) => boolean | void) | string | number;

  check(s: string) {
    return this[s] as boolean;
  }
}
const derived = new Derived();
```

- 声明类型
```typescript
interface Canis {
  dateOfBirth: any;
}
interface Dog extends Canis {
  breed: any;
}
class AnimalHouse {
  resident: Canis;
  constructor(animal: Canis) {
    this.resident = animal;
  }
}
class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code, only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}
```

### 3、实现接口
```typescript
interface Pingable {
  ping(): void;
}
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
```

支持多接口实现，逗号隔开即可
```typescript
interface Monkey2{
  sex?: string;
  age: number;
}
interface Human2{
  country: string;
  job: string;
}
class YellowMan2 implements Human2, Monkey2{
  language!: string; 
  age!: number;
  country!: string;
  job!: string;
}
const ym = new YellowMan2();
// 同extends，实现有可选属性的接口不会自动创建可选属性
ym.sex = 'male';// 报错：Property 'sex' does not exist on type 'YellowMan2'.
ym.age = 20;
ym.country = 'China';
ym.job = 'engineer';
ym.language = 'Chinese';
```

### 4、成员静态修饰符static
当允许同一类下的不同对象共享时应用，减少动态分配。被其修饰的属性无法通过实例对象修改。

注意：静态成员不能有name、length、call，因为它们在函数内部已被使用了

```typescript
class Apple {
  static color: string = "red";
  // 静态代码块在类加载时执行
  static {
    console.log('This is a static block.');
  }
  constructor() {
    console.log("All we know,Apple is", Apple.color);
  }
}
const apple1 = new Apple();
const apple2 = new Apple();
Apple.color = "green";
const apple3 = new Apple();
const apple4 = new Apple();
```

### 5、类抽象修饰符abstract
- 可作为基类使用，但不可实例化，却不同于接口，可以有已实现的方法。
- 继承抽象类时必须实现抽象属性和方法。
- 向上转型：只能调用与父类共有方法，子类特有方法不能被调用。

示例如下，
```typescript
abstract class Fruit {
  color!: string;
  shape!: string;

  abstract getShapeAndColor(): void;

  health() {
    console.log("Fruit is healthy.");
  }
}
class WaterMelon extends Fruit {
  shape: string = "ellipse";

  constructor() {
    super();
    this.color = "green";
  }

  getShapeAndColor(): void {
    console.log(`The watermelon is ${this.shape} and ${this.color}`);
  }

  detail():void {
    console.log("The watermelon is quenched one's thirst in the summer.")
  }

}
const waterMelon: Fruit = new WaterMelon();
waterMelon.getShapeAndColor();
waterMelon.health();
waterMelon.detail();// Property 'detail' does not exist on type 'Fruit'.
```

- 抽象构造签名

示例解读：
```typescript
function getFruit(ctor: new () => Fruit) {
  const instance = new ctor();
  instance.getShapeAndColor();
}
getFruit(Fruit);//报错： Argument of type 'typeof Fruit' is not assignable to parameter of type 'new () => Fruit'. Cannot assign an abstract constructor type to a non-abstract constructor type.

getFruit(WaterMelon);
```

### 6、类的解构赋值
仅属性能被解构，方法不能。
```typescript
class myClass {
  time = "2020-03-03";
  count() {}
}
const clone = {
  ...new myClass()
};
console.log(clone);
```
