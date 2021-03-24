/*
 * @Author: Jecyu
 * @Date: 2020-12-15 15:35:23
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-15 16:21:09
 * @FilePath: /examples/1-patterns/结构型/备忘录模式/base/main.spec.ts
 * @Description: 测试类，决定何时保存/恢复快照
 */
import Original from "./Original";
import Storage from "./Storage";

describe("Name of the group", () => {
  it("should restore state correctly", () => {
    // 创建原始类
    const origin: Original = new Original("egg");
    // 创建备忘录
    const storage: Storage = new Storage(origin.createMemento());

    // 修改原始类的状态
    expect(origin.getValue()).toBe("egg"); // 初始化状态 `egg`
    origin.setValue("niu");
    expect(origin.getValue()).toBe("niu"); // 修改状态为 `niu`

    // 恢复原始类的状态
    origin.restoreMemento(storage.getMemento());
    expect(origin.getValue()).toBe("egg");
  });
});
