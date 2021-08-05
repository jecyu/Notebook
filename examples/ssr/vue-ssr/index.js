// Step1 : Create a Vue instance
const Vue = require("vue");
const app = new Vue({
  template: `<div>Hello World</div>`,
});

// Step2: Create a renderer
const renderer = require("vue-server-renderer").createRenderer();
