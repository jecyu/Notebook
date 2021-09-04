const person = { name: "林三心" };

const proxyPerson = new Proxy(person, {
  get(target, key, receiver) {
    console.log("target ->", target); // 原来的 person
    console.log("key ->", key); // 属性名
    console.log("receiver ->", receiver); // 代理后的 proxyPerson
  },
  set(target, key, value, receiver) {
    console.log("target ->", target); // 原来的 person
    console.log("key ->", key); // 属性名
    console.log("value ->", value); // 设置的值
    console.log("receiver ->", receiver); // 代理后的 proxyPerson
  },
});

console.log('proxyPerson.name ->', proxyPerson.name); // 访问属性触发 get 方法
proxyPerson.name = "sunshine_lin"; // 设置属性值触发 set 方法
