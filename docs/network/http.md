# HTTP

为了请求和响应数据，客户端和服务器通过 HTTP 来完成一系列的数据交换，不要认为 HTTP 负责数据传输，它实际上负责数据请求和响应，真正的数据传输由其他网络层处理。

Web 主要包括三个技术，分别是 HTML、URL、HTTP。

## HTTP 版本

### HTTP/0.9

这是 HTTP 最早大规模使用的版，现已过时。在这个版本中 只有 GET 一种请求方法，在 HTTP 通讯也没有指定版本号，也不支持请求头信息。该版本不支持 POST 等方法，因此客户端向服务器传递信息的能力非常有限。HTTP/0.9 的请求只有如下一行：

```
GET www.itbilu.com
```

### HTTP/1.0

这个版本是第一个在 HTTP 通讯中指定版本号的协议版本，HTTP/1.0 至今仍被广泛采用，特别是在代理服务器中。

HTTP/1.0 支持：GET、POST、HEAD 三种 HTTP 请求方法。

### HTTP/1.1

HTTP/1.1 是当前正在使用的版本。`该版本默认采用持久连接，并能很好地配合代理服务器工作。还支持以管道方式同时发送多个请求，以便降低线路负载，提高传输速度。`

HTTP/1.1 新增了：`OPTIONS、PUT、DELETE、TRACE、CONNECT`五种 HTTP 请求方法。

### HTTP/2

这个版本是最新发布的版本，于今年 5 月（2015 年 5 月）做 HTTP 标准正式发布。HTTP/2 通过支持请求与相应的多路重用来减少延迟，通过压缩 HTTP 头字段将协议开销降到最低，同时增加了对请求优先级和服务器端推送的支持。

## HTTP 请求方法

在 HTTP 的发展过程中，出现了很多 HTTP 版本，其中的大部分协议都是向下兼容的。在进行 HTTP 请求时，客户端在请求时会告诉服务器它采用的协议版本号，而服务器则会在使用相同或者更早的协议版本进行响应。

### 方法

名称解释：

- 幂等：对同一个系统，使用同样的条件，一次请求和重复的多次请求对系统资源的影响是一致的。

| 方法    | 说明                                                                                                                                                                                                                                                                                                                                               |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET     | GET 请求会显示请求指定的资源。一般来说 GET 方法应该只用于数据的读取，而不应当用于会产生副作用的非幂等的操作中。它期望的应该是而且应该是安全的和幂等的。这里的安全指的是，请求不会影响到资源的状态。                                                                                                                                                |
| HEAD    | HEAD 方法与 GET 方法一样，都是向服务器发出指定资源的请求。但是，服务器在响应 HEAD 请求时不会回传资源的内容部分，即：响应主体。这样，我们可以不传输全部内容的情况下，就可以获取服务器的响应头信息。HEAD 方法常被用于客户端查看服务器的性能。                                                                                                        |
| POST    | POST 请求会 向指定资源提交数据，请求服务器进行处理，如：表单数据提交、文件上传等，请求数据会被包含在请求体中。POST 方法是非幂等的方法，因为这个请求可能会创建新的资源或/和修改现有资源。                                                                                                                                                           |
| PUT     | PUT 请求会身向指定资源位置上传其最新内容，PUT 方法是幂等的方法。通过该方法客户端可以将指定资源的最新数据传送给服务器取代指定的资源的内容。                                                                                                                                                                                                         |
| DELETE  | DELETE 请求用于请求服务器删除所请求 URI（统一资源标识符，Uniform Resource Identifier）所标识的资源。DELETE 请求后指定资源会被删除，DELETE 方法也是幂等的。                                                                                                                                                                                         |
| CONNECT | CONNECT 方法是 HTTP/1.1 协议预留的，能够将连接改为管道方式的代理服务器。通常用于 SSL 加密服务器的链接与非加密的 HTTP 代理服务器的通信。                                                                                                                                                                                                            |
| OPTIONS | OPTIONS 请求与 HEAD 类似，一般也是用于客户端查看服务器的性能。 这个方法会请求服务器返回该资源所支持的所有 HTTP 请求方法，该方法会用'\*'来代替资源名称，向服务器发送 OPTIONS 请求，可以测试服务器功能是否正常。**JavaScript 的 XMLHttpRequest 对象进行 CORS 跨域资源共享时，就是使用 OPTIONS 方法发送嗅探请求，以判断是否有对指定资源的访问权限。** |
| TRACE   | TRACE 请求服务器回显其收到的请求信息，该方法主要用于 HTTP 请求的测试或诊断。                                                                                                                                                                                                                                                                       |
| PATCH   | PATCH 方法出现的较晚，它在 2010 年的 RFC 5789 标准中被定义。PATCH 请求与 PUT 请求类似，同样用于资源的更新。二者有以下两点不同：1.PATCH 一般用于资源的部分更新，而 PUT 一般用于资源的整体更新。2.当资源不存在时，PATCH 会创建一个新的资源，而 PUT 只会对已在资源进行更新。                                                                          |

### 注意

- GET 可提交的数据量受到 URL 长度的限制，HTTP 协议规范没有对 URL 长度进行限制。这个限制是特定的浏览器及服务器对它的首先是。
- 理论上讲，POST 是没有大小限制的，HTTP 协议规范也没有进行大小限制，出于安全考虑，服务器软件在实现时会做一定的限制。

HTTP 协议 未规定 GET 和 POST 的长度限制
GET 的最大长度显示是因为 浏览器和 web 服务器限制了 URI 的长度
不同的浏览器和 WEB 服务器，限制的最大长度不一样
要支持 IE，则最大长度为 2083byte，若只支持 Chrome，则最大长度 **8182**byte

作者：izhongxia
链接：https://www.jianshu.com/p/512389822f8b
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## POST 请求

HTTP 协议中规定 POST 提交的数据必须在 body 部分中，但是协议中没有规定数据使用哪种编码方式或者数据格式。实际上，开发者完全可以自己决定消息主体的格式，只要最后发送的 HTTP 请求满足该有的格式就可以。

但是，数据发送出去，还要服务端解析成功才有意义。一般服务端语言如 php、python 等，以及它们的 framework，都内置了自动解析常见数据格式的功能。**服务端通常是根据请求头（headers）中的 `Content-Type` 字段来获知请求中的消息主体是何种方式编码，再对主体进行解析**。所以说到 POST 提交数据方案，包含了 Content-Type 和消息主体编码方式两部分。数据格式有：

### application/x-www-form-urlencoded

这应该是最常见的 POST 提交数据的方式。浏览器的原生 `<form>` 表单，如果不设置 `enctype` 属性，那么最终就会以 `application/x-www-form-urlencoded` 方式提交数据。

```
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

首先，Content-Type 被指定为 application/x-www-form-urlencoded; 其次，提交的数据按照 `key1=val1&key2=val2`的方式进行编码，key 和 val 都进行了 URL 转码。可以看到 body 当中的内容和 GET 请求是完全相同的。大部分服务端语言都对这种方式都有很好的支持。

很多时候，我们用 Ajax 提交数据时，也是使用这种方式，例如过 JQuery 和 QWrap 的 Ajax，Content-Type 默认值都是 `application/x-www-form-urlencoded;charset=utf-8`。

### multipart/form-data

这又是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让`<form>` 表单的 enctype 等于 multipart/form-data。直接来看一个请求示例

```bash
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

首先生成了一个 boundary 用于分割不同的字段，为了避免与正文内容重复，boundary 很长很复杂。然后 Content-Type 里指明了数据是以 multipart/form-data 来编码，本次请求的 boundary 是什么内容。消息主体里按照字段个数又分为多个结构类似的部分，每部分都是以 --boundary 开始，紧接着是内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。如果传输的是文件，还要包含文件名和文件类型信息。消息主体最后以 --boundary-- 标示结束。

这种方式一般用来上传文件，各大服务端语言对它也有着良好的支持。

**上面提到的这两种 POST 数据的方式，都是浏览器原生支持的，而且现阶段标准中原生`<form>` 表单也只支持这两种方式（通过 `<form>` 元素的 `enctype` 属性指定，默认为 `application/x-www-form-urlencoded`。其实 `enctype` 还支持 `text/plain`，不过用得非常少）。**

随着越来越多的 Web 站点，尤其是 WebApp，全部使用 Ajax 进行数据交互之后，我们完全可以定义新的数据提交方式，给开发带来更多便利。

### application/json

`application/json` 这个 `Content-Type` 作为响应头大家肯定不陌生。实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 `JSON` 字符串。由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 `JSON.stringify`，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。

**JSON 格式支持比键值对复杂得多的结构化数据，这一点也很有用。**

```
POST http://www.example.com HTTP/1.1
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}   // chrome network 点击 view source 查看
```

这种方案，可以方便的提交复杂的结构化数据，特别适合 RESTful 的接口。各大抓包工具如 Chrome 自带的开发者工具、Firebug、Fiddler，都会以树形结构展示 JSON 数据，非常友好。

### text/xml

它是一种使用 HTTP 作为传输协议，`XML` 作为编码方式的远程调用规范。典型的 XML-RPC 请求是这样的：

```xml
POST http://www.example.com HTTP/1.1
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
        <param>
            <value><i4>41</i4></value>
        </param>
    </params>
</methodCall>
```

XML-RPC 协议简单、功能够用，各种语言的实现都有。它的使用也很广泛，如 WordPress 的 XML-RPC Api，搜索引擎的 ping 服务等等。JavaScript 中，也有现成的库支持以这种方式进行数据交互，能很好的支持已有的 XML-RPC 服务。不过，XML 结构还是过于臃肿，一般场景用 JSON 还是会更灵活方便。

## ping

### 应用场景

在默认的请求上， 浏览器只能访问以下默认的 响应头

- Cache-Control

- Content-Language

- Content-Type

- Expires

- Last-Modified

- Pragma

如果想让浏览器能访问到其他的 响应头的话 需要在服务器上设置 Access-Control-Expose-Headers

- `Access-Control-Expose-Headers : 'Authorization'`

```bash
HTTP/1.1 200
X-Application-Context: application:prod:8080
Access-Control-Expose-Headers: Content-Disposition
Content-Disposition: attachment;filename=1586853275291.zip
Set-Cookie: SESSION=364deeec-505c-44f3-a75e-9875ef7bb46d; Path=/dgp-server-web-nr/; HttpOnly
Content-Type: application/x-msdownload; =;charset=utf-8
Transfer-Encoding: chunked
Content-Encoding: gzip
Vary: Accept-Encoding
Date: Tue, 14 Apr 2020 08:34:35 GMT
```

例如上面这里 `Content-Disposition` 对于前端保存二进制文件很重要，可以获取到该二进制文件的名称以及文件类型，从而进行保存。

```js
const reg = /filename=(\S.*?\.\w+)$/;
const fileInfo = headers["content-disposition"];
const filename = fileInfo && fileInfo.match(reg);
resolve({
  blob: data,
  name: filename ? decodeURI(filename[1]) : "DistTemplate",
});
const { blob, filename } = data;
saveAs(blob, filename);
```

因此针对下载的接口，服务端需要统一添加 `Access-Control-Expose-Headers: Content-Disposition`，前端需要获取这个头的信息，进行文件的保存。

- [Vuejs 之 axios 获取 Http 响应头](https://segmentfault.com/a/1190000009125333)

### 常见状态码

301，搜索引擎可以根据 301 更改失效的路径。

#### 100 ～ 199——信息性状态码

#### 200 ～ 299——成功状态码

客户端发起请求时，这些请求通常都是成功的。服务器有一组用来表示成功的状态码，分别对应不同类型的请求。

| 状态码 | 原因短语   | 含义                                                                                                                                     |
| ------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 200    | OK         | 请求没问题，实体的主体部分包含了所请求的资源                                                                                             |
| 204    | No Content | 响应报文中包含若干首部和一个状态行，但没有实体的主体部分。主要用于在浏览器不转为显示新文档的情况下，对其进行更新（比如刷新一个表单页面） |

#### 300 ～ 399——重定向状态码

#### 400 ～ 499——客户端错误

有时客户端会发送一些服务器无法处理的东西，比如格式错误的请求报文，或者是最常见的是，请求一个不存在的 URL。

浏览器网页时，我们都看过 404 Not Found 错误码——这只是服务器在告诉我们，它对我们请求的资源一无所知。

很多客户端错误都是由浏览器来处理的，甚至不会打扰到你。只有少量错误，比如 404，还是会穿过浏览器来到用户面前。

| 状态码 | 原因短语     | 含义                                                                                                                                                           |
| ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400    | Bad Request  | 用于告知客户端它发送了一个错误的请求                                                                                                                           |
| 401    | Unauthorized | 与适当的首部一同返回，在这些首部中请求客户端在获取对资源的访问权之前，对自己进行认证。                                                                         |
| 403    | Forbidden    | 用于说明请求被服务器拒绝了。如果服务器想说明为什么拒绝请求，可以包含实体的主体部分来对你原因进行描述。但这个状态码通常是在服务器不想说明拒绝原因的时候使用的。 |

#### 500 ～ 599——服务器错误

## Cookie

![](../.vuepress/public/images/2020-07-15-14-37-25.png)

## HTTP/1.1

## HTTPS

从 HTTP 升级到 HTTPS，并不是让 Web 服务器支持 HTTPS 协议这么简单，还需要考虑 CDN、负载均衡、反向代理等服务器。同时要考虑在何种设备上部署证书及私钥，涉及网络架构和应用架构的变化。这些都需要考虑合理性，尤其要兼顾访问速度与系统安全性。在部署的过程中还必须保持业务的连续性，不能中断业务，要稳定地响应用户请求，做好 HTTPS 和 HTTP 的过渡和兼容。还要考虑 Referer、Cookie 等数据如何保持一致，如何避免出现访问故障。



从上图可以看出，我们使用 HTTP 传输的内容很容易被中间人窃取、伪造和篡改，通常我们把这种攻击方式称为中间人攻击。

具体来讲，在将 HTTP 数据提交给 TCP 层之后，数据会经过用户电脑、WiFi 路由器、运营商和目标服务器，在这中间的每个环节中，数据都有可能被窃取或篡改。比如用户电脑被黑客安装了恶意软件，那么恶意软件就能抓取和篡改所发出的 HTTP 请求的内容。或者用户一不小心连接上了 WiFi 钓鱼路由器，那么数据也都能被黑客抓取或篡改。

对称加密：双方均有相同的秘钥，两边都知道如何将密文加密和解密。

非对称加密：有公钥和私钥之分，公钥加密，私钥解密。



**HTTP 的安全问题**：

- 数据没有加密
- 无法验证身份。
  - 由于通信双方无法确认对方，实现 HTTP 应用非常灵活，也产生了很多中间设备，比如代理服务器、网关服务器，这些中间设备对于丰富和加速 HTTP 网站有着巨大的作用。
- 数据容易纂改。（考虑哈希算法验证）

### 密码学

- 机密性
- 完整性
- 身份验证
- 不可抵赖性

##### OpenSSL

密码学原理是公开的，在工程上需要实现各种算法，最著名的就是 OpenSSL 项目，包括了底层密码库和命令行工具，大部分 Linux 发行版都预装了 OpenSSL 库。

#### 随机数

随机数的类型

| 名称                 | 生成类型 | 特性                                   | 说明               |
| -------------------- | -------- | -------------------------------------- | ------------------ |
| 真正的随机数生成器   | 硬件生成 | 效率高、随机性、不可预测性、不可重现性 | 需要从物理设备获取 |
| 伪随机数生成器       | 软件生成 | 效率高、随机性                         | 通过算法获取       |
| 密码学伪随机数生成器 | 软件生成 | 效率高、随机性、不可预测性             | 用于密码学         |

##### **随机数工作原理**

随机数生成器内部会维护一个状态（internal state），对于 TRNG（True Random Number Generator） 来说，内部状态的数值来自外部设备，称为熵（entrory），比如动态的时间、变化的温度、声音的变化、鼠标位置。

而对于 PRNG（Preudo Random Number Generator） 来说，内部状态的数值来自于模拟的数值，称为种子（seed）。随机数生成器每次生成随机数的时候，内部状态的值都会变化，这样才能产生不一样的随机数。如果每次熵和种子是一样的，生成的随机数也是相同的，所以熵和种子对于随机数生成器非常重要。

**密码学算法中的随机数**

| 名称             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| 密钥             | 对称加密算法、公开密钥算法、MAC 算法都会用到密钥，密钥本质上是一个随机数。 |
| 初始化向量（IV） | 块密码算法中很多迭代模式会使用 IV                            |
| nonce            | 块密码算法中的 CTR 模式、AEAD 加密模式也会用到 nonce         |
| salt             | 基于口令的加密算法会用到，通过 salt 生成一个密钥             |

#### Hash 算法

随机数生成算法和密码学 Hash 算法都是密码学中的基础算法，很多其他的密码学算法选择这两个算法作为加密基元（Cryptographic Primitives）。

| 算法名称           | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| MAC 消息验证码     | HMAC 就是一个基于 Hash 算法实现的 MAC 算法                   |
| 伪随机数生成器     | 利用 Hash 算法的单一性特点，可以构造出一个随机数             |
| 基于口令的加密算法 | 可以通过口令和 Hash 算法生成一个密钥                         |
| 数字签名           | 数字签名算法对 Hash 算法生成的摘要值进行签名                 |
| 块密码和加密算法   | 基于 Hash 算法也能生成块密码加密算法，同时块密码加密算法也能生成一个 Hash 算法 |

**摘要/散列值/指纹 = hash（消息）**

从密码学的角度考虑，Hash 算法能够实现密码学的某个目标，那就是消息防篡改。

Hash 算法的用途

- 文件比较 MD5
- 身份校验（存储口令的哈希到数据库，但也有安全风险）

#### 对称加密算法

所谓数据加密，就是将一段数据处理成无规则的数据，除非有关键的密钥，否则谁也无法得知规则数据的真实含义。

在密码学中，用于数据加密的算法主要有两种，分别是对称加密算法（Symmetric-key Algorithms）和非对称加密算法（Asymmetrical Cryptography）。

什么是对称加密算法呢？一般是通过一个算法和一个密钥（secret key）对明文（plaintext）进行处理，得到的不规则字符就是密文（ciphertext）。

```js
密文 = E (明文，算法，密钥)

明文 = D（密文，算法，密钥）
```

对称加密算法有两种类型，分别是块密码算法（block ciphers）和流密码算法（stream ciphers）。

AES 算法是对称加密算法的标准算法。

### 加密算法怎么做？

### **为什么要添加数字证书**🌟

（60s）

1. 我要打开极客时间的官网，但是黑客通过 DNS 劫持将极客时间官网的 IP 地址替换成了黑客的 IP 地址，这样我访问的其实是黑客的服务器了，
2. 黑客就可以在自己的服务器上实现公钥和私钥，而对浏览器来说，它完全不知道现在访问的是个黑客的站点。

### **证书申请和验证**

（60s）

1. 服务器生成一对公钥和私钥，私钥自己保存，通过公钥+企业+网站信息去CA机构申请证书。
2. CA机构通过全方位的验证给这个网站颁发证书，证书内容包括企业信息、证书有效期、证书编号，ca 使用自己的私钥加密上述信息的摘要、网站的公钥。服务器就获得了CA的认证。
3. 浏览器认证证书过程：浏览器从服务器拿到网站的证书，通过**CA的公钥解**密证书信息的摘要跟使用摘要算法计算企业信息等的摘要对比，如果一致则证明证书有效。

### **证书签名过程**

1. 首先 CA 使用 **Hash 函数**来计算网站提交的明文信息，并得出**信息摘要**；
2. 然后 CA 再使用它的**私钥**对信息摘要进行加密，加密后的密文就是 CA 颁给极客时间的数字签名。

node 实现（todo，自生成证书验证）

```js
// curl -k https://localhost:8000/
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'), // 实现
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

## HTTP2

《HTTP/2基础教程》

## 参考资料

- [半小时搞懂 HTTP、HTTPS和HTTP2](https://juejin.cn/post/6894053426112495629#heading-36)
- [HTTP 请求方法详解](https://juejin.im/entry/5b004085f265da0b886daf7c)
- [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types) -- 浏览器通常使用 MIME 类型（而不是文件扩展名）来确定如何处理 URL。
- [聊一聊 cookie](https://segmentfault.com/a/1190000004556040)
- 《深入浅出 HTTPS从原理到实战》
