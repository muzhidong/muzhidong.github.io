---
title: ES6下篇
tags: 
- ECMAScript
---

# ES6下篇
## 元编程
### Proxy
- 构造函数传入目标对象和处理器对象，分别表示被代理对象，重写被代理对象各种操作的处理器对象

- 目标对象类型可以是函数，也可以是对象
  ```javascript
  const f = function fn() {
    console.log('this is a function')
  }
  const pf = new Proxy(f, {})
  console.log(typeof pf) // function，支持代理函数

  // 细节：
  // 1、操作target参数会同步到源对象
  // 2、设置代理对象的二级属性会触发getter，但不触发setter，说明代理是浅层代理
  const obj = {
    a: {
      b: 1
    },
    c: 2
  }
  const pobj = new Proxy(obj, {
    // target是源对象，key是操作的键，receiver是代理对象
    get(target, key, receiver) {
      console.log('trigger getter')
      return Reflect.get(target, key, receiver)
    },
    // 同getter，value是操作的值
    set(target, key, value, receiver) {
      target[key] = `${value}_suffix`
    }
  })

  pobj.a.b = 3
  console.log(`代理对象：`, pobj.a.b, `，原对象：`, obj.a.b) // 代理对象： 3 ，原对象： 3

  pobj.c = 3;
  console.log(`代理对象：`, pobj.c, `，原对象：`, obj.c) // 代理对象： 3_suffix ，原对象： 3_suffix
  ```

- 处理器对象可重写被代理对象的操作，操作有如下，
  - get：获取某一key时触发
  - set：修改某一key时触发
  - deleteProperty：删除属性时触发，如使用关键字delete
  - defineProperty：调用Object.defineProperty、Object.defineProperties方法时触发
  - has：判断某个key是否存在时触发，如使用关键字in
  - apply：作为函数被调用时触发
  - construct：作为构造函数被创建时触发
  - ownKeys：获取所有key时触发，如调用Object.getOwnPropertyNames、Object.getOwnPropertySymbols、Object.keys、Object.getOwnPropertyDescriptors方法，或使用for循环（包括for...in和for...of）
  - getOwnPropertyDescriptor：获取自身属性的属性描述时触发，如调用Object.getOwnPropertyDescriptor、Object.keys、Object.getOwnPropertyDescriptors方法
  - setPrototypeOf：调用Object.setPrototypeOf方法时触发
  - getPrototypeOf：调用Object.getPrototypeOf方法时触发
  - isExtensible：调用Object.isExtensible方法时触发
  - preventExtensions：调用Object.preventExtensions方法时触发
  ```js
  const p = new Proxy({}, {
    // target表示被代理的对象，key表示被访问的属性，receiver表示代理对象
    get(target, key, receiver) {
      console.log('trigger getter')
      // 执行被代理对象的默认行为
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value) {
      console.log('trigger setter')
      return Reflect.set(target, key, value)
    },
    has(target, key) {
      console.log('trigger has')
      return Reflect.has(target, key)
    },
    deleteProperty(target, key) {
      console.log('trigger deleteProperty')
      return Reflect.deleteProperty(target, key)
    },
    defineProperty(target, key, descriptor) {
      console.log('trigger defineProperty')
      return Reflect.defineProperty(target, key, descriptor)
    },
    apply(target, thisArg, argumentsList) {
      console.log('trigger apply')
      return Reflect.apply(target, thisArg, argumentsList)
    },
    construct(target, argumentsList) {
      console.log('trigger construct')
      return Reflect.construct(target, argumentsList)
    },
    ownKeys(target) {
      console.log('trigger ownKeys')
      return Reflect.ownKeys(target)
    },
    getOwnPropertyDescriptor(target, key) {
      console.log('trigger getOwnPropertyDescriptor')
      return Reflect.getOwnPropertyDescriptor(target, key)
    },
    setPrototypeOf(target, proto) {
      console.log('trigger setPrototypeOf')
      return Reflect.setPrototypeOf(target, proto)
    },
    getPrototypeOf(target) {
      console.log('trigger getPrototypeOf')
      return Reflect.getPrototypeOf(target)
    },
    isExtensible(target) {
      console.log('trigger isExtensible')
      return Reflect.isExtensible(target)
    },
    preventExtensions(target) {
      console.log('trigger preventExtensions')
      return Reflect.preventExtensions(target)
    },
  })
  ```

- 示例
```js
const target = {
  age: 18,
  name: 'Nike',
  hobby: {
    football: true,
    basketball: false
  }
}
const handler = {
  get(target, key) {
    return toString.call(target[key]) === "[object Object]" ? target[key]: `${key}:${target[key]}`
  },
  set(target, key, value) {
    target[key] = toString.call(value) === "[object Object]" ? value : `${value}(copy)`
  }
}
const pT = new Proxy(target, handler)
pT.age = 20
pT.name = 'Bob'
pT.hobby = { 
  volleyball: true 
}
console.log(target.age, pT.age) // 20(copy) age:20(copy)
console.log(target.name, pT.name) // Bob(copy) name:Bob(copy)
console.log(JSON.stringify(target.hobby), JSON.stringify(pT.hobby), target.hobby === pT.hobby) // {"volleyball":true} {"volleyball":true} true
```

- 应用
```js
// 自动为对象的首次定义属性初始化
(() => {
  const target = {}
  const handlers = {
    get: (target,key) => {
      target[key] = key in target? target[key]: {}
      if(typeof target[key] === "object") {
        return new Proxy(target[key], handlers)
      }
      return target[key]
    }
  }
  const p = new Proxy(target, handlers)
  console.log('z' in p.x.y) // false
  p.x.y.z = 'hello,proxy'
  console.log('z' in p.x.y) // true
  console.log(target.x.y.z) // hello,proxy
})()

// 函数调用方式创建对象，不能用new关键字
(()=>{
  class Test {
    constructor(a,b) {
      console.log('constructor', a, b)
    }
  }
  const proxyClass = new Proxy(Test, {
    apply(target, thisArg, argumentsList) {
      return new (target.bind(thisArg, ...argumentsList))()
    },
    construct(target, argumentsList, newTarget){
      throw new Error(`Function ${target.name} cannot be invoked with 'new'`)
    }
  })
  proxyClass(1, 2)
  new proxyClass(1,2)
})()

// 包装fetch
(() => {
  const handlers = {
    get(target, key) {
      if(!target.init) {
        ["get","post"].forEach(method => {
          target[method] = (url, params = {}) => {
            return fetch(url, {
              headers: {
                'content-type': 'application/json'
              },
              method,
              mode: 'cors',
              credentials: 'same-origin',
              ...params
            }).then(response => response.json())
          }
        })
      }
      return target[key]
    }
  }
  const api = new Proxy({}, handlers)
  api.get('https://www.baidu.com')
  api.post('https://www.baidu.com')
})()

// 断言
(()=>{
  const assertProxy = new Proxy({}, {
    set(target, message, value) {
      if(!value) {
        console.error(message)
      }
    }
  })
  assertProxy['Isn\'t true'] = false
  assertProxy['Less than 18'] = 18 >= 19
})()

// 统计函数调用次数
(()=>{
  let callNum = 0
  function func() {
    console.log(callNum)
  }
  const funcProxy = new Proxy(func, {
    apply(target, thisArg, argumentList) {
      callNum++
      return target.apply(thisArg, argumentList)
    }
  })
  funcProxy() // 1
  funcProxy() // 2
  funcProxy() // 3
})()

// 使对象只读
(function () {
  function throwErr() {
    throw new Error("can't modify read-only view");
  }
  const handler = {
    set: throwErr,
    defineProperty: throwErr,
    deleteProperty: throwErr,
    setPrototypeOf: throwErr,
    preventExtensions: throwErr,
    get: (target, key, receiver) => {
      const result = Reflect.get(target, key, receiver);
      if (typeof result === 'object') {
        // 递归变为只读对象
        return readOnlyView(result);
      }
      return result;
    }
  };
  const readOnlyView = (target) => {
    return new Proxy(target, handler);
  }
  let testObj = {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: 4
    },
    fruit: 'apple',
  };
  testObj = readOnlyView(testObj);
  Object.defineProperty(testObj, 'fruit', {
    configurable: true,
    enumerable: true,
    get: function () {
      return `fruit_` + fruit;
    },
    set: function (value) {
      fruit = value;
    }
  });
  delete testObj.b;
  testObj.b = 20;
  console.log(testObj.fruit);
})();

// 传负索引，则数组从后往前数
(function () {
  const negativeArray = target =>
    new Proxy(target, {
      get: (target, prop, receiver) => {
        return Reflect.get(target, +prop < 0 ? String(target.length + +prop) : prop, receiver);
      }
    })
  const testArr = [1, 3, 3, , 4, 6, , 9];
  const p = negativeArray(testArr);
  console.log(p[-1], p[-2]);
})();

// 私有属性不可遍历
(function () {
  const hidePrivateAttr = (target, prefix = '_') =>
    new Proxy(target, {
      ownKeys: (target) => {
        return Reflect.ownKeys(target).filter((value) => {
          return !(typeof value === 'string' && value.startsWith(prefix));
        });
      },
    })
  const testObj = {
    _age: 40,
    name: 'benben',
    sex: 'man',
  }
  const p = hidePrivateAttr(testObj);
  for (let key in p) {
    console.log(key, p[key]); 
  }
})();

// 属性是否过期
(function () {
  const filterExpiredAttr = (target, ttl = 6) => {
    const createdTime = Date.now();
    const isExpired = () => Date.now() - createdTime > ttl * 1000;
    return new Proxy(target, {
      get: (target, key, receiver) => {
        return isExpired() ? undefined : Reflect.get(target, key, receiver);
      }
    })
  }
  const p = filterExpiredAttr({
    account: 1000
  });
  console.log('Account:', p.account);
  setTimeout(() => {
    console.log('after 6s,Account:', p.account);
  }, 6000);
})();

// cookie操作对象化
(function () {
  const cookieProxy = (document) => {
    const cookie = document.cookie.split(';').reduce((target, item) => {
      return {
        [item.substr(0, item.indexOf('=')).trim()]: item.substr(item.indexOf('=') + 1),
        ...target
      }
    }, {});
    const setCookie = (name, value) => {
      document.cookie = `${name}=${value}`;
    };
    const deleteCookie = (name) => {
      document.cookie = `${name}=; max-age=0`
    };
    return new Proxy(cookie, {
      set: (target, key, value, receiver) => {
        setCookie(key, value);
        Reflect.set(target, key, value, receiver);
      },
      deleteProperty: (target, key) => {
        deleteCookie(key);
        Reflect.deleteProperty(target, key);
      }
    })
  }
  const cproxy = cookieProxy(document);
  console.log(cproxy);
  delete cproxy._octo;
  cproxy._ga = 100;
  cproxy.count = 2;
  console.log(cproxy);
  console.log(document.cookie);
})();
```

### Reflect
<!-- TODO: -->

## 二进制数组
为解决浏览器与硬件(如显卡)间数据通信时格式转换耗时问题，专门提供一种直接操作二进制数据的接口，如ArrayBuffer，但由于其偏底层，操作复杂，又提供了操作ArrayBuffer的DataView和TypedArray

![数据类型转换](/js/ArrayBuffer与DataView的转换.jpg)

### ArrayBuffer
表示内存中的一个字节块

- 构造函数
  
  ArrayBuffer(byteLength)：指定要分配的字节大小，注意如果分配很大可能不成功，使用byteLength属性检查
  
- 实例属性
  
  byteLength：获取其分配的字节长度

- 实例方法

  slice(startIdx[, endIdx = this.byteLength])：复制区间[startIdx, endIdx)部分的内容，生成新的ArrayBuffer对象

  > 不提供任何直接读写方法，所以读写操作对其是无效的

- 静态方法

  isView(target)：检查target是否为ArrayBuffer的视图实例，即是否为TypedArray或DataView

> 关于ArrayBuffer的完整API见[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
 
> ⚠️ ArrayBuffer和SharedArrayBuffer是JavaScript中两种独立的二进制数据类型，它们不是父子关系，在内存共享机制和线程安全特性上也有所不同。ArrayBuffer‌分配的是私有内存，且不支持跨线程共享，而‌[SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)分配的是共享内存，且允许多线程访问，但需通过[Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics) API保证线程安全

- 示例：ArrayBuffer与字符串互转
  ```js
  const ab2str = (ab) => {
    const arr = new Uint16Array(ab)
    return String.fromCharCode.apply(null, arr)
  }
  const str2ab = (str) => {
    const len = str.length
    const ab = new ArrayBuffer(len * 2)
    const arr = new Uint16Array(ab)
    for(let i = 0; i < len; i++) {
      arr[i] = str.charCodeAt(i)
    }
    return ab
  }
  ```

### DataView
用于读写复杂类型的二进制数据，且解决字节序(数值在内存中的表示方式)问题

- 构造函数

  DataView(arrayBuffer[, byteOffset = 0][, length])：指定ArrayBuffer对象，可选的字节开始偏移量和数组长度，创建数据视图

- 实例属性

  buffer：返回对应的ArrayBuffer对象，写操作无效

  byteOffset：字节偏移量，一般为0，写操作无效

  byteLength：字节长度，同ArrayBuffer.byteLength，写操作无效

- 实例方法

  getInt8(byteOffset)：获取指定字节偏移量上的数值。方法getUint8同getInt8

  setInt8(byteOffset, number)：在指定字节偏移量上设置数值。方法setUint8同setInt8

  以下方法支持显式指定字节顺序读写值：

  getInt16(byteOffset, littleEndian = false)：获取指定字节顺序的指定字节偏移量上的数值，默认按高位优先顺序(大端序)。其他方法getUint16/getInt32/getUint32/getFloat32/getFloat64同getInt16

  setInt16(byteOffset, number, littleEndian = false)：在指定字节偏移量上以指定的字节顺序设置数值，默认按高位优先顺序(大端序)。其他方法setUint16/setInt32/setUint32/setFloat32/setFloat64同setInt8

  > 为了兼容不同硬件的端序，一般建议使用setUint8或setInt8操作

- 示例
  ```javascript
  var buffer = new ArrayBuffer(8);
  var data = new DataView(buffer);
  data.setUint8(0, 1);

  data.setUint16(1, 23);
  data.setUint32(3, 456);
  // 结果用Int8Array表示则为[1, 0, 23, 0, 0, 1, -56, 0]

  // data.setUint16(1, 23, true);
  // data.setUint32(3, 456, true);
  // 结果用Int8Array表示则为[1, 23, 0, -56, -1, 0, 0, 0]
  ```

### TypedArray
用于读写简单类型的二进制数据，存在字节序问题。包括Int8Array、Uint8Array、Uint8ClampedArray、Int16Array、Uint16Array、Int32Array、Uint32Array、Float32Array、Float64Array等9种类型的数组

- 溢出

  除Uint8ClampedArray外，一般溢出处理是取余(具体计算方式？)，Uint8ClampedArray的溢出处理则是取最值，即正向溢出取最大值255，负向溢出取最小值0，针对颜色处理而设计的

- 与普通数组的区别

  1、元素只能是数字类型，且是连续存储的

  2、元素初始化时的默认值为0，非undefined

  3、创建时，如果传入一个数组参数，类型化数组会将其解构，作为一个个元素，而普通数组则是直接将其作为第一个元素值；如果传入多个参数，类型化数组直接初始化长度为1，且首元素值设置为0，而普通数组是将其作为一个个元素

  4、在执行时间和内存使用上，类型化数组更高效
  ```js
  // 获取不超过指定数的最大质数
  // 采用埃拉托色尼筛选算法，若使用普通数组执行该算法，则在执行时间和内存使用上较差
  function sieve(n) {
    const a = new Int8Array(n + 1)
    const max = Math.floor(Math.sqrt(n))
    let p = 2
    while (p <= max) {
      for(const i = p * 2; i <= n; i += p) {
        a[i] = 1
      }
      while(a[++p])
    }
    while(a[n--])
    return n;
  }
  ```

  5、类型化数组本身不存储数据，都存储在底层ArrayBuffer对象中

- 构造函数

  以Int8Array为例，

  Int8Array(array)：指定一个数组，可以是普通数组或类型化数组。分配新的内存，创建新的类型化数组对象

  Int8Array(length)：指定数组长度
  
  Int8Array(arrayBuffer[, byteOffset = 0][, length])：指定数组缓冲区对象、可选的字节开始偏移量和数组长度。注意byteOffset的可取值会依赖所用的类型化数组，比如Int16只能是2的倍数，Int32只能是4的倍数，Float64Array只能是8的倍数
  
  > 为了兼容不同硬件的端序，一般建议使用Int8Array或Uint8Array
  > 
  > 字节顺序取决于硬件，如低位优先的系统，字节按从低到高的顺序排列，高位优先的系统则相反。一般大多数计算机都是小端序。可通过如下验证字节顺序是否使用低位优先(小端序)
    ```js
    const isLittleEndian = () => new Int8Array(new Int32Array([1]).buffer)[0] === 1
    ```
  
  > 类型化数组与普通数组间的转化
  > ```js
  > // 类型化数组转普通数组
  > // 方式一：使用Array.prototype.slice
  > const toNormalArray = (typedArray) => Array.prototype.slice(typedArray)
  > // 方式二：对类型化数组直接使用解构，更简单
  > 
  > // 普通数组转类型化数组，也支持类型化数组之间的转化
  > // 方式一：构造函数
  > new TypedArray(array)
  > // 方式二：使用of或from静态方法
  > TypedArray.of(array)
  > TypedArray.from(array[, cb])
  > ```

- 实例属性

  buffer：返回对应的ArrayBuffer对象，写操作无效

  byteOffset：开始的字节偏移量，计算公式为`单位字节 / 8 * startIdx`，写操作无效，只有当操作了subarray或set才会改变

  byteLength：字节长度，计算公式为`单位字节 / 8 * length`，写操作无效

  length：元素个数，写操作无效

- 实例方法

  set(array[, startIdx = 0])：从指定的可选开始索引，复制指定数组

  subarray(startIdx[, endIdx = this.length])：截取指定范围区间[startIdx, endIdx)的数组。注意该操作不是复制，后续做的更改操作会影响原数组

  除pop、push、unshift、shift、splice、concat等方法外，拥有同普通数组的其他方法，以及读写索引属性
  ```js
  // 实现连接两个相同类型的TypedArray
  const concat = (typedArrayClass, ...typedArrays) => {
    return new typedArrayClass([typedArrays.map(arr => (...arr))])
    const len = typedArrays.reduce((total, arr) => total + arr.length, 0)
    const result = new typedArrayClass(len)
    let offset = 0
    for(let arr of typedArrays) {
      result.set(arr, offset)
      offset += arr.length
    }
    return result
  }
  ```

- 静态属性

  BYTES_PER_ELEMENT：获取元素的字节大小

## Set与Map
集合的来由或目的：为避免用户数据与内置方法冲突而设计，也就是说，不能将数据直接作为属性暴露出来，用`obj.key`或`obj[key]`不能访问数据，取而代之的是使用`get(key)`方法访问

### Set
- 特点
  - 唯一性：重复元素添加无任何效果
  - 可变性：支持增删元素
  - 可预测性：元素会按插入的先后顺序被遍历，但不提供索引，不能直接访问某一个元素

- 不足

  1、JS中Set与其他语言不同，是没有哈希代码的哈希表
  ```js
  const s = new Set();
  s.add(new URL('https://www.baidu.com'));
  s.add(new URL('https://www.baidu.com'));
  console.log(s.size); // 结果是2，不是1，但我们希望是相同的，可我们不能像Java、Python等重载相等运算符
  ```

  2、意料之外的可预测性：保存插入顺序并不能降低哈希表的效率

- API
  ```js
  // new Set([iterable])
  // 创建一个空集合，或从迭代对象提取元素，构造新集合
  let s = new Set([1, 2, 3, 4]);
  let s1 = new Set(s);
  let s2 = new Set();
  let s3 = new Set('HelloWorld');

  // size属性返回集合中元素的数量
  console.log(s.size);

  // add方法添加元素，并返回变更后的集合，支持链式调用
  console.log(s1.add(5));
  s1.add(0).add(4);

  // has方法检查是否包含指定元素，返回一个表示存在结果布尔值。速度快于数组indexOf方法
  console.log(s2.has(0));

  // delete方法删除元素，并返回一个表示删除结果的布尔值
  console.log(s3.delete('H'));

  // 遍历和清空
  for (let s of s1) {
    console.log(s);
  }
  // 等效于下面代码，
  // for (let s of s1[Symbol.iterator]()) {
  //   console.log(s, );
  // }
  s1.clear();
  console.log('清空后，', s1.size);

  // 结果是相同的，返回一个迭代器对象，形如
  // [Set Iterator] { 'e', 'l', 'o', 'W', 'r', 'd' }
  console.log(s3.keys(), s3.values(), s3.entries());
  ```

### Map
- 作用：存储键值对

- API
  ```js
  // 创建一个空的集合或从已有的Map对象、由二元数组组成的数组、逐个生成二元数组的生成器，并返回
  let m = new Map();
  let m1 = new Map(m);
  let m2 = new Map([
    ['age', 10],
    ['sex', 'woman']
  ]);
  let m3 = new Map((function* () {
    yield ['a', 1];
    yield ['b', 2];
    yield ['c', 3];
  })());

  // 获取键值对个数
  console.log(m.size);

  // 获取某个键的值，否则返回undefined
  console.log(m3.get('a'));

  // 检查是否有指定键，返回一个表示存在结果的布尔值
  console.log(m2.has('job'));

  // 新添或修改键值对，并返回变更后的Map对象
  console.log(m1.set('type', 1));

  // 删除键值对，返回一个表示删除结果的布尔值
  console.log(m2.delete('age'));

  // 清空
  m2.clear();
  console.log(m2);

  // 遍历
  for (let [key, value] of m3) {
    console.log(key, value);
  }
  for (let [key, value] of m3[Symbol.iterator]()) {
    console.log(key, value);
  }
  m3.forEach((value, key) => {
    console.log(key, value);
  });

  // 获取键的迭代器
  for (let k of m3.keys()) {
    console.log(k);
  }
  // 获取值的迭代器
  for (let v of m3.values()) {
    console.log(v);
  }
  // 获取键值对的实代器
  for (let [k, v] of m3.entries()) {
    console.log(k, v);
  }
  ```

### WeakSet与WeakMap
- 前世：隐藏垃圾回收的不确定性
  
  为什么不直接在JS中引入弱引用呢? 因为标准委员会很不愿意向脚本暴露未定义行为，孱弱地跨浏览器兼容性是互联网发展的痛苦之源。弱引用暴露了底层垃圾回收的实现细节，这正是与平台相关的一个未定义行为。应用不应该依赖平台相关的细节，但弱引用使我们难于精确了解自己对测试使用的浏览器的依赖程度。
  
  为什么要接受这些限制呢？ES6的弱集合只包含了一套有限的特性，但它们相当牢靠。一个键或值被回收从不会被观测到，所以应用将不会依赖于其行为，即使只是缘于意外。

- 作用：解决内存泄漏问题

- WeakSet限制

  1、只支持new、has、add、delete

  2、不可遍历，即不支持for...of语句、keys、values、entries方法

  3、元素必须是对象
  
- WeakMap特性

  1、只支持new、has、get、set、delete

  2、不可遍历，即不支持for...of语句、keys、values、entries方法

  3、键和值必须是对象

  4、key对象被释放时，自动垃圾回收

- 示例
  ```js
  const wm = new WeakMap();
  let key1 = { a: 1 };
  let key2 = new Number(2);
  
  wm.set(key1, { value: 1 });
  wm.set(key2, { value: 2 });
  console.log(wm.has(key1), wm.has(key2)); // true true
  
  key1 = null;
  key2 = null;
  console.log(wm.has(key1), wm.has(key2)); // false false
  ```

## 异步
### thunk函数
<!-- TODO: -->

### generator函数
见[ES6系列之Generator函数与Async函数](./ES6系列之Generator函数与Async函数#generator函数)

### co模块
<!-- TODO: -->
```js 
function co(generator, ...params) {
  function exec() {
    var result = gen.next(arguments);
    if(!result.done) {
      const type = result.value instanceof Promise;
      if (type) {
        result.value.then(function(data) {
          console.log(data);
          exec(data);
        })  
      } else {
        console.log(result.value);
        exec(result.value);
      }
    } else if (result.value) {
      console.log(result.value);
    }
  }
  var gen = generator(...params);
  exec();
}

co(function*() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
  return 4;
})

const getJson = function* (url) {
  try {
    const request = yield fetch(url, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json'
      }
    });
    const json = yield request[0].json();
    return JSON.parse(json);
  }
  catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
};
co(getJson, 'http://example.com/some_file.json')
```

### Promise
见[ES6系列之Promise基础](./ES6系列之Promise基础)

### async函数
见[ES6系列之Generator函数与Async函数](./ES6系列之Generator函数与Async函数#async函数)

## 类
### 面向对象编程方式
- 传统面向对象编程
  ```js
  // 直观性差
  function Circle(radius) {
    // 作为普通函数时才具有的属性
    Circle.circlesMade++;

    // 作为构造函数时才具有的属性
    this._radius = radius;
  }

  Circle.draw = function () {
    console.log("draw a circle.");
  }
  Object.defineProperty(Circle, 'circlesMade', {
    get() {
      console.log('circlesMade getter called...');
      return this._count || 0;
    },
    set(value) {
      console.log('circlesMade setter called...');
      this._count = value;
    }
  });

  Circle.prototype = {
    area() {
      return Math.pow(this.radius, 2) * Math.PI;
    },
    // 注意该写法默认访问器方法是可配置和可枚举的
    // get radius() {
    //   return this._radius;
    // },
    // set radius(value) {
    //   if (isNaN(value)) {
    //     throw new Error('请输入合法的半径参数');
    //   }
    //   this._radius = value;
    // }
  }
  Object.defineProperty(Circle.prototype, 'radius', {
    get() {
      return this._radius;
    },
    set(radius) {
      if (isNaN(radius)) {
        throw new Error('请输入合法的半径参数');
      }
      this._radius = radius;
    }
  })

  // 直接定义在函数上的属性是私有的，定义在函数原型上的属性是公有的，在defineProperty上使用的中间属性不列为属性
  console.log(Circle) // 可以调用或取到circlesMade、draw、_count
  console.log(Circle.prototype); // 可以调用或取到area、radius
  const circle = new Circle(10);
  console.log(circle) // 可以调用或取到_radius、area、radius
  ```

- 字面量对象定义
  ```js
  const methodBinding = {
    // 给对象添加标准函数属性
    method(args) {},
    // 给对象添加生成器函数属性
    *generatorMethod(args) {},
    // 给对象添加访问器属性
    get propName() {},
    set propName(arg) {},
    // 给对象添加使用[]语法的函数属性，也叫计算属性。computedStyle可以是Symbol、函数调用、字符串连接、求值表达式
    [computedStyle]() {},
  }
  ```

- 类定义
  
  给命名构造函数添加方法的同时给函数原型也添加相应方法，从而用这个类构造的实例也包含相应的方法

  ```js
  // 可以使用匿名表达式，如class {}
  // 分号可选
  class Circle {

    // 构造函数
    // 构造函数可选，默认会声明一个空的构造函数
    // 生成器不能作为构造函数
    // 预计算属性名不能定义构造函数，即['constructor']并不是构造函数
    constructor(radius) {
      this._radius = radius;
      Circle.circlesMade++;
    };

    // 静态方法
    static draw() {
      console.log("draw a circle.");
    };

    // 静态访问器属性
    static get circlesMade() {
      return this._count || 0;
    };

    static set circlesMade(value) {
      this._count = value;
    };

    // 类中的方法（包括访问器）是可配置的，但是是不可枚举的
    // 实例方法
    area() {
      return Math.pow(this.radius, 2) * Math.PI;
    };

    // 访问器属性
    get radius() {
      return this._radius;
    };

    set radius(value) {
      if (isNaN(value)) {
        throw new Error('请输入合法的半径参数');
      }
      this._radius = value;
    };
  }
  ```

  ```js
  class Person {
    constructor() {
      this.name = 'Bob'
    }
  }
  // 可以赋值
  Person = class AnotherPerson {
    constructor() {
      this.name = 'John'
    }
  }
  const p = new Person()
  console.log(p.name)
  ```

### 继承
- 字面量对象单继承（Object.create）
  ```js
  const obj = {
    value: 1,
    add(a, b, c) {
      return a + b + c;
    }
  }
  const obj2 = Object.create(obj);
  console.log(obj2.value); // 1
  console.log(obj2.add(1, 2, 3)); // 6
  obj2.value = 100;
  console.log('obj2.value:', obj2.value, " obj.value:", obj.value); // obj2.value: 100  obj.value: 1
  ```

- 函数对象单继承（原型）
  ```js
  funA.prototype = new funB();
  // funA.prototype = funB.prototype;
  ```

- 函数对象多继承（对象冒充）
  ```js
  this.funA = funA;
  this.funA();
  delete this.funA;
  ```

- 类单继承（本质是原型继承）
  ```js
  // constructor函数的工作：控制所有静态方法，并创建新函数，且创建另一对象，使其指向新函数的原型
  // 为了使新创建的类继承所有静态属性，需让该新函数对象继承超类的函数对象
  // 为了使新创建的类继承所有实例方法，需让该新函数的prototype对象继承超类的prototype对象
  class A {}
  class B {}
  // 连接实例属性
  Object.setPrototypeOf(B.prototype, A.prototype);
  // 连接静态属性
  Object.setPrototypeOf(B, A);

  // 以上方式，在类声明结束后还需进行额外的连接操作，而我们希望能用一段完整代码封装目标对象的所有逻辑。于是有
  class B extends A {}
  // *支持继承null，即不继承Object.prototype
  // class ABC extends null {}
  ```

- 类多继承：通过混入函数创建多个基类组合而成的一个超类，再进行extends
  ```js
  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        const desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }
  function mix(...mixins) {
    class Mix {}
    for (let mixin of mixins) {
      copyProperties(Mix, mixin);
      copyProperties(Mix.prototype, mixin.prototype);
    }
    return Mix;
  }
  // 实现一个协作编辑工具，记录所有的编辑动作，并将内容序列化
  class DistributedEdit extends mix(Loggable, Serializable) {
    // 定义各种编辑动作
  }
  ```

### super关键字
- 用于使用父类构造函数、属性、方法

- 注意
  
  super关键字只能用于使用extends的子类
  
  执行基类的构造函数（继承父类this）前，this没有被分配，无法得到一个确定的this值。因此，在子类的构造函数中，调用super构造函数之前访问this会触发一个引用错误

- 应用
  ```js
  class HistoryArray extends Array {
    constructor() {
      super();
      this.history = [
        []
      ];
    }
    commit() {
      this.history.push(this.slice());
    }
    revert() {
      this.splice(0, this.length, this.history[Math.max(0, this.history.length - 2)]);
    }
  }
  const arr = new HistoryArray();
  arr.push([1, 2, 3]);
  arr.commit();

  arr.push(4);
  arr.commit();

  arr.revert();
  console.log(arr.join(' '));
  ```

### new.target
```js
// 确定函数是否是通过new调用，若不是则返回undefined，否则返回函数引用
class foo {
  constructor() {
    console.log(new.target === foo)
  }
}
class bar extends foo {
  constructor() {
    super();
  }
}
new foo();
new bar();
```

## 修饰器
- 本质是一个编译时执行的函数
- 用于添加类或实例的属性和方法，修改实例的方法；起到一定的注释作用；类型检查、代码静态分析
- 语法
  ```js
  @decorator
  class A {

   }
  // 等效于
  // class A {
  //
  // }
  // A = decorator(A) || A;
  ```
- 修饰器接收3个参数：目标函数、属性名和属性描述对象，后两个参数可选
- 在JS中，修饰器只适于类组件，不适于函数组件，因为存在函数提升问题。而在TS中则不存在此问题

## 模块化
见[ES6系列之模块化](./ES6系列之模块化#es6模块化)
