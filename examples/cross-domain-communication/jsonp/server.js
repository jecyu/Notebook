const express = require("express");
const qs = require("querystring");
const app = express();
const port = 9000;

app.get("/login", (req, res) => {
  const params = qs.parse(req.url.split("?")[1]);
  const fn = params.callback;

  // jsonp 返回设置
  res.status(200);
  res.send(fn + "(" + JSON.stringify(params) + ")");
});

app.listen(port, () => {
  console.log(`Example app listening at http://www.codeshop.com:${port}`);
});
