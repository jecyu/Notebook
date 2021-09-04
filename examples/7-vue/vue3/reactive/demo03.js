/**
 * track 和 trigger
 * 用track函数把所有依赖于money变量的effect函数都收集起来，放在dep里，dep为什么用Set呢？因* 为Set可以自动去重。搜集起来之后，以后只要money变量一改变，就执行trigger函数通知dep里所有* 依赖money变量的effect函数执行，实现依赖变量的更新。
 */
let name = "林三心",
  age = 22,
  money = 20;
let myself = "",
  ohtherMyself = "";
const effect1 = () => (myself = `${name}今年${age}岁，存款${money}元`);
const effect2 = () => (ohtherMyself = `${age}岁的${name}居然有${money}元`);

const dep = new Set();
function track() {
  dep.add(effect1);
  dep.add(effect2);
}
function trigger() {
  dep.forEach((effect) => effect());
}
track(); //收集依赖
effect1(); // 先执行一次
effect2(); // 先执行一次
console.log(myself); // 林三心今年22岁，存款20元
console.log(ohtherMyself); // 22岁的林三心居然有20元
money = 300;

trigger(); // 通知变量 myself 和 otherMyself 进行更新

console.log(myself); // 林三心今年 22 岁，存款300元
console.log(ohtherMyself); // 22岁的林三心居然有300元
