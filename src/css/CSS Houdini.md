---
title: CSS Houdini
tags: 
- CSS
---

Houdini是CSS未来的趋势，为什么这么说？Houdini是一组API，使开发人员可以直接访问CSS对象模型(CSSOM)，编写浏览器能解析为CSS的代码，创建新的CSS功能，无需等待浏览器厂商提供支持。本文内容介绍大多参考自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Houdini)

## Houdini优势
- 解析更快：相较使用HTMLElement.style处理样式变化。Houdini代码不会等待第一个渲染周期完成，而是它本身就包含在第一个周期中，创建可渲染、可理解的样式
- 操作更直观：通过对象的方式操作CSS，优于字符串方式的HTMLElement.style操作
- 支持CSS模块化：通过Worklet，只需一行JavaScript即可导入可配置组件，无需预处理器、后处理器或JavaScript框架

## CSS Properties and Values API
提供了一个注册CSS自定义属性的JS API和CSS 规则集

- 两种注册方式
  - JS
  ```javascript
  CSS.registerProperty({
    name: "--property-name",
    syntax: "<unit>",
    inherits: true | false,
    initialValue: unitValue,
  });
  ```

  - CSS
  ```css
  @property --property-name {
    syntax: "<unit>";
    inherits: [true | false];
    initial-value: unitValue;
  }
  ```

- 注意
  - 注册后的CSS属性不可修改
  - 不同于标准属性，解析时不会校验注册的属性，计算时才校验，无效值会回退取默认值

- [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-houdini/demo-houdini.html)

## CSS Typed OM
暴露CSS值为JS类型对象，允许对其进行操作

- Element.computedStyleMap()

  获取元素上所有CSS声明，返回一个StylePropertyMapReadOnly对象
  
- StylePropertyMapReadOnly

  实例属性
  - size

  实例方法
  - forEach()
  - get()
  - getAll()
  - has()
  - entries()
  - keys()
  - values()

  > StylePropertyMap：继承StylePropertyMapReadOnly，可通过Element.attributeStyleMap获取。提供增删改操作：
  >  - append()
  >  - set()
  >  - delete()
  >  - clear() 

- CSSStyleValue

  属性值都是computed value，以下简单说明值处理的过程及涉及的相关值定义

  ```
     initial value (width: auto) 
  -> specified value (width: 1em) 
  -> computed value (width: 16px，尺寸值不一定是像素) 
  -> used value (width: 16px，尺寸值是一定是像素)
  -> rendered value
     actual values：used value
     resolved value（retrieved via script）：computed value or used value
  ```
  
  > 属性值均继承CSSStyleValue，提供静态的解析方法
  > - parse(property, cssText)：返回一个CSSStyleValue对象，为参数值中的第一个
  > - parseAll(property, cssText)：返回一个CSSStyleValue数组，每项对应参数值中的一个
  
  - CSSKeywordValue
  
    实例属性
    - value

  - CSSNumericValue
  
    静态方法
    - parse()
    
    实例方法
    - add()
    - sub()
    - mul()
    - div()
    - max()
    - min()
    - equals()
    - to()
    - toSum()
    - type()

    子类
    - CSSUnitValue
      
      实例属性
      - unit
      - value
    
    - CSSMathValue

      实例属性
      - operator

    - CSSMathSum
      
      继承CSSMathValue。使用calc()函数的属性值，或者调用CSSNumericValue.add方法的返回结果
      
      实例属性
      - values

  - CSSTransformValue

    实例属性
    - is2D
    - length

    实例方法
    - forEach()
    - entries()
    - keys()
    - values()
    - toMatrix()

  - CSSUnparsedValue

    实例属性
    - length

    实例方法
    - forEach()
    - entries()
    - keys()
    - values()

  - CSSImageValue

- [示例](https://github.com/muzhidong/blog-demo/blob/main/docs/02css/demo-houdini/demo-houdini.html)

## CSS Painting API
允许开发者编写JS函数，直接绘制元素背景、边框或内容。本质是通过CSS图片函数paint()创建自定义值。目前属于实验性技术，Safari暂不支持

- 示例

  示例1：
  ```html
  <style>
    :root {
      /* 放body会取不到值？*/
      --paint-color: orange;
      --paint-size: 200;
    }
    body {
      /* 作用在background-image、border-image、content等属性上 */
      background: paint(my-rect, 500, 100);
    }
  </style>
  <script>
    function fn() {
      if (!CSS.paintWorklet) {
        return;
      }
      const blobURL = URL.createObjectURL(new Blob(['(',
        function () {
          class MyRect {
            // 传入函数参数类型
            static get inputArguments() {
              return ['<number>', '<number>'];
            }
            // 传入元素属性
            static get inputProperties() {
              return ['--paint-color', '--paint-size'];
            }
            // 参数依次表示绘制上下文、绘制大小、传入的元素属性、传入的函数参数
            // 注意当窗口大小发生变化时，会重新触发paint方法
            paint(ctx, paintSize, properties, args) {
              const color = properties.get('--paint-color').toString()
              const size = +properties.get('--paint-size').toString()
              const startX = +args[0].toString()
              const startY = +args[1].toString()
              ctx.fillStyle = color
              ctx.fillRect(startX, startY, size, size)
            }
          }
          registerPaint('my-rect', MyRect);
        }.toString(), ')()'], {
          type: 'application/javascript'
        })
      );
      // CSS API —— https://developer.mozilla.org/en-US/docs/Web/API/CSS
      CSS.paintWorklet.addModule(blobURL);
    }
    fn()
  </script>
  ```

  示例2：[星空](https://github.com/muzhidong/blog-demo/tree/main/docs/02css/demo-houdini/demo-starry-sky)
