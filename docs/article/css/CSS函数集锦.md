---
title: CSS函数集锦
tags: 
- CSS
---

本文的CSS函数介绍大多参考自[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_Value_Functions)

## 数学类函数
### calc()
- 含义：在指定属性值时执行计算，可用于数字、百分比、长度、时间、角度、频率
- 特点
  
  1、支持`+、-、/、*`四种运算符，且`*和/`的运算优先级高于`+和-`，可以使用小括号调整优先级
  
  2、使用运算符时，其前后留有空格

  3、允许嵌套calc()函数，此时内部函数将被视为简单的括号

  4、只传一个number，会返回四舍五入的结果

  5、使用`*`要求操作数至少有一个是数字，使用`/`要求右操作数必须是数字

  6、`+和-`支持数字、百分比或关键字(`e/pi/NaN/infinity/-infinity`)之间或与带单位的值之间进行运算

  7、calc()不会计算auto、fit-content等，应使用calc-size()。但目前Safari暂不支持calc-size()，Chrome和Edge是支持的

- 示例
  ```css
  .element {
    width: calc(100% / 2 - 100px);
    height: calc-size(auto, size * 2);
    padding-top: calc(3px + pi * 2px);
    margin-bottom: calc(calc(100% - 200px) / 2);
    line-height: calc(2.3);
  }
  ```

## 引用类函数
### var()
- 含义：获取css变量(自定义属性的值)。第一参数是变量名，第二可选参数是变量缺省值，当发现未定义或等于CSS关键字时被使用
- 注意
  
  1、第一参数必须以双短横杆--开头
  
  2、第二可选参数中若带有逗号，逗号后的值会被认为属于缺省值的一部分

  3、第二可选参数不允许有换行符、不匹配的右括号)]}、;或!

  4、当css变量未定义且无缺省值，又或定义但值在所用属性是一个无效值时，此时属性值会视为unset

- 定义css变量的3种方式
  ```html
  <style>
    :root{
      /* 方式一：嵌入样式定义css变量 */
      --height: 200px;
    }
    .test {
      display: inline-block;
      width: var(--width, 100px);
      height: var(--height, 100px);
      background-color: var(--color, orange);
    }
  </style>
  <!-- 方式二：内联样式定义css变量 -->
  <div class="test" style="--color: red;"></div>
  <script>
    // 方式三：JS定义css变量
    document.querySelector('.test').style.setProperty('--width', '200px');
  </script>
  ```

- 示例

  [定义CSS变量](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-var.html)

  [主题切换](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-theme.html)

### attr()
- 含义：检索指定的元素属性，将其值作用于应用的属性。可以用在所有属性上
- 用法
  
  attr(property [type][, fallback])：依序指定属性名、属性类型和缺省值。属性类型默认值是raw-string，也可以是type()、CSS长度单位如px等。注意：
  
  1、属性名、属性类型间没有逗号
  
  2、当属性值不能被解析为指定的属性类型时，有缺省值则返回缺省值，否则返回空串

  3、在url()中使用受attr()污染的值会使声明变为"在计算值时无效"，简称IACVT(invalid at computed value time)
  
  4、属性类型和缺省值这两个参数存在兼容性问题，目前三星手机均不支持这两个参数，Safari、IOS不支持属性类型参数

- 示例：[自定义title属性样式](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-attr.html)

### url()
- 引用文件，可以是绝对URL、相对样式所在文件的URL、blob URL、data URL
- 常用在background-image、border-image、mask-image、filter、content、cursor、font-face规则等

### env()
- 将用户代理定义的环境变量的值插入到CSS中。与var()的区别是，env()引用全局范围的环境变量，var()引用声明的元素范围的自定义属性

- 注意

  1、支持fallback值，如`env(safe-area-inset-bottom, 44px)`

  2、关键字不区分大小写，如`env(Safe-Area-Inset-Bottom)`

  3、可用在calc()中

- 示例
  ```css
  .container {
    display: block;
    width: 100vw;
    height: 100vh;
    padding-top: env(safe-area-inset-top);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    border: 0;
    margin: 0;
    box-sizing: border-box;
  }
  ```

## 渐变类函数
### linear-gradient()
- 线性渐变，创建由两种或多种颜色沿直线逐渐过渡组成的图像
- 用法
  
  格式：linear-gradient([direction [space], ](color position{0-2}, )+)

  参数说明：
  <span id="space"></span>
  - direction表示方向，默认值是`to bottom`，也可取值`to top/left/right`，对角组合如`to right bottom`，或角度如`0deg/0turn`(朝上)、`90deg/0.25turn`(朝右)、`180deg/0.5turn`(朝下)、`270deg/0.75turn`(朝左)

  <span id="color"></span>
  - space表示采用的颜色空间坐标，默认值是`in srgb`，也可取值`in srgb-linear/lab/oklab/lch/oklch/hsl/hwb/xyz/xyz-d50/xyz-d65`，[了解更多](https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method)
  
  <span id="position"></span>
  - color表示颜色，取值见[各种颜色值](/article/css/CSS快速入门篇下.html#color-unit)
  
  <span id="attention"></span>
  - position表示颜色起止位置，可取值百分比或长度。当不传，表示颜色过渡中点为两个颜色之间的中点，当传参个数为1，表示颜色起始位置，当传参个数为2，表示颜色起始位置和结束位置。当只指定了位置，没有指定颜色时，则此时位置表示前后两个颜色过渡的中点

  注意：
  - 当后色值的位置不大于前色值的位置时，进行硬过渡(小于)或产生一条过渡硬线(等于)
  - 默认情况下，如果0%处没有指定颜色，则声明的第一个颜色将位于该位置，同理，最后一个颜色将延续到100%处

- 示例：[linear-gradient实现虚线、斜条纹效果](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-gradient.html)

### repeating-linear-gradient()
- 重复线性渐变，创建由重复的线性渐变组成的图像
- 用法基本同linear-gradient()，需注意重复渐变的起始点、终点和长度（因为不一定是从0开始，也不一定是在100%结束）。第一个颜色指定位置是起点，未指定则默认起点为0，最后一个颜色指定位置是终点，未指定则默认终点为100%，长度则是起点和终点之间的距离

### radial-gradient()
- 辐射渐变，创建由从原点辐射的两种或多种颜色之间的渐进过渡组成的图像
- 用法

  格式：radial-gradient([[shape ][size ][at origin ][space ]](color position{0-2}, )+)

  参数说明：
  - shape表示形状，默认值是ellipse(椭圆形)，也可取值circle(圆形)
  
  - size表示大小，默认值是farthest-corner，也可取值closest-corner、closest-side、farthest-side。当shape是circle，还可取长度单值如`10px`，表示半径；当shape是ellipse时，还可取长度百分比双值如`10% 20px`，第一参数表示水平半径，第二参数表示垂直半径

  - origin表示原点位置，默认值是center，也可取单值top/bottom/left/right/长度/百分比(此时默认另一方向为center)，或上述不同方向两两组合的双值，或`left/right 长度/百分比 top/bottom 长度/百分比`这种四值组成的表示边缘偏移量的方式

  - [space同linear-gradient](#space)
  
  - [color同linear-gradient](#color)
  
  - [position同linear-gradient](#position)

  [注意同linear-gradient](#attention)

- 示例：[radial-gradient实现卡券效果](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-gradient.html)

### repeating-radial-gradient()
- 重复辐射渐变，创建由从原点辐射的重复渐变组成的图像，它会在所有方向上无限重复，直至覆盖整个容器
- 用法基本同radial-gradient

### conic-gradient()
- 锥渐变，创建由围绕中心点旋转的颜色过渡渐变组成的图像
- 用法

  格式：conic-gradient([[from angle ][at origin ] || [space ]](color position{0-2}, )+)

  参数说明：
  - angle：定义顺时针起始角度，默认值为0deg或0turn，即从12点方向开始

  - origin：表示原点位置，默认值是center，也可取单值top/bottom/left/right/长度/百分比(此时默认另一方向为center)，或上述不同方向两两组合的双值，或`left/right 长度/百分比 top/bottom 长度/百分比`这种四值组成的表示边缘偏移量的方式

  - [space同linear-gradient](#space)
  
  - [color同linear-gradient](#color)
  
  - position表示颜色起止位置，可取值百分比或角度。当不传，表示颜色过渡中点为两个色标之间中点，当传参个数为1，表示颜色起始角度，当传参个数为2，表示颜色起始角度和结束角度。当只指定了角度，没有指定颜色时，则此时位置表示前后两个颜色过渡的中点

  [注意同linear-gradient](#attention)

- 示例：[conic-gradient轻松实现饼图](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-gradient.html)

### repeat-conic-gradient()
- 重复锥渐变，创建由围绕中心点旋转的重复渐变组成的图像，它会围绕中心店重复旋转，直至填满360deg
- 用法基本同conic-gradient

## 颜色类函数
### light-dark()
- 允许为属性设置两种颜色，通过检测返回两种颜色其中之一。如果用户的偏好设置为light或未设置偏好，则返回第一个值；如果用户的偏好设置为dark，则返回第二个值。要使该函数起效，必须设置`color-scheme: light dark;`，一般声明在:root伪类上

### hwb()
- 使用sRGB颜色空间，通过色调、白度和黑度指定颜色，可选的alpha分量表示颜色的透明度。hsl()也是用于sRGB空间
- 用法：
  
  格式：hwb([from color] hue whiteness blackness [/ alpha])

  参数说明：
  - hue：表示色调，可取值为角度(360deg = 1turn = (2*pi)rad = 400grad)或数字。下图是sRGB空间的色调度数，如red是0deg，yellow是60deg，blue是240deg。注意不同颜色空间对应的角度是不同的

    ![色调盘](/css/color_wheel.svg)

  - whiteness：表示白度值，可取值为百分比。当为0%，表示无亮度，当为100%，而黑度值为0%，表示全白

  - darkness：表示黑度值，可取值为百分比。当为0%，表示无暗度，当为100%，而白度值为0%，表示全黑

  - alpha：表示透明度，可取值数字，范围0-1。为0表示完全透明，为1表示完全不透明

  - from color：表示相对的颜色，from是关键字，color是具体颜色，当色调、白度值、黑度值、透明度不必改动或进行calc时，可以用h、w、b、alpha进行表示

### lch()
- 使用CIELAB颜色空间，通过亮度、色度和色调指定颜色，可选的alpha分量表示颜色的透明度。lab()也是用于CIELAB空间
- 用法：

  格式：lch([from color] lightness chroma hue [/ alpha])

  参数说明：
  - lightness：表示人眼感知的亮度，可取值为百分比或数字。当为0%，表示全黑，当为100%，表示全白

  - chroma：表示色度(颜色数量)，可取值为百分比或数字。最小为0(0%)，最大为150(100%)，理论是无限制，实际不超过230

  - hue：表示色调，可取值为角度(360deg = 1turn = (2*pi)rad = 400grad)或数字。此时red是20deg，green是130deg，blue是240deg

  - alpha：表示透明度，可取值数字，范围0-1。为0表示完全透明，为1表示完全不透明

  - from color：表示相对的颜色，from是关键字，color是具体颜色，当亮度、色度、色调、透明度不必改动或进行calc时，可以用l、c、h、alpha进行表示

### color-mix()
- 入参两个颜色值，返回在给定颜色空间中按给定量的混合结果
- 不同场景下适合的颜色空间
  
  光物理混合：CIE XYZ或srgb-linear，因为它们的光强度是线性的

  感知上均匀分布，如渐变：Oklab或Lab，因为它们被设计为感知均匀

  避免颜色混合时变灰，即在整个过渡过程中最大化色度：Oklch或LCH效果很好

  仅当需要匹配使用sRGB的特定设备或软件的行为时，才使用sRGB。sRGB既不是线性光，也不是感知均匀的，并且会产生较差的效果，如过暗或偏灰的混合
- 用法

  格式：color-mix(space, (color percentage?){2})

  参数说明：
  - [space同linear-gradient](#space)

  - color：要混合的颜色

  - percentage：可选，指定混合颜色的量。可取值百分比，范围0%-100%。下图定义混合色占比计算规则：

    ![混合色占比计算规则](/css/color-mix混合色占比计算规则.png)

- [可视化工具](https://mdn.github.io/css-examples/tools/color-mixer/)
