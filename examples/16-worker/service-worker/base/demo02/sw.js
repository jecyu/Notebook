/*
 * @Author: Jecyu
 * @Date: 2020-11-11 08:12:43
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-11 22:24:43
 * @FilePath: /examples/16-worker/service-worker/base/demo02/sw.js
 * @Description:
 */

// install 和 active 只会激活一次，再次查看需要在 application 取消 sw.js 注册
// self.addEventListener("install", function(event) {
//   console.log("Installed sw.js", event);
// });

// self.addEventListener("activate", function(event) {
//   console.log("Activated sw.js", event);
// });

self.addEventListener("fetch", function(event) {
  // console.log(event.request);
  event.respondWith(fetch(event.request));
});
// self.addEventListener('fetch', function(event){
//   event.respondWith(
//       new Promise((resolve, reject) => {
//           var req = modify(event.request); // modify request
          
//           // send network request
//           fetch(req)
//           .then((r) => resolve(modify(r))) // modify response
//           .catch(e => reject(e));
//       })
//   );
// });