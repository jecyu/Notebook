/**
 * 封装 effect
 */
//  let name = '林三心', age = 22, money = 20
//  let myself = `${name}今年${age}岁，存款${money}元`

//  console.log(myself) // 林三心今年22岁，存款20元

//  money = 300

//  myself = `${name}今年${age}岁，存款${money}元` // 再执行一次

//  // 预期：林三心今年22岁，存款300元
//  console.log(myself) // 实际：林三心今年22岁，存款300元

let name = "林三心",
  age = 22,
  money = 20;
let myself = "";
const effect = () => (myself = `${name}今年${age}岁，存款${money}元`);

effect(); // 先执行一次
console.log(myself); // 林三心今年22岁，存款20元
money = 300;

effect(); // 再执行一次

console.log(myself); // 林三心今年22岁，存款300元
