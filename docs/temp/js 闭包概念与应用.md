## 前言

本文主要讲述以下几点内容：

面向读者：

## 头脑风暴

- 内存管理
  - 栈（js 单线程占用一个独立的栈）
  - 堆
  - 函数调用入栈
  - 原始值，引用值
- 内存垃圾回收机制（chrome 调试工具）
- 内存管理（引用计数）应用
  - 闭包概念
  - 递归调用（尾递归）
- 内存泄漏
  - 识别内存泄漏的类型
  - 分析内存泄漏
    - performance
    - more tools -> performance monitor 实时监控
    - memory 面板

```
> b = a
{ name: 'jecyu' }
> a = null;
null
> b 
{ name: 'jecyu' }

## 参考资料

- 《程序是怎么跑动起来的》