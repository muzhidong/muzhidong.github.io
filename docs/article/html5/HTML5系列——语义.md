---
title: HTML5系列——语义
tags: 
- HTML5
---

介绍 HTML 语义化前，先回顾下 HTML 知识吧！

## 标准结构

现在绝大多数前端开发都是使用下面的结构。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>
<body>

</body>
</html>
```

> **DOCTYPE 是文档类型(document type)的简写，告知浏览器使用什么文档标准(这里是使用 HTML 文档标准)解析该文档。** 浏览器会根据 DOCTYPE 定义的 DTD(文档类型定义)解释页面代码并显示。所以要建立符合标准的网页，DOCTYPE 的声明是必不可少的关键组成部分。若 DOCTYPE 不存在或格式不正确，文档将以兼容模式呈现，即页面以宽松向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。而使用标准模式，其排版和 JS 运作模式以该浏览器支持的最高标准运行。

## 注释

以\<!--为前缀，以-->为后缀，即可对包裹内容进行注释。

> 提问：CSS、JS 的注释又是怎样的？我们常见的注释有\/ /、\/\* \*/这两种，CSS 只支持第一种，JS 两者均支持。

## 全局属性

### 怎么理解全局？

一是对所有元素都适用，包括无效的元素。比如下面的 my 元素是一个无效元素，但 hidden 属性仍对其适用生效。

```HTML
<my hidden>我</my>
```

二是全局属性可能对一些元素不起作用。比如下面的 class 属性不能对 head 元素起任何作用。

```HTML
<head class="red"></head>
```

### 常见全局属性有哪些呢？

- xml:lang

  从 XHTML 规范继承，为了兼容而被保留。

- id

  定义唯一标识符。

* class

  一个以空格分隔的元素的类名列表。

* style

  应用于元素的 CSS 样式声明。

- dir

  一个指示元素中文本方向的枚举属性。取值有 ltr、rtl、auto。ltr 表示文字从左到右书写，rtl 表示文字从右到左书写，auto 表示由用户代理决定文字方向。

- title

  表示与其所属元素相关信息的文本。

- lang

  定义元素的语言。它的优先级比 xml:lang 小。

- accessKey

  提供了为当前元素生成键盘快捷键的提示。这个属性由空格分隔的字符列表组成。浏览器应该使用在计算机键盘布局上存在的第一个。

- tabindex

  整数属性，表示元素是否可以可聚焦，是否应该参与顺序键盘导航，如果是，则表示哪个位置。它可能需要几个值：

  负值表示该元素是可聚焦的，但不应通过顺序键盘导航到达;

  0 表示元素可以通过顺序键盘导航进行聚焦和访问，但其相对顺序由平台约定定义;

  正值表示元素可以通过顺序键盘导航进行聚焦和访问。元素聚焦的顺序是 tabindex 的增加值，如果多个元素共享相同的 tabindex，则它们的相对顺序遵循它们在文档中的相对位置。

HTML5 出现后，我们常用到的全局属性有如下，

- contenteditable

  表示元素是否可被用户编辑。

- data-\*

  自定义数据属性，它赋予我们在所有 HTML 元素上嵌入自定义数据属性的能力，在 JS 脚本中可以通过 HTMLElement.dataset 访问。

- hidden

  表示是否隐藏元素，等同于 display:none。

- draggable

  表示是否可以使用拖拽 API 去拖动元素。

[传送门——全局属性完整介绍](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)

## 主流元素分类

- 根元素

  html

- 元数据元素

  head、base、meta、title、link、style

- 分区元素

  body、header、footer、aside、main、nav、section、article、h1~h6、hgroup、address

- 块文本元素

  div、p、ol、ul、li、dd、dl、dt、hr、blockquote、figcaption、figure

- 内联文本元素

  a、span、br、abbr、cite、code、small、time、bdi、bdo、data、dfn、kbd、mark、q、rb、rp、rt、rtc、ruby、samp、u、var、wbr

- 媒体元素

  audio、img、video、map、track、area

- 内嵌元素

  embed、iframe、object、param、picture、source

- 脚本元素

  canvas、script、noscript

- 编辑标识元素

  del、ins

- 表格元素

  table、caption、thead、tbody、tfoot、tr、th、td、colgroup、col

- 表单元素

  form、label、input、button、select、datalist、optgroup、option、textarea、fieldset、legend、meter、output、progress

- 交互元素

  details、dialog、menu、summary

- Web 组件

  template、slot

> 上面当中有一些是语义化元素，推荐使用。首先，搜索引擎爬虫时依赖于HTML元素，确定上下文和各关键字权重，利于SEO；其次，便于更多设备如屏幕阅读器、盲人阅读器等解析；最后，网页结构清晰，开发者更容易将网站分块，利于开发维护。

## 转义字符

|空格	  |版权号 |<   |>	  |"	 | &	 |  注册商标|
|------|------|----|----|----|-----|---------|
|&nbsp |&copy	|&lt |&gt	| &quot | &amp |	&reg|

## 语义化

HTML是面向文档的，非面向文档中的数据，所以文档中的数据是无法被搜索引擎直接访问。而网页标注，恰好能让搜索引擎抓取到数据，利于SEO，让用户更容易准确搜索到想要的信息。以上便是语义化的由来和作用。

语义化技术较知名的有RDFa、Microformats和Microdata，下面简单认识下这三种技术。

### RDFa

译为资源描述框架属性。

阮一峰老师博文上提到，根据RDF的定义，资源本身是主语，属性名称是谓语，属性值是宾语。对网络资源的描述就采用主-谓-宾的形式。比如，

```XML
<rdf:Description dc:title="这是我的标题" />
```

> rdf:Description是主语，表示资源，属性dc:title是谓语，属性值表示宾语

### Microformats
译为微格式，通过类名进行语义化。若某个元素带有以h-为前缀的类名，说明创建了一个微格式对象，其子元素有以p-、u-、dt-或e-为前缀的类名，则该对象有哪些属性。这里摘抄MDN的一个示例，

```HTML
<div class="h-card">
  <a 
    class="p-name u-url"
    href="http://blog.lizardwrangler.com/" 
  >Mitchell Baker</a> 
  (<a 
    class="p-org h-card" 
    href="http://mozilla.org/"
  >Mozilla Foundation</a>)
</div>
```

语义解析出来的JSON内容如下，

```JSON
{
  "items": [{ 
    "type": ["h-card"],
    "properties": {
      "name": ["Mitchell Baker"],
      "url": ["http://blog.lizardwrangler.com/"],
      "org": [{
        "value": "Mozilla Foundation",
        "type": ["h-card"],
        "properties": {
          "name": ["Mozilla Foundation"],
          "url": ["http://mozilla.org/"]
        }
      }]
    }
  }]
}
```

> 可以发现，使用微格式，所有浏览器都是支持的，但是容易与我们定义的CSS类名起冲突。

### Microdata
译为微数据。使用支持的词汇表描述项目和键值对，以便为其属性赋值。与使用RDFa和微格式相比，微数据试图提供一种机器可读标签去注释HTML元素的简单方法。微数据借助了HTML5.2新定义的几个全局属性，分别如下，

- itemid
  
  数据项的全局唯一标识符

- itemscope 

  数据项的词汇表范围，也是数据项的开始位置

- itemtype

  定义itemprop使用的词汇表URL

- itemprop
  
  数据项的属性。一般属性值是元素标签里的文本，但拥有src或href属性的元素，其值为url，这些元素有img、audio、video、source、embed、iframe、a、area、link、object。另外，time元素取自datetime属性，meta元素取自content属性

示例如下，
```HTML
<div itemscope itemtype="http://schema.org/SoftwareApplication">

  <span itemprop="name">Angry Birds</span> -REQUIRES <span itemprop="operatingSystem">ANDROID</span>
  <br>

  <link itemprop="applicationCategory" href="http://schema.org/GameApplication"/>

  <div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
    RATING:
    <span itemprop="ratingValue">4.6</span> (
    <span itemprop="ratingCount">8864</span> ratings )
  </div>

  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    Price: $<span itemprop="price">1.00</span>
    <meta itemprop="priceCurrency" content="USD" />
  </div>
</div>
```

语义解析结果：

    Angry Birds - REQUIRES ANDROID
    RATING: 4.6 ( 8864 ratings )
    Price: $1.00

[传送门——Schema.org 中文站](https://www.schema.org.cn/docs/getstarted.html)

<br/>
最后，介绍上面这几种语义化技术，意在说明HTML5在语义方面上是下了功夫的，即提供了许多语义化标签，这些标签是对搜索引擎检索出来的结果进行统计而定制出来的的常用词。

语义话标签作用不止于语义化，在用户可访问性、代码可读性和可维护性方面也提供了一定的帮助。

## 参考

- [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

- [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

- [https://www.douban.com/group/topic/23046807/](https://www.douban.com/group/topic/23046807/)

- [https://developer.mozilla.org/en-US/docs/Web/HTML/microformats](https://developer.mozilla.org/en-US/docs/Web/HTML/microformats)

- [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Microdata](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Microdata)

- [http://www.ruanyifeng.com/blog/2008/02/rdf.html](http://www.ruanyifeng.com/blog/2008/02/rdf.html)
