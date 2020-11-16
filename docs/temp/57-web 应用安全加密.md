# web 应用安全加密

### 请求查询参数加密

腾讯方案是随机的加密函数，并且混淆加密。

1. 先非对称加密参数，再进行 js 混淆加密。
2. 缺点：
   需要分发测试环境与正式环境不同的打包代码。
   现在花费半天时间重新弄，并且混淆加密的 js 可能会有性能的影响，加了很多无用的代码。
   只要他想，还是可以通过断点调试出来。

正常一个查询请求的 URL 形如https://example.com/query?from=shenzhen&destination=beijing，爬虫开发者无需阅读JavaScript便可知道参数要如何构造。而如果请求形如https://example.com/query?params=ZnJvbT1zaGVuemhlbiZkZXN0aW5hdGlvbj1iZWlqaW5n，恶意用户在无法通过观察立即知道参数构造方法的前提下，只能阅读或需要先逆向JavaScript代码，才能知道构造参数方法。这样就达到了对数据进行保护的目的。

只能先对 proxy.config 进行加密比较靠谱。

两个步骤：

- 混淆加密源代码。
- query 参数进行加密（进行签名解析和获取）

sign 参数，这个 sign 参数可能是由当前时间信息、请求的 URL、请求的数据、设备的 ID、双方约定好的秘钥经过一些加密算法构造而成的，客户端会实现这个加密算法构造 sign，然后每次请求服务器的时候附带上这个参数。服务端会根据约定好的算法和请求的数据对 sign 进行校验，如果校验通过，才返回对应的数据，否则拒绝响应

公钥和私钥可以通过操作系统进行生成，具体见 https://www.npmjs.com/package/jsencrypt

原理是 公钥 + 密码 -》字符串

注意操作系统和编程语言的不同，看看是否会有影响。可能导致后端生成的公钥，使用 jsencrypt 解析不了。

关键是看是否采用的是同一个加密算法，比如 rsa。

```html
<!--
 * @Author: Jecyu
 * @Date: 2020-11-11 17:28:33
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-12 17:55:59
 * @FilePath: /Notebook/docs/temp/57-web 应用安全加密.md
 * @Description: 公钥加密，私钥解密。公钥和私钥可以通过操作系统进行配对。
-->
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript RSA Encryption</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/1.8.3/jquery.js"></script>
    <!-- <script src="bin/jsencrypt.min.js"></script> -->
    <script src="https://cdn.bootcdn.net/ajax/libs/jsencrypt/3.0.0-rc.1/jsencrypt.js"></script>
    <script type="text/javascript">
      // Call this code when the page is done loading.
      $(function() {
        // Run a quick encryption/decryption when they click.
        $("#testme").click(function() {
          // Encrypt with the public key...
          var encrypt = new JSEncrypt();
          encrypt.setPublicKey($("#pubkey").val());
          // jsencry 必须符合 rsa 算法生成
          // encrypt.setPublicKey('netproxy')
          // var encrypted = encrypt.encrypt('region=450103000000&regiontype=3');
          var encrypted = encrypt.encrypt($("#input").val());
          console.log("encrypted ->", encrypted);

          // Decrypt with the private key...
          var decrypt = new JSEncrypt();
          decrypt.setPrivateKey($("#privkey").val());

          var uncrypted = decrypt.decrypt(encrypted);
          console.log("uncrypted ->", uncrypted);

          // Now a simple check to see if the round-trip worked.
          if (uncrypted == $("#input").val()) {
            alert("It works!!!");
          } else {
            alert("Something went wrong....");
          }
        });
      });
    </script>
  </head>
  <body>
    <label for="privkey">Private Key</label><br />
    <textarea id="privkey" rows="15" cols="65">
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
-----END RSA PRIVATE KEY-----</textarea
    ><br />
    <label for="pubkey">Public Key</label><br />
    <textarea id="pubkey" rows="15" cols="65">
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB
-----END PUBLIC KEY-----</textarea
    ><br />
    <label for="input">Text to encrypt:</label><br />
    <textarea id="input" name="input" type="text" rows="4" cols="70">
This is a test!</textarea
    ><br />
    <input id="testme" type="button" value="Test Me!!!" /><br />
  </body>
</html>
```

### 改造的使用 base64 编码加数字加密

退一步。

A 指的才是 Base64，反的，B 才是普通字符

```js
// 编码
window.btoa("region=450103000000&regiontype=3&9");
("cmVnaW9uPTQ1MDEwMzAwMDAwMCZyZWdpb250eXBlPTMmOQ==");
// 解码
window.atob("cmVnaW9uPTQ1MDEwMzAwMDAwMCZyZWdpb250eXBlPTMmOQ==");
```

丁总，这边有个问题，前端传递过去的查询参数的值，需要对 value 进行编码。这边需要你那边对值先进行 URL 解码下，再获得 base64 的字符串。
字符串：region=450103000000&regiontype=3
加密：analysis=cmVnaW9uPTQ1MDEwMzAwMDAwMCZyZWdpb250eXBlPTM=8
url 请求并编码后：analysis=cmVnaW9uPTQ1MDEwMzAwMDAwMCZyZWdpb250eXBlPTM%3D8

混淆加密，预防断点调试，xhr 断点。

## 参考资料

- [原来浏览器原生支持 JS Base64 编码解码](https://www.zhangxinxu.com/wordpress/2018/08/js-base64-atob-btoa-encode-decode/)
- [这可能是史上最骚的 JavaScript 加密(一)
  ](https://zhuanlan.zhihu.com/p/67851318)
- [爬虫:对网站加密请求的分析](https://juejin.im/post/6844903929608667150#comment)
- [前端如何给 JavaScript 加密（不是混淆）？](https://www.zhihu.com/question/47047191)
- [以变制变——前端动态化代码保护方案探索](https://juejin.im/post/6844903617883815950)
- [总结一些网站加密和混淆技术](https://www.ershicimi.com/p/2b647cfcfeb044af14f763317cabe2f4)

```

```
