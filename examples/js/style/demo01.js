/*
 * @Description: 元素大小
 * @Author: Jecyu
 * @Date: 2020-05-31 18:20:58
 * @LastEditTime: 2020-06-01 17:34:10
 * @LastEditors: Jecyu
 */ 

function setCoords(e, type) {
  let idX = type + "X"
  let idY = type + "Y"
  document.getElementById(idX).innerText = e[idX];
  document.getElementById(idY).innerText = e[idY];
}

function updated(e) {
  setCoords(e, "offset");
  setCoords(e, "client");
  setCoords(e, "page");
  setCoords(e, "screen");
}
let innerDom = document.querySelector(".inner");
let log = document.querySelector(".log");

innerDom.addEventListener("mouseenter", updated, false)
innerDom.addEventListener("mousemove", updated, false)
innerDom.addEventListener("mouseleave", updated, false)