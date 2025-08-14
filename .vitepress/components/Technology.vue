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
        '--row': isMobile ? level.mobileRow || `${index}/${index + 1}` : level.row || `${index + 1}/${index + 2}`,
        '--col': isMobile ? level.mobileCol || '1/9' : level.col || '1/5',
      }">
        <div :class="level.tip && level.tip.class"
          :style="level.tip && level.tip.style"
          :tip="!isMobile && level.tip && level.tip.content"
        >{{level.text}}</div>
        
        <template v-if="level.items && !isMobile">
          <div v-for="item in level.items" class="item" v-html="item.html"></div>
        </template>
        
        <template v-if="level.multiItems">
          <div class="flex" style="width:100%;">
            <template v-for="item in level.multiItems">
              <div v-if="isMobile" class="title">{{item.title}}</div>
              <ul class="item">
                <li v-for="(item,index) in item.items" 
                  :key="index" 
                  :tip="!isMobile && item?.tip?.content"
                  :style="item?.tip?.style"
                  v-html="item.html" >
                </li>
              </ul>
            </template>
          </div>
        </template>

        <template v-if="!isMobile && level.common">
          <div class="item" 
            :style="level.common.style" 
            v-html="level.common.html"></div>
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
        text: '高级编程语言',
        row: '2/6',
        col: '5/6',
        mobileRow: '1/5',
        mobileCol: '9/10',
        tip: {
          class: 'tip',
          style: {
            '--top': '100%',
            '--pt': '10px',
            '--pb': '10px',
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
        key: 'framework',
        containerClass: 'flex-col',
        text: '框架层',
        multiItems: [{
          title: 'Web端技术：',
          items: [{
            html: 'MVVM框架：<br>React、Vue、Angular'
          }, {
            html: 'UI库：<br>AntDesign、Element'
          }, {
            html: '打包工具：<br>Webpack、 Vite'
          }, {
            html: '包管理工具：<br>NPM、Yarn、PNPM'
          }]
        }, {
          title: '客户端技术：',
          items: [{
            tip: {
              style: {
                '--pt': '10px',
                '--pb': '10px',
              },
              content: '小程序、RN、Electron是基于端框架兼容的壳技术，而Flutter、Qt是基于系统的真正跨端技术，实现层面有所不同',
            },
            html: '跨端框架：<br>小程序、RN、Electron、Flutter、Qt'
          }, {
            html: '原生SDK：<br>Android SDK、Cocoa'
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
          },],
        common: {
          style: 'width: calc(100% - 20px);',
          html: '代码规范工具：ESLint、Prettier<br>代码测试工具：Jest'
        }
      }, {
        key: 'runtime',
        containerClass: 'flex-col',
        text: '运行时层',
        tip: {
          class: 'tip',
          content: '提供底层能力调用的API或命令'
        },
        multiItems: [{
          title: 'Web端技术：',
          items: [{
            html: '浏览器(Chrome、Edge)'
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
            html: '服务器(Nginx、Tomcat)' 
          }]
        }, {
          title: '领域技术：',
          items: [{ 
            html: 'Cocos Runtime' 
          }, { 
            html: 'OpenGL' 
          }]
        }],
        common: {
          style: 'width: calc(50% - 20px);',
          html: '语言运行时：NodeJS、JDK'
        }
      }, {
        type: 'custom',
        key: 'operating-system',
        text: '操作系统层',
        tip: {
          class: 'tip',
          content: '如Android、IOS、Windows、MacOS、Linux'
        },
        col: '1/3',
        mobileCol: '1/5',
      }, {
        type: 'custom',
        key: 'hardware',
        text: '微机',
        tip: {
          class: 'tip',
          content: '含CPU、存储器、IO设备'
        },
        col: '1/3',
        mobileCol: '1/5',
      }, {
        type: 'custom',
        key: 'network',
        text: '计算机网络',
        row: '5/7',
        col: '3/5',
        mobileRow: '4/6',
        mobileCol: '5/9',
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

.technology-container > div {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--vp-c-text-3);
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
  border: 2px solid var(--vp-c-text-3);
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

.tip {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

[tip]:not([tip='false']):hover {
  color: #1890ff;
  position: relative;
}

[tip]:not([tip='false']):hover::after {
  content: attr(tip);
  position: absolute;
  top: var(--top, 0);
  left: 0;
  width: 100%;
  padding: 0 10px;
  padding-top: var(--pt, 0);
  padding-bottom: var(--pb, 0);
  color: var(--vp-c-neutral);
  background: #1890ff;
  font-size: var(--fs, 14px);
  border-radius: 8px;
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

  .item {
    flex-basis: 100%;
  }
}
</style>
