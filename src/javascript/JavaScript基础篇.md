---
title: JavaScript基础篇
tags: 
- ECMAScript
---

# JavaScript基础篇

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

## 三大对象
- 内置对象：ECMA-262定义的实例化对象，有Global、Math、JSON
- 本地对象：ECMA-262定义的类，有Object、Array、Function、String、Boolean、Number、Date、RegExp、Error等
- 宿主对象：宿主环境如果是浏览器，则宿主对象是指由浏览器定义的对象，包括window和document

## Global
- 属性
  
  Infinity

  NaN
  ```js
  undefined > -1 // 结果是false
  // 原因是Number(undefined)为NaN，NaN跟任意一个数值比较都是false

  null > -1 // 结果是true
  // 原因是Number(null)为0

  // NaN结果为false，说明NaN本身是一个具有否定意义的值
  ```

- 方法
  
  eval(str)：将字符串作为脚本执行，返回执行结果

  isNaN(value)：判断value是否是非法数字
  
  isFinite(value)：判断value是否是有穷大的数，若为NaN、正负无穷大的数则返回false

  parseInt(str[,radix])：将字符串str转换为整数，若radix（范围为2-36，否则抛NaN）不为空，则将值按radix进制进行转换。返回第一个能被解析的整数，否则返回NaN
  
  parseFloat(str)：将字符串str转换为浮点数。返回一个能被解析的浮点数，否则返回NaN

  escape(str)：对字符串unicode编码，但不对ASCII字母和数字进行编码
  
  unescape(str)：与escape对应，对字符串进行unicode解码

  encodeURI(uri)：对字符串编码，但不对特殊字符如#\$\&\+\/\:\;\=\?\@等编码
  
  decodeURI(uri)：与encodeURI对应，将16进制转义序列URI解码
  
  encodeURIComponent(uri)：对字符串编码，可以对特殊字符编码
  
  decodeURIComponent(uri)：与encodeURIComponent对应，将16进制转义序列URI解码

## Math
- 常量

  PI：表示常数π

  E：表示常数e

  LN10：表示loge10

  LN2：表示loge2

  LOG2E：表示1 - ln2

  LOG10E：表示1 - ln10

  SQRT2：表示2的平方根

  SQRT1_2：表示1/2的平方根

- 方法

  max(...args)：获取最大值

  min(...args)：获取最小值

  random()：获取0-1之间的随机数

  sin(x)：计算x正弦值

  cos(x)：计算x余弦值

  tan(x)：计算x正切值

  ceil(x)：返回不小于x的最小整数

  floor(x)：返回不大于x的最大整数

  round(x)：返回x的四舍五入结果

  pow(x, y)：计算x^y

  sqrt(x)：计算x^1/2

  abs(x)：计算|x|

  exp(x)：计算e^x

  log(x)：计算lnx

  hypot(v1, v2, ..., vN)：计算参数平方和的算术平方根

## JSON
- 方法
  
  parse(jsonStr)：将json字符串转化为json对象
  
  stringify(jsonObj)：将json对象转化为json字符串

> 序列化与反序列化：对象与字符串间的转换。如JSON.stringify和JSON.parse

### 拷贝那些事
- 浅拷贝：当值是引用数据类型时，只要值变化，另一变量也会跟着改变。常用`Object.assign`(多用于对象合并和拷贝，但本人倾向于使用解构处理)、`Array.prototype.concat`、`Array.prototype.slice`

- 深拷贝：无论值如何变化，另一变量不受影响。常用`JSON.parse(JSON.stringify())`，但注意值为NaN、Infinity会转化为null，值为undefined、函数的键值对会丢失，值为Date对象会转换为字符串，且性能差
  ```javascript
  // 深拷贝实现（未考虑循环引用）
  function deepCopy( source ) {
    if (!['[object Object]','[object Array]'].includes(toString.call(source))) {
      return source
    }

    const target = Array.isArray(source) ? [] : {}
    for (var k in source) {
      if(!source.hasOwnProperty(k)) continue
      if (['[object Object]', '[object Array]'].includes(toString.call(source[k]))) {
        target[k] = deepCopy(source[k])
      } else {
        target[k] = source[k]
      }
    }

    return target
  }
  ```

## Object
- 对象属性调用：什么时候用[]设置属性，而不能用.设置属性？
  
  1.当属性名带有特殊符号如-、空格等
  
  2.属性名是不确定的或者说是动态变化的。此时的属性有一个专业名称，叫计算属性。

- 静态方法

  Object.create()：使用`Object.create(null)`创建对象的好处是使用`for...in`循环无需检查属性是否是自身。但要注意判断属性是否存在时，要用`Object.prototype.hasOwnProperty.call(obj, key)`或者`obj[key]`，不能用`obj.hasOwnProperty(key)`

- 实例方法
  
  toString()：返回[object Object]
  
  valueOf()：检查是否能以基本数据类型值返回，否则返回对象
  ```js
  console.log(new Date().valueOf()) // 1761493323393
  console.log(new Object().valueOf()) // {}
  ```

- 字面量对象计算属性
  ```js
  let i = 0;
  const obj = {
    ['a' + ++i]: i,
    ['b' + ++i]: i,
    ['c' + ++i]: i
  };
  const {
    a1,
    b2,
    c3
  } = obj;
  console.log(a1, b2, c3);
  ```

> 对象存储始终使用哈希表存储，且需额外处理原型链查找，访问速度较慢

## String
- 属性
  
  length：字符串长度

- 方法
  
  获取

  charAt(i)：获取指定索引的字符，兼容IE6，直接索引则不兼容
  
  indexOf(str)：获取指定字符串首次出现的位置
  
  lastIndexOf(str)：从后获取指定字符串首次出现的位置

  charCodeAt(i)：获取指定索引的字符Unicode值。
  
  fromCharCode(n1,n2,…,nx)：根据(一系列)Unicode值获取相应的字符(串)

  截取

  **slice(start[, end])：截取索引从start到(end-1)的子串。索引为负则表示从后往前数，-1表示最后一个字符，若开始索引的位置在结束索引的相同或后面位置，则返回空串**
  
  **substring(start[, end])：截取索引从start到(end-1)的子串。索引为负则一律视为0，此时小的作为起始索引，大的作为结束索引**
  
  **substr(start,len)：截取子串，索引从start开始`(若索引为负则从后截取长度，其中当负索引绝对值大于字符串长度，则索引值置为0，从0截取长度)`，截取长度为`min(len, start > 0? 字符串长度 - start: -start)`，若长度返回负数则最后返回空串**

  分割连接替换

  replace(regexp,str/fn)：用str替换匹配regexp的子串，或提供一个回调函数，以其返回值进行替换，该函数的参数分别是匹配子串、匹配子串中的分组列表参数（参数数量不定，看有多少分组）、匹配子串在原串的偏移量、原串

  split(regexp)：按regexp分割字符串
  
  concat(str1,str2,…,strn)：返回连接多个字符串的新字符串

  比较

  localeCompare(str)：表示参考字符串在本地排序中是在给定字符串之前、之后还是与之相同。若之前返回-1，之后返回1，相同返回0

  搜索
  search(regexp)：获取第一个与regexp匹配的子串的起始位置，否则返回-1
  
  匹配

  match(regexp)：接受一个正则字符串或对象。当正则未使用g全局标志时，返回一个数组，告知第一个匹配的索引、值以及与正则表达式的子表达式(如使用分组)匹配的文本等，或返回null，找不到匹配的话。但当正则使用了g全局标志，会返回所有匹配值的数组。

  大小写转换

  toLowerCase()：将字符串转化为小写
  
  toUpperCase()：将字符串转化为大写

  去空

  trim()：去除字符串两边的空格符，包括换行符。`Whitespace is defined as white space characters plus line terminators.`

> 应用：不想在代码中使用\r\n方式换行，可以用下面代码表示换行符
  ```js
  String.fromCodePoint('0x0D');
  String.fromCharCode('0x0D');
  ```

## Array
- 特点：
  
  长度可变(根据元素操作而变化或修改length属性)
  
  元素类型任意

  元素密集且类型一致则使用连续缓冲区存储（V8还会根据元素类型再细分，如整数、浮点数、引用对象），适合查询；元素稀疏或类型不一致则使用哈希表存储，适合增删。使用哈希存储，查询元素时需要计算哈希值，处理冲突，效率比连续缓冲区慢。使用顺序存储，新增元素时会检查空间是否足够，不够则扩容，而使用哈希存储无需扩容，直接新增索引-值对

- 创建
  ```js
  var arr=[]; // 数组长度为0
  var arr=[1, 2, 3, 3]; // 数组长度为4，元素为1,2,2,3
  var arr=new Array(); // 相当于var arr=[];
  var arr=new Array(5); // 数组长度为5
  var arr=new Array(5,6,7); // 数组长度为3，元素为5,6,7
  ```

- 属性
  
  length：数组长度，支持修改。默认数组长度 = max(initialLength, validValueMaxIndex + 1)
  ```js
  // 数组索引值非数字时，数组长度不会改变
  const arr = []
  arr['a'] = 1
  console.log(arr, arr.length) // [ a: 1 ] 0

  const arr1 = []
  arr1[-1.23] = 0
  console.log(arr1, arr1.length) // [ '-1.23': 0 ] 0

  const arr2 = []
  arr2['100'] = 1
  console.log(arr2, arr2.length) // [ <100 empty items>, 1 ] 101
  ```

- 方法
  
  1.改变数组（排序、增删改）
  
  sort([sortFn])：对数组元素采用混合排序TimSort，即结合合并排序、插入排序。默认将元素转化为字符串，按字符ASCII值由小到大排序。也可自定义排序函数，比如给元素为数字类型的数组排序，`function(a,b){return a-b;}`表示升序，`function(a,b){return b-a;}`表示降序；再者可以实现正序倒序，`function(a,b){return 1;}`返回非负值正序遍历，`function(a,b){return -1;}`返回负值倒序遍历

  pop()：删除数组的最后一个元素,并返回删除的元素

  push(ele1, ele2, …, eleN)：在数组最后添加一个或多个新元素,并返回新的数组长度，若添加的元素为数组，则数组整体作为一个单独元素，嵌套数组，构成多维数组

  shift()：删除数组的第一个元素，并返回删除的元素

  unshift(ele1, ele2, …, eleN)：在数组起始添加一个或多个新元素，并返回新的数组长度

  splice(index[, num[, item1, item2, …, itemN]])：插入、删除或替换数组的元素。指定起始索引index，添加或删除的元素数目num，若不指定则默认删除从index到数组末尾的所有元素，item1、item2等表示要添加的元素

  2.不改变数组（倒序、截取、连接、拼接）
  
  reserve()：数组元素倒序

  slice([start][, end])：返回数组的某一段,含头不含尾，若角标为负则加上数组长度length

  concat(arr1, arr2, …, arrN)：连接两个或多个数组

  join(separator)：把数组中的所有元素转换为一个字符串，需指定元素之间的分隔符

  3.数组静态方法（判断是否为数组）
  
  Array.isArray(obj)：判断对象是否是数组。若是则为true，否则为false

  **以下为ECMAScript6新增方法**
  
  1.改变数组
  
  copyWithin(pos[, start][, end])：指定复制序列的起始位置，被复制的起始和结束索引。若为负数，则从后往前数，且其绝对值超出数组长度则置为0。若始末位置的长度超过了从目标位置到数组最大索引的长度，则会截断，数组长度不改变。
  ```js
  // 浅拷贝数组的一部分到同一个数组中的另一个位置，并返回它，数组长度不变
  const arr = [{ a: 1 }, 23, 34, 45, 56, 67]
  console.log(arr.copyWithin(3, 0, 3))
  arr[0].a = 2
  console.log(arr)
  ```

  fill(value[, start][, end])：使用一个固定值替换数组指定范围内元素的值

  2.不改变数组（包含、获取、遍历、检测、查找、过滤、映射、累加）
  
  includes(item[, start])：判断数组是否包含指定值。也可指定从哪一起始位置开始，默认值为0，取值效果如下，值范围在`[-Infinity, -length] || 0`则整个数组都会被搜索，范围在`(-length, 0) U (0, length)`则为负从后往前数，为正数从前往后数，范围在`[length, Infinity]`则不搜索，直接返回false

  indexOf(item[,start])：获取指定元素的索引，否则返回-1，也可指定从哪一起始位置开始
  ```js
  [NaN].includes(NaN); // true
  [NaN].indexOf(NaN); // -1
  ```

  lastIndexOf(item[,start])：从后向前搜索指定元素的索引，否则返回-1，也可指定从哪一起始位置开始

  entries()：获取数组的迭代对象，即以数组索引值作为key，以数组元素作为value

  keys()：获取包含键的可迭代对象

  values()

  forEach(function(ele[,index][,arr][,thisValue]){})：调用数组的每个元素，并将其传递给回调函数

  every(function(ele[,index][,arr][,thisValue]){})：检测数组所有元素是否都符合指定条件，若是则返回true，否则返回false。ele表示数组元素，index表示数组索引，arr表示数组对象，thisValue表示上下文对象

  some(function(ele[,index][,arr][,thisValue]){})：检测数组中是否有元素满足指定条件，若有一元素满足则返回true，否则返回false

  find(function(ele[,index][,arr][,thisValue]){})：获取符合指定条件的第一个元素。

  findIndex(function(ele[,index][,arr][,thisValue]){}) ：获取符合指定条件的第一个元素的索引。

  filter(function(ele[,index][,arr][,thisValue]){})：创建新的数组，存储满足过滤条件的元素

  map(function(ele[,index][,arr][,thisValue]){})：创建新的数组，存储处理后的元素。返回值是原数组的一个浅拷贝，不是深拷贝。
  ```js
  let arr = []
  arr[2] = 1
  arr = arr.map(i => 2)
  // 为什么不是[2, 2, 2]？受map函数内部约束，当元素为empty，无论做什么操作，总是empty
  console.log(arr) // [empty × 2, 2]
  ```

  reduce(function(total,ele[,index][,arr][,thisValue]){})：接收一个函数作为累加器，数组中的每个元素从左到右开始缩减，最终计算为一个值，存储在total，其他参数定义同every。

  reduceRight(function(total,ele[,index][,arr][,thisValue]){})：接收一个函数作为累加器，数组中的每个元素从右到左开始缩减，最终计算为一个值，存储在total，其他参数定义同every。

  3.数组静态方法（转换）
  
  Array.from(obj[, mapfn][, thisValue])：将具有length属性的对象或可迭代的对象转换为一个数组。obj表示要转换为数组的对象，mapfn表示数组中每个元素要调用的函数，thisValue表示映射mapfn函数中的this对象。虽然利用数组的解构赋值也能实现转换，但是该方法的功能不仅于此。
  ```js
  Array.from({length: 3}, (v, k) => k)
  ```

  Array.of(ele1, ele2, …, eleN)：返回所有参数组成的数组

- 其他
  ```js
  // in判断数组元素在某个位置是否有值
  const arr3 = []
  console.log(0 in arr3) // false
  const arr4 = [undefined]
  console.log(0 in arr4) // true

  // 类数组可通过call或apply调用数组原生方法
  console.log(Array.prototype.join.call({0: 'name', 1: 'age', 2: 'sex', length: 3}, '*'))

  ```

## Date
- 函数调用
  
  Date()：返回日期时间字符串，相当于调用了toString()

- 构造函数
  
  new Date()
  
  new Date(时间戳)
  
  new Date(日期时间字符串)，该时间字符串能被Date.parse识别
  
  new Date(y, m[, d][, h][, m][, ms])

- 方法
  
  Date.parse(datestr)：解析日期时间字符串，返回毫秒数
  
  getDay()：获取一周的某一天[0-6]
  
  g[s]etTime()：获取或设置1970.1.1至今的毫秒数

  g[s]etFullYear([year][,month][,day])：获取或设置当前年份
  
  g[s]etMonth(month[,day])：获取或设置当前月份
  
  g[s]etDate(day)：获取或设置一个月中的某一天

  toLocaleString()：将日期时间转化为本地格式化字符串
  
  toLocaleDateString()
  
  toLocaleTimeString()

  g[s]etUTCXXX()：除了参照本地客户端时间，也提供了参照UTC时间。获取或设置格林威治时间，XXX表示fullYear/month/date/hours/minutes/seconds/millseconds任意一个
  
  toString()
  
  toDateString()：将日期部分转化为字符串
  
  toTimeString()：将时间部分转化为字符串

- 示例
  ```js
  var d = new Date('2020-04-04');

  d.setMonth(16); // 2021/5/4
  console.log(d.toLocaleDateString());

  d.setMonth(-9); // 恢复到2020/4/4

  d.setDate(30 + 31 + 4); // 2020/6/4
  console.log(d.toLocaleDateString());
  
  // 结论：
  // 使用setDate设置日期，会从当前月1号开始累加或减少，而不是从指定日开始累加
  // 使用setMonth设置月份，会从当年1月开始累加或减少，而不是从指定月开始累加
  // g[s]etHours(hour[, min][, sec][, millisec])
  // g[s]etMinutes(min[, sec][, millisec])
  // g[s]etSeconds(sec[, millisec])
  // g[s]etMilliseconds(millisec)
  ```

- Date隐藏的坑
  ```javascript
  // 以下是在chrome浏览器的测试结果：
  // 年份小于100，自动加上1900；年份不小于100，传什么显示什么
  console.log(new Date(50, 1, 1)); // Wed Feb 01 1950 00:00:00 GMT+0800 (中国标准时间)
  console.log(new Date(150, 1, 1)); // Sun Feb 01 0150 00:00:00 GMT+0805 (中国标准时间)

  // 去掉时分秒后，无论年份是多少，传什么显示什么
  console.log(new Date('0050-02-01')); // Tue Feb 01 0050 08:05:43 GMT+0805 (中国标准时间)
  console.log(new Date('0050-02-01 00:00:00')); // Wed Feb 01 1950 00:00:00 GMT+0800 (中国标准时间)

  // 一般格式默认为年月日，但是当年月日在大小上含糊不清时，格式会变为月日年 
  console.log(new Date('10-11-12')); // Thu Oct 11 2012 00:00:00 GMT+0800 (中国标准时间)
  console.log(new Date('100-11-12')); // Fri Nov 12 0100 00:00:00 GMT+0805 (中国标准时间)

  // 日期格式不统一，会有存在时区差异
  console.log(new Date('2018-01-01')); // Mon Jan 01 2018 08:00:00 GMT+0800 (中国标准时间)
  console.log(new Date('2018/01/01')); // Mon Jan 01 2018 00:00:00 GMT+0800 (中国标准时间)

  // 只传一个参数，表示从1970年起的毫秒数
  console.log(new Date(50)) // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)

  // 根据年内第几天获取对应的日期：先获取当年1月1日，再设置天数（只能是正数）
  const firstDayOfYear = new Date(2025, 0, 1);
  firstDayOfYear.setDate(32); 
  console.log(firstDayOfYear); // Sat Feb 01 2025 00:00:00 GMT+0800 (中国标准时间)
  ```

## Number
- 常量
  
  MAX_VALUE：最大数值
  
  MIN_VALUE：最小数值

- 方法
  
  toExponential(digits)：指定小数点后的数字位数，返回指数形式表示数字字符串
  
  toFixed(digits)：指定小数点后的数字位数，返回数字字符串，会做四舍五入
  
  toPrecision(precision)：返回precision个有效数字的数字字符串
  
  toString([scale])：将10进制表示的数字对象转化为指定进制的对应结果，若无指定，默认直接以10进制结果返回

- 牛刀小试
  
  示例：`907..toString(32)`结果是什么，那`.907.toString(36)`结果又是什么
  结果：第一个结果是sb；第二个结果报错
  分析：
  1) .907表示0.907，907.表示907.0
  2) toString([scale])：scale值可为2-35，默认值为10，因为数字有0-9，字母有a-z，所以最多表示到35，进制最高为36，a表示10，b表示11，...，z表示35。于是907=28*32+11，28在32进制中用s表示，11在32进制中用b表示，所以结果为sb，而第二个式子超过进制范围，所以报错

## RegExp
- 属性
  
  global：是否全局匹配
  
  source：获取正则表达式文本
  
  ignoreCase：是否忽略大小写
  
  lastIndex：指定下一次匹配的起始索引，可跟exec混合使用

- 方法
  
  exec(s)：指定要检索的字符串，返回一个类数组，其中0表示第一个匹配的字符串，1，2,...这些索引则代表每个分组，groups表示捕获分组的对象(key是正则中自定义的分组名,value是匹配字符串的对应分组)、input表示原字符串、否则返回null

  test(s)：指定要检索的字符串，若有匹配的文本则返回true，否则返回false。

> 当正则对象使用了标识g(global)或y(stricky)时，每一次调用，其属性lastIndex会记录匹配字符串的结束索引+1，若索引检索到末尾，发现没找到匹配的，则此次调用返回false，lastIndex变回0，下次调用重新从开头开始匹配。如果拿这个方法去对同一个字符串进行多次调用的话，结果未必总是相同的。示例如下，
```js
var str = "pw1外";
var regExp = /\D{2}/g;

console.log(regExp.lastIndex); // 0
console.log(regExp.test(str)) // true
console.log(regExp.lastIndex);// 2

console.log(regExp.test(str)) // false
console.log(regExp.lastIndex); // 0

console.log(regExp.test(str)) // true
console.log(regExp.lastIndex); //2

// 解决办法：每次调用前重新分配一个正则对象
```

- JS中正则表达式书写方式
  
  JS风格：new RegExp(正则字符串, 修饰符);
  
  Perl风格：/正则/修饰符
  
  修饰符有忽略大小写i、全局匹配g、多行匹配m

- 常见正则表达式
```javascript
// 1、正则.*?表示非贪婪匹配模式，尽可能匹配少的
// 示例一
function render(template, context) {
  return template.replace(/{{(.*?)}}/g, (match, key) => context[key.trim()])
}
const template = "{{name}}很厉name害，才{{age}}岁";
const context = { name: "jawil", age: "15" };
console.log(render(template, context));

// 示例二
// 源字符串：aa<div>test1</div>bb<div>test2</div>cc
// 正则表达式一：<div>.*</div>
// 匹配结果一：<div>test1</div>bb<div>test2</div>
// 正则表达式二：<div>.*?</div>
// 匹配结果二：<div>test1</div>（这里指的是一次匹配结果，不使用/g，所以没包括<div>test2</div>）


// 2、必须包含数字、字母、符号3项，长度为8-10位的正则表达式
// ^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,10}$
// ^(?=.*\d)(?=.*[A-Za-z])(?=.*[,\.#%'\+\*\-:;^_`])[,\.#%'\+\*\-:;^`\w]{8,10}$


// 3、不为纯数字或字母，长度为8-16位的正则表达式
// ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$


// 4、数字、字母、符号至少两种组合，长度为8-20位的正则表达式
// ^(?![0-9]+$)(?![A-Za-z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,20}$


// 5、数字、字母、符号至少两种组合，长度为6-16位的正则表达式
// /^(?![0-9]+$)(?![A-Za-z]+$)(?![?~!,\.#&@$%()|{}"<>'\+\*\-:;^_`=/\\\[\]]+$)[?~!,\.#&@$%()|{}"<>'\+\*\-:;^_`=/\\\[\]0-9A-Za-z]{6,16}$/


// 6、千分位处理
// 小数：
// '1230.0321'.replace(/(\B)(?=(\d{3})+\.)/g, '$1,')  
// 整数： 
// '1230'.replace(/(\B)(?=(?:\d{3})+$)/g, '$1,')    
// '1230'.replace(/\B(?=(\d{3})+(?!\d))/g, ',')


// 7、提取src属性的img标签：
// /(?<=\<img src=")[\:\/\.\-a-z0-9]*(?=">)/g
// 网上：/\\< *[img][^\\>]*[src] *= *[\\"\']{0,1}([^\\"\'\ >]*)/


// 8、密码验证，非纯数字或字母：^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$


// 9、cron表达式
const secondRegex =
  /^\*$|^\?$|(^([0-9]|[1-5][0-9])-([0-9]|[1-5][0-9])$)|(^([0-9]|[1-5][0-9])\/\d+$)|(^(([0-9]|[1-5][0-9]),)*([0-9]|[1-5][0-9])$)/;

const minuteRegex =
  /^\*$|^\?$|(^([0-9]|[1-5][0-9])-([0-9]|[1-5][0-9])$)|(^([0-9]|[1-5][0-9])\/\d+$)|(^(([0-9]|[1-5][0-9]),)*([0-9]|[1-5][0-9])$)/;

const hourRegex =
  /(^\*$)|^\?$|(^([0-9]|(1[0-9])|(2[0-3]))-([0-9]|(1[0-9])|(2[0-3]))$)|(^([0-9]|(1[0-9])|(2[0-3]))\/\d+$)|(^(([0-9]|(1[0-9])|(2[0-3])),)*([0-9]|(1[0-9])|(2[0-3]))$)/;

const dayRegex =
  /^\*$|^\?$|(^([1-9]|[1-2][0-9]|3[0-1])-([1-9]|[1-2][0-9]|3[0-1])$)|(^([1-9]|[1-2][0-9]|3[0-1])\/\d+$)|(^(([1-9]|[1-2][0-9]|3[0-1]),)*([1-9]|[1-2][0-9]|3[0-1])$)/;

const monthRegex =
  /^\*$|(^([1-9]|1[0-2])-([1-9]|1[0-2])$)|(^([1-9]|1[0-2])\/\d+$)|(^(([1-9]|1[0-2]),)*([1-9]|1[0-2])$)/;

const weekRegex =
  /^\*$|^\?$|(^(SUN|MON|TUE|WED|THU|FRI|SAT)-(SUN|MON|TUE|WED|THU|FRI|SAT)$)|(^(SUN|MON|TUE|WED|THU|FRI|SAT)#\d+$)|(^(SUN|MON|TUE|WED|THU|FRI|SAT)L$)|(^((SUN|MON|TUE|WED|THU|FRI|SAT),)*(SUN|MON|TUE|WED|THU|FRI|SAT)$)/;

const yearRegex = /^\*$|^\?$|^((\d{4,4})(\,?))+$|(^(\d{4,})(\-|\,|\/)(\d{4,}|\d{1,2}|)+$)/;


// 10、中文
const chineseRegex = /^[\u4e00-\u9fa5]*$/;
```

## Error
- 用途：可用于前端错误监控

- 属性
  
  message：错误消息
  
  name：错误名称
  
  stack：错误栈

- 子类
  
  SyntaxError
  
  RangeError
  
  ReferenceError
  
  TypeError
  
  URIError


## Function
### 函数声明
- 直接定义函数
  ```js
  function 函数名([参数列表]){
      函数体
      [return 返回值;]
  }
  ```

- 匿名函数表达式
  ```js
  var fn = function([参数列表]){
    函数体
    [return 返回值;]
  };
  ```

- 动态创建函数对象
  
  动态性的体现：参数列表、函数体都是未知的，通过字符串指定
  ```js
  var fn = new Function("参数1"[,"参数2"][,...][,"参数N"],"函数体");
  ```
  
  相较前两者，有以下不同：
  
  - 函数对象是在函数创建时解析，不是与其他代码一起解析，所以这种写法的函数被调用会比较低效；
  
  - 函数不会创建它们的上下文，只能创建闭包，即在全局作用域中创建，只能访问自己的本地变量和全局变量，不能访问函数被调用的上下文作用域

> 三种函数定义方式的等价示例
  ```js
  function add(x,y) { 
    var s;
    s = x+y;
    return s;
  }

  var fn = function(x,y) {
    var s;
    s = x+y;
    return s;
  }

  var fnObj = new Function("x","y","var s;s=x+y;return s;");
  ```

> 函数声明会做函数提升，易出现问题，一般使用函数表达式

### 函数调用
- 直接调用函数
- 函数调用作为表达式，如`var f = 函数名();`，赋值函数结果，而`var f = 函数名;`是将函数引用赋值给f

### 函数参数
形参与实参个数可以不一致，但是顺序必须一致

### 函数返回值
默认是undefined

### 函数中的this
- 1.任何函数本质是通过某个对象调用
- 2.所有普通函数内都有一个变量this，表示调用该函数的对象。
- 3.函数调用时没有指明this，一般默认是当前的宿主对象

### 属性
- prototype：原型对象
- length：函数声明的参数个数
- arguments：存储函数参数的类数组对象。是所有非箭头函数的局部变量。所谓类数组对象，即只有length和callee(指向当前执行的函数)属性，以及键是从0开始的整数索引，并不具有数组其他属性和方法。无论是否在严格模式下，只要函数使用了剩余参数、默认参数或解构赋值当中的一种时，函数就不会改变arguments对象的行为，但若在非严格模式下函数没有使用剩余参数、默认参数或解构赋值时，修改arguments对象某个属性值，则会改变arguments对象的行为

### 方法
- apply(context,argsArr)：改变函数的this指向，传入上下文对象和参数数组，且立即执行
- call(context,...args)：改变函数的this指向，传入上下文对象和不定参数，且立即执行
- bind(context)：改变函数的this指向，传入上下文对象，不执行

  ```js
  // 实现bind函数
  function myBind(fn, that, ...rest){
    if(typeof fn !== 'function') {
      throw new Error("the first parameter isn't a function")
    }

    const wrapper = function(...params) {
      return fn.apply(that, rest.concat(params))
    }
    wrapper.prototype = fn.prototype
    return wrapper
  }
  ```

  ```javascript
  // 1、多次调用bind函数，this指向第一次绑定的this，但参数会接收每次调用的参数
  function log() {
    console.log('this:', this)
    console.log('arguments:', arguments)
  }
  console.log(log.bind({ val: 1 }, 1).bind({ val:2 }, 2)())

  // 2、bind函数预置部分参数
  // 有什么用途? 
  // 跟函数参数预设默认值有什么区别？bind函数预置参数是提前确定参数，调用时不可变，而函数参数预设默认值是为参数设定默认值，调用时参数可改变
  function add(x, y) { return x + y; }
  const addOne = add.bind(null, 1);
  addOne(2); // 3
  ```

## 模板字符串
### 概念
允许嵌入表达式的字符串字面量。在ES6之后又叫模板字面量。

### 特点
- 使用反引号``
- 嵌入的表达式使用${}标识
- 识别换行
- 使用转义字符时前面加反斜杠\
- 允许模板字符串中的表达式嵌入另一个模板字符串，如`This is a ${isPen ? 'pen': `pig,sorry,${friend},you should be harder!`}`

### 标签模板
- 概念：模板字符串前带有一个表达式，该表达式通常是一个函数
- 特点
  - 标签函数是在模板字符串处理后被调用
  - 函数首个参数是包含所有普通字符串的数组对象，并额外有一个属性raw，值是一个数组，用于获取原始字符串，即不对模板字符串使用转义，跟String.raw函数是一样的效果
  - 函数剩余参数表示模板字符串中的出现的每一个表达式结果
  - 函数返回值可以是一个字符串，一个函数，一个对象
  - ES2016起，标签模板需遵守该转义规则：Unicode字符以"\u"开头，Unicode码位用"\u{}"表示，16进制以"\x"开头，8进制以"\"和数字开头
    ```js
    // unicode字符在模板字符串的表示
    // `\u{55}`.length        // 1
    // (/./).test(`\u{55}`)   // true
    // `\u{2028}`.length      // 1
    // (/./).test(`\u{2028}`) // false，从2028开始占位为2 
    // `\u${55}`.length       // Uncaught SyntaxError: Invalid Unicode escape sequence
    ```
- 唯一一个内置的模板字符串标签函数`String.raw`
  
  用于获取字符串的原始字面量值。可以保证如\u开头(表示unicode字符)，\u{}(表示Unicode码位)，\x开头(表示16进制)，\数字开头(表示8进制)等不被转义
  ```javascript
  console.log(`aaaa\unicode`) // Uncaught SyntaxError: Invalid Unicode escape sequence
  console.log(String.raw`aaaa\unicode`); // 'aaaa\\unicode'
  ```

- 示例
  ```js
  // 1 标签函数返回对象
  function template1(strings) {
    // 0: undefined
    // length: 1
    // raw: ['\\unicode']
    return {
      "template": strings[0],
      "normal": strings.row[0]
    };
  } 
  console.log(template1`\unicode`);// { template: undefined, normal: "\\unicode" }

  // 2 标签函数返回字符串
  function bar(arr1, arr2) {
    console.log('params:', arr1, arr2)
    return arr1.join('')
  }
  console.log(bar`just${'123'}javac`)

  // 3 标签函数返回字符串
  function foo(str) {
    return str[0].toUpperCase()
  }
  console.log(foo`justjavac`)

  // 4 标签函数返回字符串
  var name = "benben";
  var age = 18;
  function template2(strings,nameExp, ageExp) {
    var ageStr;
    if(ageExp > 100) {
      ageStr = "centenarian";
    } else {
      ageStr = "youngster";
    }
    return strings[0] + nameExp + strings[1] + ageStr; 
  }
  console.log(template2`That ${name} is a ${age}`); 

  // 5 标签函数返回函数
  function template3(strings,...keys){
    return function(...values) {
      var dict = values[values.length - 1] || {};
      var result = [strings[0]];
      keys.foreach((key, i) => {
        var val = Number.isInteger(key)? values[key] : dict[key];
        result.push(val, strings[i + 1]); 
      })
      return result.join("");
    }
  }
  var t1 = template3`${0}${1}${0}!`;
  console.log(t1("Yes" ,"No")); // "YesNoYes!"
  var t2 = template3`${0} ${'foo'}!`;
  console.log(t2("Hello", { "foo": "World" })); // "Hello World!"
  ```

## 代码运行过程
涵盖执行上下文、this指向、作用域链、闭包等内容

- 创建/编译阶段（创建执行上下文，在函数被调用，未开始执行函数内部代码前）—— 对应V8的解析后执行前的预编译阶段
  
  创建变量对象VO和激活对象AO，进行形参、变量、函数的声明。过程中会进行变量、函数的提升；
  
  通过对外部词法环境的引用，创建作用域链。通过作用域链可以访问外部的变量对象
  
  确定this指向

- 执行/激活阶段 —— 对应V8的解释器/编译器的执行阶段
  
  设置变量值、执行代码。执行结束后，AO和作用域链会销毁，但如果使用了闭包，则AO保留在内存中

> V8引擎简要过程：解析为AST，解释为字节码，部分热码编译为机器码

```js
// 通过具体示例，分析创建、执行两阶段的过程
var scope = "global scope"
function checkScope() {
  var scope2 = "local scope"
  return scope2
}
checkScope()

// 分析：
// 1、函数创建时，会将父级上下文VO挂载在[[scope]]属性上
// checkScope.[[scope]] = [globalContext.VO]
// 2、函数执行时，创建上下文，入栈，上下文Scope属性将关联[[scope]]
// checkScopeContext = {
//   Scope: checkScope.[[scope]],
// }
// 3、创建AO
// checkScopeContext.AO = {
//   arguments: {
//     length: 0
//   },
//   scope2: undefined,
// }
// 4、AO放入作用域
// checkScopeContext.Scope = [checkScopeContext.AO, checkScopeContext.Scope]
// 5、设置变量值，代码执行，出栈
// checkScopeContext.AO.scope2 = "local scope"

// 问：执行上下文是在V8编译执行哪个过程中被创建，当中做了什么，又是什么时候被销毁？
// 上下文是在V8执行过程中被创建，分为两阶段，一是创建，二是执行，前者负责创建VO和AO，确定作用域链和this；后者设置变量值，执行函数代码。当执行结束时，函数出栈，销毁AO和作用域链
```

## 执行上下文与执行上下文栈
### *执行上下文的组成
根据ECMAScript规范，每个执行上下文都有用于跟踪代码执行进程的各种状态的组件。包括：
- 代码执行状态：任何需要开始运行，暂停和恢复执行上下文相关代码执行的状态
- 函数：上下文中正在执行的函数对象（正在执行的上下文是脚本或模块的情况下可能是null）
- Realm：一系列内部对象，一个ECMAScript全局环境，所有在全局环境的作用域内加载的ECMAScript代码，和其他相关的状态及资源
- 词法环境：用于解决执行上下文内代码所做的标识符引用。以下是解决的关键：
  
  1、基于ECMAScript代码的**词法嵌套结构**(说明一个内部环境引用了包围它的外部环境，同时这个外部环境还可以有它自己的外部环境。结果是，一个环境可以作为外部环境服务于多个内部环境。全局环境是唯一一个没有外部环境的词法环境)来**定义特定变量和函数标识符的关联**(词法环境的目的是在代码中管理数据，即标识符。换句话说，它给标识符赋予了含义。比如当我们写出这样一行代码`log(x /10)`，如果我们没有给变量`x`赋予一些含义（声明变量 x），那么这个变量（或说标识符）x 就是毫无意义的。词法环境是通过它的环境记录提供这个含义或关联)的规范类型。
  
  2、词法环境由自己独有的一个**环境记录**(保留了所有存在于该词法环境中的标识符及其绑定的记录)和一个可能为空的对外部词法环境的引用构成。
  
  3、通常，一个词法环境会与ECMAScript代码的一些特定语法结构相关联，如函数声明FunctionDeclaration, 块语句BlockStatement, Try语句TryStatement的Catch子句Catch clause。每当此类代码执行时，都会创建一个新的词法环境

  4、函数不是创建词法环境的唯一途径

- 变量环境：一种词法环境，该词法环境的环境记录保留了变量声明时在执行上下文中创建的绑定关系。

### 执行上下文
- 全局执行上下文
  
  1.在执行全局代码前，将window确定为全局执行上下文
  
  2.对全局数据进行预处理：var定义的全局变量初始化值为undefined，并添加为window属性；function声明的全局函数被添加为window方法；this赋值为window
  
  3.执行全局代码

- 函数执行上下文(调用函数产生)
  
  1.在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象（虚拟的，存在于栈）
  
  2.对局部数据进行预处理：形参变量被实参赋值，并添加为执行上下文属性；arguments被实参列表赋值，并添加为执行上下文属性；var定义的变量初始化值为undefined，并添加为执行上下文属性；function声明的函数被添加为执行上下文方法；this赋值为调用函数的对象
  
  3.执行函数体

### 执行上下文栈
执行全局代码前，JS引擎创建一个栈管理所有的执行上下文对象；
在全局执行上下文确定后，将其入栈；
在函数执行上下文确定后，将其入栈；
在当前函数执行结束后，将其出栈；
当所有代码执行结束后，栈中只剩一个全局执行上下文对象(window)。

### 牛刀小试(考察变量提升和函数提升)
```js
// 题目一
function a() {}
var a;
console.log(typeof a); //function。先后顺序：先变量提升，再函数提升。

// 题目二
if(!(b in window)) {
  var b = 1;  
}
console.log(b); //undefined。var没有块作用域，变量提升到全局作用域，

// 题目三
var c = 1;
function c(c) {
  console.log(c);
}
c(2); //报错。全局执行上下文先进行预处理，c依次初始化为undefined、函数，再执行全局代码，c被重新初始化为1，此时c是一个数值，非函数。 等效代码：
var c;
function c(c) {
  console.log(c);
}
c = 1;
c(2);
```

## this指向
### *从底层实现确认this的指向
- 1、计算MemberExpression，结果赋值给ref，可以简单理解MemberExpression是()左边的部分
- 2、判断ref是不是一个Reference类型，即看base是否为undefined, Object, Boolean, String, Number, environment record(全局上下文)其中的一个
  ```js
  // 举例如下， 
  var foo = 1;
  // 对应的Reference是：
  var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',    
    strict: false
  };
  ```
- 2.1 如果ref是Reference，并且IsPropertyReference(ref)是true, 那么this的值为GetBase(ref)
  
  方法说明，
  - GetBase：返回reference的base value
  - IsPropertyReference：若base value是一个对象，就返回true
  - GetValue：返回对象属性的具体值，而不再是一个Reference

- 2.2 如果ref是Reference，并且base value值是Environment Record, 那么this的值为ImplicitThisValue(ref)
  
  方法说明,
  - ImplicitThisValue：始终返回undefined

- 2.3 如果ref不是Reference，那么this的值为undefined。非严格模式下，this为undefined时，值会隐式转换为全局对象

```js
// 通过以下示例理解
var value = 1;
var foo = {
  value: 2,  
  bar: function () {    
    return this.value;
  }
}
console.log(foo.bar()); // 2，base是foo，是一个对象
console.log((foo.bar)()); // 2，同上
console.log((foo.bar = foo.bar)()); // 1，使用了GetValue，base不是Reference
console.log((false || foo.bar)());  // 1，同上
console.log((foo.bar, foo.bar)()); // 1，同上
```

### 牛刀小试
```js
// 1、严格模式下，普通函数中的this是undefined；非严格模式下，普通函数中的this指向全局对象
function showStrictThis () {
  'use strict'
  console.log(this)
}
showStrictThis() // undefined

// 2、一般没有指定this调用函数时，this指向全局对象
var boss1 = {
  name: 'boss1',
  returnThis () {
    return this
  }
}
var boss2 = {
  name: 'boss2',
  returnThis: boss1.returnThis
}
var boss3 = {
  name: 'boss3',
  returnThis () {
    var returnThis = boss1.returnThis
    return returnThis()
  }
}
boss1.returnThis() // boss1 
boss2.returnThis() // boss2
boss3.returnThis() // window

// 3、通过bind函数绑定上下文后，不会被之后的call、apply覆盖，但会被new覆盖
function returnThis () {
  console.log(this)
  return this
}
var boss1 = { name: 'boss1'}
var boss1returnThis = returnThis.bind(boss1)

var boss2 = { name: 'boss2' }
boss1returnThis.call(boss2) // { name: 'boss1' }
boss1returnThis.apply(boss2) // { name: 'boss1' }
new boss1returnThis() // returnThis {}

// 4、易错题
var length = 10
function fn() {
  console.log(`此时this为：`,this)
  console.log(this.length)
}
var obj = {
  length: 5,
  method: function(fn) {
    console.log(`这里的this为：`,this) // this指向obj
    fn() // this指向window。一般没有指定，直接调用就是window
    arguments[0]() // this指向arguments，而arguments自带length属性，表示参数个数
  }
}
obj.method(fn, 1) // 结果是10和2。为什么不是5和10？
```

## 作用域与作用域链
### 作用域
- 分类

  静态作用域：词法作用域。采用词法作用域的变量叫词法变量，词法变量的作用域在**编译时确定**，作用域可能是一段代码，也可能是一个函数，变量在该代码区域可见，之外不可见。静态作用域无需执行程序，只从源码角度就可看出程序如何工作。

  动态作用域：当程序执行定义了动态变量的代码段，则这段时间内该变量一直存在。代码段执行结束，变量消失。动态作用域里，取变量值时，会由内向外逐层检查函数的调用链。比如闭包，代表了一种动态的关系

- 作用域与执行上下文的区别与联系
  
  区别：除全局作用域外，函数作用域在函数定义时确定。全局执行上下文是在全局作用域确定后，代码执行前创建，函数执行上下文是在函数调用时，函数体代码执行前创建。作用域是静态的，只要函数定义好就一直存在，且不会变化，而执行上下文是动态的，调用函数时创建，函数调用结束时自动释放。

  联系：上下文环境对象是从属于所在的作用域，全局执行上下文从属于全局作用域，函数执行上下文从属于对应的函数作用域

### 作用域链
- 含义：由多个具有上下级关系的作用域形成的链，方向由内向外。通过执行上下文了解到，它在函数定义(创建/编译阶段)时就确定了

- 查找规则：查找变量是沿作用域链进行查找。查找一个变量的查找规则如下，在当前作用域的执行上下文中查找对应的属性，若有则返回，否则继续，在上一级作用域的执行上下文中查找对应的属性，若有则返回，否则继续重复上一步的操作，直到全局作用域，仍找不到即抛出找不到的异常

> 分析变量该应用哪个值，需要确定变量所在执行上下文的作用域链，进而由内到外确定每个作用域里的内部变量和外部上下文引用

### 牛刀小试
```js
// 题目一
var a = 1;
function func() {
  console.log(a);
}
function func2(fn) {
  var a = 2;
  fn();
}
func2(func); //1，func的作用域链是从func函数作用域到全局作用域，而不是从func作用域到func2作用域，再到全局作用域。

// 题目二
var fn = function() {
  console.log(fn);
}
fn(); // 正常输出，fn的作用域链是从fn函数作用域到全局作用域
var obj = {
  fn2: function() {
    console.log(fn2);
    //console.log(this.fn2);
  }
}
obj.fn2(); //报错，fn2的作用域链是从fn2函数作用域到全局作用域
```

> 从js引擎谈为什么var可以重复声明？
> 解析`var a`时检查当前作用域是否存在变量`a`，若不存在则在当前作用域声明该变量，否则忽略`var`，继续编译。
> 解析`a=2`时检查变量是否存在，若存在则赋值，否则沿作用域链向上查找，若最终找到则赋值，若找不到则在全局作用域声明该变量，再赋值
> 简单说，js引擎在这块设计上较为宽松，允许变量提升，所以遇到变量重复声明会忽略，不报错。

## 闭包
### 含义
闭包是包含了被引用的外部函数变量的一个对象，它存在于被嵌套的内部函数中。闭包是由该函数和上层执行上下文共同构成。在其他高级编程语言叫Lambda表达式

```js
function fn1() {
  var a = 2;
  var b = 'abc';
  function fn2() {
    console.log(a)
  }
}
fn1()
```
上面示例形成的闭包如下：

![](/js/闭包.png)

### 产生条件
当内部函数引用了外部函数的变量，且外部函数被调用时，就会产生一个闭包。
> 注：
> 产生闭包，内部函数是无需被调用的，只要函数定义执行即可
> 函数一定是在其定义的作用域外进行的访问时，才产生闭包

### 闭包的应用
```js
// IIFE
(function(){})()

// 一个函数作为另一个函数的返回值
function fn1() {
  var a = 1;
  function fn2() {
    a++;
    console.log(a); 
  }
  return fn2;
}
// var f = fn1();
// f(); // 2
// f(); // 3
fn1()(); // 2
fn1()(); // 2
f = null; // 释放闭包

// 一个函数作为另一个函数的实参
function func(msg) {
  setTimeout(function() {
    console.log(msg);
  }, 2000)
}
func('HelloWorld');
```

### 闭包的优缺点
- 优点
  - 使用函数内部的变量在函数执行结束后，仍然存活在内存中，延长了局部变量的生命周期
  - 让函数外部可以操作(读写)函数内部的数据(变量、函数)。以上面“函数作为另一个函数的返回值”为例
  - 屏蔽私有变量，避免外部访问
  - 形成"块级作用域"，避免全局污染

> 函数执行结束后，函数内部声明的局部变量是否存在？一般是不存在的，存在于闭包的变量才可能(外部是否仍持有闭包未释放)存在。
> 函数外部能直接访问函数内部的局部变量？不能，但我们可以通过闭包操作它

- 缺点：易内存泄漏，甚至内存溢出

  为什么会内存泄漏？从存储方式上看，闭包里的变量存储在堆，允许数据在调用的函数返回（即在执行上下文在执行调用的栈中弹出）以后仍然能够保留

  哪些原因会导致内存泄漏？定时器或回调函数未及时清理、定义了无必要的全局变量。需及时令变量为null

> 内存泄漏是指内存中的无用资源未被释放；内存溢出是程序运行时常见的一种错误，当程序运行需要的内存超过空余内存，就会抛错，停止运行

### 闭包的生命周期
- 产生：在嵌套的内部函数定义执行结束时产生
- 结束：在嵌套的内部函数成为垃圾对象时释放

### 闭包中的this
- 1.定时器
- 2.函数嵌套
- 3.事件回调

解决方案：
- 1.定义一变量引用所需的上下文`var that = this;`
- 2.使用call、apply、bind方法，指定上下文

### 牛刀小试
```js
// 练习1：
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}

var a = fun(0); // undefined
a.fun(1); // 0
a.fun(2); // 0
a.fun(3); // 0

var b = fun(0).fun(1).fun(2).fun(3); // undefined 0 1 2

var c = fun(0).fun(1); 
c.fun(2); 
c.fun(3); // undefined 0 1 1

// 练习2：为什么不是3？作用域链是函数定义时确定的，而不是在调用时确定的
function foo() {
  console.log(a);
}
function bar() {
  let a = 3;
  foo();
}
let a = 2;
bar(); // 2

// 练习3：立即自调用函数IIFE，其内部this指的就是该函数本身
var func = (function(a) {
  this.a = a
  return function(a) {
      a+= this.a
      return a
  }
})(function (a,b) {return a}(3,5))

func(7) // 10

// 练习4：
function func(n, o) {
  console.log(o);
  return {
    fun: function(m) {
      return func(m, n);
    }
  }
}
var a = func(0);
a.fun(1);
a.fun(2);
a.fun(3); // undefined、0、0、0，最后只有一个闭包，过程中产生四个闭包

var b = func(0).fun(1).fun(2).fun(3); // undefined、0、1、2，最后没有闭包，但过程中产生四个闭包

var c = func(0).fun(1);
c.fun(2);
c.fun(3); // undefined、0、1、1，最后只有一个闭包，过程中产生四个闭包
```

下面这张图你看懂了吗？
![](/js/牛刀小试_闭包.png)

## 编程范式
- 命令式编程：关注怎么做
- 面向过程编程

- 声明式编程：关注做什么，比如SQL、HTML、CSS。特点是不必创建变量存储数据；不包含循环控制语法如for、while
- 面向对象编程OOP：使用简单，共享状态
- 面向函数编程：无副作用，适合分布式计算集群的应用场景，但过度使用会导致可读性稍弱差、学习难度大（掌握λ演算、代数、范畴学等基础）

- *面向切面编程AOP（不是一种编程范式，是一种编程思想）
  
  英文名称为Aspect-Oriented Programming，目的是针对业务处理过程中的切面进行提取，所面对的是处理过程中的某个步骤或阶段，实现逻辑过程中各部分间的低耦合性

  可用于数据埋点、功能延伸等

  示例
  ```javascript
  Function.prototype.before = function(fn) {
    var __self = this;
    return function() { // 解决同时调用before和after会执行任务函数两次问题和写法上的顺序问题
      if(fn.apply(__self, arguments) == false) {
        return false; //增强健壮性
      }
      return __self.apply(__self,arguments); // 可能有返回值，需return
    }
    // fn();
    // return __self.apply(__self,arguments);// 可能有返回值，需return
  }
  Function.prototype.after = function(fn) {
    var __self = this;
    return function() {
      var result = __self.apply(__self,arguments);
      if(result == false) {
        return false; // 增强健壮性
      }
      fn.apply(__self,aruments);
      return result; // 可能有返回值，需return
    }
    // __self.apply(__self,arguments);
    // fn();  
  }
  function task() {
    alert("正在执行任务...");
    return "HelloWorld!";
  }
  //task.before(function() {
  //  alert("执行任务之前");
  //});
  //task.after(function() {
  //  alert("执行任务之后");
  //});
  //task.before(function() {
  //  alert("执行任务之前");
  //}).after(function() {
  //  alert("执行任务之后");
  //})();
  task.after(function() {
    alert("执行任务之后");
  }).before(function() {
    alert("执行任务之前");
  })();
  ```
