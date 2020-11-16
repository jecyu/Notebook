/*
 * @Author: Jecyu
 * @Date: 2020-11-11 08:12:43
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-11 15:03:22
 * @FilePath: /examples/16-worker/service-worker/sw.js
 * @Description: 
 */

// install 和 active 只会激活一次，再次查看需要在 application 取消 sw.js 注册
self.addEventListener("install", function(event) {
  console.log("Installed sw.js", event);
});

self.addEventListener("activate", function(event) {
  console.log("Activated sw.js", event);
});