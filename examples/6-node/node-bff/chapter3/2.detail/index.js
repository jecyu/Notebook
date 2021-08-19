/**
 * node bff 端，对前端提供 http 服务，作为客户端与后端进行 rpc 通信。
 *  */ 

const mount = require("koa-mount");
const static = require("koa-static");
const koa = require("koa");
const app = new koa();
const rpcClient = require("./client"); // rpc client 端
const template = require("./template");

const detailTemplate = template(__dirname + "/template/index.html");

app.use(mount("/static", static(`${__dirname}/source/static/`)));

// 真正的处理
app.use(async (ctx) => {
  console.log(ctx.query.columnid)
  if (!ctx.query.columnid) {
    ctx.status = 400;
    ctx.body = "invalid columnid";
    return;
  }

  const result = await new Promise((resolve, reject) => {
    rpcClient.write(
      // 发送 rpc 请求
      {
        columnid: ctx.query.columnid,
      },
      function(err, data) {
        err ? reject(err) : resolve(data);
      }
    );
  });
  ctx.status = 200;
  console.log('result ->', result);
  ctx.body = detailTemplate(result);
});

// 临时测试
// rpcClient.write(
//   // 发送 rpc 请求
//   {
//     columnid: 221,
//   },
//   function(err, data) {
//     console.log(err, data);
//   }
// );
module.exports = app;
