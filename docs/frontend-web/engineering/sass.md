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

## 参考资料

- https://juejin.cn/post/6844903491400400910

