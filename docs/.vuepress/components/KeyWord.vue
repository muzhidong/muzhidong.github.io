<template>
  <div class='container' ref="container">
    <span v-for="item,index in keywords" 
      :key="item.id" 
      class="item" 
      :style="item.style"
      :ref="`keyword${index}`">{{item.value}}</span>
  </div>
</template>

<script>
import bump from '../mixins/bump';
export default {
  mixins: [ bump ],
  props: {
    value: {
      type: Array,
      default: [],
    }
  },
  computed: {
    keywords(){
      return this.value.map((val,index) => {
        return {
          id: this.getRandomNumber(0, Number.MAX_SAFE_INTEGER),
          value: val,
          style: this.randomStyle(index, this.value.length),
        }
      });
    }
  },
  mounted(){
    this.$nextTick(()=>{
      // 为关键字元素设置动画样式
      this.keywords.map((_, index)=>{
        const el = this.$refs[`keyword${index}`][0];
        // 定义动画
        const [angle, x] = el.style.transform.replace(/^rotate\((.*)deg\) translate\((.*), 100%\)$/, '$1-$2').split('-');
        const keyframe = new KeyframeEffect(
          el, 
          [
            { transform: el.style.transform }, 
            { transform: `rotate(${+angle + 360}deg) translate(${x}, 100%)` }
          ], 
          { 
            duration: 10000, 
            easing: 'linear',
            iterations: Infinity, 
          }
        );
        // 播放动画
        const anim = new Animation(keyframe);
        anim.play();
        // 缓存
        el.anim = anim;
      })

      // 通过事件委托，监听每个关键字元素的鼠标移入、移出、点击事件
      const containerEl = this.$refs.container;
      const self = this;
      containerEl.addEventListener('mouseover',function(e){
        const {tagName, className, anim } = e.target??{};
        if(tagName === "SPAN" && className === "item"){
          anim.pause();
        }
      });
      containerEl.addEventListener('mouseout', function(e){
        const {tagName, className, anim } = e.fromElement??{};
        if(tagName === "SPAN" && className === "item"){
          anim.play();
        }
      });
      containerEl.addEventListener('click', function(e){
        const { tagName, className, innerText } = e.target??{};
        if(tagName === "SPAN" && className === "item"){
          const linkList = self.$site.themeConfig.nav[0].items;
          const path = linkList.find(item => item.text === innerText)?.link??'';
          if(path){
            window.location.href = path;
          }
        }
      });
    });    
  },
  methods: {
    // 生成随机样式
    randomStyle(index, len){
      const angle = index * Math.max(25, 360 / len);
      const x = `calc(100% + ${Math.floor(angle / 360) * 100}px)`; 
      return `transform: rotate(${angle % 360}deg) translate(${x}, 100%);
        font-size:${this.getRandomNumber(16, 30)}px;
        font-weight: ${-1 + Math.random() * 2 > 0? 'bold': 'normal'};
        color: ${this.getRandomColor()}`;
    },

    // 获取随机色
    getRandomColor() {
      return `#${('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)}`
    },

    // 是否是有效数字
    isValidNumber(value){
      var type = toString.call(value);
      return type === '[object Number]' || (type === '[object String]' && parseFloat(value) == value);
    },

    // 指定范围内获取随机整数
    getRandomNumber(min, max, defaultValue = 16) {
      if(this.isValidNumber(min) && this.isValidNumber(max))
        return parseInt(+min + Math.random() * (max - min), 10);
      return defaultValue;
    },
  }
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}
.item {
  position: absolute;
  cursor: pointer;
  user-select: none;
}
</style>
