# JS 原型概念与应用

## 前言

说起原型二字，你想回起

产品经理的原型、游戏原型、设计稿原型

原型与模型有什么关系吗？

**摘要**：

- 什么是原型
- JS 为什么需要原型链
- **proto** 与 prototype 的区别
- 应用场景

**面向读者**：对于 JS 原型链概念模糊的前端工程师，说不清`proto` 与 `prototype` 的区别。

## 什么是原型？

### 构造器与原型的区别

两者的作用用于哪里，有哪些应用场景

### 什么是原型链

## JS 为什么需要原型链

### 回顾传统面向对象语言的继承

### JS 是如何使用原型链进行类的继承的

- 对象构造器
- 重写 contructor 的问题
- 一些操作符 instanceof typeof in 操作符

### 使用 ES6 的 class 实现继承

## __proto__ 与 prototype 的区别

### 在 debugger 中查看属性

## 应用场景

### 给第三方库、框架增加属性

除了在 window 对象外
要注意在大型项目中，prototype 属性的冲突问题。

## 小结

## 参考资料

- [深入探究 Function & Object 鸡蛋问题](https://github.com/yygmind/blog/issues/35)
- [【进阶 5-2 期】图解原型链及其继承优缺点](https://github.com/yygmind/blog/issues/35)
- [【进阶 5-1 期】重新认识构造函数、原型和原型链](https://juejin.im/post/5c6a9c10f265da2db87b98f3)
- [wiki 原型](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%9E%8B)
