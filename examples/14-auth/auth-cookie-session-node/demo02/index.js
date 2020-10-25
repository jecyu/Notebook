/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-07-21 13:28:04
 * @LastEditTime: 2020-07-21 21:29:47
 * @LastEditors: Jecyu
 */ 
const app = require("./app");
const PORT = 8083;

app.listen(PORT, () => {
  console.info(`cookie-session-server listening on port ${PORT}`);
})