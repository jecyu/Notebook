require("@babel/register")({
  // 让文件支持 jsx 语法
  presets: ["@babel/preset-react"],
});

const ReactDOMServer = require("react-dom/server");

const html = ReactDOMServer.renderToString(require("./index.jsx"));
console.log(html);
