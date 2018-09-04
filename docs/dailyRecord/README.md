# 2018

## Aug

### 20

加载 blob 流图片

```js
var img = new Image();
img.src = window.URL.createObjectURL(this._blob);
img.onload = function() {
  // 获取图片原始尺寸 （IE9+）
  var imgWidth = this.naturalWidth;
  var imgHeight = this.naturalHeight;
  window.URL.revokeObjectURL(img.src);
};
```

### 21

```js
!!"false" => true(Boolean)
!!undefined => false
!!123 || !!’abc’ => true
!!是转Boolean的一个技巧，可以得到这个值真正对应的布尔值
```

### 22

获取返回头部的 contentType

```js
xhr.getResponseHeader("Content-Type");
```

### 23

有一个现象，就是当 A 对象没有`name`属性时，去判断`A.name !== XXX`是返回`true`的，如果没有`name`属性，必须先判断`A.name`是否存在，再去判断它是否不等于 XXX
所以说，像这种写法`if(node.data.topicitem.isFavorite)`，是错误的, 应该改成`if(node.data && node.data.topicitem && node.data.topicitem.isFavorite)`

### 24

根据数组里面对象某个字段值进行排序

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

### 25

页数计算方法：Math.ceil(总条数/展示的条数)

### 26

cookie 通用方法

```js
const cookieuUtil = {
    // 设置cookie方法
    setCookie: function(key, val, time) {
        // 获取当前时间
        const date=new Date();
        // 将date设置为n天以后的时间
        const expiresDays = time;
        // 格式化为cookie识别的时间
        date.setTime(date.getTime() + expiresDays*24*3600*1000);
        // 设置cookie
        document.cookie = key + "=" + val +";expires="+date.toGMTString();
    },
    // 获取cookie
    getCookie: function(key) {
        const arr = document.cookie.split('; '),arr2;
        for (let i = 0; i < arr.length; i++) {
          arr2 = arr[i].split('=');
          if (arr2[0] == name) {
            return arr2[1];
          }
      }
          return '';
    },
    // 删除cookie
    delCookie:function(key) {
         this.setCookie(key, '', -1)
    }
};
```

### 27

UMD 模块通用写法

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

### 28

关于 webpack 打包 umd 模块的一些小坑

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

### 29

css-background-img 中 center 属性很方便

```css
background: url("./loading-icon.gif") no-repeat center;
```

NodeList 转 Array 的多种方法

```js
// 方法一
const array = Array.apply(null, NodeList);
// 方法二
const array = Array.prototype.slice.call(NodeList);
// 方法三
const array = [...NodeList];
```

一个 tap 技巧

```js
function tap(x, fn = x => x) {
  console.log(fn(x));
  return x;
}
const array = [1, 2, 3, 4, 5];
array.filter(v => tap(v > 2));
array.filter(v => tap(v) > 2);
// tap对于函数式编程很有帮助
```

### 30

123.toString()为什么会报错

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

### 31

用`Promise`模拟`Dojo`里的`Deferred`函数

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
dojoDef.promise.then(res => {
  console.log(res);
});
```

## Sep

### 1

Promise.finally 实现方法

```js
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
// use
Promise.resolve('done').finally(() => {
  console.log('done');
});
Promise.reject('error').finally(() => {
  console.log('error');
});
```
