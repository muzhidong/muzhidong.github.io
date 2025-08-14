---
title: SEO初识
tags: 
- SEO
---

# SEO初识
Search Engine Optimization，中译为搜索引擎优化，提高网站在搜索引擎中的排名和流量。下面介绍SEO常见手段。

## tdk
tdk表示网页meta中的title、description、keyword，合理地设置内容

## robots.txt
网站所有者使用robots.txt文件向网络机器人提供有关其网站的说明，被称为机器人排除协议。

robots.txt是网站和搜索引擎协议的纯文本文件。当搜索引擎蜘蛛访问站点时，它先爬行检查该站点的根目录下是否存在robots.txt，如果存在，根据文件内容确定访问范围，否则就沿着网页链接抓取。

```txt
# robots.txt说明
# 格式要求：一行只放一个字段，前面不能有空格；字段首字母大写；冒号是英文状态，且后面留出一个空格

# 指定搜索机器人名称。当值为*时，User-agent只能出现一次，表示该协议对所有搜索机器人有效；当值为某一搜索机器人如Googlebot时，可以出现多次
# User-agent: *

# 指定不允许搜索机器人访问的资源。当值为空时表示允许访问所有，当值为/时表示不允许访问任何资源。值采用模式匹配，支持通配符*、结尾符$
# Disallow: 

# 指定允许搜索机器人访问的资源。
# Allow: 

# 指定不被索引的资源，仅对Google生效
# Noindex: 

# 指定站点地图地址。网站地图是网站上页面链接的HTML文件，列出网站所有页面的URL和最后更新时间。sitemap.xml文件是给搜索引擎看的，而sitemap.html文件则是给人看的。
# Sitemap: 

# robots.txt示例
User-agent: Googlebat
Allow: /scripts/abc.js
Disallow: /scripts/

User-agent: BaiduSpider
Allow: /images/*.jpg$
Allow: /images/*.png$
Disallow: /images/

User-agent: *
Disallow: manifest.json
```

网站地图文件内容示例如下，
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.baidu.com/</loc>
    <lastmod>2020-03-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

当希望robots.txt仅对某个页面生效，可以给各页面添加相应的配置，
```html
<!-- 
 name取值为robots，表示所有搜索引擎，值为BaiduSpider，表示百度引擎，以此类推。

 content可取值如下，
  INDEX：指令告诉搜索机器人抓取该页面
  NOINDEX：指令告诉搜索机器人不抓取该页面
  NOFOLLOW：指令表示搜索机器人不用沿着该页面上的链接继续抓取下去
  FOLLOW：指令表示搜索机器人可以沿着该页面上的链接继续抓取下去
  ALL：指令告诉搜索机器人可以抓取该页面，并沿着该页面上的链接继续抓取下去
  NONE：指令告诉搜索机器人不可以抓取该页面，也不能沿着该页面上的链接继续抓取下去
  
  于是可分为以下四种组合：
-->
＜meta name="robots" content="INDEX,FOLLOW" /＞
＜meta name="robots" content="ALL" /＞

＜meta name="robots" content="NOINDEX,FOLLOW" /＞

＜meta name="robots" content="INDEX,NOFOLLOW" /＞

＜meta name="robots" content="NOINDEX,NOFOLLOW" /＞
＜meta name="robots" content="NONE" /＞
```

## 页面伪静态
- 原理：重写URL，也就是拦截url并重定向到其他url的过程，目的是通过重写URL去掉动态网页参数

- 真、伪静态页面的比较

  真静态页面

    优点：访问快；减少服务器对数据响应的负荷；网站不易受到攻击；稳定性好

    缺点：文件多；存储大；增加网站制作成本

  伪静态页面

    优点：维护方便，网页自动变化；利于SEO，被搜索引擎收录；缩短url长度，隐藏实际路径，并能避免木马注入，提高安全性；也易于用户记忆和输入；存储小
    
    缺点：占用一定的CPU，增加服务器的数据响应时间 

- 判断页面是否伪静态

  `document.lastModified`判断每次值是否相同，不同则是伪静态 

- 实现页面伪静态
  ```conf
  # url重写结合缓存实现伪静态

  # 负载均衡
  upstream backend {
    server 192.168.8.10:80;
  }

  # 默认索引文件
  set $index 'index.shtml';
  # 存储请求文件名
  set $store_file $request_filename;
  # URL重写规则，若以/结尾，则重写为/index.shtml
  if ($uri ~ /$ ) {
  　set $store_file $request_filename$index;
  　rewrite (.*) $1 index.shtml last;
  }

  location / {
    # 默认索引文件 
  　index index.shtml;
    # 启用代理存储
  　proxy_store on;
    # 临时文件存储路径
  　proxy_temp_path /cache/temp;
    # 设置请求头
  　proxy_set_header Host $host;
  　proxy_set_header X-Real-IP $remote_addr;
  　proxy_set_header Via "s9/nginx";
    # 设置用户访问代理存储权限
  　proxy_store_access user:rw group:rw all:rw;
    # 检查本地是否有请求的文件，若有直接送出，否则从后端请求，并将结果存储在本地
  　if ( !-e $store_file ) {
  　　proxy_pass http://backend;
  　}
  }
  ```

## 内容优化
- 隐藏logo图片上的文字
  ```css
  /** 提供以下几种处理方式，就不一一举例了 */
  /* color */
  .logo1 {
    color: transparent;
  }

  /* text-indent */
  .logo2 {
    width: 180px;
    height: 36px;
    background: url(logo.png);
    text-indent: -999px;
  }

  /* content */
  .logo3 {
  content: url(logo.svg);
  }

  /* overflow */

  /* font-size */
  ```

- `h1`标签保证唯一

- `img`标签添加属性`alt`

- `link`标签设置属性`rel`为`nofollow`

  告诉搜索引擎该链接不是经作者编辑，它是不受信任的。此时搜索引擎不跟踪、不计算该链接的投票权重

- `link`标签设置属性`rel`为`canonical`
  
  告诉搜索引擎哪个页面是更为重要的页面，避免多个url存在，分散页面权重，优化了url，利于排名。不支持跨域。若要跨域，使用301重定向。


