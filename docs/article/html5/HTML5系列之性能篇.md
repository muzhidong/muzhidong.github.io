---
title: HTML5系列之性能篇
tags: 
- HTML5
---

本篇并非系统完整地介绍性能相关的知识，只作为在性能方面给出整体的学习脉络参考。

# 性能优化
## 性能指标
- FCP：First Contentful Paint，内容首次绘制时间点
- TBT：Total block time，总阻塞时长。长任务的阻塞时间是该任务持续时间超过50毫秒的部分，一个页面的总阻塞时间是指在FCP和TTI之间发生的每个长任务的阻塞时间总和

> 提供在线[性能测量工具](https://pagespeed.web.dev/?hl=zh-cn)测试个人或企业的网站

> 性能指标不只以上两个指标，详细可访问[LightHouse文档](https://developer.chrome.com/docs/lighthouse/overview?hl=zh-cn)进行完整地学习。

## 网络优化
### 使用https协议
- 网络资源占用率低：流式传输，连接复用
- 安全性高：数据加密

### 控制传输大小和请求数
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

### 移动端使用域名收敛，PC端使用域名发散
- 域名收敛：将静态资源放在同个域名下。减少DNS解析开销。
- 域名发散：将静态资源放在多个不同域名(不是越多越好)下，提高并行度，加速静态资源的加载。
- 域名发散一般用在pc端，充分利用浏览器多线程并行下载能力，而域名收敛多用于移动端，提高性能，因为dns解析是是从后向前迭代解析，如果域名过多性能会下降，增加DNS的解析开销。

### 使用HttpDNS寻址
- 保证DNS解析安全、精确、快速。HttpDNS是使用HTTP协议向DNS服务器的80端口进行请求，代替传统的DNS协议向DNS服务器的53端口进行请求，绕开了运营商的Local DNS，避免了使用运营商Local DNS造成的劫持和跨网问题。
- 在实现上，维护一张域名列表，将域名解析值预取到客户端本地的DNSCache中，预取优先调用HttpDNS接口，如果获取不到数据，则直接从LocalDNS取数据，并设置一个独立的线程作为定时器，根据TTL过期时间来检查domain是否需要更新

### *使用https代理
- 基于链路的优化

  建立连接的延迟体现在每个SSL连接上，因此尽早完成SSL握手是优化工作的重点。对于普通的图片资源和文档请求，在CDN上完成SSL卸载；对于涉及用户信息的受限资源和脚本，在内网防火墙上完成SSL卸载，

- 基于SSL协议的优化

  服务端支持ALPN协议，使用适合Forward Secerecy的加密算法，开启了False Start，客户端在第二次SSL握手的同时可以发送应用数据，减少一次RTT时间。

- 基于证书和加密套件的优化

  在证书链优化方面，由于TCP初始拥塞窗口的存在，如果证书太长可能会产生额外的往返开销。移动端采用的证书链都是“站点证书 - 中间证书 - 根证书”三级的，同时服务端只发送站点证书和中间证书，根证书部署在客户端，将证书链控制在3KB以内。为了避免不必要的证书过期校验，我们在服务端开启了OCSP Stapling。在加密套件的选择上，优先选择ECDHE-RSA-AES128-GCM-SHA256，综合安全、性能和开销，是最优的选择。

## 代码优化
### 首屏加载优化
- 特性1：JS加载执行阻止DOM和CSSOM构建

  JS加载阻塞DOM树构建是因为JS可能操作了DOM

  优化措施
  
  1）当脚本不影响渲染逻辑，可以进行异步加载，浏览器提供了defer和async两种方式

  <table style="border:1px solid black;">
    <tr style="text-align:center;">
      <td style="border-right:1px solid black;border-bottom:1px solid black;"></td>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">共性</td>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">特点</td>
      <td style="width:50px;border-right:1px solid black;border-bottom:1px solid black;">优先级</td>
      <td style="border-bottom:1px solid black;">选择</td>
    </tr>
    <tr>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">async</td>
      <td rowspan=2 style="border-right:1px solid black;">允许下载脚本时进行DOM渲染，说明下载是异步操作的</td>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">无序性，只要js引擎可用立即执行，无需等待文档就绪。<br/>从该特性上看出，易引起海森堡蚁虫之灾，即脚本加载结束后出现各种问题，仅适于独立脚本</td>
      <td rowspan=2 style="border-right:1px solid black;">async > defer</td>
      <td rowspan=2>根据脚本是否是独立，若是则用async，否则用defer，注意作兼容处理</td>
    </tr>
    <tr>
      <td style="border-right:1px solid black;">defer</td>
      <td style="border-right:1px solid black;">延迟性，需等待文档就绪才可执行；<br/>
  顺序性，需所有前面具有defer属性的脚本结束运行才可执行。<br/>
  从这两个特性上看出，defer既有将脚本置于body标签的全部好处，又使文档加载速度大幅提升。但是仅ie支持，于是还须再做一步，即手动在文档就绪后触发脚本</td>
    </tr>
  </table>

  2）脚本置于HTML文档尾部，提前触发首次绘制时间，减少白屏时间。现今，解决白屏问题，一般都会加顶部进度条、Loading或骨架屏

  3）最小化主线程工作：抓住关键渲染路径(即优化HTML、CSS、JavaScript之间的依赖关系谱)影响因素，优化关键渲染路径，降低应用加载时间

  关键资源：阻止网页首次渲染的资源，可以去除关键渲染路径中不必要的脚本

  关键路径长度：获取所有关键资源所需的往返次数或总时间

  关键字节：实现网页首次渲染所需的总字节数，是所有关键资源传送文件大小的总和

- 特性2：CSS加载不阻止DOM构建
  
  HTML和CSS并行处理，但是影响首屏渲染，而且阻止JS加载运行，其原因是JS可能对CSS有依赖

  优化措施
  
  1）样式置于HTML文档头部，提前首屏渲染时间
  
  2）必要时使用媒体查询

### 渲染优化
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
  
  ①尽可能避免触发布局
  
  ②使用flex布局替代如table等老布局
  
  ③避免强制布局的发生

  示例代码如下，
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
  
  ④通过`classname`一次性修改样式，不要一个个修改
  
  ⑤DOM离线修改样式，如使用`documentFragment`对象在内存中操作DOM、先应用`display:none`再修改属性，避免触发大量重布局、先`clone`节点再修改属性最后再替换
  
  ⑥有动画样式的元素添加`position:absolute`，避免修改样式时回流

- 3）简化绘制的复杂度、减少绘制区域
  
  ①提升移动或渐变元素的绘制层
  
  ②减少绘制区域
  
  ③简化绘制的复杂度
  
  ④通过计算和判断，避免无谓的绘制操作

### 动画优化
JS动画与CSS动画的比较：JS动画可控，但易掉帧，占内存；而CSS动画效果好，但是难控制。

- 1）优化JS执行效率
  
  使用`requestAnimateFrame`实现动画，替代`setTimeout`、`setInterval`，因为它们无法保证回调函数的执行时机，很可能在帧结束时执行，从而丢帧(浏览器对每一帧的渲染工作要在16ms内完成，超出该时间则称为丢帧。控制帧率不超过60fps)，而`requestAnimationFrame`可以保证回调函数在每帧动画开始时执行

- 2）优先使用渲染层的合并属性、控制层的数量

  使用`transform`或`opacity`属性实现动画效果，避免回流重绘

  使用`will-change`属性或`translateZ`函数开启GPU加速

  各层都需要内存和管理开销，减少动画的图层，每多一个图层，会多一份内存占有和管理的开销

- 3）Canvas动画优化
  
  ①尽可能减少调用渲染相关API的次数，尽可能调用渲染开销较低的API。

  以`context.lineWidth`为例，它的赋值操作开销远大于对一个普通对象赋值的开销。Canvas上下文不是一个普通的对象，比如执行`context.lineWidth = 5`，浏览器需要立刻地做一些事情，下次调用诸如`stroke`或`strokeRect`等API时，画出来的线就正好是5个像素宽了

  再者，`putImageData`是一项开销极为巨大的操作，不适合在每一帧里面去调用

  不同属性的赋值开销不同。

  <table style="border:1px solid black;">
    <tr style="text-align:center;">
      <td style="border-right:1px solid black;border-bottom:1px solid black;">属性</td>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">开销</td>
      <td style="border-bottom:1px solid black;">开销（非法赋值）</td>
    </tr>
    <tr>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">line[Width/Join/Cap]</td>
      <td style="border-right:1px solid black;">40+</td>
      <td>100+</td>
    </tr>
    <tr>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">[fill/stroke]Style</td>
      <td style="border-right:1px solid black;">100+</td>
      <td>200+</td>
    </tr>
    <tr>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">font</td>
      <td style="border-right:1px solid black;">1000+</td>
      <td>1000+</td>
    </tr>
    <tr>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">text[Align/Baseline]</td>
      <td style="border-right:1px solid black;">60+</td>
      <td>100+</td>
    </tr>
    <tr>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">shadow[Blur/OffsetX]</td>
      <td style="border-right:1px solid black;">40+</td>
      <td>100+</td>
    </tr>
     <tr>
      <td style="border-right:1px solid black;border-bottom:1px solid black;">shadowColor</td>
      <td style="border-right:1px solid black;">280+</td>
      <td>400+</td>
    </tr>
  </table>

  ②通过适当地安排调用绘图API的顺序，降低context状态改变的频率。 

  ③分层Canvas
  
  生成多个Canvas实例，把它们重叠放置，每个Canvas使用不同的z-index来定义堆叠的次序。然后仅在需要绘制该层时（也许是「永不」）进行重绘。

  ④将渲染阶段的开销转嫁到计算阶段之上
  
  使用`drawImage`绘制同样大小的区域，数据源是一张和绘制区域尺寸相仿的图片的情形，比起数据源是一张较大图片的情形，前者开销要小一些。可以认为，两者相差的开销正是「裁剪」这一个操作的开销。优化思路是，将「裁剪」这一步骤事先做好，保存起来，每一帧中仅绘制不裁剪。

  ⑤离屏绘制

  `drawImage`方法的第一个参数不仅可以接收Image对象，也可以接收另一个 Canvas对象。而且使用Canvas对象绘制的开销与使用Image对象的开销几乎完全一致。

  ```javascript
  var canvasOffscreen = document.createElement('canvas');
  canvasOffscreen.width = dw;
  canvasOffscreen.height = dh;
  canvasOffscreen.getContext('2d').drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  context.drawImage(canvasOffscreen, x, y);
  ```

> 插曲：

> 阻塞：可以理解为不间断运行时间超过16ms的JS代码，以及导致浏览器花费超过 16ms时间进行处理的JS代码。如果经常出现小型阻塞，就会出现丢帧的情况。

> 解决两种阻塞：

> - 频繁但较小的阻塞。其原因主要是过高的渲染性能开销，在每一帧中做的事情太多。应当仔细优化代码，有时不得不降低动画的复杂（炫酷）程度，前面提到的动画优化，解决的就是这个问题。

> - 较大但偶发的阻塞。其原因主要是运行复杂算法、大规模DOM操作等。主要有以下两种优化的策略。使用Web Worker，开启新的线程进行计算，适于没有对DOM操作的计算；将任务拆分为多个较小的任务，插在多帧中进行，适于涉及对DOM操作的计算

### 请求优化
- 压缩合并JS、CSS
- 过滤请求携带的无用内容
- 重复请求作缓存

### 事件优化
- 避免在事件处理函数执行长任务，否则会引起页面阻塞，并导致额外的布局发生
- 当上次触发的事件处理函数未执行完毕，则不触发
- 使用css3动画和touch事件实现滑动效果，而滚动效果使用原生
- 事件委托

### CSS优化
- 首屏使用内嵌样式，保证首屏加载的可用性
- 利用CSS继承减少CSS代码量

### 内存优化
- 从常见内存泄漏入手

  1.闭包

  2.全局变量

  3.分离的DOM节点

  4.控制台打印

  5.定时器

- 分析定位：无痕模式打开Chrome(目的是为了屏蔽Chrome插件对测试内存占用的影响)，再打开开发者工具，找到Memory

## 图片处理
- 大图懒加载
- 小图使用雪碧图(CSS Sprite，将多张小图拼成一张合成图，再通过`background-position`属性进行定位)或base64内嵌，甚至纯CSS实现，减少请求
- 格式选择：字体图标 > SVG > WEBP > JPG > PNG
- 设计上避免大型背景图，图片不宽于640
- 根据像素比和网络控制图片分辨率
- 低清晰度图片使用锐化提升体验

## 设定缓存策略
- CDN缓存
  
  若请求资源未过期，则返回304，否则CDN根据浏览器提供的域名，通过内部专用DNS解析此域名的IP，再向此IP地址提交访问请求。从实际IP地址获取资源响应后，一方面在本地进行保存，以备后用，另一方面将资源响应返回给客户端

- 使用强缓存和协商缓存
  
- 热点缓存
  
  访问频率高的页面静态化；Redis缓存热点数据

> 部分更新下的缓存处理

> revving技术属于覆盖式发布。若静态资源和页面属于分开部署，可能先部署页面再部署静态资源，会出现用户访问到旧的资源，也可能先部署静态资源再部署页面，会出现没有缓存用户加载到新资源而报错，以上本质上都是覆盖式发布惹的祸。所以静态资源需要非覆盖式发布，即用静态资源的文件摘要信息给文件命名，这样每次更新资源不会覆盖原来的资源，先将资源发布上去，这时存在两种资源，用户用旧页面访问旧资源，然后再更新页面，用户变成新页面访问新资源，就能做到无缝切换。目前比较流行的是给文件名加`content-hash`

## 设定加载策略
- 预加载
  
  `preload`，用于公共资源，本页面会使用的资源
  
  `prefetch`，用于可能访问的下一页面资源，跳转其他域名或请求其他域名的资源

  `dns-prefetch`、`preconnect`等，建立与所需来源的早期连接

  可以查看[HTML元素大杂烩link标签介绍](/article/html5/HTML元素大杂烩.html#link)

- 懒加载非关键渲染资源
  
  图片懒加载：html解析时，预先加载一个placeholder图，之后再用js加载真实图片替换。当前img标签已支持loading属性，值指定为lazy，即可实现，推荐使用
  
  内容懒加载：如长列表无限滚动加载，可以借助`IntersectionObserver`实现；第三方库、模块按需加载

  ```javascript
  // import moduleA from 'moduleA'
  // function func() {
  //   use moduleA
  // }
  function func(moduleA) {
    // use moduleA
  }
  form.addEventListener('submit', () => {
    // func()
    import('moduleA')
      .then(module => module.default)
      .then(func)
      .catch(handleError)
  })
  ```

## 从工程角度优化
- 资源大小问题
  
  路由按需加载
  
  打包时抽取公共代码或第三方依赖
  
  使用esm语法，tree-shaking优化

  Terser压缩混淆代码，webpack已提供相关插件

- 白屏问题
  
  使用PWA
  
  骨架屏
  
  添加loading或转场动画
  
  预加载
  
  同构(首屏SSR + 非首屏CSR)


至此，本篇介绍完结，从多个角度总结了性能优化手段，包括网络优化、代码优化、图片处理、设定缓存策略、设定加载策略、工程优化等，但是绝不仅于此，性能优化是一个非常泛的问题，我们只需定位整个运行链路中哪个环节是性能问题比较突出的，进行重点改进，其余环节为辅，最后可以通过上面提供的性能指标评测网站检验优化效果。
