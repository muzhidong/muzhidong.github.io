(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{415:function(a,t,e){"use strict";e.r(t);var s=e(31),r=Object(s.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("p",[a._v("了解hexo，有利于让我们更好地使用好它。")]),a._v(" "),e("h3",{attrs:{id:"hexo建站项目结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hexo建站项目结构"}},[a._v("#")]),a._v(" hexo建站项目结构")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('|--_config.yml       网站配置\n|--package.json      \n|--scaffolds         存放模板。这些模板是在新建文章等文件时默认填充的内容\n|--source            存放资源。除_post文件夹外，开头命名为_的文件(夹)和隐藏的文件会忽略。打包时md和html文件会被解析到public文件夹，而其他文件会被拷贝过去。\n   |--_drafts        草稿\n   |--_posts         文章\n   |-- ...           自定义页面类型\n|--themes            主题文件夹，详见"hexo主题项目结构"部分\n')])])]),e("h3",{attrs:{id:"hexo指令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hexo指令"}},[a._v("#")]),a._v(" hexo指令")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("hexo init [folder]                     新建网站\nhexo new [layout] <title>              新建一篇文章或页面，layout可取值post或page，比如新建一个tag页面，hexo new page tag\nhexo generate/g [-w]                   生成打包的网站文件，选项w表示监视文件变动 \nhexo publish [layout] <filename>       发表草稿\nhexo server/s [-p] [-l ]               启动服务器，选项p表示重设端口，选项l表示启动日记记录\nhexo deploy/d                          部署网站\nhexo render <file1> [file2] ... [-o ]  渲染文件，选项o表示设置输出路径\nhexo migrate <type>                    从其他博客系统迁移内容\nhexo clean                             清除缓存文件和已打包的网站文件\nhexo list                              列出网站资料\nhexo version                           显示hexo版本\nhexo --config custom.yml               自定义配置文件的路径\nhexo --draft                           显示source/_drafts文件夹中的草稿文章\nhexo --cwd /path/to/cwd                自定义当前工作目录的路径\n")])])]),e("h3",{attrs:{id:"hexo主题项目结构及其应用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hexo主题项目结构及其应用"}},[a._v("#")]),a._v(" hexo主题项目结构及其应用")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("|-_config.yml                    主题配置文件，更改内容不必重启服务器\n|-languages                      存放各国语言对应资源，用于国际化，文件格式可以是json或yml\n|-layout                         存放布局，比如主题模板文件，决定网站内容呈现方式\n  |-partial                      存放模板，如header\\footer等，引用如<%- partial('partial/header',{partialVariable:value,...}) %>\n                                 若主题过于复杂，可对局部使用缓存，优化后的引用如<%- fragment_cache('header',fucntion(){return \"<header></header>\"}) %>，同时，<%- partial('header', {partialVariable:value,...}, {cache: true});\n  |-layout                       默认布局，如<!DOCTYPE html><html><body><%- body %></body></html>\n  |-index\n  |-post    [回调index]\n  |-page    [回调index]\n  |-archive [回调index]\n  |-category[回调archive] \n  |-tag     [回调archive]\n|-scripts                        存放脚本，启动时会载入文件夹中的js文件\n|-source                         存放资源，除模板以外的asset，如css、js文件等，其中文件或文件夹以_开头、隐藏的文件会被忽略，其余则拷贝到public文件夹\n")])])]),e("p",[a._v("如何应用主题呢？")]),a._v(" "),e("p",[a._v("1.下载你喜欢的主题代码，复制到themes文件夹下")]),a._v(" "),e("p",[a._v("2.更改_config.yml网站配置")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("theme: 你的主题名称\n")])])]),e("p",[a._v("当然，如果你不屑于别人的风格，可以自定义一套，具体操作见"),e("a",{attrs:{href:"https://hexo.io/zh-cn/docs/themes",target:"_blank",rel:"noopener noreferrer"}},[a._v("自定义主题"),e("OutboundLink")],1)]),a._v(" "),e("h3",{attrs:{id:"hexo提供的全局变量"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hexo提供的全局变量"}},[a._v("#")]),a._v(" hexo提供的全局变量")]),a._v(" "),e("h4",{attrs:{id:"网站变量"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#网站变量"}},[a._v("#")]),a._v(" 网站变量")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("site                 网站\n   site.posts        所有文章\n   site.pages        所有分页\n   site.categories   所有分类\n   site.tags         所有标签\n")])])]),e("h4",{attrs:{id:"页面变量"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#页面变量"}},[a._v("#")]),a._v(" 页面变量")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("page                 当前页面，设定内容、front-matter\n   page.title        页面标题\n   page.date         页面建立日期（Moment.js对象）\n   page.updated      页面跟新日期（Moment.js对象）\n   page.comments     留言是否开启\n   page.layout       布局名称\n   page.content      页面的完整内容\n   page.excerpt      页面摘要\n   page.more         除页面摘要的其余内容\n   page.source       页面原始路径\n   page.full_source  页面的完整原始路径\n   page.path         页面网址（不含根路径），通常在主题中使用url_for(page.path)\n   page.permalink    页面的完整网址\n   page.prev         上一个页面，若为第一个页面则为null\n   page.next         下一个页面，若为最后一个页面则为null\n   page.raw          文章的原始内容\n   page.photos       文章的照片(用于相簿)\n   page.link         文章的外部链接(用于链接文章)\n")])])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("post                 文章，和page布局类似，但新增以下变量，\n   page.published    文章是否发布\n   page.categories   文章的分类\n   page.tags         文章的标签\n")])])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('index                首页\n   page.per_page     每页显示的文章数量\n   page.total        总文章数\n   page.current      目前页数\n   page.current_url  目前分页的网址\n   page.posts        本页文章\n   page.prev         上一页的页数，若为第一页则为0\n   page.prev_link    上一页的网址，若为第一页则为""\n   page.next         下一页的页数，若为最后一页则为0\n   page.next_link    下一页的网址，若为最后一页则为""\n   page.path         当前页面的路径（不含根目录），通常在主题中使用url_for(page.path)\n')])])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("archive              与首页布局相同，但新增以下变量，\n   page.archive      true\n   page.year         年份归档（4位）\n   page.month        月份归档（2位）\n")])])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("category             与首页布局相同，但新增以下变量，\n   page.category     分类名称\n")])])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("tag                  与首页布局相同，但新增以下变量，\n   page.tag          标签名称\n")])])]),e("h4",{attrs:{id:"其他变量"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他变量"}},[a._v("#")]),a._v(" 其他变量")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("config  网站配置\ntheme   主题配置\n_       Lodash函数库\npath    当前页面路径\nurl     当前页面网址\nenv     环境变量\n")])])]),e("h3",{attrs:{id:"hexo提供的辅助函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hexo提供的辅助函数"}},[a._v("#")]),a._v(" hexo提供的辅助函数")]),a._v(" "),e("h4",{attrs:{id:"网址类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#网址类"}},[a._v("#")]),a._v(" 网址类")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("url_for(path)              为路径加上根路径\nrelative_url(from,to)      获取与from相对的to路径\ngravatar(email[,options])  插入Gravatar图片.options可以是一个数字，表示大小，是一个对象，则转换为查询字符串\n")])])]),e("h4",{attrs:{id:"html标签类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#html标签类"}},[a._v("#")]),a._v(" HTML标签类")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("css(path,...)                    载入css。path可以是数组、字符串\njs(path,...)                     载入js。path可以是数组、字符串\nlink_to(path[,text][,options])   插入链接。options ={external:,class:,id:,}\nmail_to(path[,text][,options])   插入邮箱链接。options ={class:,id:,subject:,cc:,bcc:,body:,}\nimage_tag(path[,options])        插入图片。options={alt:,class:,id:,width:,height:,}\nfavicon_tag(path)                插入favicon\nfeed_tag(path[,options])         插入feed链接。options ={title:,type:,}\n")])])]),e("h4",{attrs:{id:"条件函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#条件函数"}},[a._v("#")]),a._v(" 条件函数")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("is_current(path[,strict])        检查path是否符合目前页面的网址\nis_home()                        是否为首页\nis_post()                        是否为文章\nis_archive()                     是否为存档页面\nis_year()                        是否为年度归档页面\nis_month()                       是否为月度归档页面\nis_category([category])          是否为分类归档页面，若有参数是否为指定分类\nis_tag([tag])                    是否为标签归档页面，若有参数是否为指定标签\n")])])]),e("h4",{attrs:{id:"字符串处理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#字符串处理"}},[a._v("#")]),a._v(" 字符串处理")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("trim(str)                        清除字符串开头和结尾的空格\nstrip_html(str)                  清除字符串中的html标签\ntitlecase(str)                   将字符串转换为正确的Title case\nmarkdown(str)                    使用md解析字符串\nrender(str,engine[,options])     解析字符串\nword_wrap(str[,len])             使每行字符串长度不超len,预设为80                        \ntruncate(text,len)               删除超过len的字符串\n")])])]),e("h4",{attrs:{id:"模板"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#模板"}},[a._v("#")]),a._v(" 模板")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("partial(layout[,locals][,options])    载入其他模板文件\nfragment_cache(id,fn)                 局部缓存。存储局部内容，下次使用时直接使用缓存\n")])])]),e("h4",{attrs:{id:"日期与时间"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#日期与时间"}},[a._v("#")]),a._v(" 日期与时间")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("date(date[,format])              插入格式化的日期\ndate_xml(date)                   插入xml格式的日期\ntime(date[,format])              插入格式化的时间\nfull_date(date[,format])         插入格式化的日期和时间\nmoment                           Moment.js函数库\n")])])]),e("h3",{attrs:{id:"列表"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#列表"}},[a._v("#")]),a._v(" 列表")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("list_categories([options])       插入分类列表。options={orderby:,order:,show_count:,style:,separator:,depth:,class:,transform:,}\nlist_tags([options])             插入标签列表。options = {orderby:,order:,show_count:,style:,separator:,class:,transform:,amount:,}\nlist_archives([options])         插入归档列表。options ={type:,order:,show_count:,format:,style:,separator:,class:,transform:,}  \nlist_posts([options])            插入文章列表。options = {orderby:,oredr:,style:,separator:,class:,amount:,transform:,}\ntagcloud([tags][,options])       插入标签云。options ={min_font:,max_font:,unit:,amount:,orderby:,order:,color:,start_color:,end_color:,}\n")])])]),e("h4",{attrs:{id:"其他"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[a._v("#")]),a._v(" 其他")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("paginator(options)               插入分页链接。options ={base:,format:,total:,current:,prev_text:,next_text:,sapce:,prev_next:,end_size,mid_size:,show_all:,} \nsearch_form(options)             插入google搜索框。options ={class【表单的class name】:,text【搜索提示文字】:,button【是否显示搜索按钮】:,}\nnumber_format(num[,options])     格式化数字。options = {precision[数字精度]:,delimiter[千位数分隔符号]:,separator[整数和小数分隔符号]:,}\nopen_graph([options])            插入open graph资源。options ={title:,tpye:,url:,image:,site_name:,description:,twitter_card:,twitter_id:,twitter_site:,google_plus:,fb_admins:,fb_app_id:,}\ntoc(str[,options])               解析内容中标题标签并插入目录。options = {class[Class名称]:toc,list_number[显示编号]:true}\n")])])]),e("h3",{attrs:{id:"hexo插件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hexo插件"}},[a._v("#")]),a._v(" hexo插件")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("脚本插件形式")]),a._v(" "),e("p",[a._v("将写好的脚本放到scripts文件夹下，启动时自动载入")])]),a._v(" "),e("li",[e("p",[a._v("包插件形式")]),a._v(" "),e("p",[a._v("在node_modules新建文件夹，文件夹名称以hexo-开头，保证hexo启动时载入。文件夹至少需包含index.js和package.json两个文件，一个是主程序，一个是描述插件的用途和依赖的插件，需包含name\\version\\main属性")])])]),a._v(" "),e("h3",{attrs:{id:"写在最后"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#写在最后"}},[a._v("#")]),a._v(" 写在最后")]),a._v(" "),e("p",[a._v("技术总是在迭代，直接上"),e("a",{attrs:{href:"https://hexo.io/zh-cn/",target:"_blank",rel:"noopener noreferrer"}},[a._v("官网"),e("OutboundLink")],1),a._v("学习才是最好的，上面的笔记可以作为关注的主要方向进行参考啦！！！")])])}),[],!1,null,null,null);t.default=r.exports}}]);