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
  
  客户端通过Ajax方式每隔一小段时间发送一个请求到服务器，服务器立刻返回数据

- 长轮询

  客户端通过Ajax发起请求，服务器不立即响应，而是保持连接，直到有数据要推送给客户端或超时才返回数据给客户端。客户端收到响应之后马上再发起一个新请求给服务器，周而复始

> 短轮询与长轮询的比较
![短轮询与长轮询图解](/html/短轮询与长轮询图解.jpg)

- 长连接

  方式一：隐藏iframe src + jsonp + 定时

  方式二：Ajax + 服务器保持连接，通过HTTP1.1的分块传输编码(chunked encoding)机制推送数据给客户端，直至超时或者手动断开连接

  方式三：客户端通过XHR发起请求，若有上次事件ID的话则加到请求头，当readyState为3时处理数据，先检查响应类型是否是`text/event-stream`，是则处理数据，否则停止请求，当readyState为4时，若停止请求则不再重连，否则重复上述过程。该思路可以说是SSE的简易实现，下面就来介绍SSE。

- SSE
  
  概念：Server Sent Event。网页自动获取来自服务器的更新，不需开发者手动在客户端作操作向服务端发送请求

  特点：轻量，使用相对简单；单向传送（只能服务端向客户端发送）；基于HTTP协议；默认支持断线重连；允许自定义发送数据类型

  [查看示例代码](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/SSE)

  链接：
  
  [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
  
  [Server-sent_events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

  [比SSE更好的基于fetch实现的流式通信](https://github.com/Azure/fetch-event-source)

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
设计成单线程的理论是，JS必须不能运行太长时间，否则会出现卡顿，浏览器无法对用户输入作出响应，而Web Worker弥补浏览器无法多线程的缺陷

### 概念
创建新的运行时，有自己的栈、堆、队列，不影响页面的渲染

### 特点
- 处理耗时操作
- 同源限制
- 无法访问window和document，不能操作DOM
- 无法使用文件系统API
- 与主线程不共用同一个上下文环境，即存在线程间数据共享、同步、通信等问题，在ES8提出了[SharedArrayBuffer和Atomics](/javascript/ES6+新特性你知道多少#es2017)，实现线程间资源共享，解决线程间同步或通信问题。

### Worker API
- Worker

  事件属性
  - onmessage
  - onerror
  - onmessageerror
    ```javascript
    // main.js
    const worker = new Worker('./worker.js', {
      // 设置worker名称
      name: 'test'
    })
    worker.onmessageerror = function(e) {}

    // worker.js
    console.log(self.name)
    self.onmessageerror = function(e) {}
    ```

  方法
  - postMessage
    ```javascript
    // 转移数据
    // 拷贝方式发送二进制数据，会造成性能问题，因为默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JavaScript允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法叫做Transferable Objects，使用方式如下：worker.postMessage(arrayBuffer, [arrayBuffer]);
    const ab = new ArrayBuffer(1);
    worker.postMessage(ab, [ab]);
    ```
  - terminate
    ```javascript
    // 主线程关闭Worker
    worker.terminate();
    ```

- WorkerGlobalScope
  - 除了window和document对象外，其他API基本可以使用
  - close：自行关闭worker
    ```javascript
    // Worker线程自行关闭Worker
    self.close();
    ```
  - importScripts：同步加载多个脚本，当中有一个脚本加载出错，则剩余脚本不再载入和运行
    ```javascript
    // Worker线程加载脚本
    importScripts('script1.js', 'script2.js');
    ```

> Worker执行模型：worker从上到下同步运行代码，然后进入一个异步阶段。当有监听消息，worker永远不会自动退出；而若没有监听消息，则直到所有任务相关的回调函数都被调用，且再也没有挂起的任务时，worker会自动退出

### Worker子类
- SharedWorker
  ```html
  <h3>共享线程SharedWorker</h3>
  <button id="likeBtn">点赞</button>
  <p>收获了<span id="likedCount">0</span>个👍</p>
  <script id="shared-worker" type="app/worker">
    console.log("shared-worker");
    let like = 0;
    onconnect = function (e) {
      const port = e.ports[0];
      port.onmessage = function () {
        port.postMessage(++like);
      };
    };
  </script>
  <script>
    const likeBtn = document.querySelector("#likeBtn");
    const likedCountEl = document.querySelector("#likedCount");
    
    const blob = new Blob([document.querySelector('#shared-worker').textContent]);
    const url = window.URL.createObjectURL(blob);
    const worker = new SharedWorker(url);
    
    worker.port.start();
    likeBtn.addEventListener("click", function () {
      worker.port.postMessage("like");
    });
    worker.port.onmessage = function (e) {
      likedCountEl.innerHTML = e.data;
    };
  </script>
  ```

- ServiceWorker
  
  用途
  - 离线资源缓存与更新
  - 后台消息传递
  - 网络代理
  - 消息推送

  使用注意事项
  - 不要给service-worker.js文件带版本号，防止文件变更，读取缓存
  - 不要给service-worker.js文件资源设置缓存

  示例
  ```javascript
  // 询问用户刷新
  // 思路：
  // 1、浏览器检测到存在新的SW时，安装并让它等待，同时触发updatefound事件(浏览器执行，无需编码)
  // 2、监听updatefound事件，弹出一个提示条，询问用户是否更新SW
  // 3、若用户确认，则向处在等待的SW发送消息，要求其执行skipWaiting并取得控制权
  // 4、SW的变化触发controllerchange事件，在该事件的回调中刷新页面

  // index.js
  function emitUpdate() {
    var event = document.createEvent('Event');
    event.initEvent('sw.update', true, true);
    window.dispatchEvent(event);
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function (reg) {
      if (reg.waiting) {
        emitUpdate();
        return;
      }
      // 监听updatefound事件
      reg.onupdatefound = function () {
        var installingWorker = reg.installing;
        installingWorker.onstatechange = function () {
          switch (installingWorker.state) {
            // 弹出一个提示条
            case 'installed':
              if (navigator.serviceWorker.controller) {
                emitUpdate();
              }
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });

    // 监听controllerchange事件
    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // 避免使用Chrome Dev Tools的Update on Reload功能时引发无限刷新
      if (refreshing) {
        return
      }
      refreshing = true;
      window.location.reload();
    })
  }

  window.addEventListener('sw.update', function(){
    // 弹框
  })

  // 用户确认按钮点击事件
  confirmEl.addEventListener('click', function(){
    try {
      navigator.serviceWorker.getRegistration().then(reg => {
        reg.waiting.postMessage('skipWaiting');
      });
    } catch (e) {
      window.location.reload();
    }
  })


  // service-worker.js
  // 接收消息，更新sw
  self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
      self.skipWaiting();
    }
  })
  ```

  ```javascript
  // 监控页面崩溃
  // index.js
  if(navigator.serviceWorker.controller !== null) {
    // 心跳间隔
    const HEADBEAT_INTERVAL = 5000;
    const sessionId = uuid()
    const heartbeat = () => {
      navigator.serviceWorker.controller.postMessage({
        type: 'heartbeat',
        id: sessionId,
        data: {
          // 添加附加数据
        }
      })
    }
    // 心跳检测
    setInterval(heartbeat, HEADBEAT_INTERVAL)
    heartbeat()

    // 通知sw删除当前监控记录
    window.addEventListener('beforeunload', () => {
      navigator.serviceWorker.controller.postMessage({
        type: 'unload',
        id: sessionId
      })
    })
  }

  // worker.js
  // 检查崩溃间隔
  const CHECK_CRASH_INTERVAL = 10000;
  // 崩溃阈值
  const CRASH_THRESHOLD = 15000;
  const pages = {}
  let timer
  const checkCrash = () => {
    const now = Date.now()
    for(let id in pages) {
      const page = pages[id]
      if(now - page.t > CRASH_THRESHOLD) {
        // 上报crash
        // 删除监控记录
        delete pages[id]
      }
    }
    if(Object.keys(pages).length === 0) {
      clearInterval(timer)
      timer = null
    }
  }
  self.addEventListener('message', event => {
    const data = event.data
    if(data.type === 'heartbeat') {
      pages[data.id] = {
        t: Date.now(),
      }
      if(!timer) {
        timer = setInterval(checkCrash, CHECK_CRASH_INTERVAL)
      }
    } else if(data.type === 'unload') {
      delete pages[data.id]
    }
  })
  ```

  ```javascript
  // 加速边缘计算
  self.addEventListener('fetch', event => {
    event.respondWith(handle(event.request))
  })
  async function handle(request) {
    const url = new URL(request.url)
    if (url.pathname == "/") {
      // 这是一个首页请求，重定向到特定国家的路径，如给美国用户发送“/US/”
      const country = request.headers.get("CF-IpCountry")
      url.pathname = "/" + country + "/"
      return Response.redirect(url, 302)
    } else if (url.pathname.startsWith("/images/")) {
      // 这是一个图片请求，阻止第三方访问者盗链  
      const referrer = request.headers.get("Referer")
      if (referrer && new URL(referrer).hostname != url.hostname) {
        return new Response("Hot linking not allowed.", {
          status: 403
        })
      }    
      // 盗链检查通过，直接从谷歌云存储提供图片服务节省服务成本
      // 根据Cache-Control头信息，图片会在Cloudflare的边缘服务器缓存
      url.hostname = "example-bucket.storage.googleapis.com"    
      return fetch(url, request)  
    } else {    
      // 定期请求，转发给源服务器  
      return fetch(request)  
    } 
  }
  ```

### 示例
- worker代码和主线程代码在同一页面
  ```html
  <!-- worker脚本 -->
  <!-- 注意script标签需指定id属性，且type属性是一个浏览器不认识的值 -->
  <script id="worker" type="app/worker">
    addEventListener('message', function (e) {
      postMessage("I'm fine.");
    }, false);
  </script>
  <!-- 主线程脚本 -->
  <script>
    // Blob内容是子线程代码
    var blob = new Blob([document.querySelector('#worker').textContent]);
    var url = window.URL.createObjectURL(blob);
    var worker = new Worker(url);
    worker.postMessage('How are you?')
    worker.onmessage = function (e) {
      console.log(e.data);
    };
  </script>
  ```

- [Worker and ServiceWorker Demo](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/Worker)

## WebSocket
### 概念
一种浏览器与服务器间进行全双工实时通讯的网络技术，实现客户端和服务器端的长连接。

> 短连接与长连接的区别：短连接是每传输完一段数据便关闭，而长连接是时刻保持着连接，不会因数据传输完毕就断开

### 优势
- 较少的控制开销。协议的数据包头部相对较小
- 更强的实时性。协议是全双工的
- 保持连接状态。协议是有状态的
- 更好的二进制支持。协议使用二进制帧传递
- 可扩展。协议可扩展，实现部分自定义

### WebSocket连接、传输过程
- 1、客户端申请协议升级
  
  ```bash
  # 要升级的协议。值为Upgrade，告知服务器希望将当前的http(s)连接升级到另一个协议，后续会根据Upgrade字段判断是否支持客户端请求的协议升级，支持则升级
  Connection: Upgrade
  # 升级为ws协议。值为websocket，表示期望升级当前协议为WebSocket。注意协议升级允许将一个已建立的连接升级成新的、不相容的协议，但该机制在HTTP/2已被禁止，此时可通过TLS的ALPN(应用层协议协商)扩展实现ws连接
  Upgrade: websocket
  # 指定客户端所使用的WebSocket协议版本。若服务端不支持该版本，则返回Sec-WebSocket-Version，里面包含服务端支持的版本号
  Sec-WebSocket-Version: 13
  # 与服务端响应头Sec-WebSocket-Accept是配套的，提供基本的防护(预防一些常见的意外情况，非故意的)，比如恶意连接，或者无意连接(http客户端不小心请求连接websocket服务)。客户端生成一个Base64编码的随机字符串，用于进行WebSocket握手安全验证。服务器接收后，会将其与一个固定的GUID（全球唯一标识符）进行拼接，然后对拼接后的字符串进行SHA-1哈希运算，最后将结果进行Base64编码，生成一个Sec-WebSocket-Accept响应头返回给客户端。客户端接收到响应后，会进行相同的计算并验证Sec-WebSocket-Accept的值是否正确，以此确保握手过程的安全性
  Sec-WebSocket-Key: 258EAFA5-E914-47DA-95CA-C5AB0DC85B11
  # 用于协商WebSocket连接支持的扩展功能
  Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
  ```

- 2、服务端响应协议升级

  ```bash
  # 101 协议切换
  HTTP/1.1 101 Switching Protocols
  Connection:Upgrade
  Upgrade: websocket
  # 实现服务端WebSocket关键点一：生成Sec-WebSocket-Accept响应头值
  # 计算公式：toBase64(sha1(Sec-WebSocket-Key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'))
  # 示例：
  # const crypto = require('crypto');
  # const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  # const secWebSocketKey = 'w4v7O6xFTi36lq3RNcgctw==';
  # const secWebSocketAccept = crypto.createHash('sha1')
  #     .update(secWebSocketKey + magic)
  #     .digest('base64');
  Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
  ```

- 3、基于数据帧的传递

  数据帧结构
  ![数据帧结构1](/html/数据帧结构1.jpg)
  ![数据帧结构2](/html/数据帧结构2.jpg)

  WebSocket的每条消息可能被切分成多个数据帧，又叫数据分片

  ```javascript
  // 实现服务端WebSocket关键点二：数据帧的解析和生成
  // 解析数据帧
  function decodeDataFrame(e) {
    var i = 0,
    j,s,
    frame = {
      FIN: e[i] >> 7,
      Opcode: e[i++] & 15,
      Mask: e[i] >> 7,
      PayloadLength: e[i++] & 0x7F
    };

    if(frame.PayloadLength === 126) {
      frame.PayloadLength = (e[i++] << 8) + e[i++];
    }
    if(frame.PayloadLength === 127) {
      i += 4;
      frame.PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
    }

    if(frame.Mask) {
      frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
      for(j = 0, s = []; j < frame.PayloadLength; j++) {
        s.push(e[i+j] ^ frame.MaskingKey[j%4]);
      }
    } else {
      s = e.slice(i, i+frame.PayloadLength);
    }

    s = new Buffer(s);
    if(frame.Opcode === 1) {
      s = s.toString();
    }
    frame.PayloadData = s;

    return frame;
  }
  // 生成数据帧
  function encodeDataFrame(e) {
    var s = [],
    o = new Buffer(e.PayloadData),
    l = o.length;

    s.push((e.FIN << 7) + e.Opcode);
    if(l < 126) {
      s.push(l);
    } else if(l < 0x10000) {
      s.push(126, (l & 0xFF00) >> 8, l & 0xFF);
    } else {
      s.push(127, 0, 0, 0, 0, (l & 0xFF000000) >> 24, (l & 0xFF0000) >> 16, (l & 0xFF00) >> 8, l & 0xFF);
    }

    return Buffer.concat([new Buffer(s), o]);
  }
  ```

### WebSocket掩码处理
基于安全、效率考虑，选择对数据载荷进行掩码处理的折中方案，增大代理缓存污染攻击难度和减小攻击的影响范围。

> 代理缓存污染攻击过程：
> - 攻击者向邪恶服务器发起WebSocket连接，协议升级请求 
> - 代理服务器收到升级请求，并转发给邪恶服务器
> - 邪恶服务器同意连接，代理服务器将响应转发给攻击者
>
> - 攻击者向邪恶服务器发送数据，数据是伪造的http格式文本，携带了正义资源url和正义服务器host
> - 代理服务器收到请求，但此时它认为是新的http请求，并转发给邪恶服务器
> - 邪恶服务器返回邪恶资源，代理服务器缓存邪恶资源(url是对的，但host却指向正义服务器)
> 
> - 受害者通过代理服务器访问正义服务器的资源
> - 代理服务器检查该资源的url和host，发现有缓存(伪造的)，将邪恶资源返回给受害者
> - 受害者卒

掩码算法
```javascript
// 实现服务端WebSocket关键点三：
// 说明：
// original-octet-i：为原始数据的第 i 字节
// transformed-octet-i：为转换后的数据的第 i 字节
// masking-key-octet-j：为 mask key 第 j 字节
// 公式：
// j = i MOD 4
// transformed-octet-i = original-octet-i XOR masking-key-octet-j
// 示例如下，
let uint8 = new Uint8Array([0xE6, 0x88, 0x91, 0xE6, 0x98, 0xAF, 0xE9, 0x98, 
  0xBF, 0xE5, 0xAE, 0x9D, 0xE5, 0x93, 0xA5]);
let maskingKey = new Uint8Array([0x08, 0xf6, 0xef, 0xb1]);
let maskedUint8 = new Uint8Array(uint8.length);

for (let i = 0, j = 0; i < uint8.length; i++, j = i % 4) {
  maskedUint8[i] = uint8[i] ^ maskingKey[j];
}
```

### WebSocket服务端简易版实现
```javascript
// server.js
const http = require("http");
const port = 8888;
const { 
  generateAcceptValue, 
  parseMessage, 
  constructReply 
} = require("./util");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("hello websocket");
});

server.on("upgrade", function (req, socket) {
  socket.on("data", (buffer) => {
    const message = parseMessage(buffer);
    if (message) {
      console.log("Message from client:" + message);
      socket.write(constructReply({ message }));
    } else if (message === null) {
      console.log("WebSocket connection closed by the client.");
    }
  });
  if (req.headers["upgrade"] !== "websocket") {
    socket.end("HTTP/1.1 400 Bad Request");
    return;
  }
  // 读取客户端提供的Sec-WebSocket-Key
  const secWsKey = req.headers["sec-websocket-key"];
  // 使用SHA-1算法生成Sec-WebSocket-Accept
  const hash = generateAcceptValue(secWsKey);
  // 设置HTTP响应头
  const responseHeaders = [
    "HTTP/1.1 101 Web Socket Protocol Handshake",
    "Upgrade: WebSocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${hash}`,
  ];
  // 返回握手请求的响应信息
  socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");
});

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

// util.js
const crypto = require("crypto");
const MAGIC_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

function generateAcceptValue(secWsKey) {
  return crypto
    .createHash("sha1")
    .update(secWsKey + MAGIC_KEY, "utf8")
    .digest("base64");
}

function parseMessage(buffer) {
  // 第一个字节，包含了FIN位，opcode, 掩码位
  const firstByte = buffer.readUInt8(0);
  
  // [FIN, RSV, RSV, RSV, OPCODE, OPCODE, OPCODE, OPCODE];
  // 右移7位取首位，1位，表示是否是最后一帧数据
  const isFinalFrame = Boolean((firstByte >>> 7) & 0x01);
  console.log("isFIN: ", isFinalFrame);

  // 取出操作码，低四位
  /**
   * %x0：表示一个延续帧。当 Opcode 为 0 时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片；
   * %x1：表示这是一个文本帧（text frame）；
   * %x2：表示这是一个二进制帧（binary frame）；
   * %x3-7：保留的操作代码，用于后续定义的非控制帧；
   * %x8：表示连接断开；
   * %x9：表示这是一个心跳请求（ping）；
   * %xA：表示这是一个心跳响应（pong）；
   * %xB-F：保留的操作代码，用于后续定义的控制帧。
   */
  const opcode = firstByte & 0x0f;
  if (opcode === 0x08) {
    // 连接关闭
    return;
  }
  if (opcode === 0x02) {
    // 二进制帧
    return;
  }

  if (opcode === 0x01) {
    // 目前只处理文本帧
    let offset = 1;
    const secondByte = buffer.readUInt8(offset);

    // MASK: 1位，表示是否使用了掩码，在发送给服务端的数据帧里必须使用掩码，而服务端返回时不需要掩码
    const useMask = Boolean((secondByte >>> 7) & 0x01);
    console.log("use MASK: ", useMask);

    const payloadLen = secondByte & 0x7f; // 低7位表示载荷字节长度
  
    offset += 1;
    // 四个字节的掩码
    let MASK = [];
    // 如果这个值在0-125之间，则后面的4个字节（32位）就应该被直接识别成掩码；
    if (payloadLen <= 0x7d) {
      // 载荷长度小于125
      MASK = buffer.slice(offset, 4 + offset);
      offset += 4;
      console.log("payload length: ", payloadLen);
    } else if (payloadLen === 0x7e) {
      // 如果这个值是126，则后面两个字节（16位）内容应该，被识别成一个16位的二进制数表示数据内容大小；
      console.log("payload length: ", buffer.readInt16BE(offset));
      // 长度是126， 则后面两个字节作为payload length，32位的掩码
      MASK = buffer.slice(offset + 2, offset + 2 + 4);
      offset += 6;
    } else {
      // 如果这个值是127，则后面的8个字节（64位）内容应该被识别成一个64位的二进制数表示数据内容大小
      MASK = buffer.slice(offset + 8, offset + 8 + 4);
      offset += 12;
    }

    // 开始读取后面的payload，与掩码计算，得到原来的字节内容
    const newBuffer = [];
    const dataBuffer = buffer.slice(offset);
    for (let i = 0, j = 0; i < dataBuffer.length; i++, j = i % 4) {
      const nextBuf = dataBuffer[i];
      newBuffer.push(nextBuf ^ MASK[j]);
    }

    return Buffer.from(newBuffer).toString();
  }
  return "";
}

function constructReply(data) {
  const json = JSON.stringify(data);
  const jsonByteLength = Buffer.byteLength(json);

  // 目前只支持小于65535字节的负载
  const lengthByteCount = jsonByteLength < 126 ? 0 : 2;
  const payloadLength = lengthByteCount === 0 ? jsonByteLength : 126;

  const buffer = Buffer.alloc(2 + lengthByteCount + jsonByteLength);
  // 设置数据帧首字节，设置opcode为1，表示文本帧
  buffer.writeUInt8(0b10000001, 0);
  buffer.writeUInt8(payloadLength, 1);

  // 如果payloadLength为126，则后面两个字节（16位）内容应该，被识别成一个16位的二进制数表示数据内容大小
  let payloadOffset = 2;
  if (lengthByteCount > 0) {
    buffer.writeUInt16BE(jsonByteLength, 2);
    payloadOffset += lengthByteCount;
  }
  // 把JSON数据写入到Buffer缓冲区中
  buffer.write(json, payloadOffset);

  return buffer;
}

module.exports = {
  generateAcceptValue,
  parseMessage,
  constructReply,
};
```

### WebSocket心跳检测
- 发送方->接收方：ping(对应帧opcode值为0x9)
- 接收方->发送方：pong(对应帧opcode值为0xA)

```javascript
// https://www.npmjs.com/package/ws
// 发送ping
ws.ping('', false, true)
```

### 示例
使用比较简单，直接附上[链接](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/WebSocket)查看
