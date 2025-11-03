---
title: Generator函数与Async函数
tags: 
- ECMAScript
---

# Generator函数与Async函数

## Generator函数
### 形式
generator函数声明时，function关键字带*，调用该函数会返回一个迭代器对象，通过调用其next方法遍历内部状态
```js
// function关键字后带*，函数内有yield语句，表示一个状态，非必需
function* myGenerator() {
	yield 'Hello';
	yield 'World';
	return 'ECMAScript';
}
// 调用生成器函数后返回一个迭代器对象，表示函数内部指针，不做其他操作
const gen = myGenerator();
// 每调用next方法，指针对象会执行下一条yield语句或return语句，并返回一个对象，其中value表示当前状态的返回值，done表示是否结束
console.log(gen.next().value); // Hello
console.log(gen.next()); // { value: 'World', done: false }
console.log(gen.next().done); // true
console.log(gen.next()); // { value: undefined, done: true }
```

### 作用
相当于一个状态机
```js
// 判断一个函数是否是generator
function isGenerator(fn) {
  return fn.constructor.name === 'GeneratorFunction'
}
function* fn5() {
  yield 1
  console.log('generator')
}
console.log(isGenerator(fn5))
```
<!--more-->

### 特点
- function关键字带有星号*
- 函数体内使用关键字yield

### 返回值
调用generator函数后，函数不执行，返回结果是**一个迭代器对象**，可以依次遍历generator函数内部的每一个状态
```js
// 通过实现一个迭代器对象加深对迭代器对象的理解
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {
        done: false,
        value: value
      };
    } else {
      return {
        done: true,
        value: undefined
      };
    }
  }
}
const r = new RangeIterator(0, 3);
for (var value of r) {
  console.log("Ding! at floor #" + value);
}
// 以上代码相当于以下效果
// function* range(start, stop) {
//   for (var i = start; i < stop; i++)
//     yield i;
// }
// for (var value of range(0, 3)) {
//   console.log("Ding! at floor #" + value);
// }
```

### 使用步骤
1. 定义一个generator函数
2. 调用generator函数，获取迭代器对象
	```JavaScript
	const gen = myGenerator();
	```
3. 调用迭代器对象next方法，执行generator的下一状态
	```JavaScript
	var obj = gen.next();
	```
4. 重复第三步，直至obj对象的done属性值为true为止

### 细节
1. yield语句只能在generator函数使用，否则报语法错误
2. yield语句在函数中可以执行多次，return语句在函数中只能执行一次。但是yield语句和return语句都可后跟一个表达式的值
3. next方法可以传一个参数，表示上一次next调用的返回值，而返回值中的`value`表示yield表达式的值
  ```js
  // 调用next方法时，传入参数表示上一次next返回值。所以第一次调用next函数，传入参数是没有意义的
  function* testNext() {
    for (var i = 0; true; i++) {
      var value = yield i;
      console.log(i, value); // 0 2 / 1 undefined / 2 4
    }
  }
  var tNext = testNext();
  console.log(tNext.next()); // { value: 0, done: false }
  console.log(tNext.next(2)); // { value: 1, done: false }
  console.log(tNext.next()); // { value: 2, done: false }
  console.log(tNext.next(4)); // { value: 3, done: false }


  function* testNext2(x) {
    var y = 2 * (yield x + 1);
    console.log('y', y); // y NaN
    
    var z = yield (y / 3);
    console.log('z', z); // z undefined
    
    console.log(x, y, z);// 5 NaN undefined
    
    return x + y + z;
  }
  var a = testNext2(5);
  console.log(a.next()); // { value: 6, done: false }
  console.log(a.next()); // { value: NaN, done: false }
  console.log(a.next()); // { value: NaN, done: true }

  var b = testNext2(5);
  console.log(b.next()); // { value: 6, done: false }
  console.log(b.next(12)); // 12 * 2 / 3 { value: 8, done: false }
  console.log(b.next(13)); // 5 + 24 + 13 { value: 42, done: true }
  ```

### 应用
```js
// 使任意对象可迭代
function toIterable(obj) {
  const iterator = function* () {
    const self = this;
    for (const key in self) {
      yield self[key];
    }
  }
  obj[Symbol.iterator] = iterator;
  return obj
}

const obj = {
  name: "benben",
  sex: 'male',
  age: 30
};
for (let val of toIterable(obj)) {
  console.log(val);
}
```

## Async函数
### 形式
```JavaScript
function func1() {
	return new Promise((resolve,reject) => {resolve("Hello")});
}
function func2() {
	return new Promise((resolve,reject) => {resolve("World")});
}
async function myAsyncFunc() {
	await func1();
	await func2();
}
```

### 作用
generator函数的语法糖。目的是简化书写，提高阅读性
```js
// 判断一个函数是否是async函数
function isAsync(fn) {
  return fn.constructor.name === 'AsyncFunction'
}
async function fn3() {
  console.log('async')
}
function fn4() {
  console.log('sync')
}
console.log(isAsync(fn3))
console.log(isAsync(fn4))
```

### 特点
1. 关键字async取代星号*
2. await语句取代yield语句

### 返回值
调用async函数后，函数执行，并返回一个**Promise对象**，可以把async函数看成是一个多层嵌套的Promise对象
```js
// async函数与Promise写法比较1
async function func() {
  const result = await func2();
  console.log(result);
}
// 等价于
// function func() {
//   return new Promise((resolve) => { 
//     func2(resolve) 
//   }).then((result) => {
//     console.log(result);
//   })
// }
```

```js
// async函数与Promise写法比较2
const p = Promise.resolve();
(async () => {
  await p;
  console.log("after await");
})();
p.then(() => {
  console.log("then:1");
}).then(() => {
  console.log("then:2");
});
// 等价于
// const p = Promise.resolve();
// (() => {
//   return new Promise(resolve => {
//     // 后期优化：减少一次事件循环
//     // 优化前：
//     // const promise = new Promise(res => res(p));
//     // 优化后：
//     const promise = Promise.resolve(p);
//     promise.then(() => {
//       console.log("after await");
//       resolve();
//     });
//   });
// })();
// p.then(() => {
//   console.log("then:1");
// }).then(() => {
//   console.log("then:2");
// });
```

### 使用步骤
1. 定义一个async函数
2. 调用async函数，获取Promise对象
  ```JavaScript
  const pro = myAsyncFunc();
  ```
3. 调用Promise对象then方法，获取每次异步操作的结果
  ```JavaScript
  pro.then((result) => {
    console.log(result)
  },(error) => {
    console.log(error)
  });
  ```

### 细节
1. yield语句后只能跟thunk函数或Promise对象，await语句后可跟Promise对象或基本类型值
2. await语句如果后跟Promise对象时，使用try...catch语句，防止报错
3. await语句如果后跟Promise对象时，会等待该Promise结果，只有返回状态是resolved情况，才把结果返回，否则await不会接收返回结果，await下面的代码也不会继续执行

### 示例
```js
function timeoutPromise(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve("done");
    }, interval);
  });
};
async function timeTest() {
  // 顺序处理，三个函数的定时器的触发时间点不同
  await timeoutPromise(3000);
  await timeoutPromise(3000);
  await timeoutPromise(3000);
}
const startTime = Date.now();
timeTest().then(() => {
  const finishTime = Date.now();
  const timeTaken = finishTime - startTime;
  alert("Time taken in milliseconds: " + timeTaken); // 耗时 10103
})

async function timeTest2() {
  // 将三个异步操作函数提前同时触发并行处理
  const timeoutPromise1 = timeoutPromise(3000);
  const timeoutPromise2 = timeoutPromise(3000);
  const timeoutPromise3 = timeoutPromise(3000);
  await timeoutPromise1;
  await timeoutPromise2;
  await timeoutPromise3;
}
const startTime2 = Date.now();
timeTest2().then(() => {
  const finishTime = Date.now();
  const timeTaken = finishTime - startTime2;
  alert("Time taken in milliseconds: " + timeTaken); // 耗时 3001
})
```

```js
const fn = async function () {
  let num  = await 1
  console.log('step4:', num)
  await new Promise(resolve => { setTimeout(() => resolve(++num), 0) })
  console.log('step5:', num)
  return num
}
console.log('step1')
fn().then(num => console.log('step6:', num))
console.log('step2')
setTimeout(() => console.log(100), 0)
console.log('step3')
// 结果：
// step1
// step2
// step3
// step4: 1
// 100
// step5: 2
// step6: 2
```
