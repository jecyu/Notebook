/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-27 15:07:58
 * @LastEditTime: 2020-05-27 15:13:13
 * @LastEditors: Jecyu
 */ 
export const createDOMFromString = domString => {
  const div = document.createElement('div');
  div.innerHTML = domString;
  return div.childNodes[0];
};