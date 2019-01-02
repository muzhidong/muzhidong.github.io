---
title: DvaJS快速使用
tags: 
- React
---

### 组成
react + react-router + redux + saga + fetch

### 特性
- 易学易用，6个API
- elm概念
- 插件机制
- 支持HMR

<!--more-->

### 安装、运行或构建

    npm install dva-cli -g
    dva -v
    dva new your-project
    cd your-project
    npm start [npm run build]
    
扩展：
安装antdesign和babel-plugin-import[用于按需加载antd脚本和样式]

    npm install antd babel-plugin-import --save
编辑.webpackrc，使babel-plugin-import生效

    {
      "extraBabelPlugins": [
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
      ]
    }

### 数据流向

![](https://user-gold-cdn.xitu.io/2018/12/24/167dbe03ca75497f?w=1614&h=508&f=png&s=115320)

### 开发思路
- 定义视图

  新建 routes/HelloWorld.js，定义视图

      import React from 'react';
      const Hello = (props) => (
        <h2>HelloWorld!</h2>
      );
	  export default Hello;
- 设置路由  
  
   编辑 router.js，添加路由信息到路由表

      import HelloWorld from './routes/HelloWorld';
      ...
      <Route path="/helloworld" exact component={HelloWorld} />

- 抽取公共组件[可选]
  
  新建 components/HelloWorld.js 文件

      import React from 'react'; 
      const HelloWorld = ({title}) => {
        return (
            <h2>{title}</h2>
        );
      };
      export default HelloWorld;

- 定义model

  包括同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions。

   新建 models/hello.js
   
      export default {
        namespace: 'hello',
        state: {
            title:"HelloWorld!",
        },
        reducers: {
        },
        effects:{
        },
      };
   解释说明：
namespace 表示在全局 state 上的 key
state 是初始值，在这里是空数组
reducers 等同于 redux 里的 reducer，接收 action，同步更新 state

  编辑index.js，载入modal
  
   	app.model(require('./models/hello').default);

- 视图与模型的连接

  编辑 routes/HelloWorld.js

      import React from 'react';
      import { connect } from 'dva';
      import HelloWorld  from '../components/HelloWorld';
      const Hello = ({ dispatch, title}) => {   
        return (
            <Helloworld  title={title} />
        );
      };
      export default connect(({ hello }) => ({
        hello,
      }))(Hello);

     编辑index.js，启动dva
    
      const app = dva();

   于是乎，一个dva项目就建立起来了！！！