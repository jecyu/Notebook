// 响应式函数
function reactive(obj, key, value) {
  Object.defineProperty(data, key, {
    get() {
      console.log(`访问了 ${key} 属性`);
      return value;
    },
    set(val) {
      console.log(`将${key}由->${value}->设置成->${val}`);
      if (value !== val) {
        value = val;
      }
    },
  });
}

const data = {
  name: "林三心",
  age: 22,
};
Object.keys(data).forEach((key) => reactive(data, key, data[key]));
console.log(data.name);

data.name = "sunshine_lin";
console.log(data.name);

// 新增属性，没有响应式
data.hobby = '打篮球'
console.log(data.hobby) // 打篮球
data.hobby = '打游戏'
console.log(data.hobby) // 打游戏