/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-07-21 13:28:04
 * @LastEditTime: 2020-07-21 22:46:41
 * @LastEditors: Jecyu
 */ 
const app = require("./app");
const PORT = 8084;

app.listen(PORT, () => {
  console.info(`cookie-session-server listening on port ${PORT}`);
})