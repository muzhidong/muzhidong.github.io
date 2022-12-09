---
title: Hexo基础
tags: 
- hexo
---
# Hexo基础

了解hexo，有利于让我们更好地使用好它。

### hexo建站项目结构
```
|--_config.yml       网站配置
|--package.json      
|--scaffolds         存放模板。这些模板是在新建文章等文件时默认填充的内容
|--source            存放资源。除_post文件夹外，开头命名为_的文件(夹)和隐藏的文件会忽略。打包时md和html文件会被解析到public文件夹，而其他文件会被拷贝过去。
   |--_drafts        草稿
   |--_posts         文章
   |-- ...           自定义页面类型
|--themes            主题文件夹，详见"hexo主题项目结构"部分
```

### hexo指令
```
hexo init [folder]                     新建网站
hexo new [layout] <title>              新建一篇文章或页面，layout可取值post或page，比如新建一个tag页面，hexo new page tag
hexo generate/g [-w]                   生成打包的网站文件，选项w表示监视文件变动 
hexo publish [layout] <filename>       发表草稿
hexo server/s [-p] [-l ]               启动服务器，选项p表示重设端口，选项l表示启动日记记录
hexo deploy/d                          部署网站
hexo render <file1> [file2] ... [-o ]  渲染文件，选项o表示设置输出路径
hexo migrate <type>                    从其他博客系统迁移内容
hexo clean                             清除缓存文件和已打包的网站文件
hexo list                              列出网站资料
hexo version                           显示hexo版本
hexo --config custom.yml               自定义配置文件的路径
hexo --draft                           显示source/_drafts文件夹中的草稿文章
hexo --cwd /path/to/cwd                自定义当前工作目录的路径
```

### hexo主题项目结构及其应用

```
|-_config.yml                    主题配置文件，更改内容不必重启服务器
|-languages                      存放各国语言对应资源，用于国际化，文件格式可以是json或yml
|-layout                         存放布局，比如主题模板文件，决定网站内容呈现方式
  |-partial                      存放模板，如header\footer等，引用如<%- partial('partial/header',{partialVariable:value,...}) %>
                                 若主题过于复杂，可对局部使用缓存，优化后的引用如<%- fragment_cache('header',fucntion(){return "<header></header>"}) %>，同时，<%- partial('header', {partialVariable:value,...}, {cache: true});
  |-layout                       默认布局，如<!DOCTYPE html><html><body><%- body %></body></html>
  |-index
  |-post    [回调index]
  |-page    [回调index]
  |-archive [回调index]
  |-category[回调archive] 
  |-tag     [回调archive]
|-scripts                        存放脚本，启动时会载入文件夹中的js文件
|-source                         存放资源，除模板以外的asset，如css、js文件等，其中文件或文件夹以_开头、隐藏的文件会被忽略，其余则拷贝到public文件夹
```

如何应用主题呢？

1.下载你喜欢的主题代码，复制到themes文件夹下

2.更改_config.yml网站配置

```
theme: 你的主题名称
```

当然，如果你不屑于别人的风格，可以自定义一套，具体操作见[自定义主题](https://hexo.io/zh-cn/docs/themes)


### hexo提供的全局变量

#### 网站变量

```
site                 网站
   site.posts        所有文章
   site.pages        所有分页
   site.categories   所有分类
   site.tags         所有标签
```

#### 页面变量

```
page                 当前页面，设定内容、front-matter
   page.title        页面标题
   page.date         页面建立日期（Moment.js对象）
   page.updated      页面跟新日期（Moment.js对象）
   page.comments     留言是否开启
   page.layout       布局名称
   page.content      页面的完整内容
   page.excerpt      页面摘要
   page.more         除页面摘要的其余内容
   page.source       页面原始路径
   page.full_source  页面的完整原始路径
   page.path         页面网址（不含根路径），通常在主题中使用url_for(page.path)
   page.permalink    页面的完整网址
   page.prev         上一个页面，若为第一个页面则为null
   page.next         下一个页面，若为最后一个页面则为null
   page.raw          文章的原始内容
   page.photos       文章的照片(用于相簿)
   page.link         文章的外部链接(用于链接文章)
```

```
post                 文章，和page布局类似，但新增以下变量，
   page.published    文章是否发布
   page.categories   文章的分类
   page.tags         文章的标签
```

```
index                首页
   page.per_page     每页显示的文章数量
   page.total        总文章数
   page.current      目前页数
   page.current_url  目前分页的网址
   page.posts        本页文章
   page.prev         上一页的页数，若为第一页则为0
   page.prev_link    上一页的网址，若为第一页则为""
   page.next         下一页的页数，若为最后一页则为0
   page.next_link    下一页的网址，若为最后一页则为""
   page.path         当前页面的路径（不含根目录），通常在主题中使用url_for(page.path)
```

```
archive              与首页布局相同，但新增以下变量，
   page.archive      true
   page.year         年份归档（4位）
   page.month        月份归档（2位）
```

```
category             与首页布局相同，但新增以下变量，
   page.category     分类名称
```

```
tag                  与首页布局相同，但新增以下变量，
   page.tag          标签名称
```

#### 其他变量

```
config  网站配置
theme   主题配置
_       Lodash函数库
path    当前页面路径
url     当前页面网址
env     环境变量
```

### hexo提供的辅助函数

#### 网址类

```
url_for(path)              为路径加上根路径
relative_url(from,to)      获取与from相对的to路径
gravatar(email[,options])  插入Gravatar图片.options可以是一个数字，表示大小，是一个对象，则转换为查询字符串
```

#### HTML标签类

```
css(path,...)                    载入css。path可以是数组、字符串
js(path,...)                     载入js。path可以是数组、字符串
link_to(path[,text][,options])   插入链接。options ={external:,class:,id:,}
mail_to(path[,text][,options])   插入邮箱链接。options ={class:,id:,subject:,cc:,bcc:,body:,}
image_tag(path[,options])        插入图片。options={alt:,class:,id:,width:,height:,}
favicon_tag(path)                插入favicon
feed_tag(path[,options])         插入feed链接。options ={title:,type:,}
```

#### 条件函数

```
is_current(path[,strict])        检查path是否符合目前页面的网址
is_home()                        是否为首页
is_post()                        是否为文章
is_archive()                     是否为存档页面
is_year()                        是否为年度归档页面
is_month()                       是否为月度归档页面
is_category([category])          是否为分类归档页面，若有参数是否为指定分类
is_tag([tag])                    是否为标签归档页面，若有参数是否为指定标签
```

#### 字符串处理

```
trim(str)                        清除字符串开头和结尾的空格
strip_html(str)                  清除字符串中的html标签
titlecase(str)                   将字符串转换为正确的Title case
markdown(str)                    使用md解析字符串
render(str,engine[,options])     解析字符串
word_wrap(str[,len])             使每行字符串长度不超len,预设为80                        
truncate(text,len)               删除超过len的字符串
```

#### 模板

```
partial(layout[,locals][,options])    载入其他模板文件
fragment_cache(id,fn)                 局部缓存。存储局部内容，下次使用时直接使用缓存
```

#### 日期与时间

```
date(date[,format])              插入格式化的日期
date_xml(date)                   插入xml格式的日期
time(date[,format])              插入格式化的时间
full_date(date[,format])         插入格式化的日期和时间
moment                           Moment.js函数库
```

### 列表

```
list_categories([options])       插入分类列表。options={orderby:,order:,show_count:,style:,separator:,depth:,class:,transform:,}
list_tags([options])             插入标签列表。options = {orderby:,order:,show_count:,style:,separator:,class:,transform:,amount:,}
list_archives([options])         插入归档列表。options ={type:,order:,show_count:,format:,style:,separator:,class:,transform:,}  
list_posts([options])            插入文章列表。options = {orderby:,oredr:,style:,separator:,class:,amount:,transform:,}
tagcloud([tags][,options])       插入标签云。options ={min_font:,max_font:,unit:,amount:,orderby:,order:,color:,start_color:,end_color:,}
```

#### 其他

```
paginator(options)               插入分页链接。options ={base:,format:,total:,current:,prev_text:,next_text:,sapce:,prev_next:,end_size,mid_size:,show_all:,} 
search_form(options)             插入google搜索框。options ={class【表单的class name】:,text【搜索提示文字】:,button【是否显示搜索按钮】:,}
number_format(num[,options])     格式化数字。options = {precision[数字精度]:,delimiter[千位数分隔符号]:,separator[整数和小数分隔符号]:,}
open_graph([options])            插入open graph资源。options ={title:,tpye:,url:,image:,site_name:,description:,twitter_card:,twitter_id:,twitter_site:,google_plus:,fb_admins:,fb_app_id:,}
toc(str[,options])               解析内容中标题标签并插入目录。options = {class[Class名称]:toc,list_number[显示编号]:true}
```

### hexo插件

- 脚本插件形式

	将写好的脚本放到scripts文件夹下，启动时自动载入

- 包插件形式

	在node_modules新建文件夹，文件夹名称以hexo-开头，保证hexo启动时载入。文件夹至少需包含index.js和package.json两个文件，一个是主程序，一个是描述插件的用途和依赖的插件，需包含name\version\main属性


### 写在最后

技术总是在迭代，直接上[官网](https://hexo.io/zh-cn/)学习才是最好的，上面的笔记可以作为关注的主要方向进行参考啦！！！

