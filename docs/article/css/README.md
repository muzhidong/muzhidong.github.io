---
title: CSS3动画实现3D倒计时
tags: 
- CSS3
---
# CSS3动画实现3D倒计时

在实现倒计时效果前，先回顾下CSS3动画如何使用，两步即可搞定。

## CSS3动画的使用
### 定义动画规则  
```css
@keyframe animationName {  
  timeStamp {  
    attr1: value1;  
    attr2: value2;  
    ...
    attrN: valueN;  
  }  
}
```

说明：   
+ animationName表示动画名称；
+ timeStamp表示时间点，可取值from，to或0-100%，其中from表示0%，to表示100%；
+ 每个时间点可以指定多个声明。

### 绑定动画  
```css
selector {  
  animation: animationName animationDuration;   
}
```

说明：
* selector表示元素使用的选择器
* 执行一个动画至少指定动画名称animationName和动画时长animationDuration
* animation属性是以下属性的简写形式，每个属性的含义说明如下，

<!--more-->
<table style="border:1px solid black;">
  <tr style="text-align:center;">
    <td style="border-right:1px solid black;">属性名称</td>
    <td>含义</td>
  </tr>
  <tr style="background:#F8F9FA;">
    <td style="border-right:1px solid black;">animation-name</td>
    <td>@keyframe动画的名称</td>
  </tr>
  <tr>
    <td style="border-right:1px solid black;">animation-duration</td>
    <td>动画的时长，需指定单位如s或ms，默认值为0</td>
  </tr>
  <tr style="background:#F8F9FA;">
    <td style="border-right:1px solid black;">animation-timing-function</td>
    <td>动画的速度曲线，默认值为ease，其他取值有ease-in、ease-out、ease-in-out、linear、step-start、step-end、贝塞尔曲线函数cubic-bezier、步进函数steps</td>
  </tr>
  <tr>
    <td style="border-right:1px solid black;">animation-delay</td>
    <td>动画延时多久开始，需指定指定单位如s或ms，默认为0，，取正值表示延时，负值表示超前</td>
  </tr>
  <tr style="background:#F8F9FA;">
    <td style="border-right:1px solid black;">animation-iteration-count</td>
    <td>动画播放次数，默认为1</td>
  </tr>
  <tr>
    <td style="border-right:1px solid black;">animation-direction</td>
    <td>动画是否在下一周期逆向播放，默认是normal，其他取值有reverse、alternate、alternate-reverse</td>
  </tr>
  <tr style="background:#F8F9FA;">
    <td style="border-right:1px solid black;">animation-play-state</td>
    <td>动画的播放状态，是运行还是暂停，默认是running，其他取值有paused</td>
  </tr>
  <tr>
    <td style="border-right:1px solid black;">animation-fill-mode</td>
    <td>动画执行前、后是否应用目标状态，默认是none，其他取值有forwards、backwards、both</td>
  </tr>
</table>

## 3D倒计时效果
### 代码介绍

* HTML部分

  ``` HTML
  <!--用于呈现数字-->
  <div id="number"></div>
  <!--用于重新倒计时-->
  <button class="button">再来一次</button>
    <!--用于最后的声音播放。-->
  <audio ></audio>
  ```

* CSS部分

  ``` CSS  
  /*初始化数字div样式*/
  #number {
    position: absolute;
    top: 50%;
    left: 50%;

    text-align: center;

    -webkit-transform: translate3d(-50%, -50%, 0);
    -moz-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }
  
  /*绑定动画*/
  .number-anim {
    -webkit-animation: animation_in 10s linear;
    -moz-animation: animation_in 10s linear;
    /*动画时长是10s，且动画的速度是线性的*/
    animation: animation_in 10s linear;
  }
  
  /*定义动画规则*/
  @keyframes animation_in {
    0 {}
    10% {
      /*由于动画时长是10s，此时是1s时刻,字体大小变为100px，z方向距离主屏幕为300px*/
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    11% {
      /*随后字体大小变为300px，z方向距离主屏幕为0，后面每到整秒数都会重复进行*/
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    20% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    21% {
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    30% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    31% {
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    40% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    41% {
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    50% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    51% {
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    60% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    61% {
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    70% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    71% {
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    80% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    81% {
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    90% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
    91% {
      font-size: 300px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      -moz-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
    }
    100% {
      font-size: 100px;
      -webkit-transform: translate3d(-50%, -50%, -300px);
      -moz-transform: translate3d(-50%, -50%, -300px);
      transform: translate3d(-50%, -50%, -300px);
    }
  }
  ```

* JS部分

  ``` JavaScript  
  window.onload = function() {
    //第一步：定义全局变量
    num = 10;//数字内容
    isCounting = true;//是否正在计数
    timer = null;//定时器
    numberDiv = document.querySelector("#number");
    audio = document.querySelector("audio");
    button = document.querySelector(".button");
    
    //第二步：初始化
    init();
    
    //第三步：开始倒计时
    timer = setInterval(count, 1000); 
  }
  ```

  初始化函数声明如下，
  
  ``` JavaScript
  function init() {
    numberDiv.innerHTML = num;
    numberDiv.style.color =  getRandomColor();
    numberDiv.style.fontSize = "300px";
    numberDiv.className = "number-anim";
    
    button.addEventListener("click", function() {
      if (isCounting) {
        return;
      }
      isCounting = true;
      num = 10;

      numberDiv.innerHTML = num;
      numberDiv.style.color = getRandomColor();   
      numberDiv.style.fontSize = "300px";
      
      //先解绑，再使用setTimeout使浏览器重新渲染页面，重新绑定
      //setTimeout只是一种方式，只要能使浏览器重新渲染即可      
      numberDiv.className = null;
      setTimeout(function() {
        numberDiv.className = "number-anim";
        timer = setInterval(count, 1000);
      }, 30); 
    }, false);
  }
  ```
  
  倒计数函数声明如下，

  ``` JavaScript
  function count() {
    numberDiv.innerHTML = --num;
    numberDiv.style.color = getRandomColor();
    
    if (num == 0) {
      clearInterval(timer);

      audio.src="./audio/readygo.mp3";
      audio.play();

      numberDiv.innerHTML = "Ready Go!";
      numberDiv.style.color = getRandomColor();
      numberDiv.style.fontSize = "100px";

      numberDiv.style.opacity = 0.8;
      numberDiv.style.filter = "alpha(opacity=80)";
      CompatibleFunc(numberDiv, "Transition", "opacity 1s");

      isCounting = false;
    }
  }
  ```

这里有一个地方需要特别注意，避免以后踩坑。

#### 关于动画样式的解绑与绑定
动画样式animation一执行结束，就不再起作用了，要使其重新生效，需要重新绑定。我试了4种方式。

* 第一种是直接解绑，然后再绑定。  

  ``` JavaScript
  numberDiv.className = null;
  numberDiv.className = "number-anim";
  ```

  结果是不能使动画重新生效。

* 第二种是使用classList属性进行解绑定。  

  ``` JavaScript
  numberDiv.classList.toggle("number-anim");
  numberDiv.classList.toggle("number-anim");
  ```

  classList返回类名列表对象，调用toggle方法，若类名存在则删除，返回false，若类名不存在则添加，返回true，所以要调用两次，第一次删除类名，第二次添加类名。但是结果依然是不能使动画重新生效。

* 第三种是开启定时器。  

  先解绑，再利用定时器使浏览器重新渲染页面，重新绑定。setTimeout只是一种方式，只要能使浏览器重新渲染即可，最终动画重新生效。

  ```JavaScript
  numberDiv.className = null;
  setTimeout(function() {
    numberDiv.className = "number-anim";
  }, 30);
  ``` 
  
  在mozilla官方文档介绍了另一种重新渲染方式（现已改用`Element.animate()`API处理），
  
  [https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Tips](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Tips)
    
  应用在这里的话，写法是，
  
  ```JavaScript
  numberDiv.className = null;
  window.requestAnimationFrame(function(){
    window.requestAnimationFrame(function(){
      numberDiv.className = "number-anim";
    });
  });
  ```

* 第四种是借助其他重新渲染途径，如颜色、内容、大小的变化。
  
  ```JavaScript
  numberDiv.className = null;
  
  numberDiv.innerHTML = num;
  numberDiv.style.color = getRandomColor();   
  numberDiv.style.fontSize = "300px";
  
  numberDiv.className = "number-anim";
  ```

  结果IE和Edge浏览器是支持的，但是FireFox和Chrome不支持，但这是不是也说明了Chrome和FireFox已经对浏览器渲染做了优化？
  
  简而言之，要使动画重新生效，需要触发浏览器两次渲染，一次解绑，一次绑定，不能在同一次渲染操作，否则浏览器会视为无变化。

### 最终效果
<p style="margin:10px 0;">由于是压缩生成的gif，所以看起来会很快。</p>

![倒计时](/count.gif)

最后附上源码链接[https://github.com/muzhidong/frontend-demo/tree/master/countdown](https://github.com/muzhidong/frontend-demo/tree/master/countdown)

