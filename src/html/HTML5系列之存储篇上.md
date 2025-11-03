---
title: HTML5系列之存储篇上
tags: 
- HTML5
---

这一篇让我们踏上客户端存储与离线技术之旅，篇幅比较长，分为上篇和下篇。现在正式开始！


## 客户端存储简介

### 特点

- 客户端存储遵循浏览器的同源策略，即同一站点的数据是共享的，而非同一站点不可共享。也不支持跨浏览器，同一站点在不同浏览器打开，数据无法共享。

- 客户端存储的数据都是未加密的形式，从安全角度而言，不应存储敏感信息。

### 存储方式

- cookie

  早期的客户端存储机制。

- Web 存储

  我们熟知的 localStorage 和 sessionStorage。

- Web 数据库存储

  介绍索引数据库 Indexed Database，其 API 大多是异步的，采用事件监听处理机制。

- 文件存储

  一个私有的本地文件系统，可利用其 API 进行文件的读写。

- ~~离线 Web 应用（已过时）~~

  ~~应用程序存储，存储着 Web 页面以及相关资源如 CSS、脚本、图像等。~~

> 除以上存储方式，还有另两种只简单提及下，不具体展开介绍。IE5 版本后，微软引入 IE 专有的客户端存储机制 userData，如果需兼容 IE8 及之前，可将其作为 Web 存储替代方案，这是第一种。另一种，起初各大厂商都有在浏览器内集成了客户端数据库，但 Web SQL API 标准化工作最终失败收尾，目前仅有索引数据库 API 还在标准化中。这两种技术在技术角逐中已被淘汰，了解即可。

## cookie
- 原理：在浏览器和服务器间传送自动携带信息的会话机制。请求时cookie会被自动携带，两端可对其进行读写，以`key=value;`形式进行存储，其中值不允许包含分号、逗号和空白符，建议存储前编码

- 用途：存储凭证，识别身份；缓存数据

- 不足：有数目、大小限制，即浏览器保存cookie不超过300个，服务器保存cookie不超过20个，cookie大小不超过4KB。消耗网络带宽。API操作繁琐

- 属性

  ```js
  // 有效期，过期自动删除，单位秒
  max-age
  // 过期时间，有效期是一个时长，而过期时间是一个时间点。如果想使用它删除cookie，过期时间设置成过去时间
  expires
  // 路径，可使用cookie的路径范围。若取值/，则表示整个站点均可访问
  path
  // 域，可使用cookie的域名范围。默认值是当前服务器主机名。若希望子域间共享cookie，可以设置为".一级域名.顶层域名"，比如希望在blog.mudong.xyz和docs.mudong.xyz两个域名下共享，设置domain值为".mudong.xyz"即可
  domain
  // cookie是否只在同站点被携带，默认是none，同域和跨域下均携带，也可取值strict、lax
  samesite
  // 是否仅在安全协议上被传输，默认不安全传输(http)，若声明该字段，则cookie只能通过https或其他安全协议传输
  secure
  // 是否仅用于服务器，若声明该字段，则禁止js脚本获取cookie
  httpOnly
  ```

- 操作 cookie

  ```Javascript
  // 添加或修改cookie
  function setCookie(name, value, maxAge, path, domain, secure) {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    if(maxAge){
      cookie += `; max-age=${maxAge}`;
    }
    if(path){
      cookie += `; path=${path}`;
    }
    if(domain){
      cookie += `; domain=${domain}`;
    }
    if(secure){
      cookie += `; secure`;
    }
    document.cookie = cookie;
  }

  // 删除cookie
  function deleteCookie(name) {
    document.cookie = `${name}=; max-age=0`;
  }

  // 查询cookie
  function getCookie(name) {
    const cookie = document.cookie.split("; ");
    for(let item of cookie) {
      item = item.split('=');
      if(item[0] === name) {
          return decodeURIComponent(item[1]);
      }
    }
    return '';
  }
  ```

## Web 存储

### localStorage

- 键和值都是字符串类型，所以若要存储对象，需要进一步封装处理如下。

  ```Javascript
  function getStorage(key){
    try{
      return JSON.parse(localStorage.getItem(key));
    }catch(e){
      return localStorage.getItem(key);
    }
  }

  function setStorage(key,value){
    try{
      localStorage.setItem(key,JSON.stringify(value));
    }catch(e){
      localStorage.setItem(key,value);
    }
  }
  ```

  > 当存储的是非字符串的基本数据类型时，获取返回的是字符串形式的值；当存储的是非对象字面量的引用数据类型时，获取返回的是值的 toString 形式。

- 存储 API

  ```Javascript
  // 获取键值对的长度
  length
  // 设置键值对
  setItem(key,value)
  // 获取指定键的值
  getItem(key)
  // 删除指定键
  removeItem(key)
  // 清空所有键
  clear()
  // 根据存储的索引获取指定的键名
  key(index)
  ```

- 存储事件

1. 介绍存储事件前，先说如何对事件绑定与事件解绑的兼容处理，直接贴代码。

   ```Javascript
   function bindEvent(eventName,callback){
     if(this.addEventListener){
       this.addEventListener(eventName,callback,false);
     }else{
       eventName = `on${eventName}`;
       if(this.attachEvent){
         this.attachEvent(eventName,callback);
       }else{
         this[eventName] = callback;
       }
     }
   }

   function unbindEvent(eventName,callback){
     if(this.removeEventListener){
       this.removeEventListener(eventName,callback);
     }else{
       eventName = `on${eventName}`;
       if(this.detachEvent){
         this.detachEvent(eventName,callback);
       }else{
         this[eventName] = null;
       }
     }
   }
   ```

   > 使用 addEventListener 或 attachEvent 多次绑定同一元素的同一事件，最终的事件处理并不是只执行最后一次绑定事件处理函数，而是所有绑定的事件处理函数会被依次执行，但通过花括号形式绑定事件只执行最后一次绑定事件处理函数。

2. 认识存储事件

   触发对象：对操作的存储数据可见的其他窗口对象，不包括对数据操作的当前窗口对象。

   触发条件：存储数据的值发生变化，注意重新赋于存储项相同的旧值或删除不存在的存储项，不会引起变化。

   机制：采用广播通知其他同源窗口对象。下面是存储事件应用示例，实现在一个窗口控制另一个窗口的动画，更好理解广播机制。

   ```Html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport"
             content="width=device-width, initial-scale=1.0">
       <title>存储事件</title>
       <style>
         #circle {
           width: 100px;
           height: 100px;
           margin-bottom: 10px;
           border-radius: 50px;
           background-image: linear-gradient(to right, yellow, red);
         }

         .circle-anim {
           animation: anim_rotate 2s infinite ease-in-out;
         }

         @keyframes anim_rotate {
           0% {
             transform: rotateZ(0);
           }

           100% {
             transform: rotateZ(360deg);
           }
         }

       </style>
     </head>
     <body>
       <div id="circle"
           class="circle-anim"></div>
       <button id="btn-stop-anim">停止动画</button>
       <button id="btn-start-anim">继续动画</button>
     </body>
     <script>
       window.addEventListener('load', function() {

         let circleEle = document.querySelector('#circle');
         let stopBtnEle = document.querySelector('#btn-stop-anim');
         let startBtnEle = document.querySelector('#btn-start-anim');

         stopBtnEle.addEventListener('click', function() {
           localStorage.setItem('state', 'stop');
         });
         startBtnEle.addEventListener('click', function() {
           localStorage.setItem('state', 'start');
         });

         window.addEventListener('storage', function(e) {
           let {
             // 键名
             key,
             // 旧值，默认为null
             newValue,
             // 新值
             oldValue,
             // 存储对象
             storageArea,
             // 数据变化的源地址
             url
           } = e;

           if (key !== 'state') return;

           if (newValue === 'stop') {
             circleEle.classList.remove('circle-anim');
           } else if (newValue === 'start') {
             circleEle.classList.add('circle-anim');
           }
         });
       });
     </script>
   </html>
   ```

### sessionStorage
- sessionStorage同样支持上述localStorage的特性和API
- 在单页应用中，sessionStorage与localStorage作用范围并无差异，建议使用sessionStorage，因为可以利用其有效期，在网页一关闭便会删除本地数据，避免数据不被使用时被泄露
- session storage可以多窗口共享，前提是新窗口是在当前页打开，且同源。打开方式有`window.open`和`<a target="_blank" href="">`

### cookie、localStorage、sessionStorage的比较

|            | localStorage | sessionStorage                   | cookie                                   |
| ---------- | ------------ | -------------------------------- | ---------------------------------------- |
| 存储大小   | 不超过 5MB   | 不超过 5MB                       | 不超过 4KB(即名字和值的总量不超过 4KB)   |
| 作用范围   | 同源         | 同源且同顶级窗口                 | 同源                                     |
| 作用有效期 | 永久有效     | 在顶级窗口或当前标签页关闭前有效 | 在到达过期时间前有效，即使期间浏览器关闭 |
| 安全性    | 请求时不自动携带 | 请求时不自动携带 |  请求时自动携带 |
| 场景      | 存储较大数据，如用户数据、通用业务数据；用户浏览记录，如用户的阅读进度、购物车；用户偏好设置，如语言、主题等；用户行为跟踪与分析 | --              | 存储用户认证与登录状态 |

## Web 数据库存储

### IndexedDB

- 基本认识

  一个面向对象的数据库，因为它实质上是一个命名对象存储区的集合，存储的是对象。

  每个对象都有一个唯一的key，会自动生成，通常需要为该key显示指定一条键路径，告知数据库如何从一个对象中抽取出该对象的键。

  支持索引，能为存储对象定义次键，可以不唯一，即多个对象能匹配一个键值，因此被称为IndexedDB。

  保证原子性，支持事务，即数据库操作都是在一个事务中，要么都成功，要么都失败。事务无需手动提交，当事务完成，浏览器回到事件循环，事务中所有挂起操作完成后，会自动提交。

- 特点

  仅同源内可访问

  数据库的数目无限制

  同源内的数据库名字唯一

- API一览

  ```Javascript
  // IDBOpenDBRequest：表示访问打开或删除数据库的请求结果
  // 属性
  error
  readyState
  result
  source
  transaction
  // 事件
  onblocked
  onerror
  onsuccess
  onupgradeneeded
  ```

  ```Javascript
  // IDBDatabase：表示数据库
  // 属性
  name
  objectStoreNames
  version
  // 事件
  onabort
  onclose
  onerror
  onversionchange
  //方法
  close()
  createObjectStore()
  deleteObjectStore()
  transaction()
  ```

  ```Javascript
  // IDBObjectStore：表示对象存储，可进行增删改查操作
  // 属性
  indexNames
  keyPath
  name
  transaction
  autoIncrement
  // 方法
  add (value[, key]) 
  delete (key) 
  put (value[, key]) 
  get (key) 
  clear () 
  count ([key]) 
  createIndex  (name,keyPath[, unique]) 
  deleteIndex (indexName) 
  index (name) 
  openCursor ([range][, direction]) 
  ```

  ```Javascript
  // IDBTransaction：表示一个事务
  // 属性
  db
  error
  mode
  objectStoreNames
  // 事件
  onabort
  oncomplete
  onerror
  // 方法
  abort()
  objectStore()
  ```

- 小小示例

  ```Javascript
  
  // 1.创建或打开数据库。open方法指定dbName和可选的dbVersion
  let request = window.indexedDB.open('test');

  request.onupgradeneeded = function(e){
    console.log('create db success...');
    initDB(e.target.result);
  }

  request.onsuccess = function(e){
    console.log("access db success...");
    let db = e.target.result;
    if(db.version !== "1"){
      operateDB(db);
      queryDB(db);
    }
  }

  request.onerror = function(e){console.log('create or open db fail...');}

  request.onblocked = function(e){console.log("db is blocked...");}


  function initDB(db){

    // 2.建立对象存储和索引
    // createObjectStore指定存储名称和字段约束选项
    let store = db.createObjectStore('student',{keyPath:"id",autoIncrement:true});
    // createIndex指定索引名称、作为索引的字段名和可选的字段约束选项
    store.createIndex("classes","class");

    db.onclose = function(){console.log('db close...')};
    db.onabort = function(){console.log('db abort...')};
    db.onerror = function(){console.log('db error...')};
    db.onversionchange = function(){console.log('db version change...')};

  }


  function operateDB(db){

    // 3.获取事务对象。transaction指定存储名称和model，可取值为readwrite和readonly
    let transaction = db.transaction(['student'],"readwrite");
    // 4.获取对象存储
    let store = transaction.objectStore("student");
    // 5.操作数据
    store.add({
      class:'one',
      name:'xiaoming',
      score:80,
      subject:'math',
    })
    store.add({
      class:'one',
      name:'xiaoming',
      score:90,
      subject:'chinese',
    })
    store.add({
      class:'one',
      name:'xiaohong',
      score:77,
      subject:'chinese',
    })

    transaction.oncomplete = function(){console.log('transaction operation...');};
    transaction.onerror = function(){ console.log('transaction error...')};

  }

  function queryDB(db){

    let transaction = db.transaction(['student'],"readwrite");

    let store = transaction.objectStore("student");

    let idx = store.index('classes');

    // 查询符合某一键值的一个对象
    let req = idx.get('one');
    req.onsuccess = function(e){
      console.log(`I'm ${req.result.name} in class ${req.result.class} and got ${req.result.score} in ${req.result.subject}.`);
    }

    // 查询符合某一键值的所有对象
    idx.openCursor().onsuccess = function(e){
      var cursor = e.target.result;
      if(cursor){
        console.log(cursor.value);
        // continue亦可传入IDBKeyRange.upperBound、lowerBound、bound或only进行限制查询
        cursor.continue();
      }else{
        console.log('cursor query end...')
      }
    }
  }
  ```

## 参考

- JavaScript权威指南（第6版）

- https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API


> 至此，文章已经介绍了cookie、Web Storage和Web 数据库三种存储技术，接下来的文件存储和离线应用会在下篇进行介绍。
