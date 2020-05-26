/*
 * @Description: 脱离 DOM 引用的节点，所有测试记得在无痕窗口执行。避免 chrome 扩展影响。
 * @Author: Jecyu
 * @Date: 2020-05-26 09:04:12
 * @LastEditTime: 2020-05-26 09:28:21
 * @LastEditors: Jecyu
 */ 
var detachedNodes;
function create() {
  var ul = document.createElement("ul");
  for (var i = 0; i < 10000; i++) {
    var li = document.createElement("li");
    ul.appendChild(li);
  }
  detachedNodes = ul;
}
document.getElementById("create").addEventListener("click", create);