/**
 * 实现 ref
 * 咱们在Vue3中是这么使用ref的
 * let num = ref(5)
 * console.log(num.value) // 5
 * 然后 num 就会成为一个响应式的数据，而且使用 num 时需要这么写 num.value 才能使用
 */

let activeEffect = null;
function effect(fn) {
  activeEffect = fn; //相当于 观察者
  activeEffect();
  activeEffect = null; // 执行完立马变成 null
}

const targetMap = new WeakMap(); // 存放对象，每个对象会建立一个Map来存储此对象里属性的dep(使用 Set来存储)
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



