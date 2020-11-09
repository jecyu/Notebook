const Vue = require("../../src/Vue");
describe("mini Vue test", () => {
  beforeEach((done) => {
    vm = new Vue({
      el: document.createElement("div"),
      template: `<div id="data">{{text}}</div>`,
      data: {
        text: "Jecyu",
      },
    });
    done();
  });
  it("compile textNode", () => {
    expect(vm.$el.querySelector("#data").innerText).toBe("Jecyu");
  });
});
