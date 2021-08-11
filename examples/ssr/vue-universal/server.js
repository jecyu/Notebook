// Assuming the server bundle is already built (again, ignoring build setup for now), the server usage would look like this:

const express = require("express");
const createApp = require("/path/to/build-server-bundle.js");

const renderer = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("./index.template.html", "utf-8"), // 引入模版文件
});
// const context = {
//   title: "hello",
//   meta: `
//     <meta name="keyword" content="vue,ssr">
//     <meta name="description" content="vue srr demo">`,
// };

const server = express();

server.get("*", (req, res) => {
  const context = { url: req.url }; 
 
  createApp(context).then((app) => { // server.js 
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end("Page not found");
        } else {
          res.status(500).end("Internal Server Error");
        }
      } else {
        res.end(html);
      }
    });
  });
});
server.listen(5000);
