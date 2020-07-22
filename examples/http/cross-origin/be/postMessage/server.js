/**
 * postMessage 实现跨域
 */
const http = require("http");
const fs = require("fs");
const PORT = 4000;

function getFileContent(filepath) {
  return fs.readFileSync(filepath);
}
// 创建一个 http 服务
const server = http.createServer((request, response) => {
  console.log(request);
  // 客户端对服务器的请求，对相关文件内容的请求
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end(getFileContent(__dirname + "//" + "view" + "//" + "b.html"));
});

// 启动服务，监听端口
server.listen(PORT, () => {
  console.log("服务启动成功，正在监听: ", PORT);
});
