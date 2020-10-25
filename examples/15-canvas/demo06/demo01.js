/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-07-10 11:25:45
 * @LastEditTime: 2020-07-10 11:36:55
 * @LastEditors: Jecyu
 */

const content = document.querySelector(".content");
const btn = document.querySelector("#btn");
btn.addEventListener('click', () => {
  console.log("click =>", 666);
  html2canvas(content).then(function(canvas) {
    document.body.appendChild(canvas);
  });
}, false);
