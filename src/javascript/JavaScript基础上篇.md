---
title: JavaScript基础上篇
tags: 
- ECMAScript
---

# JavaScript基础上篇

## 数据类型
- undefined：未定义类型，表示变量未初始化或对象的属性、方法不存在，是一个常量
  
  > undefined能被作为变量名，因为它不是一个关键字，而null是一个关键字，它不能作为变量名。所以赋值为`undefined`时常用`void 0`代替

- null：空类型，表示对象不存在
- Boolean：布尔类型
- String：字符串类型
- Number：数字类型。包括非数字NaN (Not a Number)，正无穷大Infinity，负无穷大-Infinity，整数和浮点数

  占8字节，分为三部分
  - 0-51位，表示分数部分f，共52位
  - 52-62位，表示指数部分e，共11位
  - 63位，符号位，为0表示正数，为1表示负数

  ```javascript
  const num = 1000000000000000000000000000
  // 数字类型溢出：parseInt第一个参数会转换为字符串，当数值非常大时可能出现精度丢失
  console.log(parseInt(num, 10)) // 1
  console.log(parseInt(num, 10) === num) // false
  // JS存在精度和越界问题，所以一般不用JS做精确计算，接口传递数值类型时用字符串替代
  console.log(String(num)) // 1e+27
  ```

  > 绝对值计算公式
  > - 当0 < e < 2047, f >= 0时, abs = 1.f * 2 ^ (e - 1023) 
  > - 当e = 0, f > 0时, abs = 0.f * 2 ^ (e - 1022) 
  > - 当e = 0, f = 0时, abs = 0 
  > - 当e = 2047, f > 0时, abs = NaN 
  > - 当e = 2047, f = 0时, abs = 无穷 

- Object：对象类型
- Symbol：符号类型
- BigInt：大整数类型
  ```javascript
  // BigInt可以表示比Number最大安全数还大的整数

  // BigInt支持8、10、16进制
  // 10进制
  console.log(2n)   // 2n 
  // 8进制
  console.log(0o6n) // 6n
  console.log(0O66n)// 54n
  // 16进制
  console.log(0xfn) // 15n
  console.log(0Xffn)// 255n

  // BigInt不存在0n和-0n之分
  console.log(Object.is(-0, 0)) // false
  console.log(Object.is(-0n, 0n)) // true

  // 0n与0、+0、-0并不相等
  console.log(0 === 0n)  // false
  console.log(+0 === 0n) // false
  console.log(-0 === 0n) // false

  // BigInt只能表示整数，不能对浮点数进行操作
  console.log(BigInt(4.04)) // Uncaught RangeError: The number 4.04 cannot be converted to a BigInt because it is not an integer

  // BigInt不会隐式转换为Number类型
  isNaN(1n) // Uncaught TypeError: Cannot convert a BigInt value to a number
  const a = 1n + 1 // Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions

  // BigInt转字符串
  console.log(String(12n) === '12')
  const obj = {}
  obj[9999999999999999999999999999n] = 1
  console.log(obj[9999999999999999999999999999n] === 1) // true
  console.log(obj['9999999999999999999999999999'] === 1) // true
  console.log(obj[9999999999999999999999999999] === 1) // false，obj[9999999999999999999999999999]为undefined
  ```

## 类型判断
- typeof
  
  可用在所有数据类型上
  
  能识别引用类型中的函数，其余如数组无法识别，都是object

  对未定义变量使用typeof，结果总是undefined，不报错

- instanceof 
  
  可用在除null和undefined外的数据类型上
  
  能识别所有引用类型，包括函数、数组、DOM元素

- null判断
  ```js
  // 使用 === null 判断是否为null，不能用typeof或instanceof判断
  typeof null === 'object' // true
  null instanceof Object  // false
  ```

## 类型隐式转换
JS是弱类型的体现之一

- 在值的表示层面上，0、""、"0"、false是等价的，1、"1"、true是等价的，100、"100"是等价的，null、undefined是等价的。注意是等价，不是相等

- 不同数据类型在运算时会进行隐式转换
```js
// 为什么？说明-运算符会自动做类型转换，且其中一个值不能转换为数字类型，结果必为NaN
console.log("A" - "B") // 不报错，结果是NaN

// 数组类型转换：若调用valueOf不能得到简单基本数据类型值，则调用toString
```

## 值传递与引用传递
函数调用时，参数是基本数据类型，则不会改变外部变量值；参数是引用数据类型，则视情况而定，当在函数调用中给外部引用变量重新赋值时，不会使外部引用变量值发生变化，因为没有改变到引用地址的数据，而当给外部引用变量修改属性值时，会使外部引用变量值发生变化，因为有改变到引用地址的数据
```js
// 示例一
let obj = {
  a: 1
};
function func1(obj) {
  obj.a = 2;
}
func1(obj);
console.log(obj.a); // 2

let obj2 = {
  b:1
};
function func2(obj) {
  obj = { b: 2 }
}
func2(obj2);
console.log(obj2.b); // 1

// 示例二
const arr = [1, 2]
const func = (arr) => {
  arr.push(3)
}
func(arr)
console.log(arr)
```

## 变量
- 命名约束
  - 必须以字母或_或$开头
  - 长度不超过255个字符
  - 不允许使用空格，不能使用保留的关键字及标识符作为变量名
  - 区分大小写
- 变量声明：使用关键字var(JS是弱类型的体现之一)，使变量类型不确定，通过取值确定
- 全局变量和局部变量
  - 全局变量：函数外声明的变量或在方法内部没有使用关键字var声明的变量
  - 局部变量：函数内使用关键字var定义的变量
- 注意
  - 变量提升问题，建议变量声明放在最前面
  - 变量重复声明时值会覆盖
  - 作用域链：当变量在当前作用域找不到时，会向上一层作用域查找，若找不到，则以此类推，直至到全局作用域，若依然没有找到该变量，则运行时报错

## 运算符
### 分类
- 自增自减运算符：++、--
- 算术运算符 ：+、-、*、/、%
- 位运算符：～、>>、<<、>>>、&、|、＾
  ```js
  // 位运算符或逻辑运算符往往可以替代一些数学运算，比如判断奇偶性、截取整数、两两换值、乘除、求模
  // 结果为1表示奇数，为0表示偶数
  a & 1

  // 截取整数，注意并没有做四舍五入
  a | 0
  a << 0
  ~~a

  // 无需第三变量实现两两换值
  a = a ^ b; 
  b = a ^ b; 
  a = a ^ b;

  // 相当于a * (2 ** 3)
  a << 3

  // 相当于a / (2 ** 3)
  a >> 3

  // 是否为4的倍数，或者取余
  a % 4
  ```
- 关系运算符：==、!=、>=、<=、>、<、===、!==。其中，等同符===和!==不会隐式类型转换，会比较值和地址，是类型安全的，而==和!=会隐式类型转换，只比较值
- 逻辑运算符：！、&&、||
  
  使用&&运算的结果若为假，则返回第一个被执行到的条件为假的结果，否则返回最后一个结果；
  
  使||运算的结果若为真，则返回第一个被执行到的条件为真的结果，否则返回最后一个条件的结果。
- 三元运算符：?:
- 赋值运算符：=、+=、*=、/=、-=、%=
- 幂运算符：**
  ```js
  const a = 2 ** 3; // 8
  ```
- 趋向运算符-->
  ```js
  var a=5;
  while(a --> 0) {
    console.log(a) // 4 3 2 1 0
  }
  ```

### 优先级和结合性
<div style="display:none;">TODO:参见犀牛书P66 表4-1 Javascript运算符</div>

- 结合性从右到左的运算符有关键字、一元运算符、赋值运算符，其余都是从左到右

## 表达式
表达式是有返回值的。示例如下，
```js
var c = {};
c[ c['red'] = 5 ] = 'red';
console.log(c.red + "  " + c[5]); // 5  red
```

## 语句
### 分支语句/选择语句
- if语句：当条件是比较相等时建议常量放左边，可防止被比较方不存在而抛错。
- switch语句：当均可使用switch和if语句时，建议使用switch语句，因为switch语句可以将答案一次性的全部加载进内存，效率高

### 循环语句
- while语句
- for语句

### 跳出结束语句
- break语句 
- continue语句

### 其他
- for/in语句：遍历对象，格式如`for(key in target){ }`
- try/catch/finally语句
  
  格式：
  ```js
  try {
    // 逻辑代码
  } catch(e) {
    // 错误处理代码
  } finally {
    // 一定执行的代码
  }
  ```

  示例：
  ```js
  try {
    throw new Error()
  } catch (x) {
    var x = 1, y = 2
    // var x = 1
    // y = 2
    console.log('inner x:', x) // 1
    console.log('inner y:', y) // 2
  }
  console.log('outer x:', x) // undefined，说明catch代码块是有作用域的
  console.log('outer y:', y) // 2
  ```
