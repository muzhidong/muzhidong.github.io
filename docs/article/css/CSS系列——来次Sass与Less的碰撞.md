---
title: 来次Sass与Less的语法碰撞
tags: 
- Less
- Sass
---
# 来次Sass与Less的语法碰撞

>这里的Sass使用dart-sass版，非node-sass或libSass。

## 第一关：变量

我们用分别用Less和Sass实现如下效果：

![css_01](/preprocess/css_01.png)

Sass实现：
```scss
$w200: 200px;
$h200: 200px;
.bg-red{
  background-color: red;
}
.circle-radius {
  border-radius: 50%;
}
.triangle {
  &::before{
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: -50%;
    border: 100px solid transparent;
    border-bottom-color: gold;
  }
}
@mixin mixin(){
  &::after{
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 50%;
    border: 100px solid transparent;
    border-top-color: greenyellow;
  }
}
.sass .square{
  position: relative;
  width: $w200;
  height: $h200;
  @extend .bg-red;
  @extend .circle-radius;
  @extend .triangle;
  @include mixin;
}
```
Less实现：
```less
@w200: 200px;
@h200: 200px;
@bgRed: .bg-red;
@{bgRed}{
  background-color: red;
}
@circleRadius:{
  border-radius: 50%;
}
@triangle:{
  &::before{
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: -50%;
    border: 100px solid transparent;
    border-bottom-color: gold;
  }
}
.mixin(@extraStyle){
  @extraStyle();
}
.less .square{
  position: relative;
  width: @w200;
  height: @h200;
  .bg-red;
  @circleRadius();
  @triangle();
  .mixin({
    &::after{
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      top: 50%;
      border: 100px solid transparent;
      border-top-color: greenyellow;
    }
  })
}
```

可以发现，
- Sass变量用$声明，用:赋值，变量只能是单位值、颜色两种；
- Less变量用@声明，用:赋值，变量可以是单位值、颜色、选择器、样式集合，还可以作为参数。

## 第二关：混入

有如下一段HTML，为第二、三个子元素加点颜色，
```html
<div class="parent">
  <div>one</div>
  <div class="parent-second">two</div>
  <div>three</div>
</div>
```

Sass实现：
```scss
@mixin no-output-mixin{
  color: blueviolet;
}
@mixin output-mixin{
  color: brown;
}
.sass .parent{
  &>div:nth-child(3){
    @include no-output-mixin;
  }
  &-second{
    @include output-mixin;
  }
}
```

Less实现：
```less
.no-output-mixin(){
  color: blueviolet;
}
.output-mixin{
  color: brown;
}
.less .parent{
  & > div:nth-child(3){
    .no-output-mixin();
  }
  &-second{
    .output-mixin;
  }
}
```

为了语法糖容易比较，特意代码上保持命名一致，
- Less混入声明跟使用CSS方式相同，引用则指定选择器名称。它分无输出混入（后面带括号）、有输出混入（后面不带括号），这个输出可理解为编译后的CSS文件中是否包含样式；
- Sass通过@mixin定义，@include应用，相较于less，只有无输出混入；
- 顺带一提，Sass和Less都支持父选择器&。

>拓展：Sass和Less的混入都支持带不定参数

举个例子，自定义一个盒子的宽度、高度、边框
```css
/* Sass */
@use "sass:list" as list;
@mixin no-certain-mixin($size, $rest...) {
  width: $size;
  height: $size;
  border: list.nth($rest, 1) list.nth($rest, 2) list.nth($rest, 3);
}
.sass .rest{
  @include no-certain-mixin(200px, 1px, dashed, blue);
}

/* Less */
.no-certain-mixin(@size; @rest...) {
  width: @size;
  height: @size;
  border: @rest;
}
.less .rest{
  .no-certain-mixin(200px, 1px, dashed,blue);
}
```

会发现，less实现简单，sass需要内置模块list配合实现。less的不定参数设计是考虑作为一个整体使用，而sass的不定参数则灵活些，但牺牲了使用的复杂度。

## 第三关：嵌套

搞一个基础的列表样式，

Sass实现：
```scss
.sass .container{
  ul{
    list-style: none;
    li{
      border-bottom: 1px dashed gold;
      span{
        font-weight: bold;
      }
    }
  }
}
```
Less实现：
```less
.less .container{
  ul{
    list-style: none;
    li{
      border-bottom: 1px dashed gold;
      span{
        font-weight: bold;
      }
    }
  }
}
```
嵌套的使用两者基本一致。

## 第四关：操作符

直接看一段代码，
```scss
@use "sass:math" as math;
.sass .box{
  position: relative;
  left: 50px - 10px;
  width: 10px + 40px;
  height: math.div(100px, 2);
  padding: 30px - 2px;
  border: (1px * 10) solid #880000;
  background-color: #666;
}
```

```less
.less .box{
  position: relative;
  left: 50px - 10%;
  width: 10px + 40px;
  height: (100px / 2);
  padding: 30px - 2em;
  border: (1px * 10) solid (red / 2);
  background-color: #222 * 3;
}
```

实践发现：
- Sass提供以下操作符：==、!=、<、<=、>、>=、+、-、*、%、字符串连接符+、not、and、or。当不同单位间进行运算会报错，如果启动时带了watch选项，能实时监听语法错误，在终端和页面都有报错提示，非常友好。不支持除法运算符，推荐使用 math.div(100px, 2)。也不支持使用颜色作运算，可以考虑使用color.adjust函数（后面有提到）；
- Less不同单位间的运算不报错，结果按第一个值的单位进行计算。建议使用同一种单位进行运算，以达预期效果。

## 第五关：继承

继承与混入的差异：继承的样式不会插入选择器，而是重新定义相同的选择器进行应用；混入的样式直接插入选择器。

有两个空心圆，代码如下，
```scss
.more{
  border: 2px solid orange;
  border-radius: 50%;
}
.sass .extend{
  width: 100px;
  height: 100px;
  @extend .more;
}
.sass .extend2{
  width: 100px;
  height: 100px;
  @extend .more;
}
```

```less
.more{
  border: 2px solid orange;
  border-radius: 50%;
}
.less .extend{
  width: 100px;
  height: 100px;
  &:extend(.more);
}
.less .extend2:extend(.more){
  width: 100px;
  height: 100px;
}
```
可以看出，Sass与Less只是语法糖上的不同，无太大差异。Less支持两种写法，实现选择器继承。

## 第六关：流程控制

>Sass提供了循环控制如@each、@for、@while，也提供了条件控制如@if、@else、@else-if。

>Less提供了守卫when和if。

在这拿@while和when做个实现比较。页面结构如下，
```html
<div class="loop">
  <span class="item-1">第一名</span>
  <span class="item-2">第二位</span>
  <span class="item-3">第三个</span>
  <span class="item-4">第四只</span>
  <span class="item-5">第五批</span>
  <span class="item-6">第六感</span>
</div>
```

实现如下效果，

![css_02](/preprocess/css_02.png)

```scss
@use "sass:math" as math;
@use "sass:color" as color;
@mixin handler($num, $i: 1) {
  @while $i <= $num {
    .item-#{$i} {
      color: color.adjust(#ff0000, $red: math.div(-255, $i) * ($i - 1), $green: 0, $blue: 0);
      font-size: 12px + $i;
    }
    $i: $i + 1;
  }
}
.sass .loop{
  @include handler(6)
}
```

```less
.handler(@num, @i: 1) when (@i =< @num) {  
  .item-@{i}{
    color: (red / @i);
    font-size: 12px + @i;
  }
  .handler(@num, (@i+ 1));  
}
.less .loop{
  .handler(6)
}
```
可以看出，Sass和Less在流程控制写法有些差异，Sass写法比较贴近我们的JS编程，而Less是when + “递归”的写法，看起来不大习惯。个人认为，Sass在这块设计上比Less好些。细心的同学应该也注意到，两者都支持插值。
> 拓展：我们的效果每轮询一次，颜色值变为上一次的一半，字体大小比上一次大1px，字体大小没什么好说的，由于less支持颜色值和除法运算符，实现非常直观，而Sass实现需要借助color.adjust函数，并自行实现算法。

当然，以上并非全部。还有导入、作用域、注释，不过它们在两者之间基本一致，也比较简单，就不列举了。

它们也有自己的特性，比如Sass提供了内置模块，上面示例其实也有所体现，通过@use规则引入；支持partials，即导入以_开头的sass文件不会被打包，常用来放置一些工具函数或mixin等；内置了关于数值、字符串、颜色、Lists、Maps、计算等各类函数，并支持自定义，这点less不支持自定义函数；还提供了@at-root（用于全局样式）、@error、@warn、@debug（日志打印）、@forward（效果犹如@use+@extend的结合?）。转而，Less有自己的命名空间和访问器、合并+/+_(属性值合并)、插件@plugin(通过JS做更多扩展)等。

以上，只是对常用的语法糖进行大体比较。想对二者更深入了解，可上官网进行学习。
- [Less官网](https://lesscss.org/)
- [Sass官网](https://sass-lang.com)

最后个人看法：Sass与Less对比下来，编码量相近，但Less语法糖比较杂，Sass语法糖比较规范，自由度更高，扩展性也不错。个人认为Sass设计好于Less。

