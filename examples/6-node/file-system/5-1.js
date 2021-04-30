const fs = require("fs");

// 异步操作读取文件
fs.unlink("./tmp/hello.txt", (err) => {
  if (err) throw err;
  console.log("successfully deleted ./tmp/hello");
});

// 同步操作
// fs.unlinkSync("./tmp/hello.txt");
// console.log("successfully deleted ./tmp/hello");
