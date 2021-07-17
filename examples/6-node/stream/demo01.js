/**
 *  get 请求返回文件给客户端
 *
 *  */
//  使用 stream 流返回文件，res 也是一个 stream 对象，通过 pipe 管道将文件数据返回
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer(function(req, res) {
  const method = req.method; // 获取请求方法
  if (method === "GET") {
    // get 请求
    const filename = path.resolve(__dirname, "data.txt");
    let stream = fs.createReadStream(filename);
    stream.pipe(res); // 将 res 作为 stream 的 dest
  }
});

server.listen(8000, () => {
  console.log('http://localhost:8000')
});
