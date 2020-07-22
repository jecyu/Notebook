/**
 * node.js 本地启动 web 服务器
 * 更改代码时，需要重启服务器
 * // todo 监测是否有 callback 参数，有就处理为 jsonp 格式，否则为普通请求
 */
const http = require("http");
const url = require("url"); // 新引入了 url 模块，用于解析请求参数上
const PORT = 8088;

// 创建一个 http 服务
const server = http.createServer((request, response) => {
  // 获取前端请求数据
  const queryObj = url.parse(request.url, true).query;
  // response.setHeader("X-Content-Type-Options", "nosniff"); // 强制浏览器检查媒体的类型
  // response.setHeader("Content-Type", "application/javaScript"); // 上面添加了强制指定，则这里需要明确指定为 JavaScript
  response.end(`${queryObj.callback}({"name": "linjy", "friend": "crazy"})`);
  // response.end(`({"name": "linjy", "friend": "crazy"})`);
});

// 启动服务，监听端口
server.listen(PORT, () => {
  console.log("服务启动成功，正在监听: ", PORT);
});
