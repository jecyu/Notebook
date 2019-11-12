# HTML

## 标签

### base 标签

base 可以让当前页面的跳转 URL ，加载到 `iframe` 中，这样就不用跳转页面了。当没有使用其他前端框架的时候，在写 demo 展示的时候挺好用的。
```html
<head>
  <base target="myFrame" /> 
</head>

<!-- Where the examples will be displayed -->
<div id="myFrame" class="iframe-padding">
  <iframe name="myFrame" src=""></iframe>
</div>
<section class="">
  <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link" href="../examples/02-stack/01-Stack.html">01-Stack</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="../examples/02-stack/03-DecimalToBinary.html">03-DecimalToBinary</a>
      </li>
    </ul>
</section>
```