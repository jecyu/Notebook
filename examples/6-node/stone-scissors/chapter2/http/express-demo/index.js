// const http = require("http");
const url = require("url"); // url 解析
const querystring = require("querystring");
const fs = require("fs");

const game = require("./game.js");
const express = require("express");

// 玩家胜利次数，如果超过 3，则后续往该服务器的请求都返回 500
let playerWon = 0; // 赢超过一定次数，电脑不和你玩了
let playerLastAction = null; // 出现相邻动作相同达到一定次数后，电脑不和你玩了
let sameCount = 0; // 记录相同的次数

const app = express();
// app.use(function(req, res) {});

app.get("/favicon.ico", function(req, res) {
  // 如果请求url是浏览器icon，比如 http://localhost:3000/favicon.ico的情况
  // 就返回一个200就好了
  // 浏览器默认行为
  res.status(200); // 简化
  // res.writeHead(200);
  // res.end();
  return;
});

app.get("/", function(req, res) {
  res.send(fs.readFileSync(__dirname + "/index.html", "utf-8")); // 直接传入 html
  // res.writeHead(200);
  // fs.createReadStream(__dirname + "/index.html").pipe(res); // 可读流
});

app.get(
  "/game",
  function(req, res, next) {
    // 如果请求url是游戏请求，比如 http://localhost:3000/game?action=rock的情况
    // 就要把action解析出来，然后执行游戏逻辑
    // const parsedUrl = url.parse(req.url);
    // const query = querystring.parse(parsedUrl.query);
    const query = req.query; // 省去 url、queryrstring 的处理
    const playerAction = query.action;

    // 如果统计的玩家胜利次数超过3
    // 或 sameCount
    if (playerWon >= 3 || sameCount === 9) {
      res.status(500);
      res.send("我再也不和你玩了");
      // res.writeHead(500);
      // res.end("我再也不和你玩了");
    }

    if (playerLastAction && playerAction === playerLastAction) {
      sameCount++;
      if (sameCount >= 3) {
        res.status(400);
        res.send("你作弊！");
        // res.writeHead(400);
        // res.end("你作弊！");
        sameCount = 9;
        return;
      }
    } else {
      sameCount = 0;
    }
    playerLastAction = playerAction;
    res.playerAction = playerAction;
    next();
  },
  function(req, res) {
    const playerAction = res.playerAction;
    const gameResult = game(playerAction);
    // res.writeHead(200);
    res.status(200);

    if (gameResult === 0) {
      res.send("平局!");
    } else if (gameResult === 1) {
      res.send("你赢了");
      playerWon++;
    } else {
      res.send("你输了");
    }
  }
);

app.listen(3000);
