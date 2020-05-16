// 简单的闭包
var outerValue = "Jecyu";
function outerFunction() {
  console.log("I can see the jecyu", outerValue);
}
outerFunction();


// 立即执行函数，形成闭包。
// for 循环
for (var i = 0; i < 10; i++) {
  (function(i) {  // 这里 i 也可以改为 k，或任意变量名
    // 这里的 i 是形参，是私有变量。每循环一次，都执行一次立即执行函数，然后形成新的形参 i，并赋值。
    // 这个形参 i会被新的 callback 函数引用记录下来，之后每次执行都是该循环的 i 值了。
    const callback = () => console.log('i =>', i);
    setTimeout(callback, 1000);
  })(i)
}

// 这个例子的应用也就是闭包的机制，保护了私有变量，立即执行函数这里形成了私有作用域。原理：看https://www.zhihu.com/question/33468703/answer/85182587?utm_source=wechat_session&utm_medium=social&utm_oi=710800537397764096 以及《JavaScript 忍者秘籍》