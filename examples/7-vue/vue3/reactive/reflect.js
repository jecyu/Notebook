const person = { name: "林三心", age: 22 };

// Before
const proxyPerson = new Proxy(person, {
  get(target, key, receiver) {
    return target[key];
  },
  set(target, key, value, receiver) {
    target[key] = value;
  },
});

// After
const proxyPerson = new Proxy(person, {
  get(target, key, receiver) {
    return Reflect.get(target, key);
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value);
  },
});

console.log(proxyPerson.name); // 林三心
proxyPerson.name = "sunshine_lin";
console.log(proxyPerson.name); // sunshine_lin
