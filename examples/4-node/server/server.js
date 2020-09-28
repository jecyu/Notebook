/*
 * @Author: your name
 * @Date: 2020-09-21 17:07:47
 * @LastEditTime: 2020-09-21 18:57:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Notebook/examples/4-node/server/server.js
 */
var app = require("express")();

app.get("/", function(req, res) {
  console.log(666);
  setTimeout(() => res.send("<h1>Jecyu</h1>"), 1000 * 60 * 10);
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
