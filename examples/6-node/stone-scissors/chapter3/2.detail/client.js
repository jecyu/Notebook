const mount = require("koa-mount");
const static = require("koa-static");
const koa = require("koa");
const app = new koa();

app.use(mount("static", static(`${__dirname}/source/static/`)));

app.use(async (ctx) => {});

app.listen(3000);
