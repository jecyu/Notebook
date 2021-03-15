# 使用 GitHub 搭建博客指南（超详细）

App 使用指南

### 评论功能

```flow

```

```js
var express = require("express");

var app = express();

var router = express**.**Router();



//*设置跨域访问*

app**.**all('*', function(req, res, next) {

  res**.**header("Access-Control-Allow-Origin", "*");

  res**.**header("Access-Control-Allow-Headers", "X-Requested-With");

  res**.**header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

  res**.**header("X-Powered-By",' 3.2.1')

  res**.**header("Content-Type", "application/json;charset=utf-8");

  next();

});



const githubAuth = require("./api/githubAuth");

const date = require("./api/date");



router**.**get("/api/githubAuth", githubAuth);

router**.**get("/api/date", date);



app**.**use('/', router)

app**.**listen(8001, () => {

  console**.**log("http://localhost:8001");

});
```