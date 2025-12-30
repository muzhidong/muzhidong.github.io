---
title: Canvas应用
tags: 
- HTML5
---

# Canvas应用

## Canvas API
### 属性
- width

	在canvas标签中声明属性width=1000(px)与设置样式width:1000px都可用于设置画布宽度，前者称为HTML尺寸，后者称为CSS尺寸。二者区别如下，
  - **CSS尺寸不受aspect-ratio影响，而HTML尺寸受其影响，使画布大小发生变化**。HTML尺寸实质是应用了[`aspect-ratio: auto $width / $height`](/css/CSS查漏补缺#aspect-ratio)样式，表示宽高比，默认值是300px * 150px。关于它的值可以看作是物理像素，比如说CSS宽、高尺寸均设置为100px，在未设置HTML尺寸的默认情况下，100逻辑像素宽度对应300物理像素，100逻辑像素高度对应150物理像素
  - **调用canvas api时，传入参数是数值，单位是物理像素，而非逻辑像素**
  
  当二者同时存在时，<a href="/css/CSS快速入门篇中#size">CSS尺寸会覆盖HTML尺寸</a>；通过`canvasEl.width`获取的是width属性值，`canvasEl.style.width`获取的是width样式值；**最重要的一点是，此时HTML尺寸用于设置物理像素，CSS尺寸用于设置逻辑像素(也就是我们在界面上看到的宽度大小)**

  > 指导：一般先使用CSS尺寸定义画布大小，再结合dpr设置HTML尺寸(对canvas元素慎用aspect-ratio样式属性，避免覆盖HTML尺寸)，适应不同设备的分辨率。后面操作canvas时，数值类的也要对应乘上dpr，便于调试

- height 

	同width

<!--more-->

### 方法
- getContext(contextId)

  返回CanvasRenderingContext2D对象
- toDataURL([type][,level])

  指定画布要转化为图片类型，返回图片url。若类型为image/jpeg，还可指定质量等级，值在0到1之间

## CanvasRenderingContext2D API
### 属性
- fillStyle

  表示填充风格，值支持hex、rgba、hsla这三种表示方式
- strokeStyle

  表示轮廓风格

- globalAlpha

  设置图像透明度
- globalCompositeOperation

  设置重叠图像的覆盖方式，可取值如下，
    - source-over：默认值，显示源和汇的差集、源的交集
    - destination-over：显示源和汇的差集、汇的交集
    - source-in：只显示源的交集
    - destination-in：只显示汇的交集
    - source-out：只显示源的差集
    - destination-out：只显示汇的差集
    - lighter：显示源和汇的差集、交集混合颜色变淡
    - darker：显示源和汇的差集、交集混合颜色变深
    - xor：显示源和汇的差集
    - source-atop：只显示源的差集
    - destination-atop：显示汇的交集和源的差集
    - copy：显示源

- lineCap

  表示线段的箭头样式，可取值为butt、round、square，默认值为butt，表示头尾为长方形，round表示头尾为半圆形，square表示头尾增加一个长方形，其长为线宽的一半，高为线宽
- lineJoin

  表示线段的连接方式，可取值为miter、round、bevel，默认值为miter，线段在连接处外侧延伸直至交于一点，若外延交点距离大于限制值是表现为bevel风格，其连接处为斜角，round连接处为一个圆角，半径为线宽
- lineWidth

  表示线段的线宽
- miterLimit

  表示线段连接处的斜率

- shadowBlur

  阴影模糊等级，值范围为不小于0
- shadowColor

  阴影颜色
- shadowOffsetX

  阴影X偏移量
- shadowOffsetY

  阴影Y偏移量

- font

- textAlign

- textBaseline

### 方法
- restore()

  恢复至上次保存的绘图状态，包括所有属性和transform、clip两个方法
- save()

  保存当前绘图状态

- scale(x,y)

  分别在x和y轴方向上按指定比例缩放
- translate(x,y)

  分别在x和y轴方向上按指定值偏移，实质上是可以看做是画布参考坐标系上的原点的移动
- rotate(angle)

  顺时针旋转angle度

- transform(m11,m12,m21,m22,dx,dy)

  根据矩阵参数转换，参数含义同CSS声明[`transform: matrix()`](/css/CSS3你知道有多少#transform-matrix)
	
- setTransform(m11,m12,m21,m22,dx,dy)

  重置后再根据矩阵参数转换

- createLinearGradient(x0,y0,x1,y1)

  线性渐变
- createRadialGradient(x0,y0,r0,x1,y1,r1)
  
  径向渐变，返回一个渐变对象，有如下方法，

     	addColorStop(point,color)
	    
   用于添加渐变颜色点，point值在0至1之间

- createPattern(image,repetition)

  指定图像和重复方向创建画布图案对象，repetition可取值为repeat、repeat-x、repeat-y和no-repeat

- arc(x,y,r,a0,a1[,direction])

   画弧，参数分别表示圆心X坐标,圆心Y坐标,圆心半径,起始角度,结束角度,绘制方向(为true表示逆时针，为false表示顺时针)
- arcTo(x1,y1,x2,y2,radius)

  绘制路径终点分别与点(x1,y1)、(x2,y2)构成的两条直线间半径为radius的弧长
- rect(x,y,w,h)

  画矩形
- bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)

  三次贝塞尔曲线
- quadraticCurveTo(cpx,cpy,x,y)

  二次贝塞尔曲线

- clearRect(x,y,w,h)

  清除矩形内的像素，参数分别表示起始X轴偏移量，起始Y轴偏移量，矩形宽度，矩形高度
- fillRect(x,y,w,h)

  绘制填充矩形，参数同clearRect
- strokeRect(x,y,w,h)

  绘制轮廓矩形，参数同strokeRect

- moveTo(x,y)

  移动到指定位置
- lineTo(x,y)

  画线到指定位置

- beginPath()

  开始新的子路径
- closePath()

  关闭子路径
- isPointInPath(x,y)

  判断点(x,y)是否在当前路径

- fill()

  填充方式绘制
- stroke()

  轮廓方式绘制
- clip()

  裁切路径，只显示裁切区域的内容

- fillText(text,x,y[,maxWidth])

- strokeText(text,x,y[,maxWidth])

- drawImage(image[,sx,sy,sw,sh],dx,dy[,dw,dh])

	绘图，参数分别表示图片的起始X偏移量，图片的起始Y偏移量，图片的指定宽度，图片的指定高度，图片相对浏览器窗口的起始X偏移量，图片相对浏览器窗口的起始Y偏移量，图片在浏览器窗口设置的宽度，图片在浏览器窗口设置的高度

- createImageData(sw,sh)/createImageData(image)

  指定宽高或明确宽高的图像，创建ImageData对象
- getImageData(sx,sy,sw,sh)

  获取画布指定区域的ImageData对象
- putImageData(imageData,dx,dy[,dirtyX,dirtyY,dirtyWidth,dirtyHeight])

  绘制指定的ImageData对象

## 应用
### 碰撞球
效果如下，

![碰撞球](/canvas/collidedball.gif)

贴上与canvas相关的代码，
```javascript
//画线
function drawLine(context, x0, y0, x1, y1, color) {
	context.save();

	context.beginPath();

	if (color == null) {
			context.strokeStyle = "#A7AEB0";
	} else {
			context.strokeStyle = color;
	}
	context.moveTo(x0, y0);
	context.lineTo(x1, y1);
	context.stroke();

	context.closePath();

	context.restore();
}

//画球
function draw3DBall(context, x0, y0, c0, c1) {
	context.save();

	context.beginPath();

	context.translate(x0, y0);

	var gradient = context.createRadialGradient(3, 3, 0, 0, 0, 10);
	if (c0 == null) {
			gradient.addColorStop(0, "#eee");
	} else {
			gradient.addColorStop(0, c0);
	}
	if (c1 == null) {
			gradient.addColorStop(1, "#57BADA");
	} else {
			gradient.addColorStop(0, c1);
	}
	context.fillStyle = gradient;
	context.arc(0, 0, 10, 0, 2 * Math.PI);
	context.fill();

	context.closePath();

	context.restore();
}
```

[源码链接](https://github.com/muzhidong/frontend-demo/tree/master/collidedball)

### 旗帜
效果如下，

![旗帜](/canvas/flutteredflag.gif)

贴上与canvas相关的代码，
```javascript
//画旗帜
function drawFlag(x0, y0, x1, y1, offsetX) {

	con.beginPath();

	con.moveTo(x0, y0 + 50 * Math.sin(offsetX * Math.PI * 2 / (x1 - x0)));
	for (var i = 1; i <= x1 - x0; i++) {
			con.lineTo(x0 + i, y0 + 50 * Math.sin((offsetX + i) * Math.PI * 2 / (x1 - x0)));
	}
	con.lineTo(x1, y1 + 50 * Math.sin(offsetX * Math.PI * 2 / (x1 - x0)));
	for (var j = 1; j <= x1 - x0; j++) {
			con.lineTo(x1 - j, y1 + 50 * Math.sin((offsetX + x1 - x0 - j) * Math.PI * 2 / (x1 - x0)));
	}
	con.lineTo(x0, y0 + 50 * Math.sin(offsetX * Math.PI * 2 / (x1 - x0)));

	con.closePath();

	con.fillStyle = "#1890ff";
	con.fill();
}
```

[源码链接](https://github.com/muzhidong/frontend-demo/tree/master/flutteredflag)

### 放大镜
放大镜已封装成一个模块，具体使用可访问下面链接，

[https://github.com/muzhidong/frontend-demo/tree/master/magnify](https://github.com/muzhidong/frontend-demo/tree/master/magnify)
