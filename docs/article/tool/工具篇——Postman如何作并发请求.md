---
title: Postman如何作并发请求
tags: 
- Postman
---
# Postman如何作并发请求

有时开发过程中，我们希望对接口同时请求多次，进行测试。本博简单介绍下如何使用POSTMAN进行操作。

### 一、定义好参数的动态值名称
	
为id参数值设置为动态值，如图下，

![定义好参数的动态值名称](/postman/1.png)

<!-- more -->

### 二、新建json文件存放测试数据

json内容示例如下，

```json
 [{
 	"value":"apple",
 	"id":"123"
 },{
 	"value":"orange",
 	"id":"456"
 },{
 	"value":"banana",
 	"id":"789"
 },{
 	"value":"pear",
 	"id":"012"
 }]
```

> tip：测试数据的键名一定跟在postman上定义的动态参数名称一致

### 三、自定义测试代码

在要测试的接口的Tests项自定义测试代码，也可以用snippets快速生成。

在Tests项右侧有snippets供选择

![选择snippets快速生成测试脚本](/postman/2.png)

比如选择"Status code: Code is 200"脚本，快速生成如下代码，检验接口是否返回200状态码

```javascript
pm.test("Status code is 200", function () {
    console.log(JSON.parse(responseBody));
    pm.response.to.have.status(200);
});
```

### 四、打开Runner

点击Runner按钮。

> tip:打开运行器前，记得保存要测试的接口。

### 五、打开控制台

在菜单栏上选择View，点击Show Postman Console即可。

### 六、执行请求

先选择测试接口，再选择测试的json数据文件，最后点击Run即可。具体操作见如下截图。

![执行请求](/postman/3.png)

### 七、查看结果

在Runner查看测试结果，

![测试结果](/postman/4.png)

在控制台查看请求信息。

![请求信息](/postman/5.png)

