# 版式设计

满足自适应效果

## 基本布局

### 水平居中

### 垂直居中

### 水平垂直居中

### 两列自适应布局

两列自适应布局是指一列由内容（也可以设定宽度）撑开，另一列撑满剩余宽度的布局方式。

效果图

#### flex 实现

结构
```html
<div class="container">
  <div class="side"></div>
  <div class="content"></div>
</div>
```

样式
```css
.container {
  display: flex;
}
.content {
  margin-left: 20px;
  flex: 1;
}
```

## 组合布局

### 上中下布局

### 顶部-侧边布局-通栏

### 顶部-侧边布局

### 固定头部

### 固定侧边栏

