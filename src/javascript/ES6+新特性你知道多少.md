---
title: ES6+新特性你知道多少
tags: 
- ECMAScript
---

# ES6+新特性你知道多少

## ES2017
- 允许在函数参数定义、函数调用、字面量对象或数组声明的最后一项加逗号

- SharedArrayBuffer
  
  作用：实现线程间数据共享
  
  API
  - byteLength()
  - slice()
  
  > 并行指多线程同时执行，并发指单线程轮流执行
  > 
  > JS并行历史：JS 单线程 WebWorker GPU SIMD PJS

- Atomics
  
  作用：保证安全共享数据，线程同步

  API
  ```js
  // 线程同步
  Atomics.store()
  Atomics.load()
  Atomics.exchange()
  Atomics.compareExchange()

  // 原子操作
  Atomics.add()
  Atomics.and()
  Atomics.or()
  Atomics.xor()
  Atomics.sub()

  // 线程通信
  Atomics.wait()
  Atomics.wake()
  Atomics.isLockFree()
  ```

## ES2018
- [asynchronous iteration via the AsyncIterator protocol and async generators](./ES6上篇#迭代器对象)

- 正则
  ```javascript
  // u表示启用Unicode模式，.可以匹配unicode字符
  console.log(new RegExp(/foo.bar/).test('foo\u0000bar')) // true
  console.log(new RegExp(/foo.bar/u).test('foo\u0000bar')) // true


  // s表示启动dotAll模式，.可以匹配任意字符，包括换行符\n和\r
  console.log(new RegExp(/foo.bar/).test('foo\nbar')) // false
  console.log(new RegExp(/foo.bar/s).test('foo\nbar')) // true


  // Unicode property escapes，匹配特定的Unicode字符集
  // \p{Script=XXX}表示匹配XXX，\P{Script=XXX}表示不匹配XXX
  // 梵文
  console.log(new RegExp(/\p{Script=Devanagari}/u).test('α')) // false
  // 希腊字母
  console.log(new RegExp(/\p{Script=Greek}/u).test('α')) // true
  console.log(new RegExp(/\p{Script_Extensions=Greek}/u).test('α')) // true
  // 表情符号
  console.log(new RegExp(/\p{Emoji}/u).test('😀')) // true


  // 命名捕获组(?<name>正则)
  const re1 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
  const result = re1.exec('2018-04-30')
  console.log(result) // ["2018-04-30", "2018", "04", "30"]
  // \k<name>引用命名捕获组
  const re2 = /(?<fruit>apple|banana)===\k<fruit>/
  console.log(re2.test('apple===orange')) // false
  console.log(re2.test('banana===banana')) // true
  // $<name>在replace参数里引用命名捕获组
  const re3 = /(?<firstName>[A-Za-z]+)\s(?<lastName>[A-Za-z]+)$/
  console.log('Li Qiang'.replace(re3, 'Mr(s) $<lastName> $<firstName>')) // Mr(s) Qiang Li


  // 后向断言(look-behind assertions)
  // 正则是从右到左的贪婪匹配，也就是说右边匹配最长，左边匹配最短。注意引用捕获组，要放在前，如\1(.)，而不是(.)\1，因为是从右到左匹配的
  // 匹配后面是B的A：A(?=B) 
  // 匹配后面不是B的A：A(?!B) 

  // 相应地，早期已支持前向断言
  // 匹配前面是A的B：(?<=A)B 
  // 匹配前面不是A的B：(?<!A)B 
  ```

- rest parameter and spread operator support for object properties

- [Promise.finally](./ES6系列之Promise基础#finally-callback)

## ES2019
```javascript
// Array.prototype.flat()
// Array.prototype.flatMap()

// Object.fromEntries()

// String.prototype.trimStart()
// String.prototype.trimEnd()

// optional catch binding parameters and allowing U+2028 (LINE SEPARATOR) and U+2029 (PARAGRAPH SEPARATOR) in string literals to align with JSON

// requiring that Array.prototype.sort be a stable sort

// requiring that JSON.stringify return well-formed UTF-8 regardless of input

// clarifying Function.prototype.toString by requiring that it either return the corresponding original source text or a standard placeholder
```

## ES2020
- Promise.allSettled

  获取所有Promise结果，无论状态是fulfilled还是rejected
  ```js
  Promise.allSettled([
    Promise.reject('error'),
    Promise.resolve('success'),
    new Promise((resolve,reject)=>{
      reject('hello');
    }),
    new Promise((resolve,reject)=>{
      resolve(12138);
    })
  ]).then(res=>{
    res.forEach(r=>{
      switch(r.status){
        case 'fulfilled':
          console.log(r.value);
          break;
        case 'rejected':
          console.log(r.reason);
          break;
      }
    })
  });
  ```

- String.prototype.matchAll
  
  一次取出所有匹配。match返回一个元素是匹配字符串的数组，而matchAll返回一个二维数组，元素是包含匹配字符串、匹配字符串在原串中的开始索引index、组group、原串input等信息的一个数组
  ```js
  var matchArr = "[a-[baa-[c".matchAll(/\[[a-z]/g);
  for (var val of matchArr) {
    console.log(val);
  }
  ```

- 动态导入

  `import(module)`可以在任何地方调用，返回一个结果为模块对象的Promise，实现按需加载
  
  `import.meta`表示一个对象，携带模块元信息

  ```js
  window.addEventListener('load', function() {
    // 一个模块元信息对象
    console.log(import.meta); // {url: "http://127.0.0.1:5500/ES2020/index.html"}

    var btnImport = document.querySelector('#btn-import');
    btnImport.addEventListener('click', async function() {
      var m = await import('./test.js');
      console.log(m);
      m.func();
    })
  })
  ```

- globalThis 

  一个全新的标准方法用来获取全局this
  ```js
  // window只支持浏览器
  // self只支持浏览器和WebWorkers
  // global只支持Nodejs
  console.log(globalThis === window);
  ```

- 空位合并操作符??

  提高效率，当左侧值为undefined或null时取右侧值，不包括0、false、可转换为false的其他类型
  ```js
  console.log(0 ? 1 : 2); // 2
  console.log(0??1); // 0
  ```

- 可选链操作符?.
  
  简化书写，解决属性多层级调用书写不方便问题
  ```js
  var a = {
    b: {
      c: 1
    }
  }
  console.log(a?.b?.c); // 1
  console.log(a?.b?.c?.d); // undefined
  ```

- [BigInt数据类型](./ES6上篇.md#bigint数据类型)

- static关键字
  ```js
  class Color {
    static red = '#FF0000';
    static blue = 'blue';
  }
  console.log(Color.red);
  ```

## ES2021
- String.prototype.replaceAll
  ```javascript
  const s = 'hello world'
  console.log(s.replaceAll('l', 'L'))
  ```

- Promise.any
```js
// Promise.any与Promise.race、Promise.all比一比
// Promise.all：若所有Promise成功，则返回所有成功的结果数组，若有一个Promise失败，则返回第一个失败的结果
// Promise.race：返回第一个成功的结果，否则返回第一个失败的结果
// Promise.any: 返回第一个成功的结果，否则抛错
Promise.race([
  new Promise((resolve,reject) => {resolve(1)}),
  new Promise((resolve,reject) => {resolve(2)}),
  new Promise((resolve,reject) => {resolve(3)})
])
.then(res => console.log('then:',res)) // then: 1
.catch(res => console.log('catch:',res))

Promise.all([
  new Promise((resolve,reject) => {resolve(1)}),
  new Promise((resolve,reject) => {resolve(2)}),
  new Promise((resolve,reject) => {resolve(3)})
])
.then(res => console.log(res)) // then: [1,2,3]
.catch(res => console.log('catch:',res)) 

Promise.any([
  new Promise((resolve,reject) => {resolve(1)}),
  new Promise((resolve,reject) => {resolve(2)}),
  new Promise((resolve,reject) => {resolve(3)})
])
.then(res => console.log('then:',res)) // then: 1
.catch(res => console.log('catch:',res)) 


Promise.race([
  new Promise((resolve,reject) => {reject(1)}),
  new Promise((resolve,reject) => {reject(2)}),
  new Promise((resolve,reject) => {reject(3)})
])
.then(res => console.log('then:',res))
.catch(res => console.log('catch:',res)) // catch: 1

Promise.all([
  new Promise((resolve,reject) => {reject(1)}),
  new Promise((resolve,reject) => {reject(2)}),
  new Promise((resolve,reject) => {reject(3)})
])
.then(res => console.log('then:',res))
.catch(res => console.log('catch:',res)) // catch: 1

Promise.any([
  new Promise((resolve,reject) => {reject(1)}),
  new Promise((resolve,reject) => {reject(2)}),
  new Promise((resolve,reject) => {reject(3)})
])
.then(res => console.log('then:',res))
.catch(res => console.log('catch:',res)) // catch: AggregateError: All promises were rejected


Promise.race([
  new Promise((resolve,reject) => {resolve(1)}),
  new Promise((resolve,reject) => {reject(2)}),
  new Promise((resolve,reject) => {resolve(3)})
])
.then(res => console.log('then:',res)) // then: 1
.catch(res => console.log('catch:',res))

Promise.all([
  new Promise((resolve,reject) => {resolve(1)}),
  new Promise((resolve,reject) => {reject(2)}),
  new Promise((resolve,reject) => {resolve(3)})
])
.then(res => console.log('then:',res))
.catch(res => console.log('catch:',res)) // catch: 2

Promise.any([
  new Promise((resolve,reject) => {resolve(1)}),
  new Promise((resolve,reject) => {reject(2)}),
  new Promise((resolve,reject) => {resolve(3)})
])
.then(res => console.log('then:',res)) // then: 1
.catch(res => console.log('catch:',res))
```

- AggregateError

- 逻辑运算符：??=、&=、||=

- WeakRef

  使JS引擎能及时回收垃圾，无需人工干预。[点这](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)了解更多
  ```js
  let o = {
    a:1
  }
  const weakRefO = new WeakRef(o)
  console.log(weakRefO.deref()) // { a: 1 }
  // 人工干预，但WeakRef并没有立即回收，说明JS引擎认为它还不是垃圾对象
  o = null
  console.log(weakRefO.deref()) // { a: 1 }
  console.log(o) // null
  ```

  应用：使用弱引用作缓存
  ```js
  const cache = new Map();
  const setValue =  (key, obj) => {
    console.log('cache set...');
    cache.set(key, new WeakRef(obj));
  };
  const getValue = (key) => {
    const ref = cache.get(key);
    if (ref) {
      console.log('cache get...');
      return ref.deref();
    }
  };

  function calculateFibonacci(num) {
    if(num == 1 || num == 2){
      return 1;
    }else{
      return calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
    }
  }
  console.time('no-cache')
  console.log(calculateFibonacci(10));
  console.timeEnd('no-cache');

  const fibonacciCached = (number) => {
    const cached = getValue(number);
    if (cached) return cached;
    const sum = calculateFibonacci(number);
    setValue(number, new Number(sum));
    return sum;
  };
  console.time('cache');
  console.log(+fibonacciCached(10));
  console.timeEnd('cache');
  ```

- FinalizationRegistry

- 数字分隔符_

  为了提高可读性，启用了下划线作为数字文字中的分隔符
  ```js
  console.log(1_000_000_000_000)
  ```

- Array新API
  ```js
  // Array.prototype.sort？

  // Array.prototype.at支持传负值，倒序获取元素
  console.log([12, 34, 56, 78, 90].at(-1)) // 90

  // Array.prototype.findLastIndex/Array.prototype.findLast倒序获取符合条件的元素或索引
  console.log([12, 34, 56, 78, 90].findLastIndex(val => val < 50)) // 1
  console.log([12, 34, 56, 78, 90].findLast(val => val < 50)) // 34
  ```

## ES2022
<!-- TODO: -->

## ES2023
<!-- TODO: -->

## ES2024
<!-- TODO: -->

## ES2025
<!-- TODO: -->
