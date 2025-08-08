---
title: CSS伪元素集锦
tags: 
- CSS
---

本文的CSS伪元素介绍大多参考自[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)

## ::-webkit-scrollbar 
- 该伪元素是非标准的，一般用于PC端。scrollbar-width、scrollbar-color、scrollbar-gutter等标准属性将替代
- 相关伪元素介绍
  ```css
  /* 滚动条整体样式。设置的width、height，分别是对应纵向滚动条宽度、横向滚动条高度 */
  ::-webkit-scrollbar 
  /* 一设置滚动条样式，滚动条两端的按钮图标就消失，但可以重新设置图片、新样式。IOS不支持 */
  ::-webkit-scrollbar-button 
  /* 外层轨道。IOS不支持 */
  ::-webkit-scrollbar-track 
  /* 内层轨道，它会覆盖外层轨道 scrollbar-track 的样式。IOS不支持 */
  ::-webkit-scrollbar-track-piece 
  /* 滑块。IOS不支持 */
  ::-webkit-scrollbar-thumb 
  /* 纵向滑块。IOS不支持 */
  ::-webkit-scrollbar-thumb:vertical
  /* 横向滑块。IOS不支持 */
  ::-webkit-scrollbar-thumb:horizontal
  /* 边角，两个滚动条交汇处。IOS不支持 */
  ::-webkit-scrollbar-corner 
  /* 在某些元素左下角出现，处理大小拖拽 */
  ::-webkit-resizing
  ```
- 示例
  ```css
  /* 自定义默认滚动条样式 */
  /* 使用标准属性 */
  @supports (scrollbar-color: auto) {
    .scroll-box {
      /* 表示是否保留位于border与padding之间的一段空间。预留空间，防止内容增长时出现不必要的布局变化，同时避免在不需要滚动时出现不必要的视觉效果。可取值auto（overflow为auto/scroll且溢出则占用空间）、stable [both-edges]（overflow为auto/scroll/hidden都会占用空间，both-edges表示对另一对立边也起效） */
      /* scrollbar-gutter: stable; */
      /* 滚动条宽度。可取值auto(默认值，平台默认宽度)、thin、none(不显示滚动条，但可滚动)。Android不支持 */
      scrollbar-width: 3px;
      /* 滚动条颜色。可取值auto(默认值)、颜色双值(第一个表示滑块，第二个表示轨道)。Safari、Android、IOS不支持 */
      scrollbar-color: #c1c1c1 #f1f1f1;
    }
  }
  /* 使用非标准伪元素，向下兼容 */
  @supports selector(::-webkit-scrollbar) {
    .scroll-box::-webkit-scrollbar {
      width: 3px; 
      background-color: #f1f1f1; 
    }
    .scroll-box::-webkit-scrollbar-thumb {
      background-color: #c1c1c1; 
    }
  }
  ```

## 表单相关的伪元素
### ::placeholder
- 控制input/textarea元素的占位符样式。而`:placeholder-shown`控制input/textarea元素显示占位时的样式，注意区别

## 印刷伪元素
### ::first-letter
- 匹配元素的首字符，此时字符可以视为匹配元素的假想子元素
- 生效前提：匹配元素的display值为block、inline-block、list-item、table-cell、table-caption；首字符不能是@、#、%、&、括号类、冒号类、引号类、分号类、逗号类、句号类、问号类、星号类、省略号、顿号、斜杆、反斜杆、空格、替换元素、display非block、inline、list-item的元素；
- 生效CSS属性：padding、border、margin、color、text-decoration、text-transform、letter-spacing、word-spacing、line-height、vertical-align、float、font、background
- before伪元素也可以参与::first-letter伪元素
- 应用：金额前的币种符号如¥、$样式的单独设置
  
### ::first-line
- 匹配元素的首行
- 生效前提：匹配元素的display值为block、inline-block、list-item、table-cell；首行中的元素只能是display值为inline、block、list-item的元素，否则达不到样式对整行生效的结果
- 生效CSS属性：color、text-decoration、text-transform、letter-spacing、word-spacing、line-height、vertical-align、font、background
- ::first-letter和::first-line同时作用了color，::first-letter优先级高
- 应用：实体按钮样式小技巧，提高复用性
  ```html
  <style>
    .btn {
      /* 其他样式... */
      background: currentColor;
    }
    .btn::first-line {
      color: white;
    }
    .black {
      color: black;
    }
    .red {
      color: red;
    }
  </style>
  <div class="btn black">黑底白字实体按钮</div>
  <div class="btn red">红底白字实体按钮</div>
  ```

### ::cue
- 用于控制视频字幕样式，只支持color、line-height、text-decoration、text-shadow、white-space、text-combine-upright、font、background、opacity、outline、visibility、ruby-position属性
- 示例
  ```css
  .video::cue {
    color: pink;
  }
  /* 对字幕中u元素生效 */
  .video::cue(u) {
    font-weight: bold;
    font-size: 20px;
  }
  ```

## 元素支持的伪元素
### ::part
- 表示shadow tree中匹配part属性的任何元素。一般用于外部操作自定义元素(组件)的样式
- 示例
  ```html
  <!-- 演示代码 -->
  <template id="my-box">
    <style>
      .box {
        display: inline-block;
        padding: 10px;
        border: 1px solid currentColor;
        border-radius: 5px;
        .box-wrapper {
          display: flex;
        }
      }
    </style>
    <div class="box" part="box">
      <div class="box-wrapper" part="box-wrapper"></div>
    </div>
  </template>
  <my-box></my-box>

  <style>
    /* 值顺序无关性，支持除结构性伪类外的伪类 */
    my-box::part(box):hover {
      border: 1px solid green;
    }
  </style>
  ```


## 高亮伪元素
### ::selection
- 控制文档中被用户选中的部分的样式。只支持color、background-color、text-decoration、text-shadow、-webkit-text-stroke-color、-webkit-text-fill-color、-webkit-text-stroke-width等属性。IOS不支持该属性
- 示例
  ```css
  ::selection {
    color: gold;
    background-color: red;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: green;
  }
  ```

### *::spelling-error
- 控制拼写错误的文本样式，只支持color、text-decoration、text-shadow、text-emphasis-color、background-color、cursor、caret-color、outline等属性
- 示例
  ```html
  <style>
  ::spelling-error {
    text-decoration-line: spelling-error;
  }
  </style>
  <!-- 元素需在可编辑下才会显示拼写样式 -->
  <div contenteditable spellcheck="true">we are famiyl.</div>
  ```

### *::grammar-error
- 控制语法错误的文本样式。支持属性同::spelling-error
- 示例
  ```html
  <style>
  /* 不起效 */
  ::grammar-error {
    text-decoration-line: grammar-error;
  }
  </style>
  <div contenteditable spellcheck="true">I is an apple.</div>
  ```
