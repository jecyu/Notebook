/*
 * @Author: Jecyu
 * @Date: 2021-01-26 23:21:01
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-02-06 09:16:39
 * @FilePath: /examples/20-webgl/lib/webgl.js
 * @Description:
 */
// Compile a WebGL program from a vertex shader and a fragment shader
compile = (gl, vshader, fshader) => {
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

  return program;
};

// Bind a data buffer to an attribute, fill it with data and enable it
buffer = (gl, data, program, attribute, size, type) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); // 绑定某个缓冲区对象为当前缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); // 往缓冲区中复制数据
  const a = gl.getAttribLocation(program, attribute);
  gl.vertexAttribPointer(a, size, type, false, 0, 0); // 设置从缓冲区读取 a 属性的方法
  gl.enableVertexAttribArray(a); // 启用 a 属性
};
