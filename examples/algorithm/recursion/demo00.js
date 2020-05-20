/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-20 09:40:52
 * @LastEditTime: 2020-05-20 09:40:52
 * @LastEditors: Jecyu
 */ 
function understandRecursion(doIunderstandRecursion) {
  const recursionAnswer = confirm('Do you understand recursion?'); // function logic
  if (recursionAnswer === true) { // base case or stop point
    return true;
  }
  understandRecursion(recursionAnswer); // recursive call
}

understandRecursion(false);