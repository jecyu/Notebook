/*
 * @Description: 函数的实参和形参
 * @Author: Jecyu
 * @Date: 2020-05-21 11:16:00
 * @LastEditTime: 2020-05-21 13:19:06
 * @LastEditors: Jecyu
 */ 


 function multiMax(first, ...remainingNumbers) {
   const sorted = remainingNumbers.sort(function(a, b) {
     return b - a; // 以降序排序余下参数
   })
   return first * sorted[0];
 }

 console.assert(multiMax(3, 1, 2, 3) === 9, "3*3 = 9")

 
// arguments