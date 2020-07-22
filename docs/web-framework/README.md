# Express

Express 是一个小型又灵活的 Node.js web 应用框架，它为 web 和手机应用提供了一套丰富的功能。

- 提供了大量的 HTTP 工具方法和中间件。
- 性能方面，它提供了一层很薄的基本的 web 应用功能，而没有模糊你喜爱的 node.js 功能。
- 很多流行框架都是基于 express。

## 基础知识

### 路由

#### 路由方法

```js
// GET method route
app.get("/", function(req, res) {
  res.send("GET request to the homepage");
});

// POST method route
app.post("/", function(req, res) {
  res.send("POST request to the homepage");
});
```

路由文件
```js
const express = require("express");

const router = express.Router();
const controller = require("../controller");

router
  .route("/login") // 针对 /login 路由的get、post 采用不同的 controller 处理
  .get(controller.login)
  .post(controller.doLogin);

router.get("/verifytoken", controller.verifySsoToken);

module.exports = router;

```

### session

session 是另一种记录客户状态的机制，与 cookie 保存在客户端


### 中间件

## 进阶活用

## 项目实战

## 底层原理

### 中间件原理

## 最佳实践

## 参考资料

- [http://expressjs.com/](http://expressjs.com/) express 官网
- [Express 中间件原理详解](https://juejin.im/post/5aa345116fb9a028e52d7217)
