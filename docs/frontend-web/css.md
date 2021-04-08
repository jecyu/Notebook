# CSS 项目实战总结（持续更新）

## 0. 前言

## 1. 基础

### 获取滚动条宽度

### 一个元素的高度由哪些属性影响

自身的值
继承的值

### 盒子尺寸四大家族

#### margin 属性

##### margin 负值

我们可以给父容器添加 margin 属性，增加容器的可用宽度来实现。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        margin: 0 auto;
        width: 500px;
        border: 1px #ccc solid;
      }
      ul {
        overflow: hidden;
        margin-right: -10px; 
        padding: 0;
      }
      ul > li {
        width: 92px;
        height: 92px;
        background-color: #ccc;
        float: left;
        margin-right: 10px;
        list-style: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <ul>
        <li>我是一个列表</li>
        <li>我是一个列表</li>
        <li>我是一个列表</li>
        <li>我是一个列表</li>
        <li>我是一个列表</li>
      </ul>
    </div>
  </body>
</html>

```

此时的 `<ul>` 的宽度相当于 `100% + 10px` ，于是最后一个 li 标签的 `margin-right: 10px` 就多了 10 像素的使用空间，正好列表的右边缘就是父级 `ul` 容器 100% 宽度位置，两端对齐的效果就实现了。

### transition

盒子模型需要满足 block 属性才可以生效
```css
.box {
  /* display: block */
  display: inline-block; 
}
```

- [“更多|收起”交互中渐进使用transition动画](https://www.zhangxinxu.com/wordpress/2012/10/more-display-show-hide-tranisition/) —— 张鑫旭大大的折叠收起

### box-sizing 属性用来定义 user agent 如何计算元素的总宽度和总高度

- content-box，即是默认值。如果你设置一个元素的`width`为 100px，那么这个元素的内容会有 100px 宽，并且任何`border`和`padding`都会被增加到最后绘制出来的元素宽度中。
- border-box：告诉浏览器，你想要设置的`border`和`padding`的值是包含在`width`内。内容区实际的宽度是`content= width -(padding + border)`。

注意的是 `border-box` 是不包括 `margin`的。
一般情况下，我们会在全局设置 `box-sizing` 值为 `border-box`；这样在处理元素大小的时候方便得多，也避免了在布局内容时可能遇到的坑。

### 统一字体

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

### html css 文字过多用省略号代替，当鼠标 hover 时显示全部的文字

方案一：默认使用省略号，再加上 title 属性显示完全
缺点：反应不够灵敏
```css
.dgp-widget-right-sidebar .project-query-content .result-list .item .header {
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
```

方案二：满足要求
```css
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

### Grid 布局（以 antd-design 为例）



## 2. 项目实战

### CSS Module

- Vue scoped 属性解决样式命名冲突的问题

没有使用嵌套选择器来处理，跟 vue scoped 很不同，不太习惯。需要一定的编写规范。

只会对类名和 id 进行 hash 转换。

css module 本身就是扁平化的处理，不需要通过嵌套来解决命名冲突的问题。

- 解决全局命名冲突问题 css modules 只关心组件本身 命名唯一
- 模块化 可以使用 composes 来引入自身模块中的样式以及另一个模块的样式
- 解决嵌套层次过深的问题 使用扁平化的类名

不需要像 Vue scoped 那样嵌套，Vue scoped 通过添加 data 属性来处理。

**1）css预处理器（less/sass） 支持模块引入**

```
存在问题：不能解决全局样式冲突问题
```

**（2）BEM（Block Element Modifier）解决命名冲突以及更好的语义化**

- Block：逻辑和页面功能都独立的页面组件，是一个可复用单元，特点如下：
  - 可以随意嵌套组合
  - 可以放在任意页面的任何位置，不影响功能和外观
  - 可复用，界面可以有任意多个相同Block的实例
- Element：Block的组成部分，依赖Block存在（出了Block就不能用）
- [可选]定义Block和Element的外观及行为，就像HTML属性一样，能让同一种Block看起来不一样

------

- **存在问题：对于嵌套过深的层次在命名上会给需要语义化体现的元素造成很大的困难 对于多人协作上，需要统一命名规范，这同样也会造成额外的effort**

Vue scope，里面子元素还是需要嵌套来区分应用范围。也就是进一步的处理。

```scss
<style lang="scss" scoped>
.svg-icon {
  vertical-align: -0.125em;
  line-height: 0;
  display: inline-block;
}
</style>
```

需要探索 Buttons 的元子处理。

## 3. 底层原理

## 4. 最佳实践

## 总结

## 参考资料

- 《CSS 世界》
