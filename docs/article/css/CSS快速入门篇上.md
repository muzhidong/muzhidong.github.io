---
title: CSS快速入门篇上
tags: 
- CSS
---

`CSS`全称是Cascading Style Sheet，中译为层叠样式表。本篇将讲解CSS引用和选择器。

## 一、CSS引用
提供了以下4种引用方式。

### 内联样式
给标签设置`style`属性，如`<标签 style="attr1:value1;attr2:value2"></标签>`

### 嵌入样式
在`head`标签嵌入`style`标签，如下，
```html
<style>
selector { 
  attr1：value1; 
  attr2：value2;
}
</style>
```

### 链接样式
在`head`标签中嵌入`link`标签，如下，
```html
<link type="text/css" href="fileName.css" rel="stylesheet" />
```

### 导入样式
将多个样式文件导入到一个样式文件中，如下，
```css
@import url("fileName.css");
```

链接样式与导入样式的比较
<style>
.compare {
  display:grid;
  border-top:1px solid white;
  border-left:1px solid white;
}
.compare > div {
  border-right: 1px solid white;
  border-bottom: 1px solid white;
}
.compare > div:nth-child(3n+1) {
  grid-column:1/2;
}
.compare > div:nth-child(3n+2) {
  grid-column:2/3;
}
.compare > div:nth-child(3n) {
  grid-column:3/4;
}
</style>
<div class="compare">
  <div></div>
  <div>链接样式</div>
  <div>导入样式</div>
  <div>用途</div>
  <div>可用于加载CSS、定义RSS、定义rel连接属性</div>
  <div>仅用于加载CSS</div>
  <div>加载时间点</div>
  <div>页面加载开始时加载</div>
  <div>页面加载结束时加载</div>
</div>

## 二、CSS选择器
可以将指定的CSS样式作用于"对象"上。

### id选择器
- 语法
  
  以#开头，后加id名称，注意id名称不要以数字开头

- 作用范围：属性id值为对应的id名称的元素

- 示例
```css
#content {
  font-weight: bold;
}
```

### 类选择器
- 语法

  以.开头，后加类名，同样注意类名不要以数字开头

- 作用范围：属性class值为对应类名的元素

- 示例
```css
.c-yellow {
  color: yellow;
}
```

### 标签选择器
- 语法
  
  直接使用标签名

- 作用范围：某种标签

### 通配选择器
- 语法

  直接使用`*`

- 作用范围：所有元素，慎用

### 组合选择器
- 含义：集体控制选择器，将样式应用于多种选择器。逗号隔开，推荐每种选择器单独一行。
- 示例
```css
div,
span {
  font-family: "Microsoft Yahei";
}
``` 

### 后代选择器
- 含义：选择某父元素的所有满足的后代元素。空格连接。
- 示例
```css
#container div {
  font-size: 14px;
}
```

### 相邻后代选择器
- 含义：选择某父元素的所有满足的直接后代元素。>连接。
- 示例
```css
#container > div {
  display: flex;
}
```

### 兄弟选择器
- 含义：选择与某元素同级且在其之后的满足的元素。～连接。
- 示例
```css
.item ~ .item {
  color: white;
  background: black;
}
```

### 相邻兄弟选择器
- 含义：选择与某元素同级且紧接在其后的满足的元素。+连接。
- 示例
```css
.item + .a {
  color: red
}
```

### 伪类选择器
- 语法
  
  选择器:伪类名称

- 动态伪类（随元素状态而变化）
  
  :link：元素未访问
  
  :visited：元素访问过
  
  :hover：鼠标悬停元素
  
  :active：鼠标按下元素
  
  :focus：元素聚焦

  > 记忆技巧：a标签4种伪类状态顺序可记忆为LoVeHAte

- 目标伪类（当前活动的锚）

  :target：匹配当前活动的元素

- 语言伪类
  
  :lang(language)：匹配值为language的lang属性的元素

- UI元素状态伪类（一般是表单元素，如输入、单选框、复选框）
  
  :enabled：匹配被启用的元素
  
  :disabled：匹配被禁用的元素
  
  :checked：匹配被选中的元素

- 结构性伪类
  
  :root：文档根元素
  
  XXX:first-child：选择父元素下的第一个元素且匹配XXX的元素
  
  XXX:nth-child(n)：选择父元素下第n个(或倒数是奇数odd或倒数是偶数even)元素且匹配XXX的元素
  
  XXX:last-child：选择父元素下倒数第一个元素且匹配XXX的元素
  
  XXX:nth-last-child(n)：选择父元素下倒数第n个(或倒数是奇数odd或倒数是偶数even)元素且匹配XXX的元素
  
  XXX:only-child：选择父元素下只有一个元素且匹配XXX的元素
  
  XXX:first-of-type：选择父元素下第一个匹配XXX的元素
  
  XXX:nth-of-type(n)：选择父元素下第n个匹配XXX的元素
  
  XXX:last-of-type：选择父元素下倒数第一个匹配XXX的元素
  
  XXX:nth-last-of-type(n)：选择父元素下倒数第n个匹配XXX的元素
  
  XXX:only-of-type：选择父元素下匹配XXX且唯一的元素

  提供[示例代码](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-selector.html)区分它们各自的效果

- 否定伪类
  
  XXX:not(selector)：不匹配selector的其他XXX元素

- 其它
  
  XXX:empty：没有子元素的XXX元素(含文本节点)
  
  :selection：选择被用户选取的元素的部分

### 伪元素选择器
- 定义：一般指前面有两个连续英文冒号的选择器

- 伪元素有哪些

  XXX::before：匹配XXX元素前插入内容
  
  XXX::after：匹配XXX元素后插入内容
  
  XXX::first-line：匹配XXX元素的首行
  
  XXX::first-letter：匹配XXX元素的首字母

- ::before与:before有何异同?

  相同点：都是css伪元素，都可以在元素内容的前面添加内容
  
  不同点：:before是css3之前的写法，::before是css3的写法,目的是为了和伪类选择器区分。

### 属性选择器
- [attribute]：带有attribute属性的元素

- [attribute=value]：属性attribute值为value的元素
```css
[id = abc] {
  background:red;
}
```

- 包含匹配选择器[attr*=value]
```css
/* CSS3之前写法：[attribute～=value] */
[id*=abc] {
  background:red;
}
```

- 开头部分匹配选择器[attr^=value]
```css
/* CSS3之前写法：[attribute|=value] */
[id^=abc] {
  background:red;
}
```

- 结尾部分匹配选择器[attr$=value]
```css
[id=$abc] {
  background:red;
}
```

## 三、选择器特性：继承与层叠
- 继承：子元素会继承父元素的某些样式
- 层叠：子元素若定义了与父元素相同的样式，会覆盖父元素的样式
> 注：有时有些标签并没有继承父元素的样式，例如`a`标签不受父元素`color`属性影响，是因为浏览器为标签`a`设置了默认样式。再者，标签`hx`不受父元素的`font-size`属性影响，是因为浏览器也为标签`hx`设置了默认样式。所以，继承没生效是因为浏览器为一些标签设置了默认样式

## 四、选择器优先级与权重
- 1）若通过选择器指向不同标签，则此时继承的权重为0，根据层叠性进行选择

- 2）若通过选择器指向同一标签，则根据选择器优先级进行选择，若最后的选择器都在同一优先级，则进行权重的叠加
  
  ①CSS引用优先级：内联式 > 嵌入式 > 链接式 > 导入式
  
  ②选择器优先级：内联式 > id选择器 > 类、属性、伪类选择器 > 标签、伪元素选择器

  权重定义：style属性为1000，id选择器为100，类选择器为10，标签选择器为1。注意，10个标签选择器的权重没有1个类选择器的权重高。它们有质的区别，没有量的区别。
  
  ③（慎用）!important设置选择器为最高优先级

- 3）当选择器优先级、权重都相同时，则呈现的效果取决于选择器定义的先后顺序。示例如下，
  ```html
  <style>
  .red {
    color: red;
  }
  .blue {
    color: blue;
  }
  </style>
  <div class="red blue">结果是蓝色</div>
  <div class="blue red">结果是蓝色</div>
  ```
