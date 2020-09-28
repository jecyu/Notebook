/*
 * @Description: 全局变量导致的内存泄漏
 * @Author: Jecyu
 * @Date: 2020-05-25 07:28:31
 * @LastEditTime: 2020-05-26 09:28:47
 * @LastEditors: Jecyu
 */

var x = [];

function grow() {
  for (var i = 0; i < 10000; i++) {
    var div = document.createElement("div");
    // div.appendChild(
    //   document.createTextNode(i + " - " + new Date().toTimeString())
    // );
    document.body.appendChild(div);
  }
  x.push(new Array(1000000)); // 内存泄漏全局变量
}

document.getElementById("grow").addEventListener("click", grow);
// var x = [];
// function createSomeNodes() {
//   var div,
//   i = 100,
//   frag = document.createDocumentFragment();
//   for (;i > 0; i--) {
//     div = document.createElement("div");
//     div.appendChild(document.createTextNode(i + " - "+ new Date().toTimeString()));
//     frag.appendChild(div);
//   }
//   document.getElementById("nodes").appendChild(frag);
// }
// function grow() {
//   x.push(new Array(1000000).join('x'));
//   createSomeNodes();
//   setTimeout(grow,1000);
// }
// grow();
