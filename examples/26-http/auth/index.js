var express = require("express");
var app = express();
var router = express.Router();

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// // simple logger for this router's requests
// // all requests to this router will first hit this middleware
// router.use(function (req, res, next) {
//   console.log('%s %s %s', req.method, req.url, req.path)
//   next()
// })

// // this will only be invoked if the path starts with /bar from the mount point
// router.use('/bar', function (req, res, next) {
//   // ... maybe some additional /bar logging ...
//   next()
// })

const githubAuth = require("./api/githubAuth");
const date = require("./api/date");

router.post("/api/githubAuth", githubAuth);
router.get("/api/date", date);

app.use('/', router)
app.listen(8001, () => {
  console.log("http://localhost:8001");
});
