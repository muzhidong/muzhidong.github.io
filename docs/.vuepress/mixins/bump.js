// 首页logo加碰撞效果
let scrollTop;
let scrollLeft;
module.exports = {
  data(){
    return {
      target: {},
    }
  },
  mounted() {
    // scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    //
    // const target = document.querySelector('.navbar .logo');
    // this.target = target;
    // this.target.classList.add('active');
    // FIXME:
    // this.bump(() => {
    //   this.target.classList.remove('active');
    // },() => {
    //   this.target.classList.add('active');
    //   this.target.style.position = 'static';
    //   this.target.style.top = this.target._initOffsetTop;
    //   this.target.style.left = this.target._initOffsetLeft;
    // });
  },
  methods: {
    // 监听目标元素mousedown事件
    bump(beforeCb, afterCb){
      const self = this;
      this.target.addEventListener("mousedown",function(e){
        // 执行前回调
        beforeCb && beforeCb(e);

        // 运动时重新选中继续做碰撞
        if(self.target.timer){
          clearInterval(self.target.timer);
          this.target.timer = null;
        }
        
        // 初始化
        self.target.lastX = 0;
        self.target.lastY = 0;
        self.target.speedX = 0;
        self.target.speedY = 0;  
        self.target.offsetX = e.clientX - self.target.offsetLeft + scrollLeft;
        self.target.offsetY = e.clientY - self.target.offsetTop  + scrollTop;
        self.target._initOffsetLeft = self.target.offsetLeft;
        self.target._initOffsetTop = self.target.offsetTop;
        
        // 监听document相关事件
        document.addEventListener("mousemove", self.move, false);
        document.addEventListener("mouseup", ()=>{
          self.up(e, afterCb);
        }, false);
        
        // 阻止默认行为
        e.preventDefault();
        return false;

      }, false);
    },

    // 监听document元素mousemove事件
    move(e){
      const {
        offsetX,
        offsetY,
        lastX,
        lastY,
      } = this.target;
      // 拖拽
      this.target.style.left = (e.clientX - offsetX + scrollLeft) + "px";
      this.target.style.top = (e.clientY - offsetY + scrollTop) + "px";
      this.target.style.position = 'fixed';
      // 计算释放速度，并记录上次值
      this.target.speedX = e.clientX - lastX;// 正值向右，负值向左
      this.target.speedY = e.clientY - lastY;// 正值向下，负值向上
      this.target.lastX = e.clientX;
      this.target.lastY = e.clientY;
    },

    // 监听document元素mouseup事件
    up(e, afterCb){
      const self = this;
      // 重置
      if(this.target.timer) {
        clearInterval(this.target.timer);
        this.target.timer = null;
      }

      let {
        speedX,
        speedY,
        offsetLeft,
        offsetTop,
      } = this.target;
      let left, top;
      // 碰撞开始
      this.target.timer = setInterval(function(){
        //重力效果
        speedY += 3;

        left = offsetLeft + speedX;
        top = offsetTop + speedY;

        if(left < 0){
          // 阻力效果
          speedX *= -0.8;
          left = 0;
        }else if(left > window.innerWidth - self.target.offsetWidth){
          speedX *= -0.8;					   
          left = window.innerWidth - self.target.offsetWidth;
        }

        if(top < 0){
          speedY *= -0.8;
          speedX *= 0.8;
          top = 0;
        }else if(top > window.innerHeight - self.target.offsetHeight){
          // 阻力效果
          speedY *= -0.8;
          speedX *= 0.8;
          top = window.innerHeight - self.target.offsetHeight;
        }

        //最终速度变为0的解决方案之一
        if(Math.abs(speedY) < 1){
          speedY = 0;
        }

        if(Math.abs(speedX) < 1){
          speedX = 0;
        }

        if(speedX == 0 && speedY == 0 && top == window.innerHeight - self.target.offsetHeight){
          clearInterval(self.target.timer);
          self.target.timer = null;
          afterCb && afterCb(e);
        }

        self.target.style.left = left + "px";
        self.target.style.top = top + "px";

        console.log(speedX, speedY);          
      }, 30);

      // 取消document监听
      document.removeEventListener("mousemove", this.move);
      document.removeEventListener("mouseup", ()=>{
        this.up(e, afterCb)
      });
    },
  },
}
