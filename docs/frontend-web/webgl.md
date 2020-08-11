# WebGL 编程

¹WebGL context is accessed from "experimental-webgl" rather than "webgl"
ⓘ WebGL support is dependent on GPU support and may not be available on
older devices. This is due to the additional requirement for users to have
[up to date video
drivers](http://www.k

WebGL 需要 GPU 的支持，也就是显卡，最好是独显了

If you're new to writing games in the browser, you might say "why don't we just create a setInterval ?" The thing is - we could, but requestAnimationFrame has a number of advantages. Perhaps the most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.

WebGL 是内嵌在浏览器中的，你不需要常规的开发工具，如编译器、连接器，就能编写 WebGL 程序。

从传统意义上来说，为了显示三维图形，开发者需要使用 C 或 C++ 语言，辅以专门的计算机图形库，如 OpenGL 或 Direct3D，来开发一个独立的应用程序。

WebGL 是内嵌在浏览器中的，你不必安装插件和库就可以直接使用它。而且，因为它是基于浏览器（而不是基于操作系统的），你可以在多种平台上运行 WebGL 程序。

### 轻松发布三维图形程序

传统的三维图形程序通常使用 C 或 C++ 等语言开发，并为特定的平台被编译成二进制的可执行文件。这意味着程序不能跨平台运行，比如说，Mac 版本的程序无法在 Window 或 Linux 上运行。而且，为了运行三维图形程序，用户通常不仅需要安装程序本身，还需安装程序所依赖的库。

相比之下，WebGL 程序由 HTML 和 JavaScript 文件组成，你只需将它们放到 Web 服务器上。WebGL 程序实际上是网页的一部分，你可以充分利用浏览器的功能，比如放置按钮、弹出对话框、绘制文本、播放声音和视频，与服务器通信等等。