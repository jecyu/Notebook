const fs = require("fs");

fs.open("./assets/fs.js", "r", function(err, fd) {
  const readBuffer = Buffer.alloc(1024);
  const offset = 0;
  const len = readBuffer.length;
  const filePosition = 100;
  fs.read(fd, readBuffer, offset, len, filePosition, function(err, readByte) {
    console.log("读取数据总数：" + readByte + " bytes");
    // ===> 读取数据总数
    console.log(readBuffer.slice(0, readByte)); // 数据已被填充到 readBuffer 中
  });
});
