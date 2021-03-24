/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-05-17 21:28:43
 * @LastEditTime: 2020-05-17 22:19:07
 * @LastEditors: Jecyu
 */

// 版本一
//   let user = {
//     // user 具有对象的引用
//     name: "Jecyu",
//   };

//   user = null; //  { name: "Jecyu"} 不能被访问了，垃圾回收器将丢失 Jecyu 数据并释放内存
//   console.log("user =>", user);

// 版本二
let user = {
  // user 具有对象的引用
  name: "Jecyu",
};

let admin = user;
user = null; // { name: "Jecyu"}  仍可以被 admin 访问

console.log("user =>", user);
console.log("admin =>", admin); // { name: "Jecyu"}  仍可以被 admin 访问

