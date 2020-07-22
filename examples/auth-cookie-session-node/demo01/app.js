/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-07-21 13:35:50
 * @LastEditTime: 2020-07-21 13:54:38
 * @LastEditors: Jecyu
 */

const http = require("http");

// converts string to object
// Cookie is as string type such as `name=Jecyu;year=1994` and we need to convert this to object type such as {name: 'Jecyu', year: '1994'}
const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .map(([k, ...vs]) => [k, vs.join("=")])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const app = http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  console.log(req.url, cookies);
  res.writeHead(200, { "Set-Cookie": "mycookie=test" }); // Set-Cookie asks the browser to save the cookie
  res.end("Hello Cookie");
});

module.exports = app;
