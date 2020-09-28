// 如何收集依赖
// 在 getter 中收集依赖，在 setter 中触发依赖
// 1. 每个 key 都有一个数组，用来存储当前 key 的依赖。
// 2. 假设依赖是一个函数 ，保存在 global.target 上，现在就可以把 defineReactive 函数稍微改造一下：
function defineReactive(data, key, val) {
  let dep = []; // 新增
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      dep.push(global.target); // 新增
      return val;
    },
    set: function(newVal) {
      if (val === newVal) {
        return;
      }
      // 新增
      for (let i = 0; i < dep.length; i++) {
        dep[i](newVal, val);
      }
      val = newVal;
    },
  });
}

global.target = function print(newVal, oldVal) {
  console.log(`${newVal}${oldVal}`);
  return `${newVal} ${oldVal}`;
};

const a = {
  name: "Jecyu",
};

defineReactive(a, "name", 'Jecyu');
console.log(a.name);
a.name = "linjy";
