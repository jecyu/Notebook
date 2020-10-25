/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-07-20 22:42:19
 * @LastEditTime: 2020-07-20 22:46:33
 * @LastEditors: Jecyu
 */ 
const app = require("./app");
const PORT = 3000;

app.listen(PORT, () => {
  console.info(`cookie-session-server listening on port ${PORT}`);
})