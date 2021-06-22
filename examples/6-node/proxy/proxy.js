const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();

proxy.on("error", function(err, req, res) {
  res.end();
});

const proxy_server = http.createServer(function(req, res) {
  proxy.web(req, res, {
    // target: "http://localhost:8000",
    target: "http://52.82.69.134:18080"
  });
});

proxy_server.listen(8080, function() {
  console.log("proxy server is running");
});
