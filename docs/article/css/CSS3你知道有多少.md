---
title: CSS3你知道有多少
tags: 
- CSS
---

本篇会介绍CSS3入门内容，包括新布局如flex、grid、column，2D&3D转换，过渡与动画，自定义字体以及边框与阴影5个方面。

## 新布局
### flex布局
- 弹性盒FlexBox

  ```css
  /* 应用如下声明的元素变成flex容器，子元素变成flex项目，flex项目受flex布局控制 */
  display: flex;
  ```

下面是对flex布局相关的属性进行介绍。

- flex-flow
  
  弹性盒中项目的排列方式。是flex-direction、flex-wrap的简写属性，分别表示容器主轴方向、是否换行。默认值是row nowrap
  
  - flex-direction取值如下：
    
    row：水平顺序(从左到右)方向
      
    row-reverse：水平逆序(从右到左)方向
      
    column：垂直顺序(从上到下)方向
      
    column-reverse：垂直逆序(从下到上)方向

  - flex-wrap取值如下：
    
    nowrap：不换行
    
    wrap：允许换行
    
    wrap-reverse：换行并倒序展示，即第一行放最后一行，第二行放倒数第二行，以此类推

- justify-content
  
  所有项目沿着容器主轴上的空间分配方式，默认值是normal，取值如下，
  
  flex-start：起始处对齐
  
  flex-end：结束处对齐。此时若有overflow属性，滚动不生效，此时给第一个子项目添加属性margin-top: auto;

  center：居中对齐
  
  space-between：两端对齐

  space-around：项目间隔相等，不包括两边间隙

  space-evenly：项目间隔相等，包括两边间隙

  stretch: 所有项目在主轴方向上的尺寸小于容器尺寸时，所有自动调整大小的项目等量拉伸

- align-content
  
  所有项目沿着容器交叉轴上的空间分配方式，基本同justify-content，并多出如下值，

  baseline：基线对齐

  > 注：place-content是align-content和justify-content的简写

- align-items
  
  所有项目相对于容器交叉轴上的对齐方式，默认值是normal（在flex布局下表现如同stretch），取值如下:
  
  flex-start：相对于容器交叉轴的起始处对齐
  
  flex-end：相对于容器交叉轴的结束处对齐
  
  center：居中对齐
  
  baseline：基线对齐
  
  stretch：所有项目在交叉轴方向上的尺寸小于容器尺寸时，所有自动调整大小的项目等量拉伸

  self-start：在容器交叉轴方向上，相对于自身的起始处对齐

  self-end：在容器交叉轴方向上，相对于自身的结束处对齐

- gap

  项目间隔。传一个值表示相同的行列间隔，传两个值分别表示行间隔、列间隔。值可为长度或百分比，其中百分比是相对于元素宽高。

- align-self
  
  单个项目相对于容器交叉轴上的对齐方式，会覆盖align-items属性。默认值为auto，表示继承父元素align-items值。取值同align-items

- flex
  
  单个项目的空间分配，是flex-grow、flex-shrink、flex-basis的简写属性，分别表示项目在弹性盒剩余空间的占比份数、在弹性盒不足空间的占比份数、项目初始值(可以是长度或百分比)。
  
  默认值是initial(0 1 auto)，也可取值为none(0 0 auto)、auto(1 1 auto)

  注：flex-basis取值auto时，若项目是非均等分，且项目不能得到想要的大小，则此时取值为0

- order
  
  项目顺序。默认值为0，值越小，排列越靠前，支持负数。


### grid布局
- 相较于flex布局的特点

  优势：可控制行列数目、大小；可跨行、列；可层叠(注意设置优先级)；区域形状不局限方框；多级grid布局下可以沿用父级；

  劣势：网格轨道大小控制；设置背景和边框需通过伪元素；

- 关键代码释义
  ```css
  .grid-container {
    /* 1、使用grid布局 */
    display: grid;

    /* 2、设置行、列数目和大小 */
    /* 单位fr，fraction的英文简写，释义为分数。浏览器按各fr值占总份额的比例，分割开放空间，将对应区域分配给对应列 */
    /* 可以与其他单位混用。计算优先级：除auto之外，先计算所有固定值(包括百分比)，剩下空间再计算fr */
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /* 高级用法： */
    /* 2.1、支持minmax函数，范围限制 */
    /* grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr); */
    /* 2.2、支持repeat函数，表示重复，上面写法可简写如下 */
    /* grid-template-columns: repeat(4, minmax(0, 1fr)); */
    /* 2.3、支持auto-fill和auto-fit，实现根据内容自动分配列数 */
    /* grid-template-columns: repeat(auto-fill, minmax(0, 1fr)); */
    /* grid-template-columns: repeat(auto-fit, 200px); */
    /* 2.4、支持subgrid、masonry关键字 */
    /* masonry实现水平流或瀑布流效果，目前仅Safari支持 */
    /* subgrid可以使所占据部分仍沿用父元素网格划分 */
    
    /* grid-template-rows用法同grid-template-columns */
    grid-template-rows: repeat(4, minmax(0, 1fr));
    
    /* [可选]3、设置自动放置算法，如何流入网格 */
    /* 可取单值row、column、dense，也可双值row dense、column dense */
    /* row、column顾名思义，按行或列的顺序填补，dense表示若较小项目较晚出现，则尝试填补网格中较早出现的空洞，这可能导致项目乱序，但较大项目可以填补剩余空洞 */
    grid-auto-flow: row;

    /* [可选]4、设置隐式网格的行高、列宽 */
    /* 支持关键字min-content和max-content，分别表示按最短内容宽度展示和按最长内容宽度展示 */
    grid-auto-rows: 100px;
    grid-auto-columns: 100px;

    /* [可选]5、设置容器网格间距 * /
    /* grid-gap是row-gap、column-gap的简写 */
    /* 行距。不再用grid-row-gap，推荐row-gap */
    row-gap: 20px;
    /* 列距。不再用grid-column-gap，推荐column-gap */
    column-gap: 20px;

    /* 第二种写法：grid-template既可以当作grid-template-rows / grid-template-columns的简写；也可以当作grid-template-areas grid-template-rows / grid-template-columns的简写，比直接使用grid-template-areas声明更好维护。当grid容器声明了grid-template-areas，则grid项目通过grid-area指定区域模板名称，无需再设定行、列的起始和结束位置 */

    /* 第三种写法：grid是grid-template-rows、grid-template-columns、grid-template-areas、grid-auto-rows、grid-auto-columns、grid-auto-flow、column-gap、row-gap的简写 */
  }
  .grid-item {
    /* 6、设置行、列的起始、结束位置 */
    /* 值格式：grid-row-start / grid-row-end */
    /* 值为 2 / 4，表示从第2行开始，到第4行结束，不包括第4行。效果占第二、三行 */
    /* 值为 span 2 / 4，表示占两行，到第4行结束，不包括第4行。效果占第二、三行 */
    /* 值为 2 / -1，表示该列从第二行开始，独占到最后一行 */
    /* 值为 1，实际即1 / 1，表示占用第一行第一列位置 */
    grid-row: auto / span 2;

    /* grid-column用法同grid-row */
    grid-column: 6 / 9;

    /* 小结：
      当grid-row或grid-column中的值为负数时，表示倒序第几个，而正数表示顺序第几个；  
      grid-row-start/gird-column-start的值是包含的；
      grid-row-end/grid-column-end的值是不包含的；
    */

    /* grid-area属性是grid-row-start, grid-column-start, grid-row-end, grid-column-end的简写，使用/隔开，grid-area允许各内容重叠 */

    /* [可选]7、设置项目的叠放层级 */
    /* order属性，表示叠放顺序，类似于z-index。数值越大，越在上。允许负数。 */
    order: 1;
  }
  ```

  > 推荐一个趣味学习grid布局的网站：[css-grid-garden](https://cssgridgarden.com/)

- [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-grid-layout.html)

### 多列布局
- 对display值为block、inline-block、list-item、table-cell的元素能起到正常的布局效果

- 特点：可控性弱，使用场景不多，常用于文字排版

下面对相关属性进行介绍。

- columns
  
  设置列数和列宽。是column-count、column-width的简写，可不指定列宽，此时默认为auto

- column-rule
  
  设置列间规则，包括样式、颜色、大小。是column-rule-style、column-rule-color、column-rule-width（不是列间宽度，而是样式展示的宽度）的简写。其中，

  column-rule-style可取值为none、hidden、dotted、dashed、solid、double、groove、ridge、inset、outset，后四个值依赖列的宽度和颜色值

  column-rule-width可取值为thin、medium、thick、具体长度值

- column-gap
  
  设置列间距

- column-span
  
  设置子元素可跨域列数。默认值为none，若设置为all，则跨域所有列

- column-fill
  
  设置列填充方式，默认值为balance，所有列的高度相同。若值为auto，则根据内容进行填充

- [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-multi-column-layout.html)

<style>
  .compare {
    display:grid;
    border-top:1px solid black;
    border-left:1px solid black;
  }
  .compare > div {
    padding: 5px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
  .compare > div:nth-child(2n+1) {
    grid-column: 1/2;
  }
  .compare > div:nth-child(2n) {
    grid-column: 2/3;
  }
</style>

## 2D&3D转换
### 认识坐标系与角度
- x轴：眼睛看到的水平方向，由左到右
- y轴：眼睛看到的垂直方向，由上到下
- z轴：眼睛看到的前后方向，由近及远
- 角度：正北方向(0deg)起始，顺时针方向为正，逆时针方向为负

### 转换与透视
- transform 2D转换
<style>
  .matrix-2d-bg {
    width:120px;
    height:100px;
    background: white;
  }
</style>
<div class='compare'>
  <div>值</div>
  <div>描述</div>
  <div>none</div>
  <div>默认值</div>
  <div>translate(x,y)</div>
  <div>沿X轴和Y轴移动，值为百分比时是相对于元素自身宽高</div>
  <div>translateX(x)</div>
  <div>沿X轴移动</div>
  <div>translateY(y)</div>
  <div>沿Y轴移动</div>
  <div>scale(x,y)</div>
  <div>沿X轴和Y轴缩放</div>
  <div>scaleX(x)</div>
  <div>沿X轴缩放</div>
  <div>scaleY(y)</div>
  <div>沿Y轴缩放</div>
  <div>rotate(angle)</div>
  <div>沿Z轴旋转一定角度，效果同rotateZ。单位可为deg/turn/rad</div>
  <div>rotateX(angle)</div>
  <div>沿X轴旋转一定角度</div>
  <div>rotateY(angle)</div>
  <div>沿Y轴旋转一定角度</div>
  <div>skew(x-angle,y-angle)</div>
  <div>沿X轴和Y轴倾斜</div>
  <div>skewX(x-angle)</div>
  <div>沿X轴倾斜</div>
  <div>skewY(y-angle)</div>
  <div>沿Y轴倾斜</div>
  <div>matrix(vsc,hsk,vsk,hsc,vt,ht)</div>
  <div style="display: flex; flex-direction: column;">
    <div>将所有2D转换方法组合在一起，允许旋转、缩放、移动和倾斜元素，需传6个参数。矩阵公式如下，</div>
    <img class="matrix-2d-bg" style="width:400px;" src="/css/matrix-2d.png" />
    <div>其中，只做平移变换矩阵参数如下：</div>    
    <img class="matrix-2d-bg" src="/css/matrix-2d-translate.png" />
    <div>只做旋转变换矩阵参数如下：</div>
    <img class="matrix-2d-bg" src="/css/matrix-2d-rotate.png" />
    <div>只做缩放变换矩阵参数如下：</div>
    <img class="matrix-2d-bg" src="/css/matrix-2d-scale.png" />
    <div>只做倾斜变换矩阵参数如下：</div>
    <img class="matrix-2d-bg" src="/css/matrix-2d-skew.png" />
    <div>matrix函数中的各个值如何确定？<br/>
      - 第一步：拆，效果可分为缩放、平移、旋转、倾斜哪几种组合实现<br/>
      - 第二步：定，确定各组合的函数值<br/>
      - 第三步：转，各组合的函数值转换为矩阵表示<br/>
      - 第四步：乘，各组合矩阵相乘，得到matrix函数值
    </div>
  </div>
</div>

  > transform新写法，支持直接声明translate、scale、rotate
    ```css
    selector {
      scale: 2;
      rotate: 30deg;
      translate: -50% -50%;
    }
    ```
  
  > 注意transform对绝对(固定)定位元素和层叠上下文的影响，[点这](/article/css/CSS快速入门篇中.html#破坏流-position布局)

- transform 3D转换
<style>
  .matrix-3d-bg {
    width:150px;
    height:100px;
    background: white;
  }
</style>
<div class='compare'>
  <div>值</div>
  <div>描述</div>
  <div>translateZ(z)</div>
  <div>沿Z轴(眼睛看到的前后方向，由远及近)移动</div>
  <div>translate3d(x,y,z)</div>
  <div>沿X轴、Y轴、Z轴移动</div>
  <div>scaleZ(z)</div>
  <div>沿Z轴缩放</div>
  <div>scale3d(x,y,z)</div>
  <div>沿X轴、Y轴、Z轴缩放</div>
  <div>rotateZ(angle)</div>
  <div>沿Z轴旋转一定角度</div>
  <div>rotate3d(x,y,z,angle)</div>
  <div>沿自定义轴旋转一定角度，值分别表示自定义轴在x、y、z三个方向坐标以及最终要旋转的角度</div>
  <div>perspective(pixel)</div>
  <div>可以理解显示屏是一个透视点，用于设置透视点与3D透视视图的距离。当translateZ等于透视距离时，只能看到被应用该属性的元素，此时是一叶蔽目的效果；当大于透视距离时，则看不到被应用的元素，当小于透视距离时，可以看到被应用的元素</div>
  <div>matrix3d()</div>
  <div style="display: flex; flex-direction: column;">
    <div>把所有3D转换方法组合在一起，允许旋转、缩放、移动和倾斜元素，需传12个参数</div>
    <div>同时做缩放和平移矩阵参数如下，其中s表示缩放，t表示平移</div>
    <img class="matrix-3d-bg" src="/css/matrix-3d.png" />
    <div>绕X轴旋转矩阵参数如下，</div>
    <img class="matrix-3d-bg" src="/css/matrix-3d-rotate-x.png" />
    <div>绕Y轴旋转矩阵参数如下，</div>
    <img class="matrix-3d-bg" src="/css/matrix-3d-rotate-y.png" />
    <div>绕Z轴旋转矩阵参数如下，</div>
    <img class="matrix-3d-bg" src="/css/matrix-3d-rotate-z.png" />
  </div>
</div>

- transform-origin
  
  元素转换时参考的坐标位置，须与属性transform一同使用。可传入三个值，分别表示x、y、z轴位置，默认值为50% 50% 0，即元素中心。x轴可取值left(0%)、right(100%)、center(50%)、length、百分比，y轴可取值top(0%)、bottom(100%)、center(50%)、length、百分比，z轴只能取值length。取百分比时是相对于元素自身宽高

- backface-visibility
  
  3D转换元素是否透视可见。默认值为visible，另一个值是hidden

- transform-style
  
  应用元素下的子元素的显示效果。默认值为flat，表示二维效果显示，另一个值是preserve-3d，表示三维效果显示。一般用在需做3D转换元素的父元素上

- perspective
  
  设置透视距离。一般应用在需做3D转换元素的祖先元素上
  
- perspective-origin
  
  观察3D元素的视线方向，分水平、垂直方向，默认值为50% 50%。均可取值left(0%)、center(50%)、right(100%)、百分比、length

### 示例
- [2D-transform那些事](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-2d-transform.html)
- [3D轮播图](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/3d-transform/demo-3d-banner.html)
- [3D魔方](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/3d-transform/demo-rubik-cube.html)

## 过渡与动画
### 过渡
- 含义：实现元素从一种样式逐渐变为另一种样式的效果。transition是transition-property、transition-duration、transition-timing-function、transition-delay的简写，分别表示应用过渡的CSS属性名称[须指定，应用所有属性则使用关键字all]、效果时长[须指定，默认为0]、过渡效果的时间曲线[默认为ease]、过渡效果开始之前需等待的时间[默认为0，单位为s或ms]。若对多个属性同时应用过渡效果，用逗号隔开

- 性能：在未开启GPU下，transition值分别为非transform和transform时差异很大
    
  原因是主线程和合成线程的调度不合理

  使用height，width，margin，padding作为transition值时，会造成浏览器主线程的工作量较重。例如从`margin-left：-20px`渲染到`margin-left:0`，主线程需要计算样式`margin-left:-19px`，`margin-left:-18px`，一直到`margin-left:0`，而且每一次主线程计算样式后，合成进程都需要绘制到GPU，然后再渲染到屏幕上，前后总共进行20次主线程渲染，20次合成线程渲染，总计40次计算
  
  而如果使用transform的话，例如`transform:translate(-20px,0)`到`transform:translate(0,0)`，主线程只需要进行一次`transform:translate(-20px,0)`到`transform:translate(0,0)`，然后合成线程再以1px的变化将-20px转换到0px，总计只需21次计算

- [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-transition.html)

### 动画
- 与过渡的差异

  触发点：应用过渡的属性值变化时触发，而动画是元素到达动画延迟时间即执行

  效果执行次数：过渡有且只执行一次，而动画可控制效果次数，甚至控制每次效果的方向

  起始、终止状态是否可控：过渡不可控，而动画可控(默认下动画结束后会恢复回起始状态)

- 动画的介绍[点这](/article/css/#css3动画的使用)

## 自定义字体
### 用法
- 1、准备woff2、woff(Web Open Font Format)、ttf(TureType)、otf(OpenType)字体文件

- 2、定义字体
  ```css
  @font-face {
    /* 必需  */
    font-family: 'CustomFont';
    /* 必需 */
    /* 使用系统安装字体，则用local功能符；使用外链字体，则用url功能符，可以是绝对路径，也可以是相对路径 */
    /* format功能符用于让浏览器提前知道字体格式，以决定是否加载该字体，去掉的话则加载后再判断 */
    src: url('font.otf') format('opentype'),
      url('font.woff2') format('woff2'),
      url('font.woff') format('woff'),
      url('font.ttf');
    /* 可选 */
    /* 表示在对应的字重、字体样式下应用字体，而不是改变字重、字体样式 */
    font-weight: normal;
    font-style: normal;
    /* 表示字体支持的UNICODE字符范围，默认值是U+0-10FFFF，连续字符用-指定范围，不连续字符用逗号一一隔开 */
    unicode-range: U+0-10FFFF;
  }
  ```

- 3、使用自定义字体
  ```css
  .element {
    /* 指定自定义字体名称 */
    font-family: CustomFont;
  }
  ```

### font-display
- FOUT(Flash Of Unstyled Text，未编排文本闪烁)现象
  
  加载@font-face规则引入的非系统字体时，浏览器可能没有及时得到，会让它用后备系统字体渲染，再优化我们的字体。这时易引起未编排的文本引起闪烁，整个排版布局看上去会偏移一下。
  
  除了下面即将提及的font-display可解决外，另一种解决方案是通过link标签预加载字体资源

- 含义
  
  定义浏览器如何加载和显示字体文件，允许文本在字体加载时或加载失败显示回退字体。通过依靠折中无样式文本闪现使文本可见，替代白屏，提高性能。只能在@font-face规则中定义。

- 取值

  auto：使用浏览器默认行为

  block：浏览器首先使用隐形文字（显示上是空白）替代页面上文字，并等待字体加载（3s后进入swap）完成再显示

  swap：如果设定的字体还未可用，浏览器首先使用备用字体（显示上是font-family字体）显示，当设定的字体加载完成后替换备用字体。以下是用JS方式实现该效果，
  ```javascript
  const CustomFont = new FontFace('CustomFont', 'url(./CustomFont.ttf)');
  document.fonts.add(CustomFont);
  CustomFont.load().then(() => {
    document.body.style.fontFamily = 'CustomFont';
  })
  ```

  fallback：与swap行为上大致相同，但浏览器会给设定的字体设定加载时间限制（3s），一旦加载所需的时长大于这个限制，设定的字体将不会替换备用字体进行显示

  optional：如果设定的字体没有在限制时间内加载完成，当前页面将会一直使用备用字体，并且设定字体继续在后台进行加载，以便下一次浏览时可以直接使用设定的字体

  ![font-display各值展示效果](/css/font-display各值展示效果.jpg)

### 字体图标
一来字体图标文件大，二来最终图形x-height和原始字符x-height不同，影响内联元素垂直对齐，容易出现页面高度闪动，三来最终图形ch宽度和原始字符不同，容易出现内联元素水平方向晃动。简而言之，加载体验不好。推荐使用原生svg代替字体图标

### 示例
提供了[自定义字体和字体图标](https://github.com/muzhidong/blog-demo/tree/main/docs/02css/demo-font-face)两种用途

## 边框与阴影
### border-image
- 含义：是border-image-source、border-image-slice、border-image-width、border-image-outset、border-image-repeat的简写，分别表示边框图片地址、边框图片裁剪范围、边框大小、边框向外偏移量、边框在边缘区域的图片样式

- 各子属性说明

  - border-image-source
    
    默认值为none，其取值同background-image，支持url函数和渐变函数

  - border-image-slice
    
    由4条切片线将图片划分出9个区域，分别为4个角落区域、4个边缘区域和1个中间区域，外围的8个区域将根据border-image-width大小和border-image-repeat样式进行展示。该属性表示这4条切线与各自边的给定距离，比如top、left确定了左上角区域，top、right确定了右上角区域，top、left、bottom确定了左边缘区域，top、left、bottom、right确定了中间区域等等，当top与bottom，或left与right出现交集，该区域是不会展示任何内容的
    
    默认值为100%，可取值百分比或数字，不支持负数，超过各自边的最大值则取100%。值为数字时，表示光栅图像像素单位的边缘偏移，或矢量图像坐标单位的边缘偏移，对于矢量图像，此时是相对于元素大小，而不是源图像大小，该情况下最好使用百分比。值为百分比时，相对于源图像宽高。
    
    值可以是1个值表示应用4条边，2个值表示应用上下边、左右边，3个值表示应用上边、左右边、下边，4个值表示应用上边、右边、下边、左边。默认下，元素的内容区域是不会展示边框的中间区域的，若希望以边框的中间区域作背景填充，则后加关键字fill

  - borer-image-width

    默认值为1，可取值auto、百分比、长度或数字，不支持负数。百分比相对于元素的宽高，数字相对于border-width的倍数

    值可以是1个值表示应用4条边，2个值表示应用上下边、左右边，3个值表示应用上边、左右边、下边，4个值表示应用上边、右边、下边、左边
  
  - border-image-outset

    默认值为0，可取值长度或数字，不支持负数。数字相对于border-width的倍数

    值可以是1个值表示应用4条边，2个值表示应用上下边、左右边，3个值表示应用上边、左右边、下边，4个值表示应用上边、右边、下边、左边

  - border-image-repeat

    默认值为拉伸stretch，另可取值为裁剪适应的重复repeat、拉伸适应的重复round、额外空间分配适应的重复space

    值可以是1个值表示应用4条边，2个值表示应用上下边、左右边

- 示例
  
  [使用border-image绘制0.5px边框](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/%E7%BB%98%E5%88%B60.5px%E7%BB%86%E7%BA%BF%26%E8%BE%B9%E6%A1%86.html)，该示例总结了绘制0.5px细线和0.5px边框的几种实现，值得品味

- [在线生成器工具](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders/Border-image_generator)

### border-radius
- 含义：是border-top-left-radius、border-top-right-radius、border-bottom-right-radius、border-bottom-left-radius的简写，分别表示左上、右上、右下、左下的圆角边框

- 用法
  
  默认值为0，也可取值百分比或具体长度，百分比是相对于元素自身宽高。见如下示例，加深对其值的使用方式

  ```html
  <style>
    div {
      width: 200px;
      height: 200px;
      background-color: green;
    }

    .one {
      /* 注意1——值不同个数下的含义：若省略bottom-left，则与top-right相同；若省略bottom-right，则与top-left相同；若省略top-right，则与top-left相同 */
      /* 左上、右下设置为30%，左下、右上设置为70% */
      border-radius: 30% 70%;
    }
    
    .two {
      /* 注意2——值的另一种格式：/前后的值分别表示水平半径和垂直半径 */
      /* 四个方向均设置为30% / 70% */
      border-radius: 30% / 70%;
    }

    .three {
      /* 注意3——值的另一种格式下的复数写法 */
      /* 给四个角设置不同值 */
      border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
    } 
  </style>
  <div class="one"></div>
  <div class="two"></div>
  <div class="three"></div>
  ```

- [在线生成器工具](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders/Border-radius_generator)

### box-shadow
- 含义：由h-shadow、v-shadow、blur、spread、color5个值组成，分别表示水平向右阴影偏移量、垂直向下阴影偏移量、模糊距离、扩散距离、阴影颜色。h-shadow、v-shadow支持长度，允许负值，此时分别表示阴影水平向左、水平向上偏移，blur、spread、color是可选值。默认值为none，阴影向外。若改为阴影向内，则在值前加上inset关键字。设置多个阴影效果用逗号分隔，若多个阴影出现重叠，前面的阴影会覆盖后面的阴影

- 示例

  ```css
  /* 绘制三边阴影 */
  #shadow-box {
    width: 220px;
    padding: 10px;
    margin: 0 auto;
    background-color: #ddd;
    box-shadow: 0 8px 10px gray, -10px 8px 15px red, 10px 8px 15px blue;
  }
  ```

- [在线生成器工具](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders/Box-shadow_generator)

> 拓展：牛人写的一个[图片文件转box-shadow](https://github.com/Jiasm/box-shadow-image-generator/blob/master/index.html)工具

至此CSS3内容正式完结，后续会时常维护内容更新，保持时效性。
