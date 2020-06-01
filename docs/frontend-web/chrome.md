# chrome 调试技巧

## 使用$选择器快速选择 dom

<img :src="$withBase('/images/chrome1.png')">

## Memory 面板

## Sources

### overrides

调试 dojo 项目比较方便

## Performance

## 快速查找定位文件

很多时候，在生产环境出现问题后，我们不得不在浏览器内进行调试，这时候快速定位目标文件很重要。

打开调试面板后，ctrl + p 快速查找目标文件，ctrl + F 快速查找当前文件的目标代码。

<!-- 无论是开发环境还是生产环境，使用了 webpack 打包并且开启了 source-map -->

## 参考资料

- [使用 chrome-devtools Memory 面板](https://zhuanlan.zhihu.com/p/80792297)
- [解决内存问题](https://developers.google.com/web/tools/chrome-devtools/memory-problems?hl=zh-cn#%E4%BD%BF%E7%94%A8%E5%88%86%E9%85%8D%E6%97%B6%E9%97%B4%E7%BA%BF%E7%A1%AE%E5%AE%9A_js_%E5%A0%86%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F)
