---
title: JavaScript基础下篇
tags: 
- ECMAScript
---

# JavaScript基础下篇

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
  - 面向对象编程：使用简单，共享状态
  - 面向函数编程：无副作用，适合分布式计算集群的应用场景，但过度使用会导致可读性稍弱差、学习难度大（掌握λ演算、代数、范畴学等基础）

> *面向切面编程AOP(Aspect-Oriented Programming)不是一种编程范式，是一种编程思想
  
  目的是针对业务处理过程中的切面进行提取，所面对的是处理过程中的某个步骤或阶段，实现逻辑过程中各部分间的低耦合性。可用于数据埋点、功能延伸等。示例如下，
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
