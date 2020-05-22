/*
 * @Description: JavaScript 内置的高阶函数，map，filter，sort，reduce
 * @Author: Jecyu
 * @Date: 2020-05-22 07:52:44
 * @LastEditTime: 2020-05-22 15:28:21
 * @LastEditors: Jecyu
 */

(function() {
  // 假设我们有一个数字数组，我们想要创建一个新数组，其中包含第一个数组中每个值的两倍。让我们看看如何使用和不使用高阶函数来解决问题。
  // 不使用高阶函数
  const arr1 = [1, 2, 3];
  const arr2 = [];
  for (let i = 0; i < arr1.length; i++) {
    arr2.push(arr1[i] * 2);
  }
  console.log("arr2 =>", arr2);

  // 使用高阶函数 map
  const arr3 = [1, 2, 3];
  const arr4 = arr3.map(function(item) {
    // 或者使用箭头函数
    return item * 2;
  });
  // const arr4 = arr3.map(item => item*2);// 箭头函数
  console.log("arr4 =>", arr4);
  // 可以看到高阶函数代码简洁，并且把遍历与具体操作分开来。
})();

// (function name() {
// 假设我们有一个包含名称和年龄属性的对象数组。我们想要创建一个只包含成年人（年龄大于或等于18）的数组。
// Before：不使用高阶函数
const arr1 = [1, 2, 3];
const arr2 = [];
// console.time("for")
for (let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2);
}
// console.timeEnd("for")
console.log("arr2 =>", arr2);

// After：使用高阶函数 map
const arr3 = [1, 2, 3];
// console.time("map")
const arr4 = arr3.map(function(item) {
  // 或者使用箭头函数
  return item * 2;
});
// console.timeEnd("map")
// const arr4 = arr3.map(item => item*2);// 箭头函数
console.log("arr4 =>", arr4);
// 可以看到高阶函数代码简洁，并且把遍历与具体操作（item * 2）解耦。
// 时间差距不大
// })()

