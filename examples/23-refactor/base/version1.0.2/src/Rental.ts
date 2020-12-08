/*
 * @Author: Jecyu
 * @Date: 2020-11-17 10:13:43
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-04 20:38:59
 * @FilePath: /examples/23-refactor/base/version1.0.3/src/Rental.ts
 * @Description: 租单
 */
import Movie from "./Movie";
class Rental {
  private _movie: Movie;
  private _daysRented: number;

  constructor(moive: Movie, daysRented: number) {
    this._movie = moive;
    this._daysRented = daysRented;
  }

  public getDaysRented(): number {
    return this._daysRented;
  }

  public getMovie(): Movie {
    return this._movie;
  }

  // Refactor: 对比上一个版本，使用 MoveMethod 从 Customer 搬移 amountFor 到这里，并改变名称为 getCharge
  public getCharge(): number {
    let result: number = 0;
    switch (this.getMovie().getPriceCode()) {
      case Movie.REGULAR:
        result += 2;
        if (this.getDaysRented() > 2) {
          result += (this.getDaysRented() - 2) * 1.5;
        }
        break;
      case Movie.NEW_RELEASE:
        result += this.getDaysRented() * 3;
        break;
      case Movie.CHILDRENS:
        result += 1.5;
        if (this.getDaysRented() > 3) {
          result += (this.getDaysRented() - 3) * 1.5;
        }
        break;
    }
    return result;
  }
}

export default Rental;
