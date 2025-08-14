---
title: CSS规则集
tags: 
- CSS
---

本文的CSS规则集介绍大多参考自[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_syntax/At-rule)

## @chartset
- 含义：指定层叠样式表字符编码。在值非ASCII码的CSS属性如`content`时有用

- 定义样式表的字符编码，浏览器按以下顺序查询：

  - 位于文件开头的"端序标记"字符值

  - HTTP响应头Content-Type的charset属性值，或用于服务样式表的协议中的等效值

  - @charset的CSS声明，如`@charset "UTF-8";`，必须放在css文件首行。注意声明开头不能有空格、值前只留一个空格、值要加双引号

  - 文档默认编码是UTF-8

## @media
- 含义：根据一个或多个媒体查询的结果应用部分样式，可用于@import规则、link、style、source等标签。另外也提供了相应的JS API，如获取样式表信息`document.styleSheets`；检查是否有匹配媒体`window.matchMedia()`，返回值可以获取媒体当前是否与指定值匹配`matches`，并提供`change`事件监听变化，具体查看[示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-media-query/index.html)

- 用法
  - 格式：@media [media-type] (media-feature)+ {}

  - 参数说明：
    
    media-type：表示媒体类型，可选，默认为all，另可取值为screen和print。若类型和特征都存在加关键字and连接
    
    media-feature：表示媒体特征，描述用户代理、输出设备或环境。支持使用and、or、not、only、,逗号等逻辑操作符

      - width；视口宽度
      - height：视口高度
      - aspect-ratio：视口宽高比
      - orientation：视口方向

      - display-mode：应用程序的显示模式。可取值为browser、fullscreen、minimal-ui、picture-in-picture(目前仅Chrome和Edge支持)、standalone、window-controls-overlay

      - any-hover：是否有可用的悬停在元素上的输入机制。可取值为none、hover
      - hover：用户输入是否悬停在元素上。可取值为none、hover
      
      - scripting：脚本是否可用。可取值为none、initial-only、enabled

      - prefers-color-scheme：颜色主题偏好。可取值为light、dark
      - prefers-contrast：检测用户是否请求以较低或较高的对比度呈现网页内容。可取值为no-preference、more、less或custom
      - prefers-reduced-motion：检测用户是否在其设备上启用了一项设置，以尽量减少不必要的动作。可取值为no-preference、reduce
      
      - any-pointer：用户是否有任何点击设备(如鼠标)，若有，准确度如何。可取值为none、coarse、fine
      - pointer：用户是否有点击设备(如鼠标)，如果有，主要点击设备的准确度如何。可取值为none、coarse、fine

      - color：输出设备每个颜色分量(红、绿、蓝)的位数
      - color-gamut：用户代理和输出设备支持的大致颜色范围。可取值为srgb、p3、rec2020
      - color-index：输出设备颜色查找表中的条目数
      
      - grid：输出设备是否使用基于网格的屏幕，可取值为0、1
      
      - monochrome：输出设备的单色帧缓冲区中每像素的位数
      
      - overflow-block：输出设备如何处理沿块轴溢出初始包含块的内容。可取值为none、scroll、optional-paged、paged
      - overflow-inline：输出设备如何处理沿行内轴溢出初始包含块的内容。可取值为none、scroll
      
      - resolution：输出设备的像素密度

      - scan：输出设备的扫描过程。可取值为interlace、progressive
      
      - update：输出设备能够以什么速度（如果有的话）修改内容渲染后的外观。可取值为none、slow、fast

      - dynamic-range：用户代理和输出设备支持的亮度、对比度和颜色深度的组合。可取值为standard、high
      
      - forced-colors：检测用户代理是否限制调色板。可取值为none、active

- 示例
  ```css
  /* 相当于 @media screen and (min-width: 800px) and (max-width: 1200px) */
  @media screen and (800px <= width <= 1200px) {
    /* PC响应式页面：在宽度800-1200px范围内实现整体自适应即可，剩余则留白，不足则滚动 */
  }

  /* 使用伪元素实现打印时显示链接 */
  @media print {
    a[href]::after {
      content: " (" attr(href) ") ";
    }
  }

  /* 根据系统偏好设置主题 */
  @media (prefers-color-scheme: light) {
    :root {
      --color: black;
      --bgColor: white;
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color: white;
      --bgColor: black;
    }

    /* 图片、纯色背景，调整透明度 */
    img {
      opacity: 0.8;
    }

    /* 背景图、非纯色背景，调整背景色 */
    .image-overlay {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(50, 50, 50, 0.5);
      }
    }
  }
  ```

  提供[网站主题自动跟随系统、用户代理主题](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-theme.html)的基础应用示例，可供参考

## @container
- 含义：将样式应用于包含上下文的条件组规则，具体来说是样式规则按条件进行过滤，如果条件成立，则元素变为容器元素，样式应用于其子元素

- 用法

  - 格式：@container [container-name] container-query { rulesets }

  - 参数说明

    container-name：可选的区分大小写的容器名称。匿名容器会被所有满足条件的查询容器应用

    container-query：容器查询，单个条件的查询可以使用关键字and、or、not增加条件逻辑；使用多个条件查询则用逗号分隔。当尺寸、样式style()、滚动状态scroll-state()变化时执行查询

    - 尺寸查询(使用<、<=、>、>=、=等比较操作符设定条件)：
        
      width
      
      height
      
      aspect-ratio
      
      orientation：可取值landscape或portrait
      
      block-size
      
      inline-size
      
    - 滚动状态查询(scroll-state())： 

      scrollable：可取值none(容器不可滚动)、top(容器朝顶部是能滚动的)、bottom、left、right、x(容器在x轴是能滚动的)、y、block-start、block-end、inline-start、inline-end、inline、block

      snapped：可取值none(容器不是滚动捕捉目标)、x(容器是水平滚动捕捉目标)、y、block、inline、both(容器是水平和垂直的滚动捕捉目标)

      stuck：可取值none(容器没有粘在边缘)、top(容器粘在顶部边缘)、right、bottom、left、block-start、block-end、inline-start、inline-end
      
    - 样式查询(style())：支持一个CSS属性、一个有效的声明、或一个自定义属性
  
  - 注意

    使用not关键字时，不能有其他关键字

    支持嵌套的容器查询

    Safari、IOS不支持滚动状态查询，相应地，也不支持`contain-type:scroll-state`

- container应用容器查询
  
  container属性是使元素变为查询容器，由container-name和container-type组成，分别表示容器名称和容器类型，值格式为name / type
  
  - 子属性说明

    container-name：指定容器名称列表。默认值为none，指定多个名称则空格分隔

    container-type：使元素变为查询容器。默认值为normal(非查询容器)，可取值size/inline-size/scroll-state，也可以是size/inline-size与scroll-state的组合。值说明如下：

      - size：成为根据在块轴和内联轴两个方向上尺寸查询条件的容器，应用布局、样式、尺寸包含(关闭元素从其内容中获取尺寸信息的能力)到容器

      - inline-size：成为根据在内联轴方向上尺寸查询条件的容器，应用布局、样式、内联尺寸包含到容器

      - scroll-state：成为根据滚动状态查询条件的容器，不会应用包含，元素尺寸也不会独立计算。滚动状态查询包括容器内容是否部分滚动、容器是否是滚动容器将捕捉的目标、容器是否粘性定位且粘在滚动容器边界上

  - 注意
    
    当指定了容器名称和容器类型时，自动添加声明`contain: style layout;`

    容器元素不参与容器查询

- [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-container-query.html)

## @layer
- 含义：可以声明一个级联层，或定义多个级联层下的优先顺序。可以解决样式优先级问题

- 用法

  - 声明一个级联层：@layer [layer-name] { rulesets }

  - 定义多个级联层顺序，级联层间用逗号分隔，可以调整级联层默认优先级，按顺序优先级由低到高：@layer (layer-name, )+;

- 层默认优先级示意图
  
  ![级联层](/css/layer-cascade.svg)

  - 重要声明优先级总是比普通声明高：过渡声明 > 重要声明 > 动画声明 > 普通声明

  - 重要声明间的优先级与普通声明间的优先级是相反的：普通声明下，作者/开发者(非级联层 > 级联层，级联层间按书写顺序由低到高) > 用户 > 用户代理(指浏览器偏好、系统偏好、浏览器插件)，而重要声明与之相反

- 注意

  - 匿名级联层的优先级看声明的顺序

  - 级联层允许嵌套

- 示例
  ```html
  <style>
    @layer global, module;
    @layer global {
      html,
      body {
        padding: 0;
        border: 0;
        margin: 0;
      }
      div {
        color: red;
        text-shadow: 2px 2px 4px currentColor ;
        font-size: 18px;
      }
    }
    @layer module {
      div {
        color: #27c27c;
      }
    }
  </style>
  <div>1234567890</div>
  ```

## @scope
- 匹配指定DOM子树下的元素，无需编写难以覆盖的过于具体的选择器，也不会将选择器与DOM结构耦合得太紧

- 用法

  - 格式：@scope [(scope-start)] [to (scope-end)] { rulesets }
  
  - 使用方式
    
    作为独立块：
    ```css
    @scope (scope-start) [to (scope-end)] { 
      /* 提供:scope伪类，方便给范围的根元素设定样式 */
      :scope {
        /* 优先级高于下面方式的声明 */
      }
      /* rulesets */
    }
    ```

    以嵌入样式插入：
    ```html
    <scope-element>
      <style>
        @scope [scope-start] [to (scope-end)] {
          /* 直接写在这里的声明会作用于范围的根元素 */
          /* rulesets */
        }
      </style>
    </scope-element>
    ```

  - 注意：
    
    作用范围包括scope-start，不包括scope-end

    支持scope-start、scope-end指定多值，此时逗号分隔
    
    应用具有继承特性的CSS属性会被范围外的子元素继承

    使用:scope伪类、&(以包装在:is()伪类函数中的选择器被计算)都会改变范围内的选择器优先级，如`:scope xxx`或`& xxx`

    :scope与&的区别：:scope表示作用域根元素，而&表示匹配作用域根元素的选择器，因此&可以连续多次使用，而:scope不可以

    通过范围接近性解决样式覆盖问题：会应用从DOM树层次结构到范围根的跳数最小的样式
  
- [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-scope.html)

## @supports
- 含义：当浏览器支持CSS功能时指定CSS声明。只能放在代码顶层

- 用法

  - 格式：@supports (supports-condition) { rulesets }

  - 说明：
    
    支持使用关键字and、or、not结合多个条件

    supports-condition：可以是一个声明`property:value`，或一个函数`function()`，函数包括如下：

      selector()：参数为选择器语法

      font-tech()：分3种字体技术，即颜色字体技术、字体特征技术和其他有效字技术。对应传参有color-colrv0、color-colrv1、color-svg、color-sbix、color-cbdt；features-opentype、features-aat、features-graphite；incremental-patch	、incremental-range、incremental-auto、variations、palettes

      font-format()：可传参为collection、embedded-opentype、opentype、svg、truetype、woff、woff2

- [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-supports.html)

## @font-palette-values
- 含义：自定义由字体制作者创建的字体调色板的默认值

- 用法：
  ```css
  /* 识别符名称必须以--开头 */
  @font-palette-values --identifier {
    /* 指定应用此调色板的字体系列名称 */
    font-family: [字体名称, ]+;
    /* 指定字体制作器创建的基础调色板名称或索引，未指定默认为0 */
    base-palette: [light ｜ dark | 非负整数];
    /* 指定要覆盖的基础调色板颜色，若字体无对应的颜色索引则会忽略 */
    override-colors: [颜色非负索引 颜色, ]+;
  }
  .element {
    font-palette: --identifier;
  }
  ```

- 示例
  ```css
  /* 自定义COLRv1字体调色板默认值 */
  /* 1、加载字体 */
  /* COLRv1字体是一种新颜色字体，与Bitmap、SVG等其他颜色字体不同，其占用空间更小、矢量可缩放、可重新定位、渐变功能和混合模式驱动，接受参数来自定义每个用例的字体或匹配主题 */
  @import url(https://fonts.googleapis.com/css2?family=Bungee+Spice);
  /* 链接结果内容如下： */
  /* vietnamese */
  /* @font-face {
    font-family: 'Bungee Spice';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/bungeespice/v15/nwpTtK2nIhxE0q-IwgSpZBqyxyg_SsDV7E98oK4.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
  } */
  /* latin-ext */
  /* @font-face {
    font-family: 'Bungee Spice';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/bungeespice/v15/nwpTtK2nIhxE0q-IwgSpZBqyxig_SsDV7E98oK4.woff2) format('woff2');
    unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  } */
  /* latin */
  /* @font-face {
    font-family: 'Bungee Spice';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/bungeespice/v15/nwpTtK2nIhxE0q-IwgSpZBqyyCg_SsDV7Cd_.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  } */
  /* body {
    --google-font-color-bungeespice:colrv1;
  } */

  /* 2、对COLRv1字体自定义其调色板默认值 */
  @font-palette-values --colorized {
    font-family: "Bungee Spice";
    base-palette: 0;
    override-colors: 0 hotpink, 1 cyan, 2 white;
  }

  /* 3、使用COLRv1字体自定义调色板 */
  body {
    font-palette: --colorized;
  }
  ```
