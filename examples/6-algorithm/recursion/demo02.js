/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-20 09:35:46
 * @LastEditTime: 2020-05-20 09:35:47
 * @LastEditors: Jecyu
 */ 
let i = 0;
function recursiveFn() {
  i++;
  // 解决方案是考虑 > 1000，抛出异常，但是不实际。有可能变其他的变量传入栈中，导致爆栈
  recursiveFn();
}
try {
  recursiveFn();
} catch(err) {
  console.log(`i = ${i} error: ${err}`);
}