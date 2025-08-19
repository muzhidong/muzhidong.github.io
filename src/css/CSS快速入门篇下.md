---
title: CSS快速入门篇下
tags: 
- CSS
---

作为CSS快速入门最后一篇，将介绍CSS单位、文本样式、字体样式、背景样式和流向的改变。

<style>
  .compare {
    display:grid;
    border-top:1px solid var(--vp-c-text-3);
    border-left:1px solid var(--vp-c-text-3);
  }
  .compare > div {
    padding: 5px;
    border-right: 1px solid var(--vp-c-text-3);
    border-bottom: 1px solid var(--vp-c-text-3);
  }
  .compare > div:nth-child(2n+1) {
    grid-column: 1/2;
  }
  .compare > div:nth-child(2n) {
    grid-column: 2/3;
  }
</style>

## CSS单位
<div class='compare'>
  <div>相对长度单位</div>
  <div>描述</div>
  <div>ex</div>
  <div>1ex等于当前字体的x-height(小写字母x的高度)，接近当前字体大小的一半</div>
  <div>ch</div>
  <div>1ch等于一个0字符的宽度，在等宽字体场景下有用</div>
  <div>em</div>
  <div>1em等于当前字体大小。注意，当在一个元素内对font-size和其他属性使用em单位时浏览器先计算font-size，之后基于这个值再去计算其他值，请看如下代码：<br/>
  <pre style="color:white;">body {
  font-size: 16px;
}
div {
  /* 19.2 px */
  font-size: 1.2em;
  /* 23.04 px，不是19.2px */
  padding: 1.2em;
}</pre></div>
  <div>rem</div>
  <div>1rem等于根字体大小</div>
  <div>vw/vh</div>
  <div>100vw等于窗口宽度，100vh等于窗口高度</div>
</div>
<br/>
<div class='compare'>
  <div>绝对长度单位</div>
  <div>描述</div>
  <div>in</div>
  <div>英寸</div>
  <div>pt</div>
  <div>磅</div>
  <div>px</div>
  <div>像素</div>
  <div id='color-unit'>cm</div>
  <div>厘米</div>
  <div>mm</div>
  <div>毫米</div>
</div>
<br/>
<div class='compare'>
  <div>颜色值</div>
  <div>描述</div>
  <div>颜色关键字</div>
  <div>如red、blue</div>
  <div>transparent关键字</div>
  <div>表示透明色</div>
  <div>currentColor变量</div>
  <div>表示当前文字颜色</div>
  <div>十六进制颜色</div>
  <div>固定以#开头，后带3位或6位16进制值，格式如#rrggbb、#rgb</div>
  <div>rgb函数</div>
  <div>值依序表示红、绿、蓝，每个颜色范围都是0-255或0-100%，如rgb(255,0,0)、rgb(100%,50%,20%)</div>
  <div>rgba函数</div>
  <div>比rgb函数多了一个透明度参数，取值范围是0-1，0时表示完全透明，1时表示完全不透明。若希望后代元素继承透明度，使用opacity属性；若不希望后代元素继承透明度，使用rgba函数方式</div>
  <div>hsl函数</div>
  <div>值依序表示色调、饱和度、亮度。取值范围分别是0-360(值递增，表示按彩虹色顺序递增)、0%-100%(越大越亮)、0%-100%(值递增，表示从黑到白，50%是正常亮度)</div>
</div>

## 文本样式
### line-height
- 含义：行高，即两行基线的间距，也等于行距 + 字体大小

- 取值：默认值为normal(与字体有关，一般重置行高样式为20px)、数值、百分比、长度
  
  1、值为数值、百分比、相对长度时，是相对于当前字体大小计算
  
  2、在继承性上，值为数值时直接继承该值，而百分比和长度继承的是最终计算值

- 实现垂直居中效果
  
  1、对于非替换元素的单行内联元素，可见高度完全由行高决定(幽灵空白节点撑开)，所以实现"近似(中文中线会偏低点)"垂直居中，设置行高即可(行距的上下等分机制)，如有设置高度则令行高等于高度，此时上、下行距相等
  
  2、对于替换元素或多行文本元素实现"近似(所有字体中x字符位置会偏下点)"垂直居中，则依赖vertical-align
  ```css
  .vertical-center{
    /* 一来重置line-height大小；二来保持内联元素特性，利用幽灵空白节点撑开高度 */
    display: inline-block;
    line-height: 100px;
    vertical-align: middle;
  }
  ```

### vertical-align
- 含义：文本在垂直方向上的对齐方式

- 生效前提：只能作用在display值为inline、inline-block、inline-table或table-cell的元素上，如span、img、button、input、td默认是支持的。但是注意若是内联元素，需要设置行高，让内联元素的幽灵空白节点撑起高度，vertical-align才起效

- 取值

  - 线类

    baseline：默认值，非替换内联元素的基线是小写字母x下边缘，而替换元素以自身下边缘作为基线

    middle：若作用在内联元素，元素的垂直中心（中线）和行框盒子基线往上1/2x-height处（字符x的交叉点，但是所有字体中x字符位置都会偏下点）对齐；若作用在table-cell元素，则单元格填充盒子相对于外面的表格行居中对齐
    
    top：垂直上边缘对齐。若作用在内联元素，则元素顶部与当前行框盒子的顶部对齐；若作用在table-cell元素，则元素顶padding边缘和表格行的顶部对齐
    
    bottom：垂直下边缘对齐。若作用在内联元素，则元素底部与当前行框盒子的底部对齐；若作用在table-cell元素，则元素底padding边缘和表格行的底部对齐
  
  - 数值百分比类

    相对于基线上移或下移，负值下移，正值上移。可利用它实现图文垂直居中对齐

    百分比相对于当前line-height计算

  - *文本类

    text-top：盒子顶部与父级内容区域（父级元素当前font-size和font-family下应有的内容区域大小）的顶部对齐
    
    text-bottom：盒子底部与父级内容区域的底部对齐

  - 上标下标类

    super：提高盒子基线到父级合适的上标基线位置，类似sup标签，但不同的是vertical-align:super不会改变字体大小
    
    sub：降低盒子基线到父级合适的下标基线位置，类似sub标签，但不同的是vertical-align:sub不会改变字体大小

- 经验&技巧

  1、当遇到不同字体大小的混合文本高度比所设置的行高大一点、父元素的高度比内部唯一子图片元素高一点、margin-top负值比图片高度大但图片仍旧无法脱离容器等问题时，明白都是幽灵空白节点、vertical-align和line-height共同作用的结果。通过将vertical-align垂直对齐方式改为top/bottom即可

  2、一个inline-block元素，如果里面没有内联元素，或者overflow不是visible，则该元素的基线就是其margin底边缘；否则其基线就是元素里面最后一行内联元素的基线。利用该特性可以实现图标总是垂直居中，见示例[无论“测试”文字字体多大多小，旁边图标总是与它垂直对齐](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-icon.html)

  3、遇到垂直方向上高度、对齐等疑惑问题，尝试加字母x，方便定位问题，找到解决方案
  ```html
  <!-- 分析示例：利用vertical-align实现水平垂直居中的弹框 -->
  <style>
  .container {
    /* 1、格式化宽度和高度，实现水平居中 */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.5), none;
    text-align: center;
    white-space: nowrap;
    /* 4、保证字符x中心点与容器上边缘对齐 */
    font-size: 0;
    z-index: 99;
  }
  /* 通过伪元素创建行框盒子，且中线与容器中心对齐 */
  .container::after {
    content: "";
    /* 2、使height生效 */
    display: inline-block;
    /* 3、使vertical-align: middle发挥效果 */
    height: 100%;
    /* 5、与容器中心对齐 */
    vertical-align: middle;
  }
  .dialog {
    /* 6、与行框盒子中线对齐 */
    display: inline-block;
    vertical-align: middle;
    border-radius: 6px;
    background-color: #fff;
    font-size: 14px;
    text-align: left;
    white-space: normal;
  }
  </style>
  <div class="container">
    <div class="dialog">
      <!-- 弹窗内容 -->
    </div>
  </div>
  ```

### color
- 含义：文本颜色
- 取值：见<a href="#color-unit">颜色值</a>

### 更多文本样式
<div class='compare'>
  <div>属性</div>
  <div>描述</div>
  <!-- text-align -->
  <div>文本水平对齐<br/>text-align</div>
  <div>可取值为left、right、center、justify(两端对齐，但最后一行不生效)、justify-all(两端对齐)</div>
  <!-- text-align-last -->
  <div>文本最后一行水平对齐<br/>text-align-last</div>
  <div>可取值为left、right、center、justify</div>
  <!-- text-decoration -->
  <div>文本修饰<br/>text-decoration</div>
  <div>是text-decoration-line、text-decoration-thickness、
  text-decoration-style、text-decoration-color的简写，其中，text-decoration-line可取值如下，<br/>
  none<br/>
  underline(下划线)<br/>
  overline(上划线) <br/>
  line-through(删除线)</div>
  <!-- text-transform -->
  <div>文本大小写控制<br/>text-transform</div>
  <div>可取值为none、capitalize(首字母大写)、uppercase(全大写)、lowercase(全小写)</div>
  <!-- text-shadow -->
  <div>文本阴影<br/>text-shadow</div>
  <div>是h-shadow、v-shadow、blur、color的简写，分别表示水平阴影位置(允许负值，单位px)、垂直阴影位置(允许负值，单位px)、模糊距离(可选)、阴影颜色(可选)。默认值为none，示例：<a href="https://github.com/muzhidong/blog-demo/tree/main/docs/02css/csspreprocessor/text-shadow">文字长阴影效果</a></div>
  <!-- text-overflow -->
  <div>文本溢出<br/>text-overflow</div>
  <div>默认值为clip(裁剪)，也可取值为ellipsis(超出显示省略号)、自定义字符(超出显示给定字符)</div>
  <!-- text-indent -->
  <div>文本首行缩进<br/>text-indent</div>
  <div>可取具体长度值(一般单位用em)，正值右缩进，负值左缩进<br/>
  display值为inline的内联替换元素设置text-indent无效</div>
  <!-- letter-spacing -->
  <div>字符间距<br/>letter-spacing</div>
  <div>字符包括汉字、英文字母和空格，默认值为normal<br/>
  具有继承性、在inline元素取负值起效发生字符重叠</div>
  <!-- word-spacing -->
  <div>单词间距<br/>word-spacing</div>
  <div>仅对空格字符起效，默认值为normal，为数值时在原先宽度上进行加减<br/>
  具有继承性、在inline元素取负值起效发生字符重叠、间隔算法会受到text-align:justify影响</div>
  <!-- word-break -->
  <div>文本换行<br/>word-break</div>
  <div>默认值为normal，也可取值break-all，表示允许任意非CJK(中日韩)文本间换行，面对连续超长数字或字母时word-break也会"强制分割"，还有一个值是keep-all，表示只允许半角空格或连字符处换行</div>
  <!-- overflow-wrap -->
  <div>超出换行<br/>overflow-wrap</div>
  <div>替代word-wrap。默认值是normal，也可取值break-word，面对连续超长数字或字母时会"选择合适的换行点"进行换行，不会强制分隔连续数字或字母，看<a href="https://demo.cssworld.cn/8/6-5.php">张老师提供的示例</a></div>
  <!-- hyphens -->
  <div>英文单词连字符<br/>hyphens</div>
  <div>前提是标签声明属性lang为en。一般取值为auto</div>
  <!-- white-space -->
  <div>元素内空白字符处理<br/>white-space</div>
  <div>值对比见如图<br/> 
  <img src="/css/white-space值比较.png" /><br/>
  <a href="https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-white-space.html">点示例我，加深区别</a></div>
</div>

## 字体样式
<div class='compare'>
  <div>属性</div>
  <div>描述</div>
  <!-- font-size -->
  <div>字体大小<br/>font-size</div>
  <div>默认字体大小是medium，即14px<br/>
  支持绝对长度单位如px，也支持相对长度单位如%，其中百分比是相对用户对浏览器设置的默认字体大小<br/>
  现Chrome、Safari取消渲染字体时最小字体为12px的限制，值为0时相当于隐藏文字</div>
  <!-- font-family -->
  <div>字体<br/>font-family</div>
  <div>默认字体由操作系统和浏览器共同决定<br/>
  可以指定一种字体名或字体族，字体名有空格需加单引号，也可以指定多种，用逗号分隔，按从左到右的顺序查找字体，一般字体名在前，字体族在后，且建议英在前，中在后，若都没找到则使用默认字体<br/>
  字体族常见的有衬线字体serif(如SimSun、Times New Roman)、无衬线字体sans-serif(如Microsoft YaHei、PingFang SC、Arial)、等宽字体monospace(一般针对英文字体，在代码、图形呈现)、系统UI字体system-ui
  </div>
  <!-- font-weight -->
  <div>字体粗细<br/>font-weight</div>
  <div>默认值为normal(400)，其他取值有bold(700)、bolder(相对normal是700，相对bold是900)、lighter(相对normal是100，相对bold是400)、100、200、300、500、600、800、900<br/>
  一般建议避免使用权重值和相对粗细值，直接使用关键字如normal、bold。因为我们常用的字体缺乏对应的字重字体，此时会走权重值不可用下的回退机制，参考自<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight">MDN</a></div>
  <!-- font-style -->
  <div>字体样式<br/>font-style</div>
  <div>可取值normal、italic(使用当前字体的斜体，否则让文字倾斜)、oblique(文字倾斜)、oblique [angle](文字倾斜并指定角度)</div>
  <!-- font-size-adjust -->
  <div>首选字体尺寸比<br/>font-size-adjust</div>
  <div>即小写字母与大写字母大小之比，可取值none、具体数值、from-font(使用第一个可用字体中font-metric指定值)<br/>
  当应用字体的尺寸比低于指定值时，为了保证可读性，会调整字体大小，即当前font-size值乘以该系数</div>
</div>

> 项目常用字体设置
>```css
>/* 通用字体 */
>@font-face {
>  font-family: Emoji;
>  src: local("Apple Color Emoji"), local("Segoe UI Emoji"), local("Segoe UI Symbol"), local("Noto Color Emoji");
>  unicode-range: U+1F000-1F644, U+203C-3299;
>}
>body {
>  font-family: system-ui, —apple-system, 'Segoe UI', Rototo, Emoji, Helvetica, Arial, sans-serif;
>}
>
>/* 衬线字体 */
>.font-serif {
>  font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
>}
>
>/* 无衬线字体 */
>.font-sans-serif {
>  font-family: Arial, Verdana, Tahoma, Helivetica, Calibri, 'Microsoft YaHei', 'PingFang SC', sans-serif;
>}
>
>/* 等宽字体 */
>.font-mono {
>  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
>}
>```

## 背景样式
- background是背景色、背景图、背景图重复方式、背景图依附方式、背景图位置、背景图大小、背景相对起始位置、背景作用范围的简写，各属性说明如下，
<div class='compare'>
  <div>属性</div>
  <div>属性值</div>
  <!-- background-color -->
  <div>background-color</div>
  <div>取值见<a href="#color-unit">颜色值</a></div>
  <!-- background-image -->
  <div>background-image</div>
  <div>值可以为url函数，或渐变函数，如linear-gradient、repeating-linear-gradient、radial-gradient、repeating-radial-gradient等等，具体介绍<a href="/css/CSS函数集锦.html#渐变类函数">点这</a>。多值则逗号分隔，越往后的背景会被前面的背景所遮挡<br/>
  若也设置了背景色，则会覆盖它</div>
  <!-- background-repeat  -->
  <div>background-repeat</div>
  <div>可取值为repeat(默认值，水平和垂直两个方向都会平铺)、repeat-x、repeat-y、no-repeat</div>
  <!-- background-attachment -->
  <div>background-attachment</div>
  <div>可取值为scroll(默认值，背景相对于元素本身固定，会随页面滚动，但不随元素内容滚动)、fixed(背景相对于视口固定，不随页面和元素内容滚动而改变)、local(背景相对于元素内容固定，会随页面和元素内容滚动而改变)</div>
  <!-- background-position -->
  <div>background-position</div>
  <div>默认在元素左上角显示<br/>
  定性格式：top\bottom\left\right\center的两两组合<br/>
  定量格式：x y，一般单位是像素或百分比。其中值为百分比时，计算公式如下：<br/>
  posX = (容器宽度 - 图片宽度) * x<br/>
  posY = (容器高度 - 图片高度) * y</div>
  <!-- background-size -->
  <div>background-size</div>
  <div>表示背景图尺寸，默认值为auto，值也可以为百分比(参照父元素)、具体长度、cover[保持宽高比，使背景图像完全填充背景区域]、contain[保持宽高比，保证图像在区域内完整展示]</div>
  <!-- background-origin -->
  <div>background-origin</div>
  <div>表示背景左上角的起始位置，默认值为padding-box，值也可以为border-box、content-box，会影响background-position参考点</div>
  <!-- background-clip -->
  <div>background-clip</div>
  <div>表示背景作用范围，对超出范围的部分进行裁剪。默认值border-box，值也可以为padding-box、content-box、text</div>
</div>

- 示例：[css实现阅读进度](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-background.html)

## 流向的改变
### 块联轴与内联轴
- 块联轴定义网站的文档块流方向，CSS的书写模式writing-mode影响块联轴的方向
- 内联轴定义网站的文本流方向，即文本阅读方式，CSS的direction或HTML的dir影响内联轴的方向

<style>
.axis {
  display: flex;
  flex-flow: row nowrap;
}
.axis .item {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
<div class="axis">
  <div class="item" >
    <img src="/css/mdn-horizontal.png" alt="水平方向的块轴和内联轴" style="flex-grow:1;" />
    <span>水平方向的块轴和内联轴</span>  
  </div>
  <div class="item">
    <img src="/css/mdn-vertical.png" alt="垂直方向的块轴和内联轴" />
    <span>垂直方向的块轴和内联轴</span>
  </div>
</div>

### writing-mode
- 作用：改变块流方向。在水平方向适用的规则在垂直方向仍适用，如margin水平合并、margin:auto垂直居中等等
- 取值：

  horizontal-tb：默认值，文本流是水平方向，元素从上到下堆叠

  vertical-rl：文本流是垂直方向，元素从右到左堆叠

  vertical-lr：文本流是垂直方向，元素从左到右堆叠

- 示例：[writing-mode与text-indent实现点击文字下沉](https://demo.cssworld.cn/12/2-5.php)

### direction
- 作用：同dir属性，改变文本流方向
- 取值：
  
  lrt：默认值，从左到右
  
  rtl：从右到左

- 局限性：只能改变图片、按钮顺序
- 改变文字顺序unicode-bidi

  含义：bidi是bidirectionality的简写，中文译为字符集双向性，即字符串方向混杂

  取值：
    
    normal：默认值
    
    embed：通常与normal表现一致，只能作用在内联元素上
    
    bidi-override：强制所有字符按direction设置的方向排列
