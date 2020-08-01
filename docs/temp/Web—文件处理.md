# 文件处理

本质：JS 处理流文件的获取和转换。

头脑风暴
- 下载文件两种不同的处理，
  - 一种是直接下载，浏览器就直接保存文件，保存后再弹出下载速度了。（这个根据响应头的设置，对于 zip 文件类型，浏览器不能处理的话，会提示另保存为文件，然后继续下载）。`"Content-Type": "application/zip"。之后可以通过浏览器进行暂停、继续，这个技术原理是怎么样的？
  - 另外一种却是请求完流后，直接保存为文件了，这种体验不好。`'Content-Type', 'application/octet-stream'`。
  - 还有就是有时候这个 zip 文件是需要`服务端动态压缩文件`的，这个时候就首先要把文件夹进行压缩保存到临时磁盘里，生成一个新的请求 route 供前端用。这个时候前端首先要请求一个接口，让服务端进行压缩并返回对应的文件地址，再请求进行保存为文件。<u>因此有可能需要添加接口响应进度条，但是这个时候接口还没响应，因此也拿不到内容的下载进度条，只能说新增一个接口推送进度条，通过 websocket 推送例如文件夹压缩的进度</u>。
      
## 常见场景

- 通过 input 上传
- 文件拖拽上传
- 文件在线预览
- 文件
- 第三方接口需要

## 流

一切能被读写的都是文件，流是读取文件的抽象。流（Stream）就是指像水流一样长长的一串东西，流只有一个特征是连续的。

### 为什么要有流

假设没有流, 所有的数据都可以用二进制串来表示，这样 CPU 读取也不会慢。但是为什么要有流呢？
常见的需求比如播放视频的时候, 我们肯定是希望从硬盘(或者网络)读取一点, 播放一点, 一个视频 4GB, 要是全部载入内存才能播放, 好多人都看不成 1080p 的了.所以, 我们有充分的理由把这种读一点处理一点(以及相反的生成一点, 写入一点)的数据类型(或曰操作)抽象出来, 这就是流。

流数据最小单位也是字节（byte)。常见的有字节流、文本流、图片流、音频流、视频流、数据流。

- 图片流就是用二进制流来表示图片。
- 二进制流是指流动的是二进制数字序列。
- 文本流（字符流）是指流动的数据是以字符形式出现。
- 字节流（byte 流，1 byte = 8 bit），字节流通常用于处理二进制数据，实际上它可以处理任意类型的数据。

### 前端下载一个字节流

JS 可以通过 blob 来描述二进制数据，因此可以设置 ajax 的 responseType="blob" 格式，浏览器的ajax 会把字节流处理成一个 blob 对象。从而使 我们可以把 它 转为 blobUrl，实现下载。

#### 字节流就是二进制数据了么？

```js
const bytes=JVBERi0xLjcKCjQgMCBvYmoKPDwKL...
```

## 文件下载

拿图片为例子，存储有两种方式：

可以将图片以独立的文件的形式存储再服务求的指定文件夹中，再将路径存入数据库字段中；
也可以将图片转换成二进制流，直接存储到数据库的 `Image` 类型字段中。

那么在后端，可以直接返回该图片文件，也可以返回图片流。前端根据这两种方式进行处理。

```js
if (formCode) {
  // 表单 code
  const src = `${this.$store.getters.config.API}${this.$store.getters.config.API_FILE_DIR}rest/pas/v1/naturalRes/dataform/download/${formCode}`;
  console.log(src);
  // 创建隐藏的可下载链接;
  let eleLink = document.createElement('a');
  eleLink.download = formName;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  eleLink.href = src;
  // 触发点击
  document.body.appendChild(eleLink);
  // if (document.all) {
  // 判断是否为 IE 浏览器
  // eleLink.addEventListener('click', () => {
  //   console.log('click');
  // })
  // eleLink.click(); // 这种方式无法触发下载
  // } else
  if (document.createEvent) {
    let event = document.createEvent('MouseEvents');
    event.initEvent('click', false, true);
    eleLink.dispatchEvent(event);
  }
  // 然后移除
  this.$nextTick(() => {
    eleLink.remove();
    this.isDownLoading = false;
    logAction(logConfig.NatureAnaEva.xzcg, { targetObj: formName });
  });
} else {
  this.$Message.error('无法生成 excel 表');
}
```

## 文件在线生成

### 截图

```js
setTimeout(async () => {
  // 截图
  const printCanvas = await html2canvas(this.$el, {
    backgroundColor: '#ffffff'
  });
  dataURL = printCanvas.toDataURL('image/png');
  resolve(dataURL);
}, 1000); // 等待地图加载完成，arcgis 没提供加载完成通知
```

## 参考资料

- [玩转图片流](http://jartto.wang/2018/01/19/play-image-stream/) —— 如果你认真的看完了文章，那么以后你对图片数据的处理就会顺畅很多。
- [如何理解编程语言中「流」（stream）的概念？](https://www.zhihu.com/question/27996269) —— 流是什么，为什么要有流，能够从中探出一二。
- [前端实现批量导出图片并打包压缩功能](https://segmentfault.com/a/1190000018234223)
