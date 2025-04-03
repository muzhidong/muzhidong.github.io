(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{422:function(s,t,a){"use strict";a.r(t);var n=a(31),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[a("code",[s._v("CSS")]),s._v("全称是Cascading Style Sheet，中译为层叠样式表。本篇将讲解CSS引用和选择器。")]),s._v(" "),a("h2",{attrs:{id:"一、css引用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、css引用"}},[s._v("#")]),s._v(" 一、CSS引用")]),s._v(" "),a("p",[s._v("提供了以下4种引用方式。")]),s._v(" "),a("h3",{attrs:{id:"内联样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#内联样式"}},[s._v("#")]),s._v(" 内联样式")]),s._v(" "),a("p",[s._v("给标签设置"),a("code",[s._v("style")]),s._v("属性，如"),a("code",[s._v('<标签 style="attr1:value1;attr2:value2"></标签>')])]),s._v(" "),a("h3",{attrs:{id:"嵌入样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#嵌入样式"}},[s._v("#")]),s._v(" 嵌入样式")]),s._v(" "),a("p",[s._v("在"),a("code",[s._v("head")]),s._v("标签嵌入"),a("code",[s._v("style")]),s._v("标签，如下，")]),s._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),a("span",{pre:!0,attrs:{class:"token style"}},[a("span",{pre:!0,attrs:{class:"token language-css"}},[s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("selector")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n  attr1：value1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n  attr2：value2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("h3",{attrs:{id:"链接样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#链接样式"}},[s._v("#")]),s._v(" 链接样式")]),s._v(" "),a("p",[s._v("在"),a("code",[s._v("head")]),s._v("标签中嵌入"),a("code",[s._v("link")]),s._v("标签，如下，")]),s._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("link")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("text/css"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("href")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("fileName.css"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("rel")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("stylesheet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"导入样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导入样式"}},[s._v("#")]),s._v(" 导入样式")]),s._v(" "),a("p",[s._v("将多个样式文件导入到一个样式文件中，如下，")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string url"}},[s._v('"fileName.css"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")])]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("链接样式与导入样式的比较\n")]),a("style",[s._v("\n.compare {\ndisplay:grid;\nborder-top:1px solid white;\nborder-left:1px solid white;\n}\n.compare &gt; div {\nborder-right: 1px solid white;\nborder-bottom: 1px solid white;\n}\n.compare &gt; div:nth-child(3n+1) {\ngrid-column:1/2;\n}\n.compare &gt; div:nth-child(3n+2) {\ngrid-column:2/3;\n}\n.compare &gt; div:nth-child(3n) {\ngrid-column:3/4;\n}\n")]),s._v(" "),a("div",{staticClass:"compare"},[a("div"),s._v(" "),a("div",[s._v("链接样式")]),s._v(" "),a("div",[s._v("导入样式")]),s._v(" "),a("div",[s._v("用途")]),s._v(" "),a("div",[s._v("可用于加载CSS、定义RSS、定义rel连接属性")]),s._v(" "),a("div",[s._v("仅用于加载CSS")]),s._v(" "),a("div",[s._v("加载时间点")]),s._v(" "),a("div",[s._v("页面加载开始时加载")]),s._v(" "),a("div",[s._v("页面加载结束时加载")])]),a("p"),s._v(" "),a("h2",{attrs:{id:"二、css选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、css选择器"}},[s._v("#")]),s._v(" 二、CSS选择器")]),s._v(" "),a("p",[s._v('可以将指定的CSS样式作用于"对象"上。')]),s._v(" "),a("h3",{attrs:{id:"id选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#id选择器"}},[s._v("#")]),s._v(" id选择器")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("语法")]),s._v(" "),a("p",[s._v("以#开头，后加id名称，注意id名称不要以数字开头")])]),s._v(" "),a("li",[a("p",[s._v("作用范围：属性id值为对应的id名称的元素")])]),s._v(" "),a("li",[a("p",[s._v("示例")])])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("#content")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-weight")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" bold"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"类选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#类选择器"}},[s._v("#")]),s._v(" 类选择器")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("语法")]),s._v(" "),a("p",[s._v("以.开头，后加类名，同样注意类名不要以数字开头")])]),s._v(" "),a("li",[a("p",[s._v("作用范围：属性class值为对应类名的元素")])]),s._v(" "),a("li",[a("p",[s._v("示例")])])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".c-yellow")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" yellow"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"标签选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#标签选择器"}},[s._v("#")]),s._v(" 标签选择器")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("语法")]),s._v(" "),a("p",[s._v("直接使用标签名")])]),s._v(" "),a("li",[a("p",[s._v("作用范围：某种标签")])])]),s._v(" "),a("h3",{attrs:{id:"通配选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#通配选择器"}},[s._v("#")]),s._v(" 通配选择器")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("语法")]),s._v(" "),a("p",[s._v("直接使用"),a("code",[s._v("*")])])]),s._v(" "),a("li",[a("p",[s._v("作用范围：所有元素，慎用")])])]),s._v(" "),a("h3",{attrs:{id:"组合选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组合选择器"}},[s._v("#")]),s._v(" 组合选择器")]),s._v(" "),a("ul",[a("li",[s._v("含义：集体控制选择器，将样式应用于多种选择器。逗号隔开，推荐每种选择器单独一行。")]),s._v(" "),a("li",[s._v("示例")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("div,\nspan")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-family")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Microsoft Yahei"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h3",{attrs:{id:"后代选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#后代选择器"}},[s._v("#")]),s._v(" 后代选择器")]),s._v(" "),a("ul",[a("li",[s._v("含义：选择某父元素的所有满足的后代元素。空格连接。")]),s._v(" "),a("li",[s._v("示例")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("#container div")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 14px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"相邻后代选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#相邻后代选择器"}},[s._v("#")]),s._v(" 相邻后代选择器")]),s._v(" "),a("ul",[a("li",[s._v("含义：选择某父元素的所有满足的直接后代元素。>连接。")]),s._v(" "),a("li",[s._v("示例")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("#container > div")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" flex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"兄弟选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#兄弟选择器"}},[s._v("#")]),s._v(" 兄弟选择器")]),s._v(" "),a("ul",[a("li",[s._v("含义：选择与某元素同级且在其之后的满足的元素。～连接。")]),s._v(" "),a("li",[s._v("示例")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".item ~ .item")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" white"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" black"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h3",{attrs:{id:"相邻兄弟选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#相邻兄弟选择器"}},[s._v("#")]),s._v(" 相邻兄弟选择器")]),s._v(" "),a("ul",[a("li",[s._v("含义：选择与某元素同级且紧接在其后的满足的元素。+连接。")]),s._v(" "),a("li",[s._v("示例")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".item + .a")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" red\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"伪类选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#伪类选择器"}},[s._v("#")]),s._v(" 伪类选择器")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("语法")]),s._v(" "),a("p",[s._v("选择器:伪类名称")])]),s._v(" "),a("li",[a("p",[s._v("动态伪类（随元素状态而变化）")]),s._v(" "),a("p",[s._v(":link：元素未访问")]),s._v(" "),a("p",[s._v(":visited：元素访问过")]),s._v(" "),a("p",[s._v(":hover：鼠标悬停元素")]),s._v(" "),a("p",[s._v(":active：鼠标按下元素")]),s._v(" "),a("p",[s._v(":focus：元素聚焦")]),s._v(" "),a("blockquote",[a("p",[s._v("记忆技巧：a标签4种伪类状态顺序可记忆为LoVeHAte")])])]),s._v(" "),a("li",[a("p",[s._v("目标伪类（当前活动的锚）")]),s._v(" "),a("p",[s._v(":target：匹配当前活动的元素")])]),s._v(" "),a("li",[a("p",[s._v("语言伪类")]),s._v(" "),a("p",[s._v(":lang(language)：匹配值为language的lang属性的元素")])]),s._v(" "),a("li",[a("p",[s._v("UI元素状态伪类（一般是表单元素，如输入、单选框、复选框）")]),s._v(" "),a("p",[s._v(":enabled：匹配被启用的元素")]),s._v(" "),a("p",[s._v(":disabled：匹配被禁用的元素")]),s._v(" "),a("p",[s._v(":checked：匹配被选中的元素")])]),s._v(" "),a("li",[a("p",[s._v("结构性伪类")]),s._v(" "),a("p",[s._v(":root：文档根元素")]),s._v(" "),a("p",[s._v("XXX:first-child：选择父元素下的第一个元素且匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:nth-child(n)：选择父元素下第n个(或倒数是奇数odd或倒数是偶数even)元素且匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:last-child：选择父元素下倒数第一个元素且匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:nth-last-child(n)：选择父元素下倒数第n个(或倒数是奇数odd或倒数是偶数even)元素且匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:only-child：选择父元素下只有一个元素且匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:first-of-type：选择父元素下第一个匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:nth-of-type(n)：选择父元素下第n个匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:last-of-type：选择父元素下倒数第一个匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:nth-last-of-type(n)：选择父元素下倒数第n个匹配XXX的元素")]),s._v(" "),a("p",[s._v("XXX:only-of-type：选择父元素下匹配XXX且唯一的元素")]),s._v(" "),a("p",[s._v("提供"),a("a",{attrs:{href:"https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-selector.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("示例代码"),a("OutboundLink")],1),s._v("区分它们各自的效果")])]),s._v(" "),a("li",[a("p",[s._v("否定伪类")]),s._v(" "),a("p",[s._v("XXX:not(selector)：不匹配selector的其他XXX元素")])]),s._v(" "),a("li",[a("p",[s._v("其它")]),s._v(" "),a("p",[s._v("XXX:empty：没有子元素的XXX元素(含文本节点)")]),s._v(" "),a("p",[s._v(":selection：选择被用户选取的元素的部分")])])]),s._v(" "),a("h3",{attrs:{id:"伪元素选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#伪元素选择器"}},[s._v("#")]),s._v(" 伪元素选择器")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("定义：一般指前面有两个连续英文冒号的选择器")])]),s._v(" "),a("li",[a("p",[s._v("伪元素有哪些")]),s._v(" "),a("p",[s._v("XXX::before：匹配XXX元素前插入内容")]),s._v(" "),a("p",[s._v("XXX::after：匹配XXX元素后插入内容")]),s._v(" "),a("p",[s._v("XXX::first-line：匹配XXX元素的首行")]),s._v(" "),a("p",[s._v("XXX::first-letter：匹配XXX元素的首字母")])]),s._v(" "),a("li",[a("p",[s._v("::before与:before有何异同?")]),s._v(" "),a("p",[s._v("相同点：都是css伪元素，都可以在元素内容的前面添加内容")]),s._v(" "),a("p",[s._v("不同点：:before是css3之前的写法，::before是css3的写法,目的是为了和伪类选择器区分。")])])]),s._v(" "),a("h3",{attrs:{id:"属性选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#属性选择器"}},[s._v("#")]),s._v(" 属性选择器")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("[attribute]：带有attribute属性的元素")])]),s._v(" "),a("li",[a("p",[s._v("[attribute=value]：属性attribute值为value的元素")])])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("[id = abc]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("ul",[a("li",[s._v("包含匹配选择器[attr*=value]")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* CSS3之前写法：[attribute～=value] */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("[id*=abc]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("ul",[a("li",[s._v("开头部分匹配选择器[attr^=value]")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* CSS3之前写法：[attribute|=value] */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("[id^=abc]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("ul",[a("li",[s._v("结尾部分匹配选择器[attr$=value]")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("[id=$abc]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h2",{attrs:{id:"三、选择器特性-继承与层叠"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、选择器特性-继承与层叠"}},[s._v("#")]),s._v(" 三、选择器特性：继承与层叠")]),s._v(" "),a("ul",[a("li",[s._v("继承：子元素会继承父元素的某些样式")]),s._v(" "),a("li",[s._v("层叠：子元素若定义了与父元素相同的样式，会覆盖父元素的样式")])]),s._v(" "),a("blockquote",[a("p",[s._v("注：有时有些标签并没有继承父元素的样式，例如"),a("code",[s._v("a")]),s._v("标签不受父元素"),a("code",[s._v("color")]),s._v("属性影响，是因为浏览器为标签"),a("code",[s._v("a")]),s._v("设置了默认样式。再者，标签"),a("code",[s._v("hx")]),s._v("不受父元素的"),a("code",[s._v("font-size")]),s._v("属性影响，是因为浏览器也为标签"),a("code",[s._v("hx")]),s._v("设置了默认样式。所以，继承没生效是因为浏览器为一些标签设置了默认样式")])]),s._v(" "),a("h2",{attrs:{id:"四、选择器优先级与权重"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、选择器优先级与权重"}},[s._v("#")]),s._v(" 四、选择器优先级与权重")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("1）若通过选择器指向不同标签，则此时继承的权重为0，根据层叠性进行选择")])]),s._v(" "),a("li",[a("p",[s._v("2）若通过选择器指向同一标签，则根据选择器优先级进行选择，若最后的选择器都在同一优先级，则进行权重的叠加")]),s._v(" "),a("p",[s._v("①CSS引用优先级：内联式 > 嵌入式 > 链接式 > 导入式")]),s._v(" "),a("p",[s._v("②选择器优先级：内联式 > id选择器 > 类、属性、伪类选择器 > 标签、伪元素选择器")]),s._v(" "),a("p",[s._v("权重定义：style属性为1000，id选择器为100，类选择器为10，标签选择器为1。注意，10个标签选择器的权重没有1个类选择器的权重高。它们有质的区别，没有量的区别。")]),s._v(" "),a("p",[s._v("③（慎用）!important设置选择器为最高优先级")])]),s._v(" "),a("li",[a("p",[s._v("3）当选择器优先级、权重都相同时，则呈现的效果取决于选择器定义的先后顺序。示例如下，")]),s._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),a("span",{pre:!0,attrs:{class:"token style"}},[a("span",{pre:!0,attrs:{class:"token language-css"}},[s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".red")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".blue")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" blue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("red blue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("结果是蓝色"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("blue red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("结果是蓝色"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])])])])])}),[],!1,null,null,null);t.default=e.exports}}]);