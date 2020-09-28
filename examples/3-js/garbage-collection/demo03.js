/*
 * @Description: 为什么闭包的变量可以存在，因为变量被引用了
 * @Author: Jecyu
 * @Date: 2020-05-17 22:41:19
 * @LastEditTime: 2020-05-17 23:38:27
 * @LastEditors: Jecyu
 */ 

/////////// 例子1：for 循环中，立即执行函数，形成闭包。
for (var i = 0; i < 10; i++) {
  (function(i) {  // 这里 i 也可以改为 k，或任意变量名
    // 这里的 i 是形参，是私有变量。每循环一次，都执行一次立即执行函数，然后形成新的形参 i，并赋值。
    // 这个形参 i会被新的 callback 函数引用记录下来，之后每次执行都是该循环的 i 值了。
    const callback = () => console.log('i =>', i);
    setTimeout(callback, 1000);
  })(i)
}

// 每次执行完自执行函数后，都新建了一个 i 私有变量，自执行函数执行，通过 [[Scoped]] 记录了 callback 函数和 i 的变量。在执行完自执行函数，i 还没有释放内存，直到 callback 也执行完成才会被释放。 callback 执行的时候在当前的执行词法环境找不到 i 后，就会在自执行函数这层寻找。


///////// 例子2：缓存函数
const memoize = function(f) {
  const cache = {};
  return function() {// 这里的函数利用了 cache 值，因为cache 也一直存储在 这个函数里
    const arg_str = JSON.stringify(arguments);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    return cache[arg_str];
  }
}

const superNumber = memoize(function(x) { return x*x}); // 这里的 superNumber 函数一直使用了 cache，因此当时 cache 变量，也一直存在，不会被垃圾回收器回收。这个就不仅仅是变量的赋值引用了，而是函数对词法环境的引用（通过内置 [[Enviroment]] 属性，也就是 [[Scopes]] 属性，引用了 f, cache 两个变量）
const result = superNumber(4);
const cache = superNumber(4);
console.log('result =>', result);
console.log('cache =>', cache);

/////////// 例子3：闭包创建私有变量
function Ninja() {
  var feints = 0;
  this.getFeints = function() {
    return feints;
  };
  this.feint = function() {
    feints++;
  }
}

const ninja1 = new Ninja();
ninja1.feint();

const ninjar2 = new Ninja();
const ninjaFeints = ninjar2.getFeints();
console.log('ninjaFeints =>', ninjaFeints);

// 之后 getFeints 执行栈执行的时候，会在它的词法环境寻找，找不到 feints 变量，就会去当前词法环境的外部环境进行查找，直至找到 feints 变量。

// 执行栈 + 全局作用域 + 闭包作用域