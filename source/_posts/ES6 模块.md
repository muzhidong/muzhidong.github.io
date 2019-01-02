---
title: 认识ES6 模块
tags: 
- ES6
---

介绍ES6模块之前先认识几种模块规范。

## AMD、CMD与CommonJS规范
### AMD
- 概念
  
  中文译为异步模块定义，典型代表是requirejs。在浏览器环境中，要从服务端加载模块，必须采用异步模式，因此浏览器一般采用AMD规范。
- 特点
  
  模块是异步加载的，对依赖提前异步加载
- 加载模块

		requirejs(['jquery', 'canvas', 'app/sub'],function($,canvas,sub) {
          //$、canvas、sub代表被加载的模块jquery、canvas、app/sub
		  //可以直接进行调用
		});
- 定义模块 		

  定义一个模块有键值对定义、函数式定义、存在依赖的函数式定义三种方式。你觉得下面是用哪种方式？

       define(['jquery','moment'],function($,m){
	     var obj = {
		 	 ele:$('div'),
			    time:m().unix(),
		 }
	     return obj;
	   });
	   
<!--more-->
	
### CMD
- 概念
  
  中文译为通用模块定义，典型代表是seajs。
- 特点
  
  模块是同步加载的，对依赖延迟加载，直到被应用才同步加载
- 加载模块
两种加载方式，
	 - 同步加载
	 
	   		require('./util.js')	
	 - 异步加载
	
	   	    require.async('./util.js',callback)
- 定义模块
   
	   define(factory)

    其中参数factory可以是一个函数，也可以是一个对象或字符串。当参数是一个函数时，形式如function(require, exports, module) {}，当中的参数exports 是一个对象，用来向外提供模块接口，module也是一个对象，存储了与当前模块相关联的一些属性和方法。


### CommonJS
- 特点

  模块是同步加载的，由于Node.js主要用于服务器编程，模块文件一般都已存在于本地，加载较快，所以CommonJS比较适用服务端。
- 加载模块

		var foo = require('foo');

- 定义模块

		exports = module.exports = foo;
- 加载实质

  采用深拷贝的方式，在第一次require时加载并执行该脚本，在内存中生成一个对象，以后用到该模块时直接从该内存对象进行取值，即使再次执行require，也不会执行，仍是从缓存中取值。

下面正式开始介绍ES6中的模块体系。

## ES6 模块
### 设计思想
尽量静态化，在编译时确定模块的依赖关系，以及输入和输出的变量。
### 优点
- 浏览器和服务器两端可以通过ES6 模块格式
- 编译时加载，效率高
- 不再需要用对象作命名空间和定义全局变量或navigator对象属性
- 自动采用严格模式，无论是否在模块头部加上'use strict'，回顾下严格模式有哪些限制？
	- 变量必须声明后才可以使用
	- 函数参数不能同名，否则报错
	- 不能使用with语句
	- 不能对只读属性赋值，否则报错
	- 不能使用前缀0表示八进制数，否则报错
	- 不能删除不可删除的属性，否则报错
	- 不能删除变量，只能删除属性，否则报错
	- eval不会在其外层作用域引入变量
	- eval和arguments不能被重新赋值
	- arguments不会自动反映函数参数的变化
	- 不能使用arguments.callee和arguments.caller
	- 禁止this指向全局对象
	- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
	- 增加保留字，如protected、static和interface

### export
- 概念

  规定模块的对外接口
- 特点
1. 可以出现在模块的任何位置，只要处于模块顶层即可，若处于块级层则报错
2. 值是动态绑定的
- 默认输出与正常输出

  正常输出

		export function func(){
		  ...
		}
		import {func} from 'util';
		
  默认输出

		export default  function func(){
		  ...
		}
		import func from 'util';

   可以发现，第一，使用默认输出，对应的import语句不必使用大括号，也就是说可以任意命名；第二，使用export default本质上是输出一个叫做default的变量或方法，所以一个模块应该也只能有一个export default。

### import
- 概念

  加载模块
- 特点

  import命令具有提升效果，会提升到整个模块头部首先执行
- 整体加载

  要加载整个引入模块，有以下两种实现方式，
  1. 使用星号*

			import * as util from './util';
  2. 使用module命令取代import

	    	module util from './util';

### 模块继承
模块继承通过export * 实现，如

	export * from 'math';
但是，export * 命令会忽略被继承模块的default变量或方法

### 模块加载实质要点
- ES6模块输出的值是值的引用，而非值的拷贝，具体理解为当模块执行import命令时，并不执行模块，而是生成一个动态的只读引用，等真正用到这个值时再到模块中取值，并且这个值是不被缓存的。
- 由于ES6输入的模块变量仅是一个符号链接，是只读的，对其进行值的改变会报错，但可以对其添加属性。
- 循环加载，即当a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。与CommonJS循环加载有所差异，CommonJS加载并执行，进行深拷贝缓存，一旦出现循环加载，只输出已经执行的部分，未执行的部分不输出，容易报错，而ES6加载仅引用，进行浅拷贝，当需要时再进行动态引用，不会报错。