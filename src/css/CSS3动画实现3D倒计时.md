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
+ animationName表示动画名称，若存在多个相同的动画帧规则名称，则使用最后一个动画帧规则；
+ timeStamp表示时间点，可取值from，to或0-100%，其中from表示0%，to表示100%，若存在多个相同时间点则合并；
+ 每个时间点可以指定多个声明，会忽略值中的!important，声明也可以是animation的子属性，覆盖初始值。

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
<style>
.animation-table {
  tr:first-child {
    text-align: center;
  }
  tr:nth-child(2n) {
    background:var(--vp-c-bg-soft);
  }
}
</style>
<table class="animation-table">
<tbody>
  <tr>
    <td>属性名称</td>
    <td>含义</td>
  </tr>
  <tr>
    <td>animation-name</td>
    <td>keyframe规则名称，命名约束如下，由a-zA-Z0-9_-组成，禁止以两个短划线开头，且第一个非短划线字符必须是字母；<br/>
    可取值为none，用于取消动画；<br/>
    若指定多个名称，则用逗号分隔(下面属性同理)，动画同时执行，若属性冲突则覆盖，这点可见<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-composition">animation-composition</a>；<br/>
    若动画名称数量多于其他动画属性，则属性值分配会从可用列表中第一个值循环到最后一个值，然后再循环回第一个值，相反地，若动画名称数量少于其他动画属性，多出的动画属性值会被忽略</td>
  </tr>
  <tr>
    <td>animation-duration</td>
    <td>动画时长，默认值为0，需指定单位s或ms</td>
  </tr>
  <tr>
    <td>animation-timing-function</td>
    <td>动画速度曲线，默认值为ease，其他取值有关键字ease、ease-in、ease-out、ease-in-out、linear、step-start、step-end以及贝塞尔曲线函数<a href="https://cubic-bezier.com/" target="_blank">cubic-bezier</a>、步进函数steps、线性函数linear<br>附上<a href="https://easings.net/">常见的缓动曲线函数</a></td>
  </tr>
  <tr>
    <td>animation-delay</td>
    <td>动画延时，默认值为0，需指定单位s或ms；<br/>
    值为正时是延时，值为负时是超前，比如值为-1s表示动画立即从第1秒位置开始</td>
  </tr>
  <tr>
    <td>animation-iteration-count</td>
    <td>动画播放次数，默认为1，可取具体数值，或无限循环infinite</td>
  </tr>
  <tr>
    <td>animation-play-state</td>
    <td>动画当前状态，是执行中还是暂停，默认是running，其他取值有paused</td>
  </tr>
  <tr>
    <td >animation-fill-mode</td>
    <td>动画结束后目标的状态，默认是none，其他取值有forwards(应用动画的最后一帧)、backwards(应用动画的第一帧)、both。注意首、尾帧受animation-direction、animation-iteration-count影响</td>
  </tr>
  <tr>
    <td>animation-direction</td>
    <td>动画方向。可取值为正向播放normal(默认值)、倒向播放reverse、先正后倒alternate、先倒后正alternate-reverse</td>
  </tr>
  <tr>
    <td>animation-timeline</td>
    <td>控制动画进度的时间线，可以呈现出随用户滚动页面而执行动画的效果；<br/>
    可取值为auto(默认值)、none、scroll()（滚动时动画，适合无依赖的匿名滚动）、view()（可见时动画，适合无依赖的匿名主体）、滚动器或视图主体名标识（即scroll-timeline-name或view-timeline-name，适合有依赖的）；<br/>
    兼容性上，Chrome和Edge已支持，Safari开发中，在预发布版本中是支持的；<br/>
    有关属性<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range">animation-range</a></td>
  </tr>
</tbody>
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

