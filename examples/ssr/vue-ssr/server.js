const Vue = require("vue");
const koa = require("koa");
const mount = require("koa-mount");

const renderer = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("./index.template.html", "utf-8"), // 引入模版文件
});
const context = {
  title: "hello",
  meta: `
    <meta name="keyword" content="vue,ssr">
    <meta name="description" content="vue srr demo">`,
};

const app = new koa();

app.use(
  mount("/", (ctx) => {
    // 给每个客户端都返回新的 Vue 实例页面
    const app = new Vue({
      data: {
        url: ctx.url,
      },
      template: `<div>The visited URL is: {{ url }}</div>`,
    });

    renderer.renderToString(app, context, (err, html) => {
      if (err) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
      }
      ctx.body = html;
    });
  })
);
app.listen(8080);
