# 移动端开发

## 基础知识

### 什么是响应式设计

响应式设计即是 RWD，Responsive Web Design。

理论上，响应式界面能够适应不同的设备。描述适应式界面最著名的一句话就是“Content is like water”，翻译成中文便是“如果将屏幕看作容器，那么内容就像水一样”。

#### 为什么要设计响应式界面

为什么要费神地尝试统一所有设备呢？

- 即使是 PC 或 Mac 用户，有数据显示只有一半的人会将浏览器全屏显示，而剩下的一半人使用多大的浏览器，很难预知。
- 台式机、投影、电视、笔记本、手机、平板、手表、VR...... 智能设备正在不断增加，“主流设备”的概念正在消失。
- 屏幕分辨率正飞速发展，同一张图片在不同设备上看起来，大小可能天差地别。
- 鼠标、触屏、笔、摄像头手势......不可预期的操控方式正在不断出现。

#### 响应式界面的四个层次

- 同一页面在**不同大小和比例**上看起来都应该是舒适的；
- 同一页面在**不同分辨率**上看起来都应该是合理；
- 同一页面在**不同操作方式**（如鼠标和触屏）下，体验应该是统一的。
- 同一页面在**不同类型的设备**（手机、平板、电脑）上，交互方式应该是符合习惯的。

#### 响应式界面的基本规则

- 可伸缩的**内容区块**：内容区块在一定程度上能够自动调整，以确保填满整个页面。
- 可自由排布的**内容区块**：当页面尺寸变动较大时，能够减少/增加排布的列数。
- 适应页面尺寸的**边距**：到页面尺寸发生更大变化时，区块的边距也应该变化。
- 能够适应比例变化的**图片**：对于常见的宽度调整，图片在隐去两侧部分时，依旧保持美观可用。
- 能够自动**隐藏/部分显示的内容**：如在电脑上显示的大段描述文本，在手机上就只能少量显示或隐藏。
- 能自动折叠的导航和菜单：展开还是收起，应该根据页面尺寸来判断。
- 放弃使用像素作为尺寸单位：用 dp（对于前端来说，这里可能是 rem）尺寸等方法来确保页面在分辨率相差很大的设备上，看起来也能保持一致。
- 同时也要求提供的图片应该比预想的更大，才能适应高分辨率的屏幕。

简单总结：

### 为什么手机会需要 rem 类似的方案，而 PC 端不用？

初步理解是 dpi 的问题，才考虑移动设备。

### 1px 问题处理

#### **为什么会有1px问题？**在开发中，为什么移动端CSS里写了1px，实际上看起来比1px粗？****

由于大部分移动端都具有细腻的屏幕，像iPhone的`Retina屏幕`，一个像素可由 4 个点或9个点组成，在接近视网膜极限的情况下，`1px边框`看起来确实会有点粗。

在不同的屏幕上(普通屏幕 vs retina屏幕)，css像素所呈现的大小(物理尺寸)是一致的，不同的是1个css像素所对应的物理像素个数是不一致的。

在普通屏幕下，1个css像素 对应 1个物理像素(`1:1`)。 在 retina 屏幕下，1个css像素对应 4个物理像素(`1:4`)。对于相同大小的普通屏和高清屏，高清屏有更多的像素格子，因此高清的图片，在高清屏上才能显示得更清楚。相反，图片在普通屏能够看得清楚，但是放到高清屏上，由于高清屏需要填满像素格子，只能把图片近似新的像素出来，导致图片显示模糊。[【原创】移动端高清、多屏适配方案](http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041)。因此才需要有 ui 输出 1倍、 2 倍、3倍图片。不同的dpr下，加载不同的尺寸的图片。【这块也是需要考虑的】



dpr 2，物理像素/逻辑像素 = 2，也就是 1px 在 dpr 为 2的设备屏幕上，实际物理像素为 2 px。

因此，设置 1px 像素，实际显示会为 2px、或 3px。

三种解决方案，

老项目使用 伪类 + transform 相对灵活，新项目的话，使用 viewport 方案，这样设置 1px 也没有问题，一劳永逸。

如果是四条边框，并且设置有 border-radius 的这种怎么处理呢？

#### **为什么不能直接设置为 0.5px 呢？，不够灵活？**

直接写成 border：0.5px solid #cccccc;是不符合规范的写法，会存在Android和IOS手机上的兼容问题。如果我们**直接设置0.5px**，在不同的浏览器会有不同的表现Chrome把0.5px四舍五入变成了1px，而firefox/safari能够画出半个像素的边，并且Chrome会把小于0.5px的当成0，而Firefox会把不小于0.55px当成1px，Safari是把不小于0.75px当成1px，进一步在手机上观察IOS的Chrome会画出0.5px的边，而安卓(5.0)原生浏览器是不行的。所以直接设置0.5px不同浏览器的差异比较大，并且我们看到不同系统的不同浏览器对小数点的px有不同的处理。所以如果我们把单位设置成小数的px包括宽高等，其实不太可靠，因为不同浏览器表现不一样。


作者：人人网FED
链接：https://juejin.cn/post/6844903582370643975
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

#### 伪类+`transform`实现

单条边框

```css
.scale{
  position: relative;
  border:none;
}
.scale:after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  background: #000;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 50% 100%;
}
```

单独用 `transform: scaleY(0.5);height: 1px;`这样肯定是会变虚，但是你可以指定变换的原点，加上这个transform-origin: 50% 100%;就不会有虚化

四条边框

```css
.scale {
  position: relative;
  border: none;
}
.scale:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #000;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: left top;
}
```



封装通用方案

1. 主要是通过给目标元素添加`position:relative`;

2. 然后再用其伪类`:after`或者`:before`画一个2倍或者3倍宽高的元素;

3. 然后给伪类元素画一个1px的边框;

4. 通过`media query`决定缩放伪类元素到1/2或者1/3;

5. 给伪类元素增加`pointer-events: none;`, 这样伪类元素可以点击穿透, 也就是能看到, 但是不触发任何默认事件(click等);

#### 使用box-shadow模拟边框

#### flexible.js 设置 viewport

为什么会有1px问题？

要处理这个问题，必须先明白知识点，就是设备的物理像素[设备像素] & 逻辑像素[CSS像素]

物理像素：
移动设备出厂时，不同设备自带的不同像素，也称硬件像素

逻辑像素：
即css中记录的像素，工程师像素

在开发中，为什么移动端CSS里写了1px，实际上看起来比1px粗？
其实这两个px含义其实是不一样的，UI设计师要求的1px是指设备的物理像素1px，而CSS里记录的像素是逻辑像素，它们之间存在一个比例关系

通常可以用 javascript 中的 window.devicePixelRatio 来获取，也可以用媒体查询的 -webkit-min-device-pixel-ratio 来获取。
在手机上border无法达到我们想要的效果。这是因为 devicePixelRatio 特性导致，iPhone3之后的设备像素比 devicePixelRatio==2，而 border-width: 1px; 描述的是设备独立像素即逻辑像素，所以，border被放大到物理像素2px的物理像素显示，在iPhone上就显得较粗。



涉及 border、分割线。需要好好处理。

遇到分割线的，使用 absolute 的 top：0 比 margin-bottom（这些容易出现问题，除非是用在角标上。） 这些要好，因为涉及到手机的分辨率影响，。debug-trick 新开一个仓库进行记录。

**参考资料**

- [微信小程序（适配小结、移动端1px与选择器权重）](https://blog.csdn.net/zuomengjia/article/details/103187272)
- [关于移动端开发1px边框的一些理解及解决办法](https://juejin.cn/post/6844903506185289735)
- [移动端1px解决方案](https://juejin.cn/post/6844903877947424782)
- [真.1px边框, 🚀 支持任意数量边和圆角, 1 个万金油的方法](https://juejin.cn/post/6844903935719768072)
- [怎么画一条0.5px的边（更新）](https://juejin.cn/post/6844903582370643975)
- [【原创】移动端高清、多屏适配方案](http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041)

## H5

## RN

## 小程序

### 小程序页面通信

### 小程序之间的页面跳转后，不会销毁原来的页面组件吗？所以 eventBus 可以使用。

**wx.navigateTo**

- 保留当前页面，跳转到应用内的某个页面。
- 但是不能跳到 tabbar 页面。
- 使用 wx.navigateBack 可以返回到原页面。
- 小程序中页面栈最多十层。

**wx.navigateBack**

- 关闭当前页面，返回上一页面或多级页面。
- 可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。

**wx.redirectTo**

- 关闭当前页面，跳转到应用内的某个页面。
- 但是不允许跳转到 tabbar 页面。
- 连接后可以拼接参数。

```js
wx.redirectTo({
    url: "../test/test?id=1"
})
```

**wx.switchTab**

- 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
- 需要跳转的 tabBar 页面的路径 ，需在 app.json 的 tabBar 字段定义的页面，路径后不能带参数。

```js
wx.switchTab({
    url:'pages/index/index'
})
```

tabbar 的页面不会消除

### 关于微信小程序、H5、公众号、APP跳转问题

可以使用组件`<web-view>`，它是承载网页的容器。

另外需要配置业务域名，如果是 `mp.weixin.qq.com` 的域名可以不用配置

**2.1、小程序跳H5**

- 通过web-view这个组件实现的。web-view 组件是一个可以用来承载网页的容器，会自动铺满整个小程序页面。但个人类型与海外类型的小程序暂不支持使用。
- 需要配置**业务域名和用到校验文件**，把校验文件放大业务域名所在的服务器上。

**注意事项：**

> 1）可直接打开关联的公众号的文章，其他H5网页需要登录小程序管理后台配置业务域名，即点击[https://mp.weixin.qq.com-](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com-)>登录小程序->点击开发->开发设置->业务域名
> 2）H5网页内的iframe的域名也需要配置业务域名
> 3）业务域名最多可配置的数量限制为不超过20个
> 4）每个页面只能有一个web-view
> 5）web-view具有缓存机制，确定H5内容后尽量不要频繁更改H5内容
> 6）避免给定的H5链接中带有中文字符，在iOS中会有打开白屏问题

参考资料：

- [关于微信小程序、H5、公众号、APP跳转问题](https://zhuanlan.zhihu.com/p/146757157)

#### 说说你对微信小程序的理解？优缺点？

（60s）

1. 微信小程序是以微信为运行环境的一种应用，其实质是 Hybrid 技术的应用，Hybrid App 即混合模式移动应用，因此与 H5 类似，但又比 H5 拥有很多原生的能力，例如调用位置信息和摄像头等。

   - 小程序的开发方式与 H5 十分相似，用的也是 `JavaScript`、`HTML`、`CSS` 语言。

2. 优缺点：

   - **优点：**无需下载，不占用内存空间，版本迭代发版无需再下载，BUG出现后能够快速响应修复，开发成本较低，成本通常在万元以下。

     **缺点**：受控于微信——比起APP，尤其是安卓版的高自由度，小程序要面对很多来自微信的限制，从功能接口，甚至到类别内容，都要接受微信的管控，部分敏感内容还很容易遭受封禁威胁。

**知识点**

优点：

- 即用即走——这个是从微信小程序上线就开始打的概念。即用即走使得小程序可以代替许多APP，或是做APP的整体嫁接，或是作为阉割版功能的承载体。

  倚靠微信流量——相比APP，小程序一个突出的优点是完全嵌入了微信的聊天、公众号体系，完美进行微信体系内的流量引导。这一方面令小程序更加容易获客，另一方面也可以借助微信的成熟社交网络达到爆发式传播。

  连接线上线下——连接线上线下场景也是微信小程序重要的一环，甚至最先开始为了推动线下习惯的养成，小程序在线上场景方面做了较强的限制。由于人们用微信扫描二维码的习惯培养得比较好，小程序相比APP更容易达成线上线下场景的连接与互动。****

**参考资料**

- [面试官：说说你对微信小程序的理解？优缺点？](https://mp.weixin.qq.com/s/W5kwq38zYZWCLqmb5h-bzA)

#### 说说微信小程序的生命周期函数有哪些？

（60s）

> 概念、分类

1. 微信小程序小程序生命周期是指应用、页面或组件从场景到销毁的过程中，会执行的特别函数。
2. 微信小程序一共有三类生命周期，分别是：
   - 应用级别的生命周期： `onLaunch`、`onShow`、`onHide`
   - 页面级别的生命周期：`Start`、`Inited`、`Ready`、`Rerender`
   - 组件基本的生命周期：`created`、`attached`、`detached`
     - 组件实例刚刚被创建好时， `created` 生命周期被触发。此时，组件数据 `this.data` 就是在 `Component` 构造器中定义的数据 `data` 。 **此时还不能调用 `setData` 。** 通常情况下，这个生命周期只应该用于给组件 `this` 添加一些自定义属性字段。
     - 在组件完全初始化完毕、进入页面节点树后， `attached` 生命周期被触发。此时， `this.data` 已被初始化为组件的当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行。
     - 在组件离开页面节点树后， `detached` 生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则 `detached` 会被触发。
3. 应用级别：
   - [onLaunch](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Freference%2Fapi%2FApp.html%23onLaunch-Object-object) - 监听小程序初始化。
   - onShow
   - onHide - 监听小程序切后台
   - onError - 错误监听函数
   - onPageNotFound - 页面不存在监听函数
   - onUnhandledRejection - 未处理的 Promise 拒绝事件监听函数
   - onThemeChange - 监听系统主题变化

**知识点**

**getParam 封装**

**参考资料**

- [极速入门微信小程序 之 生命周期篇](https://juejin.cn/post/6925814073854525447)
- https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html

#### 说说微信小程序的登录流程？

> 背景、流程、扩展

**知识点**

![图片](https://mmbiz.qpic.cn/mmbiz_png/gH31uF9VIibRAwH5j1how6ENLGqmmqHicPQvjXwBWQycOoFjcYR9LhkpNquSJbs68jkvibo7XAz2V92xO2VULZbZQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

传统的 `web` 开发实现登陆功能，一般的做法是输入账号密码、或者输入手机号及短信验证码进行登录。

服务端校验用户信息通过之后，下发一个登录态的 `token` 给客户端，以便进行后续的交互，每当 `token` 国旗，用户都要重新登录。

而在微信小程序中，可以通过微信官方提供的登录能力方便地获取微信提供的用户身份标识，快速建立小程序的用户体系，从而实现登录功能。

实现小程序用户体系主要涉及到 `openid` 和 `code` 的概念：

- 调用 `wx.login()` 方法会生成 `code`，将 `code` 作为参数传递给微信服务器指定接口，就可以获取用户的 `openid`。

对于每个小程序，微信都会将用户的 `ID` 映射出一个小程序 `openid`，作为这个用户在这个小程序的唯一标识。

**参考资料**

- [面试官：说说微信小程序的登录流程？](https://mp.weixin.qq.com/s/2d2ly1A7F62-mKl2Qldycw)

#### 说说微信小程序的支付流程？

（60s） 



1. 微信小程序的支付流程涉及商家小程序、商户系统后台、微信支付系统
2. 进行微信支付，在小程序端我们主要做三件事：
   1. 使用**`wx.login`**获取临时登录凭证 code，发送到后端获取openId
   2. 将**`openId`**以及相应需要的商品信息发送到后端，换取服务端进行的签名等 prepay_id信息
   3. 接收返回的信息（必须要包含发起微信支付**`wx.requestPayment的参数`**），发起微信支付
   4. 支付结果通知
   5. 前端根据不同的支付结果给用户不同的提示

**知识点**

**![小程序支付时序图](https://pay.weixin.qq.com/wiki/doc/apiv3/assets/img/pay/wechatpay/6_2.png)**

**参考资料**

- [微信小程序支付功能全流程实践](https://juejin.cn/post/6844903895970349064)
- [微信小程序支付流程](https://zhuanlan.zhihu.com/p/166389389)
- [业务流程时序图](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_4)

#### 小程序的状态管理解决方案

1. 本地缓存
2. 以及应用状态

page 跳转后数据状态

>  注册完 redux 插件之后，将会自动的调用 `redux.createStore` 创建一个用于存储全局状态数据 `store`，并且插件会在自动的挂载 `store` 到 App、Component、Page 实例中 `$store` 。https://developers.weixin.qq.com/community/develop/article/doc/00080625b9c100ebaf9ac0e8356013

如果按照上面的文章说法，那么只要 App 小程序应用存在，那么数据状态就一直存在。

Taro.setStorage(option)

将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。

参考资料

- https://developers.weixin.qq.com/community/develop/article/doc/00080625b9c100ebaf9ac0e8356013

#### 微信小程序 Page 间数据传递解决方案分析

[https]://developers.weixin.qq.com/community/develop/article/doc/0000009ea2c2f0263d79610ec51413

#### 说说微信小程序的实现原理？

1. 为了安全和管控，微信小程序采用双线程架构设计，微信小程序的渲染层与逻辑层分别由两个线程管理，渲染层的界面使用 `webview` 进行渲染；逻辑层采用 `JSCore`运行`JavaScript`代码。
2. 由于渲染层与逻辑层分开，一个小程序有多个界面，所以渲染层对应存在多个`webview`。这两个线程之间由`Native`层进行统一处理。无论是线程之间的通讯、数据的传递、网络请求都由Native层做转发。

**知识点**



虽然开发体验与Web保持一致，但是Web技术实在是太开放了，开发者可以为所欲为。这种情况在小程序中是不允许的，不允许使用<iframe>、不允许<a>直接外跳到其他在线网页、不允许开发者触碰DOM、不允许使用某些未知的危险API等



**参考资料**



- https://zhuanlan.zhihu.com/p/81775922 **小程序底层实现原理及一些思考**

### 说说提高微信小程序的应用速度的手段有哪些？

在 web 开发场景，减少代码体积虽然是性能优化的一个方向，还没到锱铢必较的程度。但是在小程序场景，由于代码包上传阶段限制了主包 **2M **和总包 **20M**，超过就会面临无法发版的风险，代码包体积的优化就变得特别重要了。

1. 从两方面入手，提高加载性能和渲染性能。

2. 提高加载性能主要是控制代码包的大小

3. - 勾选开发者工具中“上传代码时，压缩代码”选项；

   - 及时清理无用的代码和资源文件（包括无用的日志代码）

   - 减少资源包中的图片等资源的数量和大小（理论上除了小icon，其他图片资源从网络下载），图片资源压缩率有限

   - **采用分包加载机制**

   - **采用分包预加载技术**

   - **采用独立分包技术**

   - 首屏

   - 1. **提前请求**
     2. **利用缓存**
     3. **避免白屏、及时反馈**



1. **渲染性能**

- 避免使用不当setData
- - 不要过于频繁调用setData，应考虑将多次setData合并成一次setData调用
  - 数据通信的性能与数据量正相关，因而如果有一些数据字段不在界面中展示且数据结构比较复杂或包含长字符串，则不应使用setData来设置这些数
  - 与界面渲染无关的数据最好不要设置在data中，可以考虑设置在page对象的其他字段下
  - **利用setData进行列表局部刷新**
  - **切勿在后台页面进行setData**
- **避免用户事件使用不当**
- - 去掉不必要的事件绑定（WXML中的bind和catch），从而减少通信的数据量和次数； 
  - 事件绑定时需要传输target和currentTarget的dataset，因而不要在节点的data前缀属性中放置过大的数据。
- **使用自定义组件**
- **避免不当的使用onPageScroll**

### 坑总结

#### 小程序是什么怎么适配多端的？

rpx

#### iPhoneX安全区域(Safe Area)

在苹果 iPhoneX 、iPhone XR等设备上，可以看到物理Home键被取消，改为底部小黑条替代home键功能。微信小程序和 h5 网页需要针对这种情况进行适配，否则可能会遇到底部按钮或选项卡栏与底部黑线重叠的情况

解决方案：使用苹果官方推出适配方案css函数env()、constant()来适配

**参考资料**

-  [iPhoneX安全区域(Safe Area)底部小黑条在微信小程序和H5的屏幕适配](https://segmentfault.com/a/1190000022191869)

#### Taro 主包 common 过大

参考资料：

-  https://juejin.cn/post/6991762307260874788

- https://github.com/NervJS/taro/pull/8135

#### 总结

**小程序启动加载性能**

- 控制代码包的大小
- 分包加载
- 首屏体验（预请求，利用缓存，避免白屏，及时反馈

**小程序渲染性能**

- 避免不当的使用setData
- 合理利用事件通信
- 避免不当的使用onPageScroll
- 优化视图节点
- 使用自定义组件



**参考资料**



- https://juejin.cn/post/6844903638226173965 **微信小程序性能优化**

## 微信小程序全栈开发实践

### 重新认识微信小程序

1. 用户体验的角度
2. 商户运营的角度
3. 技术人员开发的角度



## 参考资料

- [中高级前端必须注意的40条移动端H5坑位指南(opens new window)](https://juejin.cn/post/6921886428158754829)
- [移动端开发的屏幕、图像、字体与布局的兼容适配(opens new window)](https://mp.weixin.qq.com/s/s_UNQyaLvYXzRcuL-7aL_A)
- [常用移动前端开发调试方式
- [微信小程序全栈开发实战](https://tsejx.github.io/blog/summary-of-common-development-and-debugging-methods-of-mobile-front-end/)

