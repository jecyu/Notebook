const http = require("http");
const fs = require("fs");
const PORT = 8088;
const path = require("path");
console.log();
// 创建一个 http 服务
const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "text/html;charset='utf-8'");
  response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader(
  //   "Content-security-Policy",
  //   "default-src 'self' 'unsafe-inline'"
  // );
  response.setHeader(
    "Content-security-Policy",
    "default-src 'self' 'unsafe-inline' data: *"
  );
  // response.setHeader(
  //   "Content-security-Policy",
  //   "default-src 'none' 'unsafe-inline'"
  // );
  // 读文件
  fs.readFile(path.resolve(__dirname, "./index.html"), function(err, data) {
    if (err) {
      console.log(`index.html loading is failed` + err);
    } else {
      // 返回 HTML 页面
      response.end(data);
    }
  });
});

// 启动服务，监听端口
server.listen(PORT, () => {
  console.log("服务启动成功，正在监听: ", PORT);
});
