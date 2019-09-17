# JavaScript

> https://github.com/stephentian/33-js-concepts#6-this-call-apply-%E5%92%8C-bind

## HTTP 请求

## 深拷贝

## 数组操作

> 参考实现：lodash https://lodash.com/docs/4.17.15#intersection

### 求交集和并集

```js
let intersection = a.filter(v => b.includes(v))
let difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v))
```

## this, call, apply 和 bind

### 实现一个 call 函数

## 前端模块化

- commonjs
- amd
- es

## 字符串拼接

```js
[1, 2, 3, 4, 5].join()
```

## 参考资料

- [如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1?utm_source=gold_browser_extension#heading-13)
- [从多线程到Event Loop全面梳理](https://juejin.im/post/5d5b4c2df265da03dd3d73e5#heading-15)