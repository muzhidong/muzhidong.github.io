(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{407:function(t,a,s){"use strict";s.r(a);var n=s(31),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"模块化规范与es6模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模块化规范与es6模块"}},[t._v("#")]),t._v(" 模块化规范与ES6模块")]),t._v(" "),s("p",[t._v("介绍ES6模块之前先认识几种模块规范。")]),t._v(" "),s("h2",{attrs:{id:"amd、cmd与commonjs规范"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#amd、cmd与commonjs规范"}},[t._v("#")]),t._v(" AMD、CMD与CommonJS规范")]),t._v(" "),s("h3",{attrs:{id:"amd"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#amd"}},[t._v("#")]),t._v(" AMD")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("概念")]),t._v(" "),s("p",[t._v("中文译为异步模块定义，典型代表是requirejs。在浏览器环境中，要从服务端加载模块，必须采用异步模式，因此浏览器一般采用AMD规范。")])]),t._v(" "),s("li",[s("p",[t._v("特点")]),t._v(" "),s("p",[t._v("模块是异步加载的，对依赖提前异步加载\n")])]),t._v(" "),s("li",[s("p",[t._v("加载模块")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("requirejs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'canvas'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/sub'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("canvas"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("sub")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//$、canvas、sub代表被加载的模块jquery、canvas、app/sub")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//可以直接进行调用")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("定义模块")]),t._v(" "),s("p",[t._v("定义一个模块有键值对定义、函数式定义、存在依赖的函数式定义三种方式。你觉得下面是用哪种方式？")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("define")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'moment'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("m")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" obj "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tele"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\ttime"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("m")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("unix")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" obj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),s("h3",{attrs:{id:"cmd"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cmd"}},[t._v("#")]),t._v(" CMD")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("概念")]),t._v(" "),s("p",[t._v("中文译为通用模块定义，典型代表是seajs。")])]),t._v(" "),s("li",[s("p",[t._v("特点")]),t._v(" "),s("p",[t._v("模块是同步加载的，对依赖延迟加载，直到被应用才同步加载")])]),t._v(" "),s("li",[s("p",[t._v("加载模块\n两种加载方式，")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("同步加载")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./util.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\t\n")])])])]),t._v(" "),s("li",[s("p",[t._v("异步加载")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("require"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("async")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./util.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])])]),t._v(" "),s("li",[s("p",[t._v("定义模块")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("define")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("factory"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("其中参数factory可以是一个函数，也可以是一个对象或字符串。当参数是一个函数时，形式如function(require, exports, module) {}，当中的参数exports 是一个对象，用来向外提供模块接口，module也是一个对象，存储了与当前模块相关联的一些属性和方法。")])])]),t._v(" "),s("h3",{attrs:{id:"commonjs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#commonjs"}},[t._v("#")]),t._v(" CommonJS")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("特点")]),t._v(" "),s("p",[t._v("模块是同步加载的，由于Node.js主要用于服务器编程，模块文件一般都已存在于本地，加载较快，所以CommonJS比较适用服务端。")])]),t._v(" "),s("li",[s("p",[t._v("加载模块")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" foo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'foo'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("定义模块")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" foo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("加载实质")]),t._v(" "),s("p",[t._v("采用深拷贝的方式，在第一次require时加载并执行该脚本，在内存中生成一个对象，以后用到该模块时直接从该内存对象进行取值，即使再次执行require，也不会执行，仍是从缓存中取值。")])])]),t._v(" "),s("p",[t._v("下面正式开始介绍ES6中的模块体系。")]),t._v(" "),s("h2",{attrs:{id:"es6-模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es6-模块"}},[t._v("#")]),t._v(" ES6 模块")]),t._v(" "),s("h3",{attrs:{id:"设计思想"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设计思想"}},[t._v("#")]),t._v(" 设计思想")]),t._v(" "),s("p",[t._v("尽量静态化，在编译时确定模块的依赖关系，以及输入和输出的变量。")]),t._v(" "),s("h3",{attrs:{id:"优点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#优点"}},[t._v("#")]),t._v(" 优点")]),t._v(" "),s("ul",[s("li",[t._v("浏览器和服务器两端可以通过ES6 模块格式")]),t._v(" "),s("li",[t._v("编译时加载，效率高")]),t._v(" "),s("li",[t._v("不再需要用对象作命名空间和定义全局变量或navigator对象属性")]),t._v(" "),s("li",[t._v("自动采用严格模式，无论是否在模块头部加上'use strict'，回顾下严格模式有哪些限制？\n"),s("ul",[s("li",[t._v("变量必须声明后才可以使用")]),t._v(" "),s("li",[t._v("函数参数不能同名，否则报错")]),t._v(" "),s("li",[t._v("不能使用with语句")]),t._v(" "),s("li",[t._v("不能对只读属性赋值，否则报错")]),t._v(" "),s("li",[t._v("不能使用前缀0表示八进制数，否则报错")]),t._v(" "),s("li",[t._v("不能删除不可删除的属性，否则报错")]),t._v(" "),s("li",[t._v("不能删除变量，只能删除属性，否则报错")]),t._v(" "),s("li",[t._v("eval不会在其外层作用域引入变量")]),t._v(" "),s("li",[t._v("eval和arguments不能被重新赋值")]),t._v(" "),s("li",[t._v("arguments不会自动反映函数参数的变化")]),t._v(" "),s("li",[t._v("不能使用arguments.callee和arguments.caller")]),t._v(" "),s("li",[t._v("禁止this指向全局对象")]),t._v(" "),s("li",[t._v("不能使用fn.caller和fn.arguments获取函数调用的堆栈")]),t._v(" "),s("li",[t._v("增加保留字，如protected、static和interface")])])])]),t._v(" "),s("h3",{attrs:{id:"export"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#export"}},[t._v("#")]),t._v(" export")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("概念")]),t._v(" "),s("p",[t._v("规定模块的对外接口")])]),t._v(" "),s("li",[s("p",[t._v("特点")])])]),t._v(" "),s("ol",[s("li",[t._v("可以出现在模块的任何位置，只要处于模块顶层即可，若处于块级层则报错")]),t._v(" "),s("li",[t._v("值是动态绑定的")])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("默认输出与正常输出")]),t._v(" "),s("p",[t._v("正常输出")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("func")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("func"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'util'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("默认输出")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("export default  function func(){\n\t...\n}\nimport func from 'util';\n")])])]),s("p",[t._v("可以发现，第一，使用默认输出，对应的import语句不必使用大括号，也就是说可以任意命名；第二，使用export default本质上是输出一个叫做default的变量或方法，所以一个模块应该也只能有一个export default。")])])]),t._v(" "),s("h3",{attrs:{id:"import"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#import"}},[t._v("#")]),t._v(" import")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("概念")]),t._v(" "),s("p",[t._v("加载模块")])]),t._v(" "),s("li",[s("p",[t._v("特点")]),t._v(" "),s("p",[t._v("import命令具有提升效果，会提升到整个模块头部首先执行")])]),t._v(" "),s("li",[s("p",[t._v("整体加载")]),t._v(" "),s("p",[t._v("要加载整个引入模块，有以下两种实现方式，")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("使用星号*")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" util "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./util'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("使用module命令取代import")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("module util "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./util'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])])]),t._v(" "),s("h3",{attrs:{id:"模块继承"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模块继承"}},[t._v("#")]),t._v(" 模块继承")]),t._v(" "),s("p",[t._v("模块继承通过export * 实现，如")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'math'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("但是，export * 命令会忽略被继承模块的default变量或方法")]),t._v(" "),s("h3",{attrs:{id:"模块加载实质要点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模块加载实质要点"}},[t._v("#")]),t._v(" 模块加载实质要点")]),t._v(" "),s("ul",[s("li",[t._v("ES6模块输出的值是值的引用，而非值的拷贝，具体理解为当模块执行import命令时，并不执行模块，而是生成一个动态的只读引用，等真正用到这个值时再到模块中取值，并且这个值是不被缓存的。")]),t._v(" "),s("li",[t._v("由于ES6输入的模块变量仅是一个符号链接，是只读的，对其进行值的改变会报错，但可以对其添加属性。")]),t._v(" "),s("li",[t._v("循环加载，即当a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。与CommonJS循环加载有所差异，CommonJS加载并执行，进行深拷贝缓存，一旦出现循环加载，只输出已经执行的部分，未执行的部分不输出，容易报错，而ES6加载仅引用，进行浅拷贝，当需要时再进行动态引用，不会报错。")])]),t._v(" "),s("h3",{attrs:{id:"es6模块与commonjs的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es6模块与commonjs的区别"}},[t._v("#")]),t._v(" ES6模块与CommonJS的区别")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("ES6是编译时加载，CommonJS是运行时加载，于是ES6模块的效率要更高")])]),t._v(" "),s("li",[s("p",[t._v("ES6在浏览器和服务端上均适用，而CommonJS只适于服务端")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);