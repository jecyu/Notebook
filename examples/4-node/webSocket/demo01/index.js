/*
 * @Author: Jecyu
 * @Date: 2020-09-04 11:11:57
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-09-24 14:41:37
 * @FilePath: /examples/4-node/webSocket/demo01/index.js
 */
var app = require("express")();
var WebSocket = require("ws");

var wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", function connection(ws) {
  let syncStatus = "idle"; // idle, fulfilled, rejected, pending // 同步状态、连接错误 // 这里的同步状态应该放到外层随时更新维护，这里只是模拟，每次连接成功，都重置状态。实际情况下，如果每次
  console.log("server: receive connection.");
  ws.send(syncStatus);
  async function syncOperation() {
    return new Promise((resolve, reject) => {
      syncStatus = "pending";
      setTimeout(() => {
        syncStatus = "fullfilled";
        resolve();
      }, 5000);
      // setTimeout(() => {
      //   reject((syncStatus = "rejected"));
      // }, 2000);
    });
  }

  ws.on("message", async function incoming(message) {
    if (message === "ping") {
      ws.send("pong");
    }
    if (message === "status") {
      ws.send(syncStatus);
    }
    if (message === "sync") {
      if (syncStatus === "pending") return;
      await syncOperation();
    }
  });
});

app.get("/", function(req, res) {
  res.sendfile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
