/*
 * @Description: 计数排序
 * @Author: Jecyu
 * @Date: 2020-06-09 21:06:43
 * @LastEditTime: 2020-06-10 21:47:23
 * @LastEditors: Jecyu
 */

const assert = require("assert");

/**
 * @description: 计数排序，适用于大于 0 的自然数
 * 思路： 
 * 详解：见注释的 4 步
 * @param {type} 
 * @return: 
 */
const countSort = (arr) => {
  // 1. 得到数列的最大值
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  // 2. 根据数列最大值确定统计数组的长度，填充初始元素值为 0
  const countArray = Array(max + 1);
  for (let i = 0; i < max + 1; i++) {
    countArray[i] = 0;
  }
  // 3. 遍历数列，填充统计数组
  for (let i = 0; i < arr.length; i++) {
    countArray[arr[i]]++;
  }
  const sortedArray = [];
  // 4. 遍历统计数组，输出结果
  for (let i = 0; i < countArray.length; i++) {
    for (let j = 0; j < countArray[i]; j++) {
      sortedArray.push(i);
    }
  }
  return sortedArray;
};

const input = [9, 3, 5, 4, 9, 1, 2, 7, 8, 1, 3, 6, 5, 3, 4, 0, 10, 9, 7, 9];
const expectedOutput = [
  0,
  1,
  1,
  2,
  3,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  7,
  7,
  8,
  9,
  9,
  9,
  9,
  10,
];
assert.deepStrictEqual(
  countSort(input),
  expectedOutput,
  `countSort(${input}), output: ${expectedOutput}`
);
// 复杂度分析
// 时间复杂度：获得数列的最大值 max，填充 conutArray，遍历统计数组，外层循环次数为数列的最大值，时间复杂度都跟 max 有关，最大值数值越大，则复杂度越大，不好估算为 O(n)，不是以元素的数量来决定。
// 空间复杂度： sortedArray countArray 根据外层数列的最大值来决定，不好统计。


// 版本2：优化版，TODO

const countSort = () => {
  
}


// 缺点：
// 假如 输入 0 到 1亿，范围过大。创建 1 亿长度的数组，浪费空间，时间复杂度也增大。
// 计算排序只适合自然数 0 