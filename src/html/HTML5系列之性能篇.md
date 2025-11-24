---
title: HTML5系列之性能篇
tags: 
- HTML5
---

本篇并非系统完整地介绍性能相关的知识，只作为在性能方面给出整体的学习脉络参考。

## 性能指标
- FCP：First Contentful Paint，内容首次绘制时间点
- TBT：Total block time，总阻塞时长。长任务的阻塞时间是该任务持续时间超过50毫秒的部分，一个页面的总阻塞时间是指在FCP和TTI之间发生的每个长任务的阻塞时间总和

> 可通过[pagespeed](https://pagespeed.web.dev/?hl=zh-cn)或[webpagetest](https://www.webpagetest.org/)测试网页性能

> 性能指标不只以上两个指标，详细可访问[LightHouse文档](https://developer.chrome.com/docs/lighthouse/overview?hl=zh-cn)进行完整地学习。

## 打包优化
- 代码压缩、混淆
- 第三方依赖独立打包
- 公共代码独立打包为动态链接库
- 按需加载：开启tree-shaking优化、根据路由拆包

## 缓存优化
- 热点缓存
  
  访问频率高的页面静态化；Redis缓存热点数据

- CDN缓存
  
  若请求资源未过期，则返回304，否则CDN根据浏览器提供的域名，通过内部专用DNS解析此域名的IP，再向此IP地址提交访问请求。从实际IP地址获取资源响应后，一方面在本地进行保存，以备后用，另一方面将资源响应返回给客户端

- 使用强缓存和协商缓存

> 部分更新下的缓存处理
>
> revving技术属于覆盖式发布。若静态资源和页面属于分开部署，可能先部署页面再部署静态资源，会出现用户访问到旧的资源，也可能先部署静态资源再部署页面，会出现没有缓存用户加载到新资源而报错，以上本质上都是覆盖式发布惹的祸。所以静态资源需要非覆盖式发布，即用静态资源的文件摘要信息给文件命名，这样每次更新资源不会覆盖原来的资源，先将资源发布上去，这时存在两种资源，用户用旧页面访问旧资源，然后再更新页面，用户变成新页面访问新资源，就能做到无缝切换。目前比较流行的是给文件名加`content-hash`

## 网络优化
### 使用HTTP/2
- 资源占用率低：头部压缩、基于流的多路复用
- 安全性高：TLS保障

### 控制传输大小和减少请求数
- nginx开启gzip，压缩资源大小，网络资源占用率低
  ```javascript
  // 除了nginx开启，还可以通过以下两种方式
  // 1、静态压缩，打包处理
  // webpack配置插件BrotliWebpackPlugin(brotli压缩)或CompressionPlugin(gzip压缩)

  // 2、动态压缩，代码注入
  // 全局注入方式
  const express = require('express');
  const compression = require('compression');

  const app = express();
  app.use(compression());
  app.use(express.static('public'));

  const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
  });


  // 局部注入方式
  const express = require('express');

  const app = express();
  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
  app.use(express.static('public'));
  ```
- 设置响应头Access-Control-Max-Age，指定预检请求的有效期，减少options请求

### 移动端域名收敛，PC端域名发散
- 域名收敛：将静态资源放在同个域名下。减少DNS解析开销。
- 域名发散：将静态资源放在多个不同域名(不是越多越好)下，提高并行度，加速静态资源的加载。
- 域名发散一般用在pc端，充分利用浏览器多线程并行下载能力，而域名收敛多用于移动端，提高性能，因为dns解析是是从后向前迭代解析，如果域名过多性能会下降，增加DNS的解析开销。

### 使用HttpDNS寻址
- 保证DNS解析安全、精确、快速。HttpDNS是使用HTTP协议向DNS服务器的80端口进行请求，代替传统的DNS协议向DNS服务器的53端口进行请求，绕开了运营商的Local DNS，避免了使用运营商Local DNS造成的劫持和跨网问题。
- 在实现上，维护一张域名列表，将域名解析值预取到客户端本地的DNSCache中，预取优先调用HttpDNS接口，如果获取不到数据，则直接从LocalDNS取数据，并设置一个独立的线程作为定时器，根据TTL过期时间来检查domain是否需要更新

### 使用Https代理
- 链路优化：建立连接的延迟体现在每个SSL连接上，因此尽早完成SSL握手是重点。对于普通的图片资源和文档请求，在CDN上完成；对于涉及用户信息的受限资源和脚本，在内网防火墙上完成
- SSL协议优化：服务端支持ALPN协议，使用适合Forward Secrecy的加密算法，开启False Start，客户端在第二次SSL握手时可以发送应用数据，减少一次RTT时间
- 证书和加密套件优化：
  
  在证书链优化上，由于TCP初始拥塞窗口的存在，如果证书太长可能会产生额外的往返开销。移动端采用的证书链是"站点证书 - 中间证书 - 根证书"三级，同时服务端只发送站点证书和中间证书，根证书部署在客户端，将证书链控制在3KB以内。为了避免不必要的证书过期校验，在服务端开启OCSP Stapling

  在加密套件的选择上，优先选择ECDHE-RSA-AES128-GCM-SHA256，综合安全、性能和开销，是最优的选择

## 加载优化
- 特性1：JS执行会阻塞DOM和CSS OM构建

  JS执行会造成阻塞是因为JS可能操作DOM

  优化措施
  
  1）当脚本不影响渲染逻辑，可以进行异步加载，浏览器提供了defer和async两种方式

  <style>
  .g-container {
    display:grid;
    border-top:1px solid var(--vp-c-text-3);
    border-left:1px solid var(--vp-c-text-3);
  }
  .g-container>div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--vp-c-text-3);
    border-bottom: 1px solid var(--vp-c-text-3);
  }
  .g-container>div:nth-child(5n+1) {
    grid-column:1/2;
  }
  .g-container>div:nth-child(5n+2) {
    grid-column:2/3;
  }
  .g-container>div:nth-child(5n+3) {
    grid-column:3/4;
  }
  .g-container>div:nth-child(5n+4) {
    grid-column:4/5;
  }
  .g-container>div:nth-child(5n) {
    grid-column:5/6;
  }
  .g-container .r24 {
    grid-row: 2/4;
  }
  .g-container #c34 {
    grid-column: 3/4;
  }
  </style>
  <div class="g-container">
    <div></div>
    <div>共性</div>
    <div>特点</div>
    <div>优先级</div>
    <div>选择</div>

    <div>async</div>
    <div class="r24">允许下载脚本时进行DOM渲染，说明下载是异步操作的</div>
    <div>无序性，只要js引擎可用立即执行，无需等待文档就绪。<br/>从该特性上看出，易引起海森堡蚁虫之灾，即脚本加载结束后出现各种问题，仅适于独立脚本</div>
    <div class="r24">async > defer</div>
    <div class="r24">根据脚本是否是独立，若是则用async，否则用defer</div>

    <div>defer</div>
    <div id="c34">延迟性，需等待文档就绪才可执行；<br/>
  顺序性，需所有前面具有defer属性的脚本结束运行才可执行。<br/>
  从这两个特性上看出，defer既有将脚本置于body标签的全部好处，又使文档加载速度大幅提升。</div>
  </div>

  2）脚本置于HTML文档尾部，提前触发首次绘制时间，减少白屏时间。以下是常用手段，
  
  添加顶部进度条

  添加loading或转场动画
  
  使用骨架屏
  
  PWA
  
  同构(首屏SSR + 非首屏CSR)

  3）最小化主线程工作：抓住关键渲染路径(即HTML、CSS、JavaScript之间的依赖关系谱)影响因素，优化关键渲染路径，降低应用加载时间

  - 预加载
  
    `preload`，用于公共资源，本页面会使用的资源
    
    `prefetch`，用于可能访问的下一页面资源，跳转其他域名或请求其他域名的资源

    `dns-prefetch`、`preconnect`等，建立与所需来源的早期连接

    可以查看[HTML元素大杂烩link标签介绍](/html/HTML元素大杂烩.html#link)

  - 懒加载
    
    图片懒加载：先占位，待元素可见(借助`IntersectionObserver`)再加载资源地址
    
    长列表懒加载

    动态导入

- 特性2：CSS执行不阻塞DOM构建，但会阻塞JS
  
  HTML解析和CSS计算是采用流水线处理，另外会阻止JS运行，其原因是JS可能对CSS有依赖

  优化措施
  
  1）样式置于HTML文档头部，提前首屏渲染时间
  
  2）CSS文件可按媒体类型或媒体查询拆分，浏览器会根据link标签media属性加载对应样式

## 渲染优化
先认识Chromium渲染原理。

一帧做的事情：
![帧渲染流程](/performance/一帧做的事情.png)

一帧中主线程做的事情：
![主线程在一帧做了什么](/performance/一帧中主线程做的事情.png)

- 1）降低样式计算的范围和复杂度
  
  ①避免使用复杂选择器，层级越少越好

  ②减少需要执行样式计算的元素个数

- 2）避免大规模、复杂的布局
  
  布局耗时取决于布局的DOM元素数量及其复杂程度
  
  ①使用flex布局替代table布局
  
  ②尽可能避免强制布局的发生：如clientTop、clientLeft、clientWidth、clientHeight、offsetTop、offsetLeft、offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、getBoundingClientRect()、computedStyle等API调用

  示例如下，
  ```javascript
  // 先写后读，触发强制布局
  function triggerStyleCalcAndLayout() {
    // 更新box样式
    box.classList.add('super-big');
    // 为了返回box的offsetHeight，浏览器必须先应用属性修改，接着执行布局过程
    // 触发重绘的属性或方法：scrollXXX、offsetXXX、getBoundingClientReact、getComputedStyle、currentStyle
    console.log(box.offsetHeight);
  }
  // 先读后写，避免强制布局
  function notTriggerStyleCalcAndLayout() {
    // 获取box.offsetHeight
    console.log(box.offsetHeight);
    // 更新box样式
    box.classList.add('super-big');
  }
  ```

  强制同步布局示意图：
  ![强制同步布局](/performance/强制同步布局.png)
  
  ③通过`classname`一次性改变样式，避免频繁操作样式
  
  ④脱离文档流，在内存中操作DOM，避免频繁操作DOM：如创建文档片段`document.createDocumentFragment`进行操作再替换，或克隆节点`cloneNode`进行操作再替换，或`display:none`隐藏后进行操作再恢复显示
  
  ⑤动画元素添加`position:absolute`，避免修改样式时回流

- 3）简化绘制复杂度、减少绘制区域
  
  ①提升移动或渐变元素的绘制层
  
  ②减少绘制区域
  
  ③简化绘制复杂度
  
  ④通过计算和判断，避免无谓的绘制操作

## 动画优化
- 不同动画实现的差异
  
  性能（从表现上看是否丢帧）：开启GPU的CSS动画 > 未开启GPU的CSS动画 > JS动画
  
  可控性：JS动画可控；而CSS动画难控制

> 浏览器对每一帧的渲染工作要在16ms内完成，超出该时间则称为丢帧，一般控制帧率不超过60fps。
> 帧率，即每秒帧数。帧率对于人眼是在50-60，若帧率低于30，称为卡顿(连续出现3个低于20fps)，若高于60则太快，俗称“亮瞎”。
```javascript
// 实时计算帧率
(function(){
  const raf = (function(){
    return window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      function(callback) { 
        window.setTimeout(callback, 1000 / 60) 
      }
  })()

  let frame = 0
  let allFrameCount = 0
  let lastTime = Date.now()

  const loop = function() {
    raf(loop)

    const now = Date.now()
    frame++
    allFrameCount++
    if (now - lastTime > 1000) {
      console.log('帧率:', Math.round(frame / ((now - lastTime) / 1000 )), '帧数:', allFrameCount)
      lastTime = now
      frame = 0
    }
  }

  loop()
})()
```
> 我们一般遇到的都是卡顿问题。
> 频繁但较小的卡顿：主要原因是过高的渲染性能开销，在每一帧中做的事情太多，参考下面介绍的优化调整代码，甚至降低动画复杂(炫酷)程度。
> 较大但偶发的卡顿：主要原因是运行复杂算法、大规模DOM操作等，考虑使用[`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)、[`worker`](https://developer.mozilla.org/en-US/docs/Web/API/Worker)、[`offScreenCanvas`](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)等。

- CSS动画优化

  使用`transform`代替`top`、`left`实现动画，避免回流、重绘

  应用3D转换、`opacity`、`filter`或`will-change`，开启GPU加速

- JS动画优化
  
  实现方式：

  - [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)

  - [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)

  - [Animation](https://developer.mozilla.org/en-US/docs/Web/API/Animation)

  - [animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)

  requestAnimationFrame动画实现相对于setTimeout有三大优势：

  - 防丢帧：setTimeout的执行步调与屏幕的刷新步调不一致，会丢帧。而requestAnimationFrame最大优势是由系统决定回调函数的执行时机，它能保证回调函数在屏幕每次刷新间隔中只被执行一次，不会引起丢帧，但注意控制回调任务的执行时长。

  - 节省CPU开销：默认情况下，使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout仍在后台执行，浪费CPU资源。而requestAnimationFrame则不同，当页面未激活，页面的屏幕刷新任务会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染。

  - 回调节流：在高频率事件如resize、scroll中，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次。

  后推出新的API，即后两种方式，在非复杂动画场景下，选择实现方式顺序如下：`animate` > `Animation` > 基于DOM的`requestAnimationFrame` > 基于DOM的`setTimeout`

- canvas动画优化

  复杂动画考虑使用canvas代替DOM操作，canvas动画优化在此单独介绍。
  
  ①尽可能减少调用渲染相关API的次数，尽可能调用渲染开销较低的API

  比如执行`context.lineWidth = 5`，浏览器需立刻做一些事情，以便调用如`stroke`或`strokeRect`时，绘制的线宽正好5个像素。，它的赋值操作开销远大于对一个普通对象赋值的开销。再者，`putImageData`也是一个开销极为巨大的操作，不适合在每一帧里面去调用。下表是不同属性的赋值开销。

  <style>
  .c-container {
    display:grid;
    border-top:1px solid var(--vp-c-text-3);
    border-left:1px solid var(--vp-c-text-3);
  }
  .c-container>div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--vp-c-text-3);
    border-bottom: 1px solid var(--vp-c-text-3);
  }
  .c-container>div:nth-child(3n+1) {
    grid-column:1/2;
  }
  .c-container>div:nth-child(3n+2) {
    grid-column:2/3;
  }
  .c-container>div:nth-child(3n) {
    grid-column:3/4;
  }
  </style>
  <div class="c-container">
    <div>属性</div>
    <div>开销</div>
    <div>开销（非法赋值）</div>

    <div>lineWidth/lineJoin/lineCap</div>
    <div>40+</div>
    <div>100+</div>
  
    <div>fillStyle/strokeStyle</div>
    <div>100+</div>
    <div>200+</div>

    <div>font</div>
    <div>1000+</div>
    <div>1000+</div>

    <div>textAlign/textBaseline</div>
    <div>60+</div>
    <div>100+</div>

    <div>shadowBlur/shadowOffsetX</div>
    <div>40+</div>
    <div>100+</div>

    <div>shadowColor</div>
    <div>280+</div>
    <div>400+</div>
  </div>

  ②合理地调整调用绘图API顺序，降低context状态改变的频率 

  ③采取Canvas分层
  
  生成多个Canvas实例，把它们重叠放置，每个Canvas使用不同z-index定义层级，然后在相应的canvas层进行重绘。

  ④将渲染阶段的开销转嫁到计算阶段之上
  
  使用`drawImage`绘制同样大小的区域，数据源是一张和绘制区域尺寸相仿的图片的情形，比起数据源是一张较大图片的情形，前者开销要小一些。可以认为，两者相差的开销正是**裁剪**这一操作的开销。优化思路是将**裁剪**这一步事先做好，保存起来，每一帧中仅绘制不裁剪。

  ⑤离屏绘制

  `drawImage`方法的第一个参数不仅可以接收Image对象，也可以接收Canvas对象，使用Canvas对象绘制的开销与使用Image对象的开销几乎完全一致

  ```javascript
  var offScreenCanvas = document.createElement('canvas');
  offScreenCanvas.width = dw;
  offScreenCanvas.height = dh;
  offScreenCanvas.getContext('2d').drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  context.drawImage(offScreenCanvas, x, y);
  ```

## 代码优化
### CSS优化
- 首屏避免使用导入样式@import，该方式是串行加载执行，无法并行调用，使用内联、嵌入或链接样式替代
- 通过CSS继承提高代码复用性
- 使用雪碧图(被合并的资源越小，请求时长越短的效果就更明显)

### 请求优化
- 过滤请求携带的无用内容
- 重复请求作缓存

### 事件优化
- 避免在事件处理函数执行长任务，否则会引起页面阻塞，并导致额外的布局发生
- 当上次触发的事件处理函数未执行完毕，则不触发
- 使用css3动画和touch事件实现滑动效果，而滚动效果使用原生
- 事件委托

### 内存优化
- 从内存泄漏入手

  1.闭包

  2.全局变量

  3.分离的DOM节点

  4.控制台打印

  5.定时器

- 具体定位：无痕模式(屏蔽Chrome插件对测试内存占用的影响)打开Chrome，打开开发者工具，找到Memory，记录复现过程中内存占用情况

## 图片优化
- 大图懒加载
- 小图使用雪碧图(CSS Sprite，将多张小图拼成一张合成图，再通过`background-position`属性进行定位)，或base64内嵌，或纯CSS实现，减少请求
- 格式选择：字体图标 > SVG > WEBP > JPG > PNG
- 设计上避免大型背景图，图片不宽于640
- 根据像素比和网络，控制图片分辨率
- 低清晰度图片使用锐化，提升体验

至此，本篇介绍完结，按从服务端(缓存优化、网络优化)到客户端(打包优化)的链路、从代码外到代码内(代码优化、图片优化)这样的一个顺序，总结了性能优化手段，但是绝不仅于此，性能优化是一个非常泛的问题，我们只需定位整个运行链路中哪个环节是性能问题比较突出的，进行重点改进，其余环节为辅，最后可以通过上面提供的性能指标评测网站检验优化效果。
