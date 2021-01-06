
# WebGL 从入门到实战总结

## 前言

**主要解决：**
- 地图导出图片问题
- 图层置灰问题
- 三维地图与二维地图的渲染区别（坐标系、定位、绘制等）

入门教程
- 开始 WebGL
- 给 WebGL 的上下文环境添加 2D 内容
- 在 WebGL 中使用着色器（shader）去赋予颜色
- 用 WebGL 让对象动起来
- 使用 WebGL 创建 3D 物体
- 在 WebGL 中使用纹理贴图（texture）
- WebGL 中的灯光
- WebGL 中的动画纹理贴图
  
《十步学习法》
- 了解全局
- 确定范围
- 定义目标
- 寻找资源
- 创建学习计划
  - 基本的绘制 3d 图形，导出图形，
  - 创建一个迷型的3d 库原理学习
- 筛选资源
- 开始学习，浅尝辄止
- 动手操作，边玩边学
- 全面掌握，学以致用
- 乐为人师，融汇贯通

## 入门

### 什么是 WebGL

WebGL 程序的工作流程可以总结如下：

![](../.vuepress/public/images/2020-12-19-23-48-29.png)


![](../.vuepress/public/images/2020-12-17-22-05-38.png)

### GLSL 语言

- vec4 是 4 个浮点组成的数组，代表顶点坐标或 3D 向量（x, y, z, w） 或颜色 (r, g, b, alpha)。同理也存在 vec2(x, y) 和 vec3(x, y, z/r, g, b) 类型。
- 每个着色器（shader）（程序执行开始的地方）的入口点是一个 `void main(){...}` 函数。
- 每个指令必须以 `;` 结尾。
- 顶点着色器必须设置一个包含当前顶点坐标的全局变量 `gl_Position`（在渲染单个点时还必须设置 `gl_PointSize`）。
- 片段着色器（fragment shader）必须设置一个包含当前片段颜色的全局变量 `gl_FragColor`。
  它可以访问 3 个全局变量：`gl_FragCoord`（窗口坐标），`gl_PointCoord`（点内坐标）和 `gl_FrontFacing`（当前三角形方向）。
- 可以在每个着色器中使用指令设置 int、float 和 Samplers2Ds 的精度（lowp/mediap/highp），例如 precision highp int；

### JavaScript 和 WebGL 通信

![](../.vuepress/public/images/2020-12-20-10-30-35.png)

主要有四种机制，用来在不同脚本（scripts）之间发送数据：
- `Uniforms` 是 JavaScript 传递给顶点着色器和片段着色器（例如，一种颜色）的全局变量。它们的值在整个帧中保持不变。

### 刚刚够的数学知识

三角圆

![](../.vuepress/public/images/trigo.gif)

向量：

![](../.vuepress/public/images/2020-12-17-23-13-23.png)

操作向量

V.W = xV * xW + yV * yW + zV * zW

![](./../.vuepress/public/images/dot.gif)

V×W = [yV*zW - zV*yW, zV*xW - xV*zW, xV*yW - yV*xW].

![](../.vuepress/public/images/cross.gif)

法线

![](../.vuepress/public/images/2020-12-18-13-55-32.png)

#### 矩阵

矩阵是数字的网格。 它表示一个线性方程组，可以通过乘法应用于任何矢量。

![](../.vuepress/public/images/2020-12-18-14-04-10.png)

#### 矩阵的运算


矩阵求逆

```math
A * A-1 = identity
```

```math
A * A-1 * V = V
```

齐次坐标

- 在屏幕上渲染顶点时，只有 x、y 和 z 坐标重要，先前用于计算平移和投影的 W 坐标会被丢弃。

### 2D 图形

#### Hello, point 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello，point</title>
  </head>
  <body>
    <canvas id="canvas" width="400" height="400"></canvas>
    <script>
      // Get the WebGL rendering context
      const canvas = document.querySelector("canvas");
      const gl = canvas.getContext("webgl");

      // Vertex shader
      const vshader = `
      void main() {
        // Set vertex position: vec4(x, y, z, 1.0)
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);

        // Point size in pixels: float
        gl_PointSize = 10.0;
      }`;

      // Fragment shader
      const fshader = `
      precision mediump float;
      void main() {
        // Set fragment color: vec4(r, g, b, alpha)
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`;

      // Compile the vertex shader
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vshader);
      gl.compileShader(vs);

      // Compile the fragment shader
      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fshader);
      gl.compileShader(fs);

      // Create the WebGL program and use it
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      // Log compilation errors, if any
      console.log("vertex shader:", gl.getShaderInfoLog(vs) || "OK");
      console.log("fragment shader:", gl.getShaderInfoLog(fs) || "OK");
      console.log("program:", gl.getProgramInfoLog(program) || "OK");

      // Set the clear color (black)
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Clear the canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Draw points
      gl.drawArrays(gl.POINTS, 0, 1); // mode, starting pint, number of points to draw
    </script>
  </body>
</html>
```

### 3D 图形

## 进阶

Arcgis 二维与三维地图的实现。

## 解决问题

### 地图导出图片问题

使用传统的方案，不起作用：黑屏

```js
$('canvas').toDataURL()
```

## 参考资料

- 英文入门教程：WebGL guide (part 1/2) 
May 2020 https://xem.github.io/articles/webgl-guide.html
- MDN 入门教程：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)
- 进阶：小册
- 系统：《WebGL 编程指南》
- 深入
  - 《3D 游戏与计算机图形学中的数学方法》
- mapboxGL 如何绘制、Arcgis 又是如何处理，为什么会导出不了图片
- [https://mp.weixin.qq.com/s/0G8rGoWNZ0XkBA9FQQPXLg](https://mp.weixin.qq.com/s/0G8rGoWNZ0XkBA9FQQPXLg)