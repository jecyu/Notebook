/*
 * @Description: 快速排序
 * 描述：同冒泡排序一样，快速排序也属于交换排序，通过元素之间的比较和交换位置来达到排序的目的。
 * 不同的是，冒泡排序在每一轮中只把 1 个元素冒泡到数列的一端，而快速排序则在每一轮挑选一个基准元素，并让其他比它大的元素移动到数列一边，比它小的元素移动到数列的另一边，从而把数列拆解成两个部分。
 * 思路：关键是分治法，每次获取一个基准元素，进行基准两边元素的分割，重新排位，直到分割完成，核心就是把两边的元素与基准元素比较然后重新排位。
 * 分治法思路详解：
 * 1. 使用 privot 记录开始位置为基准元素，使用 left 和 right 两个指针进行元素的移动和位置交换。
 * 2. 首先比较 right 指针的值与基准元素比较，假设是从小到大排序。那么如果 arr[right] 比 pivot 大，因为这个位置的值不需要移动到左边。所以right 指针继续向左移动，直到遇到比 pivot 小的元素的位置，这个时候停止移动，以便后面跟 left 指针的位置进行交换。
 * 3. 然后比较 left 指针的值与基准元素比较，假设是从小到大排序。那么如果 arr[left] pivot 小，则这个位置的值不需要移动到右边边。所以 left 指针继续向左移动，直到遇到比 pivot 大或等于的元素的位置，这个时候停止移动，以便后面跟 right 指针的位置进行交换。
 * 4. 最后，交换 left 和 right 的位置，然后继续 2 和 3 的步骤，直到 left 和 right 的位置重合，至此完成了第一轮的基准元素分割。
 * 快速排序：快速排序函数根据分治法函数获得的基准引用，递归传递 startIndex 和 endIndex 把每轮的数组，分割成两部分，进行下一个分治法的处理。
 * 示例 1：
 * Input: 9 -3 5 2 6 8 -6 1 3
 * Output: -3 -6 1 2 3  5 6 8 9
 * @Author: Jecyu
 * @Date: 2020-06-08 20:46:09
 * @LastEditTime: 2020-06-09 23:08:44
 * @LastEditors: Jecyu
 */

const assert = require("assert");

/**
 * @description: 分治法
 * @param {type} 
 * @return: 
 */
const partition = (arr, startIndex, endIndex) => {
  let privot = arr[startIndex];
  let left = startIndex;
  let right = endIndex;
  while (left !== right) {
    while (left < right && arr[right] > privot) {
      right--;
    }
    while (left < right && arr[left] <= privot) {
      left++;
    }
    
    // 停止移动，交换 left 和 right 位置
    if (left < right) {
      const tmp = arr[left];
      arr[left] = arr[right];
      arr[right] = tmp;
    }
  }
  // 指针和 left、right 重合处交换
  arr[startIndex] = left;
  arr[left] = privot;
  // 得到基准索引
  return left;
  
};

const quickSort = (arr, startIndex, endIndex) => {
  if (startIndex >= endIndex) {
    return;
  }
  // 每次递归刷新基准元素位置
  const pivotIndex = partition(arr, startIndex, endIndex);
  // 根据基准元素，分成两部分进行递归排序
  quickSort(arr, startIndex, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, endIndex);
};

const arr = [9, -3, 5, 2, 6, 8, -6, 1, 3];
const expectedArr = [-3, -6, 1, 2, 3, 5, 6, 8, 9];
assert.deepStrictEqual(
  quickSort(arr, 0, arr.length),
  expectedArr,
  "arr => expectedArr"
);

// 版本2：单边循环法

// 版本3: 随机取一个基准元素
