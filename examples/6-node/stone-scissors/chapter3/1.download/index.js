const koa = require("koa");
const mount = require("koa-mount"); // mount 接收第二个参数，可以接收 koa，
const static = require("koa-static");
const fs = require("fs");

const app = new koa();

app.use(static(__dirname + "/source/")); // 匹配静态资源路径的请求输出去

app.use(
  mount("/", (ctx) => {
    ctx.body = fs.readFileSync(__dirname + "/source/index.html", "utf-8"); // utf-8 读出才是字符串
  })
);
app.listen(3000);
