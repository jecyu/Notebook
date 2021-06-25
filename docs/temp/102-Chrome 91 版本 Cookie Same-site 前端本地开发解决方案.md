

# 小 Tips：Chrome 91 版本 Cookie Same-Site 前端本地开发解决方案

![](https://heroku-blog-files.s3.amazonaws.com/posts/1580745160-Same-Site%20Cookie%20Infographic.png)

## 前言

最近在本地开发环境测试公司系统时，遇到了跨域问题，导致无法登录获取用户权限。原本只要是本地浏览器存储了目标服务器的cookie 信息就可以发送跨域请求，但奇怪的是，已经通过开启 CORS 同源请求的方式获取到了 cookie，在本地开发环境启动的系统依然出现了跨域情况，检查发现请求根本没有自动携带 cookie。为什么开启了 CORS，还是会出现跨域的问题呢？

文章大纲

- 分析问题

- - 跨站与跨域的区别
  - Cookie 的 Same-Site 属性

- 解决问题

- - 手动关闭 Same-Site 
  - 使用代理

## 分析问题

### 为什么会有跨域问题

 跨域本质上是 浏览器实现**同源策略（Same Origin Policy）**的一种安全手段。对于同源的定义，url 协议（protocol）、端口（port）、主机（host 域名）完全相同称为同源站点。同源策略限制了两个不同源站点的资源访问，比如前端想通过 XMLHttpRequest 将站点数据发送给不同源站点，就会产生跨域问题。

比如 A 源为：`http://store.company.com/dir/page.html`，下列与 B 源 的对比。引用自 MDN [Definition of an origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#definition_of_an_origin)

| URL                                               | Outcome     | Reason                                           |
| :------------------------------------------------ | :---------- | :----------------------------------------------- |
| `http://store.company.com/dir2/other.html`        | Same origin | Only the path differs                            |
| `http://store.company.com/dir/inner/another.html` | Same origin | Only the path differs                            |
| `https://store.company.com/page.html`             | Failure     | Different protocol                               |
| `http://store.company.com:81/dir/page.html`       | Failure     | Different port (`http://` is port 80 by default) |
| `http://news.company.com/dir/page.html`           | Failure     | Different host                                   |

而本地前端服务` http://localhost:9096` 与服务端 `http://api.backend.com` 是不同源的，存在跨域资源访问限制问题。

### 如何解决跨域问题

解决跨域问题，有很多种方式，比如使用 JSONP、CORS、Proxy 等方案。在公司的项目中，使用了 CORS 方案。

[CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS) 跨域资源共享是为了解决同源策略的网络层面限制而引入的，它是一种基于 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头的机制，该机制通过允许服务器标示除了它自己以外的其他 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/源)（域，协议和端口），这样会浏览器可以访问加载这些资源。

如何开启呢，比如一个登录 `login` 接口简单请求，浏览器发出的请求信息会添加 `origin` 字段，`Origin`字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

```
  GET /cors HTTP/1.1
+ Origin: http://api.backend.com
  Host: localhost:9096
  Accept-Language: zh-CN,zh
  Connection: keep-alive
  User-Agent: Mozilla/5.0...
  ...
```

 如果`Origin`指定的域名在许可范围内，服务器会设置响应头 `Access-Control-Allow-Origin` ，浏览器会检查这个字段，从而让 `XMLHttpRequest` 正常获得结果，否则，就会抛出错误。

```js
+ Access-Control-Allow-Origin: http://localhost:9096
Set-cookie: token=xxxx; Path=xxx
```

同时，服务器会通过 Session-Cookie 机制维护用户的登录状态，从而使用 `Set-Cookie` 种下一个 `Cookie`。

登录成功后，客户端再次发送一个 `getUser` 接口用于获取用户权限信息，要携带之前的 Cookie 发送给服务端。

由于  CORS 请求默认不发送 Cookie 和 HTTP 认证信息。所以要把 Cookie 发送到服务器，需要 ajax 请求中开发 `withCredentials` 属性 为 `true`，并且服务端要指定 `Access-Control-Allow-Credentials` 字段：

```sh
+ Access-Control-Allow-Credentials: true
```

并且`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。这样，就可以实现携带 Cookie 正常访问不同源的服务端资源了。

### 为什么开启 CORS，还会出现跨域

通过查看浏览器的 Chrome Network 发现，登录成功后，getUser 接口发送的浏览器请求没有正常携带 Cookie 字段。

这是因为 Cookie 的 Same-Site 属性，跨站与跨域的区别

## 解决问题

### 浏览器关闭 Cookie 的 Same-Site

下意识的检查是不是浏览器 same-site 的设置问题，才发现浏览器 Chrome 自动升级到了 91 版本。

91 版本不再给关闭了。

### 使用第三方代理

正向代理与反向代理

ngixn

node 服务

webpack 提供

中间件

## 拓展

### 对于跨域的问题，使用了代理服务后，CORS 还有用吗？

有用呀，只不过可以不用在目标服务器设置 CORS 了，但是代理服务器，比如 Node 服务还是需要设置的

## 小结

本质上还是解决跨域的问题，离不开业界的方案

## 参考资料

- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html) 阮一峰大佬，详细讲解了 CORS 机制对简单请求和非简单请求的两种不同处理，以及客户端和服务端的配置区别。

- [当 CORS 遇到 SameSite](https://juejin.cn/post/6844904095271288840)

  

