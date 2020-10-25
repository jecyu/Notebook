/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-07-20 22:36:05
 * @LastEditTime: 2020-07-20 22:37:01
 * @LastEditors: Jecyu
 */ 
const app = require("./app");
const PORT = 3020;

app.listen(PORT, () => {
  console.log(`sso-consumer listening on port ${PORT}`);
})