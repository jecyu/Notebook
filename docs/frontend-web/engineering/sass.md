# Sass


## 声明变量、引用变量

```scss
#声明变量的符号“$”
#变量名称(ps：them-color)
#赋予变量的值(ps：14px/#333)

$them-coklor:#843256;//默认主题色
$btn-primary:$them-coklor !default;//按钮默认色值   ！default则表示默认值
$border-color:#eee;

#变量引用
变量可以引用变量，上面的代码的$btn-primary引用了$them-coklor
```

```scss
#ps：声明变量用的中划线进行分割（也可以用下划线）,中划线和下划线是互通，例子,
#scss
$color-lins:#242639;
body{
  color: $color_lins;
}
#编译后的css
body {
  color: #242639; }
```

devui

```scss
//圆角变量

$devui-border-radius: var(--devui-border-radius, 2px); //一般圆角
$devui-border-radius-feedback: var(--devui-border-radius-feedback, 4px); //反馈类圆角
$devui-border-radius-card: var(--devui-border-radius-card, 6px); //卡片圆角
```

`var()`函数用于读取变量。`var()`函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

参考：https://www.ruanyifeng.com/blog/2017/05/css-variables.html

## 混合器

```scss
.max-erro r{
  font-size: 16px;
  color: #999;
}

h1{
  @extend .max-error;
  font-weight: 500;
}

// 编译后的css
.max-error, h1 {
  font-size: 16px;
  color: #999; 
}

h1 {
  font-weight: 500; 
}

```

## SassScript 以及运算

在 CSS 属性的基础上 Sass 提供了一些名为 `SassScript` 的新功能。 SassScript 可作用于任何属性，允许属性使用变量、算数运算等额外功能。通过`interpolation（插值）`，`SassScript` 甚至可以生成选择器或属性名。

### 利用插值动态生成选择器、属性名和值

实际应用：费用明细的增值服务与优惠券金额等系列项

```scss
$bWidth:5px;
$style:"blue";

.nav {
    border: #{$bWidth} solid #ccc;
    &.nav-#{$style} {
        color: #{$style};
    }
}


// 编译为：
.nav {
  border: 5px solid #ccc;
}
.nav.nav-blue {
  color: blue;
}
```




作者：代码迷途
链接：https://juejin.cn/post/7023544559095250975
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## BEM 最佳实践

参考 element 的处理

## 参考资料

- https://juejin.cn/post/6844903491400400910

