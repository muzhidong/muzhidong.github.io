---
title: HTML5系列之媒体篇
tags: 
- HTML5
---

本篇介绍什么是媒体和MIME，以及Web中常见的媒体如图片、音频、视频的有关知识，最后会介绍关于媒体流的编解码技术——WebCodecs。

## 媒体
- 定义：承载或传递信息的载体
- 分类

	| 类型    |   特点               |     形式         |     实现方式   |
	| ------ | -------------------- | --------------- | ------------- | 
	| 感觉媒体 | 人类感知客观 环境的信息 | 视觉，听觉，触觉 | 文字，图形，声音，图像，动画，视频等 |
	| 表示媒体 | 信息处理方式 | 计算机数据格式 | ASCII编码，图像编码，音频编码，视频编码 |
	| 显示媒体 | 信息表达方式 | 输入输出信息 | 显示器，打印机，扫描仪，投影仪，数码摄像机 |
	| 存储媒体 | 信息存储方式 | 存取信息 | 内存，硬盘，光盘，纸张 |
	| 传输媒体 | 信息传输方式 | 网络传输介质 | 电缆，光缆，电磁波 |

这里主要讲感觉媒体的形式，即
- 图：图形graphic，静止图像image
- 文：文本text
- 声：声音audio
- 像：动画animation，运动图像video

## 媒体格式
### 图片格式
- gif：无损图像格式(修改图片后图片质量几乎没有损失)；体积小；支持动画和透明；只能处理256种颜色
- png：无损图像格式(修改图片后图片质量几乎没有损失)；体积比gif小；透明效果过渡好，注意PNG格式分8位、24位、32位三种形式，其中8位和32位支持透明，24位不支持透明；存在浏览器兼容性问题；
- jpeg：有损图像格式(转换为jpg后质量受损)；体积大；不支持透明
- apng
	
	背景：基于PNG格式扩展的一种动画格式，增加了对动画图像的支持，目的是为了替代老旧的GIF格式
	
	图片质量：支持24位真彩色图片、支持8位Alpha透明通道、向下兼容PNG
	
	图片体积：无论是纯色图片或彩色图片，大部分情况下APNG比GIF、WebP以及有损的WebP的体积小
	
	兼容性好：https://caniuse.com/?search=APNG
	```javascript
	(function() {
		"use strict";
		var apngTest = newImage(); 
		var ctx = document.createElement("canvas").getContext("2d");
		apngTest.onload = function() {        
			ctx.drawImage(apngTest, 0, 0);
			// 获取data[3]，表示Alpha透明通道，当返回0时表示支持APNG，返回255则表示不支持APNG 
			self.apng_supported = ctx.getImageData(0, 0, 1, 1).data[3] === 0;
		};
		// 加载一张1x1像素大小的Base64编码图片
		apngTest.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";
	}());
	```

> [SVG、PNG、JPG图像格式的优点和缺点](https://zhuanlan.zhihu.com/p/53441916)

> exif技术：可交换图像文件格式，专门为数码相机的照片设定，可以获取照片的属性信息和拍摄数据。参考链接：
> 
>	[https://www.sojson.com/image/exif.html](https://www.sojson.com/image/exif.html)
>
>	[https://blog.csdn.net/taoszu/article/details/83051879](https://blog.csdn.net/taoszu/article/details/83051879)

### 音频格式
- MIDI：只能存储曲调，不能存储歌曲，扩展名为mid或midi
- RealAudio：针对因特网开发，是低带宽下的音频流，扩展名为rm或ram
- AU：支持大范围平台上各种软件系统，扩展名为au
- AIFF：Apple开发，既非跨平台又不被所有web浏览器支持，扩展名为aiff或aif
- SND：同AIFF，文件扩展名为snd
- WAVE：由IBM和Microsoft开发，支持所有运行Windows和所有最流行的web浏览器，其扩展名为wav
- MP3：运动图像专家组MPEG开发，高压缩高品质，其后缀名为mp3或mpga

### 视频格式
- AVI：微软开发，支持所有运行Windows和绝大多数最流行的web浏览器，其扩展名为avi
- Windows媒介：微软开发，扩展名为wmv
- MPEG：跨平台，且支持所有最流行的浏览器，扩展名为mpg或mpeg
- QuickTime：苹果开发，后缀是mov
- RealVideo：针对因特网开发，是低带宽下的视频流，扩展名为rm或ram
- hockwave(Flash)：MacroMedia开发，其后缀是swf

## 通用因特网邮件扩展MIME
描述消息内容类型的因特网标准，MIME消息包含文本，图像，音频，视频以及其他应用程序专用的数据。官方的MIME信息由IETF提供，[点这完整查看MIME类型列表](https://www.iana.org/assignments/media-types/media-types.xhtml)。这里只列举常见MIME类型与其对应的文件后缀：

不同格式的文本
- text/plain：txt
- text/html：html

不同格式的图像
- image/bmp：bmp
- image/gif：gif
- image/jpeg：jpg/jpeg
- image/png：png
- image/svg+xml ：svg

不同音频格式
- audio/mpeg：mp3

不同视频格式
- video/mp4：mp4
- video/x-msvideo：avi

不同应用程序产生的数据
- application/vnd.rn-realmedia-vbr：rmvb

不同模型
- model/vrml

不同报文
- message/http

多种类型的组合
- multipart/mixed
- multipart/alternative
- multipart/parallel
- multipart/digest

> 媒体资源范围请求
> - 请求头
>  
>  `Range`表示请求内容范围，如`Range:bytes=0-50`，表示请求从0到50字节位置的内容。若是多重范围，则逗号隔开，如`Range:bytes=0-50,100-150`
>
>  `If-Range`表示范围请求，服务器若返回206则表示支持范围请求，返回范围内容；若返回200则表示不支持范围请求，返回整个内容，若返回416则表示请求范围无法满足(Requested Range Not Satisfiable)，一般是请求范围越界
>
> - 响应头
>
>  `Accept-Range`表示界定范围的单位，如值为`bytes`则表示单位为byte
>
>  `Content-Range`表示内容的位置，如`bytes 0-50/1256`

## 图片
### 图片格式选型
![](/html/图片格式选型1.jpg)
![](/html/图片格式选型2.jpg)

### PNG图片数据块
![](/html/PNG文件格式中的数据块.jpg)

### 魔数
计算机并不是通过图片后缀区分图片类型，而是通过魔数(Magic Number)区分。图片类型与对应魔数列表如下

| 文件类型 | 文件后缀 |	魔数 |
|---------|--------|------|
| JPEG    | jpg/jpeg | 0xFFD8FF |
| PNG	    | png	   | 0x89504E47 |
| GIF	    | gif	   | 0x47494638（GIF8）|
| BMP	    | bmp	   | 0x424D |

## 音频
<!-- 
  TODO:
	音频有哪些监听事件，做什么有意思的事情? 
  下面示例待验证？
	AudioWorklet：https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet
-->

```javascript
// AudioContext实现录音和音频裁剪

// 应用一：录音
// 关键代码如下，
// 初始化
var context
var audioInput
var recorder
var audioData = {
  size: 0,   // 录音文件长度
  buffer: [] // 录音缓存
}

navigator.getUserMedia({ 
  audio: true 
},function (stream) {
  context = new AudioContext();
  audioInput = context.createMediaStreamSource(stream);
  
  recorder = context.createScriptProcessor(4096, 1, 1);
  recorder.onaudioprocess = function (e) {
    const data = e.inputBuffer.getChannelData(0)
    audioData.buffer.push(new Float32Array(data));
    audioData.size += data.length;
  }
})

// 开始录音
audioInput.connect(recorder);
recorder.connect(context.destination);

// 停止录音
recorder.disconnect();


// 应用二：音频裁剪
var audioCtx = new AudioContext();
// 假设arrBuffer是包含音频数据的ArrayBuffer对象，已获取到
audioCtx.decodeAudioData(arrBuffer, function(audioBuffer){
  // 声道数量和采样率
  var channels = audioBuffer.numberOfChannels;
  var rate = audioBuffer.sampleRate;

  // 截取前3秒
  var startOffset = 0;
  var endOffset = rate * 3;
  // 3秒对应的帧数
  var frameCount = endOffset - startOffset;

  // 创建同样采用率、同样声道数量，长度是前3秒的空的AudioBuffer
  var newAudioBuffer = new AudioContext().createBuffer(channels,frameCount, rate);
  // 创建临时的Array存放复制的buffer数据
  var anotherArray = new Float32Array(frameCount);

  // 声道的数据的复制和写入
  var offset = 0;
  for(var channel = 0; channel < channels; channel++){
    audioBuffer.copyFromChannel(anotherArray, channel, startOffset);
    newAudioBuffer.copyToChannel(anotherArray, channel, offset);
  }

  // 创建AudioBufferSourceNode对象
  var source = audioCtx.createBufferSource();
  // 设置AudioBufferSourceNode对象的buffer为复制的3秒AudioBuffer对象
  source.buffer = newAudioBuffer;
  // 这一句是必须的，表示结束，没有这一句没法播放，没有声音
  // 这里直接结束，实际上可以对结束做一些特效处理
  source.connect(audioCtx.destination);
  // 资源开始播放
  source.start();
});
```

## 视频
- 视频字幕

	1、准备vtt文件，其全名为video text tracks，即视频文本轨道，具体[点这](http://dev.w3.org/html5/wbevtt)了解。WebVTT文件格式如下：
  ```txt
	WEBVTT
		
	[主题1 ID]
	[hh:]mm:ss.msmsms --> [hh:]mm:ss.msmsms
	字幕文本

	[主题2 ID]
	[hh:]mm:ss.msmsms --> [hh:]mm:ss.msmsms
	字幕文本
  ``` 
	其中，主题又叫Cue，在WebVTT文件中可以有多个，包括可选的主题id、时间范围(不足补0)、一行或多行的字幕。示例如下，
	```txt
	WEBVTT

	00:00:01.000 --> 00:00:05.000
	这是前5秒内的视频字幕...

	00:00:06.000 --> 00:00:10.000
	这是从第6秒开始的视频字幕，持续5秒...

	00:00:11.000 --> 00:10:00.000
	这是从第11秒开始的视频字幕，持续近10分钟...
	```
	
	2、应用track标签，指定src属性和kind属性。src属性指定web vtt文件源，kind属性表示文本文件类型，可取值captions、chapters、descriptions、metadatah、subtitles。该元素只能用在video、audio元素中。示例如下，
	```html
	<video width="400"
		height="300"
		autoplay
		controls
		id="video">
    <source src="./assets/music.mp4" type="video/mp4" />
    <!-- 设置视频字幕 -->
    <track kind="subtitles" src="./assets/webvtt.vtt" default />
    当前浏览器暂不支持视频播放
  </video>
	```
  
	3、可以通过伪元素`::cue`为字幕设置样式，示例如下，
	```css
	/* 视频字幕样式 */
	video::cue {
		background-color: transparent;
		color: orange;
		text-shadow: 1px 1px 2px #fff;
		font-size: medium;
	}
	```

- 视频画中画

	```js
	// 关键代码
	window.addEventListener('load', function () {
    const videoEl = document.querySelector('#video');
		const btnEl = document.querySelector('#btn-video');
		
		// 监听视频画中画启动事件
    videoEl.addEventListener('enterpictureinpicture', function (e) {
      console.log('启动画中画,', e);
    }, false);
		
		// 监听视频画中画关闭事件
    videoEl.addEventListener('leavepictureinpicture', function (e) {
      console.log('关闭画中画,', e);
    }, false);

    btnEl.addEventListener('click', function () {
			// 视频元素是否是画中画元素
      if (videoEl !== document.pictureInPictureElement) {
				// 开启画中画
        videoEl.requestPictureInPicture().then(pictureInPictureWindow => {
					// 监听画中画窗口大小变化事件
          pictureInPictureWindow.addEventListener('resize', function (e) {
            console.log(`画中画大小变化了,`, e);
          }, false)
        })
      } else {
				// 关闭画中画
        document.exitPictureInPicture();
      }
    }, false);
  }, false);
	```

- 常见问题

  - 浏览器针对视频自动播放的策略
  
    IOS：早期需要有用户手势，video标签方可自动播放；版本10开始，苹果放宽inline和autoplay属性，即无音频源或禁音且可见的video元素允许自动播放

    Android：早期需要有用户手势，video标签方可自动播放；chrome53后放宽自动播放策略，需要对video同时设置autoplay和muted，方可允许自动播放

    Safari：早期支持自动播放；Safari10后，未禁音的视频和音频默认禁止自动播放

    Chrome：早期支持自动播放；之后未禁音的视频根据媒体参与指数MEI决定能否自动播放。MEI是一个评估用户对于当前站点的媒体参与程度的指数，它取决于下面几个维度：
    - 用户在媒体上停留时间超过7秒以上
    - 音频必须展示出来，且没有静音
    - 与video之间有过交互
    - 媒体的尺寸不小于200×140

    ```javascript
    // 在限制自动播放的同时，提供检测视频是否能自动播放的机制，以便于开发者在发现无法自动播放时有备选方案
    const videoEl = document.querySelector('video')
    const promise = videoEl.play()
    if (promise !== undefined) {
      promise.catch(error => {
        // Auto-play was prevented
        // Show a UI element to let the user manually start playback
      }).then(() => {
        // Auto-play started
      })
    }
    ```

    ```javascript
    // 微信中可通过WeixinJSBridgeReady事件进行自动播放
    document.addEventListener('WeixinJSBridgeReady', function() {
      video.play()
    },false)
    ```

  - 取消默认全屏：在移动端浏览器中，video在用户点击播放或者通过`video.play()`触发播放时，会强制以全屏置顶的形式进行播放
    ```html
    <!-- playsinline 取消全屏 -->
    <video src="" webkit-playsinline playsinline></video>
    ```

  - 播放控制
    - 兼容性较好的事件：ended、timeupdate、play、playing
    - 若在IOS中监听了`canplay`事件(表示是否已缓冲了足够的数据可以流畅播放)，需有播放才触发，其他浏览器加载时触发

  - 隐藏播放控件
    - 在PC端和IOS移动端兼容性良好，而在安卓移动端并不支持隐藏控件。如何处理？让视频元素比父容器还大，使底部控制条在父容器外，然后为父容器设置overflow:hidden，实现播放控件隐藏
    - 腾讯x5内核团队放开视频播放限制，利用`x5-video-player-type='h5'`属性隐藏控件元素，同时视频不再置顶，允许其他元素浮动在顶层

## WebCodecs
<!-- TODO: -->
- https://w3c.github.io/webcodecs/
- https://zhuanlan.zhihu.com/p/414563650
