const script = document.createElement("script");
script.type = "text/javascript";

// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
script.src =
  "http://www.codeshop.com:9000/login?user=admin&callback=handleCallback";
document.head.appendChild(script);

// 回调执行函数
function handleCallback(res) {
  alert(JSON.stringify(res));
}
