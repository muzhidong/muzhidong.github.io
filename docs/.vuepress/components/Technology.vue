<template>
  <div :class="['technology-container', {'mobile': isMobile}]">
    
    <template v-if="!isMobile">
      <div v-for="(tech, index) in techs" 
        :key="tech" 
        :style="{'--i': index}"
        class="tech"
      >{{tech}}</div>
    </template>

    <div v-for="(level,index) in levels" 
      :key="level.key" 
      :class="['level', level.containerClass]"
      :style="{
        '--row': isMobile ? (level.key === 'programming-language' ? '1/5' : `${index}/${index + 1}`) : (level.key === 'programming-language' ? '2/6' : `${index + 1}/${index + 2}`),
        '--col': isMobile ? (level.key === 'programming-language'? '9/10': '1/9') : (level.key === 'programming-language'? '5/6': '1/5'),
      }">

      <template v-if="level.key === 'hardware'">
        <div v-for="item in level.items" 
          :key="level.text" 
          class="item" 
          :tip="item.tip? item.tip.content: undefined">{{ item.text }}</div>
      </template>

      <template v-else>
        <div :class="level.tip && level.tip.class"
          :style="level.tip && level.tip.style"
          :tip="level.tip && level.tip.content"
        >{{level.text}}</div>
        
        <template v-if="level.items && !isMobile">
          <div v-for="item in level.items" class="item" v-html="item.html"></div>
        </template>
        
        <template v-if="level.multiItems">
          <div class="flex" style="width:100%;">
            <template v-for="item in level.multiItems">
              <div v-if="isMobile" class="title">{{item.title}}</div>
              <ul class="item">
                <li v-for="(item,index) in item.items" :key="index" v-html="item.html" ></li>
              </ul>
            </template>
          </div>
        </template>

      </template>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: true,
      techs: ['Web端技术', '客户端技术', '服务端技术', '领域技术'],
      levels: [{
        key: 'programming-language',
        containerClass: 'programming-language flex-col',
        text: '编程语言',
        tip: {
          class: 'tip',
          style: {
            '--top': '100%',
            '--pt': '10px',
            '--pb': '10px',
            '--fs': '14px'
          },
          content: '建议先选择一门通用语言学习，再根据发展方向是否还需学习领域语言。不建议首选商业语言，除非该语言在某个领域已成为主流',
        },
        items: [{
          html: '通用语言：<br>C、C++、JavaScript、TypeScript、Java、Python、Go、Rust',
        }, {
          html: '领域语言：<br>HTML、EJS、CSS、Sass、Less、Dart、PHP'
        }, {
          html: '商业语言：<br>Kotlin、Object-C、Swift、C#、ArkTs'
        }]
      }, {
        key: 'application',
        text: '应用层'
      }, {
        key: 'lib',
        containerClass: 'flex-col',
        text: '框架层',
        multiItems: [{
          title: 'Web端技术：',
          items: [{
            html: 'MVVM框架：<br>React、Vue、Angular'
          }, {
            html: 'UI库：<br>AntDesign、Element'
          }, {
            html: '包管理工具：<br>NPM、Yarn、PNPM'
          }, {
            html: '打包工具：<br>Webpack、 Vite'
          }, {
            html: '代码检查工具：<br>ESLint、Prettier'
          }, {
            html: '测试工具：<br>Jest'
          }]
        }, {
          title: '客户端技术：',
          items: [{
            html: '跨端框架(壳技术)：<br>小程序、RN、Electron'
          }, {
            html: '原生SDK：<br>Android SDK、Cocoa、Flutter'
          }, {
            html: '依赖管理工具：<br>Gradle'
          }]
        }, {
          title: '服务端技术：',
          items: [{
            html: '服务端框架：<br>Next、Nest、Express、Spring Boot、Laravel、Django'
          }, {
            html: '依赖管理工具：<br>Maven'
          }]
        }, {
          title: '领域技术：',
          items: [{
            html: '动画：<br>Three.js'
          }, {
            html: '游戏：<br>Cocos2d-x'
          }]
        },]
      }, {
        key: 'runtime',
        containerClass: 'flex-col',
        text: '运行时层',
        tip: {
          class: 'tip',
          content: '包含上层调用的API或命令以及连接下层的C函数'
        },
        multiItems: [{
          title: 'Web端技术：',
          items: [{
            html: '浏览器'
          }]
        }, {
          title: '客户端技术：',
          items: [{
            html: 'ART'
          }, { 
            html: 'Object-C Runtime'
          }, { 
            html: 'Dart VM' 
          }]
        }, {
          title: '服务端技术：',
          items: [{ 
            html: 'NodeJS' 
          }, { 
            html: 'JDK' 
          }, { 
            html: '服务器(Nginx、Tomcat、Apache)' 
          }]
        }, {
          title: '领域技术：',
          items: [{ 
            html: 'Cocos Runtime' 
          }, { 
            html: 'OpenGL' 
          }]
        }]
      }, {
        key: 'system-software',
        text: '系统层',
        tip: {
          class: 'tip',
          content: '如Android、IOS、Windows、MacOS、Linux'
        }
      }, {
        key: 'hardware',
        containerClass: 'hardware flex',
        items: [{
          text: '硬件',
          tip: {
            content: '包括CPU、存储器、IO设备'
          }
        }, {
          text: '计算机网络'
        }]
      }]
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

.tech {
  grid-row: 1 / 2;
  border: 0 none !important;
  grid-column: calc(var(--i) + 1) / calc(var(--i) + 2);
}

.level {
  grid-row: var(--row);
  grid-column: var(--col);
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

.programming-language {
  justify-content: space-around !important;
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
}
</style>
