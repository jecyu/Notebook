const express = require("express");
const app = express(); //  Create express app
const http = require("http").createServer(app); // http module
const io = require("socket.io")(http);

/**
 * Serve your code
 */
app.use(express.static("public"));

/**
 * Listening on connections
 */
io.on("connection", function(socket) {
  console.log("a user connected");
});

/**
 * Listen
 */
app.listen(3000);
