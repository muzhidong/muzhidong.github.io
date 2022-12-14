---
title: VSCode如何一键生成模板
tags: 
- VSCode
---
# VSCode如何一键生成模板

VSCode目前已经是前端人员必备的开发工具。本文介绍如何使用用户片段自定义模板，一键应用。
<!-- 本文将介绍VSCode的一些能提高人员的开发效率的实用技巧。 -->

## 用户片段（User Snippets）

用户片段让开发者可以自定义一些常用模板，帮助我们一键生成，提升效率。

首先，点击设置，再点击User Snippets

![user snippets 1](/vscode/user_snippets_1.png)

接着，点击New Global Snippets file...

![user snippets 2](/vscode/user_snippets_2.png)

之后，可以开始自定义常用的模板了。我们知道，移动端页面通常会比PC端多一些元数据配置，下面就自定义一个移动Web页面初始模板作为示例，
```json
{
	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	"Print to console": {
		"prefix": "mhtml",
		"body": [
			"<!DOCTYPE html>",
			"<html lang='zh'>",
			"<head>",
			"  <meta charset='UTF-8'>",
			"",
			"  <!-- 表示视口宽度为设备宽度，初识比例为1，最小比例为1，最大比例为1，不允许用户缩放页面 -->",
			"  <meta name='viewport'",
			"    content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'>",
			"",
			"  <!-- 表示设备对页面中的出现数字不识别为电话号码、日期、电邮、地址 -->",
			"  <meta name='format-detection' content='telephone=no,email=no,date=no,address=no'>",
			"",
			"  <!-- 浏览器兼容性处理，表示强制IE按Edge渲染，当浏览器使用谷歌浏览器内嵌框架时允许其使用该框架进行渲染 -->",
			"  <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>",
			"",
			"  <!-- 表示全屏 -->",
			"  <meta name='full-screen' content='yes'>",
			"  <meta name='x5-fullscreen' content='true'>",
			"",
			"  <!-- 表示始终保持竖向，不能横向 -->",
			"  <meta name='screen-orientation' content='portrait'>",
			"  <meta name='x5-orientation' content='portrait'>",
			"",
			"  <!-- 表示允许全屏模式浏览 -->",
			"  <meta name='apple-mobile-web-app-capable' content='yes' >",
			"",
			"  <!-- 表示顶端状态条的样式，默认值为default(白色),也可以设置为black(黑色)和black-translucent(灰色半透明) -->",
			"  <meta name='apple-mobile-web-app-status-bar-style' content='black'>",
			"",
			"  <!-- 网页添加到主屏显示的图标，前者有圆角高光修饰，后者则没有 -->",
			"  <link rel='apple-touch-icon-precomposed' href=''>",
			"  <link rel='apple-touch-startup-image' href=''>",	
			"",
			"  <title></title>",
			"</head>",
			"<body>",
			"",
			"</body>",
			"</html>",
		],
		"description": "移动Web HTML模板初始化"
	}
}
```

最后，我们可以在空白文件上输入mhtml，会出现提示菜单，选择回车。
