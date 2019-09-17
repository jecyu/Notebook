# 文件处理

## 文件下载

```js
if (formCode) {
        // 表单 code
        const src = `${this.$store.getters.config.API}${
          this.$store.getters.config.API_FILE_DIR
        }rest/pas/v1/naturalRes/dataform/download/${formCode}`;
        console.log(src);
        // 创建隐藏的可下载链接;
        let eleLink = document.createElement("a");
        eleLink.download = formName;
        eleLink.style.display = "none";
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
          let event = document.createEvent("MouseEvents");
          event.initEvent("click", false, true);
          eleLink.dispatchEvent(event);
        }
        // 然后移除
        this.$nextTick(() => {
          eleLink.remove();
          this.isDownLoading = false;
          logAction(logConfig.NatureAnaEva.xzcg, { targetObj: formName });
        });
      } else {
        this.$Message.error("无法生成 excel 表");
      }
```