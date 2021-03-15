/**
 * node.js 本地启动 web 服务器
 * 更改代码时，需要重启服务器
 */
const http = require("http");
const PORT = 8088;

// 创建一个 http 服务
const server = http.createServer((request, response) => {
  // 1. 普通字符串打印
  //   response.end("hello world");
  // 2. 改为合法的js 文件，用于 script 标签执行
  //   response.end("console.log('hello world')");
  // 3. 用一个变量传递 json，如果使用 let 是没有添加到 window 全局变量上的
  //   response.end(`var user = { name: 'linjy', friend: 'crazy'};`);
  // 4.把变量的定义改为一个函数的执行
  response.end(`getUser( {"name": "linjy", "friend": "crazy"})`);
});

// 启动服务，监听端口
server.listen(PORT, () => {
  console.log("服务启动成功，正在监听: ", PORT);
});
