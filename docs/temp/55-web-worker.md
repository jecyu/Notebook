# web worker 实践总结

## service worker

Service workers can only work on secure connections, that means HTTPS. But in development, you can use local server as localhost is exempted from this restriction

- 网络请求拦截
- 缓存和离线访问
- IndexedDB
- 单页面应用

### 基本示例

#### scope

Scope is nothing but a **URL path**. Any requests that starts with this URL path will be **intercepted** by service worker.

For example, if scope of service worker is / then any requests like /index.html, /main.js, /users, /assets/logo.png or any requests that starts with / (URL Prefix) will be intercepted by this service worker.

Scope is linked with domain/origin. You can not create a service worker that intercepts request for other origins.

I advice you to use **incognito window**（隐身模式） to test this application because a service worker is installed and activated only once. I will explain this phenomenon later. Relaunch incognito window if you don’t see any console log

注册 -> 安装 -> 激活 -> 使用

注册后，要更新 sw 的代码，要重启浏览器或者 开发工具取消注册。

#### 1. Network Requests Interceptor

Our service worker intercepted three requests, for /index.html, /main.js and /assets/logo.png, as all of them fall under service worker’s scope which is /.

respondWith method will return response back to the thread who requested i


Let’s say that we have modified all our static files which are (could be) cached on user’s browser. That means want to remove these cached files from user’s browser and replace with new ones. This is where activate event is useful.

## 参考资料

- [Parallel programming in JavaScript using Web Workers](https://medium.com/jspoint/achieving-parallelism-in-javascript-using-web-workers-8f921f2d26db)
- [Service Workers! Your first step towards Progressive Web Apps (PWA)](https://medium.com/jspoint/service-workers-your-first-step-towards-progressive-web-apps-pwa-e4e11d1a2e85#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NDZiMTM3NzM3Yjk3MzczOGU1Mjg2YzIwOGI2NmU3YTM5ZWU3YzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2MDUwMTk4MDUsImF1ZCI6IjIxNjI5NjAzNTgzNC1rMWs2cWUwNjBzMnRwMmEyamFtNGxqZGNtczAwc3R0Zy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNjI2MDM3MDYzNjE0NDQyNDAxMSIsImVtYWlsIjoiamVjeXUubGluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiSmFjb2IgTGluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpT19hY2xWcUhfVUwySG9YMHplV3J1d3k1ZU4zRnhPRjd5dmdoaD1zOTYtYyIsImdpdmVuX25hbWUiOiJKYWNvYiIsImZhbWlseV9uYW1lIjoiTGluIiwiaWF0IjoxNjA1MDIwMTA1LCJleHAiOjE2MDUwMjM3MDUsImp0aSI6IjFhMzczNTMxY2E0YzRiYzFkZGU3MzA5ODEwZmM0OWNjMzNlN2EzOTIifQ.WpZ5Noz4DK1Mu79SaCwWPKZlhgH6KrBwDQDplxx5wYlefPj-wq8qJfnJI0xQcmhKlHxT7pl4O7CERArVQ93CQved1czkrRyj_FY9RkqFQfNMWs_UYtGQyICNm4JuALKF14gvyzITmIHuwQSZSE0QlloZ6HoFr7T1jwmo9jPMWwfhnyU3Mm_ZF-iGCbUH7VJ73yrredqj93UU7QogAxn7vn5c_2zrnXT75YBF65mtc7Cia9djMomwMgPwCTpDBYxl-tszbyjyjrZuxtWKTsOfvRimVdpNkTMGXNxsQ05eXAN1GZfJ8CMM_Ka0XYazQw9Y4S2-1v6VWV-5MvSHyFtNGQ)
