const http = require("http");
const fs = require("fs");

http
  .createServer(function(req, res) {
    if (req.url === "/favicon.ico") {
      // 浏览器默认行为
      res.writeHead(200);
      res.end();
      return;
    }
    console.log(req.url);
    res.writeHead(200);
    fs.createReadStream(__dirname + "/index.html").pipe(res);
    // res.end("hello");
  })
  .listen(3000);
