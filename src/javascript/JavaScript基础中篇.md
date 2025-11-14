---
title: JavaScript基础中篇
tags: 
- ECMAScript
---

# JavaScript基础中篇

## 三大对象
- 内置对象：ECMA-262定义的实例化对象，有Global、Math、JSON
- 本地对象：ECMA-262定义的类，有Object、Array、Function、String、Boolean、Number、Date、RegExp、Error等
- 宿主对象：宿主环境如果是浏览器，则宿主对象是指由浏览器定义的对象，包括window和document

## Global
- 常量
  
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
  
  parse(jsonStr[, receiver])：将指定json字符串反序列化为json对象。第二参数可选，表示解析值返回前的转换处理回调
  ```js
  const jsonStr = '{"bigNum": 12345678901234567890}';
  const jsonObj = JSON.parse(jsonStr, (key, value, context) => {
    if (typeof value === 'number') {
      // 返回的是数字字符串
      return context.source
      // 返回的是BigInt数字
      // return BigInt(context.source)
    }
    return value;
  });
  console.log(jsonObj)
  ```

  stringify(jsonObj[,replacer][,space])：将指定json对象序列化为json字符串。第二参数可选，当为函数时表示修改序列化处理的行为，当为数组时表示要包含的属性名列表，但元素为非字符串或数字的会忽略。第三参数可选，当为数字时表示在换行符、缩进等插入空格的数量，有效范围为[0, 10]，当为字符串时则表示将该字符串(超过10个字符，则取前10个字符)插入到每个key前
  ```js
  const obj = {
    a: 12345678901234567890, // 12345678901234567000
    b: NaN, // null
    c: Infinity, // null
    d() {
      console.log('Hello JSON')
    },
    e: void 0,
    f: Symbol('f'),
    g: 'g',
    h: true,
    i: 1n, // Uncaught TypeError: Do not know how to serialize a BigInt
    j: (arr = [], arr.custom = 1, arr), // []，只包含[0, length-1]的元素
    k: (map = new Map(), map.set('k', 1), map), // {}，返回空对象
  }
  const str = JSON.stringify(obj, (key, value) => {
    if(typeof value === 'bigint') {
      return value.toString()
    }
    return value
  }, '_')
  console.log(str) // '{\n_"a": 12345678901234567000,\n_"b": null,\n_"c": null,\n_"g": "g",\n_"h": true,\n_"i": "1",\n_"j": [],\n_"k": {}\n}'
  ```

- 浅拷贝与深拷贝
  
  浅拷贝：当拷贝的值是对象类型时，只要当中某一属性值变化，原对象对应属性值也会变化。常见方式如解构、`Array.prototype.slice`

  深拷贝：无论拷贝的值如何变化，原对象都不受影响。常见方式有`JSON.parse(JSON.stringify())`，但特殊值会丢失或抛错，可参考`JSON.stringify`示例
  ```javascript
  // 深拷贝实现
  function deepCopy(source, s = new WeakSet()) {
    if (!['[object Object]','[object Array]'].includes(toString.call(source))) {
      return source
    }
    
    // 防止循环引用报错
    if (s.has(source)) {
      return source
    }
    s.add(source)
    
    const target = Array.isArray(source) ? [] : {}
    for (const k in source) {
      if(!source.hasOwnProperty(k)) continue
      if (['[object Object]', '[object Array]'].includes(toString.call(source[k]))) {
        target[k] = deepCopy(source[k], s)
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
- 实例属性
  
  length：字符串长度

- 实例方法
  
  1、获取

  charAt(i)：获取指定索引的字符，兼容IE6，直接索引则不兼容
  
  indexOf(str)：获取指定字符串首次出现的位置
  
  lastIndexOf(str)：从后获取指定字符串首次出现的位置

  charCodeAt(i)：获取指定索引的字符Unicode值。
  
  fromCharCode(n1, n2, …, nx)：根据(一系列)Unicode值获取相应的字符(串)

  2、截取

  **slice(start[, end])：截取索引从start到(end-1)的子串。索引为负则表示从后往前数，-1表示最后一个字符，若开始索引的位置在结束索引的相同或后面位置，则返回空串**
  
  **substring(start[, end])：截取索引从start到(end-1)的子串。索引为负则一律视为0，此时小的作为起始索引，大的作为结束索引**
  
  **substr(start,len)：截取子串，索引从start开始`(若索引为负则从后截取长度，其中当负索引绝对值大于字符串长度，则索引值置为0，从0截取长度)`，截取长度为`min(len, start > 0? 字符串长度 - start: -start)`，若长度返回负数则最后返回空串**

  3、分割、连接、替换

  split(regexp)：按regexp分割字符串
  
  concat(str1, str2, …, strn)：返回连接多个字符串的新字符串

  replace(regexp,str/fn)：用str替换匹配regexp的子串，或提供一个回调函数，以其返回值进行替换，该函数的参数分别是匹配子串、匹配子串中的分组列表参数（参数数量不定，看有多少分组）、匹配子串在原串的偏移量、原串

  4、比较

  localeCompare(str)：表示参考字符串在本地排序中是在给定字符串之前、之后还是与之相同。若之前返回-1，之后返回1，相同返回0

  <!-- TODO:match、search函数实践与原理实现 -->
  5、搜索

  search(regexp)：获取第一个与regexp匹配的子串的起始位置，否则返回-1
  
  6、匹配

  match(regexp)：接受一个正则字符串或对象。当正则未使用g全局标志时，返回一个数组，告知第一个匹配的索引、值以及与正则表达式的子表达式(如使用分组)匹配的文本等，或返回null，找不到匹配的话。但当正则使用了g全局标志，会返回所有匹配值的数组。

  7、大小写转换

  toLowerCase()：将字符串转化为小写
  
  toUpperCase()：将字符串转化为大写

  8、去空

  trim()：去除字符串两边的空格符，包括换行符。`Whitespace is defined as white space characters plus line terminators.`

> 应用：不想在代码中使用\r\n方式换行，可以用下面代码表示换行符
  ```js
  String.fromCodePoint('0x0D');
  String.fromCharCode('0x0D');
  ```

## Array
- 特点
  
  长度可变(根据元素操作而变化或修改length属性)
  
  元素类型任意

  元素密集且类型一致则使用连续缓冲区存储（V8还会根据元素类型再细分，如整数、浮点数、引用对象），适合查询；元素稀疏或类型不一致则使用哈希表存储，适合增删。使用哈希存储，查询元素时需要计算哈希值，处理冲突，效率比连续缓冲区慢。使用顺序存储，新增元素时会检查空间是否足够，不够则扩容，而使用哈希存储无需扩容，直接新增索引-值对

- 创建方式
  ```js
  var arr = []; // 数组长度为0
  var arr = [1, 2, 3, 3]; // 数组长度为4，元素为1,2,2,3
  var arr = new Array(); // 相当于var arr=[];
  var arr = new Array(5); // 数组长度为5
  var arr = new Array(5,6,7); // 数组长度为3，元素为5,6,7
  ```

- 静态方法
  
  Array.isArray(obj)：判断对象是否是数组。若是则为true，否则为false

- 实例属性
  
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

- 实例方法
  
  1、改变数组（排序、增删改）
  
  <!-- TODO:sort函数实践与原理实现 -->
  sort([sortFn])：对数组元素采用混合排序TimSort，即结合合并排序、插入排序。默认将元素转化为字符串，按字符ASCII值由小到大排序。也可自定义排序函数，比如给元素为数字类型的数组排序，`function(a,b){return a-b;}`表示升序，`function(a,b){return b-a;}`表示降序；再者可以实现正序倒序，`function(a,b){return 1;}`返回非负值正序遍历，`function(a,b){return -1;}`返回负值倒序遍历

  pop()：删除数组的最后一个元素,并返回删除的元素

  push(ele1, ele2, …, eleN)：在数组最后添加一个或多个新元素,并返回新的数组长度，若添加的元素为数组，则数组整体作为一个单独元素，嵌套数组，构成多维数组

  shift()：删除数组的第一个元素，并返回删除的元素

  unshift(ele1, ele2, …, eleN)：在数组起始添加一个或多个新元素，并返回新的数组长度

  splice(index[, num[, item1, item2, …, itemN]])：插入、删除或替换数组的元素。指定起始索引index，添加或删除的元素数目num，若不指定则默认删除从index到数组末尾的所有元素，item1、item2等表示要添加的元素

  2、不改变数组（倒序、截取、连接、拼接）
  
  reserve()：数组元素倒序

  slice([start][, end])：返回数组的某一段,含头不含尾，若角标为负则加上数组长度length

  concat(arr1, arr2, …, arrN)：连接两个或多个数组

  join(separator)：把数组中的所有元素转换为一个字符串，需指定元素之间的分隔符

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
  
  Date()：返回日期时间字符串，相当于调用`new Date().toString()`

- 创建方式
  
  new Date()
  
  new Date(时间戳)
  
  new Date(日期时间字符串)，该时间字符串要能被Date.parse识别
  
  new Date(y, m[, d][, h][, m][, ms])

- 静态方法
  
  Date.parse(dateStr)：解析日期时间字符串，返回毫秒数

- 实例方法
  
  getDay()：获取一周的某一天[0-6]
  
  g[s]etTime()：获取或设置1970.1.1至今的毫秒数

  g[s]etFullYear([year][,month][,day])：获取或设置当前年份
  
  g[s]etMonth(month[,day])：获取或设置当前月份

  g[s]etDate(day)：获取或设置当前日期
  
  g[s]etHours(hour)：获取或设置当前小时

  g[s]etMinutes(minute)：获取或设置当前分钟

  g[s]etSeconds(second)：获取或设置当前秒

  g[s]etMilliseconds(millisecond)：获取或设置当前毫秒

  toLocaleString()：将日期时间转化为本地格式化字符串
  
  toLocaleDateString()
  
  toLocaleTimeString()

  g[s]etUTCXXX()：除了参照本地客户端时间，也提供了参照UTC时间。获取或设置格林威治时间，XXX表示fullYear/month/date/day/hours/minutes/seconds/milliseconds任意一个
  
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

- 实例方法
  
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

- 正则表达式书写方式
  
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
- 形参与实参个数可以不一致，但是顺序必须一致
- arguments表示存储函数参数的类数组对象，是所有非箭头函数的局部变量
  
  所谓类数组对象，即只有length和callee(指向当前执行的函数)属性，以及键是从0开始的整数索引，并不具有数组其他属性和方法。无论是否在严格模式下，只要函数使用了剩余参数、默认参数或解构赋值当中的一种时，函数就不会改变arguments对象的行为，但若在非严格模式下函数没有使用剩余参数、默认参数或解构赋值时，修改arguments对象某个属性值，则会改变arguments对象的行为

### 函数返回值
默认是undefined

### 函数中的this
- 1.任何函数本质是通过某个对象调用
- 2.所有普通函数内都有一个变量this，表示调用该函数的对象。
- 3.函数调用时没有指明this，一般默认是当前的宿主对象

### 属性
- name：函数名
- length：函数声明的参数个数

### 方法
- apply(context, argsArr)：改变函数的this指向，传入上下文对象和参数数组，且立即执行
- call(context, ...args)：改变函数的this指向，传入上下文对象和不定参数，且立即执行
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
