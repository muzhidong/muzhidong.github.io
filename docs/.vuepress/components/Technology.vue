<template>
  <div :class="['technology-container', {'mobile': isMobile}]">
    <template v-if="!isMobile">
      <div class="web">Web端技术</div>
      <div class="client">客户端技术</div>
      <div class="server">服务端技术</div>
      <div class="domain">领域技术</div>
    </template>

    <div class="programming-language flex-col" style="justify-content: space-around;">
      <div class="tip" 
        style="--top: 100%;--pt: 10px;--pb: 10px;--fs: 14px;"
        tip="建议先选择一门通用语言学习，再根据发展方向是否还需学习领域语言。不建议首选商业语言，除非该语言在某个领域已成为主流"
      >编程语言</div>
      <template v-if="!isMobile">
        <div class="item">通用语言：<br>C、C++、JavaScript、TypeScript、Java、Python、Go、Rust</div>
        <div class="item">领域语言：<br>HTML、EJS、CSS、Sass、Less、Dart、PHP</div>
        <div class="item">商业语言：<br>Kotlin、Object-C、Swift、C#、ArkTs</div>
      </template>
    </div>

    <div class="application">应用层</div>

    <div class="lib flex-col">
      <div>框架层</div>
      <div class="flex">
        <div v-if="isMobile" class="title">Web端技术：</div>
        <ul class="item">
          <li>MVVM框架：<br>React、Vue、Angular</li>
          <li>UI库：<br>AntDesign、Element</li>
          <li>包管理工具：<br>NPM、Yarn、PNPM</li>
          <li>打包工具：<br>Webpack、 Vite</li>
          <li>代码检查工具：<br>ESLint、Prettier</li>
          <li>测试工具：<br>Jest</li>
        </ul>
        <div v-if="isMobile" class="title">客户端技术：</div>
        <ul class="item">
          <li>跨端框架(壳技术)：<br>小程序、RN、Electron</li>
          <li>原生SDK：<br>Android SDK、Cocoa、Flutter</li>
          <li>依赖管理工具：<br>Gradle</li>
        </ul>
        <div v-if="isMobile" class="title">服务端技术：</div>
        <ul class="item">
          <li>服务端框架：<br>Next、Nest、Express、Spring Boot、Laravel、Django</li>
          <li>依赖管理工具：<br>Maven</li>
        </ul>
        <div v-if="isMobile" class="title">领域技术：</div>
        <ul class="item">
          <li>动画：<br>Three.js</li>
          <li>游戏：<br>Cocos2d-x</li>
        </ul>
      </div>
    </div>

    <div class="runtime flex-col">
      <div class="tip" tip="包含上层调用的API或命令以及连接下层的C函数">运行时层</div>
      <div class="flex" style="width:100%;">
        <div v-if="isMobile" class="title">Web端技术：</div>
        <ul class="item">
          <li>浏览器</li>
        </ul>
        <div v-if="isMobile" class="title">客户端技术：</div>
        <ul class="item">
          <li>ART</li>
          <li>Object-C Runtime</li>
          <li>Dart VM</li>
        </ul>
        <div v-if="isMobile" class="title">服务端技术：</div>
        <ul class="item">
          <li>NodeJS</li>
          <li>JDK</li>
          <li>服务器(Nginx、Tomcat、Apache)</li>
        </ul>
        <div v-if="isMobile" class="title">领域技术：</div>
        <ul class="item">
          <li>Cocos Runtime</li>
          <li>OpenGL</li>
        </ul>
      </div>
    </div>

    <div class="system-software">
      <div class="tip" tip="如Android、IOS、Windows、MacOS、Linux">系统层</div>
    </div>

    <div class="hardware flex">
      <div class="item" tip="包括CPU、存储器、IO设备">硬件</div>
      <div class="item">计算机网络</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: true,
    }
  },
  created() {
    this.isMobile = /android|iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
  }
}
</script>

<style>
main.home {
  max-width: 100%;
  height: auto;
  margin-left: 0;
  margin-right: 0;
}
</style>

<style scoped>
/* 公共样式 */
.flex {
  display: flex;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

/* 页面样式 */
.technology-container {
  display: grid;
  grid-gap: 8px;
  padding: 10px 0;
}

.technology-container>div:not(.hardware) {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000;
  word-break: break-word;
  font-weight: bold;
  border-radius: 10px;
}

.web {
  grid-column: 1 / 2;
}

.client {
  grid-column: 2 / 3;
}

.server {
  grid-column: 3 / 4;
}

.domain {
  grid-column: 4 / 5;
}

.technology-container>.web,
.technology-container>.client,
.technology-container>.server,
.technology-container>.domain {
  grid-row: 1 / 2;
  border: 0 none !important;
}

.programming-language {
  grid-row: 2 / 6;
  grid-column: 5 / 6;
}

.application {
  grid-row: 2 / 3;
}

.lib {
  grid-row: 3 / 4;
}

.runtime {
  grid-row: 4 / 5;
}

.system-software {
  grid-row: 5 / 6;
}

.hardware {
  grid-row: 6 / 7;
}
.hardware>div {
  flex-basis: calc(50% - 2px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.hardware>div:not(:last-child) {
  margin-right: 4px;
}

.application,
.lib, 
.runtime,
.system-software,
.hardware {
  grid-column: 1 / 5;
}

.item {
  flex-basis: calc(25% - 20px);
  padding: 0 10px;
  border: 2px solid #000;
  margin: 0 10px 4px;
  word-break: break-word;
  font-weight: bold;
  border-radius: 10px;
  box-sizing: border-box;
}

ul.item {
  padding-left: 20px;
}

.tip {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

[tip]:hover {
  color: #1890ff;
  position: relative;
}

[tip]:hover::after {
  content: attr(tip);
  position: absolute;
  top: var(--top, 0);
  left: 0;
  width: 100%;
  padding: 0 10px;
  padding-top: var(--pt, 0);
  padding-bottom: var(--pb, 0);
  color: white;
  background: #1890ff;
  font-size: var(--fs, 16px);
  border-radius: 10px;
  box-sizing: border-box;
}

.mobile {

  .flex {
    flex-wrap: wrap;
  }

  .title {
    margin-left: 10px;
    color: #999;
    font-size: 12px;
  }

  .item:not(.hardware>div) {
    flex-basis: 100%;
  }

  .programming-language {
    grid-row: 1 / 5;
    grid-column: 10 / 11;
  }

  .application {
    grid-row: 1 / 2;
  }

  .lib {
    grid-row: 2 / 3;
  }

  .runtime {
    grid-row: 3 / 4;
  }

  .system-software {
    grid-row: 4 / 5;
  }

  .hardware {
    grid-row: 5 / 6;
  }

  .application,
  .lib, 
  .runtime,
  .system-software,
  .hardware {
    grid-column: 1 / 10;
  }
}
</style>
