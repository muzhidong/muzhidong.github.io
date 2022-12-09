---
title: 手把手带你实现LRU、双队列缓存
tags: 
- 代码设计
---

# 手把手带你实现LRU、双队列缓存

>工程师在工作中有时为了体验更好，可能会采取简单的缓存处理，但是你知道逼格更高的缓存设计吗？这篇文章带你学习LRU缓存和双队列缓存是如何设计的。

## LRU缓存

### 1、什么是LRU

  LRU是Least Recently Used的简写，中译为最近最少使用，即对最近最少使用的进行删除。最简单的算法实现是FIFO(先进先出)。

### 2、算法特性
- 当插入新数据时，插到尾部，并检查是否超过队列长度，若是则删除头部数据；
- 当访问旧数据时，会将其移动到队列尾部

### 3、设计实现
#### 类LRU定义
可自定义队列长度大小，对外提供set和访get方法，分别用来插入数据和访问数据。
```javascript
class LRUCache{
  // 队列最大长度
  maxCount = 0;
  // 队列数组
  lruQueue = [];

  constructor(maxCount) {
    this.maxCount = maxCount;
  }

  // 访问数据
  get(key){}

  // 插入数据
  set(value){}
}
```

#### 封装生成UUID函数
用于插入数据时生成唯一的key。通过代码可以直观看出其实现。
```javascript
const generateUUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
```

#### set方法实现
```javascript
set(value) {
  // 生成key
  const key = generateUUID();
  // 键值对方式插入队列
  this.lruQueue.push({
    key,
    value,
  })
  // 若超过队列长度，则删除头部数据
  if (this.lruQueue.length > this.maxCount) {
    this.lruQueue.shift();
  }
  // 返回key
  return key;
}
```

#### get方法实现
```javascript
get(key) {
    // 通过key找到队列索引
    const idx = this.lruQueue.findIndex(cache => cache.key === key);
    if (idx > -1) {
      // 从当前索引剔除，并重新插入到队列末
      const arr = this.lruQueue.splice(idx, 1);
      this.lruQueue.push(arr[0]);
      // 返回值
      return arr[0].value;
    } else {
      // 索引为-1，返回null
      return null;
    }
  }
```

### 4、适用场景
从算法特性看出，该算法适合短时间内的热点数据缓存，不适合批量操作。
```javascript
// 模拟数据
const arr = [
  "石室诗士施氏，嗜狮，誓食十狮。施氏时时适市视狮。十时，适十狮适市。是时，适施氏适市。氏视是十狮，恃矢势，使是十狮逝世。氏拾是十狮尸，适石室。石室湿，氏使侍拭石室。石室拭，氏始试食是十狮尸。食时，始识是十狮尸，实十石狮尸。试释是事",
  "季姬寂，集鸡，鸡即棘鸡。棘鸡饥叽，季姬及箕稷济鸡。鸡既济，跻姬笈，季姬忌，急咭鸡，鸡急，继圾几，季姬急，即籍箕击鸡，箕疾击几伎，伎即齑，鸡叽集几基，季姬急极屐击鸡，鸡既殛，季姬激，即记《季姬击鸡记》",
  "黑化黑灰化肥灰会挥发发灰黑讳为黑灰花会回飞，灰化灰黑化肥灰会挥发发黑灰为讳飞花回化为灰",
  "蒸羊羔、蒸熊掌、蒸鹿尾儿、烧花鸭、烧雏鸡儿、烧子鹅、卤煮咸鸭、酱鸡、腊肉、松花、小肚儿、晾肉、香肠、什锦苏盘、熏鸡、白肚儿、清蒸八宝猪、江米酿鸭子、罐儿野鸡、罐儿鹌鹑、卤什锦、卤子鹅、卤虾、烩虾、炝虾仁儿、山鸡、兔脯、菜蟒--",
  "银鱼、清蒸哈什蚂、烩鸭腰儿、烩鸭条儿、清拌鸭丝儿、黄心管儿、焖白鳝、焖黄鳝、豆豉鲇鱼、锅烧鲇鱼、烀皮甲鱼、锅烧鲤鱼、抓炒鲤鱼--",
  "软炸里脊、软炸鸡、什锦套肠、麻酥油卷儿、熘鲜蘑、熘鱼脯儿、熘鱼片儿、熘鱼肚儿、醋熘肉片儿、熘白蘑、烩三鲜、炒银鱼、烩鳗鱼、清蒸火腿、炒白虾、炝青蛤、炒面鱼、炝芦笋、芙蓉燕菜、炒肝尖儿、南炒肝关儿、油爆肚仁儿、汤爆肚领儿、炒金丝、烩银丝、糖熘饹炸儿--",
  "糖熘荸荠、蜜丝山药、拔丝鲜桃、熘南贝、炒南贝、烩鸭丝、烩散丹、清蒸鸡、黄焖鸡、大炒鸡、熘碎鸡、香酥鸡，炒鸡丁儿、熘鸡块儿、三鲜丁儿、八宝丁儿、清蒸玉兰片、炒虾仁儿、炒腰花儿、炒蹄筋儿--",
  "锅烧海参、锅烧白菜、炸海耳、浇田鸡、桂花翅子、清蒸翅子、炸飞禽、炸葱、炸排骨、烩鸡肠肚儿、烩南荠、盐水肘花儿，拌瓤子、炖吊子、锅烧猪蹄儿、烧鸳鸯、烧百合、烧苹果、酿果藕、酿江米、炒螃蟹",
  "打南边来了个瘸子，担了一挑子茄子，手里拿着个碟子，地下钉着木头橛子。没留神那橛子绊倒了瘸子，弄撒了瘸子的茄子，砸了瘸子的碟子，瘸子毛腰拾茄子。",
  "打北边来了个醉老爷子，腰里掖着个烟袋别子，过来要买瘸子的茄子，瘸子不卖给醉老爷子茄子，老爷子一生气抢了瘸子的茄子，瘸子毛腰捡茄子拾碟子，拔橛子，追老爷子，老爷子一生气，不给瘸子茄子，拿起烟袋别子，也不知是老爷子的烟袋别子打了瘸子的茄子，还是瘸子用橛子打了老爷子烟袋别子。",
  "蜜蜂酿蜂蜜",
  "胡庄有个胡苏夫",
  "石小四，史肖石，一同来到阅览室",
  "吕教练是男教练",
  "上街打醋又买布",
  "鹅要过河，河要渡鹅。不知是鹅过河，还是河渡鹅",
]
// 随机取数
function random(){
  return arr[Math.floor(Math.random() * arr.length)]
} 

// 创建长度为5的LRU队列
const lru = new LRUCache(5);

const k0 = lru.set(random())
const k1 = lru.set(random())
lru.set(random())
lru.set(random())
lru.set(random())
// 此时插入队列的次数有5次，通过k1是拿得到缓存的。
console.log('k1:',lru.get(k1));

lru.set(random());
lru.set(random());
// 此时插入队列的次数多了2次，通过k0拿不到缓存，k1是拿得到缓存的，因为前面刚访问k1一次，队列又把它放到最后。
console.log('k0:',lru.get(k0));
console.log('k1:',lru.get(k1));

lru.set(random())
lru.set(random())
lru.set(random())
lru.set(random())
lru.set(random())
// 此时插入队列的次数多了5次，通过k1是拿不到缓存，因为队列最大长度是5，当中没有访问过k1，从队列中剔除。
console.log('k1:',lru.get(k1));
```

## 双队列缓存

双队列缓存可以理解是LRU双队列，最大区别在于取数逻辑。

### 1、算法特性
- 当插入新数据时，插入一队列，若数据在队列中一直未被访问，则按FIFO规则淘汰；
- 当数据是在FIFO队列中被访问，则将数据转移到LRU队列；
- 当数据是在LRU队列中中被访问，则按LRU规则进行处理，若数据在LRU队列中一直未被访问，则按FIFO规则淘汰；

### 2、设计实现
#### 类DoubleQueueCache定义
```javascript
class DoubleQueueCache{
  // FIFO队列最大长度
  maxCount = 0;
  // FIFO队列数组
  queue = [];
  // LRUCache对象
  LRUCache = null;
  // 存储数据在FIFO队列、LRU队列间的映射，
  // key是FIFO队列的uuid,value是LRU队列的uuid
  hashMap = {};

  // 传入参数分别表示频率队列、LRU队列的最大长度
  constructor(maxCount, LRUMaxCount) {
    this.maxCount = maxCount;
    this.LRUCache = new LRUCache(LRUMaxCount);
  }

  // 访问数据
  get(key){}

  // 插入数据
  set(value){}
}
```

#### set方法实现
此处跟LRUCache的set方法实现一样。
```javascript
set(value) {
  // 生成key
  const key = generateUUID();
  // 插入FIFO队列
  this.queue.push({
    key,
    value,
  })
  // 若超过队列长度，则删除头部数据
  if (this.queue.length > this.maxCount) {
    this.queue.shift();
  }
  // 返回key
  return key;
}
```

#### get方法实现
```javascript
get(key) {
  // 从FIFO队列查找索引 
  const idx = this.queue.findIndex(cache => cache.key === key);
  if (idx === -1) {
    //索引不存在，再去LRU队列查找索引
    const value = this.LRUCache.get(this.hashMap[key]);
    // 若有返回值，否则返回null
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } else {
    // 从当前索引剔除
    const cache = this.queue.splice(idx, 1);
    // 取值
    const value = cache[0].value;
    // 插入LRU队列，并登记映射
    Object.assign(this.hashMap, {
      [key]: this.LRUCache.set(value),
    });
    // 返回值
    return value;
  }
}
```

### 3、适用场景
该算法适合有频率性、时间性的场合，对批量操作的缓存污染有良好的防范能力。
```javascript
// 为了跟上面的LRU形成对比，进行一样的操作，看看效果如何。
const double = new DoubleQueueCache(3,2);

const k2 = double.set(random())
double.set(random())
const k3 = double.set(random())
double.set(random())
double.set(random())
// 此时插入队列的次数有5次，通过k3是刚好可以拿到缓存的。由于队列长度为3，前两次被覆盖，保存了后三次的数据
console.log('k3:',double.get(k3));

double.set(random());
double.set(random());
// 此时插入队列的次数多了2次，通过k2取不到缓存，k3可以取到缓存。
console.log('k2:',double.get(k2));
console.log('k3:',double.get(k3));

double.set(random());
double.set(random());
double.set(random());
double.set(random());
double.set(random());
// 此时插入队列的次数多了5次，通过k3可以取到缓存，这里跟上述的LRU缓存结果表现就不一样了，因为k3被存到高频率访问的队列（第二队列），除非是有两条高频数据被访问，将其覆盖掉。
console.log('k3:',double.get(k3));
```

再举一个例子，
```javascript
const double2 = new DoubleQueueCache(5,5);

const k4 = double2.set(random())
const k5 = double2.set(random())
const k6 = double2.set(random())
const k7 = double2.set(random())
const k8 = double2.set(random())
const k9 = double2.set(random())
const k10 = double2.set(random())
const k11 = double2.set(random())
const k12 = double2.set(random())
// 此时k4-k7是取不到缓存的，k8-k12是取得到缓存的。
console.log('k4:',double2.get(k4));
console.log('k5:',double2.get(k5));
console.log('k6:',double2.get(k6));
console.log('k7:',double2.get(k7));
console.log('k8:',double2.get(k8));
console.log('k9:',double2.get(k9));
console.log('k10:',double2.get(k10));
console.log('k11:',double2.get(k11));
console.log('k12:',double2.get(k12));

const k13 = double2.set(random())
const k14 = double2.set(random())
const k15 = double2.set(random())
const k16 = double2.set(random())
const k17 = double2.set(random())
// 此时k8-k17都是取得到缓存的，跟LRU缓存不同之处就在这里。
console.log('k8:',double2.get(k8));
console.log('k9:',double2.get(k9));
console.log('k10:',double2.get(k10));
console.log('k11:',double2.get(k11));
console.log('k12:',double2.get(k12));
console.log('k13:',double2.get(k13));
console.log('k14:',double2.get(k14));
console.log('k15:',double2.get(k15));
console.log('k16:',double2.get(k16));
console.log('k17:',double2.get(k17));
```
