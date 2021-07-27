// console.log("start require");
// var lib = require("./lib.js");
// console.log("end require", lib);

// lib.additional = "test";

const playerAction = process.argv[process.argv.length - 1];
const game = require("./lib");
// const result = game(playerAction);

// console.log(result);

let count = 0; // 统计赢的次数
process.stdin.on("data", (e) => { // 监听连续的输入
  const playerAction = e.toString().trim();
  const result = game(playerAction);
  console.log(result);
  if (result === -1) {
    count++;
  }
  if (count === 3) {
    console.log("你太厉害了，我不玩了！")
    process.exit();
  }
});
