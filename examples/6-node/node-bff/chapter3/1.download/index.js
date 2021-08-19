const koa = require("koa");
const mount = require("koa-mount"); // mount 接收第二个参数，可以接收 koa，
const static = require("koa-static");
const fs = require("fs");

const app = new koa();

app.use(static(__dirname + "/source/")); // 匹配静态资源路径的请求输出去

// const str = fs.readFileSync(__dirname + "/source/index.html", "utf-8");
const buffer = fs.readFileSync(__dirname + "/source/index.html");
app.use(
  mount("/", (ctx) => {
    // ctx.body = fs.readFileSync(__dirname + "/source/index.html", "utf-8"); // utf-8 读出才是字符串
    // ctx.body = str; // 使用外部的，避免每次都进行读取

    // 改为 buffer 提升性能，因为在 Node 底层 设置 body 传递时也需要把字符串转为 buffer
    ctx.status = 200;
    ctx.type = "html"; // 指定为 html，这样遇到 buffer 才不会自动下载
    ctx.body = buffer; //
  })
);

module.exports = app;
