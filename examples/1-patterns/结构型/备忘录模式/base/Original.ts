/*
 * @Author: Jecyu
 * @Date: 2020-12-15 15:34:07
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-15 15:48:53
 * @FilePath: /examples/1-patterns/结构型/备忘录模式/base/Original.ts
 * @Description:原始类
 */
import Memento from "./Memento";
class Original {
  private _value: string;
  constructor(value: string) {
    this._value = value;
  }
  public getValue(): string {
    return this._value;
  }
  public setValue(value: string) {
    this._value = value;
  }
  /**
   * @description: 创建备忘录
   * @param {*}
   * @return {*}
   */
  public createMemento(): Memento {
    return new Memento(this._value);
  }

  public restoreMemento(memento: Memento) {
    this._value = memento.getValue();
  }
}

export default Original;
