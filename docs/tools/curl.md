<!--
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-02-27 18:18:58
 * @LastEditTime: 2020-02-27 21:52:10
 * @LastEditors: Jecyu
 -->

# curl

## GET请求

```bash
curl 127.0.0.1:8899/index.html?name=jack
```

## 显示响应头信息

`-i` 显示响应头信息和body内容，`-I` 只显示响应头信息
```bash
curl -i www.sina.com

//结果
HTTP/1.1 301 Moved Permanently
Server: nginx
Date: Mon, 21 Mar 2016 05:14:26 GMT
Content-Type: text/html
Location: http://www.sina.com.cn/
Expires: Mon, 21 Mar 2016 05:16:26 GMT
Cache-Control: max-age=120
Age: 109
Content-Length: 178
X-Cache: HIT from ctc.nj.1cf2.176.spool.sina.com.cn

<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

## 显示通信过程

-v参数可以显示一次http通信的整个过程，包括端口连接和http request头信息。

```bash
curl -v www.sina.com

* Rebuilt URL to: www.sina.com/
*   Trying 202.102.75.147...
* Connected to www.sina.com (202.102.75.147) port 80 (#0)
> GET / HTTP/1.1
> Host: www.sina.com
> User-Agent: curl/7.43.0
> Accept: */*
>
< HTTP/1.1 301 Moved Permanently
< Server: nginx
< Date: Mon, 21 Mar 2016 05:18:43 GMT
< Content-Type: text/html
< Location: http://www.sina.com.cn/
< Expires: Mon, 21 Mar 2016 05:20:43 GMT
< Cache-Control: max-age=120
< Age: 50
< Content-Length: 178
< X-Cache: HIT from ctc.nj.1cf2.179.spool.sina.com.cn
<
<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>nginx</center>
</body>
</html>
* Connection #0 to host www.sina.com left intact
查看更详细的通信过程, 并保存至文件

curl --trace-ascii output.txt www.sina.com
```

## ftp下载上传

```bash
curl -u name:passwd ftp://ip:port/path/file

curl -T localfile -u name:passwd ftp://upload_site:port/path/
```

## 参考资料

- [curl 官网](https://curl.haxx.se/docs/manual.html)
- [Everything curl](https://ec.haxx.se/usingcurl/usingcurl-uploads) 关于 curl 的电子书
- [MAC之http命令行工具curl](http://coderlt.coding.me/2016/03/22/mac-command-curl/)