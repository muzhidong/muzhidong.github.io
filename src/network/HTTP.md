本篇介绍HTTP相关内容，先介绍HTTP历史和HTTP版本对比，接着认识HTTP，包括其组成、缓存、跨域、会话、安全等，最后依次介绍HTTP1.1、HTTP2、HTTP3特性。

## HTTP历史
![](/network/http/HTTP历史.jpg)

## HTTP版本对比
![](/network/http/HTTP版本.jpg)

## 认识HTTP
在缓存、同源、会话、授权、代理和隧道这几方面都是可控的

### 组成
一串ASCII编码的多行文本，可划分为以下3部分：
- 起始行/状态行：描述要执行的请求，或响应的状态
- HTTP头：按上下文可分为通用头、实体头、请求头或响应头；按代理处理方式可分为端到端消息头、逐跳消息头
- 正文：第一行固定为空行，后面数据表示请求或响应内容。其中响应内容分单源内容和多源内容，前者必须携带`Content-Type`和`Content-Length`(已知长度)或`Transfer-Encoding:chunked`(未知长度)，后者由多个包含不同信息的内容组成，通常与表单联系

下面分别介绍请求消息和响应消息

请求消息由请求行(单行)、请求头(多行)、空行、请求体组成，如图下

![](/network/http/请求消息.png)

其中，请求行又由请求方式(表示对给定资源执行的操作)、请求资源路径、使用协议版本固定组成。

请求方式有如下几种：
- GET：请求指定资源的表示形式，只用于获取数据
- HEAD：与GET请求相同，但没有响应体
- OPTIONS：描述目标资源的通信选项，比如返回服务器支持的HTTP方法
- POST：将实体提交到指定资源，通常导致在服务器上的状态变化或副作用
- DELETE：删除指定资源
- PUT：请求有效载荷替换目标资源的所有当前表示
- CONNECT：建立一个到目标资源标识的服务器的隧道
- TRACE：沿着到目标资源的路径执行一个消息环回测试
- PATCH：对资源应用进行部分修改

|    | get | post |
|----|-----|------|
| 数据长度 | 最大2KB | 无限制 |
| 数据类型 | 只允许ASCII字符 | 无限制 |
| 安全性 | 较差，数据信息暴露在URL上 | 较安全，放在请求体 |

常见头如下(带*号表示通用头，在响应部分不再展示描述)：
- *Connection，表示是否继续保持连接。值为close表示在请求结束后断开TCP连接
- *Keep-Alive：表示在超时(timeout)和最大请求​​量(max)上如何使用连接，满足`Connection:Keep-Alive`才生效
- *Date，表示当前时间
- Accept，表示浏览器接受的格式
- Accept-Charset，表示浏览器接收的字符集码表
- Accept-Encoding，表示浏览器可接受的编码方式
- Accept-Language，表示浏览器接受的语言
- User-Agent，表示用户代理
- Host，表示访问使用的主机名
- Referer，表示请求来源

响应消息由响应行(单行)、响应头(多行)、空行、响应体组成，如图下

![](/network/http/响应消息.png)

其中，响应行又由使用协议版本、响应状态码、响应状态信息固定组成。

[响应状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)可分如下：
- 1XX：表示成功接受请求，要求客户端继续提交下一次请求来完成整个处理过程
  ![](/network/http/1xx信息.png)

- 2XX：表示成功接受请求并已完成整个处理过程
  ![](/network/http/2xx信息.png)

- 3XX：表示为完成请求，客户端进一步细化请求
  ![](/network/http/3xx信息.png)

- 4XX：表示客户端请求有错误
  ![](/network/http/4xx信息.png)

- 5XX：表示服务端出现错误
  ![](/network/http/5xx信息.png)

常见头如下：
- Content-Type：表示内容使用的数据类型和字符集码表
- Content-Encoding：表示内容使用的编码方式
- Content-Language：表示内容使用的语言
- Content-Length：表示内容大小
- Transfer-Encoding：指定传输类型，若值为chunked，说明数据是分块传输
- Server：表示服务器软件的类型
- Location：表示重定向地址
- Refresh：通知浏览器定时刷新。值可以是一个数值，表示多长时间后刷新页面，也可以是数值后拼接分号和一个URL地址，表示多长时间后跳转到指定URL
- Content-Disposition：表示附件，附上文件名。用于下载
- Via：服务端请求链路，在调试场景下有用

### 缓存
- 定义：资源的副本
- 分类
  - 私有缓存(本地缓存)：用户专享，不能被各级代理缓存的缓存。如浏览器缓存
  - 共享缓存(非本地缓存)：能被各级代理缓存的缓存。如CDN缓存、代理缓存、网关缓存、数据库缓存
- 目标：响应状态码为206、301、404的资源、HTML\图片\文件资源，适合作缓存
- 相关头
  - 响应头Expires：属于http1.0。值是来自服务端的一个绝对过期时间，超过该时间即过期。存在客户端和服务端时间差问题
    
    计算公式：`expires绝对时间 -  date绝对时间`，若不小于0则未过期，否则过期
  
  - 请求头(响应头)Cache-Control：属于http1.1。设置缓存控制策略，如缓存是否验证、缓存时长等等

    作为请求头或响应头可取值：
    - no-store：不缓存。请求或响应消息不能缓存
    - no-cache：使用缓存前需提交服务器验证，通过才可使用 
    - max-age：有时效的缓存。客户端可以接收生存期不大于指定的相对时间（单位秒）的响应
      
      计算公式：`max-age相对时间 - age相对时间`，若不小于0则未过期，否则过期，然后age重置为0，返回新资源
    - no-transform：不得对资源进行转变，即Content-Encoding、Content-Range、Content-Type等不能由代理修改

    作为请求头可取值：
    - only-if-cached：客户端只接收已缓存的响应，并且不向服务器检查是否有更新
    - max-stale：表明客户端愿意接收一个已过期的资源。设置一个可选时间(单位秒)，表示响应不能超过的过时时间
    - min-fresh：表示客户端希望在指定时间内获取最新响应

    作为响应头可取值：
    - public：共享缓存
    - private：私有缓存 
    - s-maxage：覆盖max-age值或者expires头，仅适于共享缓存下使用
    - must-revalidate：使用前需验证，过期则不该使用，如是页面过期，则访问服务器重新获取
    - proxy-revalidate：与must-revalidate作用相同，仅适于共享缓存

  - 请求头If-Modified-Since/响应头(表示头)Last-Modified：属于http1.0。值表示资源最近一次修改时间，作为协商缓存的弱校验

  - 请求头If-None-Match/响应头(表示头)Etag：属于http1.1。值表示资源md5检验码，作为协商缓存的强校验

  - 响应头Vary：值为某请求头字段名，会根据该请求头字段值决定是请求新的资源还是使用缓存。示例如下，
    
    ![](/network/http/使用vary响应头.png)

    使用vary头有利于内容服务的动态多样性，如`Vary: User-Agent`表示服务器针对UA这个维度缓存资源，如果需要区分移动端和桌面端的展示内容，这种缓存方式可以避免在不同终端展示错误的布局
- 请求过程
  - 无缓存则发起请求
  - 服务器缓存并响应200给浏览器
  - 强缓存：浏览器检测缓存未过期，直接取，不必请求
    
    响应内容返回时携带`expires`或`cache-control`。`Expires`返回一个绝对时间，当浏览器与服务器有时差时会有误差，属于http1.0解决方案。`Cache-control`属性返回`max-age=xxx`，值是一个相对时间，没有时差问题，属于http1.1解决方案

    通过`expires`或`cache-control`检查资源是否过期来实现强缓存

    ![](/network/http/强缓存.png)

  - 协商缓存：浏览器检测缓存过期，携带If-None-Match和If-Modified-Since发起请求，先检查缓存是否更新。若否则直接从缓存取，响应304给浏览器，否则重新从服务端获取，更新缓存，并响应200给浏览器
    
    当强缓存失效时，使用协商缓存。会发起请求，携带`If-Modified-Since`，服务端获取与`Last-Modified`作对比，若最后修改时间较新，则返回200，否则返回304使用缓存。由于`Last-Modified`只精确到秒级，若1秒内发生多次变化，则不能及时更新，或有些资源定期生成，但内容没变化，而`Last-Modified`变化了，导致资源不能使用缓存。而http1.1使用`If-None-Match`和`ETag`解决以上问题。同样是发起请求时携带`If-None-Match`，服务端获取与`ETag`进行对比，若不一致则使用返回200，否则返回304使用缓存

    ![](/network/http/协商缓存.png)
- 优先级
  - 先走强缓存，再走协商缓存
  - 强缓存中，cache-control存在则expires无效，否则expires生效；expires也不存在，则走启发式缓存
  - 协商缓存中先走etag，再走last-modified
  > 启发式缓存：当响应头没有Expires和Cache-Control时，根据响应头中Date和Last-Modified的时间差，取其值的10%作为缓存时间，公式如下，
    
    缓存时间 =（ date绝对时间 - last-modified绝对时间 ）* 10%
- 其他
  
  缓存驱逐：由于存储资源副本的缓存空间是有限的，定期在缓存中将一些副本删除

  revving：对资源地址添加版本号，不用时间戳。此技术需保留最近一段时间内的几个版本，现今更多用内容哈希代替

  F5刷新只能使强缓存失效；ctrl + F5强制刷新可以使强缓存和协商缓存失效

### 跨域
#### 背景
同源策略是浏览器的一个安全措施，要求协议、地址、端口一致，才可访问资源。其中的同源请求限制是指服务端异源响应会被浏览器拦截，而不是浏览器限制发起跨域请求。访问的资源类型有xhr/fetch、html、css、js、image、font、media等，但有该限制问题仅限xhr和fetch

#### CORS
##### 含义
CORS是一个W3C标准，全称是Cross Origin Resource Sharing。允许浏览器向跨源服务器发起请求并响应，解决同源请求限制问题。关键实现是请求头`origin`和响应头`access-control-allow-origin`

##### 流程
先判断是否是简单请求，若是则服务器检查`origin`是否允许的源，若符合则返回响应；若不是简单请求，则发起options请求，检查是否符合相关的`Access-Control-Allow-*`，若符合则返回200，再发起正式请求

##### 简单请求与复杂请求
- 简单请求（要求满足以下所有条件）
  
  1.请求方法是HEAD、GET、POST
  
  2.HTTP的头信息不超出以下几种字段：
    
    Accept
    
    Accept-Language
  
    Content-Language
    
    Content-Type
    
    Last-Event-ID

  3.Content-Type取值仅限于application/x-www-form-urlencoded、 multipart/form-data、text/plain
  
  4.XMLHttpRequest请求中没有使用upload作上传监听
  
  5.Fetch请求中没有使用ReadableStream对象

- 复杂请求（满足以下一个条件就是复杂请求，不是都满足）
  
  1.请求方法是PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH
  
  2.设置了简单请求外的请求头字段
  
  3.Content-Type的值非application/x-www-form-urlencoded、multipart/form-data、text/plain

##### options请求
又叫预检请求，获取目的资源所支持的通信选项。一般**跨域**情况下，浏览器**发起复杂请求**时，会主动发起，preflight通过才发起正式请求

- 浏览器发送options请求，会携带的请求头
  
  Origin：源
  
  Access-Control-Request-Method：告知服务器使用的请求方式
  
  Access-Control-Request-Headers：告知服务器使用的请求头

- 服务器响应options请求，会携带的响应头
  
  Access-Control-Allow-Origin: 外链|*
  
  Access-Control-Allow-Methods：实际请求允许使用的请求方式
  
  Access-Control-Allow-Headers：实际请求允许携带的请求头字段
  
  Access-Control-Allow-Credentials：是否附带身份凭证，一般用于第三方请求
  
  Access-Control-Max-Age：预检请求结果缓存时长，注意单位是秒(取min[浏览器允许最大缓存时长10min，设置的缓存时长]，可以把缓存时长设置不小于10min)
  
  Access-Control-Expose-Headers：允许浏览器访问的响应头白名单。指定响应头名，多个用逗号间隔

##### 服务端关键代码
```javascript
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
  res.header("X-Powered-By", '3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

#### 代理
- 原理：前端应用向代理服务器(如nginx、nodejs代理)发起请求；代理服务器转发请求；由于服务器间不存在跨域，正常接收请求，返回响应

#### JSONP
- 原理：script标签支持跨域
- 特点：只支持get请求，但简单易用、兼容性强
- 结构：请求内容是一段url，结构为`url?callback=函数名`；而响应内容是一段要能在浏览器立即执行的字符串，结构为`函数名(jsonStr)`
- 实现[见这](/html/HTML5系列之连接篇上#jsonp)

#### 隐藏的iframe + form
- 原理：在指定的iframe中执行form，提交(即iframe加载结束)后执行主窗口的回调
- 特点：支持get和post请求
- 实现
  ```js
  const request = ({
    url,
    method = 'get', 
    data, 
    successCb
  }) => {   
    const iframe = document.createElement('iframe')  
    iframe.name = 'iframeForRequest'  
    iframe.addEventListener('load', () => {
      successCb && successCb()
    })
    iframe.style.display = 'none'    
    document.body.appendChild(iframe)  
    
    const form = document.createElement('form')
    // 关键点：在指定iframe中执行form
    form.target = iframe.name
    form.action = url  
    form.method = method
    const node = document.createElement('input')  
    for (const name in data) {    
      node.name = name    
      node.value = data[name].toString()    
      form.appendChild(node.cloneNode())  
    }
    form.style.display = 'none'  
    document.body.appendChild(form)
      
    form.submit()   
    
    document.body.removeChild(form)
  }
  ```

#### document.domain
常见地，通过`document.domain`为多个子域名设置相同的父级域名(至少是一个二级域名)，实现多个子域名间的脚本可以互相读取其它子域名的文档内容

#### postMessage
[点这了解](/html/HTML5系列之连接篇下#跨域消息传递——postmessage)

### 会话
#### 会话技术
- 用途：会话管理、个性化（用户偏好、主题、其他设置）、跟踪（记录和分析用户行为）
- 相关头
  
  Set-Cookie响应头：设置cookie返回给浏览器
  
  Cookie请求头：自动携带cookie给服务器
- cookie名前缀
  
  __Host-：表示设置secure属性，path值为/，域名锁定
  
  __Secure-：表示设置secure属性，比__Host-稍弱

- 常见的相关开发问题
  
  session存于服务器，当session较多时会有内存不足问题 —— 将session存储于缓存数据库，如redis
  
  服务集群如何共享session —— 两种方式：一是nginx对upstream添加ip_hash，保证同个IP访问同台服务器；二是将session存储于缓存数据库，如redis

#### 令牌
- 背景：会话技术不适于客户端，于是有了token 
- 适用范围：既适于C端，也适于B端
- 常见的相关开发问题
  
  token自动刷新 —— 根据服务端返回的响应检查token是否失效，一旦发现失效，则调起自动登录接口更新token，再重新调用业务请求

#### 从6个角度认识对比会话和令牌
- 存储：会话放浏览器和服务端（有状态）；令牌只放终端（无状态）
- 跨域：会话有同源限制；令牌可跨域使用
- 验证：会话需查数据库；令牌只需重新验证
- 可控：会话可以控制认证有效性；令牌不可控
- 漏洞：会话易被CSRF；令牌易被XSS
- 共享：会话需解决集群共享问题，而令牌则无此问题

### 安全
- [COOP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy)：允许网站控制使用Window.open()打开或导航到新页面的新顶级文档是否在同一浏览上下文组 (BCG)中打开，还是在新的浏览上下文组中打开

- [COEP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy)：配置当前文档加载和嵌入跨域资源的策略

> [`window.crossOriginIsolated`](https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated)：只读，指示文档是否跨域隔离。该值受COOP和COEP影响，而它会影响SharedArrayBuffer等API的使用

- [CORP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Resource-Policy)：指示浏览器应该阻止对给定资源的no-cors跨源或跨站点请求

- HSTS：全称HTTP Strict Transport Security，是一个Strict-Transport-Security响应头，负责发送策略指令给浏览器，用于强制浏览器使用HTTPS连接，防止降级攻击和中间人攻击

## HTTP/1.1(HTTPS)
- 特点
  - TCP连接复用，每次请求减少一次RTT
  - 管线化/流水线：允许第一个请求响应完成前发送第二个请求，提高并发量
    ![](/network/http/HTTP连接方式变化.png)
  - 支持响应分块
  - 引入缓存控制机制
  - 引入内容协商机制，如语言、编码、类型
  - 补充Host头，支持不同域名配置在同一个ip的服务器上

- TLS连接过程
  - 客户端发起请求，将支持的算法告知服务端，协商要使用的对称加密算法
  - 服务端收到后与自身支持的算法作对比，若不支持则断开连接，否则以证书形式返回给客户端
  - 客户端验证证书是否可信(通过数字签名进行验证)，若可信(此时浏览器地址栏会加上一把小锁)，获取非对称公钥
  - 客户端生成随机的对称密钥
  - 客户端用非对称公钥对对称密钥进行加密并发送
  - 服务端用非对称私钥对对称密钥解密
  - 双方使用对称密钥加密正文，进行通信  

  ![](/network/http/TLS连接.png)

  > 过程中涉及了摘要、非对称加密、对称加密等算法，既保证传输快，又防止密钥泄漏

  > OCSP Stapling是一种优化TLS/SSL握手过程的技术。为了验证网站SSL证书是否有效，浏览器通常需要向证书颁发机构CA的OCSP服务器发起查询，这会增加延迟和隐私风险。OCSP Stapling允许网站在TLS握手时，主动将自己的有效证明(由CA签名)一并"装订"发送给浏览器。好处如下：
  > - 加速TLS握手，浏览器无需再额外发起OCSP查询，减少等待时间，加快HTTPS连接的建立速度；
  > - 保护用户隐私，浏览器不再需要向CA暴露自己正在访问的网站；
  > - 提高可靠性，避免因CA的OCSP服务器宕机而导致浏览器验证失败。
  > 
  > 大多数主流服务器都支持 OCSP Stapling，但它在默认的配置文件中可能未被启用

> 使用HTTPS协议，不代表敏感数据可以放在url的查询字符串上。仍会通过以下三种方式泄漏：服务器日志、浏览器历史记录、Referrer头部

## HTTP/2
### 头部压缩
- 头部和数据分离，若两个请求头存在相同，则去除当中一个相同的部分，减少请求体积

  HPACK是一种专门为压缩HTTP/2请求头和响应头部而设计的压缩算法。作用如下：
  - 压缩HTTP头部，减少数据传输量，提升速度；
  - 保证安全。早期的 HTTP/2草案曾使用通用的压缩算法如Gzip，但这存在一个名为CRIME​的安全漏洞，攻击者可能利用压缩特性窃取敏感信息如Cookie。HPACK是专门为头部压缩设计的安全算法，避免了此类漏洞

### 多路复用
- HTTP/2基于字节流，发送的请求在传输层没有顺序之分；HTTP/1.1基于字符流，有顺序之分，在TCP窗口很小的情况下就会很明显。字节流使请求或响应能交错地并行传输，解决HTTP/1.1复用时产生队头阻塞问题

  ![](/network/http/多路复用.jpg)

### 服务端推送
- nginx暂不支持HTTP/2 Server Push

- 腾讯云CDN支持HTTP/2 Server Push

  ![](/network/http/无服务器推送.png)

  ![](/network/http/有服务器推送.png)

  - 推送实现

    - 标识推送资源的两种方式

      设置link标签：`<link rel="preload" href="push.css" as="style">`

      设置Link头，加上`nopush`表示若浏览器已有该资源缓存，则服务器不需推送资源，否则推送：`Link:<push.css>; rel=preload; as=style`，`Link:</app/script.js>; rel=preload; as=script;nopush`

    - 推送资源发起

      客户端指定推送资源
      ```
      GET/simple_push.html HTTP/1.1
      Host: http2push.gtimg.com
      User-Agent:curl/7.49.1
      Accept: */*
      X-Push-Url:simple_push.js
      ```

      CDN指定推送资源
      ```
      location ~ "/simple_push.html$" {
        http2_server_push_url /simple_push.js
      }
      ```

      源站指定推送资源：增加响应头link通知客户端或者CDN节点
      
    - 功能实现

      ![](/network/http/ServerPush功能实现.png)

      1、用户请求到达服务器之后，依赖资源预测模块根据请求头或者配置预测浏览器需要的资源。该推送资源url必须是和主请求是同一host，如果不属于同一host，服务器拒绝推送资源

      2、服务器通过PUSH_PROMISE桢告诉浏览器准备推送的资源路径，该信息在原主请求流上发送。必须优先主请求响应发送，否则浏览器可能在推送资源到达前已经发起了依赖资源请求，造成重复和浪费

        CDN节点的推送资源发送顺序在主请求响应之前，基于以下因素考量：

        a、推送资源一般是静态的缓存命中率高的资源，如JS、CSS、字体和图片等。这些资源可以从源站预先推送并缓存到CDN节点。一是主页面变更较多，就不需要等待网络IO去源站取数据。二是CDN边缘节点到浏览器的RTT一般是比CDN节点到源站的RTT更短。所以在取到主页面最新响应之前，有充足的时间去推送资源

        b、资源推送可以探测提高TCP拥塞窗口，窗口逐渐增大，后续可以一次性发送完主页面响应

        c、在等待主请求响应的网络IO时间期间，推送资源可以是无优先级关系

        ![](/network/http/推送资源在主响应前.png)
      
      3、依赖资源请求模块构造和主请求一样的请求信息，在本地或后端服务器请求推送资源, 并主动创建新的HTTP/2请求流，后续服务器就可以发送资源响应，推送资源响应在服务端创建的流上传输，主页面响应在原始流传输

    - 影响推送的因素

      1、推送是否有改善性能的衡量因素是size(HTML/BandWidth)和RTT谁大。**BDP**指BandWidth-Delay product, 带宽时延乘积，描述了单位时间内该带宽能传输的数据大小。如果size(HTML) < BDP，推荐使用push；反之不推荐使用push

      > HTTP/1.1中的资源内联（Resource Inlining）技术，把资源内容拷贝到HTML标签中。该技术不足是资源不能脱离HTML被浏览器单独缓存，并且这个资源在多个url中重复传输多遍

      2、**TCP慢启动**：为了防止网络拥塞，TCP将放弃超出拥塞窗口大小的数据。只有当拥塞串口大小的数据传输完成，这个窗口大小将乘以2

      ![](/network/http/TCP慢启动对服务器推送的影响.png)

      上图说明了推送不一定比不推送快

      3、**资源加载优先级**

      ```html
      <!-- 1.js会调用2.js文件，3.js和4.js没有调用其他JS -->
      <script src="1.js"></script>
      <script src="3.js"></script>
      <script src="4.js"></script>
      ```

      ![](/network/http/资源加载优先级影响推送效果.png)

      4、**内核缓冲区**：假设我们访问一个HTML页面，这个HTML页面需要回源站取数据，而HTML需要的静态JS资源缓存在CDN边缘节点上。在回源站的等待时间内，把静态JS资源发送给浏览器。如果这时候静态JS资源很大，塞满了内核发送缓冲区，此时HTML响应已经到达CDN边缘节点，却不得不等内核缓冲区有空间才能继续发送。等待浏览器解析HTML内容后续的link请求也会被推迟。

      5、**浏览器缓存**：重复推送浏览器已缓存的资源，如果没有额外的空闲带宽传输，网络会阻塞它之后正常的请求，导致拖累了整个网站的加载时间 —— 协商缓存解决

- [监控和增强网络性能的开源工具](https://www.sitespeed.io/)

## HTTP/3(QUIC) 
- 加密范围
  
  TLS负责加密网络上的敏感数据，也就是HTTPS中的S（安全）。在TCP协议下，TLS仅加密实际HTTP数据；对于QUIC，TLS还会对QUIC协议本身的大部分内容进行加密，也就是说，TCP当中对所有中间件均可见（且可更改）的元数据，在现在的QUIC中将仅供客户端和服务器使用

  ![](/network/http/QUIC与TCP+TLS的加密范围比较.png)

- 安全：能防御DDoS攻击、防放大、RETRY数据包

- 性能：更快的连接握手、消除"队头阻塞"问题、更好的数据包丢失检测/恢复、处理用户切换网络的方法

  ![](/network/http/QUIC与TCP+TLS的连接过程比较.png)

- 其他
  
  支持Alt-Svc，允许资源定位和鉴定，更智能的CDN缓存
  
  引入Client-Hints，允许客户端主动交流需求，或硬件约束信息提供给服务器
  
  cookie头引入安全相关的前缀，保证安全的cookie不被篡改
