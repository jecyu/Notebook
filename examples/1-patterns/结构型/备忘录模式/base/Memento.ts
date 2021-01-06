/*
 * @Author: Jecyu
 * @Date: 2020-12-15 15:35:15
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-15 15:41:11
 * @FilePath: /examples/1-patterns/结构型/备忘录模式/base/Memento.ts
 * @Description:
 */
class Memento {
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
}
export default Memento;
