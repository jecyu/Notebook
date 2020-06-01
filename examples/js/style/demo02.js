/*
 * @Description: 元素大小
 * @Author: Jecyu
 * @Date: 2020-05-31 18:20:58
 * @LastEditTime: 2020-06-01 17:59:39
 * @LastEditors: Jecyu
 */

/**
 * @description: 解决底部一定距离，如提前加载数据
 * @param {type}
 * @return:
 */
function isCloseToBottom(el, distance) {
  if (el.scrollHeight < el.clientHeight + el.scrollTop + distance) {
    return true;
  }
  return false;
}
function isOnBottom(el) {
  if (el.scrollHeight === el.clientHeight + el.scrollTop) {
    return true;
  }
  return false;
}

function updated(e) {
  const target = e.target || e.srcElement;
  if (isCloseToBottom(target, 400)) {
    console.log("isCloseToBottom 400px=>", target);
  }
  if (isOnBottom(target)) {
    // console.log("isOnBottom =>", target);
  } else {
    // console.log("isNotOnBottom =>", target);
  }
}
let outerDom = document.querySelector(".outer");
outerDom.addEventListener("scroll", updated, false);
