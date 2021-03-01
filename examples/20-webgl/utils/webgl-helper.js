/*
 * @Author: Jecyu
 * @Date: 2021-02-19 14:35:07
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-02-23 10:00:00
 * @FilePath: /examples/20-webgl/utils/webgl-helper.js
 * @Description:
 */
var random = Math.random;
function randomColor() {
  return {
    r: random() * 255,
    g: random() * 255,
    b: random() * 255,
    a: random() * 1,
  };
}


function resizeCanvas(canvas, width, height) {
  if (canvas.width !== width) {
    canvas.width = width ? width : window.innerWidth;
  }
  if (canvas.height !== height) {
    canvas.height = height ? height : window.innerHeight;
  }
}

function $$(str) {
  if (!str) return null;
  if (str.startsWith('#')) {
    return document.querySelector(str);
  }
  let result = document.querySelectorAll(str);
  if (result.length == 1) {
    return result[0];
  }
  return result;
}

