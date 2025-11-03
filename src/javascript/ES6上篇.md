---
title: ES6上篇
tags: 
- ECMAScript
---

# ES6上篇
## 认识ECMA与TC39
- ECMA

  全称为European Computer Manufacturers Association，译为欧洲计算机制造商协会。一个国际组织，主要负责维护各种计算机的相关标准

- ECMA-262
  
  ECMA组织维护的第262条标准。这一标准是在不断演进的，最为熟知的是2015年发布的ES6

- TC39
  
  ECMA为ES专门组织的技术委员会（Technical Committee），数字39是因为ECMA使用数字来标记旗下的技术委员会

- 一个提案从提出到最后被纳入ES新特性，TC39规范中分为以下五个阶段

  stage0（稻草人strawman）：TC39的任何成员都可以提交

  stage1（提案proposal）：进入此阶段意味着这一提案被认为是正式的，需要对此提案的场景与API进行详尽的描述

  stage2（草案draft）：演进到这一阶段的提案如果最终进入标准，那么在之后阶段都不会有太大变化，因为理论上只接受增量修改

  state3（候选candidate）：这一阶段的提案只有在遇到重大问题才会修改，规范文档需要被全面完成

  state4（完成finished）：这一阶段的提案将会被纳入到ES每年发布的规范之中

## 关键字let与const
- let声明的变量特性
  
  具有块级作用域，形如`for(let x = 1; x < 10; x++)`的循环在每次遍历时都为变量`x`创建新的绑定
  
  变量名不允许在同一作用域下重复声明，否则会出错(var、let、const三者中只要重复定义都会报错)
  
  变量不会提升，专业讲不会被预解析，直到控制流到达该变量被定义的代码行时才被装载，在这之前使用该变量直接报错 
  
  let声明的全局变量不会成为全局对象的属性

- const声明的变量特性
  
  基本同与let声明的变量特性。唯一区别在于只能赋值一次，且必须在声明时赋值。对于引用类型如对象、数组，可以改变属性值或元素，但不能重新赋值

- var声明的变量特性

  没有块作用域，要么在全局作用域，或在函数作用域
  
  变量名可以重复声明
  
  变量会提升

  var声明的全局变量会成为全局对象的属性  

```javascript
// 验证是否有块作用域
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// 验证变量是否可重复声明
let a = 1;
// let a = 2;
console.log(a);

var b = 1;
var b = 2;
console.log(b);

// 验证变量是否会提升
let c;
console.log(c, d);
c = 3;
// let c = 3;
var d = 4;

// 验证const只能赋值一次，且必须在声明时 
const e = 5;
// e = 6;
console.log(e);

// const f;
// f = 5;
// console.log(f);
```

## 数据类型Symbol
- 作用：由JS内部创建，可用于作属性键，避免命名冲突
  ```js
  // Symbol是一种数据类型
  const symbol = Symbol()
  console.log(typeof symbol); // symbol
  console.log(toString.call(symbol) === '[object Symbol]'); // true
  ```

- 特点
  - 唯一性：任何一个Symbol值与其他任何Symbol值均不相等，即使入参相同
    ```javascript
    // 验证唯一性
    const s1 = Symbol();
    const s2 = Symbol();
    console.log(s1 === s1); // true，不同于NaN
    console.log(s1 == s2); // false
    ```
  - 只能使用[]访问，不能用.访问
    ```js
    // []访问
    const obj = {};
    const k = Symbol();
    obj[k] = 'Hello,Symbol';
    console.log(obj[k]);
    ```
  - 不可变更性：不能为其设置属性，否则在严格模式下报错，或在非严格模式下设置的属性值恒为undefined
    ```javascript
    // 验证不可变更性 
    const symbol = Symbol("This is a description about symbol.");
    symbol.a = 'custom attr';
    console.log(symbol.a); // undefined
    ```

- 操作：创建、查询、删除
  ```js
  // 创建
  console.log('第一种方式：Symbol()，如，', Symbol());
  console.log('第二种方式：Symbol.for()，如，', Symbol.for('symbol'));
  console.log('第三种方式：标准定义的Symbol，如Symbol.iterator，结果为，', Symbol.iterator)


  // 查询
  const obj = {};
  const symbol = Symbol();
  obj.mySymbol = symbol;
  obj[symbol] = 'Hello,Symbol';

  // 以下三种操作会忽略Symbol键
  for (let key in obj) {
    console.log(key, obj[key]);
  }
  console.log(Object.keys(obj));
  console.log(Object.getOwnPropertyNames(obj));
  // 仅输出Symbol键
  console.log(Object.getOwnPropertySymbols(obj));
  // 输出所有键，包括Symbol和字符串键
  console.log(Reflect.ownKeys(obj));

  // 删除
  if (symbol in obj) {
    delete obj[symbol];
  }
  console.log(`删除Symbol属性后的obj为`, obj);

  // symbol转字符串
  console.log(Symbol('I am a symbol.').toString()); // Symbol(I am a symbol.)
  console.log(String(Symbol('I am another symbol.'))); // Symbol(I am another symbol.)
  ```

## 变量的解构赋值
### 对象的解构赋值
- 基础使用：使用大括号，冒号后表示别名。当解构一个未定义的属性时，得到的值为undefined
  ```javascript
  const {
    name: nameA,
    age,
  } = {
    name: 'benben'
  };
  const {
    name: nameB
  } = {
    name: 'xixi'
  };
  console.log(nameA, age, nameB);

  const {
    array: [
      first, 
      {
        value: second
      }, 
      third = 'I know.'
    ]
  } = {
    array: [
      'Hello',
      {
        value: 'World'
      },
    ]
  }
  console.log(first, second, third);
  ```

- 用途
  ```js
  // 克隆或合并对象
  const obj1 = {
    a: 1,
    b: 2,
  };
  const obj2 = {
    a: 3,
    c: 4,
    s: 5
  };

  const mergeObj = {
    ...obj1,
    ...obj2
  };
  console.log(mergeObj);

  const cloneObj = {
    ...obj1
  };
  console.log(cloneObj, cloneObj == obj1);
  ```

- 注意
  ```js
  // 对象解构不包括原型链上的属性
  const { 
    ...obj 
  } = Object.create({
    x: 1
  })
  console.log(obj.x) // undefined

  // 对象解构时，会访问每个属性
  const objWithGetter = {
    x: 1,
    // 不抛异常
    get x() {
      throw new Error()
    }
  }
  const objWithGetter2 = {
    x: 1,
    // 抛异常
    ...({
      get x() {
        throw new Error()
      }
    })
  }

  // 解析引擎会将任何以{开始的语句解析为一个块语句。解决方式是将整个表达式用一对小括号包裹
  let a;
  ({
    a
  } = {
    a: 'haha'
  });
  console.log(a);
  ```

### 数组的解构赋值
- 基础使用：使用中括号，按序解构，每个变量对应一个元素，访问空数组或超过数组长度则返回undefined
  ```js
  const arr = [1, '一', '二'];
  const [a, b, c, d] = arr;
  console.log(a, b, c, d);

  const [d, e, f] = [1, [2], 3];
  console.log(d, e, f);

  const [, , g] = [4, 5, 6];
  console.log(g);

  const [h, [i], j] = [7, [8], 9];
  console.log(h, i, j);

  const [k, ...l] = [10, 11, 12, 13, 14, 15];
  console.log(k, l);

  let [m] = [];
  console.log(m);
  ```

- 用途
  ```js
  // 克隆或合并数组
  const arr1 = ['apple', 'banana'];
  const arr2 = ['orange', 'watermelon'];

  const mergeArr = [...arr1, ...arr2];
  console.log(mergeArr);

  const cloneArr = [...arr1];
  console.log(cloneArr, cloneArr == arr1);

  // 实现两个值交换
  const a = "pig";
  const b = "dog";
  [b, a] = [a, b];
  console.log(a, b);

  // 数组的解构赋值适于迭代器对象
  const [a, b] = new Set([1,2]);
  console.log(a, b);

  // 数组的解构赋值可简写生成器调用
  function* func() {
    let a = 0;
    let b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
  const [, , , , , sixth] = func();
  console.log(sixth);
  ```

- 注意
  ```js
  // 数组解构不包括自定义属性
  const arr = [5, 4, 3, 2, 1];
  arr.alias = 'array';
  console.log(...arr); // 5 4 3 2 1

  // 数组的对象解构
  const str = "1997,John Doe,US,john@doe.com,New York";
  const { 2: country, 4: state } = str.split(",");
  console.log(country, state); // US New York

  // 数组解构比对象解构严格，会要求是可迭代对象
  const obj4 = {
    ...null, // 支持
    ...undefined, // 支持
    a: 1,
    b: 2,
    length: 2
  }
  console.log({ ...obj4 }) // {a: 1, b: 2, length: 2}
  console.log([...obj4]) // Uncaught TypeError: obj4 is not iterable
  ```

### 字符串的解构赋值
- 使用中括号，按序解构，每个变量对应一个字符，超过字符串长度则返回undefined
  ```js
  const [s1, s2, s3] = "be";
  console.log(s1, s2, s3);
  
  // ！字符串的对象解构
  const { 
    length, 
    0: d, 
    1: e, 
    2: f 
  } = 'Hello';
  console.log(length, d, e, f);
  ```

### 其他数据类型的解构赋值
```js
// 解构null或undefined直接报错
// let {
//   a
// } = null;
// console.log(a);

const {
  valueOf,
} = true;
console.log(valueOf === Boolean.prototype.valueOf); // true

const {
  value
} = NaN;
console.log(value); // undefined

const {
  toString,
} = 1024;
console.log(toString=== Number.prototype.toString); // true
```

## for...of与yield语句
### for...of、for...in、Array.prototype.forEach的比较
- for...in可以遍历任何对象。遍历属性包括原型链上的属性，但不包括不可枚举属性。使用它遍历数组时，注意以下三点：
    
  一、不保证数组的遍历顺序
    
  二、会遍历出数组的自定义属性
    
  三、性能差，比下标遍历数组(正常for循环)慢50倍
  
- for...of只能遍历迭代器对象（一个对象实现Symbol.iterator时，视为迭代器对象），如数组、字符串、集合(map\set)。遍历属性只包括自身属性，当中包括不可枚举属性
  ```js
  for (let val of "HelloWorld") {
    console.log(val);
  }

  for (let val of [1, 2, 3, 4, 5]) {
    console.log(val);
  }

  for (let val of new Set("hello,I'm the set.")) {
    console.log(val);
  }

  let map = new Map();
  for (let i = 0; i < 5; i++) {
    map.set(i, Math.pow(i, 2));
  }
  for (let [key, value] of map) {
    console.log(key, value);
  }
  ```

  ```js
  // for...of的本质
  function forOf(iteratorInstance, fn) {
    let it = iteratorInstance[Symbol.iterator]()
    let result = it.next()
    while (!result.done) {
      // 执行for...of中的代码
      fn(result.value)
      // 给result重新赋值
      result = it.next()
    }
  }
  ```

- Array.prototype.forEach方法无法使用break中断，可通过try/catch + throw解决
  ```javascript
  try {
    [1, 2, 3, 4, 5].forEach(x => {
      if (x === 3) {
        throw 'break';
      }
    });
  } catch(e) {
    if (e !== 'break') 
      throw e;
  }
  ```

### yield语句
```js
// 1、yield语句只能在生成器函数中使用
var arr = [1, [2, 3],[4, [5], 6], 7];
var flat = function* (arr) {
  var len = arr.length;
  // 这里不能用数组的forEach方法，因为传参仅支持普通函数
  for (var i = 0; i < len; i++) {
    if (typeof arr[i] !== "number") {
      yield* flat(arr[i]);
    } else {
      yield arr[i];
    }
  }
}
for (var i of flat(arr)) {
  console.log(i);
}

function* test() {
  // 2、yield语句可以作为函数参数，传入时须外加圆括号
  function func(param) {
    console.log(param);
  }
  func((yield "abc"));

  // 3、yield语句可以作为表达式
  var val2 = yield "HelloWorld";
  console.log(val2);

  // 4、yield语句本身没有返回值，总是返回undefined
  console.log("Hello," + (yield));
  yield(yield 1);
}
var t = test();
t.next();
t.next();
t.next();
t.next();
t.next();
t.next();
```

## 迭代器对象
- 定义迭代器对象
```js
const myIterator = {
  count: 0,
  // 发现：任意一个对象的Symbol.iterator方法可生成该对象的遍历器对象，而遍历器对象本身也有Symbol.iterator方法，说明返回值是它本身
  // eg:
  // function* test() {
  //     console.log("I am a generator");
  // }
  // var g = test();
  // console.log(g[Symbol.iterator]() === g);
  [Symbol.iterator]: function () {
    return this;
  },
  next: function () {
    return {
      done: this.count >= Object.keys(this).length - 1,
      value: Object.values(this)[this.count++] || '',
    }
  },
  return: function () {
    // 过早退出时触发，如异常、break、return
    // 大多数情况下无须实现
  },
  throw: function (exe) {
    // for...of不会调用到它
  }
}

const myIteratorInstance = Object.create(myIterator);
myIteratorInstance.a = 1;
myIteratorInstance.b = 2;
myIteratorInstance.c = 3;
for (let value of myIteratorInstance) {
  console.log(value);
}
```

- 普通对象转化为同步迭代器对象
```javascript
function transformSyncIterator(target) {
  const keyArr = Object.keys(target)
  const len = keyArr.length
  return {
    ...target,
    [Symbol.iterator]: function() {
      let count = 0
      return {
        next: () => ({
          done: count === len,
          value: keyArr[count]? target[keyArr[count++]]: void 0  
        })
      }
    }
  }
}

const obj = {
  a: 1,
  test: 2,
  c: 3
}
const syncIteratorObj = transformSyncIterator(obj)
for(const value of syncIteratorObj) {
  console.log(value)
}
```

- 普通对象转化为异步迭代器对象
```js
function transformAsyncIterator(target) {
  const keyArr = Object.keys(target)
  const len = keyArr.length
  return {
    ...target,
    // 跟同步迭代器对象差异：属性标识不同，next函数返回值不同
    [Symbol.asyncIterator]: function() {
      let count = 0
      return {
        next: () => Promise.resolve({
          done: count === len,
          value: keyArr[count]? target[keyArr[count++]]: void 0  
        })
      }
    }
  }
}
const obj2 = {
  name: "justjavac",
  age: 5,
  job: 'programmer'
}
const asyncIteratorObj = transformAsyncIterator(obj2)
;(async function(){
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for-await...of
  for await(const item of asyncIteratorObj){
    console.log(item)
  }
})()
```

- 应用
  ```js
  // 普通对象转化为迭代器对象，使能使用数组解构方式
  const person = {
    name: 'Bob',
    age: 12,
    // 使用生成器函数实现迭代器更简单
    *[Symbol.iterator]() {
      yield* Object.values(this)
    }
  }
  console.log([...person]) // [ 'Bob', 12 ]
  ```
