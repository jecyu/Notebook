(function() {
  // canvas 实现 watermark
  function __canvasWM({
    // 使用 ES6 的函数默认值方式设置参数的默认取值
    // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
    container = document.body,
    width = "200px",
    height = "150px",
    textAlign = "center",
    textBaseline = "middle",
    font = "20px microsoft yahei",
    fillStyle = "rgba(184, 184, 184, 0.8)",
    content = "请勿外传",
    rotate = "30",
    zIndex = 1000,
  }) {
    const args = arguments[0];
    const canvas = document.createElement("canvas");

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const ctx = canvas.getContext("2d");

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate((Math.PI / 180) * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

    const base64Url = canvas.toDataURL();
    const watermarkDiv = document.createElement("div");
    watermarkDiv.setAttribute(
      "style",
      `
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:${zIndex};
        pointer-events:none;
        background-repeat:repeat;
        background-image:url('${base64Url}')`
    );

    container.style.position = "relative";
    container.insertBefore(watermarkDiv, container.firstChild);
  }

  window.__canvasWM = __canvasWM;
})();

const canvas = document.getElementById("canvas");
const width = "500px";
const height = "500px";
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
const font = `12px microsoft yahei`;
const content = "随着HTML5发展和现代浏览器的占比越来越高，我们其实也可以在前端直接进行图片的合成。优点在于，响应更快，体验更好；如果是和文字进行合成，我们可以利用客户端字体，视觉展现效果更丰富；同时展示和合成全部都是前端完成，因此更利于维护。"
ctx.fillText(content, 0, 20);
ctx.font = font;

// html2canvas，转成图片再绘制到 canvas 上？
// 
// // 调用
// __canvasWM({
//   content: "Jecyu",
//   container: document.querySelector(".container"),
// });
