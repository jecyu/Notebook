const fs = require("fs");

// 打开文件
console.log("准备打开文件!");
fs.open("text.txt", "r+", function(err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log("成功打开文件");
});
