---
title: CSS伪类集锦
tags: 
- CSS
---

本文的CSS伪类介绍大多参考自[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

## 函数伪类
### :not()
- 满足不匹配指定的整个选择器列表的元素，称为否定伪类
- 注意的点
  
  参数有多个选择器则逗号分隔，最后不要加逗号
  
  参数不支持伪元素选择器
  
  对无效选择器，会导致整个选择器失效
  
  其优先级会计入选择器列表参数的优先级

- 示例
  ```css
  /* 下面选择器与.item:not(.red):not(.blue)等价 */
  .item:not(.red, .blue) {
    color: #999;
  }
  ```

### :is()
- 满足匹配指定选择器列表当中一个的元素
- 注意的点
  
  参数有多个选择器则逗号分隔
  
  参数不支持伪元素选择器
  
  对无效选择器，仍会正常解析

- 示例
  ```css
  /* 下面选择器与.item:is(.red):is(.blue)不等价 */
  .item:is(.red, .blue) {
    background: black;
  }
  /* .item:not(.red, :abc)会使整个选择器无效，而下面写法会使.item:not(.red)这部分仍保持有效 */
  .item:not(:is(.red, :abc)) {
    background: white;
  }
  ```

### :where()
- 基本同:is()
- 与:is()的唯一区别在于选择器的优先级不同，**即:where()选择器的优先级为0，而:is()选择器的优先级会计入选择器列表参数的优先级**
- 示例
  ```css
  /* 使用:where()，结果背景是绿色；而使用:is()，结果背景是黑色 */
  .item:where(.red) {
    background: black;
  }
  .item {
    background: green;
  }
  ```

### :has()
- 满足匹配相对选择器列表中至少一个的元素
- 注意的点
  
  参数有多个选择器则逗号分隔，最后不要加逗号
  
  参数不支持伪元素选择器
  
  对无效选择器，会导致整个选择器失效
  
  其优先级会计入选择器列表参数的优先级

  不支持嵌套

- 示例
  ```css
  /* 后代存在元素a或元素b */
  .item:has(a, b) {
    &::before {
      content: "或逻辑";
    }
  }
  /* 后代存在元素a和b */
  .item:has(a):has(b) {
    &::before {
      content: "与逻辑";
    }
  }
  ```

## 用户操作伪类
### :focus-visible
- 匹配聚焦时的元素，但与:focus不同在于，仅在用户需了解焦点当前位置(比如按Tab键聚焦)时才显示样式。什么时候用它？只考虑使用辅助设备时的聚焦效果(无障碍访问体验)，而不关注正常聚焦时的效果
- 示例
  ```css
  /* 点击按钮时出现效果 */
  .btn-focus:focus {
    outline: 2px dashed blue;
  }
  /* 按Tab键聚焦时出现效果 */
  .btn-focus-visible:focus-visible {
    outline: 2px dashed red;
  }
  /* 如果是input、select、textarea则看不出，都是在点中或选中时生效 */
  ```

### :focus-within
- 匹配自身或其后代(包括shadow tree)元素获得焦点的元素。是一种父选择器行为，子元素状态影响父元素样式
- 示例
  ```css
  /* 表单里的元素聚焦时，整个表单容器样式变化 */
  form:focus-within {
    background: #ff8;
    color: black;
  }
  ```

## 输入伪类
### :placeholder-shown
- 匹配显示占位符时的input/textarea元素
- 示例
  ```css
  /* 手机号输入框与其他输入框区分 */
  .phone:placeholder-shown {
    color: black;
    background: #e8e8e8;
  }
  ```

## 位置伪类
### :target
- 匹配目标元素。当文档加载完毕时，从文档的URL片段标识符获取目标元素，URL片段标识符指紧跟#的部分，但在
Web Component中不生效
- 示例
  ```html
  <a href="#p1">Jump to the first paragraph!</a>
  <!-- 如果没有找到，之前的目标元素样式会消失 -->
  <a href="#nowhere">This link goes nowhere, because the target doesn't exist.</a>
  <p id="p1">You can target <i>this paragraph</i> using a URL fragment. Click on the link above to try out!</p>
  <style>
  p:target {
    background-color: gold;
  }
  </style>
  ```

### :target-within
- 匹配自身或其后代元素定位为文档目标的元素
- ！！！**目前暂无浏览器支持**
