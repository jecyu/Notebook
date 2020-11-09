const CoffeeMaker = require("./demo01");
describe("Name of the group", () => {
  it("should ", () => {
    const mk = new CoffeeMaker();
    expect(mk.changeState("latte")).toBe("给黑咖啡加点奶");
  });
});
