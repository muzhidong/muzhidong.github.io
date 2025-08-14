---
title: Generator函数与Async函数
tags: 
- ECMAScript
---
# Generator函数与Async函数

## Generator函数

### 形式

```JavaScript
function* myGenerator(){
	yield 'Hello';
	yield 'World';
	return 'ECMAScript';
}
```

### 作用
相当于一个状态机。
<!--more-->
### 特点
 - function关键字带有星号*
 - 函数体内使用关键字yield

### 返回值
调用generator函数后，函数不执行，返回结果自然不是函数运行结果，而是返回**一个遍历器对象**，可以依次遍历generator函数内部的每一个状态。

### 使用
1.  定义一个generator函数如上。
2. 调用generator函数，获取迭代器对象。

	```JavaScript
	const gen = myGenerator();
	```

3.  调用返回对象的next方法，  执行generator的下一状态。

	```JavaScript
	var obj = gen.next();
	```

4.  继续调用next方法，执行下一状态，直至obj对象的done属性值为true为止。

### 细节
1. yield语句只能在generator函数使用，否则报语法错误。
2. yield语句在函数中可以执行多次，return语句在函数中只能执行一次。但是yield语句和return语句都可后跟一个表达式的值。
3. next方法可以带一个参数，来表示上一条yield语句的返回值。

## Async函数
### 形式

```JavaScript
function func1(){
	return new Promise((resolve,reject) => {resolve("Hello")});
}
function func2(){
	return new Promise((resolve,reject) => {resolve("World")});
}
async function myAsyncFunc(){
	await func1();
	await func2();
}
```

### 作用
generator函数的语法糖。目的只是为了简化书写，提高阅读性。

### 特点
1. 关键字async取代星号*
2. await语句取代yield语句

### 返回值
调用async函数后，函数执行，并返回一个**Promise对象**，可以看出async函数是将多个异步操作包装成一个Promise对象，而await语句相当于then操作的语法糖。

### 使用
1.  定义一个async函数如上。
2. 调用async函数，获取Promise对象。

```JavaScript
const pro = myAsyncFunc();
```

3.  调用Promise对象的then方法，  获取每次异步操作的结果。

```JavaScript
pro.then((result) => {console.log(result)},(error) => {console.log(error)});
```

### 细节
1. yield语句后只能跟Thunk函数或Promise对象，await语句后可跟Promise对象或基本数据类型的值，但此时是同步操作。
2. await语句后跟Promise对象时，使用try...catch语句，防止报错。



