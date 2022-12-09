---
title: BOM基础
tags: 
- Web技术
---
# BOM基础

## BOM简介
BOM英文全称是Browser Object Model，即浏览器对象模型，为了便于操作浏览器而产生。W3C并没有对BOM统一标准，使用时有兼容性问题。
<!--more-->

## window
### 定义
表示浏览器的窗口，是最顶层的对象
### 属性
- frames

  获取当前窗口下所有子窗体组成的数组对象。每个iframe标签都对应一个window对象
- length
  
  获取当前窗口下的iframe数量
- name

  获取窗口名称
- parent

   获取当前窗口的父窗口
- top

  获取顶级父窗口
- self

  获取当前窗口
- innerWidth

  获取页面的像素宽度，受resize事件影响
- innerHeight

  获取页面的像素高度，受resize事件影响
- pageXOffset

  获取页面相对于窗口显示区左上角的X方向偏移量
- pageYOffset

  获取页面相对于窗口显示区左上角的Y方向偏移量
- screenX

  获取窗口相对于屏幕的X方向位置
- screenY

  获取窗口相对于屏幕的Y方向位置
- outerWidth

  获取浏览器窗口的可见区域宽度，受resize事件影响
- outerHeight

  获取浏览器窗口的可见区域高度，受resize事件影响
- opener

  获取对创建此窗口的窗口的引用。比如在a.html打开b.html，需要从b.html传递一个数据给a.html上某节点，代码如下，

  ```javascript
  window.opener.document.getElementById(id).value =data;
  ```

> 扩展：全局变量与window对象属性的联系与区别
>- 联系
>
>  全局变量可以作为window对象的属性进行访问
>- 区别
>
>  全局变量不能直接delete，window对象属性能直接delete；访问未声明的全局变量会抛错，访问window对象未定义的属性不抛错

### 方法
- setTimeout(cb,ms,...args)

  经过指定毫秒值计算一个表达式或调用某一个函数。第二个参数表示延时参数，确切地说是该回调进入消息队列的延迟时间，而非该回调执行的延迟时间，如果该回调进入队列时前面没有其他函数待处理，那么该回调确实是延迟这个时间点执行，否则需等待前面的函数处理结束后才可以执行，所以延迟时间也可以理解为该回调最短延迟时间。所以如果延时为0，也不表示零延迟，只能说明最短延迟时间为0。
- setInterval(cb,ms,...args)

  每经过指定毫秒值计算一个表达式或调用某一个函数。参数含义同setTimeout。
- clearTimeout(timer)

  取消先前用setTimeout设置的超时事件
- clearInterval(timer)

  取消先前用setInterval设置的间隔事件
- moveTo(x,y)

  窗口移动到指定位置
- moveBy(x,y)

  窗口相对于当前位置移动一定的偏移量
- scrollBy(x,y)

  页面相对于当前滚动的偏移量
- scrollTo(x,y)

  页面滚动到指定位置
- resizeTo(x,y)

  窗口重置为指定大小
- resizeBy(x,y)

  窗口相对于当前大小进行大小偏移
- open(url[,target][,option])
  
  打开新的窗口，需指定要打开的url，也可指定执行打开的窗口或框架目标，如_self、_parent、_top、_blank，和设置被打开窗口的选项字符串，如宽高、大小是否拖动边框可变、是否显示地址栏、菜单栏、工具栏、滚动条、状态栏等等。结果返回新打开的窗口对象。
  
  扩展：
  - 弹窗安全限制
  1. 不允许在屏幕外创建弹出窗口
  2. 不允许将弹出窗口移动到屏幕以外
  3. 不允许关闭状态栏
  4. 不允许关闭地址栏
  5. 默认下不允许移动弹出窗口或调整大小
  6. 只能根据用户创建弹出窗口，因此页面加载时调用open方法是无效的
  - 弹出窗口屏蔽检测
  ```javascript
  function checkWindowBlocked(url){
    var blocked = false;
    try{
      var win = window.open(url);
      if(win == null){
        blocked = true;
      }
    }catch(ex){
      blocked = true;
    }
    if(blocked){
      alert("弹窗被屏蔽");
    }
  }		
  ```

- close()

  关闭窗口
- alert(content)

  弹出警告消息框，指定警告内容，带有确定按钮
- confirm(content)

  弹出确认消息框，指定确认内容，带有确定和取消按钮
- prompt(content,defaultValue)

  弹出提示消息框，指定提示内容和输入框默认值，带有确定和取消按钮
- print()

  弹出打印对话框
- find()

  弹出查找对话框
- getComputedStyle(ele[,pseudoElt])

  获取指定元素的样式，需要的话可以传入伪类元素。与ele.style的区别：ele.style只读取内联样式，而getComputedStyle读取内联样式、嵌入样式、外部样式等；ele.style支持读写，而getComputedStyle只支持读。
- showModalDialog(sURL[,vArguments][,sFeatures])

  打开模式对话框。其中sURL指定对话框要显示的文档URL，vArguments指定向对话框传递的参数，参数类型不限，而对话框通过window.dialogArguments取得传递进来的参数，sFeatures指定描述对话框的外观等信息，是一个可变参数

## location
### 作用
- 提供当前页面url信息
- 实现页面跳转

### 属性

  以 https://www.baidu.com/index.php?tn=22073068_2_dg#1111 为例，解释各属性含义。

- protocol

  协议名，即"https:"
- hostname

  主机名，不包括端口号，即"www.baidu.com"
- port

  端口号，即""
- host

  主机地址，包括端口号，即"www.baidu.com"
- pathname

  路径名，即"/index.php"
- search

  查询字符串，即"?tn=22073068_2_dg"
- href

  链接地址，即"https://www.baidu.com/index.php?tn=22073068_2_dg"
- origin

  源，即"https://www.baidu.com"
- hash

  哈希值，即"#1111"

### 应用： 封装获取查询字符串的函数
```javascript
function getQueryString(qs){

  if(typeof qs === "string"){
    var obj = {},arr;
    qs = qs.slice(1).split("&");
    for(item in qs){
        arr = qs[item].split("=");
        obj[arr[0]] = arr[1];
    }
    return obj;   
  }
  
  return qs;
  
}
```

### 修改当前url，会在浏览器历史中生成一条记录
```javascript
location.hash = "#home";
location.hostname = "www.baidu.com";
location.pathname = "/home/index";
location.search = "?key=liu&password=123456";
```

### 页面跳转
```javascript
// 方式一
window.location = url;
// 方式二
window.location.href = url;
// 方式三
window.location.assign(url);
//方式四：与assign区别在于，使用replace不可返回上一页面
window.location.replace(url);
```

### 页面重载
```javascript
//从缓存中重新加载
window.reload();
//从服务器重新获取数据进行加载
window.reload(true);
```
调用reload时，建议放在代码最后，因为该方法调用后的接下来的代码可能执行也可能不执行，取决于网络延迟或系统资源等因素。

## navigator
### 作用
识别浏览器
### 属性
- appCodeName   

  浏览器名称。基本是Mozilla
- appName       

  完整的浏览器名称
- appVersion    

  浏览器版本
- mimeTypes     

  浏览器注册的MIME类型数组
- platform      

  浏览器所在的系统平台 
- plugins       

  浏览器安装的插件信息数组。该数组对象有一方法叫refresh，当传入参数true时表示刷新包含插件的所有页面，否则表示更新插件信息，不刷新含插件的页面。数组中的每一项含有插件名name、插件描述description、插件文件名filename、插件处理的MIME类型数量length
- userAgent

  浏览器用户代理字符串。可用于判断浏览器类型和版本
### 方法
- cookieEnabled() 

  表示cookie是否启用
- javaEnabled()   

  表示当前浏览器是否启用java
- registerContentHandler(mime,url,appname)

  使站点注册一个处理程序处理指定MIME。其中mime表示要处理的mime类型，url表示要处理的url如http://xxx?feed=%s，%s表示源请求，appname表示要处理的应用程序名称
- registerProtocolHandler(protocol,url,appname)

  使站点注册一个处理程序处理指定协议。其中protocol表示要处理的协议名称，url表示要处理的url如http://xxx?cmd=%s，%s表示源请求，appname表示要处理的应用程序名称
### 应用
#### 判断桌面浏览器类型
```javascript
function getBrowserType(){
  var userAgent = window.navigator.userAgent;
  if(userAgent.indexOf("Trident")>-1){
      return "IE";
  }
  if(userAgent.indexOf("Firefox")>-1){
      return "Firefox";
  }
  if(userAgent.indexOf("Opera")>-1){
      return "Opera";
  }
  if(userAgent.indexOf("Edge")>-1){
      return "Edge";
  }
  if(userAgent.indexOf("Chrome")>-1){
      return "Chrome";
  }
  if(userAgent.indexOf("Safari")>-1){
      return "Safari";
  }
}
```

#### 插件检测
```javascript
function hasPlugin(pluginName){
  var userAgent = window.navigator.userAgent;
  if(userAgent.indexOf("Trident")>-1){
    // IE检测
    try{
      new ActiveXObject(pluginName);
      return true;
    }catch(e){
      return false;
    }
  }else{
    // 非IE检测
    for(var i = 0;i < navigator.plugins.length; i++){
      if(navigator.plugins[i].name.toLowerCase().indexOf(pluginName.toLowerCase()) > -1){
        return true;
      }
    }
    return false;
  }
}
```

## history
### 作用
保存用户访问网页的历史记录
### 属性
- length   
访问的历史页面数量
### 方法
- go(value) 

  跳转到历史列表的某页面。当value是number类型时，为正向前跳转value个页面，为负向后跳转；当value是string类型时，跳转到与value最匹配的页面。
- back()  

  向后跳转，相当于go(-1)
- forward() 

  向前跳转，相当于go(1)

## screen
### 作用
测定客户端能力
### 属性
- width 

  屏幕的像素宽度
- height 

  屏幕的像素高度
- availHeight 

  屏幕的像素高度减系统部件高度之后的值(只读)
- availWidth  

  屏幕的像素宽度减系统部件宽度之后的值(只读)
- colorDepth  

  用于表现颜色的位数(只读)

## 小结
浏览器在不断升级，而且不同浏览器在API会有差异，以上只是抛砖引玉，我们可以借助下面一个工具函数快速查阅API。
```javascript
(function lookUpAPI(bom){
  var attrArr=[];
  var funArr=[];
  var evtArr = [];
  for(key in bom){
    if(!bom.hasOwnProperty(key)) 
      continue;
    var type = toString.call(bom[key]);
    if(type === "[object Function]"){
      funArr.push({
        'method':key,
      })
    }else if(type === "[object Null]" && key.substr(0,2) === 'on'){
      evtArr.push({
        'event': key,
      })
    }else{
      attrArr.push({
        'attr':key,
      })
    }
  }
  console.log(`属性有${attrArr.length}个，方法有${funArr.length}个，事件有${evtArr.length}个`);
  console.table(attrArr);
  console.table(evtArr);
  console.table(funArr);
})(window);
```
