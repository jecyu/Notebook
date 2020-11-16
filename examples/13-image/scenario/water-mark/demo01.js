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

// 调用
__canvasWM({
  content: "Jecyu",
  container: document.querySelector(".container")
});

