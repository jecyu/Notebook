# HTTP 响应请求踩坑总结

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