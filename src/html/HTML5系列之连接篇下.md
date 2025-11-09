---
title: HTML5系列之连接篇下
tags: 
- HTML5
---

本篇是连接部分的下半场，介绍postMessage、Worker和通道。

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
- 与主线程不共用同一个上下文环境。存在线程间数据共享、同步、通信等问题，在ES8提出了[SharedArrayBuffer和Atomics](/javascript/ES6+新特性你知道多少#es2017)，实现线程间资源共享，解决线程间同步或通信问题。

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
    // 默认以拷贝方式发送二进制数据，会造成性能问题。为了解决这个问题，JavaScript允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。在postMessage添加第二参数数组，元素表示要转移的对象
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

### Worker特殊子类
- SharedWorker

  只解决内存共享问题，但在不同任务协作的场景中存在同步、通信问题
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
  - 后台消息传递
  - 离线资源缓存与更新
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

## 通道
### 广播通道
- 定义：除自身外，广播消息到**同源**的**同一浏览器**的**其他标签页或iframe标签**。属于一对多通信
- 快速认识BroadcastChannel API
  ```js
  // 构造函数
  BroadcastChannel()，指定通道名称，一个名称对应一个通道
  
  // 实例属性
  name：只读，获取通道名称
  
  // 实例方法
  postMessage()：广播消息，接收任意值
  close()：关闭通道，断开连接

  // 事件
  message：接收广播消息事件
  messageerror：接收的广播消息无法反序列化时触发
  ```
- [图片透传效果示例](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E8%BF%9E%E6%8E%A5/broadcastChannel)

### 消息通道
- 定义：创建一个新的消息通道，通过其两个MessagePort属性发送数据。属于一对一通信
- 快速认识MessageChannel和MessagePort API
  ```js
  // 构造函数
  MessageChannel()
  
  // 实例属性
  port1：只读，获取通道端口1对象
  port2：只读，获取通道端口2对象
  ```

  ```js
  // MessagePort实例方法
  postMessage()：发送消息，接收任意值，支持第二可选参数指定可转移对象
  close()：断开端口连接
  start()：启动接收端口消息，当使用`addEventListener`监听方式时必须调用

  // 事件
  message：当消息到达MessagePort对象时触发
  messageerror：MessagePort对象接收的消息无法反序列化时触发
  ```
- 使用示例
  ```js
  const messageChannel = new MessageChannel();
    
  const port1 = messageChannel.port1
  port1.postMessage('hello port2');
  port1.addEventListener('message', (e) => {
    console.log(e.data)
  })
  port1.start()

  const port2 = messageChannel.port2
  port2.onmessage = (e) => {
    console.log(e.data)
    port2.postMessage('hello port1');
  }
  ```
