const express = require("express");
const WebSocket = require("ws");

/**
 * Create express app
 */
const app = express();

/**
 * Attach websocket server
 * Intercepting WebSocket requests for a http.Server
 */

const wss = new WebSocket.Server({ server: app });

/**
 * Serve your code
 */
app.use(express.static("public"));

/**
 * Listening on connections
 */
wss.on("connection", function(socket) {
  socket.on("message", function(msg) {
    console.log(" \033[96mgot:\033[39m " + msg);
    socket.send("pong");
  });
});

/**
 * Listen
 */
app.listen(3000);

// TODO WebSocket connection to 'ws://localhost:3000/' failed: Unexpected response code: 200
