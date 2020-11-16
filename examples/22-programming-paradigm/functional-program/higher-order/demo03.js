/*
 * @Description: 创建自己的高阶函数
 * @Author: Jecyu
 * @Date: 2020-05-22 08:01:50
 * @LastEditTime: 2020-05-22 15:26:52
 * @LastEditors: Jecyu
 */ 
const strArray = ["JavaScript", "Python", "PHP", "Java", "C"];

function jecyuMap(arr, fn) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray.push(fn(arr[i], i));
  }
  return newArray;
}

const lenArray = jecyuMap(strArray, function(item) {
  return item.length;
});
console.log('lenArray =>', lenArray);


