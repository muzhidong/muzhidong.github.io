---
title: CSS查漏补缺
tags: 
- CSS
---

此篇作为对CSS的延伸，进行查漏补缺。

## object-fit
- 替换元素的内容如何调整以适应容器
- 取值
  - fill：默认值，不保持宽高比，拉伸以填充容器
  - cover：保持宽高比，覆盖容器区域
  - none：图片大小保持不变
  - contain：保持宽高比，保证图片完整展示
  - scale-down：取值none或contain，看哪个指使图片尺寸更小，即不大于图片尺寸取contain，大于则取none

## object-position
- 替换元素内容在元素盒子中的对齐方式。默认值为center，即50% 50%
- 取值
  - 关键字：left/right/center/top/bottom
  - 具体长度
  - 百分比
- 格式说明
  - 传单值，表示替换内容的中心点
  - 传双值，表示水平、垂直方向的位置
  - 传四个值即`keyword value keyword value`，其中关键字表示水平、垂直方向的位置，值表示其前面关键字的偏移量

## object-view-box
- 兼容性说明：Chrome、Edge支持，但Safari不支持
- [图片局部展示效果](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-object-view-box.html)

## aspect-ratio
- 设置元素的宽高比，即使容器或视口变化，也会重新调整尺寸，保持宽高比。注意元素的宽或高至少有一个是自动尺寸，否则该属性不生效
- 取值
  - auto：替换元素使用固有宽高比，非替换元素没有首选宽高比
  - width[/height]：指定盒子的首选宽高比，若缺失/height，则默认height为1
  - auto width[/height]：元素是替换元素时，则**加载结束前使用指定宽高比，加载结束后使用内容的固有宽高比**；元素是非替换元素，则使用给定宽高比

## outline
- 元素轮廓，是outline-width、outline-style、outline-color的简写。通过按Tab键，浏览器自动按顺序聚焦控件元素或设置tabindex的元素，按Shift+Tab键则逆序访问，此时会显示轮廓样式，提高用户可访问性。默认值为medium none auto
- 子属性取值说明
  - outline-width：可取值关键字thin、medium、thick，或长度

  - outline-style：可取值auto、none、dotted、dashed、solid、double、groove、ridge、inset、outset

  - outline-color：可取值auto、[各种颜色值](/css/CSS快速入门篇下.html#color-unit)

- 应用
  ```css
  /* 重置input轮廓 */
  input {
    outline: 0 none;
  }

  /* 模拟原生提交按钮focus高亮效果 */
  .focus + label.btn {
    outline: 1px auto -webkit-focus-ring-color;
  }

  /* 镂空效果 */
  /* https://demo.cssworld.cn/11/1-1.php */
  ```

## outline-offset
- 设置轮廓与元素边框或内边距的偏移量。默认值为0，可取值长度，支持负值，此时轮廓是向元素内部偏移。

## user-select
- 控制用户是否能选中元素文本
- 取值
  - auto：默认值。作用在伪元素上相当于none，否则继承父元素
  - none：文本不可选。常用于阻止用户复制内容
  - text：文本可选
  - all：若选择的是元素的一部分，则自动选中整个元素及其所有后代。若对其子元素进行双击或上下文点击，则将自动选择具有此值的最高祖先
- `user-select:none`与`pointer-events:none`在文本选中上的区别

  user-select只在不可编辑元素中有效，但pointer-events在所有元素上都有效，包括可编辑元素如input、textarea等等
> 兼容性说明：IOS下的WebView不支持

## cursor
设置鼠标光标，取值如下，
- 常规值

  auto：默认值，浏览器根据内容类别自动进行处理

  default：鼠标指针为小箭头

  none：使光标不可见。常见应用如全屏视频时鼠标静默3秒不可见

- 链接和状态

  pointer：鼠标指针为小手，表示可点击

  help：鼠标指针为带问号的小箭头，用于帮助链接或包含提示信息的问号小图标上

  progress：鼠标指针为带漏斗的小箭头，表示忙碌，用户仍可与接口交互

  wait：鼠标指针为漏斗，表示忙碌，用户不可与接口交互

  context-menu：鼠标指针为右下方带菜单的小箭头

- 选择

  text：表示文字在水平方向上可选中
  ```css
  /*  禁选 */
  .disable-select {
    user-select: none;
    cursor: default;
  }
  ```

  vertical-text：表示文字在垂直方向上可选中

  crosshair：鼠标指针为十字光标，常见应用如拾色器

  cell：表示单元格是可以框选的

- 拖拽

  move：表示元素可移动

  copy：表示元素可复制

  alias：表示元素可创建别名或快捷方式

  no-drop：表示当前位置不可放置

  not-allowed：表示当前位置行为禁止

- 拉伸

  col-resize：移动表格列间隙，用于调整表格间列宽

  row-resize：移动表格行间隙，用于调整表格间行高

  单向拉伸：n-resize、e-resize、s-resize、w-resize、ne-resize、se-resize、sw-resize、nw-resize

  双向拉伸：ew-resize、ns-resize、nesw-resize、nwse-resize
  ```css
  /* 朝右下角拉伸 */
  .resize {
    cursor: se-resize;
    cursor: nwse-resize;
  }
  ```

- 缩放

  zoom-in：鼠标指针为放大镜

  zoom-out：鼠标指针为缩小镜

- 抓取

  grab：鼠标指针为五指张开的手，表示抓取

  grabbing：鼠标指针为五指收起的手，表示抓取中

- 自定义光标
  ```css
  /* 自定义光标：建议大小不超过1KB，且背景是透明的 */
  .cur-custom {
    /* fallback则auto */
    cursor: url('custom-cursor.png'), auto;
  }
  ```

## scroll-behavior
- 设置**当滚动由导航或CSSOM滚动API触发时**的滚动容器行为
- 取值
  - auto：默认值，立即滚动
  - smooth：按用户代理定义的缓动函数和缓动时间进行平滑滚动

## scroll-snap-type
- 作用在滚动容器上，通过设置捕捉端口(snap-port)内捕捉点的执行方向和严格程度，进行滚动捕捉
- 取值
  - none：默认值，不捕捉
  - x：设置捕捉轴为水平轴
  - y：设置捕捉轴为垂直轴
  - block：设置捕捉轴为块轴
  - inline：设置捕捉轴为内联轴
  - both：在两个轴上独立捕捉
  
  若希望设置滚动容器未滚动时的捕捉位置，则可在上述值后加mandatory或proximity。mandatory表示未滚动时，滚动容器的视觉视口必须捕捉到捕捉位置；proximity表示未滚动时，由用户代理根据滚动参数决定是否捕捉。一般会加上mandatory关键字，完美实现滚动停止后，自动滚动到"完整显示占据视觉视口较多的子元素"的位置定位效果
- [CSS滚动捕捉](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap)

## overscroll-behavior
- 设置当到达滚动区域边界时的浏览器行为。是overscroll-behavior-x和overscroll-behavior-y的简写
- 取值
  - auto：默认值，表示默认滚动溢出行为正常发生
  - contain：在元素内部默认滚动溢出行为会被观察，**禁用原生浏览器导航，包括垂直下拉刷新手势和水平滑动导航**，且相邻的滚动区域不会发生滚动链
  - none：阻止默认滚动溢出行为，且相邻的滚动区域不会发生滚动链
  > 什么是滚动链？在可滚动页面有一个可滚动对话框的场景下，当到达对话框的滚动边界时，页面会开始滚动

## resize
- 设置元素是否可以调整大小，若可以则指定调整方向。在内联元素、设置overflow为visible或clip的块元素中属性不生效。
- 取值
  - none：默认值，用户不可调整大小
  - both：允许用户在水平和垂直方向上调整大小
  - horizontal：允许用户在垂直方向上调整大小
  - vertical：允许用户在水平方向上调整大小
  - block：允许用户在块轴方向上调整大小，依赖writing-mode和direction
  - inline：允许用户在内联轴方向上调整大小，依赖writing-mode和direction
> 兼容性说明：IOS不支持该属性

## clip-path
- 创建一个裁剪区域，使元素只在该区域下可见，代替clip属性。值非none时创建层叠上下文
- 取值

  关键字
  - none：默认值，不创建裁剪区域

  引用函数
  - url()：引用SVG中的clipPath元素，如`file.svg#clippath-element-id`

  盒子
  - margin-box
  - border-box
  - padding-box
  - content-box
  - fill-box：使用object边界框作为参考框，引用源是svg有效
  - stroke-box：使用stroke边界框作为参考框，引用源是svg有效
  - view-box：使用最近的SVG视口作为参考框，引用源是svg有效

  形状函数
  - inset()：类似rect
  - circle()：定义圆
  - ellipse()：定义椭圆
  - polygon()：定义多边形
  - path()：自定义形状，接收SVG路径值
  - rect()：定义矩形，使用距离四个边界的偏移量的指定方式
  - shape()：自定义形状，以命令的方式
  - xywh()：定义矩形，使用原点、宽、高的指定方式

  组合值
  - 盒子与形状的组合，空格分隔

- 示例：[多风格背景图切换效果](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-clip-path.html)

## filter
- 滤镜，应用模糊或颜色偏移等图形效果于元素，常用于调整图像、背景和边框
- 取值：

  关键字
  - none：默认值，不使用滤镜

  引用函数
  - url()：图片URL或引用svg滤镜元素filter，如`file.svg#filter-element-id`

  滤镜函数
  - blur(length)：高斯模糊
  - brightness(number)：调整亮度，0变暗，>1变亮
  - contrast(number)：调整对比度，0变灰，>1对比度起效
  - grayscale(number)：转为灰度图片，0不变，1完全灰度
  - hue-rotate(angle)：色调旋转，0deg不变，值定义输入样本将围绕色调色环进行调整的度数
  - invert(number)：反转图片，0不变，1完全反转
  - opacity(number)：调整透明度，0完全透明，1不变
  - saturate(number)：调整饱和度，0完全不饱和，1不变，>1增加饱和度
  - sepia(number)：转为棕褐色图片，0不变，1完全棕褐色
  - drop-shadow(x偏移长度, y偏移长度, 模糊长度, 颜色值)：给元素的非透明区域添加投影，与属性`box-shadow`类似
  - 滤镜函数间的组合，空格分隔。注意顺序不同，效果也不同

- 示例
  ```css
  /* 任意图标换色 */
  .icon {
    /* 图标大小 */
    --size: 16px;
    /* 图标颜色 */
    --color: black;
    position: relative;
    left: calc(-1 * var(--size));
    overflow: hidden;
    display: inline-block;
    width: var(--size);
    height: var(--size);
    border-right: var(--size) solid transparent;
    box-sizing: content-box;
    /* 要求图标背景透明 */
    background: url() no-repeat center;
    filter: drop-shadow(var(--size) 0 var(--color));
  }
  ```

## backdrop-filter
- 应用模糊或颜色偏移等图形效果于元素后面的区域，为此，应用的元素或其背景需要设置透明或部分透明。其余同filter

## mask
- 通过遮罩图像的指定区域来隐藏元素或其一部分。是mask-image、mask-mode、mask-repeat、mask-position、mask-clip、mask-origin、mask-size、mask-composite这8个属性的简写，传多个值则逗号分隔。与background子属性很相像。

- 子属性说明
  - mask-image
    
    设置遮罩图像。当遮罩图片0宽0高，或加载失败，或不存在，或浏览器不支持遮罩图像格式，或遮罩值未指向遮罩图像时，效果相当于none
    
    取值
    - none：默认值，使用透明的黑色图像层，不会有任何视觉效果
    - url()：图片URL或引用svg遮罩元素mask
    - 渐变函数
    - image()：二维图像，可以将url()、渐变函数、颜色值等合成转换为图片，且只接受来源是http(s)协议，不支持本地
    
    [可视化生成工具](https://coupon.codelabo.cn/)
  
  - mask-mode

    设置遮罩图像颜色的透明度或亮度
    
    取值：
    - match-source：默认值，根据遮罩源决定模式，当遮罩图像是二维图像或渐变函数时使用alpha，当遮罩图像是引用svg遮罩元素mask时使用luminance
    - alpha：表示应用图像透明度
    - luminance：应用图像亮度。计算公式：((0.2125 * R) + (0.7154 * G) + (0.0721 * B)) * A

  - mask-repeat

    设置遮罩图像的重复方式。支持单值或双值(空格分隔)，为单值时表示水平和垂直方向使用一样的重复方式；为双值时表示水平方向和垂直方向各自的重复方式，此时no-repeat、repeat、space、round有效

    取值：
    - repeat：默认值，有裁剪的重复
    - repeat-x：只在水平方向重复
    - repeat-y：只在垂直方向重复
    - no-repeat：不重复
    - space：有间隔的重复
    - round：有拉伸的重复

  - mask-position

    设置遮罩图像的偏移位置。默认值为0% 0%，支持单值、双值，为单值时表示水平方向位置，垂直方向则默认center；为双值时分别表示水平方向和垂直方向的位置。除此还有另一种写法叫"边缘偏移"，格式如`top/bottom/center y-offset left/right/center x-offset`

    取值：
    - left
    - right
    - top
    - bottom
    - center
    - 具体长度
    - 百分比：计算公式为`(container dimension - mask dimension) * position percentage = dimension offset value`

  - mask-size

    设置遮罩图像的大小。支持单值或双值(空格分隔)，单值表示只设置宽度，高度自适应；双值则表示宽度和高度

    取值：
    - auto：默认值，保持纵横比，图像有设置宽高则保持原始尺寸，否则自动缩放
    - cover：保持纵横比，且完整覆盖元素
    - contain：保持纵横比，且完整展示遮罩图像
    - 具体长度/百分比：不允许负值

  - mask-origin

    设置遮罩图像左上角的起始位置，会影响mask-position参考点

    取值：
    - border-box：默认值
    - padding-box
    - content-box
    - fill-box：使用object边界框作为参考框，源是svg有效
    - stroke-box：使用stroke边界框作为参考框，源是svg有效
    - view-box：使用最近的SVG视口作为参考框，源是svg有效

  - mask-clip

    设置遮罩图像的作用范围，对超出范围的部分进行裁剪

    取值：
    - border-box：默认值  
    - padding-box
    - content-box
    - fill-box：使用object边界框作为参考框，源是svg有效
    - stroke-box：使用stroke边界框作为参考框，源是svg有效
    - view-box：使用最近的SVG视口作为参考框，源是svg有效
    - no-clip
    - text：非标准值，注意兼容性
  
  - mask-composite

    设置当前遮罩层及其下方遮罩层使用的合成操作

    取值：
    - add：默认值，当前遮罩图像放置在其下方的所有遮罩层上，也就是说，越往后的遮罩会被前面的遮罩所遮挡，此时与background-image的表现一样
    - subtract：当前遮罩图像只放置在其下方所有遮罩层之外的位置
    - intersect：当前遮罩图像与其下方所有遮罩层的重叠区域替换先前合成的层
    - exclude：对当前遮罩图像与其下方所有遮罩层的非重叠区域进行合成

- 示例
  ```css
  /* 任意图标换色 */
  .icon {
    /* 图标大小 */
    --size: 16px;
    /* 图标颜色 */
    --color: black;
    display: inline-block;
    width: var(--size);
    height: var(--size);
    background-color: var(--color);
    /* 要求图标背景透明 */
    mask: url() no-repeat;
    mask-size: 100% 100%;
  }
  ```

## background-blend-mode
- 设置元素的背景图像、背景色之间如何相互融合。注意按照与background-image相同的顺序定义，值之间逗号分隔
- 取值
  - normal：最终颜色是顶部颜色
  - multiply：最终颜色是顶部和底部颜色相乘的结果，效果像两幅印在透明胶片上的图像重叠在一起
  - screen：最终颜色是先对顶部和底部颜色反转，再相乘，最后反转该值的结果。效果就像两幅图像投射到投影屏幕上一样
  - overlay：如果底层颜色较深，结果同multiply；如果底层颜色较浅，结果同screen。与hard-light不同的是图层互换了
  
  - hard-light：如果顶层颜色较深，结果同multiply；如果顶层颜色较浅，结果同screen。效果类似于一束刺眼的聚光灯照射在背景上
  - soft-light：类似于hard-light，但更柔和。效果类似于一束漫射的聚光灯照射在背景上
  
  - darken：由每个颜色通道的最暗值组成
  - lighten：由每个颜色通道的最亮值组成

  - color-dodge：底部颜色除以顶部颜色，最后反转该颜色
  - color-burn：反转底部颜色，再除以顶部颜色，最后反转该颜色

  - difference：从较浅的颜色中减去较暗的颜色。黑色图层没有效果，而白色图层会反转另一图层的颜色
  - exclusion：类似于difference，但对比度较低

  - hue：具有顶部颜色的色调，同时使用底部颜色的饱和度和亮度
  - saturation：具有顶部颜色的饱和度，同时使用底部颜色的色调和亮度
  - color：具有顶部颜色的色调和饱和度，同时使用底部颜色的亮度。可用于为前景着色
  - luminosity：具有顶层颜色的亮度，同时使用底层颜色的色调和饱和度

- 示例
  ```css
  /* 任意图标换色 */
  .icon {
    /* 图标大小 */
    --size: 16px;
    /* 图标颜色 */
    --color: black;
    display: inline-block;
    width: var(--size);
    height: var(--size);
    color: var(--color);
    /* 要求图标纯黑，背景可不透明 */
    background: linear-gradient(currentColor, currentColor), url(), #fff;
    background-blend-mode: screen, normal;
    background-size: 100%;
  }
  ```

## shape-outside
- 定义一个形状，相邻的内联内容围绕该形状进行包裹
- 取值

  盒子
  - margin-box
  - border-box
  - padding-box
  - content-box

  形状函数
  - inset()：类似rect
  - circle()：定义圆
  - ellipse()：定义椭圆
  - polygon()：定义多边形

  其他
  - none：默认值，内联内容围绕元素的margin-box进行包裹
  - url()：图片URL或引用svg中形状元素，如circle、ellipse、polygon
  - 渐变函数

  组合值
  - 盒子与形状的组合，空格分隔

## color-scheme
- 为元素设置配色方案，浏览器会相应地对画布表层、滚动条和其他交互UI、表单控制、其他浏览器提供的UI如拼写检查下划线等的默认颜色进行调整
- 取值
  - normal：元素默认使用页面的配色方案进行渲染，若未设置配色方案，则使用页面的默认颜色设置进行渲染
  - light：元素默认使用操作系统的亮色方案进行渲染，可随操作系统配色方案改变而改变
  - dark：元素默认使用操作系统的暗色方案进行渲染，可随操作系统配色方案改变而改变
  - light dark：元素根据操作系统的配色方案自动选择亮色和暗色当中的一种进行渲染，可随操作系统配色方案改变而改变
  - only light：元素仅使用操作系统的亮色方案进行渲染，不随操作系统配色方案改变而改变
  - only dark：元素仅使用操作系统的暗色方案进行渲染，不随操作系统配色方案改变而改变
> 该属性作用在html元素可实现随系统主题改变而改变，但若要细入定制主题，可以使用`prefers-color-scheme`媒体条件查询

## accent-color
- 设置与某些元素交互时的强调色，如type值为checkbox、radio、range的input元素和progress元素
- 可取值auto、[各种颜色值](/css/CSS快速入门篇下.html#color-unit)
> 兼容性说明：Chrome完全支持，但Safari、IOS、Android部分支持

## print-color-adjust
- 调整元素在打印设备上的外观
- 取值
  - economy：默认值。允许用户代理做调整，针对用于呈现的输出设备做优化，比如删除背景图，调整文本颜色，使对比度适合在白纸上阅读
  - exact：取消针对用于呈现的输出设备做优化
- 示例
  ```css
  .element {
    background: url('logo.png') center no-repeat;
    /*  一般打印时不会打印背景图，为了节省墨水。下面设置可以在打印时打印背景图 */
    print-color-adjust: exact;
  }
  ```

## text-box
- 使得在不同字体下，实现文本垂直间距的一致性。是text-box-trim和text-box-edge的简写，分别表示要修剪的边，以及要修剪的空间。
- 具体用法参考[示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-text-box.html)

## text-emphasis
- 用于增强文本强调效果，强调标记显示在文本上方。是text-emphasis-style和text-emphasis-color的简写，分别表示强调标记的外观和颜色。
- 子属性取值说明
  - text-emphasis-style：none、dot、circle、double-circle、triangle、sesame、字符(特殊字符使用转义代码)。形状默认是填充(实心)filled，若需空心则关键字前加open
  - text-emphasis-color：[各种颜色值](/css/CSS快速入门篇下.html#color-unit)

## text-size-adjust
- 背景：缩放适配小屏幕导致文字变小，许多手机浏览器会使用文本膨胀算法放大文本，提高可读性。而该属性允许开发者控制(禁止或修改)某些智能手机和平板电脑上使用的文本膨胀算法，因为专为小屏幕设计的网页不需要此行为
- 取值
  - auto：是手机浏览器的默认值，启用浏览器的膨胀算法
  - none：是非手机浏览器的默认值，禁用浏览器的膨胀算法
  - 百分比：启用浏览器的膨胀算法，并指定增加字体大小的百分比值
> 兼容性说明：Chrome、Edge支持，但Safari不支持，而在移动端，IOS需加-webkit-前缀方才支持

## font-variation-settings
- 字体变量设置。指定要改变特征的4个字母组成的轴名称和对应值，提供对可变字体特征的低级控制
- 取值
  - normal：默认值，文本使用默认设置布局
  - `<string> <number>`: `string`表示4个字母组成的轴名称，分注册轴和自定义轴，`number`表示对应值 
- 变量字体设计中，目前有5个注册轴，包括字体权重、字体拉伸、字体样式（值为`oblique <angle>`、`italic`）和字体光学尺寸(设置文本渲染是否针对不同尺寸的查看进行优化)。每个注册轴都有对应的4个字母组成的标记，其与相应的CSS属性映射如下：

  ![注册轴与CSS属性映射](/css/注册轴与CSS属性映射.png)

  除了使用现有的注册轴，也可以使用自定义轴。自定义轴让可变字体变得更具创造性，因为不限制自定义轴的范围、定义或数量。与注册轴类似，自定义轴具有相应的四个字母标记，但是自定义轴的字母标记必须是大写的

## font-variant-numeric
- 控制数字、分数和序号标记的替代字形
- 取值
  - normal：默认值，禁止使用替代字形

  序号标记类关键字：
  - ordinal：使用特殊字形作为序数标记，对应于OpenType值ordn
  - slashed-zero：使用带斜线的0，对应于OpenType值零。在需区分O和0时很有用

  数字类关键字：
  - lining-nums：使用数字均位于基线上的图形集，对应于OpenType值lnum
  - oldstyle-nums：使用某些数字如3、4、7、9具有下降部分的图形集，对应于OpenType值onum
   
  数字间距类关键字：
  - proportional-nums：使用数字大小不尽相同的图形集，对应于OpenType值pnum
  - tabular-nums：使用数字大小相同(等宽)的图形集，易于像表格一样对齐，对应于OpenType值tnum

  分数类关键字：
  - diagonal-fractions：使用分子和分母缩小并用斜线分隔的图形集，对应于OpenType值frac
  - stacked-fractions：使用分子和分母缩小并用水平线分隔的图形集，对应于OpenType值afrc
- 格式说明：取值为normal，或其余四种类型间的任意组合，空格分隔，无关顺序


## contain
- 指定元素及其内容如何尽可能与文档树的其余部分独立。它可以隔离DOM的子部分，通过将布局、样式、绘制、大小或任何组合的计算限制在DOM子树而不是整个页面，提升渲染性能
- 取值
  - none：正常渲染，不应用任何限制
  - size：尺寸限制，在元素的内联和块方向上均有效，元素尺寸单独计算，忽略子元素
  - inline-size：尺寸限制，在元素的内联方向上有效，元素尺寸单独计算，忽略子元素
  - layout：元素内部布局与页面其余部分隔离，元素外部的任何内容都不会影响其内部布局，反之亦然
  - style：对于影响元素本身及其后代元素的属性，其效果不会超出元素的范围。计数器和引号的作用域仅限于元素本身及其内容
  - paint：元素的后代元素不会显示在其边界之外。若元素超出屏幕，浏览器无需绘制该元素。若后代元素超出元素边界，则该后代元素将被裁剪到元素的边框内
  - content：相当于`contain: layout paint style`
  - strict：相当于`contain: size layout paint style`
- 格式说明：none、[size|inline-size]/layout/style/paint任意组合、content、strict

## content-visibility
- 控制是否跳过屏幕外的内容，直到需要时才渲染，或者说是否允许推迟设置的元素渲染。启用它可以使初始页面加载更快，与屏幕上内容更快交互。可用于长列表优化。
- 取值
  - visible: 默认值，正常渲染，无任何效果
  - hidden: 跳过元素内容的渲染。用户代理功能如在页面中查找，按Tab键顺序导航等，不可访问跳过的元素内容，也不能选择或聚焦。
  
    `display: none`隐藏元素，但破坏其渲染状态，而`visibility: hidden`隐藏元素并保持其渲染状态，但占据页面上的几何空间，可点击，隐藏时仍会更新渲染状态，`content-visibility: hidden`则取其长，隐藏元素并保留其渲染状态，再次显示的成本要比`display:none`低得多，也不占据页面空间

  - auto: 刚开始元素不可见时，浏览器会暂时跳过其内容的呈现，等到其处于可见区域时，浏览器再渲染其内容。开始渲染或者跳过停止时会触发`contentvisibilityautostatechange`事件

  > 兼容性说明：auto值目前在Safari和IOS仍处于开发阶段，属性和其他值均支持。其他浏览器无兼容问题

  > 高度不定的元素设置了`content-visibility:auto`，滚动会有问题，因为无法正确计算页面高度，设置了content-visibility的元素高度在被浏览器渲染前会被视为0，这就使页面高度和滚动变得混乱。可以为元素设置`contain-intrinsic-size`，指定初始高度，既保证元素延迟渲染，又不影响滚动

- 支持动画和过渡的几个点

  - 在动画中，从visible到hidden，效果是到100%隐藏，整个期间是可见的；从hidden到visible，效果是0%便可见，始终可见

  - 在过渡中，需额外添加声明`transition-behavior: allow-discrete`才生效

## will-change
- 向浏览器提示元素将如何变化，浏览器在元素变化前做好优化准备的工作，提高页面的响应速度
- 取值
  - auto：默认值，无效果，用户代理应用通常使用的任何启发式和优化方法
  - content：将对元素内容进行动画处理或更改
  - scroll-position：将动画化或改变元素的滚动位置
  - 自定义标识符：将变化的CSS属性，多个属性则用逗号间隔
- 使用注意
  - 1、不要应用在太多元素上，不要同时声明太多的属性
  - 2、有节制地使用：在发生更改之前和之后使用脚本打开和关闭will-change。如完成所有动画后，将元素的will-change删除
    ```javascript
    var el = document.getElementById('element');
    // 当鼠标移动到该元素上时给该元素设置 will-change 属性
    el.addEventListener('mouseenter', hintBrowser);
    // 当 CSS 动画结束后清除 will-change 属性
    el.addEventListener('animationEnd', removeHint);

    function hintBrowser() {    
      // 填写上那些你知道的，会在 CSS 动画中发生改变的 CSS 属性名们 
      this.style.willChange = 'transform, opacity';
    }

    function removeHint() { 
      // 修改完成后，删除will-change   
      this.style.willChange = 'auto';
    }
    ```
  - 3、不要对元素过早应用will-change：一般作为最后的存在性能的优化手段，不能用于预测性能的优化。如在样式表中少用will-change
  - 4、给予足够的时间发挥作用：找到某种方法，至少提前预测一些事情将会发生改变，然后设定will-change。如在父元素上使用will-change，在子元素上使用动画
  - 5、当will-change值为创建堆叠上下文的属性(如opacity)时，可能影响元素的视觉外观，因为它也会创建层叠上下文

