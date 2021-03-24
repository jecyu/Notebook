import Memento from "./Memento";

/*
 * @Author: Jecyu
 * @Date: 2020-12-15 15:39:01
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-15 15:41:18
 * @FilePath: /examples/1-patterns/结构型/备忘录模式/base/Storage.ts
 * @Description: 存储备忘录的类
 */
class Storage {
  private _memento: Memento;
  constructor(memento: Memento) {
    this._memento = memento;
  }
  public getMemento(): Memento {
    return this._memento;
  }
  public setMemento(value: Memento) {
    this._memento = value;
  }
}
export default Storage;
