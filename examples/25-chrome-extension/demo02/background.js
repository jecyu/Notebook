/*
 * @Author: Jecyu
 * @Date: 2020-11-22 22:28:05
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-22 22:42:17
 * @FilePath: /examples/25-chrome-extension/demo02/background.js
 * @Description:
 */
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
