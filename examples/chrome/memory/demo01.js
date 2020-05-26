/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-26 09:58:16
 * @LastEditTime: 2020-05-26 10:09:35
 * @LastEditors: Jecyu
 */ 
var testArray = [{ value: "hello"}]; // 全局变量
function someTodo() {
  testArray.push({ // 闭包
    value: "::::::::::::::"
  })
}

document.querySelector("#btn").addEventListener("click", someTodo, false);
