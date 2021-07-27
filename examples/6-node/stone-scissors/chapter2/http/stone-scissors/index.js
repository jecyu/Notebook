const http = require("http");
const url = require("url"); // url 解析
const querystring = require("querystring");
const fs = require("fs");

const game = require("./game.js");

let playerWon = 0; // 赢超过一定次数，电脑不和你玩了
let playerLastAction = null; // 出现相邻动作相同达到一定次数后，电脑不和你玩了
let sameCount = 0; // 记录相同的次数

http
  .createServer(function(req, res) {
    // 通过内置模块url，转换发送到该http服务上的http请求包的url，
    // 将其分割成 协议(protocol)://域名(host):端口(port)/路径名(pathname)?请求参数(query)
    const parsedUrl = url.parse(req.url);

    // 浏览器所有对这个服务器的请求，都会走到这个http.createServer的回调函数里
    // 所以这里对不同的请求url做判断，就可以处理不同url的请求的返回

    if (parsedUrl.pathname === "/favicon.ico") {
      // 如果请求url是浏览器icon，比如 http://localhost:3000/favicon.ico的情况
      // 就返回一个200就好了
      // 浏览器默认行为
      res.writeHead(200);
      res.end();
      return;
    }

    if (parsedUrl.pathname === "/game") {
      // 如果请求url是游戏请求，比如 http://localhost:3000/game?action=rock的情况
      // 就要把action解析出来，然后执行游戏逻辑
      const query = querystring.parse(parsedUrl.query);
      const playAction = query.action;

      // 如果统计的玩家胜利次数超过3
      // 或 sameCount
      if (playerWon >= 3 || sameCount === 9) {
        res.writeHead(500);
        res.end("我再也不和你玩了");
      }

      if (playerLastAction && playAction === playerLastAction) {
        sameCount++;
      } else {
        sameCount = 0;
      }
      playerLastAction = playAction;

      if (sameCount >= 3) {
        res.writeHead(400);
        res.end("你作弊！");
        sameCount = 9;
        return;
      }

      const gameResult = game(playAction);
      res.writeHead(200);

      if (gameResult === 0) {
        res.end("平局!");
      } else if (gameResult === 1) {
        res.end("你赢了");
        playerWon++;
      } else {
        res.end("你输了");
      }
    }

    if (parsedUrl.pathname === "/") {
      res.writeHead(200);
      fs.createReadStream(__dirname + "/index.html").pipe(res);
    }
  })
  .listen(3000);
