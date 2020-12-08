/*
 * @Author: Jecyu
 * @Date: 2020-11-22 23:01:40
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-22 23:04:17
 * @FilePath: /examples/25-chrome-extension/demo02/options.js
 * @Description:
 */
let page = document.getElementById("buttonDiv");
const kButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement("button");
    button.style.backgroundColor = item;
    button.addEventListener("click", function() {
      chrome.storage.sync.set({ color: item }, function() {
        console.log("color is" + item);
      });
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
