/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-07-21 13:28:04
 * @LastEditTime: 2020-07-21 13:36:25
 * @LastEditors: Jecyu
 */ 
const app = require("./app");
const PORT = 8082;

app.listen(PORT, () => {
  console.info(`cookie-session-server listening on port ${PORT}`);
})