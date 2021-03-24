/*
 * @Description: 冒泡排序
 * 定义：之所以称之为冒泡排序是因为使用这种排序算法时，像气泡一样从数组的一端到另一端。
 * 实现思路：
 * 1. 每次比较相邻的元素，如果第一个比第二个大，就交换两个元素的位置
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数。
 * 1. 示例
 * Input：5 8 6 3 9 2 1 7
 * Output：1 2 3 5 6 7 8 9
 *
 * @Author: Jecyu
 * @Date: 2020-06-08 20:00:33
 * @LastEditTime: 2020-06-08 21:45:28
 * @LastEditors: Jecyu
 */

const assert = require("assert");

/**
 * @description: 冒泡排序
 * 思路：使用双循环进行排序
 * 详解：
 * 1. 外部循环控制所有的回合
 * 2. 内部循环实现每一轮的冒泡处理，先进行元素比较，再进行元素交换
 * @param {type} 
 * @return: 
 */
const bubbleSort = (a) => {
  const length = a.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const tmp = a[j];
      if (a[j] > a[j + 1]) {
        a[j] = a[j + 1];
        a[j + 1] = tmp;
      }
    }
  }
  return a;
};

// 时间复杂度分析：O(n²)，双层循环

assert.deepStrictEqual(
  bubbleSort([5, 8, 6, 3, 9, 2, 1, 7]),
  [1, 2, 3, 5, 6, 7, 8, 9],
  "Input: 5 8 6 3 9 2 1 7, Ouput: 1 2 3 5 6 7 8 9"
);

/**
 * @description: 冒泡排序优化版
 * 思路：减少外层回合的数量，如果已经排好序，则可以提前结束回合
 * 详解：
 * 1. 增加一个 isSorted 标记，来记录每轮的排序状态
 * 2. 如果 isSorted 在经过内部的冒泡处理后，仍然为 true，则提前结束循环。
 * @param {type} 
 * @return: 
 */
const bubbleSort2 = (a) => {
  const length = a.length;
  for (let i = 0; i < length; i++) {
    let isSorted = true;
    for (let j = 0; j < length; j++) {
      const tmp = a[j];
      if (a[j] > a[j + 1]) {
        a[j] = a[j + 1];
        a[j + 1] = tmp;
        isSorted = false; // 因为有元素进行交换，所以不是有序的，标记变为 false
      }
    }
    if (isSorted) {
      break;
    }
  }
  return a;
}

assert.deepStrictEqual(
  bubbleSort2([5, 8, 6, 3, 9, 2, 1, 7]),
  [1, 2, 3, 5, 6, 7, 8, 9],
  "Input: 5 8 6 3 9 2 1 7, Ouput: 1 2 3 5 6 7 8 9"
);

// 时间复杂度，第 2 版添加了 isSorted 标记，最好的情况可以达到 O(n)，最坏的情况则是 O(n²)