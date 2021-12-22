---
title: HTML5系列——video实现简易版弹幕视频
tags: 
- HTML5
---
认识两个HTML5标签，分别是video和source。

## video标签属性
* autoplay：表示视频是否就绪后马上播放，值为autoplay
* controls：表示是否向用户显示控件，值为controls
* height：表示视频播放器高度
* width：表示视频播放器宽度
* loop：表示当媒介文件完成播放后是否再次开始播放，值为loop
* preload：表示视频是否在页面加载时进行加载，并预备播放，若使用autoplay，则忽略该属性，值为preload
* poster：指定视频加载时显示的图片url
* src：指定要播放的视频url

## source标签属性
* src：指定要链接的媒介资源URL 
* type：表示资源的MIME类型。比如在video标签中支持类型有video/mp4、video/ogg和video/webm

## 如何制作一个简易版弹幕视频？
* HTML部分  
  
   内容分为屏幕层和弹幕层，屏幕层由视频、输入框和按钮组成，比较简单。

    ``` html
    <!--屏幕层-->
    <div class="screen">
        <!--视频-->
        <video class="screen-video" autoplay loop>
            <source src="./video/happy.mp4" type="video/mp4">
            您的浏览器不支持 video 标签。
        </video>
        <!--输入框-->
        <input type="text" class="screen-input">
        <!--发送按钮-->
        <input type="button" value="发送" class="screen-button" onclick="send()">
    </div>
    <!--弹幕层-->
    <div class="barrage"></div>
    ```

* CSS部分

    布局结合百分比布局和REM布局，使网页响应式，体验稍好。
    
    ``` CSS
    .screen-video {    
        width:80%;
        margin: 1rem 10%;
        border: 1px solid white; 
        
        /*填充父元素，IE和Edge不支持,真头疼！！！*/
        object-fit: fill;      
    }
    
    .screen-input {
        position: absolute;
        left:10%;
    
        height: 1.5rem;
    
        line-height: 1.5rem;
        font-size: 1rem;
    }
    
    .screen-button {
        position: absolute;
        right: 10%;
    
        height: 1.5rem;
    
        line-height: 1.5rem;
        letter-spacing: 0.2em;
        font-size: 0.8rem;
    
        cursor: pointer;
    }
    
    .barrage {
        position: absolute;
        left:10%;
    
        width: 80%;
        
        /*x轴方向上超过则隐藏内容*/
        overflow-x: hidden;
        
        z-index: 999;
    }
    ```


* JavaScript部分

    第一步，设置事件监听

    ``` JavaScript
    //窗口加载时初始化
    window.addEventListener("load",init,false);
    //窗口大小变化时重新初始化
    window.addEventListener("resize",init,false);
    //输入框回车时发送弹幕文字
    content.addEventListener("keyup",function(event) {
        var e = event||window.event;
        if (e.which == "13"|| e.keyCode =="13") {
            send();
        }
    },false);
    ```

   第二步，事件处理  
  + 初始化  
    
    ``` JavaScript
    function init(){
    
        // 实现REM布局需要根据窗口大小来控制根字体大小
        // 浏览器默认字体大小是16px，最小字体是12px
        html.style.fontSize = parseInt(doc.clientWidth /45)+"px";
        if(parseInt(html.style.fontSize)<12){
            html.style.fontSize = "12px";
        }
        
        //设置video的高度
        video.style.height =  parseInt(video.offsetWidth/16*9)+"px";
        //设置input的宽度
        content.style.width = parseInt(video.offsetWidth - btn_send.offsetWidth)+"px";
        //设置button的位置
        btn_send.style.top = (video.offsetHeight + video.offsetTop *2)+"px";
        //设置barrage的位置和高度
        barrage.style.top =video.offsetTop +"px";
        barrage.style.height = video.offsetHeight +"px"; 
    }
    ```

    以前通过获取样式对象进行初始化，如下，
    
    ``` JavaScript
    var sstyle = screen.currentStyle||window.getComputedStyle(screen);
    var vstyle = video.currentStyle||window.getComputedStyle(video);
    ```

    之后放弃使用这种方式，一是有兼容性，比如获取margin，在Chrome和FF正常，但是到了IE和FF则不支持了，获取marginTop、marginLeft等则正常，虽然可以解决，但是为了这点问题，折腾半天，实在没必要。二是JS需要关注CSS是否应用了该样式，如果没有，那么获取的是默认值，比如margin默认值是auto，但是我想获取具体的数值，这就不好处理了。总之，涉及BOM操作的还是少用比较好。
    
  + 发送弹幕内容

    ``` JavaScript
    function send() {
        //发送内容
        var val = trim(content.value);
        //创建的节点
        var span;
        //偏移量
        var offset = 0;
        //帧ID
        var id;
        if (val != "") {
            //创建节点
            span = document.createElement("span");
            //设置文本
            span.innerHTML = val;
            //设置样式
            span.className = "barrage-span";
            //添加
            barrage.appendChild(span);
            //设置初始位置，注意添加元素后宽度和高度才生效。
            span.style.top = getRandomNumber(parseInt(video.offsetHeight-span.offsetHeight)) + "px";
            span.style.left =  video.offsetWidth+"px";
            span.style.color = getRandomColor();
            //设置监听事件
            span.addEventListener("mouseover", stop, false);
            span.addEventListener("mouseout", scroll, false);
            //默认初始文本滚动
            scroll();
        }
        content.value = "";
        
        function scroll() {
    
            offset += 2;
    
            span.style.transform = "translateX(-" + offset + "px)";
            span.style.transition = "transform 0s linear";
    
            if (offset >= parseInt(video.offsetWidth+span.offsetWidth)) {
                stop();
                barrage.removeChild(span);
            }else{    
                id = window.requestAnimationFrame(scroll);
            }  
        }
    
        function stop(){
            window.cancelAnimationFrame(id);
        }
    
        //去除两边空格
        function trim(s) {
            return s.replace(/(^\s*)|(\s*$)/g, "");
        }
    
        //指定范围内获取随机数
        function getRandomNumber(value) {
            return parseInt(Math.random() * value);
        }
    
        //获取任意颜色
        function getRandomColor() {
            var color = "#";
            var j;
            for (var i = 0; i < 6; i++) {
                j = getRandomNumber(16);
                color += str.substring(j, j + 1);
            }
            return color;
        }
    }
    ```

    在处理发送弹幕时，发现文字不时会超出弹幕层，从而出现滚动条，结果发现是下面这句代码出现了问题，
    
    ``` JavaScript
    span.style.top = getRandomNumber(parseInt(video.offsetHeight-span.offsetHeight)) + "px";
    ```
    
    span.offsetHeight打印结果总为0，后来把这句代码放在父元素添加span元素之后，即下面这句代码就可以了。这说明了要使元素的offsetWidth、offsetHeight等属性值生效，需要注意元素是否已经渲染到浏览器上，单单创建一个元素对象，但是没有添加到文档中，只是存放在内存，还没有被浏览器渲染。先记录下来，避免以后填坑，哈哈。
    
    ``` JavaScript
    barrage.appendChild(span);
    ```
    
#### 附上源码：
[https://github.com/muzhidong/frontend-demo/tree/master/barrage-video](https://github.com/muzhidong/frontend-demo/tree/master/barrage-video)
