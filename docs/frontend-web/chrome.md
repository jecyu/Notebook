# chrome 调试技巧

## 使用$选择器快速选择 dom

<img :src="$withBase('/images/chrome1.png')">

## Sources

### overrides

调试 dojo 项目比较方便

## Performance

## 快速查找定位文件

很多时候，在生产环境出现问题后，我们不得不在浏览器内进行调试，这时候快速定位目标文件很重要。

打开调试面板后，ctrl + p 快速查找目标文件，ctrl + F 快速查找当前文件的目标代码。

<!-- 无论是开发环境还是生产环境，使用了 webpack 打包并且开启了 source-map -->