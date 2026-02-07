---
title: ES6中篇
tags: 
- ECMAScript
---

# ES6中篇
## 数字扩展
- 数字表示
  ```js
  // 八进制
  console.log(0o2000 === 1024);
  // 二进制
  console.log(0b10000000000 === 1024);
  ```

- 静态属性
  ```js
  // Number.EPSILON
  console.log(0.1 + 0.2 === 0.3);
  console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);
  ```

- 静态方法
  ```js
  // Number.isNaN
  Number.isNaN(NaN);
  Number.isNaN(1);

  // Number.isInteger
  Number.isInteger(1);
  Number.isInteger(NaN);
  ```

## 字符串扩展
- 实例方法
  ```javascript
  // repeat(n) 指定重复次数，返回重复n次后的字符串
  const _666 = Array.from("6".repeat(3)).map((item) => {
    return item.repeat(3);
  }).join('');
  console.log(_666);

  // startsWith

  // endsWith

  // includes

  // padStart(minLen, fillStr) 对字符串设置最小长度，超出则前补位

  // padEnd(minLen, fillStr) 对字符串设置最小长度，超出则后补位
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
  // 例1 标签函数返回对象
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

  // 例2 标签函数返回字符串
  function bar(arr1, arr2) {
    console.log('params:', arr1, arr2)
    return arr1.join('')
  }
  console.log(bar`just${'123'}javac`)

  // 例3 标签函数返回字符串
  function foo(str) {
    return str[0].toUpperCase()
  }
  console.log(foo`justjavac`)

  // 例4 标签函数返回字符串
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

  // 例5 标签函数返回函数
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

## 数组扩展
- 改变数组的方法
  
  copyWithin(pos[, start][, end])：指定复制序列的起始位置，被复制的起始和结束索引。若为负数，则从后往前数，且其绝对值超出数组长度则置为0。若始末位置的长度超过了从目标位置到数组最大索引的长度，则会截断，数组长度不改变。
  ```js
  // 浅拷贝数组的一部分到同一个数组中的另一个位置，并返回它，数组长度不变
  const arr = [{ a: 1 }, 23, 34, 45, 56, 67]
  console.log(arr.copyWithin(3, 0, 3))
  arr[0].a = 2
  console.log(arr)
  ```

  fill(value[, start][, end])：使用一个固定值替换数组指定范围内元素的值

- 不改变数组的方法（包含、获取、遍历、检测、查找、过滤、映射、累加）
  
  includes(item[, start])：判断数组是否包含指定值。也可指定从哪一起始位置开始，默认值为0，取值效果如下，值范围在`[-Infinity, -length] || 0`则整个数组都会被搜索，范围在`(-length, 0) U (0, length)`则为负从后往前数，为正数从前往后数，范围在`[length, Infinity]`则不搜索，直接返回false

  indexOf(item[,start])：获取指定元素的索引，否则返回-1，也可指定从哪一起始位置开始
  ```js
  [NaN].includes(NaN); // true
  [NaN].indexOf(NaN); // -1
  ```

  lastIndexOf(item[,start])：从后向前搜索指定元素的索引，否则返回-1，也可指定从哪一起始位置开始  

  every(function(ele[,index][,arr][,thisValue]){})：检测数组所有元素是否都符合指定条件，若是则返回true，否则返回false。ele表示数组元素，index表示数组索引，arr表示数组对象，thisValue表示上下文对象
  ```js
  // every不支持异步回调，若传入是异步函数，总是返回true
  [1, 2, 3].every(async val => val > 3)
  Array.prototype.everySync = async function(cb, thisArg) {
    for(let [index, item] of Object.entries(this)) {
      if(!await cb(item, index, this)) return false
    }
    return true
  }
  await [1,2,3].everySync(async val => val > 3)
  ```

  some(function(ele[,index][,arr][,thisValue]){})：检测数组中是否有元素满足指定条件，若有一元素满足则返回true，否则返回false
  ```js
  // some不支持异步回调，若传入是异步函数，总是返回true
  [1, 2, 3].some(async val => val === 4) // true
  Array.prototype.someSync = async function(cb, thisArg) {
    for(let [index, item] of Object.entries(this)) {
      if(await cb(item, index, this)) return true
    }
    return false
  }
  await [1,2,3].someSync(async val => val === 4) 
  ```

  filter(function(ele[,index][,arr][,thisValue]){})：创建新的数组，存储满足过滤条件的元素
  ```js
  // filter不支持异步回调，若传入是异步函数，没有任何过滤效果
  [1, 2, 3].filter(async item => item % 2 !== 0) // [1, 2, 3]
  Array.prototype.filterSync = async function(cb, thisArg) {
    // this.map给每个元素生成相应的回调，并返回数组
    const filterResult = await Promise.all(this.map(cb))
    return this.filter((_, index) => filterResult[index])
  }
  await [1,2,3].filterSync(async item => item % 2 !== 0) // [1,3]
  ```

  find(function(ele[,index][,arr][,thisValue]){})：获取符合指定条件的第一个元素。

  findIndex(function(ele[,index][,arr][,thisValue]){}) ：获取符合指定条件的第一个元素的索引。

  entries()：获取数组的迭代对象，即以数组索引值作为key，以数组元素作为value

  keys()：获取包含键的可迭代对象

  values()

  forEach(function(ele[,index][,arr][,thisValue]){})：调用数组的每个元素，并将其传递给回调函数
  ```javascript    
  // forEach支持异步回调
  [1, 2, 3].forEach(async function (val) { console.log(val ** 2) })
  ```

  map(function(ele[,index][,arr][,thisValue]){})：创建新的数组，存储处理后的元素。返回值是原数组的一个浅拷贝，不是深拷贝。
  ```js
  let arr = []
  arr[2] = 1
  arr = arr.map(i => 2)
  // 为什么不是[2, 2, 2]？受map函数内部约束，当元素为empty，无论做什么操作，总是empty
  console.log(arr) // [empty × 2, 2]

  // map支持异步回调，注意返回结果是一个Promise数组
  [1, 2, 3].map(async function (val) { return val ** 2 })
  ```

  reduce(function(total,ele[,index][,arr][,thisValue]){})：接收一个函数作为累加器，数组中的每个元素从左到右开始缩减，最终计算为一个值，存储在total，其他参数定义同every。
  ```javascript
  // reduce支持异步回调，注意返回值是一个Promise
  await [1, 2, 4].reduce(async (sum,val) => await sum + val, 0)
  ```

  reduceRight(function(total,ele[,index][,arr][,thisValue]){})：接收一个函数作为累加器，数组中的每个元素从右到左开始缩减，最终计算为一个值，存储在total，其他参数定义同every。

- 静态方法（转换）
  
  Array.from(obj[, mapfn][, thisValue])：将具有length属性的对象或可迭代的对象转换为一个数组。obj表示要转换为数组的对象，mapfn表示数组中每个元素要调用的函数，thisValue表示映射mapfn函数中的this对象。虽然利用数组的解构赋值也能实现转换，但是该方法的功能不仅于此。
  ```js
  Array.from({length: 3}, (v, k) => k)
  ```

  Array.of(ele1, ele2, …, eleN)：返回所有参数组成的数组

- 示例
  ```js
  // 实现记录重复出现的数字次数，并删除重复数字
  (function (arr) {
    
    let tmpArr = [];
    let result = [];

    arr.forEach((item) => {
      if (tmpArr.includes(item)) {
        result.find((i) => {
          return i.value === item;
        }).count++;
      } else {
        tmpArr.push(item);
        result.push({
          value: item,
          count: 1
        })
      }
    })

    console.log("重复出现的数字次数：", result);

    tmpArr.sort((a, b) => {
      return a - b
    });
    console.log("去重后的数组：", tmpArr);

    return {
      uniqueArr: tmpArr,
      countResult: result
    }
  })([1, 1, 2, 2, 3, 3, 35, 5, 55, 55, 3, 3, 3, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10111, 2223]);
  ```

## 对象扩展
- 静态方法
  ```javascript
  // Object.assign(targetObj, srcObj1, srcObj2, ...): 将多个源对象的自身可枚举属性复制到目标对象
  // 注意：
  // 1. 源除了可以是对象，也允许是基本数据类型或数组，此时索引作为属性名
  Object.assign('0', {n: 1}) // String {0: '0', n: 1, length: 1}
  // 2. 若多个源中有相同的可枚举属性，则后面的源的属性会覆盖前面的
  Object.assign({}, [1, 23, 4], 1, false, '', null, undefined, Symbol, { a: 1 }, { a: 2 } );
  // {0: 1, 1: 23, 2: 4, a: 2}

  // Object.defineProperty(obj, key, descriptor)：默认情况下添加的属性是不可写、不可枚举和不可配置的。第三参数配置项说明如下，
  // writable表示是否可写
  // configurable表示是否可配置，一旦配置为false，后续一切设置都不生效，除了writable从true变成false；且该属性不可删除，使用delete无效
  // enumerable表示是否可枚举，提供obj.propertyIsEnumerable(key)检查是否可枚举
  const obj = {
    name: 'Jake'
  }
  Object.defineProperty(obj, 'age', {
    value: 12,
    enumerable: false,
    writable: false,
    configurable: false
  })
  obj.age = 25
  console.log(obj.age) // 12
  console.log(obj) // { name: 'Jake' }
  console.log(Object.keys(obj)) // [ 'name' ]
  // 防属性被修改
  const obj = {
    name: 'Mike'
  }
  // obj.getName = function() {
  //   return this.name 
  // }
  Object.defineProperty(obj, 'getName', {
    get() {
      return function() { 
        return this.name 
      }
    },
  })
  obj.getName = 'John'
  console.log(obj.getName())

  // Object.keys(obj)、Object.getOwnPropertyNames(obj)、Object.getOwnPropertySymbols(obj)与Reflect.ownKeys(obj)、for...in语句这5种获取对象属性的差异
  const parent = {
    a: 1,
    b: 2,
    c: 3
  };
  const child = {
    d: 4,
    e: 5,
    [Symbol()]: 6
  };
  child.__proto__ = parent;
  Object.defineProperty(child, "d", {
    enumerable: false
  });
  // 包括自身和父级属性，不包括不可枚举和Symbol
  for (var attr in child) { 
    console.log("for...in:", attr); // a, b, c, e
  }
  // 只包括自身属性，不包括不可枚举和Symbol
  console.log("Object.keys:", Object.keys(child)); // [ 'e' ]
  // 只包括自身属性，包括不可枚举，但不包括Symbol
  console.log("Object.getOwnPropertyNames:", Object.getOwnPropertyNames(child)); // [ 'd', 'e' ]
  // 只包括自身所有Symbol属性
  console.log("Object.getOwnPropertySymbols:", Object.getOwnPropertySymbols(child)); // [Symbol()]
  // 包括自身属性，包括不可枚举和Symbol
  console.log("Reflect.ownKeys:", Reflect.ownKeys(child)); // [ 'd', 'e', Symbol() ]

  // Object.values()

  // Object.entries()

  // Object.getOwnPropertyDescriptors()

  // Object.getPrototypeOf()：实质是获取__proto__属性值
  console.log(Object.getPrototypeOf(Function) === Function.__proto__) // true

  // Object.setPrototypeOf()：实质是o1.__proto__ = o2
  const fn1 = function(){};
  const fn2 = function(){};
  fn2.fn2Var = 1
  Object.setPrototypeOf(fn1, fn2)
  fn2.prototype.fn2Method = function() { 
    console.log('call method...') 
  }
  // 会覆盖上一次setPrototypeOf调用
  Object.setPrototypeOf(fn1, fn2.prototype)
  console.log(fn1.fn2Var)
  fn1.fn2Method()

  // Object.preventExtensions、Object.seal、Object.freeze的区别
  // 1、preventExtensions阻止对象扩展，不能添加属性
  // 2、seal阻止对象扩展，并且阻止删除已有属性和修改属性描述符，但可以修改属性值
  // 3、freeze阻止对象扩展，并且阻止删除已有属性、修改属性描述符和修改属性值

  // Object.is：等同于===，但是
  console.log(NaN === NaN) // false
  console.log(Object.is(NaN, NaN)) // true
  console.log(+1 === -1) // false
  console.log(Object.is(+1, -1)) // true
  ```

- 实例方法
  ```js
  // hasOwnProperty: 检查某属性是否是该对象的自身属性
  const a = {
    o: 1
  };
  a.hasOwnProperty('o'); // true
  // 也可以用在数组上，属性名则是索引。可以用来判断数组某索引是否有值
  console.log([1,2].hasOwnProperty(2)) // false

  // isPrototypeOf: 检查某对象是否是在另一对象的原型链上，效果等效于instanceOf
  Object.prototype.isPrototypeOf(Function.prototype); // true
  const num = new Number(1)
  console.log(Object.prototype.isPrototypeOf(num)) // true
  console.log(Function.prototype.isPrototypeOf(num)) // false
  console.log(Number.prototype.isPrototypeOf(num)) // true
  console.log(num instanceof Object) // true
  console.log(num instanceof Function) // false
  console.log(num instanceof Number) // true
  ```

## 正则扩展
- 实例属性
  
  flags：返回正则表达式的修饰符
  
  sticky：是否设置y标志。表示粘连修饰符，与g标志一样都是全局匹配，并且下一次匹配都是从上一次匹配成功的下一个位置开始，区别在于g修饰符只要剩余位置中存在匹配即可，而y修饰符确保匹配必须从剩余的第一个位置开始
  
  hasIndices：是否设置d标志。表示正则表达式执行后的匹配结果包含其开始和结束索引。即调用exec方法后，其返回值带有indices属性，是一个存放匹配结果开始和结束索引的数组
  
  unicodeSets：是否设置v标志。对u标志的升级，启用了更多与Unicode相关的功能，所以使用该标志时不能使用u标志，否则报语法错误

## 函数扩展
- 箭头函数
  - 特点
    - 箭头函数没有arguments
    - 箭头函数中的this，取决于函数定义时所在的作用域。一般通过obj.method()调用的方法建议使用非箭头函数定义，这些函数需要从调用者的作用域中获取一个有意义的this值。其它情况可以使用箭头函数
    - 箭头函数不可以new创建，避免造成是函数还是对象的二义性

  ```js
  // 箭头函数体直接返回一个对象时使用小括号括起
  const fn = () => ({foo:1})
  ```

- 函数中的不定参数——形参剩余参数

  位置置于形参最后，若没有应用到不定参数，默认值是空数组

- 函数中的默认参数——形参默认值
  ```js
  // 形如param = defaultValue，若没有传默认值，隐式默认是undefined
  function add(a = 1, b = 2, ...other) {
    return a + b + other.reduce(function (prev, curr, currIdx) {
      return prev + curr
    }, 0);
  }
  console.log(add(2)); // 4
  console.log(add(2, 3, 4, 5, 5, 5)); // 24

  // 函数参数默认值可以作抛出异常使用
  const throwError = () => { throw new Error('error') }
  const fn = (func = throwError()) => {
    return func
  }
  fn()
  ```

- 函数参数解构赋值
  ```js
  function func([x, y]){
    return x + y;
  }
  func([1, 2]);

  function foo({m, n}){
    return m * n;
  }
  foo({m: 3, n: 2})
  ```
