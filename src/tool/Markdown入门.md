---
title: Markdown入门
tags: 
- Markdown
---
# Markdown入门

MarkDown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。
<!--more-->

## MarkDown简介
### 目标
- 易读易写
- 兼容HTML

### 区块元素
- 段落和换行
- 标题
- 引用
- 列表
- 代码块
- 分隔线

### 区段元素
- 链接
- 强调
- 行内代码
- 图片

### 其他
- 自动链接
- 转义

## MarkDown语法
### 1. 标题
书写如下，

    ###### _标题六使用6个#
    #####  _标题五使用5个#
    ####   _标题四使用4个#
    ###    _标题三使用3个#
    ##     _标题二使用2个#
    #      _标题一使用1个#
效果如下，

  ###### _标题六使用6个#
  #####  _标题五使用5个#
  ####   _标题四使用4个#
  ###    _标题三使用3个#
  ##     _标题二使用2个#
  #      _标题一使用1个#

### 2. 引用
书写如下，

    >行首使用 '>'，即可构成区块引用
    >
    >This is a blockquote.This is a blockquote.This is a blockquote.
         
    >这是区块引用。
    >>内部使用了另一个区块引用。
    >
    >回到上个区块引用

效果如下，
>行首使用 '>'，即可构成区块引用
>
>This is a blockquote.This is a blockquote.This is a blockquote.

>这是区块引用。
>>内部使用了另一个区块引用。
>
>回到上个区块引用。

###  3. 列表

1. 无序列表

    书写如下，
    
        * red
        * green
        * blue
        + white
        + black
        + yellow
        - gray
        - orange
        - pink
    效果如下，
* red
* green
* blue
+ white
+ black
+ yellow
- gray
- orange
- pink

2. 有序列表

    书写如下，
    
        1. angry    
        2. happy
        3. sad
        1. amazing
        0. lazy
    
    效果如下，
    1. angry    
    2. happy
    3. sad
    1. amazing
    0. lazy

### 4. 代码块
    这是一个代码区块。
    代码区块从有缩进的一行开始，一直到没有缩进的一行结束。
    代码区块不认别任何语法，一切视为纯文本。

### 5. 分隔线
书写如下，

    ***
    ---
效果如下，
***
---

### 6. 链接

1. 行内式链接

    书写如下，
    
        [百度](http://www.baidu.com)
        [腾讯](http://www.tencent.com)
        [首页](/)
    效果如下，
    
    [百度](http://www.baidu.com)
    [腾讯](http://www.tencent.com)
    [首页](/)

2. 参考式链接

    书写如下，
    
        [个人][person]
        [Google][]
        [person]:  http://www.baidu.com
            (Hello,Welcome to my world!)
        [Google]: http://google.com
            (Welcome to access Google.)
    效果如下，
    
    [个人](http://www.baidu.com)
    [Google](http://google.com)
       
    **注意：链接辨别标签不区分大小写，比如person与PERSON是等价的。**
  
    *hexo不支持参考式链接，在这用行内式链接替代效果*    

###  7. 强调
书写如下，

    斜体：
    *斜体*
    _斜体_

    加粗：
    我在**强调**这两字。看到__强调__这两字了没。
效果如下，

斜体：
    *斜体*
    *斜体*

加粗：
    我在**强调**这两字。看到 __强调__ 这两字了没。

*hexo不支持下划线表示斜体，在这用星号替代效果*

### 8. 行内代码
书写如下，

    ``console.log(这是反引号`，用来标记行内代码。行内代码不认任何语法，一切视为纯文本。);``

效果如下，

``console.log(这是反引号`，用来标记行内代码。行内代码不认任何语法，一切视为纯文本。);``

### 9. 图片
1. 行内式图片链接

    书写如下，

        ![小程序](/miniapp.jpg)

    效果如下，

    ![小程序](/miniapp.jpg)

2. 参考式图片链接

    书写如下，
    
        ![公众号][officialAccount]

        [officialAccount]: /officialAccount.jpg "公众号"

    效果如下，

    ![公众号][officialAccount]

    [officialAccount]: /officialAccount.jpg "公众号"

### 10. 自动链接

书写如下，

    <http://www.baidu.com>

    <1234567890@163.com>

效果如下：

<http://www.baidu.com>

<1234567890@163.com>

### 11. 反斜杠

支持下面字符的转义，书写如下，

    \\ \` \_ \* \{ \} \[ \] \( \) \# \+ \- \. \!
效果如下：

\\ \` \_ \* \{ \} \[ \] \( \) \# \+ \- \. \!


## 学习链接

https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md
