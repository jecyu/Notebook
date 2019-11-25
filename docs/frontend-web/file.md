# 文件处理

本质：流文件的获取和转换。

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
- 文本流是指流动的数据是以字符形式出现。

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
