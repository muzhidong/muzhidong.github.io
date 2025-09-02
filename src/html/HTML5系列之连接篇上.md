---
title: HTML5系列之连接篇上
tags: 
- HTML5
---

关于"连接"部分的学习分为两篇文章介绍，这是上篇，介绍Ajax、Comet、postMessage、Worker和WebSockets。

## Ajax
### 什么是Ajax
Async JavaScript and XML，是一种在不刷新整个页面下，通过JavaScript与服务器进行异步通信的技术，用户体验更好。

### Ajax的实现方式
- img标签：响应是图片，无法轻易获取数据

- iframe标签：响应是HTML，但存在跨域问题

- <span id="jsonp">JSONP：script标签发起请求</span>

  说明：

  只支持GET请求，并追加参数`&jsonp=funcName`指定回调函数名

  响应内容必须是一段正确的JavaScript代码，一般形如`funcName(params)`的结构

  使用该方式注意服务器是可信的，否则存在安全隐患

```javascript
function getJSONP(url, callback = () => {}) {
  // url追加回调函数名
  const cbNum = `cb${getJSONP.counter++}`;
  const cbName = `getJSONP.${cbNum}`;
  if(url.indexOf('?') === -1) {
    url += `?jsonp=${cbName}`
  } else {
    url += `&jsonp=${cbName}`;
  }

  // 定义回调函数，注意作用域是全局的
  getJSONP[cbNum] = function(response) {
    try {
      callback(response);
    } finally {
      delete getJSONP[cbNum];
      document.body.removeChild(script);
    }
  }

  // 通过script发起请求
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}
getJSONP.counter = 0; 
```

- XMLHttpRequest
```javascript
// 通过初封装http请求来认识它
function request({
  method = 'GET', 
  url = 'http://example.com/api', 
  data = null,
  headers = {
    'Content-Type': 'application/json'
  },
  callback = () => {},
  overrideMimeType,
  async = true,
  name,
  password
}) {
  // 创建XMLHttpRequest对象
  const request = new XMLHttpRequest();

  // 设置是否允许携带凭证，如cookie、token、用户、密码
  // 判断该属性是否存在可以作为当前浏览器是否支持CORS
  request.withCredentials = true;
  
  // 设置请求类型（不区分大小写）、URL（支持相对URL和绝对URL）、是否异步（默认为true，若需要同步，可考虑与worker搭配使用）、用户名、密码（仅在跨域时需要）
  request.open(method, url, async, name, password);
  
  // 设置请求头
  // 一些请求头设置是无效的，浏览器会自动添加，如Accept-Charset、Accept-Encoding、Cookie、Date、Referer等等
  // 必须在调用open和send方法之间设置
  // 当没有设置Content-Type请求头时，浏览器会自动设置合适的值，比如传送的是XML、File、FormData
  for(const key in headers) {
    request.setRequestHeader(key, headers[key]);
  }

  // 设置响应的MIME类型，将忽略Content-Type响应头（是否不支持或废弃）
  if(overrideMimeType) request.overrideMimeType(overrideMimeType);
  
  // 监听状态变化
  request.onreadystatechange = function() {
    switch (request.readyState){
      case 0:
        console.log('open尚未调用');
        break;
      case 1: 
        console.log('open已调用');
        break;
      case 2:
        console.log('接受到响应头');
        break;
      case 3:
        console.log('接收到响应体');
        break;
      case 4:
        console.log('响应结束');
        if (request.status === 200) {
          // 注意无法通过getResponseHeader或getAllResponseHeaders获取到cookie信息
          const type = request.getResponseHeader('Content-Type');
          let data;
          if (type.indexOf('json') > -1) {
            data = JSON.parse(request.responseText);
          } else if (type.indexOf('xml') > -1) {
            data = request.responseXML;
          } else {
            data = request.responseText;
          }
          callback(data);
        }
    }
  }

  // 各类监听事件（部分是否不支持或废弃）
  request.onloadstart = function() {
    console.log('请求开始');
  }

  // 监听下载进度
  request.onprogress = function(e) {
    console.log('下载中');
    if(e.lengthComputable) {
      console.log(`已下载${e.loaded / e.total * 100}%`);
    }
  }

  request.onload = function() {
    console.log('下载完成');
  }

  // 监听上传进度
  request.upload.onprogress = function(e) {
    console.log('上传中');
    if(e.lengthComputable) {
      console.log(`已上传${e.loaded / e.total * 100}%`);
    }
  }

  request.upload.onload = function() {
    console.log('上传完成');
  }

  // load\timeout\abort\error只有一个会被触发
  request.ontimeout = function() {
    console.log('请求超时');
  }

  request.onabort = function() {
    // 调用abort方法触发
    console.log('请求被取消');
  }

  request.onerror = function() {
    console.log('请求失败');
  }

  request.onloadend = function() {
    console.log('请求结束');
  }
  
  // 发送请求，如果是GET请求，不传参数或传null
  request.send(data);

  return request;
}
```

- fetch
```javascript
// 新一代请求方式
// 用法
const p = fetch(url [,options])
p.then(function(response) {
  // 返回Response对象，如调用json方法，返回json数据格式的响应内容
  return response.json();
}, function(error) {
  // handle error
}).then(function(data) {
  // 返回响应内容
}, function(error) {
  // handle error
})
// 参数说明
// 第一参数表示请求地址字符串url或请求对象request
// 第二参数表示可选的请求配置对象，具有以下属性，
// method，表示请求方式，默认值为"GET"
// body，表示请求体？
// headers，表示请求头，具体结构见Headers
// credentials，表示凭证模式，默认值为omit，请求不携带凭证如Cookie，也可取值same-origin，表示同域请求包含凭证，或include，表示所有域请求包含凭证
// referrer，设置请求引用源，可取值同源url、about:client或空
// referrerPolicy，设置请求的引用源策略。可取值空、no-referrer、no-referrer-when-downgrade、same-origin、origin、strict-origin、origin-when-cross-origin、strict-origin-when-cross-origin、unsafe-url
// mode，设置请求是允许CORS还是仅限于同源访问。可取值navigate、same-origin、no-cors、cors
// cache，设置请求如何与浏览器缓存交互。可取值default、no-store、reload、no-cache、force-cache、only-if-cached
// redirect，可取值follow、error、manual"
// integrity​
// keepalive​，可替代sendBeacon，用于保持连接不被关闭
// signal​，用于取消请求
// window，只能被设置为null
```

```javascript
// 相关API
// Headers
// 构造函数
// Headers(meta)，参数meta表示请求头或响应头字段的集合对象 
// 方法 
// has(name)，头部是否有指定字段名
// get(name)，获取指定的头部字段名
// set(name, value)，设置指定的头部字段名
// append(name, value)，添加指定的头部字段名和值
// delete(name)，删除指定的头部字段名
// foreach(function(value,name){}[,currentContext])，遍历头部字段

// Body
// 属性
// body，表示响应体
// bodyUsed，表示响应体是否被使用
// 方法
// text()，返回字符串类型的响应内容
// json()，返回经JSON.parse解析的json对象
// blob()，返回二进制大对象类型的响应内容
// arrayBuffer()，返回缓冲数组类型的响应内容
// formData()，返回可以被另一个请求转发的表单数据响应

// Request，继承Body
// 构造函数
// Request(url,options)，第一参数表示请求地址字符串url或请求对象，第二参数表示请求配置对象
// 属性
// url
// method
// headers
// destination，表示请求目标，可取值"", "audio", "audioworklet", "document", "embed", "font", "image", "manifest", "object", "paintworklet", "report", "script", "sharedworker", "style",  "track", "video", "worker", "xslt"
// referrer
// referrerPolicy
// mode
// credentials
// cache
// redirect
// integrity
// keepalive
// isReloadNavigation
// isHistoryNavigation
// signal
// 方法
// clone()，克隆请求对象

// Response，继承Body
// 属性
// status，表示状态码
// statusText，表示状态码含义
// ok，表示状态码是否为2XX
// headers，表示响应头
// url，表示当前地址
// type，表示响应类型，值有basic\cors\default\error\opaque\opaqueredirect
// redirected
// trailer
// 方法
// clone()，克隆响应对象
// 静态方法
// error()，网络错误，返回一个错误对象
// redirect(url,statusCode)，重定向
```

[点我，提供了xhr和fetch两种方式封装的示例](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/ajax)

## Comet
### 什么是Comet
Web服务器发起通信并异步发送消息到客户端，某种意义上，Ajax是客户端从服务端“拉”数据，Comet是服务端向客户端“推”数据。理解是推流技术或长连接技术。

### Comet的实现方式
- 短轮询
  
  定时发起ajax请求

- 长轮询

  ajax请求结束后发起另一个ajax请求

- 长连接

  客户端通过XHR发起请求，若有上次事件ID的话则加到请求头，当readyState为3时处理数据，先检查响应类型是否是`text/event-stream`，是则处理数据，否则停止请求，当readyState为4时，若停止请求则不再重连，否则重复上述过程。

  上述思路可以说是SSE的简易实现，下面就来介绍SSE。

- SSE
  
  概念：Server Sent Event。网页自动获取来自服务器的更新，不需开发者手动在客户端作操作向服务端发送请求

  特点：轻量，使用相对简单；单向传送（只能服务端向客户端发送）；基于HTTP协议；默认支持断线重连；允许自定义发送数据类型

  [查看示例代码](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/SSE)

  链接：
  
  [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
  
  [Server-sent_events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

> 基于Ajax和Comet可以构建更高级的通信协议，比如RPC（远程过程调用）、发布订阅事件系统。

## 跨域消息传递——postMessage
### 适用范围
允许脚本显式打开的一个新窗口(window.open)或者嵌套其中的窗体(iframe)与当前窗口进行通信

### postMessage参数说明
- 第一个参数表示要传递的消息
- 第二个参数表示目标窗口的源，可以传递一个URL，仅协议、主机和端口号有效，其余部分会被忽略。若同源，传`/`，若无限制，传`*`

### 示例
- [Demo](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/postMessage)

## Web Worker
### 背景
设计成单线程的理论是，JS必须不能运行太长时间，否则会导致循环事件，浏览器无法对用户输入作出响应，而Web Worker弥补浏览器无法多线程的缺陷

### 概念
创建新的运行时，有自己的栈、堆、队列，不影响页面的渲染

### 特点
- 处理耗时操作；
- 无法访问window和document，不能操作DOM；
- 同源限制；
- 线程同步问题，在ES8提出了SharedArrayBuffer和Atomics，实现线程间资源共享，解决线程间同步或通信问题。

### 类型
- SharedWorker
- ServiceWorker
  
  用途有哪些？离线资源缓存与更新、后台消息传递、网络代理、消息推送

### API介绍
- Worker

  事件属性：onmessage、onerror、onmessageerror

  方法：postMessage、terminate

- WorkerGlobalScope

  除了window和document对象外，其他API基本可以使用
  
  close：自行关闭worker
  
  importScripts：同步加载多个脚本，当中有一个脚本加载出错，则剩余脚本不再载入和运行

> Worker执行模型：worker从上到下同步运行代码，然后进入一个异步阶段。当有监听消息，worker永远不会自动退出；而若没有监听消息，则直到所有任务相关的回调函数都被调用，且再也没有挂起的任务时，worker会自动退出

### 示例
- [Demo](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/Worker)

## WebSocket
### 概念
一种浏览器与服务器间进行全双工实时通讯的网络技术，实现客户端和服务器端的长连接。

> 短连接与长连接的区别：短连接是每传输完一段数据便关闭，而长连接是时刻保持着连接，不会因数据传输完毕就断开

### 特点
- 事件驱动

- 异步

- 使用ws或者wss协议(ssl加密可以使用wss)，实现真正意义上的推送

### 请求头
- Upgrade：取值为websocket，指定客户端期望升级当前协议为WebSocket

- Connection：取值为Upgrade，告知服务器客户端希望将当前的http(s)连接升级到另一个协议，后续会根据Upgrade字段判断是否支持客户端请求的协议升级，支持则升级

- Sec-WebSocket-Version：指定客户端所使用的WebSocket协议版本

- Sec-WebSocket-Key：客户端生成的一个Base64编码的随机字符串，用于进行WebSocket握手安全验证。服务器接收后，会将其与一个固定的GUID（全球唯一标识符）进行拼接，然后对拼接后的字符串进行SHA-1哈希运算，最后将结果进行Base64编码，生成一个Sec-WebSocket-Accept响应头返回给客户端。客户端接收到响应后，会进行相同的计算并验证Sec-WebSocket-Accept的值是否正确，以此确保握手过程的安全性

- Sec-WebSocket-Extensions：用于协商WebSocket连接支持的扩展功能

示例如下，
```bash
GET /ws HTTP/1.1
Host: 192.168.33.1:8099
Pragma: no-cache
Cache-Control: no-cache
Origin: http://dev.1thx.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36 QQBrowser/4.3.4986.400
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: mIsurCgKrroYO7m/0QNqRg==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

### 示例
使用比较简单，直接附上[链接](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/WebSocket)查看
