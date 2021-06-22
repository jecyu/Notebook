const fs = require("fs");
// 使用 string 写入文件
// fs.appendFile("message.txt", "data to append", "utf", callback);

// 使用 buffer 写入文件
fs.appendFile("./assets/message.txt", "data to append", (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
