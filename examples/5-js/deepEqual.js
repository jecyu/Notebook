// 引用类型：可遍历
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";

// 引用类型：不可遍历
const dateTag = "[object Date]";
const regexgTag = "[object RegExg]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const booleanTag = "[object Boolean]";
const symbolTag = "[object symbolTag]";
const undefinedTag = "[object Undefined]";
const bigIntTag = "[object BigInt]";

function deepEqual(x, y) {
  // 1. 不同类型的比较
  const type = getType(x);
  if (type !== getType(y)) return false; // 不进行类型转换

  // 2. 同一类型
  // 2.1 基本类型
  // 2.2 基本类型的特殊情况
  // remember that NaN === NaN returns false
  // and isNaN(undefined) returns true
  // TODO 待考虑是要比较 NaN 的情况
  // if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
  //   return true;
  // }
  if (
    type === numberTag ||
    type === stringTag ||
    type === booleanTag ||
    type === symbolTag ||
    type === undefinedTag ||
    type === bigIntTag
  )
    return x === y;

  // 2.2 引用类型
  // 2.2.1 特殊的引用类型
  if (typeof x === "function" || x === null)
    return x.toString() === y.toString(); // 直接比较字符串值

  // 2.2.2 其他引用类型
  // 2.2.2.1 不可遍历类型
  if (type === dateTag) return x.getTime() === y.getTime();
  if (type === regexgTag) return x.toString() === y.toString();

  // 2.2.2.2 可遍历类型
  if (type === mapTag || type === setTag) {
    if (x.size !== y.size) return false;
    const xKeys = x.keys();
    // 比较 key
    for (let key of xKeys)
      if (y.has(key)) {
        return deepEqual(x[key], y[key]); // 深层比较值
      } else {
        return false;
      }
  }
  
  if (getType(x) === objectTag) {
    // 对象比较
    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);
    if (xKeys.length !== yKeys.length) {
      return false; // 先比较长度
    }
    for (const key in x) {
      if (y.hasOwnProperty(key) && x.hasOwnProperty(key)) {
        return deepEqual(x[key], y[key]); // 深层比较值
      } else {
        return false;
      }
    }

    if (getType(x) === arrayTag) {
      // 数组比较
      if (x.length !== y.length) return false;
      for (let i = 0; i < x.length; i++) {
        return deepEqual(x[i], y[i]);
      }
    }
  }
  return true; // 其他情况
}

function getType(target) {
  return Object.prototype.toString.call(target);
}
