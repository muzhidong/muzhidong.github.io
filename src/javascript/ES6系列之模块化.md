---
title: 模块化
tags: 
- ECMAScript
---
# 模块化

本章介绍常见的几种模块化规范以及ES6中的模块化。

在没有模块化概念之前，在浏览器是采用脚本化代码，通过挂载到全局的方式解决代码依赖。后来有了模块化，通过包声明方式（源自Node模块加载机制）解决，这样的好处是无需手动处理代码依赖这一块的实现。

## AMD、CMD与CommonJS规范
### AMD
- 1、概念
  
  中文译为异步模块定义，典型代表是[requirejs](https://requirejs.org/)。由于浏览器JS引擎是单线程的，这种异步模式刚好适用浏览器。

- 2、特点
  
  异步加载模块，支持多个并行，依赖会被提前加载
<!--more-->

- 3、原理

	通过head元素对象调用appendChild方法，将每一个依赖加载为一个script标签，待所有依赖加载完毕后，计算出模块定义函数正确的调用顺序，然后依次调用它们。

- 4、示例
	```html
	<!-- index.html -->
	<script data-main="scripts/main.js" src="scripts/require.js"></script>
	<script src="scripts/other.js"></script>
	```

	```javascript
	// main.js:
	require.config({
		paths: {
			foo: 'libs/foo-1.1.3'
		}
	});

	// other.js:
	// This code might be called before the require.config() in main.js
	// has executed. When that happens, require.js will attempt to
	// load 'scripts/foo.js' instead of 'scripts/libs/foo-1.1.3.js'
	require(['foo'], function(foo) {});
	```

	其中，config方法option参数选项说明如下，
	- baseUrl ：所有模块的查找根路径
	- paths ：path映射那些不直接放置于baseUrl下的模块名
	- shim: 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置
	- map: 对于给定的模块前缀，使用一个不同的模块ID来加载该模块。
	- config:常常需要将配置信息传给一个模块。
	- packages: 从CommonJS包(package)中加载模块。
	- nodeIdCompat: 在放弃加载一个脚本之前等待的秒数。
	- waitSeconds: 命名一个加载上下文。
	- context: 指定要加载的一个依赖数组。
	- deps: 指定要加载的一个依赖数组。
	- callback: 在deps加载完毕后执行的函数。
	- enforceDefine: 如果设置为true，则当一个脚本不是通过define()定义且不具备可供检查的shim导出字串值时，就会抛出错误。
	- xhtml: 如果设置为true，则使用document.createElementNS()去创建script元素。
	- urlArgs: RequireJS获取资源时附加在URL后面的额外的query参数。
	- scriptType: 指定RequireJS将script标签插入document时所用的type=""值。默认为“text/javascript”。

- 5、模块定义 		

  如何定义一个模块呢？有对象定义、函数式定义、存在依赖的函数式定义3种。

	```javascript
	define({});

	define(function(){});

	define(['aaa','bbb'],function(a,b){return {}});

	define(['aaa','bbb'],function(a,b){return function(){}});
	```

- 6、应用
	```javascript
	// JSONP实现跨域
	require(["http://example.com/api/data.json?callback=define"],
		function (data) {
			//The data object will be the API response for the JSONP data call.
			console.log(data);
		}
	);
	// 但是，上述实现只能获取该JSONP URL一次，后继使用require()或define()发起的的对同一URL的依赖(请求)只会得到一个缓存过的值
	```
	
### CMD
- 1、概念
  
  中文译为通用模块定义，典型代表是淘宝的[seajs](https://seajs.github.io/seajs/docs/)。

- 2、特点
  
  同步加载模块，延迟加载依赖，即直到被应用才加载

- 3、加载模块
	```javascript
	// 同步加载
	require('./util.js')	
	// 提供async方法实现异步加载
	require.async('./util.js',function(){

	})
	```    

- 4、模块定义
	```javascript
	// 几种定义模块的方式
	define("");

	define({});

	define(function(require, exports, module){
		// require用于获取依赖模块
		// exports是一个对外提供模块接口的对象
		// module是一个存储当前模块相关联的一些属性和方法的对象
	})
	```

### CommonJS
- 1、特点

  同步加载模块，由于Node一般用于服务端编程，模块文件一般都已存在于本地，加载较快，CommonJS比较适合服务端。

- 2、加载模块
	```javascript
	var foo = require('foo');
	```

- 3、定义模块
	```javascript
	exports = module.exports = foo;
	```

- 4、模块加载的实质

采用深拷贝方式，在第一次require时加载并执行该脚本，在内存中生成一个对象。以后使用该模块时直接从该内存对象取值，即使再次执行require，也不会执行，仍是从缓存中取值。

## ES6 模块化
### 设计思想
尽量静态化，在编译时确定模块的依赖关系，以及输入和输出的变量。

### 特点
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

- 默认导出
	```javascript
	// 正常导入导出方式
	export function func(){}
	import { func } from 'util';

	// 默认导入导出方式
	export default function func(){}
	import func from 'util';
	```

	可以发现，

	第一，使用export default本质上是输出一个叫做default的变量或方法，所以一个模块应该也只能有一个export default。

	第二，使用默认输出，对应的import语句不必使用大括号，也就是说可以任意命名；

### import
- 概念

加载模块

- 特点

import命令具有提升效果，会提升到整个模块头部首先执行

- 整体导入
```javascript
// 整体引入模块，有以下两种实现方式，
// 使用星号*
import * as util from './util';

// 使用module命令取代import
module util from './util';
```

### 模块继承
通过`export ... from ...`实现。效果相当于先`import`再`export`，注意以下两点：
- 这些导入再导出的变量、函数或类在当前作用域不会被绑定，即在当前作用域不能被访问到
- 会忽略被继承模块的default变量或方法
```javascript
export * from 'math';
```

### 模块加载实质
- ES6模块输出的值是值的引用，而非值的拷贝，具体理解为当模块执行import命令时，并不执行模块，而是生成一个动态的只读引用，等真正用到这个值时再到模块中取值，并且这个值是不被缓存的。
- 由于ES6输入的模块变量仅是一个符号链接，是只读的，对其进行值的改变会报错，但可以对其添加属性。
- 循环加载，即当a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。与CommonJS循环加载有所差异，CommonJS加载并执行，进行深拷贝缓存，一旦出现循环加载，只输出已经执行的部分，未执行的部分不输出，容易报错，而ES6加载仅引用，进行浅拷贝，当需要时再进行动态引用，不会报错。

### ES6模块与三大模块规范的比较

|   	           |AMD |CMD  |CommonJS	  |ES6 模块化	 |
|----------------|------|----|----|----|
|模块加载时机(也是依赖关系确定时) |运行时	|运行时|**运行时**|**编译时**|
|模块加载方式 |异步	|支持同步和异步|**同步**	| **异步** |
|模块引用方式 |深拷贝	|深拷贝|**深拷贝**| **浅拷贝** |
|导入导出语法 |require([dep], function(dep) {}); <br><br> define(function(){}); |require()<br><br> define(function<br>(require,exports,<br>module){}) |**require()** <br><br>**exports**/<br>**module.exports**	| **import** <br><br>**export**/<br>**export default** |
|优点 |并行加载多个依赖模块	|依赖模块延迟加载，即被应用时才加载 |**语法简单，易用**	|**静态分析** |
|缺点 |依赖模块提前被加载；存在循环依赖问题	|语法较复杂 |**依赖模块提前被加载；不能并行加载多个依赖模块；存在循环依赖问题**	|  |
|适合环境 |浏览器/Node环境	|浏览器/Node环境 |**Node环境**	| **浏览器/Node环境** |

从上表分析，可以从加载时机、加载方式两个角度说明ES6模块与CJS的区别。

- ES6是编译时加载，值是浅拷贝，不缓存，可以做静态分析；CJS是运行时加载，值是深拷贝，有缓存。
- ES6是异步加载，适于Node和浏览器；CJS是同步加载，只适于Node。

## 彩蛋
- 兼容不同模块化的导出方式

	问题：在Node环境(CommonJs)使用`export default fn`导出方式，此时调用fn，报错`TypeError: fn is not a function`。发现fn是一个拥有default属性的对象，于是调整导出方式为`module.exports = fn`，在浏览器却报错`xxx.default is not defined`。那么如何同时支持`esm（export default）`，又支持`cjs（module.exports）`?

	解决：参考react框架处理方式，加了一层中间处理。
	```javascript
	// react/src/React.js
	export default React;

	// react/index.js
	const React = require(‘./src/React’); 
	module.exports = React.default || React; // 前者兼容cjs，后者兼容esm
	```

- 指定以esm方式导出
	```javascript
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	```
