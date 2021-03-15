/*
 * @Author: Jecyu
 * @Date: 2021-02-19 14:35:07
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-08 10:14:48
 * @FilePath: /examples/20-webgl/utils/webgl-helper.js
 * @Description:
 */
var random = Math.random;
function randomColor() {
  return {
    r: random() * 255,
    g: random() * 255,
    b: random() * 255,
    a: random() * 1,
  };
}

function resizeCanvas(canvas, width, height) {
  if (canvas.width !== width) {
    canvas.width = width ? width : window.innerWidth;
  }
  if (canvas.height !== height) {
    canvas.height = height ? height : window.innerHeight;
  }
}

function $$(str) {
  if (!str) return null;
  if (str.startsWith("#")) {
    return document.querySelector(str);
  }
  let result = document.querySelectorAll(str);
  if (result.length == 1) {
    return result[0];
  }
  return result;
}

function createShader(gl, type, source) {
  // 创建着色器程序
  let shader = gl.createShader(type);
  // 将源码分配给着色器对象
  gl.shaderSource(shader, source);
  // 编译片元着色器
  gl.compileShader(shader);
  // 检测是否编译正常
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

/**
 * @description:  创建着色器
 * @param {*} gl
 * @param {*} type
 * @param {*} str
 * @return {*}
 */
function createShaderFromScript(gl, type, scriptId) {
  // 获取着色器源码
  let sourceScript = $$("#" + scriptId);
  if (!sourceScript) {
    return null;
  }
  return createShader(gl, type, sourceScript.innerHTML);
}

function createSimpleProgram(gl, vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) {
    console.warn('着色器不能为空');
    return;
  }
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader); // 将顶点着色器挂载在着色器程序上
  gl.attachShader(program, fragmentShader); // 将片元着色器挂载在着色器程序上
  gl.linkProgram(program); // 链接着色器程序
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function createSimpleProgramFromScript(gl, vertexScriptId, fragmentScriptId) {
  let vertexShader = createShaderFromScript(
    gl,
    gl.VERTEX_SHADER,
    vertexScriptId
  );
  let fragmentShader = createShaderFromScript(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentScriptId
  );
  let program = createSimpleProgram(gl, vertexShader, fragmentShader);
  return program;
}

// /**
//  * @description:
//  * @param {*} gl
//  * @param {String} vertexString script 元素id
//  * @param {String} fragmentString script 元素
//  * @return {*}
//  */
// function createProgramFromString(gl, vertexString, fragmentString) {
//   //创建顶点着色器
//   let vertexShader = createShaderFromString(gl, gl.VERTEX_SHADER, vertexString);
//   //创建片元着色器
//   let fragmentShader = createShaderFromString(
//     gl,
//     gl.FRAGMENT_SHADER,
//     fragmentString
//   );
//   //创建着色器程序
//   let program = createProgram(gl, vertexShader, fragmentShader);
//   return program;
// }


// function createProgram(gl, vertexShader, fragmentShader) {
//   // 创建着色器程序
//   let program = gl.createProgram();
//   // 将顶点着色器挂载在着色器程序上
//   vertexShader && gl.attachShader(program, vertexShader);
//   // 将片元着色器挂载在着色器程序上
//   fragmentShader && gl.attachShader(program, fragmentShader);
//   // 链接着色器程序
//   gl.linkProgram(program);
//   let result = gl.getProgramParameter(program, gl.LINK_STATUS);
//   if (result) {
//     console.log("着色器程序创建成功");
//     let uniformSetters = createUniformSetters(gl, program);
//     let attributeSetters = createAttributeSetters(gl, program);
//     return { program, uniformSetters, attributeSetters}
// }

// function createUniformSetters(gl, program) {

// }

// function createAttributeSetters(gl, program) {

// }
/**
 * @description: 加载纹理
 * @param {*} gl
 * @param {*} src
 * @param {*} attribute
 * @param {*} callback
 * @return {*}
 */
function loadTexture(gl, src, attribute, callback) {
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    gl.activeTexture(gl.TEXTURE0); // 激活 0 号纹理通道gl.TEXTURE0，0 号纹理通道是默认值
    let texture = gl.createTexture(); // 创建一个纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture); // 将创建好的纹理对象texture绑定 到当前纹理绑定点上
    gl.texImage2D(
      // 为片元着色器传递图片数据
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      img
    );
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.uniform1i(attribute, 0);
    callback && callback();
    callback && callback();
  };
  img.src = src;
}


// 返回一个单位矩阵
function identity() {

}

// 计算两个矩阵的乘积，返回新的矩阵
function multiply(matrixLeft, matrixRight) {

} 

// 绕 X 轴旋转一定角度，返回新的矩阵
function rotationX(angle) {

}

// 绕 Y 轴旋转一定角度，返回新的矩阵
function rotationY(angle) {} 

// 正交投影，返回新的矩阵
function ortho(left, right, bottom, top, near, far, target) {}