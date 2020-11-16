/*
 * @Description: 插入元素、删除
 * @Author: Jecyu
 * @Date: 2020-06-11 17:49:02
 * @LastEditTime: 2020-06-11 21:42:14
 * @LastEditors: Jecyu
 */ 

const assert = require("assert");
const insert = (arr, element, index) => {
  // 判断下标是否超出范围
  if (index < 0 || index >= arr.length) {
    throw new RangeError("超出数组实际元素范围！")
  }
  // 从右向左循环，将元素逐个向右挪一位
  for (let i = arr.length -1; i >= index; i--) {
    arr[i+1] = arr[i]; // // js 语言会默认新建一个空的，不会有溢出的情况，否则需要扩容数组（）
  }
  // 腾出的位置放入新元素
  arr[index] = element; 
  return arr;
}

const deleteEle = (arr, index) => {
  // 判断下标是否超出范围
  if (index < 0 || index >= arr.length) {
    throw new RangeError("超出数组实际元素范围！")
  }
  // 腾出的位置放入新元素
  const deleteEle = arr[index]; 
  // 从左向右循环，将元素逐个向左挪一位
  for (let i = index; i <= arr.length -1; i++) {
    arr[i] = arr[i+1]; // // js 语言会默认新建一个空的，不会有溢出的情况，否则需要扩容数组（）
  }
  return deleteEle;
}



const arr = [3, 1, 2, 5, 4, 9, 23, 5]
const insertEle = 10;
const expectedArr = [3, 1, 10, 2, 5, 4, 9, 23, 5]
assert.deepStrictEqual(insert(arr, insertEle, 2), expectedArr, `${arr} insert 10 in second index, output ${expectedArr}`)
assert.deepStrictEqual(deleteEle(arr, 2), 10, `${arr} delete second index, output 10`)

// 复杂度分析：删除、插入复杂度都是 O(n)
// 空间复杂度为 O(1)