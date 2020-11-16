/*
 * @Author: Jecyu
 * @Date: 2020-11-11 17:06:05
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-11 17:26:59
 * @FilePath: /examples/12-webpack/参数签名/main.js
 * @Description: 对参数进行签名加密和解密
 * URL Path 进行 MD5 加密然后拼接上 URL 的某个参数再进行 Base64 编码，最后得到一个字符串 sign，这个 sign 会通过 Request URL 的某个参数或 Request Headers 发送给服务器。服务器接收到请求后，对 URL Path 同样进行 MD5 加密，然后拼接上 URL 的某个参数，也进行 Base64 编码也得到了一个 sign，然后比对生成的 sign 和客户端发来的 sign 是否是一致的，如果是一致的，那就返回正确的结果，否则拒绝响应
 * salt
 */
import JSEncrypt from "jsencrypt";
// const key = await getRsaKey(); // 公钥 或其他东西
const key = "hello"
// rsa加密
const encrypt = new JSEncrypt();
encrypt.setPublicKey(key); // 使用私钥去解开，或其他东西