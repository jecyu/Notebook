/**
 * 解决收集依赖写死问题
 * 实际开发中，肯定是不止两个对象的，如果每多加一个对象，就得多加一个else if判断，那是万万不行的。那我* 们要怎么解决这个问题呢？
 * 解决方案：使用一个全局变量 activeEffect 来巧妙解决这个问题，具体是怎么解决呢？其实很简单，就是每一个 effect 函数一执行，就把自身放到对应的 dep 里，这就可以不需要写死了
 * 我们需要改装一下effect函数才行，并且要修改track函数
 */

let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  activeEffect()
  activeEffect = null; // 执行完立马变成 null
}

const targetMap = new WeakMap(); // 存放对象，每个对象会建立一个Map来存储此对象里属性的dep(使用Set来存储)
/**
 * 收集依赖
 * @param {*} target
 * @param {*} key
 */
function track(target, key) {
  // 如果此时 activeEffect 为 null 则不执行下面
  // 这里判断是为了避免例如 console.log(person.name) 而触发 track
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map())); // 使用 Map 存储 dep
  }

  let dep = depsMap.get(key); // 获取属性的 dep 依赖数组
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  dep.add(activeEffect); // 把此时的 activeEffect 添加进去
}

/**
 * 派发更新
 * @param {*} target
 * @returns
 */
function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (depsMap) {
    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach((effect) => effect());
    }
  }
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      track(receiver, key); // 访问时收集依赖
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      trigger(receiver, key); // 设置时自动通知更新
    },
  };
  return new Proxy(target, handler);
}

const person = reactive({ name: "林三心", age: 22 });
const animal = reactive({ type: "dog", height: 50 });

let nameStr1 = "";
let nameStr2 = "";
let ageStr1 = "";
let ageStr2 = "";
let typeStr1 = "";
let typeStr2 = "";
let heightStr1 = "";
let heightStr2 = "";

const effectNameStr1 = () => {
  nameStr1 = `${person.name}是个大菜鸟`;
};
const effectNameStr2 = () => {
  nameStr2 = `${person.name}是个小天才`;
};
const effectAgeStr1 = () => {
  ageStr1 = `${person.age}岁已经算很老了`;
};
const effectAgeStr2 = () => {
  ageStr2 = `${person.age}岁还算很年轻啊`;
};
const effectTypeStr1 = () => {
  typeStr1 = `${animal.type}是个大菜鸟`;
};
const effectTypeStr2 = () => {
  typeStr2 = `${animal.type}是个小天才`;
};
const effectHeightStr1 = () => {
  heightStr1 = `${animal.height}已经算很高了`;
};
const effectHeightStr2 = () => {
  heightStr2 = `${animal.height}还算很矮啊`;
};

// 触发收集依赖
// 每个effect函数改成这么执行
effect(effectNameStr1);
effect(effectNameStr2)
effect(effectAgeStr1)
effect(effectAgeStr2)
effect(effectTypeStr1);
effect(effectTypeStr2)
effect(effectHeightStr1)
effect(effectHeightStr2)

console.log(nameStr1, nameStr2, ageStr1, ageStr2);
// 林三心是个大菜鸟 林三心是个小天才 22岁已经算很老了 22岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2);
// dog是个大菜鸟 dog是个小天才 50已经算很高了 50还算很矮啊

person.name = "sunshine_lin"; // 触发更新
person.age = 18;
animal.type = "猫";
animal.height = 20;

console.log(nameStr1, nameStr2, ageStr1, ageStr2);
// sunshine_lin是个大菜鸟 sunshine_lin是个小天才 18岁已经算很老了 18岁还算很年轻啊

console.log(typeStr1, typeStr2, heightStr1, heightStr2);
// 猫是个大菜鸟 猫是个小天才 20已经算很高了 20还算很矮啊
