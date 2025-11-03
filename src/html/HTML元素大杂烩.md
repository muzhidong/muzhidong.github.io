---
title: HTML元素大杂烩
tags: 
- HTML5
---

这篇文章带你详细学习常用的HTML标签，更好地运用它们。

## meta
用于配置文件信息。提供`name`、`content`、`http-equiv`、`charset`属性，其中`name`和`content`通常作为键值对搭配使用，`charset`用于指定文档的字符编码，`http-equiv`用于指定一个pragma指令，可以取值为内容安全策略`content-security-policy`、内容类型`content-type`、默认CSS样式`default-style`、用户代理兼容`x-ua-compatible`、页面刷新`refresh`，也可取值为`Cache-Control`或`Expires`等Http相关强缓存字段，此时`content`便是该缓存字段的值。

示例如下，
```html
<meta name="keywords" content="HTML5,语义化标签" />
<meta name="description" content="初学者写的第一张HTML5移动网页" />
<meta name="author" content="muzhidong" />
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0" />

<meta charset="utf-8" /> 

<!-- 只允许https资源被加载 -->
<meta http-equiv="content-security-policy" content="default-src https:">

<!-- 与<meta charset="utf-8" /> 写法等价 -->
<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<!-- 为x-ua-compatible时，必须包含IE=edge -->
<meta http-equiv="x-ua-compatible" content="IE=edge"/>

<!-- 首选样式表，content是本文档内某个style或link元素中的title值 -->
<meta http-equiv="default-style" content="reset">
<style title="reset">
  * {
    padding: 0;
    margin: 0;
  }
</style>

<!-- 为refresh时，content值固定格式为[重载间隔秒数(非负整数);url=重定向地址] -->
<meta http-equiv="refresh" content="3;url=https://www.baidu.com"/>

<!-- 页面不缓存 -->
<meta http-equiv="Cache-Control" content="max-age=0" />
<meta http-equiv="Expires" content="0">
```

## base
用于指定文档中所有相对url的基础url。提供href属性，表示文档中相对url的基础url，以及target属性，表示目标打开方式，可取值`_self`、`_blank`、`_parent`、`_top`。

> 当一个文档有多个base标签时，属性href和target的取值以第一次为准。

```html
<!-- href值为相对路径时，可以视为url路径的前缀，值为绝对路径时，此时可以当作url前半部分 -->
<!-- 该例表示文档内的相对url被访问时路径自动添加前缀abc/，并以新窗口打开 -->
<base href="./abc" target="_blank" />
```

## link
表示当前元素与扩展资源的关系。提供如下属性，
- rel

  表示链接资源与当前文档之间关系命名，多个关系用空格分隔。常见取值有`dns-prefetch`(表示浏览器会对该资源的域名先做解析)，`icon`，`stylesheet`，`preload`(表示该资源在页面加载完成后是即刻需要的，会在渲染前预加载，不阻塞渲染)，`prefetch`(表示该资源将来可能被需要，但由代理决定是否加载以及什么时候加载。一般是空闲时加载)，`modulepreload`，`pingback`，`preconnect`，`prerender`，具体介绍查阅[这里](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)。

  > prefetch与preload区别：用户从A页面进入B页面，preload会失效，而prefetch可以在B页面继续使用。

- href

  表示链接资源url

- type

  表示链接资源MIME类型

- as

  仅当`rel=preload`或`rel=prefetch`时设置有效，表示加载内容的类型。声明该属性起到匹配请求、为资源应用正确的CSP、为资源设置正确的accept请求头的作用，并有利于更精确资源加载优先级。取值如下，`script`、`style`、`document`、`image`、`font`、`audio`、`video`、`embed`、`fetch`、`object`、`track`、`worker`，每个类型被分别应用到哪些元素详见[这里](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attributes)。
    
- crossorigin

  设置请求资源时CORS方式。可取值`anonymous`和`use-credentials`，前者表示跨域请求时忽略凭证，后者则相反。

- media

  设置链接资源应用的媒体类型或媒体查询。

- title

  为链接指定语义。

- hreflang

  设置链接资源语言

- imagesizes

  仅当应用`rel="preload" as="image"`了有效，设置图片大小

- imagesrcset

  仅当应用`rel="preload" as="image"`了有效，设置图片来源

- integrity

  包含内联的元数据，浏览器会使用它验证加载的资源已正常被交付。该数据是该资源的一个base64编码的加密哈希值。

- referrerpolicy

  可参考a标签属性referrerpolicy介绍

- blocking

  表示获取该资源时哪些资源该被阻塞，目前可取值只有`render`，表示屏幕正渲染的内容会被阻塞。

  示例如下，
  ```html
  <!-- 关联网站图标 -->
  <link rel="icon" href="favicon.ico" />

  <!-- 当媒体设备是宽度不大于600像素的屏幕时关联样式表 -->
  <link
    href="mobile.css"
    rel="stylesheet"
    media="screen and (max-width: 600px)" />

  <!-- 预加载字体文件 -->
  <link
    rel="preload"
    href="myFont.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous" />
  ```

## ul
无序列表。一般与CSS属性`list-style`搭配，该属性是`list-style-image`、`list-style-position`、`list-style-type`三个属性的简写，分别表示列表项符号、列表项符号位置、列表符号类型。

`list-style-image`属性可取值为`none`、URL函数、渐变函数。

`list-style-position`属性可取值为`inside`，默认值，表示标记在列表内，或`outside`，标记在列表之外。

`list-style-type`属性可取值为`none`、`disc`、`circle`、`square`、`decimal`、`georgian`、`trad-chinese-informal`、`kannada`、[自定义计数样式](https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style)或字符串

示例如下，
```html
<style>
  .one {
    list-style: none;
  }
  .two {
    list-style: none inside "😊";
  }
  .three {
    list-style: url(./loading.gif) inside none;
  }
  .four {
    list-style: linear-gradient(to right bottom, red , blue) outside none;
  }
</style>
<ul class="one">
  <li>早上</li>
  <li>中午</li>
  <li>晚上</li>
</ul>
<ul class="two">
  <li>QQ</li>
  <li>微信</li>
  <li>淘宝</li>
  <li>微博</li>
</ul>
<ul class="three">
  <li>apple</li>
  <li>banana</li>
</ul>
<ul class="four">
  <li>QQ</li>
  <li>微信</li>
  <li>淘宝</li>
  <li>微博</li>
</ul>
```

## ol
有序列表，提供`reversed`、`start`、`type`属性，分别表示是否倒序展示，列表项开始数，数字类型，可取值A、a、i、I、1。

示例如下，
```html
<ol start="26" type="A" reversed>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>ECMAScript6</li>
  <li>JQuery</li>
  <li>Bootstrap</li>
  <li>Angular</li>
  <li>Vue</li>
  <li>React</li>
</ol>
```

## dl
描述列表。一般结构如下， 
```html
<dl>
  <dt>标题1</dt>
  <dd>描述1</dd>
  <dt>标题2，可选</dt>
  <dd>描述2</dd>
  <dt>标题3，可选</dt>
  <dd>描述3</dd>
</dl>
```

## a
超链接标签，有如下属性，
- href

  其值可以是一个站内或站外链接、或锚点链接(锚点在页面内时，值结构为`#锚点名称`，在页面外时，值结构为`文件#该文件中的锚点名称`，对应位置需声明`<a name="锚点名称"></a>`或`<xxx id="锚点名称"></xxx>`)、或脚本操作(以javascript:开头)、或电话、短信、邮件等其他scheme。

  ```html
  <!-- 快捷回到顶部 -->
  <a href="#">回到顶部</a>
  <!-- 打电话 -->
  <a href="tel:119"></a>
  <!-- 发短信 -->
  <a href="sms:10086,12580?body=hello"></a>
  <!-- 发邮件 -->
  <a href="mailto:123456@qq.com?subject=标题&body=正文内容"></a>
  <!-- 注意：a标签打电话、发短信、发邮件，只是唤起功能，真正操作依赖系统是否安装软件或支持，比如发邮件是否有响应取决于用户浏览器和电子邮件客户端是否支持mailto协议以及允许该协议的行为-->
  ```

  锚点定位除了基于URL地址锚链定位外，还有focus锚点定位，即可以被focus的按钮、输入框、单选框、复选框、文本区域等元素在被focus时发生的页面重定位现象，但二者差异如下：
  
  一是focus锚点定位是让元素在浏览器窗体范围内显示即可，不一定跟URL锚链定位一样都在上边缘

  二是URL地址锚链定位在当锚点目标元素和窗体同时可滚动时，会由内而外触发所有可滚动窗体的锚点定位行为，而focus锚点定位只触发锚点目标元素

- target

  目标打开方式。可取值为_self(默认值)、_blank、_parent、_top

- download

  可以没有值，或者值为文件名，若当中带有`/`或`\`，则自动化转化为`-`。只在同域下，又或者schemes是blob或data，该属性方才生效。

- ping

  值是一段空格分隔的url列表，当链接被点击时，浏览器会向这些url发送一个post请求。常用于跟踪。

- referrerpolicy

  发送资源请求时控制来源referrer请求头值。可取值`no-referrer`、`no-referrer-when-downgrade`、`origin`、`origin-when-cross-origin`、`same-origin`、`strict-origin`、`strict-origin-when-cross-origin`(默认值)，`unsafe-url`。具体每个值的介绍见[Here](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-referrerpolicy)

- rel

  指定当前文档与被链接文档的关系

- type

  指定url链接MIME类型


## img
图片标签，常见的属性有`alt`(图片无法显示时展示的文本)、`src`(图片路径)、`width`(图片显示宽度)、`height`(图片显示高度)、`crossorigin`(可取值`anonymous`和`use-credentials`，前者表示跨域请求时忽略凭证，后者则相反)。

> - img属性src不设为空
>  
>   原因：
>   - 重复请求：当img标签src属性为空串时，浏览器会将其视为当前页面路径，并尝试重新加载该页面作为图像内容，导致服务器接收到额外的、不必要的请求，增加服务器负担
>   - 用户体验下降：用户可能看到页面加载不完全或者闪烁，因为浏览器在处理这种空src属性的img标签时，会先显示一个占位符，然后在尝试加载失败后替换为其他内容
>   - 性能影响：由于浏览器尝试加载一个实际不存在的图像资源，可能引起额外的网络延迟，从而影响页面的加载性能
>   - 潜在的错误处理复杂性：服务器需要能够妥善处理这种意外的请求，否则可能会出现错误日志堆积、资源浪费甚至服务崩溃的情况
>
>   防范：
>   - 前端始终为img标签提供一个有效的src属性值，或者在使用js动态设置图像源之前，确保不会将空的src属性渲染到页面上
>   - 后端具备一定的健壮性，能够妥善处理各种异常情况

还有一些可能接触比较少的属性，列举如下，
- elementtiming

  表示该元素被标识，以便于[PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)对象跟踪

- loading

  图片加载方式。可取值`eager`和`lazy`，前者表示立即加载，无需考虑是否在可见视口范围内，默认值；后者表示懒加载，当其与视口接近特定距离时加载。

- srcset

  设置源。值结构有两种：
  
  `源url1 1x, 源url2 2x, ...`(x表示像素密度或设备像素比)

  `源url1 100w, 源url2 200w, ...`(w表示宽度，使用该方式时必须同时指定属性sizes，否则会被忽略)

  ```html
  <img
    src="logo.png"
    alt="Logo"
    srcset="logo@2x.png 2x,logo@3x.png 3x" />
  ```

  > 响应式图片3种处理方式
  >  - img标签设置srcset属性
  >
  >  - picture标签指定绑定多个source标签
  >  ```html
  >  <!-- 类似video/audio标签，允许嵌入多个source标签，指定多个源 -->
  >  <picture>
  >    <!-- source标签的width、height、sizes、srcset属性只用于picture标签，而src属性只用于video/audio标签 -->
  >    <source srcset='small.jpg' media='(max-width:375px)'></source>
  >    <source srcset='medium.jpg' media='(max-width:678px)'></source>
  >    <source srcset='big.jpg' media='(max-width:1024px)'></source>
  >    <!-- fallback -->
  >    <img src='big.jpg' />
  >  </picture>
  >  ```
  >
  >  - 使用svg标签

- sizes

  根据媒体查询条件设置源的大小
  
  值结构为：`(媒体查询条件1) 源尺寸1,(媒体查询条件2) 源尺寸2,...,源尺寸n`，最后一项不需要查询条件

  须与srcset配合使用，且srcset使用宽度w描述时，否则不起效。

  ```html
  <img
    src="logo.png"
    alt="Logo"
    srcset="logo@2x.png 375w, logo@3x.png 768w"
    sizes="(max-width: 768px) 375px, 768px" />
  ```

- referrerpolicy

  可参考a标签属性referrerpolicy介绍

- decoding

  告知浏览器图片以什么方式解码。默认值为`auto`，也可取值`sync`和`async`，表示同步或异步方式解码。

- ismap

  该属性仅在img元素作为带有有效href属性的a元素的孩子节点时允许被使用。表示图像是否是服务器端图像映射的一部分，若是，则点击图片的精准坐标时将会被发送到服务器

- usemap

  与元素关联的图片映射部分url，以#开头

## form
表单元素，具有如下属性，

- name

  指定表单名称

- accept-charset

  指定服务器接收的字符编码。多个用空格分隔，默认是当前文档字符集。

- autocomplete

  指定input元素是否自动补全默认值，可取值`on`、`off`

- action

  指定处理表单提交的url。当表单含有`<button></button>`、`<input type='submit' />`或`<input type='image' />`时，属性会被忽略，表单元素设置`method=dialog`也会被忽略

- method

  指定表单提交时http请求方式。可取值为`get`、`post`、`dialog`，也会如同`action`属性一样，出现上述情况会被忽略

- enctype

  当元素属性中有`method=post`时，指定表单提交时请求的MIME类型，可取值为`application/x-www-form-urlencoded`(默认值)、`multipart/form-data`(input元素出现file类型)、`text/plain`，也会如同`action`属性一样，出现上述情况会被忽略

- target

  表单提交时打开方式。可取值为_self(默认值)、_blank、_parent、_top。也会如同`action`属性一样，出现上述情况会被忽略

- novalidate

  提交时表单是否不做校验，默认是校验的。也会如同`action`属性一样，出现上述情况会被忽略

- rel

  控制表单创建的链接类型，了解更多见[传送门](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)


## input
输入元素。其属性type取值有很多，下面通过示例认识每种type可以应用哪些属性。
```html
<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>
 <form class="container" 
  id="formId"
  oninput="sum.value=(+a.value)+(+b.value)"
>
  <!-- 
    通俗易懂的属性不多介绍。

    属性readonly与属性disabled都是不可编辑，但readonly修饰的字段会被提交，而disabled修饰的字段不被提交

    属性form指定从属于某表单的表单id，布局灵活，可以不包含在form中，既脱离form，又保持从属关系

    属性autofocus表示页面加载时是否聚焦

    属性autocomplete表示是否自动补全默认值，可取值为on、off等，在苹果系统兼容性未知。取值比较多，可见https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values

    属性inputmode告知浏览器弹起键盘时使用哪种类型。可取值为none、text、tel、url、email、numeric、decimal、search。

    属性size表示控件初始大小，type为text或password时，使用em单位，type为其他值时，使用px单位，当该元素应用width样式时会被覆盖
  -->
  <input type="text" 
    name="textInput" 
    value="这是一个只读输入框"
    readonly
    form="formId"
    autocomplete="off"
    inputmode="text"
    size="20" />
  <input type="text" 
    placeholder="这是一个禁用输入框"
    disabled />
  <input type="text" 
    name="textInput2" 
    placeholder="这是一个必填输入框"
    autofocus
    required />

  <!-- 
    属性maxlength和minlength表示输入字符数的最值范围
    注：maxlength只能控制用户输入，但不能阻止JS写入
  -->
  <input type="password" name="password" maxlength="20" minlength="8" />

  <!-- 
    属性dirname定义元素方向名称，在表单提交时其值作为key，`ltr`或`rtl`当中一个作为value
    
    属性list指定搜索列表id，一般是datalist元素id
  -->
  <input type="search"
    name="sex" 
    dirname="searchDirName" 
    list="sexList"  >
  <datalist id="sexList">
    <option>男</option>
    <option>女</option>
    <option>未知</option>
  </datalist>

  <input type="tel" required name="phone" pattern="/\d{3-8}/g" />

  <input type="email" required name="mail" />

  <input type="url" required name="url" />

  <!-- 
    max和min表示数字型最值范围
  -->
  <input type="number" id="a" name="number" max="100" min="1" value="1" />

  <!-- 输入数值范围，提供一种滑动输入方式 -->
  <input type="range" id="b" name="range" step="10" min="0" max="100" value="10"/>
  <output name="sum" for="a b"></output>

  <input type="radio" name="radio"  checked />

  <input type="checkbox" name="checkbox" checked />

  <!-- 输入x年x月x日 -->
  <input type="date" name="date"/>

  <!-- 输入x年x月 -->
  <input type="month" name="month"/>

  <!-- 输入x年第x周 -->
  <input type="week" name="week"/>

  <!-- 输入x时x分x秒 -->
  <input type="time" name="time"/>

  <!-- 输入时分秒，含时区 -->
  <input type="datetime" name="datetime"/>

  <!-- 输入时分秒，不含时区 -->
  <input type="local-datetime" name="local-datetime"/>

  <!-- 
    accept表示接收文件的MIME类型
    capture表示捕获的媒体设备用途，可取值面向用户的`user`和面向环境的`environment`
    multiple表示文件是否可以多选
  -->
  <input type="file" 
    accept="image/jpeg,image/png" 
    capture="environment" 
    multiple
    name="file" />

  <input type="button" value="按钮" />

  <input type="submit" 
    formaction="https://www.baidu.com" 
    formmethod="post"
    formenctype="multipart/form-data"
    formtarget="_top" />
  <input type="reset" />

  <input type="hidden" name="hidden" value="hiddenValue" />

  <input type="image" 
    alt="图片加载失败时文字内容" 
    height="200" 
    width="200" 
    src="./loading.gif"
    name="image" />

  <input type="color" name="color" />

  <!-- 属性autocapitalize可取值off(none)、on(sentences)、words、characters，分别表示关闭自动大写、对句子首字母自动大写、对单词首字母自动大写、所有字符自动大写 -->
  <!-- 兼容性：PC Safari不支持 -->
  <input type="text" autocapitalize="off" />
</form>
```

## label
标签元素。for属性通过可标记的、表单相关的元素id标识与之关联，当以编程方式实现时使用`htmlFor`。

下面示例介绍点击文字选中选项的实现方式。
```html
<!-- 方式一：input标签设置id，label标签设置属性for，值与id相同 -->
<input type="radio" name="sex" id="man" />
<label for="man">男</label>
<!-- 方式二：label标签嵌入input标签 -->
<label>
  <input type="radio" name="sex">女
</label>
```

## select
选择元素，用于提供菜单选项。提供`autofocus`、`autocomplete`、`disabled`、`form`、`multiple`、`name`、`required`、`size`等与input元素相同的属性，不再介绍。注意当应用了`multiple`属性，需先按下指定按键才能进行多选，不同操作系统下对应的按键不一样，如mac系统下是command。

```html
<!-- 分组下拉菜单 -->
<select name="menu">
  <optgroup label="水果">
    <option selected value="列表值">西瓜</option>
    <option value="菠萝">菠萝</option>
    <option value="苹果">苹果</option>
  </optgroup>
  <optgroup label="蔬菜">
    <option value="白菜">白菜</option>
    <option value="冬瓜">冬瓜</option>
  </optgroup>
</select>

<!-- 滑动列表菜单 -->
<select name="list" size="2"  multiple>
  <option selected value="white">皮肤白</option>
  <option value="black">皮肤黑</option>
  <option value="green">皮肤绿</option>
  <option value="blue">皮肤蓝</option>
  <option value="red">皮肤红</option>
</select>
```

## textarea
多行文本框元素。除提供了`autocomplete`、`autofocus`、`disabled`、`form`、`maxlength`、`minlength`、`name`、`placeholder`、`readonly`、`required`等与input元素相同的属性外，还提供了特有属性如下，
- rows
  
  文本框可见行数。默认值为2。

- cols
  
  文本框可见宽度，以字符平均宽度为单位。默认值为20。

- spellcheck

  底层浏览器或操作系统是否对齐拼写检查，可取值`default`(可能通过父元素spellcheck属性决定)、`true`、`false`

- wrap

  当表单提交时值换行处理方式。可取值`soft`、`hard`。`soft`表示控件保证值所有换行是CR+LF对，但不会额外添加换行；`hard`表示控件会在超过属性cols值插入换行符，保证每行宽度不超过控件宽度，使用该值时必须指定`cols`属性，否则不起作用。


示例如下，
```html
<textarea cols="30" 
  rows="10" 
  spellcheck 
  wrap="hard" 
  form="formId"
  name="textarea"></textarea>
```

## fieldset与legend
fieldset元素常用于在表单内进行控件分组，提供`name`、`form`、`disabled`等属性。legend元素常用于给fieldset父元素定义内容标题。

示例如下，
```html
<fieldset>
  <legend>请选择性别：</legend>
  <input type="radio" name="sex" value="男">男&nbsp
  <input type="radio" name="sex" value="女" checked>女
</fieldset>
```

## embed
嵌入元素，可以嵌入外部资源。提供资源展示宽度`width`、资源展示高度`height`、资源url地址`src`、资源MIME类型`type`等属性。注意`width`和`height`只能取具体数值，不支持百分比；`type`不支持通配符*，如`image/*，也不能组合类型
```html
<embed 
  src="./loading.gif"
  type="image/gif"
  width="64" 
  height="64" />
```

## iframe
内嵌网页。会创建新的运行时，有自己的栈、堆、队列，与主网页运行时相互独立，互不影响。隐藏的iframe支持跨域便是利用了这个特点，但也存在不足：

  1.搜索引擎的检索程序无法解读有iframe的页面，不利于SEO

  2.iframe阻塞主页面的onload事件

  3.iframe和主页面共享连接池，而浏览器对相同的连接有限制，会影响页面的并行加载

  对于第2、3点，可以通过js选择合适时机动态给iframe设置src属性

提供如下属性，
- name

  嵌入的浏览器上下文目标名称。可作为`window.open`方法调用时的传入参数，表示窗口名称。

- height

  元素高度，默认150px

- width

  元素宽度，默认300px

- src

  内嵌网页url

- srcdoc

  嵌入html文档，会覆盖src属性。若浏览器不支持该属性，则退回到使用src属性

- sandbox

  译为沙箱，用于控制对iframe内容做的额外限制，默认是应用了所有限制。可以通过指定值去解除部分限制，多个值用空格分隔。提供的值有`allow-downloads`、`allow-forms`、`allow-orientation-lock`、`allow-modals`、`allow-popups`、`allow-popups-to-escape-sandbox`、`allow-presentation`、`allow-same-origin`、`allow-scripts`、`allow-top-navigation`、`allow-top-navigation-by-user-activation`、`allow-top-navigation-to-custom-protocols`，这些值的具体含义见[这里](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attributes)

- allow

  指定哪些设备访问权限在哪些域名下被允许。格式如`<directive> <allowlist>`，`directive`常见取值有摄像头`camera`、定位`geolocation`、全屏`fullscreen`、麦克风`microphone`等等，在苹果系统可能会有兼容性问题。

  该属性是在Permissions-Policy头指定策略基础上作进一步的限制，不会替换。

  关于Permissisons Policy介绍见[这里](https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy)

- allowfullscreen

  是否允许全屏，相当于`allow="fullscreen"`

- referrerpolicy

  可参考a标签属性referrerpolicy介绍

  ```html
  <iframe
    allow="geolocation 'self' http://localhost:52330"
    allowfullscreen
    width="600"
    name="subWindow"
    height="300"
    sandbox="allow-scripts allow-modals"
    src="https://www.baidu.com"
    srcdoc="<img src='./loading.gif' /><script>alert();</script>"></iframe>
  ```

## table
表格元素。直接上示例，认识两种常用的表格结构。
```html
<style>
  table {
    width: 100%;
    border: 1px solid black;
    box-sizing: border-box;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid black;
  }

  .fs18 {
    font-size: 18px;
  }

  .bold {
    font-weight: bold;
  }

  .red {
    color:red;
  }
</style>
<table>
  <!-- 标题 -->
  <caption>表格标题</caption>
  <!-- 表格头部 -->
  <thead>
    <tr>
      <th>头部1</th>
      <th>头部2</th>
      <th>头部3</th>
      <th>头部4</th>
    </tr>
  </thead>
  <!-- 表格内容 -->
  <tbody>
    <tr>
      <!-- 列、行合并数 -->
      <td colspan="2" rowspan="2">1.1</td>
      <td>1.2</td>
      <td>1.3</td>
      <td>1.4</td>
    </tr>
    <tr>
      <td>2.1</td>
      <td>2.2</td>
      <td>2.3</td>
      <td>2.4</td>
    </tr>
    <tr>
      <td>3.1</td>
      <td>3.2</td>
      <td>3.3</td>
      <td>3.4</td>
    </tr>
  </tbody>
  <!-- 表格底部 -->
  <tfoot>
    <tr>
      <td>底部1</td>
      <td>底部2</td>
      <td>底部3</td>
      <td>底部4</td>
    </tr>
  </tfoot>
</table>
<br/>
<table>
  <!-- 列组，可为某一列作一些定制 -->
  <colgroup>
    <!-- 列 -->
    <col span="1" class="fs18"/>
    <col span="1" class="bold"/>
    <col span="2" class="red" />
  </colgroup>
  <tr>
    <td>1.1</td>
    <td>1.2</td>
    <td>1.3</td>
    <td>1.4</td>
  </tr>
  <tr>
    <td>2.1</td>
    <td>2.2</td>
    <td>2.3</td>
    <td>2.4</td>
  </tr>
  <tr>
    <td>3.1</td>
    <td>3.2</td>
    <td>3.3</td>
    <td>3.4</td>
  </tr>
</table>
```

## 其他元素
上面介绍的元素是本人觉得比较重要，需要加强学习做的笔记。

下面通过一段代码简单认识下其他元素。
```html
<!-- 块引用元素。提供表示引用源属性cite。 -->
<blockquote cite="https://www.baidu.com">不懂就找百度</blockquote>

<!-- br与hr二者比较容易混淆，放一起介绍。首先都是单元素，br表示换行，hr表示水平线。 -->
换行了
<br />
水平线：
<hr />

<!-- 上标标签 -->
<p>
  <var>a<sup>2</sup></var> + 
  <var>b<sup>2</sup></var> = 
  <var>c<sup>2</sup></var>
</p>

<!-- 下标标签 -->
<p>CO<sub>2</sub></p>

<ul style="padding:10px;list-style:none;">
  <li>meter标签：
    <meter min="0" 
      max="10" 
      lower="2" 
      higher="8"
      optimum="7" 
      value="6"></meter>
  </li>
  <li>progress标签：
    <progress max="100"
      value="80"></progress>
  </li>
  <li>mark标签：
    <mark>做个标记</mark>
  </li>
  <li>hgroup标签：
    <hgroup>
      <h1>用于</h1>
      <h2>包含</h2>
      <h3>h1、h2、h3、h4、h5、h6</h3>
      <h4>等</h4>
      <h5>标题</h5>
      <h6>标签</h6>
    </hgroup>
  </li>
  <li>details标签：
    <details>详情标签是块标签</details>
  </li>
  <li>dialog标签：
    <dialog open>
      <h3>这是一个对话框</h3>
      <p>通过open属性打开的是非对话框，建议通过<code>HTMLDialogElement.showModal()</code>方式打开</p>
    </dialog>
  </li>
  <li>summary标签：
    <summary>summary元素是块标签</summary>
  </li>
  <li>time标签：
    <time datetime="2023-03-10T03:00:00">03:00</time>
  </li>
</ul>
```
