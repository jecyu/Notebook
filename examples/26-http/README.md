# http 例子说明

## 跨域

同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。
[浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy#%E8%B7%A8%E6%BA%90%E8%84%9A%E6%9C%ACAPI%E8%AE%BF%E9%97%AE)

### JSONP

JSONP 这种方法相对比较原始, 优点是兼容性好, 兼容 IE 6 。
其缺点有: 只支持 GET 请求, 配置繁琐(前后端都需要调整代码), 在 window 上注册各种回调函数, 开发体验差等

### CROS

> 跨域资源共享(CORS) 背后的基本思想，就是使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是成功还是失败
> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

IE 10 提供了对规范的完整支持，但在较早版本（8 和 9）中，CORS 机制是借由 XDomainRequest 对象完成的。
