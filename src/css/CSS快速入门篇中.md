---
title: CSS快速入门篇中
tags: 
- CSS
---

上篇介绍了CSS引用和选择器，本篇作为CSS快速入门的第二篇，介绍元素分类与尺寸、盒模型、布局、层叠规则。

## 元素分类与尺寸
### 元素按外在盒子是块级还是内联分类
- 块级元素

  块级元素是指外在盒子是块级的元素。特点是一个水平流上只能单独显示一个元素；具有换行特性，与clear属性配合可清除浮动。

  块级元素与`display:block`元素并不等同，前者范围更大，也包括`display:table`等元素。

- 内联元素

  内联元素是指外在盒子是内联的元素。
  
  内联元素与`display:inline`元素并不等同，前者范围更大，也包括`display:inline-table`等元素。
  
  > 幽灵空白节点：在HTML5文档声明中，内联元素的所有解析和渲染表现就如同每个行框盒子的前面有一个“空白节点”。实际上也是一个盒子，具有该元素的字体和行高属性的0宽度的内联盒子。

### display
- 含义：表示元素的显示方式。CSS规范规定，每个元素都有display属性，有自己的display默认值。
  
- 每个元素都有两个盒子——外在盒子和内在盒子
  
  外在盒子：负责元素是可以一行展示，还是只能换行展示
  
  内在盒子：负责宽高大小、内容呈现
  
  比如当值为inline-block时，表示元素由外在的内联盒子和内在的块级容器盒子组成，又如block可以理解为block-block，table可以理解为block-table等。

- 元素隐藏

  ```css
  /* 几种隐藏元素的方式 */
  .none {
    /* 特点：不占据空间；无法点击；辅助设备无法访问 */
    display: none;
  }

  .hidden {
    /* 特点：占据空间；无法点击；辅助设备无法访问 */
    /* 相较于display:none，除了占据空间这点，还有以下不同之处：
      1、它具有继承性，致使若子元素覆盖了父元素visibility属性，如设置值为visible，则会展示出来；
      2、transition与visibility配合良好，但不支持display；
      3、在无障碍访问上要更友好些；
      4、仍可获取元素的尺寸和位置信息；
      5、不影响CSS计数器
    */
    visibility: hidden;
  }

  .tl-9999 {
    /* 特点：不占据空间；无法点击；键盘可访问 */
    position: absolute;
    /* 定位到屏幕外 */
    top: -9999px;
    left: -9999px;
  }

  .z-1 {
    /* 特点：占据空间；无法点击；键盘可访问 */
    position: absolute;
    z-index: -1;
  }

  .opacity0 {
    /* 特点：占据空间；可点击；辅助设备可访问 */
    opacity: 0;
  }
  ```

- 示例
  
  [display小技巧示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-display.html)

  [行内块子元素超出省略效果](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-display-inline-block.html) 

### width
取值：
- auto，一般相对于父元素100%，也可能是以下3种值的效果
- fit-content，适应内容。一般出现在使用浮动或绝对定位的元素、inline-block或table元素
- min-content，收缩到最小。容易出现在使用`table-layout:auto`的table元素，中文该断则断
- max-content，超出容器限制。出现在内容是很长的连续英文或数字的元素，或`white-space:nowrap`的内联元素

> width或height值为auto时，外部或内部尺寸下的流体特性
>
>  外部尺寸下的流体特性：
>    
>  - 正常流宽度：建议块元素不必显式设置width（无宽度准则），避免失去流动性（块盒子的自动分配水平空间的机制）
>    
>  - 格式化宽（高）度：出现在position:absolute或fixed，且设置了对立方位属性如left/right（top/bottom）的元素中
>
>  内部尺寸下的流体特性：
>    
>  - 首选最小宽度：指元素最适合的最小宽度，其表现为东亚文字如中文，最小宽度为每个汉字的宽度；西方文字的最小宽度由特定的连续的英文字符单元决定。一般会止于空格、短横线、问号以及其他非英文字符。图片内容本身的宽度即是最小宽度。
>    
>  - 最大宽度：包裹性元素设置white-space:nowrap后的宽度

### height
- 使`height:100%`有效
  
  为父级设置有效高度，此时元素的高度是相对于父级的content-box；
  ```css
  html,
  body {
    height: 100%;
  }
  .parent {
    display:inline-block;
    height: <具体数值>;
  }
  ```

  或设置其绝对定位，此时高度是相对于其最近父级的padding-box。
  ```css
  .parent {
    display:inline-block;
    position:relative;
  }
  .target {
    position:absolute;
    height: 100%;
  }  
  ```

  > 若父元素的高度没有显示指定，或目标元素不是绝对定位，则默认height值为auto，而auto和百分比计算结果是NaN，所有浏览器都是按父元素的真实值作为百分比计算的基数。

  > 浏览器是按从上而下，自外而内的顺序渲染DOM内容，也就是说先渲染父元素，再渲染子元素。

### min-width/max-width/min-height/max-height
- 初始值
  
  min-width和min-height初始值是auto

  max-width和max-height初始值是none

- 规则
  
  min/max-width和min/max-height的优先级高于!important

  最小宽(高)度大于最大宽(高)度时，元素宽(高)度最大值取最小宽(高)度

- 应用技巧

  ```css
  /* 避免图片在移动端展示过大影响体验 */
  img {
    max-width: 100%;
    /* 确保宽度不超出的同时使图片保持原来的比例 */
    height: auto !important;
  }

  /* 任意高度的元素在展开收起时有明显的高度滑动效果 */
  .element {
    max-height: 0;
    overflow: hidden;
    transition: max-height .25s;
  }
  .element.active {
    /* 一个足够大的最大高度值 */
    max-height: 1000px;
  }
  ```

## 盒模型
可以认为是元素区域的基本组成单位。由内容`content`、内边距`padding`、边框`border`、外边界`margin`四个属性组成。

### content
- 元素按是否具有可替换内容分类

  **替换元素**
  
  含义：通过修改某个属性值，呈现的内容就可以被替换的元素。如img、video、audio、iframe、input、textarea等
  
  特性：
  - 1、内容外观不受页面上的CSS影响。需借助类似appearance属性或浏览器本身暴露的样式接口，比如::ms-check{}用于改变单、复选框的内边距、背景色等
  - 2、有自己的尺寸。在没有明确尺寸设定情况下，大多默认为300 * 150px，如video\canvas；少数替换元素为0，如img；表单元素的替换元素尺寸与浏览器有关。其中，尺寸计算规则优先级如下，
  
    默认尺寸 < 固有尺寸（替换内容原本的尺寸） < HTML尺寸（通过HTML原生属性改变的尺寸） < CSS尺寸（通过CSS属性改变的尺寸，即content-box尺寸）

  - 3、在很多CSS属性上有自己的一套表现规则，比如vertical-align属性默认值是baseline，但在替换元素中，该值被视为为元素的下边缘
  
  解惑：
  - 1、块级替换元素与内联替换元素的尺寸计算规则表现一致，这也是为什么图片或表单替换元素设置display:block而宽度没有100%容器的原因
  - 2、替换元素内容的固有尺寸是不可改变的，那么为什么图片CSS尺寸设置了会覆盖固有尺寸，因为img图片标签内容默认适配方式是fill。在CSS3可以通过object-fit更改替换元素内容的适配方式

  **非替换元素**
  
  与替换元素的差异：只差了一个属性src或content（包括直接为元素添加声明content:url()或添加伪元素，并添加属性content两种方式）
  
  非替换元素转换为替换元素的一些细节点：
  - 不再支持伪元素
  - src和content同时存在时，后者优先级更高
  - 谷歌浏览器下所有元素支持content属性
  
  content生成的文本内容与普通元素的文本内容的差异：
  - 文本不可选中和复制，如同设置user-select:none
  - 文本无法被屏幕阅读设备读取，也无法被搜索引擎抓取，对可访问性和SEO不友好
  - 无法影响:empty伪类选择器，也就是说该元素仍然被视为无内容元素
  - content属性设置的值如果是动态的，比如使用了CSS函数counter()，值是无法获取的

- content内容生成技术

  ```html
  <style>
  /* content辅助元素生成 */
  /* 清除浮动：当子元素使用浮动时，为了使父元素高度不变，可以为父元素添加如下规则 */
  /* 注意清除浮动最佳方式并不是它，而是overflow，见后面介绍 */
  .clear::before,
  .clear::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
  }
  </style>

  <style>
  /* content字符内容生成 */
  /* 换行效果。换行符LF的unicode编码是000A，意在说明支持Unicode字符 */
  lf::after {
    content: '\A';
    white-space: pre;
  }
  /* 图标字体 */
  @font-face {
    font-family: 'myicon';
    src: url('./fonts/myicon.eot');
    src: url('./fonts/myicon.eot?#iefix') format('embedded-opentype'),
      url('./fonts/myicon.woff') format('woff'),
      url('./fonts/myicon.ttf') format('truetype');
  }
  .icon-tip::before {
    font-size: 16px;
    font-family: 'myicon';
    content: 'tip';
  }
  </style>

  <style>
  /* content图片或属性值内容生成 */
  .image::after {
    content: url(./logo.png);
  }
  .text::after {
    content: attr(data-src);
  }
  .mixin::before {
    /* 支持混合 */
    content: attr(data-id) url(./logo.png);
  }
  </style>

  <style>
  /* content计数器 */
  .counter {
    /* 用法：counter-reset: <计数器名称1> <初始值1> [<计数器名称2> <初始值2> [...]]];  */
    /* 默认值：不传初始值默认为0，可正可负 */
    /* 取值：none和inherit，分别表示取消重置和继承重置 */
    counter-reset: c 2;
  }
  .counter::before,
  .counter::after {
    /* 用法：counter-increment: <计数器名称1> [变化值1] [<计数器名称2> [变化值2] [...]]]; */
    /* 默认值：不传变化值默认为1，可正可负 */
    /* 取值：none和inherit，分别表示取消计数和继承计数 */
    /* 注意：声明了几次，就递增几次。计数器变化遵循html渲染顺序 */
    counter-increment: c 2;
    
    /* 用法：counter(<计数器名称> [<样式>]) */
    /* 说明：样式用于递增递减不一定是数字，也可以是英文字母或罗马文。支持同list-style-type的关键字值 */
    /* 注意：显示当前的计数值，并非终值 */
    content: counter(c);

    /* 用法：counters(<计数器名称> <字符串> [<样式>]) */
    /* 说明：表示嵌套计数，如1.1、1-1，而字符串便是定义连接符，如1.1是.，1-1是- */
    /* 示例：https://demo.cssworld.cn/4/1-18.php */
  }
  </style>
  <!-- 结果是4和6 -->
  <p class='counter'></p>
  ```

- 更多示例

  [利用替换元素与非替换元素差异优雅实现图片加载中效果](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-image-loading.html)

  [利用替换元素与非替换元素差异优雅实现图片加载失败展示](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-image-load-failed.html)

  [content-box辅助实现纯css图标](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-icon.html)

  [counter统计子元素个数，且每个子元素展示不同内容](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-counter.html)

### padding
- 含义：是padding-top，padding-left，padding-right，padding-bottom四个属性的简写。当传入4个值时，依序表示上、右、下、左内边距；当传入3个值时，依序表示上、左右、下内边距；当传入2个值时，依序表示上下、左右；当传入1个值时则表示上下左右。

- 特性应用：padding作用在内联元素，在垂直方向上不影响布局（不等同无效果）

  为内联元素增加点击域

  锚点定位的元素改成内联元素，通过设置padding-top实现定位时离顶部仍有一段距离的效果

- padding不支持负值

- padding取百分比

  无论水平方向，还是垂直方向，百分比值都是相对于父元素的宽度

  当元素是内联元素时，注意添加声明`font-size: 0`，使幽灵空白节点高度为0，避免影响高度

### border
- 含义：是border-top，border-right，border-bottom，border-left四个属性的简写。传入3个值，分别表示边框宽度width、边框样式style、边框颜色color。可以只指定某一边框进行设置，如border-top：12px solid blue，也可以只指定某一边框某一属性进行设置，如border-top-style：solid。

- border-width不支持负值和百分比

- border-style可取值实线solid、虚线dashed、点线dotted、双实线double、inset、outset等等

- border-color不设置值的话，默认取当前元素color值，即相当于取值关键字currentColor

- [border小技巧示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-border.html)

### margin
- 含义：是margin-top，margin-left，margin-right，margin-bottom四个属性的简写。当传入4个值时，依序表示上、右、下、左外边界；当传入3个值时，依序表示上、左右、下外边界；当传入2个值时，依序表示上下、左右；当传入1个值时则表示上下左右。

- 特性：margin作用在内联的非替换元素，在垂直方向上无效果

- margin支持取负值

  当元素尺寸表现符合“充分利用可用空间”（未声明width或width值为auto）时，负值margin作用在非替换元素上，呈现效果是水平方向尺寸变长，垂直方向上下移动；作用在替换元素上，呈现效果在各方向上均是移动。

- margin取百分比

  无论水平方向，还是垂直方向，百分比值都是相对于父元素的宽度

- margin合并

  含义：一般来说，块级元素的上外边界与下外边界有时会合并为单个外边界，该现象称为margin合并

  计算规则："正正取较大，正负取相加，负负取较小"

  场景：

  1、相邻兄弟元素margin合并

    阻止合并的方式：规范统一使用margin-top或margin-bottom

  2、父级和第一个或最后一个子元素margin合并

    阻止合并的方式：
      
      父元素设置为块级格式化上下文元素；
      
      父元素设置border/padding-top/bottom；
      
      父元素与第一个或最后一个子元素之间添加一个内联元素进行分隔；
      
      除了以上方式，若是父元素与最后一个子元素产生的合并，也可以给元素设置height、min-height或max-height

  3、空块级元素的margin合并

    阻止合并的方式：
      
      设置垂直方向的border/padding；
      
      里面添加内联元素；
      
      设置height/min-height

- margin取auto
  
  填充规则：若一侧定值，一侧auto，则auto为剩余空间大小；若两侧均为auto，则平分剩余空间。

  常见应用是居中处理，这里提供了[居中效果各种实现对比示例，包括水平居中、垂直居中、水平垂直居中](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-CenterLayout.html)

- [margin示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-margin.html)

### box-sizing
- 作用：改变盒模型对元素宽高的计算方式
- 取值

  默认值为content-box，表示盒子宽高指width和height，称为标准盒模型
 
  值为border-box时，表示盒子宽高除了包括width和height，还包括padding和border，称为IE怪异盒模型

## 布局
### 流体布局
- 含义：又称div+css布局或文档流布局。利用元素“流”（一种基本的定位和布局机制。可以认为是现实世界的一套物理规则，比喻为引导元素排列和定位的一条看不见的水流）的特性实现的各类布局效果。由于“流”本身具有自适应特性，所以流体布局具有自适应性，但不等同于自适应布局。自适应布局是对凡是具有自适应特性的一类布局的统称，流体布局要狭窄得多。

### 破坏流——float布局
- 本质：实现文字环绕图片显示的效果（缺少弹性，容错性差）

- 特点
  
  1、包裹性：宽度由内容决定

  2、块状化并变成格式上下文：其中块状化是指float值不为none时，该元素display值变为block或table

  3、破坏文档流：元素浮动后，出现其父元素高度塌陷，后面内容的“块状盒子”与该元素重叠，但“行框盒子”与该元素不重叠
  
  4、不会margin合并

  5、对齐机制：对齐浮动参考（浮动元素对齐参考的实体），一般是上面提及的“行框盒子”或“浮动锚点”（不存在行框盒子的话，指浮动元素所在流中的一个点，该点本身不浮动，表现上是一个没有margin、padding和border的空内联元素）

- 取值
  
  none：不浮动
  
  left：元素左浮动，后面内容流向元素右侧
  
  right：元素右浮动，后面内容流向元素左侧

- 清除浮动clear

  含义：元素盒子的边不能和前面的浮动元素相邻（同一行显示），对后面的浮动元素是不干预的。

  作用：当元素有浮动属性时，可能会对其父元素或后面元素产生影响，通过清除浮动能"一定程度"上消除浮动元素的影响
  
  取值：
  
  none：默认值，允许左、右浮动
  
  right：只对右浮动抗拒
  
  left：只对左浮动抗拒
  
  both：对左、右浮动都抗拒

- [圣杯布局各种布局实现对比示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-GrailLayout.html)

### 保护流——格式上下文
- 含义：又叫视觉格式化模型。描述盒子的布局规则，可以说是有一片区域拥有一套渲染规则来约束该区域的布局，且区域与外界隔离，互不影响

- 块级格式化上下文BFC

  主要用途：清除浮动或去margin合并

  特点：

    1、内部盒子垂直放置

    2、内部相邻盒子margin合并

    3、浮动元素参与计算BFC高度

    4、每个元素左边，与包含盒子的左边相接触，即使存在浮动也是如此

    5、BFC区域中不会与float元素重叠

  触发条件：

    float：left|right

    position：absolute|fixed

    overflow：hidden|auto|scroll

    display：inline-block|table-cell

    是html根元素

  ```css
  /* 常见bfc处理方式 */
  .bfc {
    overflow: hidden;
  }
  .bfc2 {
    display: inline-block;
  }
  .bfc3 {
    display: table-cell;
    width: 9999px;
  }
  ```

  溢出overflow
  
  - 作用：设置当对象的内容超过其指定高度及宽度时如何管理内容。由overflow-x和overflow-y两个属性组成，取值均为如下，
  
    visible：默认值，不裁剪内容，也不加滚动条，会呈现在元素框之外 
  
    auto：必须时可能裁剪对象内容或显示滚动条。注意overlay是auto的旧值别名。使用overlay时，滚动条会绘制在内容上方，不占用空间

    scroll：内容超过时显示滚动条
  
    hidden：不显示超过对象尺寸的内容。注意元素被设置为hidden，其依旧可滚动，只是没有滚动条，无法滚动而已
  
  - [overflow与滚动条、锚点定位示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-overflow.html)

- 内联格式上下文IFC

  特点：
    
    1、内部盒子从包含盒子顶部开始，一个接一个水平摆放
    
    2、摆放这些盒子时，它们在水平方向的内、外边距、边框所占用的空间都会被考虑，但在垂直方向上不被考虑
    
    3、指定宽高无效。盒子的宽度由包含盒子和存在的浮动决定，盒子的高度由行高来决定

  触发条件：
    
    display:inline

### 破坏流——position布局
- 特点
  
  层级变化：position值非static时
  
  大小参照：当left/right或top/bottom对立方位的属性值同时存在时，元素宽(高)度表现为格式化宽(高)度，其宽(高)度大小相对于最近的具有定位特性(position值非static)的祖先元素计算。另外，当top/bottom值为百分比时，参照祖先元素的高度，而right/left参照祖先元素的宽度。此时也具有完全的流体性，即margin/padding/border/content会自动分配水平或垂直空间。

- 取值

  - static：默认值，静态定位

  - absolute：绝对定位，位置参照最近的position非static的祖先元素进行定位。特性如下，
    
    1.包裹性：同float

    2.块状化并变成格式上下文：同float

    3.破坏文档流：同float

    4.优先级高于float属性

    5.宽度计算是相对于最近position值非static的祖先元素，否则相对于根元素

    6.**具有相对定位特性，无依赖的绝对定位（实用）**
    ```css
    /* 可使用该特性避免层级问题 */
    .nodep-abs { 
      /* 父元素无需设置position:relative; */
      position: absolute;
      /* 通过margin调整自身位置 */
      margin: -10px 0 0 5px;
    }
    ```

    7.外层text-align会间接影响内部使用无依赖绝对定位的内联元素位置，实质影响的是内联元素的幽灵空白节点

    8.如果overflow不是定位元素，且absolute元素和overflow容器之间没有其他定位元素，则对absolute元素无影响，即absolute元素若超出容器高度，值为hidden时不裁剪，auto/scroll时也不会出现滚动条。但是有一种情况例外，**若在overflow非定位元素上或它和absolute元素之间的元素上有transform或perspective或filter属性值非none，则该对absolute元素裁剪则裁剪，该出现滚动条则出现滚动条**

    9.**若绝对定位元素的父级中有transform或perspective或filter属性值非none，则绝对定位元素会相对于该父级元素定位**
  
  - relative：相对定位，位置参照自身进行定位。常与绝对定位元素配合，**最好保持“作用范围最小化”（经验）**，避免层级问题。特性如下，
  
    1.元素保持在正常文档流中，若无声明方位属性，对自身也无影响

    2.对立方位属性同时存在时，top优于bottom，left优于right，遵循自上而下，从左到右的渲染顺序

    3.一般不影响周边元素布局
  
  - fixed：固定定位，位置参照所在窗口的根元素进行定位。特性同absolute，尤其是第8、9点依然适用。另附上[position:fixed的absolute模拟示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-position.html)

  - sticky：粘性定位，元素先根据文档正常流进行定位，达到top/bottom/left/right(至少有一个属性值为非auto，粘性定位才起作用，否则该定位在该方向上表现如同relative定位)设定的阈值后，相对于其最近的滚动祖先元素(overflow值为hidden/scroll/auto/overlay)或块级祖先元素进行偏移。提供一个很好的应用示例：[双粘性定位实现头部高度自动伸缩](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-position-sticky.html)

## 层叠规则
- 含义：指当前网页中的元素间发生层叠时的表现规则，示意如下，

  ![](/css/stacking-order.png)

- 层叠准则：谁大谁上，后来居上

- 层叠上下文特性

  1、层叠上下文的层叠水平要比普通元素高

  2、层叠上下文可以阻断元素的混合模式

  3、层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文

  4、每个层叠上下文和兄弟元素独立，也就是说，当进行层叠变化或渲染时，只需要考虑后代元素

  5、每个层叠上下文是自成体系的，当元素发生层叠时，整个元素被认为是在父层叠上下文的层叠顺序中

- **创建层叠上下文元素的方式（实用）**
  
  下面情形可以变成层叠上下文元素，若无z-index，默认相当于z-index:auto级别，否则看z-index

  1、position非static，其中值为relative/absolute时，需再满足z-index非auto
  
  2、flex/inline-flex布局的子元素，且z-index值非auto
  
  3、**opacity非1**
  
  4、**transform非none**
  
  5、filter非none
  
  6、-webkit-overflow-scrolling值为touch
  
  7、isolation值为isolate
  
  8、mix-blend-mode非normal
  
  9、will-change值为opacity、transform、filter、mix-blend-mode、isolation

  10、根元素

-  [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-zIndex.html)

### 改变层级z-index
- 作用范围：position非static的元素，或flex/inline-flex布局的子元素

- 特点：
  
  当z-index值不同时，值大的元素层级较高（谁大谁上）；
  
  当z-index值相同时，后面元素的层级高于前面元素的层级（后来居上）；
  
  若父元素设置了z-index，则以父元素的z-index值为准，值大的父元素层级较高（层叠上下文可嵌套）

- z-index取负值应用：通过伪元素附加在元素上面，但又不遮挡元素内容

  ```html
  <style>
  .box {
    width: 100%;
    height: 100px;
    background-color: red;
    /* 关键点1：创建层叠上下文 */
    position: relative;
    z-index: 0;
  }
  .box::before,
  .box::after { 
    content: '';
    position: absolute;
    width: 100px;
    height: 100%;
    /* 关键点2：设置z-index为负值 */
    z-index: -1;
  }
  .box::before {
    left: 0;
    background-color: yellow;
  }
  .box::after {
    right: 0;
    background-color: green;
  }
  </style>
  <div class="box"></div>
  ```

- 准则（经验取自张老师）：对于非浮层元素，能不设置z-index则不设置，即使设置了，z-index值也不要超过2
