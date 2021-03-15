require('es6-promise').polyfill();
require('isomorphic-fetch');

module.exports = async (req, res) => {
  // 设置请求头允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { query: { code } } = req;
  const clientID = 'Iv1.4b7099aca41da4cf';
  const clientSecret = 'xxxx';

  const url = 'https://github.com/login/oauth/access_token?' +
    `client_id=${clientID}&` +
    `client_secret=${clientSecret}&` +
    `code=${code}`;

  try{
    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(response => {
      if(response.status === 200) {
        return response.json();
      }
    }).then(data => {
      res.json({
        data
      });
    })
  } catch(err) {
    res.json({
      err,
    });
  }
};
