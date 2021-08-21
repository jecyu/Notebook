const http = require("http");
const fs = require("fs");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(fs.readFileSync(__dirname + "/index.html", "utf-8"));
  })
  .listen(3000, () => {
    console.log("listened on 3000");
  });
