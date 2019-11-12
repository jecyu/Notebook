# 算法分类

## 递归

### 递归算法概念

递归是一种解决问题的方法、它从解决问题的各个小部分的开始，直到解决最初的大问题。递归通常涉及函数调用自身。
```js
function recursiveFunction(someParam) {
  recusiveFunction(someParam)
}
```
假设现在必须要执行 recursiveFunction，结果是什么？单就上述情况而言，它会一直执行下去。因此，每个递归函数都必须有<u>基线条件，</u>即一个不再递归调用的条件（停止点），以防止无限递归。
编程名言：“要理解递归，首先要理解递归”。
```js
function understandRecursion(doIunderstandRecursion) {
  const recursionAnswer = confirm('Do you understand recursion?');
  if (recursionAnswer === true) { // 基线条件或停止点
    return true;
  }
  understandRecursion(recursionAnswer); // 递归调用
}
```

### 递归实战

#### 计算一个数的阶乘

- 什么情况使用递归
- 如何写递归代码
  - 单分支层层递归实例讲解
  - 多分支并列递归实例讲解
- 递归注意事项（缺点与解决方法）
  - 爆栈
  - 重复计算
  - 循环引用
  - 空间复杂度
  - 时间复杂度
- 递归实战
  - JavaScript 调用栈
  - 走台阶问题
  - 找到最佳推荐人
  - 数组拍平
  - 对象格式化
  - 实现一颗树组件
  - 实现一个深拷贝
    - weakMap 扩展知识

- [聊聊面试必考-递归思想与实战](https://juejin.im/post/5d85cda3f265da03b638e918?utm_source=gold_browser_extension#heading-0) —— 系统介绍递归的问题，从理论到实战
