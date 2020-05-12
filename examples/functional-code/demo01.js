/**
 * 缓存函数
 * 性能提升的多少，牺牲内存
 */
(function() {
  // answers 作为函数的属性一直存储在内存里，不会因为执行完该函数后就会清除。
  function isPrime(value) {
    if (!isPrime.answers) {
      // 创建缓存
      isPrime.answers = {};
    } 
    if (isPrime.answers[value] !== undefined) {
      // 检查缓存的值
      return isPrime.answers[value];
    } 
    var prime = value !== 0 && value !== 1; // 1 is not a prime
    for (var i = 2; i < value; i++) {
      if (value % i === 0) {
        prime = false;
        break;
      }
    }
    return isPrime.answers[value] = prime; // 存储计算的值
  }
  const result = isPrime(5);
  const result2 = isPrime(6);
  const cache = isPrime.answers[5];
  const cache2 = isPrime(6);
  console.log('isPrime(5)', result);
  console.log('isPrime.answers[5]', cache); //
})()

// (function() {
  // 版本二，缓存函数
  const memoize = function(f) {
    const cache = {};
    return function() {// 这里的函数利用了 cache 值，因为cache 也一直存储在 这个函数里
      const arg_str = JSON.stringify(arguments);
      cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
      return cache[arg_str];
    }
  }

  const superNumber = memoize(function(x) { return x*x});
  const result = superNumber(4);
  const cache = superNumber(4);
  console.log('result =>', result);
  console.log('cache =>', cache);
  
// })()

