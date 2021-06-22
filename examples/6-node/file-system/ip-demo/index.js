// 引入基础模块
const fs = require("fs"); // 从文件 ip.json 读取 IP 列表，把结果写入文件中。
const request = require("request"); // 用来发送 HTTP 请求，根据 IP 地址获取 GEO 数据，再通过 GEO 数据获取天气数据。
const qs = require("querystring"); // 用来组装发送请求的 url 参数
const { log } = require("console");

// 通过 JSON.parse 来解析 IP 列表中的地址
function readIP(path, callback) {
  fs.readFile(path, function(err, data) {
    if (err) {
      callback(err);
    } else {
      try {
        data = JSON.parse(data);
        callback(null, data);
      } catch (err) {
        callback(err);
      }
    }
  });
}

// 通过高德地图的 GEO 服务来获取城市信息
function ip2geo(ip, callback) {
  const url =
    "https://restapi.amap.com/v3/ip?key=30f65c7ccdf167b4275f214ce994c79f&ip=" +
    ip;
  request(
    {
      url,
      json: true,
    },
    function(err, resp, body) {
      callback(err, body);
    }
  );
}

// 通过高德的公共服务获取当地的天气信息
function geo2weather(cityCode, callback) {
  const url =
    `https://restapi.amap.com/v3/weather/weatherInfo?key=30f65c7ccdf167b4275f214ce994c79f&city=` +
    cityCode;
  // qs.stringify(params);
  request(
    {
      url,
      json: true,
    },
    function(err, resp, body) {
      callback(err, body);
    }
  );
}

function geos2weathers(geos, callback) {
  let weathers = [];
  let geo;
  let remain = geos.length;
  for (let i = 0; i < geos.length; i++) {
    geo = geos[i];
    geo2weather(geo.adcode, function(err, data) {
      if (err) {
        callback(err);
      } else {
        weathers.push({ ...data, geo });
        remain--;
      }

      // TODO 需要排查为什么 weathers 只获取到相同的值
      if (remain === 0) {
        console.log("weathers ->", weathers);
        callback(null, weathers);
      }
    });
  }
}

function writeWeather(weathers, callback) {
  const output = [];
  let weather;
  // 使用 for 循环遍历每个 IP 地址的信息
  for (let i = 0; i < weathers.length; i++) {
    weather = weathers[i];
    output.push({
      // ip: weather.geo.ip,
      weather: weather.lives[0].weather,
      region: weather.geo.city,
    });
  }
  // 使用 fs.writeFile 函数将结果写入到 weather.json 中
  fs.writeFile("./weather.json", JSON.stringify(output, null, " "), callback);
}

// 后续可以使用 Promise 改造整个例子
readIP("./ip.json", function(err, data) {
  if (err) {
    throw err;
  }
  let geos = [];
  let ip = "";
  let remain = data.length;
  for (let i = 0; i < data.length; i++) {
    ip = data[i];
    ip2geo(ip, function(err, data) {
      if (err) throw err;
      geos.push(data);
      remain--;
      if (remain === 0) {
        console.log("geos =>", geos);
        geos2weathers(geos, function(err, data) {
          if (err) throw err;
          writeWeather(data, function() {});
        });
      }
    });
  }
});
