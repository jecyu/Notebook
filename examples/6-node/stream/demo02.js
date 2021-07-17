// 文件操作
// 创建可读数据流 `readStream`，一个可写数据流 `writeStream`，通过 `pipe` 管道把数据流转过去
const fs = require("fs");
const path = require("path");

// 两个文件名
const filename1 = path.resolve(__dirname, "data.txt");
const filename2 = path.resolve(__dirname, "data-bak.txt");
// 读取文件的 stream 对象
const readStream = fs.createReadStream(filename1);
// 写入文件的 stream 对象
const writeStream = fs.createWriteStream(filename2);
// 通过 pipe 执行拷贝，数据流转
readStream.pipe(writeStream);
// 数据读取完成监听，即拷贝完成
readStream.on("end", function() {
  console.log("拷贝完成");
});
