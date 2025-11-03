---
title: HTML5系列之存储篇下
tags: 
- HTML5
---

上篇我们介绍了cookie、Web Storage和Web数据库技术，接下来的这一篇将对文件存储、离线应用、CacheStorage进行介绍。


## 文件存储

### Blob

  - 概念
  
    英文全称为Binary Large Object，即二进制大对象。

  - API
  
    ```Javascript
    // 构造函数
    // blobParts参数是一个由ArrayBuffer、Blob等组成的数组，options表示一个可选对象，可指定传入的MIME类型type和行结束符写入方式endings
    Blob(blobParts[,options])
      
    //文件大小，单位为B
    size
    
    //文件MIME类型，如"image/jpeg"
    type
    
    // 指定开始位置和结束位置截取指定数据，返回新的Blob对象
    slice(start[[,end],contentType])
    
    // 返回一个Promise对象，resolve结果是包含所有内容的ArrayBuffer
    arrayBuffer()

    // 返回一个Promise对象，resolve结果是包含所有内容的utf-8字符串   
    text()
    
    // 返回一个Promise对象，resolve结果是能读取所有内容的ReadableStream
    stream()
    ```

### File

  - File与Blob的关系
  
    通过执行下面表达式，可得知Blob是File的基类，所以能对Blob操作的，同样适用于File。自然，File拥有Blob的所有属性和方法。

    ```Javascript      
    file instanceof Blob; //true
    ```
  
  - 常见获取方式

    1.从input类型为file，返回的FileList中获取

    2.从放置被拖拽对象到指定位置，返回的DataTransfer获取

    3.构造函数创建

  - 属性

    ```Javascript
    //  文件最近一次的修改时间时间戳
    lastModified

    // 文件最近一次的修改时间Date对象
    lastModifiedDate
    
    // 文件名，含后缀
    name
     
    // 文件相对于用户选中的目录的相对路径，非标准，不推荐使用
    webkitRelativePath
    ```
  
### URL

  - 概念

    用于解析、构造、规范和编码URL。便于读取或修改URL内容。

  - API
  
    ```Javascript
    //为便于理解各属性对应的内容，以var url = new URL("http://user:mudong@mudong.xyz/main?data=123#abc");作为示例。

    //构造函数
    // url参数可以绝对url或相对url，为相对url时需指定base参数，作参照路径。
    URL(url[,base])

    //哈希值，如上为#abc
    hash

    //主机名，如上为mudong.xyz
    host

    //完整链接，如上为http://user:mudong@mudong.xyz/main?data=123#abc
    href

    //源，如上为http://mudong.xyz
    origin

    //密码，如上为mudong
    password

    //路径名，如上为/main
    pathname

    //端口号，如上为""
    port

    //协议名，如上为”http“
    protocol

    //参数字符串，如上为"?data=123"
    search

    //参数字符串对象，提供参数字符串的基本操作方法：
    // append
    // delete
    // entries
    // forEach
    // get
    // getAll
    // has
    // keys
    // set
    // sort
    // toString
    // values
    //如上通过url.searchParams.get('data')为123
    searchParams

    //用户名，如上为name
    username

    // 返回整个url
    toString()
    
    // 返回整个url
    toJson()
    
    // 创建一个DOMString，包含一个唯一的blob链接。参数可以是File、Blob或MediaSource
    // 示例：
    // URL.createObjectURL(new Blob([new ArrayBuffer(16)]))
    // "blob:chrome://new-tab-page/3ee0ed55-a791-4e07-80e9-186d9029fe64"
    URL.createObjectURL(obj)

    // 销毁之前使用URL.createObjectURL创建的URL实例。参数是blob链接字符串
    // 示例：
    // URL.revokeObjectURL("blob:chrome://new-tab-page/3ee0ed55-a791-4e07-80e9-186d9029fe64")
    // undefined
    URL.revokeObjectURL(url)
    ```
  
  - blob://URL、data://URL、file://URL的区别

      data://URL对内容进行编码。

      blob://URL对浏览器存储在内存中或者磁盘上的Blob的一个简单引用。

      file:URL指向本地系统文件的一个文件，仅暴露文件路径、浏览目录的许可等，除此之外任何内容都会带来安全问题。

  - 特点

    blob:URL与创建其的脚本拥有相同源，只在同源的文档中有效，而file:URL是非同源的，相较起来blob:URL更灵活些。

    blob:URL不是永久有效，一旦用户关闭或者离开包含创建Blob URL脚本的文档，该BLob URL就失效了。

    blob:URL只允许通过GET请求获取，并且一旦获取成功，浏览器必须返回一个HTTP 200 OK的状态码，同时返回一个使用Blob type属性的Content-Type头部信息。


### FileReader

  - 概念

    使Web应用能异步读取存储于计算机本地的文件内容或二进制缓冲数据。
  
  - API

    ```Javascript
    //读文件产生的错误异常
    error

    //读状态，值可能为0，1，2，分别表示数据未加载，数据正加载，完成读操作
    readyState

    //文件内容
    result

    //停止读操作
    abort()

    //开始读数据内容，并以ArrayBuffer返回
    readAsArrayBuffer()

    //开始读数据内容，并以二进制字符串返回
    readAsBinaryString()

    //开始读数据内容，并以dataURL返回
    readAsDataURL()

    //开始读数据内容，并以普通文本返回
    readAsText()

    //监听停止读事件
    onabort

    //监听读错误事件
    onerror

    //监听读成功完成事件
    onload

    //监听读开始事件
    onloadstart

    //监听读完成事件，不论成功与否
    onloadend

    //监听读进度事件
    onprogress

    ```

### 其他文件API

  - FileSystem/FileSystemSync

    表示一个文件系统。通过window.requestFileSystem()访问。有两个属性，一个表示文件系统名的name属性，另一个表示文件系统根目录的root属性

  - FileSystemEntry/FileSystemEntrySync

    表示文件系统中的一个单实体，可能是文件，也可能是目录。在拖拽使用中，通过DataTransferItem.webkitGetAsEntry()访问。具体api如下，

    ```Javascript
    //获取该实体附属的文件系统
    filesystem

    //获取从根路径到该实体的完整绝对路径
    fullPath

    //实体是否是目录
    isDirectory
    
    //实体是否是文件
    isFile
    
    //实体名称
    name

    // 复制实体到指定位置
    copyTo()
    
    // 获取关于文件的元数据
    getMetadata()

    // 获取父目录实体
    getParent()

    // 移动实体到指定位置，或重命名实体
    moveTo()
    
    // 删除指定文件或目录，注意删除的目录必须是空的
    remove()
    
    // 返回识别该实体的url，形如filesystem:URL
    toURL()
    ```
  
  - FileSystemFileEntry/FileSystemFileEntrySync

    表示文件系统中的一个文件。api同FileSystemEntry，只有一个独有方法file，创建一个新的可读文件对象并返回
  
  - FileSystemDirectoryEntry/FileSystemDirectoryEntrySync

    表示文件系统中的一个目录。api同FileSystemEntry，独有方法如下，

    ```Javascript
    //  创建FileSystemDirectoryReader对象，用于读取目录的中实体
    createReader()

    //获取指定的目录
    getDirectory()

    //获取目录下的指定文件
    getFile()
    ```
  
  - FileSystemDirectoryReader/FileSystemDirectoryReaderSync

    用于访问目录下所有实体。只有一个方法readEntries，返回该目录下的所有实体数组。

### Base64

- 概念

  一种编码格式，即1个字节中只用6位存储数据，也就是说，原本用3个字节存储的数据，转换为base64则需占用4个字节进行存储。

  引自百度百科：每三个8Bit的字节转换为四个6Bit的字节（3 * 8 = 4 * 6 = 24），然后把6Bit再添两位高位0，组成四个8Bit的字节，也就是说，转换后的字符串理论上将要比原来的长1/3。

  希望能在处理文本数据的媒介上存储和传输二进制数据而设计。

- 提供的相关方法

  编码为base64：    

      btoa(str)
  
  解码base64：

      atob(base64Str)

- unicode问题

  由于DOMString是16位编码的字符串，所以如果有字符超出了8位ASCII编码的字符范围时，在大多浏览器中对Unicode字符串调用btoa将会造成一个Character Out Of Range的异常。

  需对方法增强，使之支持UTF16。以下是摘自MDN的其中一种实现方式。

  ```Javascript
  function btoaUTF16(str) {

    var u16Arr = new Uint16Array(str.length);
    Array.prototype.forEach.call(u16Arr, function(el, idx, arr) {
      arr[idx] = str.charCodeAt(idx);
    });
    return btoa(String.fromCharCode.apply(null, new Uint8Array(u16Arr.buffer)));

  }

  function atobUTF16(base64) {

    var binary = atob(base64);
    var u8Arr = new Uint8Array(binary.length);
    Array.prototype.forEach.call(u8Arr, function(el, idx, arr) {
      arr[idx] = binary.charCodeAt(idx);
    });
    return String.fromCharCode.apply(null, new Uint16Array(u8Arr.buffer));

  }

  ```

### Blob、Base64、ArrayBuffer间的转换

- 原理

  利用FileReader API实现从Blob到base64字符串、ArrayBuffer的转换。

  利用Typed Array实现base64字符串、ArrayBuffer到Blob的转换。

- 代码实现

```javascript
  //Blob转base64
  function blobToB64(blob, cb) {

    var reader = new FileReader();
    reader.addEventListener('load', function() {
      cb && cb(reader.result);
    });
    reader.readAsDataURL(blob, {
      type: blob.type
    });

  }

  //Blob转ArrayBuffer
  function blobToAb(blob, cb) {

    var reader = new FileReader();
    reader.addEventListener('load', function() {
      cb && cb(reader.result);
    });
    reader.readAsArrayBuffer(blob);

  }

  //ArrayBuffer转base64
  function abToB64(arraybuffer, cb) {

    blobToB64(abToBlob(arraybuffer), cb);

  }

  //ArrayBuffer转Blob
  function abToBlob(arraybuffer, filename) {

    var u8arr = new Uint8Array(arraybuffer);
    if (filename) {
      return new File([u8arr], filename);
    } else {
      return new Blob([u8arr])
    }

  }

  //base64转ArrayBuffer
  function b64ToAb(base64, cb) {

    blobToAb(b64ToBlob(base64), cb);

  }

  //base64格式转Blob
  function b64ToBlob(base64, filename) {

    var arr = base64.split(',');

    var mime = arr[0].match(/:(.*?);/)[1];

    var binaryStr = atob(arr[1]);
    var i = binaryStr.length;
    var u8arr = new Uint8Array(i);
    while (i--) {
      u8arr[i] = binaryStr.charCodeAt(i);
    }

    if (filename) {
      return new File([u8arr], filename, {
        type: mime
      });
    } else {
      return new Blob([u8arr], {
        type: mime
      })
    }

  }
```

## ~~离线Web应用~~

若网站使用了该技术，会有如提示，
> Application Cache was previously restricted to secure origins only from M70 on but now secure origin use is deprecated and will be removed in M82.  Please shift your use case over to Service Workers.

意译为，之前Application Cache从M70开始只被限制为安全源，但现在安全源使用已被弃用，并将在M82中被删除。请使用Service Workers改造您的用例。

### ~~理解离线~~

- ~~无网络下仍然可以访问~~
- ~~不随着用户清除浏览器缓存而被清除~~
- ~~旧数据会被最近一次访问的新数据覆盖~~

### ~~离线配置~~

- ~~配置应用程序缓存清单文件~~

  ~~清单文件后缀名是 appcache。服务端响应清单文件时，需设置响应头的内容类型为'text/cache-manifest'，否则不能缓存应用程序了。清单文件格式要求第一行必须为 CACHE MANIFEST，接下来紧跟要缓存的资源列表，一行一个资源。注释以#开头。示例如下，~~

  ```
  CACHE MANIFEST

  # 应用要缓存的资源列表
  CACHE:
  index.html
  index.css
  index.js
  images/logo.png

  # NETWORK区域标识该URL资源总通过网络获取。URL支持*通配符，表示任何不在清单中的资源，浏览器都将通过网络加载
  NETWORK:
  list.html

  # FALLBACK区域的清单项每行包括两个URL，第一个是URL前缀，第二个是需要加载存储在缓存中的资源。匹配该前缀的URL所指定的资源从网络载入失败，就会用从缓存中访问第二个URL指定的资源代替
  FALLBACK:
  /articles 404.html
  ```

- ~~在需要缓存的 HTML 页面指定缓存清单文件，在单页应用中有且只有一个页面需 被缓存，而在多页应用中可能会有多个~~

  ```html
  <!DOCTYPE html>
  <html manifest="app.appcache">
    ...
  </html>
  ```

> ~~提问：如何“卸载”离线 Web 应用？ 1.服务端删除清单文件 2.删除缓存的 HTML 页面中对清单文件的配置~~

### ~~缓存更新~~

- ~~缓存更新机制~~

~~在线状态下，浏览器异步检查清单文件是否有更新，若有，则新的清单文件及清单中列举的所有资源文件都将被下载，重新保存到应用程序缓存中。~~

> ~~提问：资源文件变化了，清单文件没变化，而浏览器只会检查清单文件是否变化。要让资源文件能重新下载，该怎么解决？每次资源文件发生变化，可以修改清单文件的版本号，这样保证能检测到清单文件变化，重新下载清单中的所有资源文件。~~

> ~~提问：为什么更新了资源后，访问时却不是更新后的资源？浏览检查清单文件和下载资源是异步的，也就是说，应用可能在资源下载未完成前先从缓存加载资源了，所以通常都是第二次访问才能看到更新的资源。~~

- ~~缓存对象 applicationCache~~

  ~~事件:~~

  ~~onchecking~~

  ~~每载入设置 manifest 属性的 HTML 文件时触发~~

  ~~onnoupdate~~

  ~~应用程序清单文件无变动时触发~~

  ~~ondownloading~~

  ~~应用程序清单文件有变动，监听清单文件和要缓存的资源列表的下载过程~~

  ~~onprogress~~

  ~~监听应用程序的清单文件和要缓存的资源列表的下载进度~~

  ~~oncached~~

  ~~未曾缓存的应用程序下载清单文件和资源结束后触发~~

  ~~onupdateready~~

  ~~曾缓存的应用程序下载清单文件和资源结束后触发~~

  ~~onerror~~

  ~~处于离线状态，无法检查清单文件时触发~~

  ~~onobsolete~~

  ~~处于在线状态，应用程序有缓存，但清单文件不存在时触发，且将应用程序从缓存中删除~~

  ~~属性：~~

  ~~UNCACHED~~

  ~~应用程序无设置 manifest 属性，未缓存~~

  ~~IDLE~~

  ~~清单文件检查完毕，并缓存了最新的应用程序~~

  ~~CHECKING~~

  ~~浏览器正在检查清单文件~~

  ~~DOWNLOADING~~

  ~~浏览器正在下载并缓存清单中列举的所有文件~~

  ~~UPDATEREADY~~

  ~~已经下载和缓存了最新版的应用程序~~

  ~~OBSOLETE~~

  ~~清单文件不存在，缓存将被清除~~

  ~~方法:~~

  ~~update~~

  ~~显式调用更新缓存算法，检测是否有最新版本的应用程序。~~

  ~~swapCache~~

  ~~通知浏览器弃用旧缓存，所有请求都从新缓存中获取。当状态属性为 UPDATEREADY 或 OBSOLETE 时，调用该方法才有意义，其他状态属性下调用直接抛异常。~~

### ~~其他~~

#### ~~浏览器在线状态的检测与监听~~

- ~~检测浏览器是否在线~~

  ~~navigator.online 属性~~

- ~~监听浏览器在线状态变化~~

  ~~window.onoffline 事件~~

  ~~window.ononline 事件~~

#### ~~离线应用数据同步~~

- ~~离线状态下，通过 localStorage 保存应用相关数据，在线状态下，将本地数据同步到服务器。~~

## CacheStorage
仅在https协议下可用。更多介绍查看[MDN](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage)

- 获取CacheStorage：window.caches

- CacheStorage API有哪些？
  - open(cacheName)
  - has(cacheName)
  - delete(cacheName)
  - keys()
  - match(request, options)

- Cache API有哪些？
  - match(request, options)
  - matchAll(request,options)
  - keys(request,options)
  - add(request)
  - addAll(requests)
  - put(request, response)
  - delete(request, options)
  
  其中，add、addAll、put只支持存储https协议下的get请求

- 示例
  ```js
  if('caches' in window) {
    // 打开指定缓存存储
    window.caches.open('cache-name').then(function(cache) {
      // 添加缓存
      cache.add('https://www.baidu.com')
    })
  }
  ```

## 参考

- JavaScript权威指南（第6版）

- ES6标准入门（第2版）

- https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

- https://developer.mozilla.org/en-US/docs/Web/API/File

- https://developer.mozilla.org/zh-CN/docs/Web/API/URL

- https://developer.mozilla.org/en-US/docs/Web/API/FileReader

- https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API

- https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

- https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache

> 到了这里，关于存储与离线的学习算告一段落了。感谢阅读！！！
