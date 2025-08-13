---
title: 自定义指令之水平循环滚动
tags: 
- Vue
---

# 自定义指令之水平循环滚动

本篇是作为vue自定义指令的一个初实践，效果类似以前的`marquee`标签（已废弃）。直接上源代码，相信阅读的同学都能轻松看懂。

```javascript
/**
 * 自定义指令：水平循环滚动。鼠标进入时停止滚动，离开时继续滚动；支持滚动间隔和偏移量配置，提供触底回调，如用于通知更新数据
 * 配置项说明：
 * interval：表示滚动间隔，可选
 * step：表示每次滚动偏移量，可选
 * cb：表示剩余偏移量为父元素宽度2倍时触发的回调，可选
 * dep：表示影响元素偏移量的依赖数组，可用于动态数据展示，可选
 * 示例：
 * <div v-scroll></div>
 * <div v-scroll="{interval: <滚动间隔>, step: <每次滚动偏移量>}"></div>
 * <div v-scroll="{cb: <方法名>}"></div>
 * <div v-scroll="{dep：<滚动依赖的动态数据列表>, cb: <方法名>}"></div>
 * <div v-scroll="{dep：<滚动依赖的动态数据列表>, cb: <方法名>, interval: <滚动间隔>, step: <每次滚动偏移量>}"></div>
 */

// 定时器
let timer = null
// 计算最大偏移量定时器
let calcTimer = null
// 最大偏移量
let maxOffset = 0
// 最近一次偏移量
let lastOffset = 0
// 触发标识
let trigger = true
// 配置项
const config = {
  step: 10,
  interval: 300,
  dep: null,
  cb: null
}

function startScroll (el) {
  if (maxOffset === 0 || timer) return
  timer = setInterval(() => {
    const offset = parseFloat(el.style.right)
    if (offset + config.step > maxOffset) {
      el.style.right = '0'
      lastOffset = 0
      trigger = true
      return
    }
    el.style.right = offset + config.step + 'px'
    lastOffset = offset + config.step

    if (lastOffset >= maxOffset - el.parentElement.offsetWidth * 2 && trigger) {
      trigger = false
      const { cb } = config
      cb && cb()
    }
  }, config.interval)
}

function stopScroll () {
  if (timer === null) return
  clearInterval(timer)
  timer = null
}

function mouseOverEventHandler () {
  stopScroll()
}

function mouseleaveEventHandler (e) {
  startScroll(e.target)
}

function calcMaxOffset (el) {
  const len = el.children.length
  maxOffset = 0
  for (let i = 0; i < len; i++) {
    maxOffset += el.children[i].offsetWidth
  }
  if (maxOffset === 0 && !calcTimer) {
    calcTimer = setInterval(() => {
      calcMaxOffset(el)
    }, 1000)
  } else if (maxOffset > 0) {
    if (calcTimer) {
      clearInterval(calcTimer)
      calcTimer = null
    }
    el.innerHTML += el.innerHTML
    startScroll(el)
  }
}

export default {
  bind (el, { value }) {
    el.style.position = 'relative'
    el.style.right = '0'
    el.addEventListener('mouseover', mouseOverEventHandler, false)
    el.addEventListener('mouseleave', mouseleaveEventHandler, false)

    if (value) {
      for (const key in value) {
        if (value[key] && !['dep'].includes(key)) {
          config[key] = value[key]
        }
      }
      if (value.cb) {
        config.cb = value.cb
      }
    }

    calcMaxOffset(el)
  },
  update (el, { value }) {
    const dep = value && value.dep

    if (!dep) {
      calcMaxOffset(el)
      return
    }

    if (config.dep !== dep) {
      config.dep = [...dep]
      trigger = true
      calcMaxOffset(el)
    }
  },
  unbind (el) {
    stopScroll()
    el.removeEventListener('mouseover', mouseOverEventHandler, false)
    el.removeEventListener('mouseleave', mouseleaveEventHandler, false)
  }
}

```

上述实现存在的问题：
- 1、若最大偏移量不大于父元素宽度，要不要滚动，此时触发回调的时机是否得当？
- 2、弱最大偏移量大于父元素宽度，但小于2倍父元素宽度，此时触发回调的时机是否得当？

这两个点，同学你知道如何去做调整吗？

```javascript
function startScroll (el) {
  const parentWidth = el.parentElement.offsetWidth
  // 第一处：最大偏移量不大于父元素宽度，不滚动
  if (maxOffset === 0 || maxOffset <= parentWidth || timer) return
  timer = setInterval(() => {
    const offset = parseFloat(el.style.right)
    if (offset + config.step > maxOffset) {
      el.style.right = '0'
      lastOffset = 0
      trigger = true
      return
    }
    el.style.right = offset + config.step + 'px'
    lastOffset = offset + config.step

    const diff = maxOffset - parentWidth * 2
    // 第二处：最大偏移量不大于2倍父元素宽度，不会触发回调
    if (diff > 0 && lastOffset >= diff && trigger) {
      trigger = false
      const { cb } = config
      cb && cb()
    }
  }, config.interval)
}
```
