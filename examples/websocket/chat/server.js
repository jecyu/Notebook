/**
Before running:
> npm install ws
Then:
> node server.js
> open http://localhost:8080 in the browser
*/

const http = require("http");
const fs = require("fs");
const ws = new require("ws");

const wss = new ws.Server({ noServer: true });

const clients = new Set();

function accept(req, res) {
  if (
    req.url == "/ws" &&
    req.headers.upgrade &&
    req.headers.upgrade.toLowerCase() == "websocket" &&
    // can be Connection: keep-alive, Upgrade
    req.headers.connection.match(/\bupgrade\b/i)
  ) {
    // 在这里，我们仅处理 WebSocket 连接
    // 在实际项目中，我们在这里还会有其他代码，来处理非 WebSocket 请求
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == "/") {
    // index.html
    fs.createReadStream("./index.html").pipe(res);
  } else {
    // page not found
    res.writeHead(404);
    res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`new connection`);

  ws.on("message", function (message) {
    log(`message received: ${message}`);

    message = message.slice(0, 50); // max message length will be 50

    for (let client of clients) {
      client.send(message);
    }
  });

  ws.on("close", function () {
    log(`connection closed`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  http.createServer(accept).listen(8080);
} else {
  // to embed into javascript.info
  log = function () {};
  // log = console.log;
  exports.accept = accept;
}
