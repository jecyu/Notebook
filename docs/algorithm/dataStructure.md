# 数据结构

## 数组

几乎所有的编程语言都原生支持数组类型，因为数组是最简单的内存数据结构。数组存储一系列同一种数据类型的值。虽然在 JavaScript 里，也可以在数组中保存不同类型的值，但我们还是遵守最佳实践，避免这么做（大多数语言都没有这个能力）。

Tip：通过 `push` 和`pop`方法，就能用数组来模拟栈。
```js
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('原数组', numbers);

numbers.push(11);
console.log('在数组末尾插入11', numbers)

numbers.pop();
console.log('在数组末尾删除一个元素', numbers)
```

Tip： 通过 `shift` 和 `unshift` 方法，我们就能用数组模拟基本的队列数据结构。
```js
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('原数组', numbers);

numbers.unshift(-2)
console.log('在数组开头插入-2', numbers)

numbers.shift();
console.log('在数组开头删除一个元素', numbers)
```

## 栈

栈是一种遵从后进先出（LIFO）原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

在现实生活中也能发现很多栈的例子。例如，下图里的一摞书或者餐厅里叠放的盘子。

![book](../.vuepress/public/images/book.jpg)

### 利用数组创建一个栈

```js
// LIFO：只能用 push, pop 方法添加和删除栈中元素，满足 LIFO 原则
// TODO 导出 UMD 格式，使用 rollup 处理。
class Stack {
  constructor() {
    this.items = [];
  }
  /**
   * @description 向栈添加元素，该方法只添加元素到栈顶，也就是栈的末尾。
   * @param {*} element 
   * @memberof Stack
   */
  push(element) {
    this.items.push(element);
  }
  /**
   * @description 从栈移除元素
   * @returns 移出最后添加进去的元素
   * @memberof Stack
   */
  pop() {
    return this.items.pop();
  }
  /**
   * @description 查看栈顶元素
   * @returns 返回栈顶的元素
   * @memberof Stack
   */
  peek() {
    return this.items[this.items.length - 1];
  }
  /**
   * @description 检查栈是否为空
   * @returns
   * @memberof Stack
   */
  isEmpty() {
    return this.items.length === 0;
  }
  /**
   * @description 返回栈的长度
   * @returns
   * @memberof Stack
   */
  size() {
    return this.items.length;
  }
  /**
   * @description 清空栈元素
   * @memberof Stack
   */
  clear() {
    this.items = [];
  }
}
```

### 用栈解决问题

栈的实际应用非常广泛（只要满足 LIFO 规则的算法都可以使用栈来解决问题）。在回溯问题中，它可以存储访问过的任务或路径、撤销的操作。Java 和 C# 用栈来存储变量和方法调用，特别是处理递归算法时，有可能抛出一个栈溢出异常。

利用栈解决十进制转二进制的问题。
```js
/**
 * 把十进制转换成二进制。
 * @param {*} decNumber 十进制
 */
export function decimalToBinary(decNumber) {
  const remStack = new Stack();
  let number = decNumber; // 十进制数字
  let rem; // 余数
  let binaryString = '';

  while (number > 0) {
    // 当结果不为0，获得一个余数
    rem = Math.floor(number % base); 
    remStack.push(rem); // 入栈
    number = Math.floor(number / base);
  }

  while(!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}
```

## 队列

### 队列数据结构

队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

在现实中，最常见的队列的例子就是排队。

![queue](../.vuepress/public/images/queue.jpg)

在电影院、自助餐厅、杂货店收银台，我们都会排队。排在第一位的人会先接受服务。
在计算机科学中，一个常见的例子就是打印队列。比如说，我们需要打印五份文档。我们会打开每个文档，然后点击打印按钮。每个文档都会被发送至打印队列。第一个发送到打印队列的文档会首先被打印，以此类推，直到打印完所有文档。

#### 创建队列

```js
export default class Queue {
  constructor() {
    this.count = 0; // 控制队列的大小
    this.lowestCount = 0; // 用于追踪第一元素，便于从队列前端移除元素
    this.items = {}; // 用对象存储我们的元素
  }
  /**
   * 向队列添加元素
   * 该方法负责向队列添加新元素，新的项只能添加到队列末尾。
   * @param {*} element 
   */
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }
  /**
   * 从队列移除元素
   */
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount]; // 暂存队列头部的值，以便改元素被移除后将它返回
    delete this.items[this.lowestCount];
    this.lowestCount++; // 属性+ 1
    return result;
  }
  /**
   * 查看队列头元素
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  /**
   * 检查队列是否为空并获取它的长度
   */
  isEmpty() {
    return this.count - this.lowestCount === 0; // 要计算队列中有多少元素，我们只需要计算 count 和 lowestCount 之间的差值
  }
  /**
   * 计算队列中有多少元素
   */
  size() {
    return this.count - this.lowestCount;
  }
  /**
   * 清空队列
   * 要清空队列，我们可以调用 dequeue 方法直到它返回 undefined，也可以简单地将队列中的舒心值重设为和构造函数的一样。
   * @memberof Queue
   */
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
}
```

### 双端队列数据结构

### 使用队列和双端队列来解决问题

#### 循环队列——击鼓传花游戏

```js
import Queue from "../data-structures/queue"
/**
 * 模拟击鼓传花
 * 循环队列。在这个游戏中，孩子们围成一个圆圈，把花尽快传递给旁边的人。某一时刻传花停止，这个时候花在谁手上，谁就退出圆圈，结束游戏。
 * 重复这个过程，直到只剩一个孩子（胜者）。
 * @export
 * @param {*} elementsList 要入列的元素
 * @param {*} num // 达到给定的传递次数。 // 可以随机输入
 */
export default function hotPotato(elementsList, num) {
  const queue = new Queue();
  const elimitatedList = [];

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]);
  }

  while (queue.size() > 1) {
    // 循环队列，给定一个数字，然后迭代队列。从队列开头移除一项，再将其添加到队列末尾，模拟击鼓传花。
    // 一旦达到给定的传递次数，拿着花的那个人就被淘汰了。（从队列中移除）
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    elimitatedList.push(queue.dequeue());
  }
  return {
    elimitated: elimitatedList,
    winner: queue.dequeue()
  }
}
```

#### JavaScript 任务队列

<u>当我们在浏览器中打开标签时，就会创建一个任务队列。</u>这是因为每个标签都是单线程处理所有的任务，成为事件循环。浏览器要负责多个任务，如渲染 HTML、执行 JavaScript 代码、处理用户交互（用户输入、鼠标点击等）、执行和处理异步请求。

## 二叉堆和堆排序

### 二叉堆

堆（Heap）是计算机科学一类特殊的数据结构的统称，堆通常是一个可以看作一颗完全二叉树的数组对象。
二叉堆是一种特殊的二叉树，有一以下两个特性。
- 它是一颗完全二叉树，表示树的每一层都有左侧和右侧子节点。（除了最后一层的叶节点），并且最后一层的叶节点尽可能都是左侧子节点，这叫做结构特性。
- 二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值。所有的节点都大于等于（最大堆）或小于等于（最小堆）每个它的子节点。这叫做堆特性。
- 在二叉堆中，每个子节点都要大于等于父节点（最小堆）或小于等于父节点（最大堆）。
将根节点最大的堆叫做最大堆或大根堆，根节点最小的堆叫做最小堆或小根堆。常见的堆有二叉堆、斐波那契堆等。
堆是非线性数据结构，相当于一维数组，有两个直接后继。

#### 创建最小堆类

使用一个数组，通过索引值检索父节点、左侧和右侧子节点的值。
```js

import { defaultCompare, Compare, swap } from '../util'

/**
 * 最小堆类
 * 完全二叉树，根节点最小的堆叫做最小堆
 * 在二叉堆中，每个子节点都要大于等于父节点
 * @export
 * @class MinHeap
 */
export class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = []; // 使用数组来存储数据，通过索引值检索父节点、左侧和右侧子节点的值。
  }
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  getRightIndex(index) {
    return 2 * index + 2;
  }
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2)
  }
  /**
   * 向堆中插入值
   * 指将值插入堆的底部叶节点（数组的最后一个位置）
   * @param {*} value
   * @memberof MinHeap
   */
  insert(value) {
    if (value !== null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1); // 将这个值和它的父节点进行交换，直到父节点小于这个插入的值。
      return true;
    }
    return false;
  }
  /**
   * 上移操作，维护堆的结构
   * 将这个值和它的父节点进行交换，直到父节点小于这个插入的值。
   * @param {*} index
   * @memberof MinHeap
   */
  siftUp(index) {
    let parent = this.getParentIndex(index); // 获得父节点的索引
    while( index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
      swap(this.heap, parent, index);
      index = parent; // 往上替换
    }
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  /**
   * 从堆中找到最小值或最大值
   * 在最小堆中，最小值总是位于数组的第一个位置（堆的根节点）
   * @memberof MinHeap
   */
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  /**
   * 移除最小值表示移除数组中的第一个元素（堆的根节点）。
   * 在移除后，我们将堆的最后一个元素移动至根部并执行 siftDown 函数，表示我们将交换元素直到堆的结构正常。
   * @memberof MinHeap
   */
  extract() {
    if(this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap.shift();
    this.siftDown(0);
    return removedValue;
  }
  /**
   * 下移操作，维护堆的结构
   * @param {*} index 移除元素的位置
   * @memberof MinHeap
   */
  siftDown(index) {
    let element = index; // 将 index 复制到 element 变量中
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    // 如果元素比左侧节点要小，且 index 合法。
    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
      element = left;
    }
    // 如果元素比右侧节点要小，且 index 合法。
    if (right < size && this.compareFn(this.heap[element], this.heap[right] === Compare.BIGGER_THAN)) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element); // 向下移动
    }
  }
}
```

## 堆的应用

在程序中，堆用于动态分配和释放程序中所使用的对象。在以下情况中调用堆操作：
1. 事先不知道程序所需对象的数量和大小。
2. 对象太大，不适合使用堆栈分配器。