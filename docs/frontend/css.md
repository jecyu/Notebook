# css

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

