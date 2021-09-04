const data = {
  name: "林三心",
  age: 22,
};

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log(`访问了 ${key} 属性`);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(`将${key}由->${target[key]}设置成->${value}`);
      Reflect.set(target, key, value, receiver);
    },
  };
  return new Proxy(target, handler);
}

const proxyData = reactive(data);

console.log(proxyData.name);
// =>访问了 name 属性
// =>林三心

proxyData.name = "sunshine_lin";
// 将 name 由 -> 林三心 -> 设置成 ->sunshine_lin
console.log(proxyData.name);
// =>访问了 name 属性
// =>sunshine_lin

// 新增属性
proxyData.hobby = "打篮球";
console.log(proxyData.hobby);
// => 访问了 hobby 属性
// => 打篮球

proxyData.hobby = "打游戏";
// => 将 hobby由->打篮球 ->设置成->打游戏
// =》 打游戏
console.log(proxyData.hobby);
// 访问了 hobby 属性
// 打游戏
