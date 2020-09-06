# 解决 overflow-x 与 overflow-y 冲突问题

<!-- 技术细节型 -->

现存的问题，现在的 paddding 设置，占用了空间，因此，背景颜色需要设置为透明。并且不能鼠标 hover 菜单的时候，又在下拉框的区域做其他事情。可以键盘操作。

负外边距会覆盖其他的元素吗？

轮播、下拉菜单、overflow 的使用等、这个可以记录下」

如何处理点击事件等等 」

负外边距实际只有设置的一半

---

padding margin 负外边距离

element-resize-detector 监听元素的缩放，js 只提供了 resize 针对window 的缩放监听。

how to clear inline block whitespace between inline-block elements

word-wrap

头脑风暴

目标读者

写作目的
- 理解负外边距的原理及应用
- 实现轮播下拉菜单的技术实现


handleMouseEnter 和 handleMouseLeave 设置给 nav 不行，因为移动菜单后就会出现问题。

```js
    handleMouseEnter() {
      const body = document.body,
        html = document.documentElement;

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      this.navScrollStyle.marginBottom = `-${2 * height}px`; // TODO 后续需要动态处理高度，根据下拉菜单的最大高度，或者动态读取，如果对整个应用的覆盖不影响，可以设置为屏幕高度，因为 marginBottom 和 paddingBottom 都不会覆盖，待研究了。
      this.navScrollStyle.paddingBottom = `${2 * height}px`;
    },
```

因为需要改成，drowdown 提供回调方法，比如 visible ，然后动态改变值。

```js
```

## 前言

## 理解负外边距的原理及应用

## 实现轮播下拉菜单

## 参考资料

- [How to get height of entire document with JavaScript?
](https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript)
- [[译] 负边距详解](https://segmentfault.com/a/1190000003942591)
- [探究负边距（negative margin）原理
](https://www.cnblogs.com/livewithit/p/6024864.html)
- [](https://stackoverflow.com/questions/6421966/css-overflow-x-visible-and-overflow-y-hidden-causing-scrollbar-issue#comment72643232_39554003)