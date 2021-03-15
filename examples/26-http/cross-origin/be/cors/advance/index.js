/**
 * 进阶：
 * 1. 去除预检请求：a. 改为简单请求 b. 设置响应头 Access-Control-Max-Age
 * 2. 规定能够访问服务器的域名列表
 * 3. 请求头携带 cookie
 */

const http = require("http");
const PORT = 8088;
// 协议名必填，如果同时存在 http 和 https 两条
const allowOrigin = [
  "http://127.0.0.1:8080",
  "http://localhost:8080",
  "https://www.baidu.com"
];

// 创建一个 http 服务
const server = http.createServer((request, response) => {
  const {
    method,
    headers: { origin, cookie }
  } = request;
  if (allowOrigin.includes(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }
  // console.log(request);
  // response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080"); // 指定能够访问的源
  response.setHeader("Access-Control-Allow-Methods", "PUT"); // 预请求时，增加除了GET，POST返回允许实际请求的方法
  response.setHeader("Access-Control-Allow-Credentials", true); // 3. 允许前端请求携带 cookie
  // response.setHeader("Access-Control-Allow-Headers", "x-requested-with"); // 针对 token 的处理
  response.setHeader("Access-Control-Allow-Headers", "token"); // 针对 token 的处理
  response.setHeader("Access-Control-Max-Age", 5); // 预检请求的有效期. 在指定时间内再次跨域访问接口, 是不需要预检请求的, 单位是 秒
  response.setHeader("Content-Type", "application/json;charset=utf-8");

  console.log(cookie);
  if (method === "OPTIONS") {
    console.log("预检请求");
  } else if (!cookie) {
    // 如果不存在 cookie 就设置 cookie
    console.log("设置 cookie");
    // response.setHeader("Set-Cookie", "linjy=fe");
    response.setHeader("Set-Cookie", ["Linjy:fe", "Jecyu:be"]);
  }
  response.end(`{"name": "linjy", "friend": "crazy"}`);
});

// 启动服务，监听端口
server.listen(PORT, () => {
  console.log("服务启动成功，正在监听: ", PORT);
});
