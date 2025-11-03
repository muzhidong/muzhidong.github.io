---
title: Promise基础
tags: 
- ECMAScript
---

# Promise基础

## Promise定义
一个异步类，用于传递异步操作的消息。通过new关键字创建实例

## Promise特点
- 状态封闭性。状态不受外界改变，只有异步操作结果可以决定当前的状态。共3种状态，分别是Pending、Fulfilled和Rejected。 只有两种状态改变，即从Pending变为Fulfilled以及从Pending变为Rejected
- 状态不变性。一旦状态改变就不会再变，一直保持这个结果。比如一个Promise对象的状态已经为Fulfilled，根据状态不变性，再在主线程中抛错是无效的
- 状态连锁性。如果一个Promise实例传递了另一个Promise实例，那么该实例会随着要传递的Promise实例的状态变化而变化
<!--more-->

## 创建Promise实例
创建Promise实例时需要传入一个同步函数，传入函数带有resolve函数和reject函数两个参数。resolve函数会将Promise对象从Pending状态转为Fulfilled状态，并在操作成功时将异步操作结果作为参数传递出去；而reject函数会将Promise对象从Pending状态转为Rejected状态，并在操作失败时将错误对象传递出去

Promise采用回调函数延迟绑定技术，调用then时回调只是放入一个内存队列中，尚未执行，直到resolve函数执行才触发

示例如下，
```js
const promise = new Promise(function(resolve,reject) {
  const image = new Image();
  image.src = "https://muzhidong.github.io/logo.png";
  image.addEventListener("load",() => {
     resolve(image);
  });
  image.addEventListener("error",() => {
     reject(new Error("wrong..."));
  });
});
```

## Promise实例方法
### then(onFulfilled, [onRejected])
- 作用：Promise状态改变时进行回调处理
- 参数：onFulfilled表示异步操作成功时执行的回调，onRejected表示异步操作失败时执行的回调。两个回调函数都将接收Promise对象传出的值作为函数参数
- 返回值：新Promise实例，可通过链式调用需顺序执行的操作
- 注意
  
  1.不论是onFulfilled方法执行，还是onRejected方法执行，当中抛异常都会把当前实例状态变为失败，结果为undefined
  
  2.then两个方法参数中，如果返回一个新Promise实例，则该实例结果决定了当前实例状态是成功还是失败，成功则当前实例结果为该实例的结果，失败则结果为undefined
  
  3.其他实例变为成功状态的情况，上一个then中方法返回的结果会传递到下一个then的方法中

### catch(callback)
- 作用：相当于`then(null,callback)`，异步操作失败时进行的回调处理
- 参数：callback表示异步操作失败时执行的回调
- 返回值：新Promise实例，不管有无被捕获都会继续执行接下来的方法

### finally(callback)
- 作用：不管Promise对象最后状态如何都会执行的动作
- 参数：必须执行的回调函数
- 返回值：新Promise对象

## Promise静态方法
### all(iterator)
- 作用：将多个Promise实例包装成一个新的Promise实例
- 参数：迭代器对象，每个成员都是Promise对象
- 返回值：新Promise实例。当迭代器对象每个成员状态均为fulfilled时，状态为fulfilled，传递一个由各成员的返回值组成的数组，否则状态为rejected，传递第一个被rejected的成员的返回值

### race(iterator)
基本同all方法，不同之处在于只要迭代器中任一成员的状态发生变化，则终止执行，返回该成员状态和结果的新Promise实例

### resolve([obj])
- 作用：转化为Promise对象，且状态为fulfilled
- 参数：任意对象。不传递参数时直接创建Promise对象。当值是一个Promise对象时，则状态由该Promise状态决定。当值是一个thenable对象(具有then方法的对象)时，Promise.resolve方法会将这个对象转为Promise对象，然后立即执行thenable对象的then方法
- 返回值：新Promise对象，并传递obj参数给回调函数

### reject([reason])
基本同resolve方法，不同之处在于返回的新Promise对象的状态为rejected。try/catch语句是捕获不到该错误，只能被catch方法捕获。因为try/catch语句只能捕获同步函数，无法捕获异步函数，try/catch语句之前只有同步函数进栈

## Promise缺点
- 一旦创建Promise实例就无法停止异步操作
- 当处于Pending状态时无法得知进展到哪一阶段(刚刚开始还是即将完成)

## 示例
```javascript
// 体现Promise的状态连锁性
let p, p1, p2, p3;
function getPromise() {
	p1 = new Promise((resolve, reject) => {
		console.log('p1...');
		resolve(1);
	}).then((res) => {
		p2 = new Promise((resolve, reject) => {
			console.log('p2...', res);
			resolve(2);
		}).then((res) => {
			p3 = new Promise((resolve, reject) => {
				console.log('p3...', res);
				resolve(3);
			}).then((res) => {
				console.log('success end...', res);
				return Promise.resolve(4)
			}).catch((err) => {
				console.log('fail end...', err);
			})
			return p3;
		})
		return p2;
	})
	return p1;
}
p = getPromise();
setTimeout(async () => {
	console.log('--------------------------');
	console.log(p, await p); // Promise {<fulfilled>: 4} 4
	console.log(p1, await p1); // Promise {<fulfilled>: 4} 4
	console.log(p2, await p2); // Promise {<fulfilled>: 4} 4
	console.log(p3, await p3); // Promise {<fulfilled>: 4} 4
}, 0)


// 借助Promise一键运行generator函数，就像async函数一样
function run(generator) {
  return new Promise((resolve, reject) => {
    const iterator = generator();
    step(() => iterator.next())

    function step(nextFn) {
      const result = runNext(nextFn)
      if(result.done) {
        resolve(result.value)
        return
      }
      Promise.resolve(result.value).then(
        value => step(() => iterator.next(value)), 
        err => step(() => iterator.throw(err))
      )
    }

    function runNext(nextFn) {
      try {
        return nextFn()
      } catch(e) {
        reject(e)
      }
    }
  })
}

// *早期还未有Promise和async/await等异步处理时的异步处理方案
// 1、jQuery提供Deferred对象，示例如下，
function asyncTask() {
  // 创建一个deferred对象
  var deferred = $.Deferred();

  // 模拟异步操作
  setTimeout(function() {
    var success = true; // 模拟操作成功
    if (success) {
      // 操作成功，改变deferred对象的状态为fulfilled
      deferred.resolve('操作成功');
    } else {
      // 操作失败，改变deferred对象的状态为rejected
      deferred.reject('操作失败');
    }
  }, 1000);

  // 返回一个Promise对象
  return deferred.promise();
}
asyncTask().done(function(result) {
  console.log(result);
}).fail(function(error) {
  console.error(error);
});

// 2、轮询：setTimeout + 条件不满足调用本身
```
