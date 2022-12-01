(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{412:function(t,a,s){"use strict";s.r(a);var n=s(31),p=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"canvas应用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#canvas应用"}},[t._v("#")]),t._v(" Canvas应用")]),t._v(" "),s("h2",{attrs:{id:"canvas-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#canvas-api"}},[t._v("#")]),t._v(" Canvas API")]),t._v(" "),s("h3",{attrs:{id:"属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#属性"}},[t._v("#")]),t._v(" 属性")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("width")]),t._v(" "),s("p",[t._v("在canvas标签中，声明属性width=1000(px)与应用样式width:1000px都是设置画布宽度，但是有一点区别需要注意，前者实质是应用了"),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/aspect-ratio",target:"_blank",rel:"noopener noreferrer"}},[t._v("aspect-ratio"),s("OutboundLink")],1),t._v("媒体属性，表示视口宽高比，在使用canvas api时传入的数值参数单位是px，而后者应用画布API时传入的数值单位是百分比，超过100%按100%显示。一般建议采用属性声明的方式。")])]),t._v(" "),s("li",[s("p",[t._v("height")]),t._v(" "),s("p",[t._v("同width")])])]),t._v(" "),s("h3",{attrs:{id:"方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("getContext(contextId)")]),t._v(" "),s("p",[t._v("返回CanvasRenderingContext2D对象")])]),t._v(" "),s("li",[s("p",[t._v("toDataURL([type][,level])")]),t._v(" "),s("p",[t._v("指定画布要转化为图片类型，返回图片url。若类型为image/jpeg，还可指定质量等级，值在0到1之间")])])]),t._v(" "),s("h2",{attrs:{id:"canvasrenderingcontext2d-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#canvasrenderingcontext2d-api"}},[t._v("#")]),t._v(" CanvasRenderingContext2D API")]),t._v(" "),s("h3",{attrs:{id:"属性-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#属性-2"}},[t._v("#")]),t._v(" 属性")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("fillStyle")]),t._v(" "),s("p",[t._v("表示填充风格，值支持hex、rgba、hsla这三种表示方式")])]),t._v(" "),s("li",[s("p",[t._v("strokeStyle")]),t._v(" "),s("p",[t._v("表示轮廓风格")])]),t._v(" "),s("li",[s("p",[t._v("globalAlpha")]),t._v(" "),s("p",[t._v("设置图像透明度")])]),t._v(" "),s("li",[s("p",[t._v("globalCompositeOperation")]),t._v(" "),s("p",[t._v("设置重叠图像的覆盖方式，可取值如下，")]),t._v(" "),s("ul",[s("li",[t._v("source-over：默认值，显示源和汇的差集、源的交集")]),t._v(" "),s("li",[t._v("destination-over：显示源和汇的差集、汇的交集")]),t._v(" "),s("li",[t._v("source-in：只显示源的交集")]),t._v(" "),s("li",[t._v("destination-in：只显示汇的交集")]),t._v(" "),s("li",[t._v("source-out：只显示源的差集")]),t._v(" "),s("li",[t._v("destination-out：只显示汇的差集")]),t._v(" "),s("li",[t._v("lighter：显示源和汇的差集、交集混合颜色变淡")]),t._v(" "),s("li",[t._v("darker：显示源和汇的差集、交集混合颜色变深")]),t._v(" "),s("li",[t._v("xor：显示源和汇的差集")]),t._v(" "),s("li",[t._v("source-atop：只显示源的差集")]),t._v(" "),s("li",[t._v("destination-atop：显示汇的交集和源的差集")]),t._v(" "),s("li",[t._v("copy：显示源")])])]),t._v(" "),s("li",[s("p",[t._v("lineCap")]),t._v(" "),s("p",[t._v("表示线段的箭头样式，可取值为butt、round、square，默认值为butt，表示头尾为长方形，round表示头尾为半圆形，square表示头尾增加一个长方形，其长为线宽的一半，高为线宽")])]),t._v(" "),s("li",[s("p",[t._v("lineJoin")]),t._v(" "),s("p",[t._v("表示线段的连接方式，可取值为miter、round、bevel，默认值为miter，线段在连接处外侧延伸直至交于一点，若外延交点距离大于限制值是表现为bevel风格，其连接处为斜角，round连接处为一个圆角，半径为线宽")])]),t._v(" "),s("li",[s("p",[t._v("lineWidth")]),t._v(" "),s("p",[t._v("表示线段的线宽")])]),t._v(" "),s("li",[s("p",[t._v("miterLimit")]),t._v(" "),s("p",[t._v("表示线段连接处的斜率")])]),t._v(" "),s("li",[s("p",[t._v("shadowBlur")]),t._v(" "),s("p",[t._v("阴影模糊等级，值范围为不小于0")])]),t._v(" "),s("li",[s("p",[t._v("shadowColor")]),t._v(" "),s("p",[t._v("阴影颜色")])]),t._v(" "),s("li",[s("p",[t._v("shadowOffsetX")]),t._v(" "),s("p",[t._v("阴影X偏移量")])]),t._v(" "),s("li",[s("p",[t._v("shadowOffsetY")]),t._v(" "),s("p",[t._v("阴影Y偏移量")])]),t._v(" "),s("li",[s("p",[t._v("font")])]),t._v(" "),s("li",[s("p",[t._v("textAlign")])]),t._v(" "),s("li",[s("p",[t._v("textBaseline")])])]),t._v(" "),s("h3",{attrs:{id:"方法-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法-2"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("restore()")]),t._v(" "),s("p",[t._v("恢复至上次保存的绘图状态，包括所有属性和transform、clip两个方法")])]),t._v(" "),s("li",[s("p",[t._v("save()")]),t._v(" "),s("p",[t._v("保存当前绘图状态")])]),t._v(" "),s("li",[s("p",[t._v("scale(x,y)")]),t._v(" "),s("p",[t._v("分别在x和y轴方向上按指定比例缩放")])]),t._v(" "),s("li",[s("p",[t._v("translate(x,y)")]),t._v(" "),s("p",[t._v("分别在x和y轴方向上按指定值偏移，实质上是可以看做是画布参考坐标系上的原点的移动")])]),t._v(" "),s("li",[s("p",[t._v("rotate(angle)")]),t._v(" "),s("p",[t._v("顺时针旋转angle度")])]),t._v(" "),s("li",[s("p",[t._v("transform(m11,m12,m21,m22,dx,dy)")]),t._v(" "),s("p",[t._v("乘上如下矩阵进行变换，")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("    m11 m21 dx\n    m21 m22 dy\n    0   0   1\n")])])])]),t._v(" "),s("li",[s("p",[t._v("setTransform(m11,m12,m21,m22,dx,dy)")]),t._v(" "),s("p",[t._v("重设变换矩阵")])]),t._v(" "),s("li",[s("p",[t._v("createLinearGradient(x0,y0,x1,y1)")]),t._v(" "),s("p",[t._v("线性渐变")])]),t._v(" "),s("li",[s("p",[t._v("createRadialGradient(x0,y0,r0,x1,y1,r1)")]),t._v(" "),s("p",[t._v("径向渐变，返回一个渐变对象，有如下方法，")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("  addColorStop(point,color)\n")])])]),s("p",[t._v("用于添加渐变颜色点，point值在0至1之间")])]),t._v(" "),s("li",[s("p",[t._v("createPattern(image,repetition)")]),t._v(" "),s("p",[t._v("指定图像和重复方向创建画布图案对象，repetition可取值为repeat、repeat-x、repeat-y和no-repeat")])]),t._v(" "),s("li",[s("p",[t._v("arc(x,y,r,a0,a1[,direction])")]),t._v(" "),s("p",[t._v("画弧，参数分别表示圆心X坐标,圆心Y坐标,圆心半径,起始角度,结束角度,绘制方向(为true表示逆时针，为false表示顺时针)")])]),t._v(" "),s("li",[s("p",[t._v("arcTo(x1,y1,x2,y2,radius)")]),t._v(" "),s("p",[t._v("绘制路径终点分别与点(x1,y1)、(x2,y2)构成的两条直线间半径为radius的弧长")])]),t._v(" "),s("li",[s("p",[t._v("rect(x,y,w,h)")]),t._v(" "),s("p",[t._v("画矩形")])]),t._v(" "),s("li",[s("p",[t._v("bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)")]),t._v(" "),s("p",[t._v("三次贝塞尔曲线")])]),t._v(" "),s("li",[s("p",[t._v("quadraticCurveTo(cpx,cpy,x,y)")]),t._v(" "),s("p",[t._v("二次贝塞尔曲线")])]),t._v(" "),s("li",[s("p",[t._v("clearRect(x,y,w,h)")]),t._v(" "),s("p",[t._v("清除矩形内的像素，参数分别表示起始X轴偏移量，起始Y轴偏移量，矩形宽度，矩形高度")])]),t._v(" "),s("li",[s("p",[t._v("fillRect(x,y,w,h)")]),t._v(" "),s("p",[t._v("绘制填充矩形，参数同clearRect")])]),t._v(" "),s("li",[s("p",[t._v("strokeRect(x,y,w,h)")]),t._v(" "),s("p",[t._v("绘制轮廓矩形，参数同strokeRect")])]),t._v(" "),s("li",[s("p",[t._v("moveTo(x,y)")]),t._v(" "),s("p",[t._v("移动到指定位置")])]),t._v(" "),s("li",[s("p",[t._v("lineTo(x,y)")]),t._v(" "),s("p",[t._v("画线到指定位置")])]),t._v(" "),s("li",[s("p",[t._v("beginPath()")]),t._v(" "),s("p",[t._v("开始新的子路径")])]),t._v(" "),s("li",[s("p",[t._v("closePath()")]),t._v(" "),s("p",[t._v("关闭子路径")])]),t._v(" "),s("li",[s("p",[t._v("isPointInPath(x,y)")]),t._v(" "),s("p",[t._v("判断点(x,y)是否在当前路径")])]),t._v(" "),s("li",[s("p",[t._v("fill()")]),t._v(" "),s("p",[t._v("填充方式绘制")])]),t._v(" "),s("li",[s("p",[t._v("stroke()")]),t._v(" "),s("p",[t._v("轮廓方式绘制")])]),t._v(" "),s("li",[s("p",[t._v("clip()")]),t._v(" "),s("p",[t._v("裁切路径，只显示裁切区域的内容")])]),t._v(" "),s("li",[s("p",[t._v("fillText(text,x,y[,maxWidth])")])]),t._v(" "),s("li",[s("p",[t._v("strokeText(text,x,y[,maxWidth])")])]),t._v(" "),s("li",[s("p",[t._v("drawImage(image[,sx,sy,sw,sh],dx,dy[,dw,dh])")]),t._v(" "),s("p",[t._v("绘图，参数分别表示图片的起始X偏移量，图片的起始Y偏移量，图片的指定宽度，图片的指定高度，图片相对浏览器窗口的起始X偏移量，图片相对浏览器窗口的起始Y偏移量，图片在浏览器窗口设置的宽度，图片在浏览器窗口设置的高度")])]),t._v(" "),s("li",[s("p",[t._v("createImageData(sw,sh)/createImageData(image)")]),t._v(" "),s("p",[t._v("指定宽高或明确宽高的图像，创建ImageData对象")])]),t._v(" "),s("li",[s("p",[t._v("getImageData(sx,sy,sw,sh)")]),t._v(" "),s("p",[t._v("获取画布指定区域的ImageData对象")])]),t._v(" "),s("li",[s("p",[t._v("putImageData(imageData,dx,dy[,dirtyX,dirtyY,dirtyWidth,dirtyHeight])")]),t._v(" "),s("p",[t._v("绘制指定的ImageData对象")])])]),t._v(" "),s("h2",{attrs:{id:"应用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#应用"}},[t._v("#")]),t._v(" 应用")]),t._v(" "),s("h3",{attrs:{id:"碰撞球"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#碰撞球"}},[t._v("#")]),t._v(" 碰撞球")]),t._v(" "),s("p",[t._v("效果如下，")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/12/16/167b7185cf9ab3f8?w=582&h=405&f=gif&s=914354",alt:""}})]),t._v(" "),s("p",[t._v("贴上与canvas相关的代码，")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//画线")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("drawLine")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" color")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("save")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("beginPath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("color "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("strokeStyle "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#A7AEB0"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("strokeStyle "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" color"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("moveTo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("lineTo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stroke")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("closePath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("restore")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//画球")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("draw3DBall")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" c0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" c1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("save")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("beginPath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" gradient "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createRadialGradient")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c0 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tgradient"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addColorStop")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#eee"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tgradient"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addColorStop")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" c0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tgradient"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addColorStop")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#57BADA"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tgradient"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addColorStop")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" c1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fillStyle "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" gradient"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("arc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PI")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fill")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("closePath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcontext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("restore")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("源码链接：\n"),s("a",{attrs:{href:"https://github.com/muzhidong/frontend-demo/tree/master/collidedball",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/muzhidong/frontend-demo/tree/master/collidedball"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"旗帜"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#旗帜"}},[t._v("#")]),t._v(" 旗帜")]),t._v(" "),s("p",[t._v("效果如下，")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/12/16/167b714916ba8201?w=755&h=459&f=gif&s=688286",alt:""}})]),t._v(" "),s("p",[t._v("贴上与canvas相关的代码，")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//画旗帜")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("drawFlag")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" offsetX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("beginPath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("moveTo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y0 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("offsetX "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PI")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("lineTo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x0 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y0 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("offsetX "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PI")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("lineTo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("offsetX "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PI")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("lineTo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("offsetX "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" x0 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PI")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("lineTo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y0 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("offsetX "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PI")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" x0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("closePath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fillStyle "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#1890ff"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tcon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fill")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("源码链接：\n"),s("a",{attrs:{href:"https://github.com/muzhidong/frontend-demo/tree/master/flutteredflag",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/muzhidong/frontend-demo/tree/master/flutteredflag"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"放大镜"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#放大镜"}},[t._v("#")]),t._v(" 放大镜")]),t._v(" "),s("p",[t._v("放大镜效果已封装成一个插件使用，具体可访问下面链接，")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/muzhidong/magnify",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/muzhidong/magnify"),s("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=p.exports}}]);