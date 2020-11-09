const CoffeeMaker = require("./demo04");
describe("Name of the group", () => {
  it("should access CoffeeMaker state", () => {
    const mk = new CoffeeMaker();
    expect(mk.changeState("american")).toBe(
      "我只吐黑咖啡,咖啡机现在的牛奶存储量是：500ml"
    );
  });
});
