module.exports = () => {
  const config = {};

  // add http_proxy to httpClient
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        proxy: process.env.https_proxy,
      },
    };
  }
  return config;
};
