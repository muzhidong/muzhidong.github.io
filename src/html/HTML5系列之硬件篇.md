---
title: HTML5系列之硬件篇
tags: 
- HTML5
---

本篇介绍一些涉及硬件的Web API，如摄像头、麦克风、显示器、陀螺仪、打印机，其它会不时补充。

## 媒体设备
### MediaDevices
提供查询、访问媒体输入设备的方法。通过`navigator.mediaDevices`访问该对象

- 获取设备列表
  ```js
  navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
    mediaDevices.forEach((mediaDeviceInfo) => {
      // kind表示枚举值，如videoinput、audioinput、audiooutput三者之一，deviceId表示设备唯一标识符，label表示设备描述
      console.log(mediaDeviceInfo.kind, mediaDeviceInfo.deviceId, mediaDeviceInfo.label)
    })
  })
  ```

- 访问摄像头、麦克风
  ```js
  // 传入一个参数对象，表示要访问的媒体类型及其约束条件。媒体类型有video和audio，约束条件可以是一个布尔值，或一个MediaTrackConstraints对象，可访问https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints了解其属性
  // 返回一个是否支持MediaStreamTrack接口上约束属性的信息对象，可以在使用约束条件前检查属性是否支持
	console.log(navigator.mediaDevices.getSupportedConstraints());
  // 只访问摄像头，不访问麦克风
  const constraint = { 
    video: true, 
    audio: false 
  };
  // // 访问前置摄像头
  // const constraint = {
  //   video: {
  //     facingMode: "user"
  //   },
  // }
  // // 访问后置摄像头
  // const constraint = {
  //   video: {
  //     facingMode: "environment"
  //   },
  // }
  // // 访问指定设备
  // const constraint = {
  //   video: {
  //     deviceId: "5f910b43-d82a-4c6e-a7d4-f4f0d1c4a8b8"
  //   },
  // }

  // 返回值是一个Promise对象，成功回调接收MediaStream对象，后面会介绍它，失败回调接收错误信息
  navigator.mediaDevices.getUserMedia(constraint).then(onSuccess).catch(onFail);
  ```

  提供[示例](https://github.com/muzhidong/blog-demo/blob/main/docs/01html/%E7%A1%AC%E4%BB%B6/mediaDevices/%E8%AE%BF%E9%97%AE%E6%91%84%E5%83%8F%E5%A4%B4%E5%B9%B6%E6%88%AA%E5%9B%BE.html)

- 访问显示器
  ```js
  // 选项对象的使用基本同getUserMedia方法参数
  const opts = {
    video: {
      width: 500,
      height: 500,
      cursor: 'always'
    },
    // 无法采集音频
    audio: true
  }
  navigator.mediaDevices.getDisplayMedia(opts).then(onSuccess, onFail);
  ```

  提供[示例](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E7%A1%AC%E4%BB%B6/mediaDevices/%E5%85%B1%E4%BA%AB%E5%B1%8F%E5%B9%95%E5%B9%B6%E5%BD%95%E5%88%B6)

### MediaStream
- 实例方法
  - getTracks()

    获取该流所有媒体流轨道对象

  - getVideoTracks()

    获取该流所有视频轨道对象，即kind为video的MediaStreamTrack对象

  - getAudioTracks()

    获取该流所有音频轨道对象，即kind为audio的MediaStreamTrack对象

- 示例
  ```js
  let currentStream = null
  navigator.mediaDevices.getUserMedia({
    video: { 
      deviceId: "5f910b43-d82a-4c6e-a7d4-f4f0d1c4a8b8" 
    },
  }).then((stream) => {
    // 停止前一个摄像头
    if(currentStream) {
      currentStream.getTracks().forEach((track) => track.stop())
    }
    currentStream = stream
    
    // 浏览器显示摄像头内容
    const video = document.createElement("video")
    video.srcObject = stream
    document.body.append(video)
  })
  ```

- [学习链接](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)

### MediaStreamTrack
- 实例方法
  - getCapabilities()

    返回一个对象，详细说明了基于平台和用户代理的关联MediaStreamTrack的每个可约束属性的可接受值或值范围
  
  - getSettings()

    返回一个对象，描述轨道可约束属性的当前配置

  - stop()

    停止轨道，释放相关资源

- [学习链接](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack)

### MediaRecorder
- 构造函数
  ```js
  // 指定MediaStream对象
  new MediaRecorder(mediaStream)
  ```

- 静态方法
  ```js
  // 指定的MIME媒体类型是否被当前用户代理支持，返回一个布尔值
  MediaRecorder.isTypeSupported(mimeTypeStr)
  ```

- 实例属性
  ```js
  // 当前录制状态，有recording、paused、inactive三种状态
  mediaRecorder.state
  ```

- 实例方法
  ```js
  // 开始录制
  mediaRecorder.start()
  // 暂停录制
  mediaRecorder.pause()
  // 继续录制
  mediaRecorder.resume()
  // 停止录制
  mediaRecorder.stop()
  ```

- 事件
  ```js
  // 触发时机：
  // 1、录制器调用带有时间片参数的start方法时，根据时间片触发
  // 2、录制器调用requestData方法时触发(创建新的blob，继续捕获)
  // 3、录制器调用stop方法时触发(分发给当前的blob，停止捕获)
  // 4、媒体流结束
  // 详见https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/dataavailable_event
  mediaRecorder.addEventListener("dataavailable", (e) => {
    // data属性返回包含媒体数据的Blob对象
    const data = e.data
  });
  ```

- 示例
  
  [访问摄像头并录制](https://github.com/muzhidong/blog-demo/blob/main/docs/01html/%E7%A1%AC%E4%BB%B6/mediaDevices/%E8%AE%BF%E9%97%AE%E6%91%84%E5%83%8F%E5%A4%B4%E5%B9%B6%E5%BD%95%E5%88%B6.html)

  [DOM快照录制3种方式](https://github.com/muzhidong/blog-demo/tree/main/docs/01html/%E7%A1%AC%E4%BB%B6/mediaDevices/DOM%E5%BF%AB%E7%85%A7%E5%BD%95%E5%88%B6)

## 陀螺仪
- 事件
  ```js
  // 获取移动设备方向 
  // 左手定则，沿x轴旋转的方向称为beta，沿y轴旋转的方向称为gamma，沿z轴旋转的方向称为alpha
  window.addEventListener('deviceorientation',function(e){
    console.log('x轴旋转角度（-180-180deg）为',e.beta);
    console.log('y轴旋转角度（-90-90deg）为',e.gamma);
    console.log('z轴旋转角度（0-360deg）为',e.alpha);
    // 值为true表示方向数据跟地球坐标系和设备坐标系有差异，为false表示方向数据由设备本身的坐标系提供
    console.log(e.absolute);
  });

  // 获取移动设备运动加速度
  window.addEventListener('devicemotion', function(e){
    // 表示设备在x、y、z轴三个方向移动的加速度，不包括重力加速度
    console.log(e.acceleration);
    // 表示设备在x、y、z轴三个方向移动的加速度，包括重力加速度
    console.log(e.accelerationIncludingGravity);
    // 表示设备在alpha、beta、gamma三个方向的旋转角度
    console.log(e.rotationRate);
    // 表示从设备获取数据的频率，单位毫秒，默认是16，即一帧
    console.log(e.interval);
  });
  ```

- 示例：[摇一摇](https://github.com/muzhidong/blog-demo/blob/main/docs/01html/%E7%A1%AC%E4%BB%B6/gyroscope.html)

## 打印机
- 方法和事件
  ```js
  // 打印pdf：创建iframe，加载要打印的pdf文档，最后使用该iframe的window.print方法进行打印
  function printPDF(pdfSrc, beforePrintCb, afterPrintCb) {
    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.left = '-9999px'
    iframe.style.top = '-9999px'
    iframe.src = pdfSrc
    iframe.addEventListener('load', () => {
      const iframeWin = iframe.contentWindow
      // FIXME:事件未触发
      iframeWin.addEventListener("beforeprint", function () {
        beforePrintCb && beforePrintCb()
      })
      iframeWin.addEventListener("afterprint", function () {
        afterPrintCb && afterPrintCb()
      })
      iframeWin.print()
    })
    document.body.appendChild(iframe)
  }
  ```

- 设置打印文档的分页方式
  
  [break-after](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-after)
  
  [break-before](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-before)
  
  [break-inside](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-inside
)

- 设置打印文档中分页的方向、大小、边界

  [@page规则](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@page)

- 支持对打印文档设置更多样式

  [@media print](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing)
  ```html
  <!-- 另一种专用样式声明方式 -->
  <link rel="stylesheet"media="print" href="print.css" />
  ```

  [page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/page)

- 更多链接
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Paged_media
  - https://drafts.csswg.org/css-page/#intro

## WebXR
### WebAR
#### AR特点
- 优点：跨平台；传播方便（URL格式传播）
- 缺点：各浏览器标准不统一；3D内容加载慢，无法实现复杂内容；渲染质量低，无法实现复杂交互（受限于浏览器传统交互方式）

#### AR实现方式
- 光学透视式
  
  将电脑生成的数字图像显示在眼前的一层半透明镜片上，使现实场景和虚拟信息同时出现在视网膜上

  现实场景未经电脑处理，显示更自然、直接，实现简单；
  
  定位精度不高、匹配不准、显示有延迟

- 视频透视式

  将现实场景通过相机录入电脑，经过和虚拟对象整合、压缩，再统一呈现在用户眼前

  经过整合，匹配准确，显示延迟低

  实现难度大，丢失部分真实感

#### AR开发步骤
![](/html/WebAR开发步骤.jpg)

- 获取视频流：WebRTC(关键API是getUserMedia)
- 识别跟踪：前端处理(Tracking.js + JSFeat、ConvNetJS、deeplearn.js、kera.js)或后端处理(上传图片信息或像素信息)
- 渲染交互：A-Frame、Three.js、Babylon.js、Pixi.js、WebGL
  ```html
  <!-- A-Frame实现AR： -->
  <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js"></script>
  <body style='margin : 0px; overflow: hidden;'>
    <a-scene embedded arjs='sourceType: webcam;'>
      <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
      <a-marker-camera preset='hiro'></a-marker-camera>
   </a-scene>
  </body>
  ```

> 附上[WebAR示例](https://github.com/muzhidong/blog-demo/blob/main/docs/01html/%E7%A1%AC%E4%BB%B6/webAR.html)

#### AR相关框架
- WebARonARKit & WebARonARCore：谷歌AR SDK，前者用于iPhone手机，后者用于(Android手机。均具备运动追踪、环境感知和光线感应等功能
- model-viewer
  
  谷歌实现的一个web component，可用于查看Web上的3D模型并与之交互

  ```html
  <!-- 引入方式 -->
  <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
  <!-- 使用方式 -->
  <model-viewer 
    src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
    ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz"   
    alt="A 3D model of an astronaut"   
    ar
    auto-rotate   
    camera-controls>
  </model-viewer>
  ```
- [three.ar.js](https://github.com/google-ar/three.ar.js)
- [unity-webxr-export](https://github.com/De-Panther/unity-webxr-export)
- [AR.js](https://github.com/jeromeetienne/AR.js)
- [ARToolKit](http://www.hitl.washington.edu/artoolkit/)
- [JSARToolKit](https://github.com/kig/JSARToolKit)：主要提供识别和追踪marker的功能，1999年发布，一直更新至今
- [argon.js](https://www.argonjs.io/)
- [awe.js](https://awe.media/#main)
- [tracking.js](https://github.com/eduardolundgren/tracking.js)

#### 优化手段
- 把可事先计算或实时性要求不高的代码(如布局算法)移到`WebGL shader`或`Web Worker`里。其中，WebGL调用GPU加速，但注意shader加速只和渲染有关的代码，无关渲染的代码放入shader中反而会造成重复计算。可以考虑下使用`gpu.js`，将简单的JavaScript函数转换为着色器语言并编译它们，以便在GPU上运行。如果GPU不可用，函数仍将在常规 JavaScript中运行  
- WebAssembly
- 使用滤波算法(如卡尔曼滤波)将卡顿降到更小，让用户从视觉感受上似乎更流畅

#### AR市面产品
- [Kivicube](https://www.kivicube.com/)
- [EasyAR](https://www.easyar.cn/)
- [8thWall](https://www.8thwall.com/)

### VR
虚拟现实。利用电脑模拟产生一个三维空间的虚拟世界，提供用户关于视觉等感官的模拟，让用户感觉仿佛身历其境，可以即时、无限制地观察三维空间内的事物。用户进行位置移动时，电脑可以立即进行复杂的运算，将精确的三维世界影像传回，产生临场感。

与基于现实场景进行增强效果的AR的区别在于，VR场景需要完全重建，类似于进入另一个世界。
