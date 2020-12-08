/*
 * @Author: Jecyu
 * @Date: 2020-11-22 22:46:07
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-22 22:54:10
 * @FilePath: /examples/25-chrome-extension/demo02/popup.js
 * @Description:
 */
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '"',
    });
  });
};
