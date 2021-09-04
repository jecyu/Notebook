/**
 * 实现 computed
 * let num1 = ref(5)
 * let num2 = ref(8)
 * let sum1 = computed(() => num1.value * num2.value)
 * let sum2 = computed(() => sum1.value * 10)
 */

let activeEffect = null;
function effect(fn) {
  activeEffect = fn; //相当于 观察者
  activeEffect();
  activeEffect = null; // 执行完立马变成 null
}

const targetMap = new WeakMap(); // 1. 存放对象，每个对象会建立一个Map来存储此对象里属性的dep(使用 Set来存储)
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

function ref(initValue) {
  return reactive({
    value: initValue,
  });
}

function computed(fn) {
  const result = ref();
  effect(() => (result.value = fn())); // 执行 computed 传入函数，fn 里面有被 computed 依赖的属性，执行 fn 时会触发 computed 依赖收集
  return result;
}

let num1 = ref(5);
let num2 = ref(8);
let sum1 = computed(() => num1.value * num2.value); // 40
let sum2 = computed(() => sum1.value * 10); // 400

num1.value = 10;

console.log(sum1.value); // 80
console.log(sum2.value); // 800

num2.value = 16;

console.log(sum1.value); // 160
console.log(sum2.value); // 1600
