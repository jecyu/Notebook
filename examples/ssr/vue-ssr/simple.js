/**
 * 简单的使用 vue-server-renderer 渲染 Vue 实例
 */

// Step1 : Create a Vue instance
const Vue = require("vue");
const app = new Vue({
  template: `<div>Hello World</div>`,
});

// Step2: Create a renderer
const renderer = require("vue-server-renderer").createRenderer();

// Step3: Render the Vue instance to HTML
// renderer.renderToString(app, (err, html) => {
//   if (err) throw err;
//   console.log(html);
//   // => <div data-server-rendered="true">Hello World</div>
// });

// in 2.5.0+, returns a Promise if no callback is passed:
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
