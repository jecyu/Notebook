# 2018

## 八月

### 加载 blob 流图片

```js
const img = new Image();
img.src = window.URL.createObjectURL(this._blob);
img.onload = function() {
  // 获取图片原始尺寸 （IE9+）
  const imgWidth = this.naturalWidth;
  const imgHeight = this.naturalHeight;
  window.URL.revokeObjectURL(img.src);
};
```

### !!含义

```js
!!"false" => true(Boolean)
!!undefined => false
!!123 || !!’abc’ => true
!!是转Boolean的一个技巧，可以得到这个值真正对应的布尔值
```

### 获取返回头部的 contentType

```js
const contentType = xhr.getResponseHeader("Content-Type");
```

### 判断问题

有一个现象，就是当 A 对象没有`name`属性时，去判断`A.name !== XXX`是返回`true`的，如果没有`name`属性，必须先判断`A.name`是否存在，再去判断它是否不等于 XXX
所以说，像这种写法`if(node.data.topicitem.isFavorite)`，是错误的, 应该改成`if(node.data && node.data.topicitem && node.data.topicitem.isFavorite)`

### 根据数组里面对象某个字段值进行排序

```js
sortUp: function(data, key) {
  var sort = function (key) {
    return function (objectN, objectM) {
      var valueN = objectN[key]
      var valueM = objectM[key]
      if (valueN < valueM) {
        return 1;
      } else if (valueN > valueM) {
        return -1;
      } else {
        return 0;
      }
    }
  }
    data.sort(sort(key))
}
```

Tips: 在 sort 函数里面，a < b return 1（降序）
a < b return -1（升序)

### 页数计算方法

`const totalPages = Math.ceil(总条数/展示的条数)`

### cookie 通用方法

```js
const cookieuUtil = {
  // 设置cookie方法
  setCookie: function(key, val, time) {
    // 获取当前时间
    const date = new Date();
    // 将date设置为n天以后的时间
    const expiresDays = time;
    // 格式化为cookie识别的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
    // 设置cookie
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
  },
  // 获取cookie
  getCookie: function(key) {
    const arr = document.cookie.split("; ");
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      arr2 = arr[i].split("=");
      if (arr2[0] == key) {
        return arr2[1];
      }
    }
    return "";
  },
  // 删除cookie
  delCookie: function(key) {
    this.setCookie(key, "", -1);
  }
};
```

### UMD 模块通用写法

```js
(function(global, factory) {
  // webpack处理
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : // amd
      typeof define === "function" && define.amd
      ? define(factory)
      : // window
        (global.xxx = factory());
})(this, function() {
  "use strict";
  // do something...
  var xxx = `your export module`;
  return xxx;
});
```

### 关于 webpack 打包 umd 模块的一些小坑

首先，如果想把一个模块通过`<script src>`方式引入，挂载到 window 变量上，需要配置 webpack 打包成`umd`

在导出模块时，如果用了 es6 的`export default`写法，会有点小坑，例如：

```js
const foo = () => { console.log('hello world'); }
export defaule foo;
```

打包后引入，发现 window 上没有挂载上 foo 变量，研究了打包后的源码，总结下：

```js
// export defaule foo 是把一个对象export出来
  Module{
    default: () => { console.log('hello world') }，
    __esModule: true
  }
```

所以`foo`变量实际上是挂载到了`window.default`上，只能通过`window.default()`进行调用

**解决办法**

```js
const foo = () => { console.log('hello world'); }
export { foo };

// 内部Module对象实际上是
  Module{
    foo: () => { console.log('hello world') }，
    __esModule: true
  }
```

如果用`module.exports = foo`这种方法导出则不会有问题，不过需要这么配置

```js
output: {
  libraryTarget: 'umd',
  library: 'foo' // 比esmodule加多这项
}
```

### css-background-img 中 center 属性很方便

```css
background: url("./loading-icon.gif") no-repeat center;
```

### NodeList 转 Array 的多种方法

```js
// 方法一
const array = Array.apply(null, NodeList);
// 方法二
const array = Array.prototype.slice.call(NodeList);
// 方法三
const array = [...NodeList];
```

### 一个 tap 技巧

```js
function tap(x, fn = (x) => x) {
  console.log(fn(x));
  return x;
}
const array = [1, 2, 3, 4, 5];
array.filter((v) => tap(v > 2));
array.filter((v) => tap(v) > 2);
// tap对于函数式编程很有帮助
```

### 123.toString()为什么会报错

```js
123.toString()相当于123.0toString()
// 解决一
var n = 123;
n.toString();
// 解决二
(123).toString();
123..toString();
123.0.toString();
```

### 用`Promise`模拟`Dojo`里的`Deferred`函数

```js
const Deferred = function() {
  const def = {};
  def.promise = new Promise((resolve, reject) => {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
};
// use
const dojoDef = Deferred();
dojoDef.resolve("dojo-deferred-done");
dojoDef.promise.then((res) => {
  console.log(res);
});
```

## 九月

### `Promise.finaly` 实现方法

```js
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
// use
Promise.resolve("done").finally(() => {
  console.log("done");
});
Promise.reject("error").finally(() => {
  console.log("error");
});
```

### `Merge` 对象

```js
// 合并对象（不会覆盖对象已有的属性）
function merge(obj = {}, defaults) {
  const has = Object.prototype.hasOwnProperty;
  for (const key in defaults) {
    // 确保不会合并default原型链上的属性
    if (has.call(defaults, key)) {
      if (typeof obj[key] === "undefined") {
        obj[key] = defaults[key];
      }
    }
  }
  return obj;
}
```

### Event lop

微任务包括 `process.nextTick` ，`promise` ，`Object.observe` ，`MutationObserver`

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

1. 执行一个宏任务（栈中没有就从事件队列中获取)
2. 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
3. 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行)
4. 当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
5. 渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）

### 解析 url 参数

```js
/**
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123, a:b}
 *
 */
function urlParse() {
  const url = window.location.search;
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g; // ？/&开头 + 非？&至少一个 = + 非？&至少一个
  const arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split("=");
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    });
  }
  return obj;
}
```

### ESlint

[Eslint 规则配置参考](http://eslint.cn/docs/rules/)

```
"off" or "0"：表示这个规则关闭，
"warn" or "1"：表示这个规则是一个警告处理
"error" or "2"：表示这个规则是一个错误处理
```

### vscode 小技巧

跳回之前的位置

> control + -

跳到当前光标的位置

> option + ←

### 关于 ES6 的 class

```js
class A {
  constructor() {
    console.log(this);
    console.log(new.target.name);
  }
}

class B extends A {
  constructor() {
    // super代表父类的构造函数的constructor
    super();// 相当于A.call(this)
    // 只有调用super()之后，才能使用this，因为子类实例的构建，是基于对父类实例加工，执行super方法才返回父类实例
    console.log(this);
  }
}

// 派生类上可以忽略constructor,它是等效于上面的写法
class B extends A {
  ...
}

// B函数内super执行时，super内的this指向b，A.prototype.constructor.call(this)
const b = new B();

// Object.getPrototypeOf方法可以用来从子类上获取父类
console.log(Object.getPrototypeOf(B));// Function：A

// 一些原型链的指向
b._proto__ => B.prototype => B.prototype.__proto__ => A.prototype =>  A.prototype.__proto__ => Object.prototype => Object.prototype.__proto__ => null

// ES5模拟ES6类的继承实现
function A () {}
A.prototype.test = function() {}

function B() {
  A.call(this);
}
// Object.create
B.prototype = Object.create(A.prototype, {
  constructor: {
    value: B,
    enumerable: true,
    writable: true,
    configurable: true
  }
})
```

### git 常用合并命令

稳妥点合并

- git fetch origin xxx
- git diff xxx
- git merge origin/xxx

暴力合并

- git pull origin xxx

### git 更新文件冲突解决方案

如果工作区还没有 add 和 commit，直接 git pull 会产生以下提示：

> Please,commit your changes or stash them before you can merge.

解决方案有 2 种：

1. 保留本地修改，不被新的修改覆盖

- git stash (保留本地修改，还没有 add 和 commit)
- git pull (更新)
- git stash pop (回到本地更改)

2. 如果想让远程代码完全覆盖本地代码的修改

- git reset -hard
- git pull

### 关于 weakmap

> weak map 是只包含对象键的特殊 map。和 weak set 类似，键的是弱对象引用，因此当其为仅存的某个对象的引用时，垃圾回收不会被阻止。当键被垃圾回收器清理之后，所关联的值也一并销毁。当想要将额外的信息附加到生命周期可由外部代码控制的对象上时，带有内存管理的 weak map 类型是唯一适合的。

使用 weakmap 模拟实例对象私有变量

```js
let Widget = (function() {
  let privateData = new WeakMap();

  function Widget(id) {
    privateData.set(this, { id: id });
  }

  Widget.prototype.getId = function() {
    return privateData.get(this).id;
  };

  return Widget;
})();

const w = new Widget("123456789");
w.getId(); // '123456789';
w = null; // privateData解除对w的引用，id(值)会一并被销毁
```

### ajax 并发请求

```js
const url = "";

// async/await
async function asyncGetUrl() {
  const promise1 = fetch(url).then((res) => res.json());
  const promise2 = fetch(url).then((res) => res.json());
  const res1 = await promise1;
  const res2 = await promise2;
  console.log(res1, res2);
}

// promise all
async function allGetUrl() {
  const promise1 = fetch(url).then((res) => res.json());
  const promise2 = fetch(url).then((res) => res.json());
  const [res1, res2] = await Promise.all([promise1, promise2]);
  console.log(res1, res2);
}
```

### bash 一个小坑

今天打算写个 shell 脚本来发布到 github 上，commit 的信息就定为当前时间，于是就这么写了

```shell
time="📝"$(date +"%Y-%m-%d %H:%M:%S")

git add .
git commit -m $time
git push origin master
```

然后发现报错无法进行，于是直接把`echo "📝"$(date +"%Y-%m-%d %H:%M:%S")`这句话丢到 zsh 上跑，发现又没问题，觉得很奇怪，为什么取变量遇到**空格**就中断了呢？？

谷歌了很久，终于在一本在线书籍上找到答案

```shell
a=`ls -l`
echo $a           # 不带引号，移除所有的制表符与分行符
echo "$a"         # 带引号，会保留空白符
```

所以，以上问题得到解决

```shell
git commit -m "$time"
```

### 元素节点中的 children 和 childNodes 的区别

```js
const el = document.querySelector('.el');

// children只包含元素节点
el.children

// childNodes包含元素节点和文本节点(空白的text也算)
el.childNodes

// 如果想在childNodes中判断非文本节点
xxx.nodeType != 3

// 关于nodeType值
nodeType: {
  1: 元素节点,
  2: 属性节点,
  3: 文本节点
}
```

### Element.matches--polyfill

> matches 可用于事件代理进行元素判断

```js
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}
```
