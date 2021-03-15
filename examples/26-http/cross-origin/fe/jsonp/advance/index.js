/**
 * 封装
 * 创建 jsonp 类
 * 初始化时传入两个参数，url 是接口的 url
 * cb 是对于接口返回的参数的处理
 */
class Jsonp {
  constructor(url, cb) {
    this.callbackName = "jsonp_" + Date.now();
    this.cb = cb;
    this.url = url;
    this.init();
  }

  // 初始化方法，用于拼接 URL
  init() {
    if (~this.url.indexOf("?")) {
      this.url = this.url + "&callback=" + this.callbackName;
    } else {
      this.url = this.url + "?callback=" + this.callbackName;
    }
    this.createCallBack();
    this.createScript();
  }

  // 创建 script 标签，src 取接口请求的 url
  createScript() {
    const script = document.createElement("script");
    script.src = this.url;
    script.onload = function() {
      this.remove();
    };
    document.body.appendChild(script);
  }

  // 绑定回调函数
  createCallBack() {
    window[this.callbackName] = this.cb;
  }
}

// 创建 jsonp 实例，并制定回调函数
new Jsonp("http://localhost:8088/", function(data) {
  console.log(data);
});
