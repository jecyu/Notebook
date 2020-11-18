import Rental from "./Rental";

/*
 * @Author: Jecyu
 * @Date: 2020-11-17 10:24:12
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-18 09:12:14
 * @FilePath: /examples/23-refactor/base/version1/src/Customer.ts
 * @Description:
 */
class Rentals {
  addElement(arg: Rental) {}
  elements() {}
}

class Enumeration {
  hasMoreElements(): boolean {
    return true;
  }
  nextElements() {}
}

class Customer {
  private _name: string;
  private _rentals: Rentals = new Rentals(); // manager rental center

  constructor(name: string) {
    this._name = name;
  }

  addRental(arg: Rental): void {
    this._rentals.addElement(arg);
  }

  getName(): string {
    return this._name;
  }

  // 生成详单的函数
  statement() {
    let totalAmount: number = 0; // 总金额
    let frequentRenterPoints: number = 0; // 积分
    const rentals: Enumeration = this._rentals.elements();
    let result: string = "Rental Record for " + this.getName() + "\n";
    while (rentals.hasMoreElements()) {
      let thisAmount = 0;
      let each: Rental = rentals.nextElements();
    }
  }
}
