# Koa

## 基础知识

### 简介

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造，致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。

### 安装

```bash
yarn add koa
```

### 应用程序

Koa 应用程序是一个包含一组`中间件函数`的对象，它是按照类似`堆栈`的方式组织和执行的。Koa 类似你可能遇到过的许多其他中间件系统，例如 Ruby 的 Rack，Connect 等，然而，<u>一个关键的设计点是在其低级中间件层提供高级“语法糖”</u>。这提高了互操作性，稳定性，并使书写中间件更加愉快。

这包括诸如内容协商，缓存清理，代理支持和重定向等常见任务的方法。尽管提供了相当多的有用的方法 Koa 仍保持来一个很小的体积，因为没有捆绑中间件。

必修的 hello world 应用：

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World'; 
});

app.listen(3000, () => {
  console.log("listen: 3000")
});
```

```ts
declare class Application<
    StateT = Application.DefaultState,
    CustomT = Application.DefaultContext
> extends EventEmitter {
    proxy: boolean;
    middleware: Application.Middleware<StateT, CustomT>[];
    subdomainOffset: number;
    env: string;
    context: Application.BaseContext & CustomT;
    request: Application.BaseRequest;
    response: Application.BaseResponse;
    silent: boolean;
    keys: Keygrip | string[];

    constructor();

    /**
     * Shorthand for:
     *
     *    http.createServer(app.callback()).listen(...)
     */
    listen(
        port?: number,
        hostname?: string,
        backlog?: number,
        listeningListener?: () => void,
    ): Server;
    listen(
        port: number,
        hostname?: string,
        listeningListener?: () => void,
    ): Server;
    listen(
        port: number,
        backlog?: number,
        listeningListener?: () => void,
    ): Server;
    listen(port: number, listeningListener?: () => void): Server;
    listen(
        path: string,
        backlog?: number,
        listeningListener?: () => void,
    ): Server;
    listen(path: string, listeningListener?: () => void): Server;
    listen(options: ListenOptions, listeningListener?: () => void): Server;
    listen(
        handle: any,
        backlog?: number,
        listeningListener?: () => void,
    ): Server;
    listen(handle: any, listeningListener?: () => void): Server;

    /**
     * Return JSON representation.
     * We only bother showing settings.
     */
    inspect(): any;

    /**
     * Return JSON representation.
     * We only bother showing settings.
     */
    toJSON(): any;

    /**
     * Use the given middleware `fn`.
     *
     * Old-style middleware will be converted.
     */
    use<NewStateT = {}, NewCustomT = {}>(
        middleware: Application.Middleware<StateT & NewStateT, CustomT & NewCustomT>,
    ): Application<StateT & NewStateT, CustomT & NewCustomT>;

    /**
     * Return a request handler callback
     * for node's native http/http2 server.
     */
    callback(): (req: IncomingMessage | Http2ServerRequest, res: ServerResponse | Http2ServerResponse) => void;

    /**
     * Initialize a new context.
     *
     * @api private
     */
    createContext<StateT = Application.DefaultState>(
        req: IncomingMessage,
        res: ServerResponse,
    ): Application.ParameterizedContext<StateT>;

    /**
     * Default error handler.
     *
     * @api private
     */
    onerror(err: Error): void;
}

```

#### 级联

Koa 中间件以更传统的方式级联，你可能习惯使用类似的工具-之前难以让用户友好地使用 node 的回调。然而，使用 async 功能，我们可以实现“真实”的中间件。对比 Connect 的实现，通过一系列功能直接传递控制，直到一个返回，**Koa 调用“下游”，然后控制流回“上游”**。

下面以 “Hello world” 的响应作为示例，当请求开始时首先请求流通过 x-response-time 和 loggin 中间件，然后继续移交控制给 response 中间件。当一个中间件调用 `next()` 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

```js
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  // console.log(ctx, next);
  await next(); // 等待下一个中间件完成
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next(); // 等待下一个中间件完成
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
})

app.use(async ctx => {
  ctx.body = 'Hello World'; // 调用玩该中间件后，开始调用 logger 、x-resonse-time 后半部分
});

app.listen(3000, () => {
  console.log("listen: 3000")
});
```

#### app.listen(...)

Koa 应用程序不是 HTTP 服务器的 1 对 1 展现。可以将一个或多个 Koa 应用程序安装在一起形成具有单个 HTTP 服务器的更大应用程序。

创建并返回 HTTP 服务器，将给定的参数传递给 Server#listen()。这些内容都记录在 [node.org](http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback)。

以下是一个无作用的 Koa 应用程序被绑定到 3000 端口：

```js
const Koa = require('koa');
const app = new Koa();
app.listen(3000);
```

这里的 app.listen(...) 方法只是以下方法的语法糖：

```js
const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
```

这意味着你可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址：

```js
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
```

#### app.use(function)

将给定的中间件方法添加到此应用程序。中间件组件是一个函数，它拦截 HTTP 服务器提供的请求和响应对象，执行逻辑，然后或者结束响应，或者把它传递给下一饿中间件组件。app 用分派器把中间件“连接”在一起。

### 上下文（Context）

Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，**这将强制中间件重现实现此通用功能。**

## 进阶活用

## 底层源流

## 参考资料

- [koa 中文文档](https://koa.bootcss.com/#introduction)