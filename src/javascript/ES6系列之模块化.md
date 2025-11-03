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

### UMD
```js
// 兼容AMD(运行在浏览器)和CJS(运行在NodeJS)
(function(define) {
  define(function() {
    return {
      // 具体实现
      sayHello() {
        console.log('hello')
      }
    }
  })
})(typeof module === 'object' && module.exports && typeof define !== 'function' ? 
function(factory) {
  module.exports = factory();
} : define)
```

## ES6模块化
浏览器为了能直接使用JS模块文件，采取如下处理：要解析文件需把它们变成**一种称为模块记录(Module Record)的数据结构**。只有这样，浏览器才知道代码文件中到底发生了什么。解析后，还需要把模块记录变成**一个模块实例，模块实例会把代码和状态结合起来**。其中，代码是一组指令集合，它就像制作某样东西的配方，指导你该如何制作，但是它本身并不能让你完成制作。你还需要一些原料，这样才可以按照这些指令完成制作。状态是变量在任何时候的真实值，它就是原料。变量实际上就是内存地址的别名，内存才是正在存储值的地方。可以看出，模块实例中代码和状态的结合，就是指令集和变量值的结合。

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
- 概念：规定模块的对外接口

- 特点
	- 可以出现在模块的任何位置，只要处于模块顶层即可，若处于块级层则报错
	- 值是动态绑定的

- 默认导出
	- 使用`export default`本质上是输出一个叫做default的变量或方法，所以一个模块应该只能有一个`export default`
	- 使用默认导出，对应的import语句不必使用大括号，可以取任意名

### import
- 概念：加载模块。先加载被导入的模块，再根据依赖模块进行深度优先遍历，执行每个模块的主体代码，为了避免形成回环，所有已执行的模块都会被忽略

- 特点：import命令具有提升效果，会提升到整个模块头部首先执行

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

### 示例
<<< ./module_use_esm_by_mjs/submodule.mjs

<<< ./module_use_esm_by_mjs/main.mjs

### 静态模块使用规则
- 只能在模块最外层使用import和export，不能在函数和块中使用
- 导出的标识符名称是明确的，不能通过代码动态给出
- 模块对象被冻结，无法hack模块对象并添加polyfill风格的新特性
- import提前加载依赖，没有钩子控制依赖加载过程
- import模块产生的错误，没有错误恢复机制(通过编译工具弥补)

### 模块加载过程
- 1、**构建：查找、下载并解析为模块记录，重复以上过程，直到所有文件都被解析为模块记录**

  ![](/js/esm下载解析原理.jpg)

  1.1、加载器查找：确定从哪下载包含该模块的文件，即模块定位。不同平台有自己一套方式解析模块定位符，如`import a from './b.js'`中的`./b.js`称为模块定位符，用于告知加载器去哪定位模块

  1.2、加载器通过url或本地文件系统下载文件
    
    存在问题：下载完成前，无法解析某个模块，不知道依赖哪些模块。意味着必须层层遍历依赖树，先解析文件，再找出依赖，最后定位并加载依赖，如此往复。若主线程等待这些文件下载完成，其他任务将堆积在任务队列中，由于下载较耗时，造成这些任务阻塞，页面卡顿，影响体验
    
    解决：将任务拆分为获取和解析，分别异步处理

    > CJS加载是同步的，是因为文件都在本地，无需拆分
    
    > CJS支持模块定位符使用变量，如"require(`${path}/counter.js`).count"，ESM希望做到支持模块定位符使用变量，提出动态导入。动态导入会建立新的独立依赖关系树，两个独立依赖关系树的共有依赖是共享同一个实例，因为加载器做了缓存，避免模块重复下载。**加载器使用模块映射管理缓存**。当加载一个模块时，会记录到映射中，标记状态为下载中，随即发起请求，当其他地方也依赖该模块时，加载器会在映射中查找，若发现状态为下载中，则跳过不处理。
    ```js
    // esm不支持
    import { count } from `${path}/counter.js`
    // esm支持
    import(/\${path}/foo.js)
    ```

  1.3、解析文件为模块记录
    
    模块记录创建完成后，会登记在模块映射中。后面请求该模块时，加载器直接从映射中获取。
    
    > 使用不同解析目标，解析相同文件，得到结果是不同的。如在Node中使用mjs后缀文件，告诉加载器使用什么样的解析目标，而在浏览器，通过script标签的type属性告知

- 2、**链接/实例化**
  
  ![](/js/esm导出导入原理.jpg)

  JS引擎创建一个模块环境记录，管理模块记录的所有变量，然后找出每个导出对应哪个内存地址(深度优先的后序遍历)，最后会把某模块下的所有导出链接到当前模块，然后回到上一层把模块的导入链接起来

  > 为所有模块分配内存空间，然后依照导出、导入语句把模块指向对应的内存地址，这个过程称为链接

  可以看出，ESM是值引用，而CJS是值拷贝。ESM使用实时绑定（当模块执行import命令时，并不执行模块，而是生成一个动态的只读引用，等真正用到这个值时再到模块中取值，并且这个值是不被缓存的）的方式，导出和导入的模块指向相同的内存地址，所以当导出的值改变后，导入模块的值也改变。这样的好处是引擎可以在不运行任何模块代码的情况下完成链接，也为解决循环依赖问题做铺垫

  > 由于ES6导入的模块变量仅是一个符号链接，是只读的，对其进行值的改变会报错，但值若是引用类型，可以对其添加或修改属性

  > 循环引用，即当a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。与CommonJS循环加载有所差异，CommonJS加载并执行，进行深拷贝缓存，一旦出现循环加载，只输出已经执行的部分，未执行的部分不输出，容易报错，而ES6加载仅引用，进行浅拷贝，当需要时再进行动态引用，不报错
  ```js
  // 检查对象是否存在循环引用
  function hasCircularRef(obj, s = new WeakSet()) {
    if(!obj || typeof obj !== 'object') return false
    
    if(s.has(obj)) return true

    s.add(obj)
    for(const key of Reflect.ownKeys(obj)) {
      if(hasCircularRef(obj[key], s)) {
        return true
      }
    }

    return false
  }
  ```

  > 循环引用示例
  
  <<< ./module_cjs_circular_dependency/submodule.js
  <<< ./module_cjs_circular_dependency/main.js

- 3、**运行代码**
  
  JS引擎运行顶层代码，除填充值到内存空间外，执行副作用

  > **模块代码只执行一次。如果运行多次，结果可能每次不一样，这也是使用模块映射的原因之一**，每个模块只有一个模块记录，保证每个模块只执行一次

### ES6模块与三大模块规范的比较

|   	| 模块加载时机 | 模块加载方式 | 模块引用方式 | 导入导出语法 | 优点 | 缺点 | 适合环境 |
|------|-----------------------------|------------|------------|------------|-----|------|---------|
| AMD | 运行时	| 异步 | 深拷贝	| require([dep], function(dep) {}); <br><br> define(function(){}); | 并行加载多个依赖模块 | 依赖模块提前被加载；存在循环依赖问题 | 浏览器/Node环境 |
| CMD | 运行时	| 支持同步和异步 | 深拷贝 | require()<br><br> define(function<br>(require,exports,<br>module){}) |  依赖模块延迟加载，即被应用时才加载 | 语法较复杂 | 浏览器/Node环境 |
| CommonJS | **运行时** | **同步** | **深拷贝** | **require()** <br><br>**exports**/<br>**module.exports** | **语法简单，易用** | **依赖模块提前被加载；不能并行加载多个依赖模块；存在循环依赖问题** | **Node环境** |
| ES6模块化 | **编译时** |  **异步**  | **浅拷贝**	| **import** <br><br>**export**/<br>**export default** | **静态分析** |  | **浏览器/Node环境** |

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
