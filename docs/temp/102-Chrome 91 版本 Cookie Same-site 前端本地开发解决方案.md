

# 小 Tips：Chrome 91 版本 Cookie Same-Site 前端本地开发解决方案

![](https://heroku-blog-files.s3.amazonaws.com/posts/1580745160-Same-Site%20Cookie%20Infographic.png)

## 前言

最近在本地开发环境测试公司系统时，遇到了跨域问题，导致无法登录获取用户权限。原本只要是本地浏览器存储了目标服务器的cookie 信息就可以发送跨域请求，但奇怪的是，已经通过开启 CORS 同源请求的方式获取到了cookie，在本地开发环境启动的系统依然出现了跨域情况，检查发现请求根本没有自动携带 cookie。为什么开启了 CORS，还是会出现跨域的问题呢？

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

### 如何解决跨域问题

解决跨域问题，有很多种方式。可以使用 CORS 解决跨域。

[CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS) 跨域资源共享是为了解决同源策略的网络层面限制而引入的，它是一种基于 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头的机制，该机制通过允许服务器标示除了它自己以外的其他 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/源)（域，协议和端口），这样会浏览器可以访问加载这些资源。

开启 CORS 后为什么还会有跨域问题？Cookie  的 Same-Site 属性

### 为什么开启 CORS，还会出现跨域

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

## 小结

## 参考资料

- https://juejin.cn/post/6844904095271288840