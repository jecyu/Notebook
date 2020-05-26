/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-26 10:11:57
 * @LastEditTime: 2020-05-26 10:14:39
 * @LastEditors: Jecyu
 */ 
var _testArray_ = [{ value: 'hello' }]
var count = 1

function someTodo() {
  // 每次点击 字符串长度都以上一次为基础增加到5倍，拉大差异突出效果，并且之后在字符串头部加上count值做区分
  count *= 5
  var str = new Array(count * 10).join(':')
  _testArray_.push({
    value: count + str
  })
}

document.querySelector('#btn').addEventListener('click', someTodo, false)