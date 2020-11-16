# HTTP 响应请求踩坑总结

## GET

### 请求查询参数加密

[](./57-web%20应用安全加密.md)

### 请求参数过长

请求参数

Http get 方法提交的数据大小长度并没有限制，Http 协议规范没有对 URL 长度进行限制。

       目前说的get长度有限制，是特定的浏览器及服务器对它的限制。

        各种浏览器和服务器的最大处理能力如下：

        IE：对URL的最大限制为2083个字符，若超出这个数字，提交按钮没有任何反应。

        Firefox：对Firefox浏览器URL的长度限制为：65536个字符。

        Safari：URL最大长度限制为80000个字符。

        Opera：URL最大长度限制为190000个字符。

        Google(chrome)：URL最大长度限制为 `8182` 个字符。

        Apache(Server)：能接受的最大url长度为8192个字符（这个准确度待定？？？）

        Microsoft Internet Information Server(IIS)：n能接受最大url的长度为16384个字符。

formData 的请求

文件上传下载

无论服务端是提供一个文件地址，还是 GET 接口，本质上的响应都是返回流或者整个文件，这两种地址都可以通过 a 标签下载的。

```js
 /**
     * @description: 直接请求文件路径进行下载
     * @param {*} taskId
     * @return {*}
     */
    downloadByPath(taskId) {
      const src = `${this.$store.getters.config.API}${
        this.$store.getters.config.API_FILE_DIR
      }rest/pas/private/workSpace/v1/result/download/${taskId}`;

      // 创建隐藏的可下载链接;
      let eleLink = document.createElement("a");
      eleLink.download = this.formData.attachmentName;
      eleLink.style.display = "none";
      eleLink.href = src;
      eleLink.click();
    },
```

下面这种方式的好处，可以通过 ajax 的下载进度回调函数，进行下载进度显示，需要设置 `xhr.responseType = 'blob'`

```js
    /**
     * @description: 下载附件，后端返回流模式
     * @param {*} taskId
     * @return {*}
     */
    async download(taskId) {
      this.isdownLoading = true;
      try {
        const data = await downloadGetTaskFile(taskId);
        this.isdownLoading = false;
        if (data) {
          const { blob, name } = data;
          saveAs(blob, name);
        }
      } catch (err) {
        this.isdownLoading = false;
        this.$Message.error(err.message);
      }
    },
```

## 参考资料

- [如何处理Get请求参数过长](https://blog.csdn.net/qq_38669394/article/details/108236189)