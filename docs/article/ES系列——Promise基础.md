---
title: ES系列——Promise基础
tags: 
- ECMAScript
---
# Promise基础

## Promise定义
一个对象，用于传递异步操作的消息。通过new关键字创建实例。

##  Promise特点
- 状态封闭性。状态不受外界改变，只有异步操作结果可以决定当前的状态。共3种状态，分别是Pending、Resolved和Rejected。 只有两种状态改变，即从Pending变为Resolved以及从Pending变为Rejected。

- 状态不变性。一旦状态改变就不会再变，一直保持这个结果。比如一个Promise对象的状态已经为Resolved，根据状态不变性，再在主线程中抛错是无效的。

- 状态连锁性。如果一个Promise实例传递了另一个Promise实例，那么该实例会随着要传递的Promise实例的状态变化而变化。
<!--more-->

## 创建Promise实例

```JavaScript
var promise = new Promise(function(resolve,reject){
  var image = new Image();
  image.src = "https://www.baidu.com/img/bd_logo1.png";
  image.addEventListener("load",()=>{
     resolve(image);
  });
  image.addEventListener("error",()=>{
     reject(new Error("wrong..."));
  });
});
```

说明：创建Promise实例时需要传入一个函数，传入的函数带有resolve函数参数和reject函数参数，这两个参数由JS引擎提供。resolve函数会将Promise对象从Pending状态转为Resolved状态，并在操作成功时将异步操作结果作为参数传递出去；而reject函数会将Promise对象从Pending状态转为Rejected状态，并在操作失败时将错误对象传递出去。

## Promise API
### 1.  then(successCallback[,errorCallback])
-  作用：当状态改变时进行回调处理
- 参数：successCallback表示当异步操作成功时被调用的回调，errorCallback表示当异步操作失败时被调用的回调。两个回调函数都将接收Promise对象传出的值作为函数参数
- 返回值：新的Promise实例，可通过链式调用需顺序执行的操作

### 2. catch(callback)
- 作用：相当于then(null,callback)，当异步操作失败时进行的回调处理
- 参数：callback表示异步操作失败时被调用的回调
- 返回值：新的Promise实例 ，不管有无被捕获都会继续执行接下来的方法

### 3. all(iterator)
- 作用：将多个Promise实例包装成一个新的Promise实例
- 参数：迭代器对象，每个成员都是Promise对象
- 返回值：新的Promise实例。当迭代器对象每个成员状态均为resolved时，状态为resolved，传递一个由各成员的返回值组成的数组，否则状态为rejected，传递第一个被rejected的成员的返回值

### 4.race(iterator)
基本同all方法，不同之处在于迭代器中任一成员的状态发生变化，新实例的状态也会随之变化

### 5.resolve([obj])
- 作用：转化为Promise对象，且状态为resolved
- 参数：任意对象。不传递参数时直接创建Promise对象
- 返回值：新的Promise对象，并传递obj参数给回调函数

### 6.reject(reason)
基本同resolve方法，不同之处在于返回的新的Promise对象的状态为rejected

### 7.done([successCallback][,errorCallback])
- 作用：保证抛出任何可能出现的错误
- 参数：同then方法参数
- 返回值：新的Promise对象

### 8.finally(callback)
- 作用：不管Promise对象最后状态如何都会执行的动作
- 参数：必须执行的回调函数
- 返回值：新的Promise对象

## Promise 缺点
- 一旦创建Promise实例就无法停止异步操作
- 当处于Pending状态时无法得知进展到哪一阶段(刚刚开始还是即将完成)
