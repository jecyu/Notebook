/*
 * @Author: naluduo233
 * @Date: 2021-04-14 22:22:33
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-14 22:25:22
 * @FilePath: /my-plugin/plugins/my-plugin.js
 * @Description: 
 */
module.exports = class MyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    console.log('My plugin is executed!');
    console.log('My plugin options', this.options);
  }
}