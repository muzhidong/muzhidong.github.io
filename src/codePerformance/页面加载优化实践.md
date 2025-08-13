---
title: 页面加载优化实践
tags: 
- 代码性能
---

# 页面加载优化实践

## 衡量指标
分析页面加载情况，我们看网络传输资源大小、页面内容资源加载完成时间点、页面外部资源加载完成时间点这三个指标。可以在下面截图查看3个指标的数据。
![页面加载性能指标说明](/loadoptimization/loadoptimization1.png)
其中，网络传输资源尺寸越小、页面外部资源加载完成时间点越短，说明页面加载越快，而页面内容资源加载完成时间点说明页面内容呈现的时间。

## 准备环境

1. 谷歌浏览器访问优化页面链接
2. 打开谷歌开发者工具，切换到NetWork控制台。先域名筛选，在搜索框输入domain:优化页面域名，只观察该域名下资源的加载。接着网络切换到Fast 3G，模拟弱网，如下图。

      ![网络选择](/loadoptimization/loadoptimization2.png)

## 优化前相关数据
![优化前相关数据](/loadoptimization/loadoptimization3.png)

网络传输资源大小：3.1MB

页面内容资源加载完成时间点：14.91s

页面外部资源加载完成时间点：16.45s

## 优化措施

1. 模块动态导入。实现页面按需加载，避免一次引入所有页面资源。同时为页面配置loading效果。
```javascript
dynamicImport: {
   loadingComponent: './components/loading'
}
```

2.  ECharts组件动态导入。保证引用ECharts组件的页面无需等待ECharts组件加载完成才显示。
```javascript
import {
  dynamic,
} from'umi';

exportdefault dynamic({
  loader: async () => {
    const {
      default: ReactECharts
    } = await import(/* webpackChunkName: "eCharts" */"./ReactECharts")
    return ReactECharts;
  },
})
```

3. nginx开启gzip

 配置如下，
```nginx
server {
  gzip on;                # 是否开启gzip压缩
  gzip_http_version 1.1;  # 使用gzip压缩的http版本
  gzip_buffers 200 10k;   # gzip压缩分配的缓冲区大小，两个参数，一是缓冲区个数，二是缓存区大小
  gzip_min_length 10k;    # gzip压缩启动的最小资源大小
  gzip_comp_level 6;      # gzip压缩等级，有1到10，值越高，资源压缩越小，但消耗cpu越高
  gzip_types application/javascript text/javascript text/css;   # gzip压缩启动的资源类型
  gzip_vary on;           # 是否添加响应头vary: Accept-Encoding，一种缓存处理手段，建议开启。
}
```

4. 第三方依赖抽离

  项目集成的功能相对独立，每个功能都引入了相关依赖。由于目前配置默认是打包到一个vendor文件，导致打开任一页面，都引入了一些无用的第三方依赖，对此需要对第三方依赖进行抽离。
```javascript
function escape(value){
  return toString.call(value) === '[object String]'? value.replace(new RegExp('-','g'),'\\-') : '';
}

function splitChunks(chunks){
  const chunkArr = chunks.map(chunk => {
    return {
      [chunk]: {
        name: chunk,
        test({resource}){
         returnnew RegExp(`(\\\\node_modules\\\\${escape(chunk)}\\\\)|(\\/node_modules\\/${escape(chunk)}\\/)`).test(resource)
        },
      }
    }
  })
  return Object.assign({}, ...chunkArr);
}
```
umi添加如下配置，
```javascript
chainWebpack: function (config) {
  config.merge({
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 1024 * 10,
        minChunks: 2,
        automaticNameDelimiter: '.',
        // 第三方依赖单独打包
        cacheGroups: splitChunks(['echarts', 'antd', 'lodash-es', 'moment', 'react-amap', 'weixin-js-sdk']),
      },
    },
  });
 },
```
 
## 优化结果
经过以上优化后，在**Fast 3G**模拟网络下得到的相关数据如下，
![优化后相关数据](/loadoptimization/loadoptimization4.png)

网络传输资源大小：888kB

页面内容资源加载完成时间点：1.88s

页面外部资源加载完成时间点：8.45s

对比优化前的数据发现，

引入loading体验效果后，页面内容资源加载完成时间点从14.91s变为1.88s；

动态导入优化并不明显，页面资源大小压缩100KB左右；

gzip压缩和第三方依赖抽离整体优化后，页面加载速度接近快1倍。

而在大多数的真实环境网络(4G、5G)下，页面加载基本是秒开。
