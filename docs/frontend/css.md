# css

## 统一字体

采用 CSS3 的 @font-face 属性解决。
一般情况下电脑系统上的字体能够满足我们的基本需求，但往往还是会出现例外：客户电脑不支持我们整个网页设计的标准字体，这时最好的办法是在线下载，生成支持我们设定的字体。CSS3的 @font-face 就能帮助我们利用服务器端字体，达到支持设定字体的需求：（此处用区别较大的字体显示是否成功在线加载）
```css

@font-face: {
  font-family: 'custom-font',
  src: local('custom-font') url('xxxx/xxx.tff')
}

body {
  font-family: 'custom-font'
}
```
@font-face 中的font-family 相当于一个声明的效果，这里指定的字体是将会被用于 font 或 font-family 属性中，也就是说，当我们需要自定义一个字体时，是需要在这里声明一次，才能继续在 body 里的 fong-family 使用， 否则它还是一个系统找不到的字体。

## html css 文字过多用省略号代替，当鼠标 hover 时显示全部的文字

```bash
方案一：默认使用省略号，再加上 title 属性显示完全
.dgp-widget-right-sidebar .project-query-content .result-list .item .header {
white-space: nowrap;
text-overflow:ellipsis;
overflow: hidden;
}
缺点：反应不够灵敏
方案二：满足要求
.dgp-widget-right-sidebar .project-query-content .result-list .item .header {
white-space: nowrap;
text-overflow:ellipsis;
overflow: hidden;
}
.dgp-widget-right-sidebar .project-query-content .result-list .item .header:hover {
text-overflow:inherit;
overflow: visible;
white-space: pre-line;
}
```

